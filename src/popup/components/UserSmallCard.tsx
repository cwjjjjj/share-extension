import { css } from "@emotion/react";
import Avatar from "./Avatar";
import { HTMLAttributes } from "react";
import { User } from "../types";

export const MOCK_IMG =
  "https://avatars.githubusercontent.com/u/22167673?s=48&v=4";

export interface UserSmallCardProps extends HTMLAttributes<HTMLDivElement> {
  data: User;
  timeFromNow?: string;
}

export default function UserSmallCard({
  data,
  timeFromNow,
  ...props
}: UserSmallCardProps) {
  if (!data) {
    return null;
  }

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 40px 30px 60px;
        justify-items: center;
        align-items: center;
        cursor: pointer;
      `}
      onClick={() => {
        console.log("click", data.id);
      }}
      {...props}
    >
      <Avatar src={data?.avatar} />
      <span>{data?.nickname}</span>
      {timeFromNow && <span>{timeFromNow}</span>}
    </div>
  );
}
