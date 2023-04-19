import { css } from "@emotion/react";
import { Button, NavBar } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";

export default function User() {
  return (
    <div
      css={css`
        .header {
          display: grid;
          grid-template-columns: 40px 1fr 80px;
          align-items: center;
          justify-items: center;
        }
        .arrow {
          cursor: pointer;
          padding: 10px;
        }
      `}
    >
      <NavBar
        onBack={() => {
          console.log("back");
        }}
        right={
          <Button color="success" size="mini">
            关注
          </Button>
        }
      >
        <div>
          <div>xxx 在看什么</div>
          <div className="my-nav-bar-subtitle">关注数</div>
        </div>
      </NavBar>
      <main>content</main>
    </div>
  );
}
