import React, { useEffect, useState } from "react";
import { Button, CenterPopup, Image, Input } from "antd-mobile";
import { HTMLAttributes } from "react";
import { useRecoilState } from "recoil";
import { currentHtmlInfoState, sharePopupState } from "../store";
import { getCurrentTab } from "../utils/getCurrentTab";
import { getLinkPreview } from "link-preview-js";
import { UrlData } from "./PreviewUrl";
import { css } from "@emotion/react";

export interface SharePopupProps extends HTMLAttributes<HTMLDivElement> {}

export default ({ children, ...props }: SharePopupProps) => {
  const [visible, setVisible] = useRecoilState(sharePopupState);
  const [currentTabInfo, setCurrentTabInfo] =
    useRecoilState(currentHtmlInfoState);

  const handleHtmlInfo = async () => {
    const tabInfo = await getCurrentTab();
    const { url, title, favIconUrl } = tabInfo ?? {};
    if (!url) {
      return;
    }
    const htmlInfo = await getLinkPreview(url);
    setCurrentTabInfo(Object.assign({}, htmlInfo, tabInfo));
  };

  useEffect(() => {
    handleHtmlInfo();
  }, []);

  console.log("currentTabInfo", currentTabInfo);

  return (
    <div>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        share
      </button>
      <CenterPopup
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
      >
        <div
          css={css`
            padding: 10px;
            display: grid;
            gap: 5px;
          `}
        >
          {currentTabInfo?.url && (
            <Input defaultValue={currentTabInfo?.url} disabled />
          )}
          <img
            css={css`
              height: 20px;
              width: 20px;
            `}
            src={currentTabInfo?.favIconUrl ?? currentTabInfo?.favicons?.[0]}
            alt=""
          />
          {currentTabInfo?.title}
          {currentTabInfo?.description && (
            <Input defaultValue={currentTabInfo?.description} />
          )}
          {currentTabInfo?.mediaType}
          {currentTabInfo?.images?.length && (
            <Image src={currentTabInfo.images[0]} fit="contain" />
          )}
        </div>
      </CenterPopup>
    </div>
  );
};
