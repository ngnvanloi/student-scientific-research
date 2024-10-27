"use client";
import { auth } from "@/auth";
import CompetitionCard from "@/components/CompetitionCard/CompetitionCard";
import PostCard from "@/components/PostCard/PostCard";
import PreviewPDF from "@/components/PreviewPDF/PreviewPDF";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { CardDemo } from "@/components/TestCard/TextCard";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState<string>("");
  return (
    <>
      <div>Home Page</div>
      {/* <RichTextEditor content={content} setContent={setContent} /> */}
      {/* <CardDemo /> */}
      {/* <PreviewPDF fileUrl="https://firebasestorage.googleapis.com/v0/b/seminarclouds.appspot.com/o/2017_MoldovanA_Ethesis.pdf?alt=media&token=e3ee4288-f47c-4f23-afe8-168375122c50" /> */}
    </>
  );
}
