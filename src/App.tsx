import { css } from "@emotion/react";
import ky from "ky";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useEffect, useState } from "react";
import PreviewUrl, { UrlData } from "./components/PreviewUrl";
import { getHtml, getMetasContent, getMetasFromHtml } from "./utils";

export const GET_OG_CONTENT = ["og:title", "og:image", "og:description"];
export const URLRegExp =
  /^(?:(http|https|ftp):\/\/)((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;

function App() {
  const [url, setUrl] = useState("https://");
  const [value, setValue] = useState<UrlData>();

  // useEffect(() => {
  //   if (!URLRegExp.test(url)) {
  //     console.log("不是正确是 URL 路径");
  //     return;
  //   }
  //   getHtml(url).then(async (html) => {
  //     const metas = await getMetasFromHtml(html);
  //     const contents = getMetasContent(metas);
  //     console.log("contents", contents);
  //     setValue(contents);
  //   });
  // }, [url]);

  useEffect(() => {
    getLinkPreview(
      // "https://www.bilibili.com/video/BV1GP4y1y78F/?spm_id_from=333.788.recommend_more_video.0"
      "https://www.bilibili.com/video/BV1GP4y1y78F/?spm_id_from=333.788.recommend_more_video.0"
      // "https://play.tudou.com/v_show/id_XNTk0NDkwOTMyMA==.html?spm=a2hex.20746969_WEBHOME_GRAY.drawer2.d_zj1_2&scm=20140719.manual.25359.video_XNTk0NDkwOTMyMA%3D%3D&playMode=pugv"
      // "https://v.qq.com/x/cover/mzc00200auwca9q/r0045mxxntl.html"
      // "https://www.youtube.com/watch?v=0fYi8SGA20k"
      // "https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser"
    ).then((res) => {
      console.log("res", res);
      setValue(res);
    });
  }, []);

  return (
    <div
      className="popup"
      css={css`
        height: 800px;
        width: 500px;

        .img {
          height: 240px;
          width: 320px;
          object-fit: contain;
        }
      `}
    >
      {value ? <PreviewUrl data={value} /> : <>loading...</>}
      {/* <input
        type="text"
        // value={url}
        defaultValue="https://"
        onBlur={(e) => {
          setUrl(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setUrl(e.target.value);
          }
        }}
      /> */}
      {/* {value?.map((item) => {
        console.log("item", item);
        // title
        if (item?.[GET_OG_CONTENT[0]]) {
          return (
            <h3 key={item[GET_OG_CONTENT[0]]}>{item[GET_OG_CONTENT[0]]}</h3>
          );
        }
        // description
        if (item?.[GET_OG_CONTENT[2]]) {
          return <p key={item[GET_OG_CONTENT[2]]}>{item[GET_OG_CONTENT[2]]}</p>;
        }
        // image
        if (item?.[GET_OG_CONTENT[1]]) {
          return (
            <img
              className="img"
              src={item[GET_OG_CONTENT[1]]}
              alt="previewImg"
              key={item[GET_OG_CONTENT[1]]}
            />
          );
        }
        // return (
        //   <div key={JSON.stringify(item)}>
        //     {item[GET_OG_CONTENT[1]] && <span>{item[GET_OG_CONTENT[1]]}</span>}
        //     {item[GET_OG_CONTENT[3]] && <span>{item[GET_OG_CONTENT[3]]}</span>}
        //     {item[GET_OG_CONTENT[2]] && (
        //       <img src={item[GET_OG_CONTENT[2]]} alt="" />
        //     )}
        //   </div>
        // );
      })} */}
    </div>
  );
}

export default App;
