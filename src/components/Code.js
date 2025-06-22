export const code1 = () => {
  return (
    <pre>
      {`import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Matrix() {
  let [n, setN] = useState(5);
  const [znach, setznach] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
  );

  const [result, setResult] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setznach(
      Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
    );
  }, [n]);

  const nChange = (e) => {
    e < 3
      ? alert("Задача коммивояжера не решается для значений < 3")
      : setN((n = +e));
  };

  const handleChange = (row, column, event) => {
    let copy = [...znach];
    copy[row][column] = +event.target.value;
    setznach(copy);
  };

  const alg = (znach) => {
    setShow(true);
    if (n < 2) {
      return;
    }
    function dejkstr(beginIndex) {
      let temp, minIndex, min;

      const minDistance = new Array(znach.length).fill(Infinity);
      const visited = new Array(znach.length).fill(1);
      const data = new Array(znach.length).fill([]);

      for (let i = 0; i < znach.length; i++) {
        if (i === beginIndex) {
          minDistance[i] = 0;
          data[i] += beginIndex;
        }
      }

      do {
        minIndex = Infinity;
        min = Infinity;

        for (let i = 0; i < znach.length; i++) {
          if (visited[i] === 1 && minDistance[i] < min) {
            min = minDistance[i];
            minIndex = i;
          }
        }

        if (minIndex !== Infinity) {
          for (let i = 0; i < znach.length; i++) {
            if (znach[minIndex][i] > 0) {
              temp = min + znach[minIndex][i];
              if (temp < minDistance[i]) {
                minDistance[i] = temp;
                data[i] = data[minIndex];
                data[i] += \` \${i}\`;
              }
            }
          }
          visited[minIndex] = 0;
        }
      } while (minIndex < Infinity);

      return [data, minDistance];
    }

    let path = [];
    let distance = [];
    let length = [0];
    let itog,
      beginIndex = 0,
      endIndex = znach.length - 1;
    let visited = new Array(znach.length).fill(0);

    for (let i = 0; i < znach.length; i++) {
      let [p, d] = dejkstr(i);
      path[i] = p;
      distance[i] = d;
    }

    function calm(arrayPath, not, len) {
      let pathTemp = [],
        notVisitedTemp = [],
        lengthPathTemp = [],
        vozvr = [];
      let end = +arrayPath[arrayPath.length - 1];
      if (distance[end].indexOf(0) > -1) {
        distance[end][distance[end].indexOf(0)] = Infinity;
      }
      let min = Infinity;
      for (let i = 0; i < not.length; i++) {
        if (distance[end][not[i]] < min) min = distance[end][not[i]];
      }

      if (not.length === 1) {
        let pathPromTemp = path[end][not[0]].split(" ");
        pathPromTemp.splice(0, 1);
        pathTemp[pathTemp.length] = arrayPath.concat(pathPromTemp);
        lengthPathTemp[pathTemp.length - 1] = len + distance[end][not[0]];
        if (pathPromTemp[pathPromTemp.length - 1] === 0)
          vozvr[pathTemp.length - 1] = true;
        else vozvr[pathTemp.length - 1] = false;
      } else {
        for (let i = 0; i < not.length; i++) {
          if (distance[end][not[i]] === min) {
            let pathPromTemp = path[end][not[i]].split(" ");
            pathPromTemp.splice(0, 1);
            pathTemp[pathTemp.length] = arrayPath.concat(pathPromTemp);
            lengthPathTemp[pathTemp.length - 1] = len + distance[end][not[i]];
            notVisitedTemp[pathTemp.length - 1] = not.filter(
              (_, index) => index !== i
            );
            if (pathPromTemp[pathPromTemp.length - 1] === 0)
              vozvr[pathTemp.length - 1] = true;
            else vozvr[pathTemp.length - 1] = false;
          }
        }
      }

      return [pathTemp, lengthPathTemp, notVisitedTemp];
    }

    if (path[beginIndex][endIndex]?.indexOf(\`\${endIndex}\`)) {
      if (path[beginIndex][endIndex].length > 0) {
        itog = [path[beginIndex][endIndex].split(" ")];
        length[0] += distance[beginIndex][endIndex];
      }
      else{
        alert("Заполните таблицу")
        return 
      }
    }


    let notVisit = [[]];

    for (let i = 0; i < visited.length; i++) {
      if (itog[0].indexOf(\`\${i}\`) === -1) {
        notVisit[0][notVisit[0].length] = i;
      }
    }

    while (notVisit.length !== 0) {
      let pathTemp = [],
        lengthTemp = [],
        notVisitTemp = [];
      for (let i = 0; i < itog.length; i++) {
        let [pathIt, lengthPath, notVisited] = calm(
          itog[i],
          notVisit[i],
          length[i]
        );

        pathTemp = pathTemp.concat(pathIt);
        notVisitTemp = notVisitTemp.concat(notVisited);
        lengthTemp = lengthTemp.concat(lengthPath);
      }
      itog = pathTemp;
      notVisit = notVisitTemp;
      length = lengthTemp;
    }

    for (let i = 0; i < itog.length; i++) {
      let end = +itog[i][itog[i].length - 1];
      let pathPromTemp = path[end][0].split(" ");
      pathPromTemp.splice(0, 1);
      itog[i] = itog[i].concat(pathPromTemp);
      length[i] = length[i] + distance[end][0];
    }

    let min = Math.min(...length);
    let k = length.indexOf(min);

    return {
      minDistance: length[k],
      visitedVer: itog[k].reverse().join("➨"),
    };
  };

  return (
    <>
      <Header />
      <div className="page">
        <div>
          <div>
            Введите размерность матрицы:
            <input
              type="number"
              value={n}
              onChange={(e) => nChange(e.target.value)}
            ></input>
          </div>

          <table className="table">
            <tbody>
              {znach.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      <input
                        type="number"
                        value={znach[rowIndex][columnIndex]}
                        //placeholder={columnIndex}
                        onChange={(e) => handleChange(rowIndex, columnIndex, e)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button variant={"outline-dark"} onClick={() => setResult(alg(znach))}>
          Решить задачу коммивояжера
        </button>

        {show && (
          <div>
            <p>Минимальное расстояние {result?.minDistance}</p>
            <p>
              Путь: &ensp;
              {result?.visitedVer}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
`}
    </pre>
  );
};
export const code2 = () => {
  return (
    <pre>{`import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Kmeans() {
  const [numCircles, setNumCircles] = useState(10); // кол-во точек
  const [numClusters, setNumClusters] = useState(3); // кол-во кластеров
  const [result, setResult] = useState("");

  const [groups, setGroups] = useState([]);
  const [dots, setDots] = useState([]);
  const [flag, setFlag] = useState(true);
  const [flagStart, setFlagStart] = useState(false);
  const [finished, setFinished] = useState(false);

  const [dataset, setDataset] = useState({
    datasets: groups.map((group) => ({
      label: group.id,
      data: group.dots.map((dot) => ({
        x: dot.x,
        y: dot.y,
        r: 5,
      })),
      backgroundColor: group.color,
    })),
  });

  useEffect(() => {
    setDataset({
      datasets: groups
        .map((group) => ({
          label: group.id,
          data: group.dots.map((dot) => ({
            x: dot.x,
            y: dot.y,
            r: 5,
          })),
          backgroundColor: group.color,
        }))
        .concat(
          groups.map((group) => ({
            label: \`Центр \${"group.id"}\`,
            data: [
              {
                x: group.center.x,
                y: group.center.y,
                r: 10,
              },
            ],
            backgroundColor: group.color,
          }))
        ),
    });

  const restart = () => {
    setResult("");
    setGroups([]);
    setDots([]);
    setFlag(true);
    setFlagStart(false);
    setFinished(false);
    setDataset({
      datasets: groups.map((group) => ({
        label: group.id,
        data: group.dots.map((dot) => ({
          x: dot.x,
          y: dot.y,
          r: 5,
        })),
        backgroundColor: group.color,
      })),
    });
  };

  const initClusters = () => {
    let copyGroups = [...groups];
    for (let i = 0; i < numClusters; i++) {
      let g = {
        id: "группа_" + i,
        dots: [],
        color: "hsl(" + (i * 360) / numClusters + ",100%,50%)",
        center: {
          x: Math.random() * 1000,
          y: Math.random() * 1000,
        },
        init: {
          center: {},
        },
      };
      g.init.center = {
        x: g.center.x,
        y: g.center.y,
      };
      copyGroups.push(g);
    }
    setGroups(copyGroups);
  };

  const initDots = () => {
    setFlag(false);
    let copyDots = [...dots];
    for (let i = 0; i < numCircles; i++) {
      let dot = {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        group: undefined,
      };
      dot.init = {
        x: dot.x,
        y: dot.y,
        group: dot.group,
      };
      copyDots.push(dot);
    }

    setDots(copyDots);
  };

  const step = () => {
    if (flag) {
      moveCenter();
    } else {
      updateGroups();
    }
    setFlag(!flag);
  };

  const moveCenter = () => {
    setFinished(false);
    let copyGroups = [...groups];
    copyGroups.forEach(function (group, i) {
      setFinished(true);

      if (group.dots.length === 0) return;

      let x = 0,
        y = 0;
      group.dots.forEach(function (dot) {
        x += dot.x;
        y += dot.y;
      });

      let oldPos = { x: group.center.x, y: group.center.y };

      group.center = {
        x: x / group.dots.length,
        y: y / group.dots.length,
      };
      let newPos = { x: group.center.x, y: group.center.y };

      if (oldPos.x !== newPos.x || oldPos.y !== newPos.y) setFinished(false);
    });
    setGroups(copyGroups);
    if (!finished) {
      setResult(
        (prev) =>
          prev +
          \`Результат алгоритма к-средних:\nгруппы, \${groups}\nточки \${dots}\`
      );
    }
  };

  const updateGroups = () => {
    let copyGroups = [...groups];
    let copyDots = [...dots];
    copyGroups.forEach(function (g) {
      g.dots = [];
    });
    copyDots.forEach(function (dot) {
      let min = Infinity;
      let group;
      copyGroups.forEach(function (g) {
        let d =
          Math.pow(g.center.x - dot.x, 2) + Math.pow(g.center.y - dot.y, 2);
        if (d < min) {
          min = d;
          group = g;
        }
      });
      group.dots.push(dot);
      dot.group = group;
    });
    setGroups(copyGroups);
    setDots(copyDots);
  };

  const kmeansAlg = () => {
    setFlagStart(!flagStart)
    initClusters();
    initDots();
  };

  return (
    <>
      <Header />
      <div className="page">
        <section>
          <div>
            <div>
              <label htmlFor="n">Кол-во точек: </label>
              <input
                type="number"
                value={numCircles}
                onChange={(e) => setNumCircles(+e.target.value)}
                name="n"
              />
            </div>
            <div>
              <label htmlFor="k">Кол-во кластеров: </label>
              <input
                type="number"
                value={numClusters}
                onChange={(e) => setNumClusters(+e.target.value)}
                name="k"
              />
            </div>
          </div>
          <button disabled={flagStart && true} onClick={() => kmeansAlg()}>
            Запустить
          </button>
          <button onClick={() => restart()}>Cбросить</button>
        </section>
        <section style={{ display: "flex" }}>
          <button disabled={finished && true} onClick={() => step()}>
            Следующий шаг
          </button>
          <h4>Результаты решения</h4>
          {/* <textarea value={result} className="result" readOnly></textarea> */}

          <Bubble options={options} data={dataset} />
        </section>
      </div>
    </>
  );
}
`}</pre>
  );
};
export const code3 = () => {
  return (
    <pre>{`import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Algorithm() {
  let [n, setN] = useState(2);
  let [m, setM] = useState(2);

  const [znach, setznach] = useState(
    Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
  );
  const [znach1, setznach1] = useState(
    Array.from({ length: m }, () => Array.from({ length: n }, () => 0))
  );

  const [znach2, setznach2] = useState(
    Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
  );

  useEffect(() => {
    setznach(
      Array.from({ length: n }, () => Array.from({ length: m }, () => 0))
    );
    setznach1(
      Array.from({ length: m }, () => Array.from({ length: n }, () => 0))
    );
    setznach2(
      Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
    );
  }, [n, m]);

  const nChange = (e) => {
    setN((n = +e));
  };

  const mChange = (e) => {
    setM((n = +e));
  };
  const handleChange = (table, row, column, value) => {
    let copy = [...table];
    copy[row][column] = +value;
    setznach(copy);
  };
  const handleChange1 = (table, row, column, value) => {
    let copy = [...table];
    copy[row][column] = +value;
    setznach1(copy);
  };
  const handleChange2 = (table, row, column, value) => {
    let copy = [...table];
    copy[row][column] = +value;
    setznach2(copy);
  };

  const alg = () => {
    let minValue = 0;
    let maxValue = 0;
    for (let indexColumn = 0; indexColumn < n; indexColumn++) {
      for (let indexRow = 0; indexRow < n; indexRow++) {
        minValue = znach[indexRow].map((value, index) =>
          value < znach1[index][indexColumn]
            ? value
            : znach1[index][indexColumn]
        );
        maxValue = Math.max(...minValue);
        handleChange2(znach2, indexRow, indexColumn, maxValue);
      }
    }
  };
  return (
    <>
      <Header />
      <div className="page">
        <div>
          <div>
            Введите кол-во характеристик (m):
            <input
              type="number"
              value={m}
              onChange={(e) => mChange(e.target.value)}
            ></input>
          </div>
          <div>
            Введите кол-во специальностей (n):
            <input
              type="number"
              value={n}
              onChange={(e) => nChange(e.target.value)}
            ></input>
          </div>

          <table className="table">
            <caption>
              <b>Таблица 1</b>
            </caption>
            <tbody>
              <tr>
                <th>
                  <input readOnly={true} value={"Заголовки"}></input>
                </th>
                {znach[0]?.map((count, countIndex) => (
                  <th key={countIndex}>
                    <input
                      readOnly={true}
                      value={"Характеристика " + countIndex}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </th>
                ))}
              </tr>
              {znach?.map((row, rowIndex) => (
                <>
                  <tr key={rowIndex}>
                    <td>
                      <input
                        readOnly={true}
                        value={"Cпециальность " + rowIndex}
                        style={{ backgroundColor: "gray", color: "white" }}
                      ></input>
                    </td>
                    {row.map((column, columnIndex) => (
                      <td key={columnIndex + rowIndex}>
                        <input
                          type="number"
                          onChange={(e) =>
                            handleChange(
                              znach,
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

          <table className="table">
            <caption>
              <b>Таблица 2</b>
            </caption>
            <tbody>
              <tr>
                <th>
                  <input readOnly={true} value={"Заголовки"}></input>
                </th>
                {znach1[0]?.map((count, countIndex) => (
                  <th key={countIndex}>
                    <input
                      readOnly={true}
                      value={"Фамилия " + countIndex}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </th>
                ))}
              </tr>
              {znach1?.map((row1, rowIndex1) => (
                <tr key={rowIndex1 * 2}>
                  <td>
                    <input
                      readOnly={true}
                      value={"Характеристика " + rowIndex1}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </td>
                  {row1.map((column1, columnIndex1) => (
                    <td key={columnIndex1 * 2 + rowIndex1 * 2}>
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChange1(
                            znach1,
                            rowIndex1,
                            columnIndex1,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button
            variant={"outline-dark"}
            style={{ padding: 10, fontWeight: "bold", margin: "20px 0px" }}
            onClick={() => (znach1 && znach2 ? alg() : alert("Заполните поля"))}
          >
            Рассчитать
          </button>

          <table className="table">
            <caption>
              <b>Результат работы</b>
            </caption>
            <tbody>
              <tr>
                <th>
                  <input readOnly={true} value={"Заголовки"}></input>
                </th>
                {znach2[0]?.map((count, countIndex) => (
                  <th key={countIndex}>
                    <input
                      readOnly={true}
                      value={"Фамилия " + countIndex}
                      style={{ backgroundColor: "gray", color: "white" }}
                    ></input>
                  </th>
                ))}
              </tr>
              {znach2?.map((row2, rowIndex2) => (
                <>
                  <tr key={rowIndex2 * 3}>
                    <td>
                      <input
                        readOnly={true}
                        value={"Специальность " + rowIndex2}
                        style={{ backgroundColor: "gray", color: "white" }}
                      ></input>
                    </td>
                    {row2.map((column2, columnIndex2) => (
                      <td key={columnIndex2 * 3 + rowIndex2 * 3}>
                        <input
                          type="number"
                          value={znach2[rowIndex2][columnIndex2]}
                          onChange={(e) =>
                            handleChange2(
                              znach2,
                              rowIndex2,
                              columnIndex2,
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
        </div>
      </div>
    </>
  );
}
`}</pre>
  );
};

export const code4 = () => {
  return (
    <pre>{`import React, { useEffect } from "react";
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
import { Legend } from "chart.js";
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
  );`}</pre>
  );
};
export const code5 = () => {
  return (
    <pre>{`import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

export default function Neuralnetwork() {
  const [n] = useState(3); // кол-во входов
  const [m] = useState(4); // размер обучающей выборки
  const [N, setN] = useState(100000); // кол-во итераций
  const [func, setFunc] = useState(2); //ф-я активации
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
  }, [N, func, K, m, n]);

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
            <div>
              <p htmlFor="img">Архитектура нейросети (2-1)</p>
              <img
                src={require("../asset/struct.png")}
                alt="Архитектура нейросети"
                width={600}
              />
            </div>
          </div>
        </section>

        <section>
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
                \`Для \${test[0][0]} \${test[0][1]}\ny = \${date.y.toFixed(
                  0
                )}\nout[1] = \${date.out[0].toFixed(
                  0
                )}\nout[2] = \${date.out[1].toFixed(0)}\n\`
              );
            }}
          >
            Тестировать
          </button>
          <h4>Результаты тестирования</h4>
          <textarea value={result} className="result" readOnly></textarea>
        </section>
      </div>
    </>
  );
}
`}</pre>
  );
};
export const code7 = () => {
  return (
    <pre>{`import { useState } from "react";
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
      resultat += \`k[\${i}]=[\${kTemp}]\n\`;
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
    let resultat = \`k[\${1}]=[\${x}]\n\`;
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
      console.log(\`после: \${t} итерации:\`, lambda, kt, xt);
      //КОНСОЛЬ
      if (
        x
          .map((value, i) => xt[i] - value < E)
          .reduce((acc, val) => acc * val, 1)
      ) {
        x = Array.from(xt);
        resultat += \`k[\${t}]=[\${x}]\n\`;
        break;
      } else {
        x = Array.from(xt);
        resultat += \`k[\${t}]=[\${x}]\n\`;
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
import React, { useState } from "react";
import Header from "../components/Header";
import PodHeader from "../components/PodHeader";
import Table from "../components/Table";

export default function Third() {
  const [n, setN] = useState(3);
  const [m, setM] = useState(2);
  const [E, setE] = useState(0.01);
  const [result, setResult] = useState("");
  const [nLen, setNLen] = useState(Array.from({ length: n }, () => 0));
  const [values, setValues] = useState(
    Array.from({ length: n }, () =>
      Array.from({ length: m }, () => Array.from({ length: m }, () => 0))
    )
  );
  const updateTable = () => {
    setValues(
      Array.from({ length: n }, () =>
        Array.from({ length: m }, () => Array.from({ length: m }, () => 0))
      )
    );
    setNLen(Array.from({ length: n }, () => 0));
    setResult('')
  };
  const cahnge = (e, index, indX, indY) => {
    let newValues = [...values];
    newValues[index][indX][indY] = +e.target.value;
    setValues(newValues);
  };

  const alg3 = () => {
    const valuesCopy = [...values];
    let matrix = Array.from({ length: m }, () =>
      Array.from({ length: m }, () => 0)
    );
    for (let i = 0; i < n; i++) {
      // eslint-disable-next-line no-loop-func
      valuesCopy[i].map((values, index) =>
        values.map((values1, index1) => (matrix[index][index1] += values1))
      );
    }
    matrix = matrix.map((values) =>
      values.map((value) => +(value / m).toFixed(3))
    );
    let k = Array.from({ length: m }, () => 1);

    let resultat = \`k[\${0}]=[\${k}]\n\`;
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

        resultat += \`k[\${t}]=[\${k}]\n\`;
        break;
      } else {
        k = [...kt];

        resultat += \`k[\${t}]=[\${k}]\n\`;
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
          <div>
            <button onClick={() => updateTable()}>Сохранить/Сбросить</button>
          </div>
          {nLen.map((v, i) => (
            <Table
              title1="Фактор"
              title2="Фактор"
              caption={\`Эксперт \${i + 1}\`}
              values={values[i]}
              cahnge={cahnge}
              index={i}
            ></Table>
          ))}
        </section>

        <section>
          <button
            onClick={() =>
              values.reduce(
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
                ? alg3()
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

    let resultat = \`k[\${0}]=[\${k}]\n\`;
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

        resultat += \`k[\${t}]=[\${k}]\n\`;
        break;
      } else {
        k = [...kt];

        resultat += \`k[\${t}]=[\${k}]\n\`;
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
}`}</pre>
  );
};
export const code8 = () => {
  return (
    <pre>{`import Header from "../components/Header";
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
  }, [n2]);

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
      .map((value, i) => \`\n\${i + 1}. \${value}\`)
      .join("");
    setResult(
      \`Вектор приоритетов: \${res}\n\nλmax: \${lambdaMax}\nИС: \${IS}\nOS: \${OS}\n\`
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
      result[i] = \`λmax: \${lambdaMax}\nИС: \${IS}\nOS: \${OS}\n\`;

      const res = wMatrixSubNormal
        .map((value, i) => \`\n\${i + 1}. \${value}\`)
        .join("");
      result[
        i
      ] = \`Вектор приоритетов: \${res}\n\nλmax: \${lambdaMax}\nИС: \${IS}\nOS: \${OS}\n\`;
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
      \`Глобальные приоритеты: \${globProir
        .map((value, i) => \`\n\${i + 1}. \${value}\`)
        .join("")}\n\nТаким образом рекомендуется выбрать альтернативу \${
        index + 1
      }\`
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
                  caption={\`x\${i + 1}\`}
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
`}</pre>
  );
};
