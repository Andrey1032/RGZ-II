import { useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import PodHeader from "../components/PodHeader";

function App() {
  const [n, setN] = useState(3);
  const [E, setE] = useState(0.01);
  const [result, setResult] = useState("");
  const [values, setValues] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
  );
  const updateTable = () => {
    setValues(
      Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
    );
    setResult("");
  };
  const cahnge = (e, index, indX, indY) => {
    let newValues = [...values];
    newValues[indX][indY] = +e.target.value;
    setValues(newValues);
  };
  const alg1 = () => {
    let resultat = "";
    const valuesCopy = [...values];
    console.log(valuesCopy);
    let y = valuesCopy.reduce(
      (acc, curVal) =>
        acc + curVal.reduce((acc2, curVal2) => acc2 + curVal2, 0),
      0
    );
    let k = Array.from({ length: n }, () => 1);
    let kTemp = Array.from({ length: n }, () => 0);

    for (let i = 0; i < 100; i++) {
      //КОНСОЛЬ
      console.log("итерация-", i);
      console.log("до: ", y, kTemp, k);
      //КОНСОЛЬ

      for (let j = 0; j < n; j++) {
        kTemp[j] = +(
          valuesCopy[j]
            // eslint-disable-next-line no-loop-func
            .map((value, i) => value * k[i])
            .reduce((acc, curVal) => acc + curVal, 0) / y
        ).toFixed(4);
      }

      //КОНСОЛЬ
      console.log("после: ", kTemp, k);
      //КОНСОЛЬ
      resultat += `k[${i}]=[${kTemp}]\n`;
      if (
        kTemp
          // eslint-disable-next-line no-loop-func
          .map((val, ind) => k[ind] - val <= E)
          .reduce((acc, val) => acc * val, 1)
      ) {
        k = Array.from(kTemp);
        break;
      } else {
        k = Array.from(kTemp);
        y = +valuesCopy
          .reduce(
            // eslint-disable-next-line no-loop-func
            (acc, curVal) =>
              acc +
              curVal.reduce(
                (acc2, curVal2, curInd) => acc2 + curVal2 * k[curInd],
                0
              ),
            0
          )
          .toFixed(4);
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
          <Table values={values} cahnge={cahnge}></Table>
        </section>
        <section>
          <button
            onClick={() =>
              values.reduce(
                (acc, curVal) =>
                  acc + curVal.reduce((acc1, curVal1) => acc1 + curVal1, 0),
                0
              )
                ? alg1()
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

export default App;
