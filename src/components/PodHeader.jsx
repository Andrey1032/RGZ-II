import React from "react";
import { Link } from "react-router-dom";

export default function PodHeader() {
  return (
    <div className="header pod">
      <Link to="/first" className={"link"}>
        <p>Компетентность экспертов (Практика-7 часть 1)</p>
      </Link>
      <Link to="/second" className={"link"}>
        <p>Групповая экспертная оценка (Практика-7 часть 2)</p>
      </Link>
      <Link to="/third" className={"link"}>
        <p>Метод парных сравнений (Практика-7 часть 3)</p>
      </Link>
      <Link to="/fourth" className={"link"}>
        <p>Метод обобщенных ранжировок (Практика-7 часть 4)</p>
      </Link>
    </div>
  );
}
