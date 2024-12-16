"use client";
import { useState } from "react";
import { CompetitionManagementContext } from "../UseContextProvider/CompetitionManagementContext";
import { ModalAddNewCompetition } from "../Modal/ModalAddNewCompetition";
import { CompetitionListForAdmin } from "../CompetitionList/CompetitionList";

const AdminCompetitionPageComponent = () => {
  const [isChange, setIsChange] = useState<boolean>(false);
  return (
    <CompetitionManagementContext.Provider value={{ isChange, setIsChange }}>
      <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
        <ModalAddNewCompetition />
        <div className="max-w-lg mt-3">
          <h1 className="text-3xl text-gray-800 font-semibold">
            Quản lý cuộc thi
          </h1>
          <p className="mt-3 text-gray-500">
            Chức năng này cho phép ban tổ chức quản lý toàn bộ quy trình tổ chức
            một cuộc thi, từ giai đoạn lập kế hoạch đến khi hoàn tất
          </p>
        </div>
        <CompetitionListForAdmin />
      </section>
    </CompetitionManagementContext.Provider>
  );
};

export { AdminCompetitionPageComponent };
