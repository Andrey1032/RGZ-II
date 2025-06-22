import React from "react";
import {
    RPProvider,
    RPDefaultLayout,
    RPPages,
    RPConfig,
} from "@pdf-viewer/react";

export default function PDFViewer({ src }) {
    return (
        <RPConfig>
            <RPProvider src={src}>
                <RPDefaultLayout style={{ height: "80vh" }}>
                    <RPPages />
                </RPDefaultLayout>
            </RPProvider>
        </RPConfig>
    );
}
