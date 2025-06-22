import React, { useEffect, useState } from "react";
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
  let [exp, setExp] = useState(1);
  let [t, setT] = useState(1);
  let [p, setP] = useState(0);
  const [matrSrav, setMartSrav] = useState(
    Array.from({ length: t }, () => Array.from({ length: p }, () => 0))
  );
  const [itog, setItog] = useState([]);

  useEffect(() => {
    setMartSrav(
      Array.from({ length: exp }, () =>
        Array.from({ length: t }, () => Array.from({ length: p }, () => 0))
      )
    );
  }, [exp, t, p]);
  const mChange = (e) => {
    e < 1 ? alert("Занчения должны быть больше 0") : setExp((exp = +e));
  };
  const tChange = (e) => {
    e < 1 ? alert("Занчения должны быть больше 0") : setT((t = +e));
  };
  const pChange = (e) => {
    setP((p = +e));
  };
  const handleChange = (table, row, column, expMn, value) => {
    let copy = [...table];
    copy[expMn][row][column] = +value;
    setMartSrav(copy);
  };

  function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  }

  const alg = () => {
    let oprosExpert = Object.assign({}, matrSrav);
    let count = Object.keys(oprosExpert).length;
    let n = Object.values(oprosExpert)[0].length;
    let m = Object.values(oprosExpert)[0][0].length;
    let result = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => 0)
    );
    for (let key in oprosExpert) {
      oprosExpert[key].forEach((x, index) => {
        x.forEach((x2, index2) => {
          result[index][index2] += x2;
        });
      });
    }
    let itogResult = result.map((x) => {
      return x.map((y) => y / count);
    });

    let itogResult2 = transpose(itogResult);

    setItog(
      itogResult2.map((el, index) => {
        return Object.assign({}, el);
      })
    );
    console.log(itogResult, itogResult2);
  };

  let renderLines = () => {
    const lines = itog?.map((value, index) => (
      <Line
        type="linear"
        dataKey={index}
        //stroke="#C71585"
        stroke={"hsl(" + (index * 360) / itog.length + ",100%,50%)"}
        // stroke={"#" + parseInt(Math.random() * 0xffffff).toString(16)}
        dot={false}
        strokeWidth={2}
      >
        <LabelList dataKey={index} position="top" />
      </Line>
    ));
    return lines;
  };

  console.log(itog);
  // console.log(matrSrav);

  return (
    <div className="page" style={{ marginTop: "2vh" }}>
      <div>
        <h3>Экспертная оценка</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            Введите кол-во экспертов:
            <input
              type="number"
              value={exp}
              onChange={(e) => mChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите кол-во термов:
            <input
              type="number"
              value={t}
              onChange={(e) => tChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите кол-во параметров:
            <input
              type="number"
              value={p}
              onChange={(e) => pChange(e.target.value)}
            ></input>
          </div>
        </div>
        {matrSrav?.map((expMn, expMnIndex) => (
          <table className="table">
            <caption>{/* <b>Таблица 1</b> */}</caption>
            <tbody>
              <tr>
                <th></th>
                {matrSrav[expMnIndex][0]?.map((count, countIndex) => (
                  <th key={countIndex}>
                    <input
                      readOnly={true}
                      value={"Параметр " + countIndex}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </th>
                ))}
              </tr>
              {matrSrav[expMnIndex]?.map((row, rowIndex) => (
                <>
                  <tr key={rowIndex}>
                    <td>
                      <input
                        readOnly={true}
                        value={"Терм " + rowIndex}
                        style={{ backgroundColor: "gray", color: "white" }}
                      ></input>
                    </td>
                    {row.map((column, columnIndex) => (
                      <td key={columnIndex + rowIndex}>
                        <input
                          value={matrSrav[expMnIndex][rowIndex][columnIndex]}
                          onChange={(e) =>
                            handleChange(
                              matrSrav,
                              rowIndex,
                              columnIndex,
                              expMnIndex,
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
        ))}

        <button variant={"outline-dark"} onClick={() => alg()}>
          Рассчитать
        </button>
      </div>
      {itog.length !== 0 && (
        <ResponsiveContainer width="50%" height={400}>
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
            {renderLines()}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
