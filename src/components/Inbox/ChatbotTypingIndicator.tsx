import React from "react";

const ChatbotTypingIndicator = () => {
  return (
    <div className="flex items-center justify-center h-20">
      <div className="relative flex space-x-2">
        <div className="w-[5px] h-[5px] bg-blue-900 rounded-full animate-bounce"></div>
        <div className="w-[5px] h-[5px] bg-blue-900 rounded-full animate-bounce delay-150"></div>
        <div className="w-[5px] h-[5px] bg-blue-900 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export { ChatbotTypingIndicator };
