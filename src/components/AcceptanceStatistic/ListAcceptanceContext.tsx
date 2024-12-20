import { ParamsGetListAcceptanceForAllRole } from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { Acceptance } from "@/types/Acceptance";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
type IContextListAcceptance = {
  paramsFilter: ParamsGetListAcceptanceForAllRole;
  setParamsFilter: React.Dispatch<
    React.SetStateAction<ParamsGetListAcceptanceForAllRole>
  >;
  listPublicResearchTopic: Acceptance[] | undefined;
  setListPublicResearchTopic: React.Dispatch<
    React.SetStateAction<Acceptance[] | undefined>
  >;
};

// Tạo context
export const ListAcceptanceContext = createContext<
  IContextListAcceptance | undefined
>(undefined);

// Custom hook để sử dụng context
export const useListAcceptanceContext = () => {
  const context = useContext(ListAcceptanceContext);
  if (!context) {
    throw new Error(
      "useListAcceptanceContext must be used within a ListAcceptanceContext.Provider"
    );
  }
  return context;
};
