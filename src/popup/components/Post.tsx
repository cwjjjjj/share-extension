import { css } from "@emotion/react";
import UserSmallCard, { MOCK_IMG } from "./UserSmallCard";
import { Popover } from "antd-mobile";
import { HTMLAttributes, ReactNode } from "react";
import { PostWithUser } from "../types";
import day from "../utils/day";

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  data: PostWithUser;
  renderMore: ReactNode;
}

export default function Post({ data, renderMore, ...props }: PostProps) {
  const { user, title, url, summary, image, scope, viewed, updatedAt } =
    data ?? {};
  console.log("data", data);

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
          white-space: nowrap;
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
          padding: 4px 0;
        }
        main {
          cursor: pointer;
          margin: 0 0 10px 0;
        }
      `}
      {...props}
    >
      <header className="user-header">
        <UserSmallCard data={user} timeFromNow={day(updatedAt).fromNow()} />
        {renderMore && (
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
                {renderMore}
              </section>
            }
            trigger="click"
            placement="right"
            defaultVisible={false}
          >
            <div className="more">···</div>
          </Popover>
        )}
      </header>
      <main
        onClick={() => {
          window.open(url);
        }}
      >
        <h5>{title}</h5>
        <p>{summary}</p>
        {image && <img src={image} alt="img" className="img" />}
      </main>
    </div>
  );
}
