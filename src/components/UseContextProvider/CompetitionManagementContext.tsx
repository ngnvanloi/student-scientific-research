import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
type IContextCompetitionManagement = {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// Tạo context
export const CompetitionManagementContext = createContext<
  IContextCompetitionManagement | undefined
>(undefined);

// Custom hook để sử dụng context
export const useCompetitionManagementContext = () => {
  const context = useContext(CompetitionManagementContext);
  if (!context) {
    throw new Error(
      "useCompetitionManagementContext must be used within a CompetitionManagementContext.Provider"
    );
  }
  return context;
};
