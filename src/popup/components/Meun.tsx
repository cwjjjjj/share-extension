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
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
      `}
    >
      <hr />
      <div
        css={css`
          width: 100%;
          height: 30px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-items: center;
          background-color: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(15px);

          .menu {
            cursor: pointer;
            height: 100%;
            width: 100%;
            display: grid;
            align-items: center;
            justify-items: center;
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
              key={item.to}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
