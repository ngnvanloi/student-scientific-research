import React, { useState } from "react";

const CopyButton = () => {
  const [contentGenerate, setContentGenerate] =
    useState<string>("Nội dung cần copy");

  const handleCopy = async () => {
    try {
      // Copy nội dung vào clipboard
      await navigator.clipboard.writeText(contentGenerate);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Copy failed!");
    }
  };

  return (
    <div>
      <textarea
        value={contentGenerate}
        onChange={(e) => setContentGenerate(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleCopy}>Copy</button>
    </div>
  );
};

export { CopyButton };
