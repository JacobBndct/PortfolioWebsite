"use client";

import { useEffect, useRef, useState } from "react";
import { Matrix } from "./agent";
import styles from "./agentDebugger.module.css";

export type AgentDebug = {
  obs: number[];
  layer1: number[];
  layer2: number[];
  output: number[];
};

const reduce = <T,>(arr: T[]) => arr.slice(0, Math.ceil(arr.length / 8));

const NODE_SIZE = 20;
const NODE_GAP = 14;

const opacityFor = (w: number) => {
  const a = Math.min(Math.abs(w) / 2, 1);
  return 0.05 + a * 0.45;
};

export default function AgentDebugger({
  debug,
  weights
}: {
  debug: AgentDebug | null;
  weights: Matrix[];
}) {
  if (!weights.length || !debug) return <div className={styles.panel} />;

  // Refs for each layer
  const netRef = useRef<HTMLDivElement>(null);

  const obsRef = useRef<HTMLDivElement>(null);
  const l1Ref = useRef<HTMLDivElement>(null);
  const l2Ref = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  
  const [positions, setPositions] = useState<{
    obs: DOMRect;
    l1: DOMRect;
    l2: DOMRect;
    out: DOMRect;
    net: DOMRect;
  } | null>(null);

  // Measure layer positions after render
  useEffect(() => {
    if (!obsRef.current || !l1Ref.current || !l2Ref.current || !outRef.current || !netRef.current) return;

    setPositions({
        net: netRef.current.getBoundingClientRect(),
        obs: obsRef.current.getBoundingClientRect(),
        l1: l1Ref.current.getBoundingClientRect(),
        l2: l2Ref.current.getBoundingClientRect(),
        out: outRef.current.getBoundingClientRect(),
    });
  }, [debug]);


  const colorFor = (v: number) => {
    const norm = (v + 1) / 2;
    const shade = Math.round(norm * 255);
    return `rgb(${shade}, ${shade}, ${shade})`;
  };

  const renderLayer = (
    values: number[],
    className: string,
    ref: React.RefObject<HTMLDivElement | null>
  ) => (
    <div className={styles.layer} ref={ref}>
      {values.map((v, i) => (
        <div
          key={i}
          className={`${styles.node} ${className}`}
          style={{ backgroundColor: colorFor(v) }}
        />
      ))}
    </div>
  );

  const obsHalf = reduce(debug.obs);
  const l1Half = reduce(debug.layer1);
  const l2Half = reduce(debug.layer2);

  const localX = (rect: DOMRect, net: DOMRect) => rect.left - net.left;
  const localY = (rect: DOMRect, net: DOMRect) => rect.top - net.top;

  const nodeCenterY = (rect: DOMRect, net: DOMRect, index: number) =>
    localY(rect, net) + index * (NODE_SIZE + NODE_GAP) + NODE_SIZE / 2;


  return (
    <div className={styles.panel}>
      <h3 className="text-center">Epona Neural Network</h3>

      <div className={styles.network} ref={netRef}>
        {/* Input Layer */}
        {renderLayer(obsHalf, styles.inputNode, obsRef)}

        {/* Connections: Input → Layer1 */}
        <svg className={styles.lines}>
          {positions &&
            obsHalf.map((_, i) =>
              l1Half.map((_, j) => (
                <line
                  key={`i-${i}-l1-${j}`}
                  x1={localX(positions.obs, positions.net) + NODE_SIZE}
                  y1={nodeCenterY(positions.obs, positions.net, i)}
                  x2={localX(positions.l1, positions.net)}
                  y2={nodeCenterY(positions.l1, positions.net, j)}
                  stroke={`rgba(255,255,255,${opacityFor(weights[0][i][j])})`}
                  strokeWidth="1"
                />
              ))
            )}
        </svg>

        {/* Layer 1 */}
        {renderLayer(l1Half, styles.hiddenNode, l1Ref)}

        {/* Connections: Layer1 → Layer2 */}
        <svg className={styles.lines}>
          {positions &&
            l1Half.map((_, i) =>
              l2Half.map((_, j) => (
                <line
                  key={`l1-${i}-l2-${j}`}
                  x1={localX(positions.l1, positions.net) + NODE_SIZE}
                  y1={nodeCenterY(positions.l1, positions.net, i)}
                  x2={localX(positions.l2, positions.net)}
                  y2={nodeCenterY(positions.l2, positions.net, j)}
                  stroke={`rgba(255,255,255,${opacityFor(weights[1][i][j])})`}
                  strokeWidth="1"
                />
              ))
            )}
        </svg>

        {/* Layer 2 */}
        {renderLayer(l2Half, styles.hiddenNode, l2Ref)}

        {/* Connections: Layer2 → Output */}
        <svg className={styles.lines}>
          {positions &&
            l2Half.map((_, i) =>
              debug.output.map((_, j) => (
                <line
                  key={`l2-${i}-o-${j}`}
                  x1={localX(positions.l2, positions.net) + NODE_SIZE}
                  y1={nodeCenterY(positions.l2, positions.net, i)}
                  x2={localX(positions.out, positions.net)}
                  y2={nodeCenterY(positions.out, positions.net, j)}
                  stroke={`rgba(255,255,255,${opacityFor(weights[2][i][j])})`}
                  strokeWidth="1"
                />
              ))
            )}
        </svg>

        {/* Output Layer */}
        <div className={styles.outputLayer} ref={outRef}>
          {debug.output.map((v, i) => (
            <div key={i} className={styles.outputNode}>
              <div
                className={styles.node}
                style={{ backgroundColor: colorFor(v) }}
              />
              <div className={styles.outputLabel}>
                <b>
                    {["X Move", "Y Move", "Speed"][i]}: {v.toFixed(2)}
                </b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}