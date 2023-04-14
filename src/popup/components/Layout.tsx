import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import Meun from "./Meun";
import { Button } from "antd-mobile";

export default function Layout() {
  const navigator = useNavigate();
  return (
    <div
      css={css`
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
        <header>
          {import.meta.env.VITE_DEV_ENV}
          <Button
            onClick={() => {
              navigator("./login");
            }}
          >
            login
          </Button>
        </header>
        <Outlet />
      </main>
      <Meun />
    </div>
  );
}
