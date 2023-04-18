import { css } from "@emotion/react";
import UserSmallCard from "../components/UserSmallCard";
import { SetOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { get, post } from "../utils";
import { POST_LIST } from "../constants/api";
import useLoadMoreScrollDetect from "../hooks/useLoadMoreScrollDetect";
import { Post as PostType, PostWithUserId } from "../types";
import Post from "../components/Post";

export default function Mine() {
  const [data, setData] = useState<PostWithUserId[]>([]);
  const { ref, onScroll } = useLoadMoreScrollDetect();
  useEffect(() => {
    get(POST_LIST)
      .then((res) => res.data)
      .then((data) => setData(data.data));
  }, []);

  return (
    <div
      css={css`
        .header {
          display: grid;
          grid-template-columns: 200px 60px;
          justify-content: space-between;
          justify-items: center;
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
    >
      <header className="header">
        <div>
          <p>xxx在看什么</p>
          <p>
            订阅者 0<span className="copy">复制订阅链接</span>
          </p>
        </div>
        <div>
          <SetOutline />
        </div>
      </header>
      <div ref={ref} onScroll={onScroll}>
        {data.map((item) => {
          console.log("data", data);
          return (
            <div key={item.id}>
              {item.user.id}
              <Post data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
