import React from "react";
import PDFViewer from "./PDFViewer";

export default function TeoriaContent({ src, codes }) {
    return (
        <section className="content">
            <PDFViewer src={src} />
            <details className="details">
                <summary className="title">Листинг на React JS</summary>
                {codes}
            </details>
        </section>
    );
}
