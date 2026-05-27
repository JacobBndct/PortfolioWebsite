"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./epona.module.css";
import { loadAgentParams, ESAgent, buildObservation } from "./agent";
import AgentDebugger, { AgentDebug } from "./AgentDebugger.component";

type Vector2 = { x: number; y: number };

export default function Epona({ visible }: { visible: boolean }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const [numAgents, setNumAgents] = useState(1);
  const [agents, setAgents] = useState<ESAgent[]>([]);

  const [debug, setDebug] = useState<AgentDebug | null>(null);
  const [debugFrame, setDebugFrame] = useState(0);

  const [positions, setPositions] = useState<Vector2[]>([]);
  const [velocities, setVelocities] = useState<Vector2[]>([]);

  const [food, setFood] = useState<Vector2>({ x: 250, y: 250 });
  const [mouse, setMouse] = useState<Vector2>({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }

  function timeStep() {
    if (agents.length === 0) return;

    setDebugFrame(f => f + 1);

    setPositions(prevPositions => {
      const newPositions = [...prevPositions];
      const newVelocities = [...velocities];

      for (let i = 0; i < agents.length; i++) {
        const pos = prevPositions[i];
        const vel = velocities[i];

        if (!pos || !vel) continue;

        const obs = buildObservation(
          pos,
          vel,
          mouse,
          food,
          500,
          []
        );

        let vx, vy;

        // Capture debug info ONLY for agent 0
        if (i === 0) {
          const agent = agents[0];

          // manually run forward pass in steps
          const layer1 = agent.dense(obs, agent.W1, agent.b1).map(v => Math.tanh(v));
          const layer2 = agent.dense(layer1, agent.W2, agent.b2).map(v => Math.tanh(v));
          const output = agent.dense(layer2, agent.W3, agent.b3);

          if (debugFrame % 5 === 0) {
            setDebug({ obs, layer1, layer2, output });
          }


          const [dxRaw, dyRaw, dsRaw] = output;
          const dir = agent.normalize([dxRaw, dyRaw]);
          const deltaSpeed = Math.tanh(dsRaw) * agent.maxDeltaSpeed;
          agent.speed = Math.min(Math.max(agent.speed + deltaSpeed, 0), agent.maxSpeed);
          vx = dir[0] * agent.speed;
          vy = dir[1] * agent.speed;
        } else {
          const [vx0, vy0] = agents[i].getAction(obs);
          vx = vx0;
          vy = vy0;
        }

        newVelocities[i] = { x: vx, y: vy };

        newPositions[i] = {
          x: Math.max(0, Math.min(480, pos.x + vx)),
          y: Math.max(0, Math.min(480, pos.y + vy))
        };
      }

      setVelocities(newVelocities);
      return newPositions;
    });
  }

  useEffect(() => {
    const interval = setInterval(timeStep, 30);
    return () => clearInterval(interval);
  }, [agents, velocities]);


  useEffect(() => {
    loadAgentParams().then(({ weights, biases }) => {
      const newAgents = Array.from({ length: numAgents }, () => new ESAgent(weights, biases));

      const newPositions = Array.from({ length: numAgents }, () => ({
        x: 250 + Math.random() * 40 - 20,
        y: 250 + Math.random() * 40 - 20
      }));

      const newVelocities = Array.from({ length: numAgents }, () => ({ x: 0, y: 0 }));

      setAgents(newAgents);
      setPositions(newPositions);
      setVelocities(newVelocities);
    });
  }, [numAgents]);

  const agentWeights = useMemo(() => {
    if (agents.length === 0) return null;
    return agents[0].getWeights();
  }, [agents]);

  if (!hydrated) return null;

  if (!visible) {
    // Render an empty container so hook order stays stable
    return <div style={{ display: "none" }} />;
  }

  return (
    <div className="thin-section">
      <h4 className="text-center">
        Epona Appeared With Friends!
      </h4>

      <div>
        <p>This is an example of a simple model I trained to showcase my knowledge of reinforcement learning techniques for gameplay AI. Here Epona is using neural network visualized on the left to decide where to move.</p>
        <p>
          <b>
            Try moving your mouse around in the enclosure and see how Epona reacts!
          </b>
        </p>
      </div>

      <div className={styles.wrapper}>
        <div className={`${styles["debugger"]} ${styles["left"]}`}>
          <AgentDebugger debug={debug} weights={agentWeights ?? []} />
        </div>

        <div className={`${styles["right"]}`}>
          <button onClick={() => setNumAgents(numAgents === 1 ? 3 : 1)}>
            {numAgents === 1 ? "Add friends!" : "Only Epona"}
          </button>

          <div
            className={styles.enclosure}
            onMouseMove={handleMouseMove}
          >
            {positions.map((p, i) => (
              <div
                key={i}
                className={styles.dot}
                style={{ left: p.x, top: p.y }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}