import React, { useEffect, useState } from "react";
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
  // const [result, setResult] = useState("");

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
            label: `Центр ${group.id}`,
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
  }, [groups, dots]);
  // const [values, setValues] = useState(
  //   Array.from({ length: numClusters }, () => [])
  // );
  // const [centroids, setCentroids] = useState(
  //   Array.from({ length: numClusters }, () => [])
  // );
  // const colors = values.map(
  //   (values) =>
  //     "#" +
  //     ("000000" + Math.floor(Math.random() * 1000001 + 100).toString(16)).slice(
  //       -6
  //     )
  // );
  // const updateValues = () => {
  //   setValues(
  //     Array.from({ length: numClusters }, () =>
  //       Array.from({ length: n }, () => 0)
  //     )
  //   );
  // };

  const restart = () => {
    // setResult("");
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
    // if (!finished) {
    //   setResult(
    //     (prev) =>
    //       prev +
    //       `Результат алгоритма к-средних:\nгруппы, ${groups}\nточки ${dots}`
    //   );
    // }
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
