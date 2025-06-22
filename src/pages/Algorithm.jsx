import React, { useEffect, useState } from "react";
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
