import React from "react";
import { Link } from "react-router-dom";

export default function PodHeader() {
  return (
    <div className="header pod">
      <Link to="/help" className={"link"}>
        <p>О программе</p>
      </Link>
      <Link to="/teoria" className={"link"}>
        <p>Теоретическая часть</p>
      </Link>
    </div>
  );
}
