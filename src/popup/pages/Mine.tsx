import { css } from "@emotion/react";
import { SetOutline } from "antd-mobile-icons";
import { get, post } from "../utils";
import { POST_LIST, USER_PROFILE } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser, User } from "../types";
import Post from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import useLoadMore from "../hooks/useLoadMore";
import { useNavigate } from "react-router-dom";

export default function Mine() {
  const navigator = useNavigate();
  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<{ limit?: number; loadMoreKey?: string }, PostWithUser>(
      [POST_LIST],
      async (params) => get(POST_LIST, { params }).then((res) => res.data)
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);

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
          padding-bottom: 10px;

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
        if (hasNext) {
          onScroll(e);
        }
      }}
    >
      <button
        onClick={() => {
          navigator("../user/6438cccfedce67104afa5ab0/没有名字");
        }}
      >
        跳转到用户页面
      </button>
      <header className="header">
        <div>
          <p
            css={css`
              font-weight: 700;
              font-size: 16px;
            `}
          >
            xxx在看什么
          </p>
          <p
            css={css`
              opacity: 0.7;
              font-size: 12px;
            `}
          >
            订阅者 0<span className="copy">复制订阅链接</span>
          </p>
        </div>
        <div
          css={css`
            justify-self: center;
          `}
          onClick={() => navigator("../profile-setting")}
        >
          <SetOutline
            css={css`
              height: 20px;
              width: 20px;
            `}
          />
        </div>
      </header>

      <div>
        {totalData.map((item) => {
          return (
            <div key={item.id}>
              {/* {item.user.id} */}
              <Post data={item} renderMore={<>123</>} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
