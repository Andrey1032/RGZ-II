import { Legend } from "chart.js";
import React, { useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  LabelList,
} from "recharts";

export default function Alg41() {
  let [a, setA] = useState(0);
  let [b, setB] = useState(0);
  let [c, setC] = useState(0);
  let [xStart, setXStart] = useState(0);
  let [xEnd, setXEnd] = useState(0);
  const [itog, setItog] = useState([]);

  const aChange = (e) => {
    e < 1 ? alert("Занчения должны быть больше 0") : setA((a = +e));
  };
  const bChange = (e) => {
    e < 1 ? alert("Занчения должны быть больше 0") : setB((b = +e));
  };
  const cChange = (e) => {
    setC((c = +e));
  };
  const xStartChange = (e) => {
    setXStart((xStart = +e));
  };
  const xEndChange = (e) => {
    setXEnd((xEnd = +e));
  };

  const culculate = (value) => {
    return value <= a
      ? 0
      : a < value && value <= b
      ? (value - a) / (b - a)
      : b < value && value < c
      ? (c - value) / (c - b)
      : 0;
  };

  const alg = () => {
    let data = [];
    for (let i = xStart; i <= xEnd; i++) {
      const newX = culculate(i);
      data.push({ x: i, y: newX });
    }
    setItog(data);
  };
  console.log(itog);

  return (
    <div className="page" style={{ marginTop: "2vh" }}>
      <div>
        <h3>Построение треугольной функции принадлежности</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            Введите a:
            <input
              type="number"
              value={a}
              onChange={(e) => aChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите b:
            <input
              type="number"
              value={b}
              onChange={(e) => bChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите c:
            <input
              type="number"
              value={c}
              onChange={(e) => cChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите отрезок построения: от
            <input
              type="number"
              value={xStart}
              onChange={(e) => xStartChange(e.target.value)}
            ></input>
            до
            <input
              type="number"
              value={xEnd}
              onChange={(e) => xEndChange(e.target.value)}
            ></input>
          </div>
        </div>

        <button variant={"outline-dark"} onClick={() => alg()}>
          Построить функцию
        </button>

        {itog.length !== 0 && (
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                width={500}
                height={400}
                data={itog}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="x" />
                <XAxis xAxisId={2} dataKey="x" hide={true} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="linear"
                  dataKey="y"
                  stroke="#C71585"
                  strokeWidth={1}
                >
                  <LabelList dataKey="y" position="top" />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
