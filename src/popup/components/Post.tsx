import { css } from "@emotion/react";
import UserSmallCard, { MOCK_IMG } from "./UserSmallCard";
import { Popover } from "antd-mobile";
import { HTMLAttributes } from "react";
import { PostWithUser } from "../types";

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  data: PostWithUser;
}

export default function Post({ data, ...props }: PostProps) {
  const { user } = data ?? {};

  if (!data) {
    return null;
  }

  return (
    <div
      css={css`
        .user-header {
          display: grid;
          grid-template-columns: 200px 30px;
          justify-content: space-between;
          align-items: center;
          justify-items: start;
        }
        .more {
          cursor: pointer;
          justify-self: center;
        }
        .img {
          width: 100%;
          height: 200px;
          object-fit: contain;
        }
        p,
        h5 {
          margin: 0;
        }
      `}
    >
      <header className="user-header">
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
          defaultVisible={false}
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
