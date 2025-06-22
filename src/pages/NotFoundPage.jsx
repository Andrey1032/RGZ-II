import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404 Страница не найдена</h1>

      <Link to="/">Домашняя</Link>
    </div>
  );
}
