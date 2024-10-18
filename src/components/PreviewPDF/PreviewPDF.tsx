"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";

interface IProps {
  fileUrl: string;
}

const PreviewPDF = (props: IProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(props.fileUrl);
  }, [props.fileUrl]);
  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
      >
        {url ? (
          <Viewer
            fileUrl={url}
            plugins={[defaultLayoutPluginInstance]}
            theme={"dark"}
          />
        ) : (
          <div
            style={{
              alignItems: "center",
              border: "2px dashed #cccccc",
              display: "flex",
              fontSize: "2rem",
              height: "100%",
              justifyContent: "center",
              width: "100%",
              color: "#cccccc",
            }}
          >
            Preview area
          </div>
        )}
      </Worker>
    </div>
  );
};
export default PreviewPDF;
