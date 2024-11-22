import { ParamsGetListAcceptanceForAllRole } from "@/hooks-query/queries/use-get-list-acceptance-for-all-role";
import { Acceptance } from "@/types/Acceptance";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
type IContextListPubicResearchTopic = {
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
export const ListPubicResearchTopicContext = createContext<
  IContextListPubicResearchTopic | undefined
>(undefined);

// Custom hook để sử dụng context
export const useListPubicResearchTopicContext = () => {
  const context = useContext(ListPubicResearchTopicContext);
  if (!context) {
    throw new Error(
      "useListPubicResearchTopicContext must be used within a ListPubicResearchTopicContext.Provider"
    );
  }
  return context;
};
