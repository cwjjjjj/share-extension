import { css } from "@emotion/react";
import UserSmallCard from "../components/UserSmallCard";
import { SetOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { get, post } from "../utils";
import { POST_LIST, USER_PROFILE } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser, User } from "../types";
import Post from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import useLoadMore from "../hooks/useLoadMore";

export default function Mine() {
  const { hasNext, onNext, totalData, isLoading } = useLoadMore<
    { limit?: number; loadMoreKey?: string },
    PostWithUser
  >([POST_LIST], async (params) =>
    get(POST_LIST, { params }).then((res) => res.data)
  );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);

  const { data: profile } = useQuery({
    queryKey: [USER_PROFILE],
    queryFn: async () =>
      get<{ success: boolean; data: User }>(USER_PROFILE).then(
        (res) => res.data.data
      ),
  });

  return (
    <div
      css={css`
        /* menu height */
        padding: 10px;
        height: 100%;
        overflow: auto;

        .header {
          display: grid;
          grid-template-columns: 200px 30px;
          justify-content: space-between;
          justify-items: start;
          align-items: center;

          p {
            margin: 0;
          }
          .copy {
            background: rgba(0, 0, 0, 0.1);
            margin: 0 5px;
            padding: 1px 5px;
            cursor: pointer;
          }
        }
      `}
      ref={ref}
      onScroll={(e) => {
        console.log("scroll");
        onScroll(e);
      }}
    >
      <header className="header">
        <div>
          <p>xxx在看什么</p>
          <p>
            订阅者 0<span className="copy">复制订阅链接</span>
          </p>
        </div>
        <div
          css={css`
            justify-self: center;
          `}
        >
          <SetOutline />
        </div>
      </header>
      <div>
        {totalData.map((item) => {
          return (
            <div key={item.id}>
              {/* {item.user.id} */}
              <Post data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
