export type Matrix = number[][];
export type Vector = number[];

export function reshape(flat: number[], rows: number, cols: number): number[][] {
  const out: number[][] = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    out.push(flat.slice(idx, idx + cols));
    idx += cols;
  }
  return out;
}

export async function loadCSV(url: string): Promise<number[]> {
  const text = await fetch(url).then(r => r.text());
  return text.trim().split("\n").map(Number);
}

export async function loadAgentParams() {
  const flatW = await loadCSV("/Prey_weights.csv");
  const flatB = await loadCSV("/Prey_biases.csv");

  // Reconstruct shapes
  const W1 = reshape(flatW.slice(0, 28 * 64), 28, 64);
  const W2 = reshape(flatW.slice(28 * 64, 28 * 64 + 64 * 64), 64, 64);
  const W3 = reshape(flatW.slice(28 * 64 + 64 * 64), 64, 3);

  const b1 = flatB.slice(0, 64);
  const b2 = flatB.slice(64, 128);
  const b3 = flatB.slice(128, 131);

  return {
    weights: [W1, W2, W3],
    biases: [b1, b2, b3]
  };
}

export function buildObservation(
  pos: { x: number; y: number },
  vel: { x: number; y: number },
  predator: { x: number; y: number },
  food: { x: number; y: number },
  worldSize: number,
  neighbors: { pos: Vector; vel: Vector }[]
): number[] {
  const predRel = [predator.x - pos.x, predator.y - pos.y];
  const predDist = Math.hypot(predRel[0], predRel[1]);
  const predDir = predDist > 0 ? [predRel[0] / predDist, predRel[1] / predDist] : [0, 0];

  const foodRel = [food.x - pos.x, food.y - pos.y];
  const foodDist = Math.hypot(foodRel[0], foodRel[1]);

  const boundary = [
    pos.x,
    worldSize - pos.x,
    pos.y,
    worldSize - pos.y
  ];

  const neighborFeats: number[] = [];
  for (let n of neighbors.slice(0, 3)) {
    neighborFeats.push(
      n.pos[0] - pos.x,
      n.pos[1] - pos.y,
      n.vel[0] - vel.x,
      n.vel[1] - vel.y
    );
  }
  while (neighborFeats.length < 12) neighborFeats.push(0);

  return [
    pos.x, pos.y,
    vel.x, vel.y,
    predRel[0], predRel[1],
    predDist,
    predDir[0], predDir[1],
    foodRel[0], foodRel[1],
    foodDist,
    ...boundary,
    ...neighborFeats
  ];
}

export class ESAgent {
  inputDim: number;
  hiddenDim: number;
  outputDim: number;

  W1: Matrix;
  W2: Matrix;
  W3: Matrix;

  b1: Vector;
  b2: Vector;
  b3: Vector;

  speed: number = 0;
  maxDeltaSpeed: number = 1;
  maxSpeed: number;

  constructor(
    weights: Matrix[],
    biases: Vector[],
    inputDim = 28,
    hiddenDim = 64,
    outputDim = 3,
    maxSpeed = 3
  ) {
    this.inputDim = inputDim;
    this.hiddenDim = hiddenDim;
    this.outputDim = outputDim;

    this.W1 = weights[0];
    this.W2 = weights[1];
    this.W3 = weights[2];

    this.b1 = biases[0];
    this.b2 = biases[1];
    this.b3 = biases[2];

    this.maxSpeed = maxSpeed;
  }

  getWeights() {
    return [this.W1, this.W2, this.W3];
  }

  getBiases() {
    return [this.b1, this.b2, this.b3];
  }

  private tanh(x: number): number {
    return Math.tanh(x);
  }

  public normalize(v: Vector): Vector {
    const mag = Math.hypot(v[0], v[1]);
    return mag < 1e-6 ? [1, 0] : [v[0] / mag, v[1] / mag];
  }

  public dense(x: Vector, W: Matrix, b: Vector): Vector {
    const out = new Array(b.length).fill(0);
    for (let j = 0; j < b.length; j++) {
      let sum = b[j];
      for (let i = 0; i < x.length; i++) {
        sum += x[i] * W[i][j];
      }
      out[j] = sum;
    }
    return out;
  }

  forward(obs: Vector): Vector {
    let x = this.dense(obs, this.W1, this.b1).map(v => this.tanh(v));
    x = this.dense(x, this.W2, this.b2).map(v => this.tanh(v));
    return this.dense(x, this.W3, this.b3); // [dx_raw, dy_raw, delta_speed_raw]
  }

  getAction(obs: Vector): Vector {
    const [dxRaw, dyRaw, dsRaw] = this.forward(obs);

    let dir = this.normalize([dxRaw, dyRaw]);

    const deltaSpeed = this.tanh(dsRaw) * this.maxDeltaSpeed;
    this.speed = Math.min(Math.max(this.speed + deltaSpeed), this.maxSpeed);

    return [dir[0] * this.speed, dir[1] * this.speed];
  }
}
