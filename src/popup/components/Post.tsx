import { css } from "@emotion/react";
import UserSmallCard, { MOCK_IMG } from "./UserSmallCard";
import { Popover } from "antd-mobile";
export default function Post() {
  return (
    <div
      css={css`
        .header {
          display: grid;
          grid-template-columns: 1fr 30px;
          align-items: center;
        }
        .more {
          cursor: pointer;
        }
        .img {
          width: 100%;
          height: 200px;
          object-fit: contain;
        }
      `}
    >
      <header className="header">
        <UserSmallCard />
        <Popover
          content={
            <section
              css={css`
                display: grid;
                gap: 5px;
                padding: 10px;

                .item {
                  padding: 5px 0;
                }
              `}
            >
              <div className="item">取消关注</div>
              <div className="item">取消关注</div>
              <div className="item">取消关注</div>
            </section>
          }
          trigger="click"
          placement="right"
          defaultVisible
        >
          <div className="more">···</div>
        </Popover>
      </header>
      <h5>这是一个标题</h5>
      <p>这是一段描述</p>
      <img src={MOCK_IMG} alt="img" className="img" />
    </div>
  );
}
