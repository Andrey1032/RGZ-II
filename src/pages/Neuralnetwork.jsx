import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

export default function Neuralnetwork() {
  const [n] = useState(3); // кол-во входов
  const [m] = useState(4); // размер обучающей выборки
  const [N, setN] = useState(100000); // кол-во итераций
  const [K, setK] = useState(0.6); // скорость обучения
  const [w1, setW1] = useState([
    [0.51, 0.82],
    [0.45, 0.63],
  ]);
  const [w2, setW2] = useState([0.35, 0.78]);
  const [result, setResult] = useState(""); // результат
  const [test, setTest] = useState([[0, 0]]);
  const [values, setValues] = useState([
    [1, 1, 0],
    [0, 1, 1],
    [1, 0, 1],
    [0, 0, 0],
  ]);

  useEffect(() => {
    setW1([
      [0.27, 0.32],
      [0.43, 0.13],
    ]);
    setW2([0.35, 0.58]);
    setResult("");
  }, [N, K, m, n]);

  const cahnge = (e, index, indX, indY) => {
    let newValues = [...values];
    newValues[indX][indY] = +e;
    setValues(newValues);
  };
  const cahnge2 = (e, index, indX, indY) => {
    let newValues = [...test];
    newValues[indX][indY] = +e;
    setTest(newValues);
  };

  const Fsigmo = (x) => {
    return 1 / (1 + Math.exp(-x));
  };

  const go_forward = (inp) => {
    const sum = [
      w1[0][0] * inp[0] + w1[1][0] * inp[1],
      w1[0][1] * inp[0] + w1[1][1] * inp[1],
    ];

    const out = [Fsigmo(sum[0]), Fsigmo(sum[1])];

    const y = Fsigmo(out[0] * w2[0] + out[1] * w2[1]);

    return { out: out, y: y };
  };
  const go_train = (values, N, K) => {
    let wes1 = [...w1];
    let wes2 = [...w2];
    let x;
    let e;

    for (let i = 0; i < N; i++) {
      x = values[Math.round(Math.random() * (values.length - 1))];
      const sum = [
        wes1[0][0] * x[0] + wes1[1][0] * x[1],
        wes1[0][1] * x[0] + wes1[1][1] * x[1],
      ];
      const out = [Fsigmo(sum[0]), Fsigmo(sum[1])];
      const y = Fsigmo(out[0] * wes2[0] + out[1] * wes2[1]);
      e = y - x[2];
      const sigma2 = e * y * (1 - y);
      wes2[0] = wes2[0] - K * sigma2 * out[0];
      wes2[1] = wes2[1] - K * sigma2 * out[1];

      const sigma11 = wes2[0] * sigma2 * out[0] * (1 - out[0]);
      const sigma12 = wes2[1] * sigma2 * out[1] * (1 - out[1]);

      wes1[0][0] = wes1[0][0] - K * sigma11 * x[0];
      wes1[0][1] = wes1[0][1] - K * sigma12 * x[0];
      wes1[1][0] = wes1[1][0] - K * sigma11 * x[1];
      wes1[1][1] = wes1[1][1] - K * sigma12 * x[1];

      setW2(wes2);
      setW1(wes1);
    }

    return { wes1: wes1, wes2: wes2 };
  };

  return (
    <>
      <Header />
      <div className="page">
        <section>
          <section className="inputs">
            <div></div>
            <div>
              <label htmlFor="n">Число входов:</label>
              <input type="number" value={n} disabled name="n" />
            </div>

            <div>
              <label htmlFor="m">Число строк выборки:</label>
              <input type="number" value={m} disabled name="m" />
            </div>
            <div>
              <label htmlFor="Func">Функция активации: </label>{" "}
              <input disabled value={"Сигмоидная"} name="Func" />
            </div>
          </section>
          <section className="inputs">
            <div>
              <label htmlFor="N">Кол-во итераций обучения: </label>{" "}
              <input
                type="number"
                value={N}
                onChange={(e) => setN(+e.target.value)}
                name="N"
              />
            </div>
            <div>
              <label htmlFor="K">Скорость обучения: </label>{" "}
              <input
                type="number"
                value={K}
                onChange={(e) => setK(+e.target.value)}
                name="K"
              />
            </div>
          </section>
          <div style={{ display: "flex" }}>
            <Table
              title2="строка"
              title1="x"
              title3="y"
              values={values}
              cahnge={cahnge}
            ></Table>
            <div></div>
          </div>

          <div>
            <button
              onClick={() => {
                setW1([
                  [0.51, 0.82],
                  [0.45, 0.63],
                ]);
                setW2([0.35, 0.78]);
                go_train(values, N, K);
              }}
            >
              Обучить нейросеть
            </button>
            <Table
              title2="строка"
              title1="x"
              values={test}
              cahnge={cahnge2}
            ></Table>
            <button
              onClick={() => {
                // go_train(values, N, K);
                const date = go_forward(test[0]);
                setResult(
                  `Для ${test[0][0]} ${test[0][1]}\ny = ${date.y.toFixed(
                    0
                  )}\nout[1] = ${date.out[0].toFixed(
                    0
                  )}\nout[2] = ${date.out[1].toFixed(0)}\n`
                );
              }}
            >
              Тестировать
            </button>
            <h4>Результаты тестирования</h4>
            <textarea value={result} className="result" readOnly></textarea>
          </div>
        </section>
      </div>
    </>
  );
}
