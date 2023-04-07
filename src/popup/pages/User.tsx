import { css } from "@emotion/react";
import { Button } from "antd-mobile";
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
      <header className="header">
        <div className="arrow">
          <LeftOutline />
        </div>

        <h4>xxx 在关注什么</h4>
        <Button color="success" size="mini">
          关注
        </Button>
      </header>
      <main>content</main>
    </div>
  );
}
