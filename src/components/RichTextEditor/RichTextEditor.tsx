"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface IProps {
  content: string;
  setContent: (value: string) => void;
}
export default function RichTextEditor(props: IProps) {
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], //
      ["blockquote", "code-block"],
      ["link", "image"], // "video", "formula"

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      // [{ direction: "rtl" }], // text direction
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      [{ align: [] }],
      // ["clean"], // remove formatting button
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    props.setContent(newContent);
  };
  return (
    // <div className="w-full h-[300px] overflow-auto">
    //   <QuillEditor
    //     value={props.content}
    //     onChange={handleEditorChange}
    //     modules={quillModules}
    //     formats={quillFormats}
    //     className="w-full h-full bg-white border-none"
    //   />
    // </div>
    <QuillEditor
      value={props.content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full h-[100%] bg-white"
    />
  );
}
