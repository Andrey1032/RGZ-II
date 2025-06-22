import React from "react";

export default function Table({
  title1 = "Эксперт",
  title2 = "Эксперт",
  title3 = null,
  caption = "",
  values,
  cahnge,
  index,
  flag = false,
}) {
  return (
    <table className="table">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th></th>
          {values[0].map((value, indX) => (
            <th key={title1 + indX + index}>
              {title3 !== null && indX === values[0].length - 1
                ? title3
                : title1}{" "}
              {title3 !== null && indX === values[0].length - 1 ? "" : indX + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((value, indX) => (
          <tr key={title2 + "2" + indX + index}>
            <th>
              {title2} {indX + 1}
            </th>
            {value.map((val, indY) => (
              <td key={indY + title1 + title2 + index}>
                <input
                  type="number"
                  value={values[indX][indY]}
                  onChange={(e) => cahnge(e, index, indX, indY)}
                ></input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
