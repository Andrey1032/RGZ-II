import React, { useEffect, useState } from "react";
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
                data[i] += ` ${i}`;
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

    if (path[beginIndex][endIndex]?.indexOf(`${endIndex}`)) {
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
      if (itog[0].indexOf(`${i}`) === -1) {
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
