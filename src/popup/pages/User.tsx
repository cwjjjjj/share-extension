import { css } from "@emotion/react";
import { Button, NavBar } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { useNavigate, useParams } from "react-router-dom";
import useLoadMore from "../hooks/useLoadMore";
import { POST_LIST, USER_PUBLIC_LIST } from "../constants/api";
import { PostWithUser } from "../types";
import { get } from "../utils";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import Post from "../components/Post";

export default function User() {
  // 获取 params
  const { id, name } = useParams();
  const navigator = useNavigate();

  const { hasNext, onNext, totalData, isLoading, onRefresh, onHardRefresh } =
    useLoadMore<
      { id: string; limit?: number; loadMoreKey?: string },
      PostWithUser
    >([USER_PUBLIC_LIST], async (params) =>
      get(USER_PUBLIC_LIST, { params: { ...params, userId: id } }).then(
        (res) => res.data
      )
    );

  const { ref, onScroll } = useLoadMoreScrollDetect(onNext);

  return (
    <div
      css={css`
        /* menu height */
        padding: 10px;
        height: 100%;
        overflow: hidden;

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

        main {
          height: 100%;
          overflow: auto;
        }
      `}
    >
      <NavBar
        onBack={() => {
          navigator(-1);
        }}
        right={
          <Button color="success" size="mini">
            关注
          </Button>
        }
      >
        <div>
          <div>{name} 在看什么</div>
          <div className="my-nav-bar-subtitle">关注数</div>
        </div>
      </NavBar>
      <div
        ref={ref}
        onScroll={(e) => {
          console.log("scroll");
          if (hasNext) {
            onScroll(e);
          }
        }}
      >
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
    </div>
  );
}
