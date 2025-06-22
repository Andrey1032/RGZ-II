import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      <Link to="/" className={"link"}>
        <p>Задача коммивояжера (Практика-1)</p>
      </Link>
      <Link to="/kmeans" className={"link"}>
        <p>K-means кластеризация (Практика-2)</p>
      </Link>
      <Link to="/algorithm" className={"link"}>
        <p>Композиционное правило Max-min (Практика-3)</p>
      </Link>
      <Link to="/alg4" className={"link"}>
        <p>Функция принадлежности (Практика-4)</p>
      </Link>
      <Link to="/neural" className={"link"}>
        <p>Нейронная сеть (Практика-5)</p>
      </Link>
      <Link to="/first" className={"link"}>
        <p>Расчет групповых оценок мероприятий (Практика-7)</p>
      </Link>
      <Link to="/alg8" className={"link"}>
        <p>Принятие решений методом анализа иерархий (Практика-8)</p>
      </Link>
      <Link to="/help" className={"link"}>
        <p>Справка</p>
      </Link>
    </div>
  );
}
