import ky from "ky";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useEffect, useState } from "react";
import { getHtml, getMetasContent, getMetasFromHtml } from "./utils";

export const GET_OG_CONTENT = ["og:title", "og:image", "og:description"];

function App() {
  const [value, setValue] = useState([]);
  // useEffect(() => {
  //   // ky.get("https://v.qq.com/x/cover/mzc00200auwca9q/r0045mxxntl.html")
  //   ky.get(
  //     // "https://www.bilibili.com/video/BV1GP4y1y78F/?spm_id_from=333.788.recommend_more_video.0"
  //     // "https://play.tudou.com/v_show/id_XNTk0NDkwOTMyMA==.html?spm=a2hex.20746969_WEBHOME_GRAY.drawer2.d_zj1_2&scm=20140719.manual.25359.video_XNTk0NDkwOTMyMA%3D%3D&playMode=pugv"
  //     // "https://v.qq.com/x/cover/mzc00200auwca9q/r0045mxxntl.html"
  //     // "https://www.youtube.com/watch?v=0fYi8SGA20k"
  //     "https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser"
  //   )
  //     .then((response) => {
  //       return response.body as ReadableStream;
  //     })
  //     .then((rb) => {
  //       const reader = rb.getReader();
  //       return new ReadableStream({
  //         start(controller) {
  //           function push() {
  //             reader.read().then(({ done, value }) => {
  //               if (done) {
  //                 controller.close();
  //                 return;
  //               }
  //               controller.enqueue(value);
  //               push();
  //             });
  //           }
  //           push();
  //         },
  //       });
  //     })
  //     .then((stream) =>
  //       new Response(stream, {
  //         headers: { "Content-Type": "text/html" },
  //       }).text()
  //     )
  //     .then((result) => {
  //       var parser = new DOMParser();
  //       var doc = parser.parseFromString(result, "text/html");
  //       // console.log("doc", doc);
  //       // 获取所有meta标签
  //       const metaTags = doc.getElementsByTagName("meta");
  //       console.log("metaTags", metaTags);
  //       // 循环遍历所有meta标签
  //       for (let i = 0; i < metaTags.length; i++) {
  //         // 检查meta标签是否有og属性
  //         if (
  //           GET_OG_CONTENT.includes(metaTags[i].getAttribute("property") ?? "")
  //         ) {
  //           // 如果找到og属性，则获取其内容并将其存储在变量中
  //           const ogContent = metaTags[i].getAttribute("content");
  //           console.log(metaTags[i].getAttribute("property"), ogContent);
  //           setValue((prev) => [...prev, ogContent]);
  //         }
  //       }
  //     });
  // }, []);
  useEffect(() => {
    getHtml("https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser").then(
      async (html) => {
        const metas = await getMetasFromHtml(html);
        const contents = getMetasContent(metas);
        console.log("contents", contents);
      }
    );
  }, []);

  return (
    <div
      className="App"
      style={{
        fontSize: "20px",
        fontWeight: "500",
        whiteSpace: "nowrap",
      }}
    >
      popup
      {/* {JSON.stringify(value)} */}
      {value.map((item) => {
        return (
          <div>
            {item}
            <img src={item} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default App;
