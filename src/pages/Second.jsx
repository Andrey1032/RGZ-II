import { useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import PodHeader from "../components/PodHeader";

export default function Second() {
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
  const cahnge = (e,index, indX, indY) => {
    let newValues = [...values];
    newValues[indX][indY] = +e.target.value;
    setValues(newValues);
  };

  function transpose(a) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  }

  const alg2 = () => {
    const valuesCopy = [...values];
    const valuesCopyTranspose = transpose(valuesCopy);
    let k = Array.from({ length: n }, () => +(1 / n).toFixed(3));
    let x = valuesCopy.map(
      (value) =>
        +value.reduce((acc, val, curInd) => acc + val * k[curInd], 0).toFixed(3)
    );
    let resultat = `k[${1}]=[${x}]\n`;
    for (let t = 2; t <= n+1; t++) {
      let lambda = +valuesCopy
        .map(
          // eslint-disable-next-line no-loop-func
          (value, index) =>
            +(
              value.reduce((acc, curVal) => acc + curVal, 0) * x[index]
            ).toFixed(3)
        )
        .reduce((acc, curVal) => acc + curVal, 0)
        .toFixed(3);
      // eslint-disable-next-line no-loop-func
      let kt = valuesCopyTranspose.map((values, i) =>
        i !== valuesCopyTranspose.length - 1
          ? +(
              values.reduce((acc, val, ind) => acc + val * x[ind], 0) *
              (1 / lambda)
            ).toFixed(4)
          : 0
      );
      kt[k.length - 1] = +(1 - kt.reduce((acc, val) => acc + val, 0)).toFixed(
        4
      );
      let xt = valuesCopy.map(
        (value) =>
          +value
            .reduce((acc, val, curInd) => acc + val * kt[curInd], 0)
            .toFixed(4)
      );

      //КОНСОЛЬ
      console.log(`после: ${t} итерации:`, lambda, kt, xt);
      //КОНСОЛЬ
      if (
        x
          .map((value, i) => xt[i] - value < E)
          .reduce((acc, val) => acc * val, 1)
      ) {
        x = Array.from(xt);
        resultat += `k[${t}]=[${x}]\n`;
        break;
      } else {
        x = Array.from(xt);
        resultat += `k[${t}]=[${x}]\n`;
      }
    }
    setResult(resultat);
  };

  return (
    <>
      <Header />
      <PodHeader></PodHeader>
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
              <label htmlFor="m">Число мероприятий: </label>
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
            title2="Мероприятие"
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
                ? alg2()
                : alert("Заполните таблицу данными")
            }
          >
            Решение
          </button>
          <h4>Результаты решения</h4>
          <textarea className="result" readOnly value={result}></textarea>
        </section>
      </div>
    </>
  );
}
