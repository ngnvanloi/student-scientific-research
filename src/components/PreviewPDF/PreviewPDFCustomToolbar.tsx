"use client";
import * as React from "react";
import { Viewer, RenderPageProps, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

interface PreviewPDFCustomToolbarProps {
  fileUrl: string;
}

const CustomPageLayer: React.FC<{
  renderPageProps: RenderPageProps;
}> = ({ renderPageProps }) => {
  React.useEffect(() => {
    if (renderPageProps.canvasLayerRendered) {
      renderPageProps.markRendered(renderPageProps.pageIndex);
    }
  }, [renderPageProps.canvasLayerRendered]);

  return (
    <>
      {renderPageProps.canvasLayer.children}
      {renderPageProps.annotationLayer.children}
    </>
  );
};

const PreviewPDFCustomToolbar: React.FC<PreviewPDFCustomToolbarProps> = ({
  fileUrl,
}) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const renderPage = (props: RenderPageProps) => (
    <CustomPageLayer renderPageProps={props} />
  );

  return (
    <div
      className="rpv-core__viewer"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#eeeeee",
          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          padding: "4px",
        }}
      >
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              Download,
              CurrentPageInput,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              Zoom,
              ZoomIn,
              ZoomOut,
            } = props;
            return (
              <>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomOut />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Zoom />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <ZoomIn />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <GoToPreviousPage />
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    padding: "0px 2px",
                  }}
                >
                  <CurrentPageInput /> / <NumberOfPages />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <GoToNextPage />
                </div>
                <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                  <EnterFullScreen />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Print />
                </div>
                <div style={{ padding: "0px 2px" }}>
                  <Download />
                </div>
              </>
            );
          }}
        </Toolbar>
      </div>
      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={fileUrl}
            renderPage={renderPage}
            plugins={[toolbarPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PreviewPDFCustomToolbar;
