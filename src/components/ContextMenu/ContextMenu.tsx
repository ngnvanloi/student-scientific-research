import * as ContextMenu from "@radix-ui/react-context-menu";
import React, { Fragment, useState } from "react";
import { ModalDeletePost } from "../Modal/ModalDeletePost";
import { usePostManagementContext } from "../UseContextProvider/PostManagementContext";
import { ModalUpdatePost } from "../Modal/ModalUpdatePost";

const menuItems = {
  group_1: [
    {
      name: "Chi tiết",
      command: "",
    },
    {
      name: "Chỉnh sửa",
      command: "",
    },
    {
      name: "Xóa",
      command: "",
    },
  ],
};

export default function PostContextMenu({
  children,
  postID,
}: Readonly<{
  children: React.ReactNode;
  postID: number;
}>) {
  // STATE
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [postTarget, setPostTarget] = useState(-1);

  // HANDLE LOGIC
  const handleOnUpdate = (id: number) => {
    setPostTarget(id);
    setIsModalUpdateOpen(true);
  };
  const handleOnDelete = (id: number) => {
    setPostTarget(id);
    setIsModalDeleteOpen(true);
  };
  const handleOnShow = (id: number) => {
    alert(`Show post ID:, ${id}`);
  };

  // RENDER UI
  return (
    <Fragment>
      <ModalDeletePost
        isOpen={isModalDeleteOpen}
        setIsOpen={setIsModalDeleteOpen}
        postID={postTarget}
      />
      <ModalUpdatePost
        isOpen={isModalUpdateOpen}
        setIsOpen={setIsModalUpdateOpen}
        postID={postTarget}
      />
      <ContextMenu.Root>
        <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content
            className="w-60 rounded-lg bg-white shadow-md border text-[13px] text-gray-800"
            // sideOffset={5}
            // align="end"
          >
            <div className="py-1.5 px-2">
              {/* Group of items without Separator */}
              {menuItems.group_1.map((item, idx) => (
                <ContextMenu.Item
                  key={idx}
                  onClick={() => {
                    if (idx === 0) {
                      handleOnShow(postID);
                    } else if (idx === 1) {
                      handleOnUpdate(postID);
                    } else {
                      handleOnDelete(postID);
                    }
                  }}
                  className="group w-full flex items-center justify-between gap-x-2 px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:bg-blue-600 rounded-lg duration-150 outline-none select-none"
                >
                  {item.name}{" "}
                  <span className="text-gray-500 group-data-[highlighted]:text-white">
                    {item.command}
                  </span>
                </ContextMenu.Item>
              ))}
            </div>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
    </Fragment>
  );
}
export { PostContextMenu };
