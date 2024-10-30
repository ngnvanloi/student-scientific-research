import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
type IContextArticleManagement = {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// Tạo context
export const ArticleManagementContext = createContext<
  IContextArticleManagement | undefined
>(undefined);

// Custom hook để sử dụng context
export const useArticleManagementContext = () => {
  const context = useContext(ArticleManagementContext);
  if (!context) {
    throw new Error(
      "useArticleManagementContext must be used within a ArticleManagementContext.Provider"
    );
  }
  return context;
};
