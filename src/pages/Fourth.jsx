import React, { useState } from "react";
import Header from "../components/Header";
import PodHeader from "../components/PodHeader";
import Table from "../components/Table";

export default function Fourth() {
  const [n, setN] = useState(3);
  const [m, setM] = useState(2);
  const [E, setE] = useState(0.01);
  const [result, setResult] = useState("");
  const [values, setValues] = useState(
    Array.from({ length: m }, () => Array.from({ length: n }, () => 0))
  );
  const updateTable = () => {
    setValues(
      Array.from({ length: m }, () => Array.from({ length: n }, () => 0))
    );
    setResult("");
  };
  const cahnge = (e, index, indX, indY) => {
    let newValues = [...values];
    newValues[indX][indY] = +e.target.value;
    setValues(newValues);
  };

  const alg4 = () => {
    const valuesCopy = [...values];
    let valuesMatrix = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => Array.from({ length: m }, () => 0))
    );
    valuesMatrix = valuesMatrix.map((values, im) =>
      values.map((values1, ix) =>
        values1.map((value, iy) =>
          ix === iy ? 0.5 : valuesCopy[ix][im] < valuesCopy[iy][im] ? 1 : 0
        )
      )
    );

    let matrix = Array.from({ length: m }, () =>
      Array.from({ length: m }, () => 0)
    );
    for (let i = 0; i < n; i++) {
      // eslint-disable-next-line no-loop-func
      valuesMatrix[i].map((values, index) =>
        values.map((values1, index1) => (matrix[index][index1] += values1))
      );
    }
    matrix = matrix.map((values) =>
      values.map((value) => +(value / m).toFixed(3))
    );
    let k = Array.from({ length: m }, () => 1);

    let resultat = `k[${0}]=[${k}]\n`;
    for (let t = 1; t < 100; t++) {
      const lambda = +(
        1 /
        matrix.reduce(
          // eslint-disable-next-line no-loop-func
          (acc, val) =>
            acc +
            val.reduce((acc2, val2, curInd) => acc2 + val2 * k[curInd], 0),
          0
        )
      ).toFixed(3);
      const kt = matrix.map(
        // eslint-disable-next-line no-loop-func
        (val, index) =>
          +(
            lambda *
            val.reduce((acc2, val2, curInd) => acc2 + val2 * k[curInd], 0)
          ).toFixed(3)
      );
      console.log(lambda, kt, k);
      if (
        // eslint-disable-next-line no-loop-func
        kt.map((val, i) => k[i] - val <= E).reduce((acc, val) => acc * val, 1)
      ) {
        k = [...kt];

        resultat += `k[${t}]=[${k}]\n`;
        break;
      } else {
        k = [...kt];

        resultat += `k[${t}]=[${k}]\n`;
      }
    }
    setResult(resultat);
  };

  return (
    <>
      <Header />
      <PodHeader />
      <div className="page">
        <section>
          <section className="inputs">
            <div>
              <label htmlFor="n">Число экспертов: </label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(e.target.value)}
                name="n"
              />
            </div>
            <div>
              <label htmlFor="m">Число факторов: </label>
              <input
                type="number"
                value={m}
                onChange={(e) => setM(e.target.value)}
                name="m"
              />
            </div>
            <div>
              <label htmlFor="E">Точность: </label>{" "}
              <input
                type="number"
                value={E}
                onChange={(e) => setE(e.target.value)}
                name="E"
              />
            </div>
          </section>
          <button onClick={() => updateTable()}>Сохранить/Сбросить</button>
          <Table
            title2="Фактор"
            values={values}
            cahnge={cahnge}
          ></Table>
        </section>

        <section>
          <button
            onClick={() =>
              values.reduce(
                (acc, curVal) =>
                  acc + curVal.reduce((acc1, curVal1) => acc1 + curVal1, 0),
                0
              )
                ? alg4()
                : alert("Заполните таблицу данными")
            }
          >
            Решение
          </button>
          <h4>Результаты решения</h4>
          <textarea value={result} className="result" readOnly></textarea>
        </section>
      </div>
    </>
  );
}
