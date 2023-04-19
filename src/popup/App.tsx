// import { css } from "@emotion/react";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
// import { useEffect, useState } from "react";
// import PreviewUrl, { UrlData } from "../components/PreviewUrl";

// export const GET_OG_CONTENT = ["og:title", "og:image", "og:description"];
// export const URLRegExp =
//   /^(?:(http|https|ftp):\/\/)((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i;

// function App() {
//   const [url, setUrl] = useState("https://");
//   const [value, setValue] = useState<UrlData>();

//   // useEffect(() => {
//   //   if (!URLRegExp.test(url)) {
//   //     console.log("不是正确是 URL 路径");
//   //     return;
//   //   }
//   //   getHtml(url).then(async (html) => {
//   //     const metas = await getMetasFromHtml(html);
//   //     const contents = getMetasContent(metas);
//   //     console.log("contents", contents);
//   //     setValue(contents);
//   //   });
//   // }, [url]);

//   useEffect(() => {
//     getLinkPreview(
//       // "https://www.bilibili.com/video/BV1GP4y1y78F/?spm_id_from=333.788.recommend_more_video.0"
//       "https://www.bilibili.com/video/BV1GP4y1y78F/?spm_id_from=333.788.recommend_more_video.0"
//       // "https://play.tudou.com/v_show/id_XNTk0NDkwOTMyMA==.html?spm=a2hex.20746969_WEBHOME_GRAY.drawer2.d_zj1_2&scm=20140719.manual.25359.video_XNTk0NDkwOTMyMA%3D%3D&playMode=pugv"
//       // "https://v.qq.com/x/cover/mzc00200auwca9q/r0045mxxntl.html"
//       // "https://www.youtube.com/watch?v=0fYi8SGA20k"
//       // "https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser"
//     ).then((res) => {
//       console.log("res", res);
//       setValue(res);
//     });
//   }, []);

//   return (
//     <div
//       className="popup"
//       css={css`
//         height: 800px;
//         width: 500px;

//         .img {
//           height: 240px;
//           width: 320px;
//           object-fit: contain;
//         }
//       `}
//     >
//       {value ? <PreviewUrl data={value} /> : <>loading...</>}
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Mine from "./pages/Mine";
import Explore from "./pages/Explore";
import Follow from "./pages/Follow";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
  return (
    <MemoryRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="explore" element={<Explore />} />
          <Route path="mine" element={<Mine />} />
          <Route path="follow" element={<Follow />} />
          {/* path="user/:id/:name" */}
          <Route index element={<User />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

export default App;
