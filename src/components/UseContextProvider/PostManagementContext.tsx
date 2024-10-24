import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
type IContextPostManagement = {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// Tạo context
export const PostManagementContext = createContext<
  IContextPostManagement | undefined
>(undefined);

// Custom hook để sử dụng context
export const usePostManagementContext = () => {
  const context = useContext(PostManagementContext);
  if (!context) {
    throw new Error(
      "usePostManagementContext must be used within a PostManagementContext.Provider"
    );
  }
  return context;
};
