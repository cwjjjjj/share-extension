import { css } from "@emotion/react";
import { get } from "../utils";
import { FOLLOW_POST_LIST, POST_LIST } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUser } from "../types";
import Post from "../components/Post";
import useLoadMore from "../hooks/useLoadMore";
import { useNavigate } from "react-router-dom";
import SharePopup from "../components/SharePopup";
import logo from "../assets/logo.png";

export default function Follow() {
  const navigator = useNavigate();
  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<{ limit?: number; loadMoreKey?: string }, PostWithUser>(
      [FOLLOW_POST_LIST],
      async (params) =>
        get(FOLLOW_POST_LIST, { params }).then((res) => res.data)
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
          grid-template-columns: 100px 110px;
          justify-content: space-between;
          justify-items: start;
          align-items: center;
          padding-bottom: 10px;

          img {
            width: 100%;
          }

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
      <header className="header">
        <img src={logo} alt="" />
        <SharePopup />
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
