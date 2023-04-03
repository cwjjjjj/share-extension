import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Meun from "./Meun";

export default function Layout() {
  return (
    <div
      css={css`
        color: red;
        height: 600px;
        width: 400px;
        padding: 5px;
      `}
    >
      <main
        css={css`
          height: calc(100% - 30px);
        `}
      >
        <Outlet />
      </main>
      <Meun />
    </div>
  );
}
