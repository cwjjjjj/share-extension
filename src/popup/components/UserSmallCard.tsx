import { css } from "@emotion/react";
import Avatar from "./Avatar";
import { HTMLAttributes } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

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
  const navigator = useNavigate();

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
        navigator(`../user/${data?.id}/${data.nickname}`);
      }}
      {...props}
    >
      <Avatar src={data?.avatar} />
      <span>{data?.nickname}</span>
      {timeFromNow && <span>{timeFromNow}</span>}
    </div>
  );
}
