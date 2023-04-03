import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const MENU_LIST = [
  //   {
  //     name: "login",
  //     to: "login",
  //   },
  {
    name: "关注",
    to: "follow",
  },
  {
    name: "发现",
    to: "explore",
  },
  {
    name: "我的",
    to: "mine",
  },
];

export default function Meun() {
  const navigator = useNavigate();
  return (
    <div
      css={css`
        width: 100%;
        height: 30px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        background: pink;

        .menu {
          cursor: pointer;
          height: 100%;
          width: 100%;
        }
      `}
    >
      {MENU_LIST.map((item) => {
        return (
          <div
            onClick={() => {
              navigator(`./${item.to}`);
            }}
            className="menu"
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}
