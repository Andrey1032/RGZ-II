import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import Table from "../components/Table";

export default function Alg8() {
  const [n, setN] = useState(8);
  const [n2, setN2] = useState(3);
  const [result, setResult] = useState("");
  const [result2, setResult2] = useState([]);
  const [result3, setResult3] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [vPrior2, setVPrior2] = useState([]);
  const [vPrior3, setVPrior3] = useState([]);
  const [sredSogl] = useState([
    0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49,
  ]);
  const [values, setValues] = useState([
    [1, 5, 3, 7, 6, 6, 1 / 3, 1 / 4],
    [1 / 5, 1, 1 / 3, 5, 3, 3, 1 / 5, 1 / 7],
    [1 / 3, 3, 1, 6, 3, 4, 6, 1 / 5],
    [1 / 7, 1 / 5, 1 / 6, 1, 1 / 3, 1 / 4, 1 / 7, 1 / 8],
    [1 / 6, 1 / 3, 1 / 3, 3, 1, 1 / 2, 1 / 5, 1 / 6],
    [1 / 6, 1 / 3, 1 / 4, 4, 2, 1, 1 / 5, 1 / 6],
    [3, 5, 1 / 6, 7, 5, 5, 1, 1 / 2],
    [4, 7, 5, 8, 6, 6, 2, 1],
  ]);
  const matrix2 = [
    [
      [1, 6, 8],
      [1 / 6, 1, 4],
      [1 / 8, 1 / 4, 1],
    ],
    [
      [1, 7, 1 / 5],
      [1 / 7, 1, 1 / 8],
      [5, 8, 1],
    ],
    [
      [1, 8, 6],
      [1 / 8, 1, 1 / 4],
      [1 / 6, 4, 1],
    ],
    [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    [
      [1, 5, 4],
      [1 / 5, 1, 1 / 3],
      [1 / 4, 3, 1],
    ],
    [
      [1, 8, 6],
      [1 / 8, 1, 1 / 5],
      [1 / 6, 5, 1],
    ],
    [
      [1, 1 / 2, 1 / 2],
      [2, 1, 1],
      [2, 1, 1],
    ],
    [
      [1, 1 / 7, 1 / 5],
      [7, 1, 3],
      [5, 1 / 3, 1],
    ],
  ];
  const [values2, setValues2] = useState(matrix2);

  useEffect(() => {
    setValues2(
      Array.from({ length: n }, () =>
        Array.from({ length: n2 }, () => Array.from({ length: n2 }, () => 0))
      )
    );
  }, [n2, n]);

  const reset = () => {
    setN(8);
    setValues([
      [1, 5, 3, 7, 6, 6, 1 / 3, 1 / 4],
      [1 / 5, 1, 1 / 3, 5, 3, 3, 1 / 5, 1 / 7],
      [1 / 3, 3, 1, 6, 3, 4, 6, 1 / 5],
      [1 / 7, 1 / 5, 1 / 6, 1, 1 / 3, 1 / 4, 1 / 7, 1 / 8],
      [1 / 6, 1 / 3, 1 / 3, 3, 1, 1 / 2, 1 / 5, 1 / 6],
      [1 / 6, 1 / 3, 1 / 4, 4, 2, 1, 1 / 5, 1 / 6],
      [3, 5, 1 / 6, 7, 5, 5, 1, 1 / 2],
      [4, 7, 5, 8, 6, 6, 2, 1],
    ]);
  };
  const reset2 = () => {
    setValues2(matrix2);
  };

  const updateTable = () => {
    setValues(
      Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
    );
    setResult("");
    setResult2([]);
    setResult3("");
    setVPrior2([]);
    setVPrior3([]);
    setFlag(false);
    setFlag2(false);
    setFlag3(false);
  };
  const cahnge = (e, index, indX, indY) => {
    let newValues = [...values];
    newValues[indX][indY] = +e.target.value;
    setValues(newValues);
  };
  const cahnge2 = (e, index, indX, indY) => {
    let newValues = [...values2];
    newValues[index][indX][indY] = +e;
    setValues2(newValues);
  };

  function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  }

  const alg81 = (values) => {
    setFlag(true);
    const matrix = [...values];
    const wMatrix = matrix.map(
      (value) => value.reduce((acc, cur) => acc * cur, 1) ** (1 / n)
    );
    const sumW = wMatrix.reduce((acc, val) => acc + val, 0);
    const wMatrixSubNormal = wMatrix.map((value) => +(value / sumW).toFixed(4));
    setVPrior2(wMatrixSubNormal);
    let matrixTrans = Array.from({ length: n }, () => 0);

    transpose(matrix).map(
      (values, index) =>
        (matrixTrans[index] = values.reduce(
          (acc, value) => acc + value,
          matrixTrans[index]
        ))
    );

    const lambdaMax = matrixTrans
      .map((value, index) => value * wMatrixSubNormal[index])
      .reduce((acc, val) => acc + val, 0)
      .toFixed(3);
    const IS = ((lambdaMax - n) / (n - 1)).toFixed(3);
    const OS = (IS / sredSogl[n - 1]).toFixed(3);
    const res = wMatrixSubNormal
      .map((value, i) => `\n${i + 1}. ${value}`)
      .join("");
    setResult(
      `Вектор приоритетов: ${res}\n\nλmax: ${lambdaMax}\nИС: ${IS}\nOS: ${OS}\n`
    );
  };
  const alg82 = () => {
    setFlag2(true);
    let prior = [];
    let result = Array.from({ length: n }, () => "");
    // eslint-disable-next-line array-callback-return
    values2.map((value2, i) => {
      const wMatrix = value2.map(
        (value) => value.reduce((acc, cur) => acc * cur, 1) ** (1 / n2)
      );
      const sumW = wMatrix.reduce((acc, val) => acc + val, 0);
      const wMatrixSubNormal = wMatrix.map(
        (value) => +(value / sumW).toFixed(4)
      );
      prior.push(wMatrixSubNormal);
      let matrixTrans = Array.from({ length: n2 }, () => 0);
      transpose(value2).map(
        (values, index) =>
          (matrixTrans[index] = values.reduce(
            (acc, value) => acc + value,
            matrixTrans[index]
          ))
      );
      console.log(wMatrixSubNormal);
      const lambdaMax = +matrixTrans
        .map((value, index) => value * wMatrixSubNormal[index])
        .reduce((acc, val) => acc + val, 0)
        .toFixed(3);

      const IS = +((lambdaMax - n2) / (n2 - 1)).toFixed(3);
      const OS = (IS / sredSogl[n2 - 1]).toFixed(3);
      result[i] = `λmax: ${lambdaMax}\nИС: ${IS}\nOS: ${OS}\n`;

      const res = wMatrixSubNormal
        .map((value, i) => `\n${i + 1}. ${value}`)
        .join("");
      result[
        i
      ] = `Вектор приоритетов: ${res}\n\nλmax: ${lambdaMax}\nИС: ${IS}\nOS: ${OS}\n`;
    });
    setVPrior3(prior);
    setResult2(result);
  };
  const alg83 = () => {
    setFlag3(true);
    const globProir = transpose(vPrior3).map((values) =>
      values
        .map((value, index) => value * vPrior2[index])
        .reduce((acc, val) => acc + val, 0)
        .toFixed(3)
    );
    const max = 0;
    const index = 0;
    globProir.map((value, i) => value > max && index === i);
    setResult3(
      `Глобальные приоритеты: ${globProir
        .map((value, i) => `\n${i + 1}. ${value}`)
        .join("")}\n\nТаким образом рекомендуется выбрать альтернативу ${
        index + 1
      }`
    );
  };
  return (
    <>
      <Header />
      <div className="page">
        <section>
          <section className="inputs">
            <div>
              <label htmlFor="n">Введите кол-во характеристик: </label>
              <input
                type="number"
                value={n}
                onChange={(e) =>
                  e > 10
                    ? alert("Алгоритм рассчитан на размер матрицы не больше 10")
                    : setN(e.target.value)
                }
                name="n"
              />
            </div>
          </section>
          <section style={{ display: "flex", flexDirection: "column" }}>
            <button onClick={() => updateTable()}>Сохранить/Сбросить</button>
            <button onClick={() => reset()}>Сбросить к тест значениям</button>
          </section>
          <Table title1="x" title2="x" values={values} cahnge={cahnge}></Table>
        </section>

        <section>
          <button
            onClick={() =>
              values.reduce(
                (acc, curVal) =>
                  acc + curVal.reduce((acc1, curVal1) => acc1 + curVal1, 0),
                0
              )
                ? alg81(values)
                : alert("Заполните таблицу данными")
            }
          >
            Анализ 2 уровня
          </button>
          <h4>Вектор приоритетов для 2 уровня</h4>
          <textarea value={result} className="result" readOnly></textarea>
        </section>
      </div>
      <div className="page">
        {flag && (
          <section>
            <section>
              <div>
                <label htmlFor="n">Введите кол-во характеристик: </label>
                <input
                  type="number"
                  value={n2}
                  onChange={(e) => setN2(e.target.value)}
                  name="n2"
                />
              </div>
              <button onClick={() => reset2()}>
                Сбросить к тест значенияи
              </button>
            </section>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {values2.map((value, i) => (
                <Table
                  caption={`x${i + 1}`}
                  title1="y"
                  title2="y"
                  values={value}
                  index={i}
                  cahnge={cahnge2}
                ></Table>
              ))}
            </div>

            <button
              onClick={() =>
                values2.reduce(
                  (acc, curVal) =>
                    acc +
                    curVal.reduce(
                      (acc1, curVal1) =>
                        acc1 +
                        curVal1.reduce((acc2, curVal2) => acc2 + curVal2, 0),
                      0
                    ),
                  0
                )
                  ? alg82(values2)
                  : alert("Заполните таблицы данными")
              }
            >
              Рассчитать
            </button>
            {flag2 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {values2.map((value, i) => (
                  <div>
                    <h4>Результат для x{i + 1}</h4>
                    <textarea
                      value={result2[i]}
                      className="result"
                      readOnly
                    ></textarea>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
      <div className="page">
        {flag2 && (
          <section>
            <h2>Глобальный приоритет</h2>
            <button onClick={() => alg83()}>
              Рассчитать глобальный приоритет
            </button>
            {flag3 && (
              <div>
                <h4>Вектор глобальных приоритетов</h4>
                <textarea
                  value={result3}
                  className="result"
                  readOnly
                ></textarea>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
