import React from "react";
import { useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Alg41 from "./Alg41";
import Alg42 from "./Alg42";
import Header from "../components/Header";
export default function Alg4() {
  const [matrix, setMatrix] = useState([
    [1, 5 / 7, 3 / 7, 2 / 7, 1 / 7],
    [7 / 5, 1, 3 / 5, 2 / 5, 1 / 5],
    [7 / 3, 5 / 3, 1, 2 / 3, 1 / 3],
    [7 / 2, 5 / 2, 3 / 2, 1, 1 / 2],
    [7, 5, 3, 2, 1],
  ]);
  const [resultat, setResult] = useState(null);
  const restart = () => {
    setMatrix([
      [1, 5 / 7, 3 / 7, 2 / 7, 1 / 7],
      [7 / 5, 1, 3 / 5, 2 / 5, 1 / 5],
      [7 / 3, 5 / 3, 1, 2 / 3, 1 / 3],
      [7 / 2, 5 / 2, 3 / 2, 1, 1 / 2],
      [7, 5, 3, 2, 1],
    ]);
    setResult(null);
  };

  const handleChange = (table, row, column, value) => {
    let copy = [...table];
    copy[row][column] = Number(value);
    if (isNaN(Number(value)) && value[value.length - 1] !== "/") {
      let ind = value.indexOf("/");
      let v = value.slice(ind + 1);
      let v1 = +value.substr(0, ind);
      copy[row][column] = v1 / v;
    }
    setMatrix(copy);
  };

  function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  }

  const parnSrav = (startMatrix) => {
    const wMatrix = startMatrix.map(
      (value) => value.reduce((acc, cur) => acc * cur, 1) ** (1 / 6)
    );
    const sumW = wMatrix.reduce((acc, val) => acc + val, 0);
    const wMatrixSubNormal = wMatrix.map((value) => value / sumW);

    let AMatrix = Array.from({ length: matrix.length }, () => 0);

    transpose(startMatrix).map(
      (values, index) =>
        (AMatrix[index] = values.reduce(
          (acc, value) => acc + value,
          AMatrix[index]
        ))
    );

    const wMatrixNormal = wMatrixSubNormal.map(
      (value) => value / Math.max(...wMatrixSubNormal)
    );
    const lambda = AMatrix.map(
      (value, index) => value * wMatrixSubNormal[index]
    ).reduce((acc, val) => acc + val, 0);
    setResult([
      wMatrixSubNormal.map((value, index) => {
        return {
          subnorm: value.toFixed(3),
          norm: wMatrixNormal[index].toFixed(3),
        };
      }),
      lambda,
      lambda - matrix.length,
    ]);
  };
  return (
    <>
      <Header />
      <div className="page">
        <div>
          <h3>Метод парных сравнений</h3>
          <table className="table">
            <tbody>
              <tr>
                <th>
                  <input readOnly={true} value={"Заголовки"}></input>
                </th>
                {matrix[0]?.map((count, countIndex) => (
                  <th key={countIndex}>
                    <input
                      readOnly={true}
                      value={countIndex * 5 + 170}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </th>
                ))}
              </tr>
              {matrix?.map((row, rowIndex) => (
                <>
                  <tr key={rowIndex}>
                    <td>
                      <input
                        readOnly={true}
                        value={5 * rowIndex + 170}
                        style={{ backgroundColor: "gray", color: "white" }}
                      ></input>
                    </td>
                    {row.map((column, columnIndex) => (
                      <td key={columnIndex + rowIndex}>
                        <input
                          type="number"
                          value={matrix[rowIndex][columnIndex]}
                          onChange={(e) =>
                            handleChange(
                              matrix,
                              rowIndex,
                              columnIndex,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={() => restart()}>
              Сбросить к начальным значениям
            </button>
            <button onClick={() => parnSrav(matrix)}>Подсчитать</button>
          </div>
        </div>
        {resultat !== null && (
          <div>
            <p style={{ width: "90vw" }}>
              Мера не согласованности равна: {resultat[1].toFixed(3)} -{" "}
              {matrix.length} = {resultat[2].toFixed(3)}
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart
                width={500}
                height={400}
                data={resultat[0]}
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
                  dataKey="subnorm"
                  stroke="#C71585"
                  dot={false}
                  strokeWidth={1}
                >
                  <LabelList dataKey="subnorm" position="top" />
                </Line>
                <Line
                  type="linear"
                  dataKey="norm"
                  stroke="#FFA500"
                  dot={false}
                  strokeWidth={2}
                >
                  <LabelList dataKey="norm" position="top" />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <Alg41 />
      <Alg42 />
    </>
  );
}
