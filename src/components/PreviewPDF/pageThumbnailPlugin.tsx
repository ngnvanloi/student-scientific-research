import * as React from "react";
import type { Plugin, RenderViewer } from "@react-pdf-viewer/core";

export interface PageThumbnailPluginProps {
  PageThumbnail: React.ReactElement;
}

export const pageThumbnailPlugin = (
  props: PageThumbnailPluginProps
): Plugin => {
  const { PageThumbnail } = props;

  return {
    renderViewer: (renderProps: RenderViewer) => {
      let { slot } = renderProps;

      if (slot) {
        // Đặt PageThumbnail vào slot.children
        slot.children = PageThumbnail;

        // Kiểm tra nếu subSlot tồn tại trước khi gán giá trị
        if (slot.subSlot) {
          slot.subSlot.attrs = {};
          slot.subSlot.children = <></>;
        }
      }

      return slot;
    },
  };
};
