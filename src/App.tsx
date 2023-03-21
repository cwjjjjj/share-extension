import ky from "ky";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useEffect, useState } from "react";

export const GET_OG_CONTENT = ["og:title", "og:image", "og:description"];

function App() {
  const [value, setValue] = useState([]);
  useEffect(() => {
    ky.get("https://v.qq.com/x/cover/mzc00200auwca9q/r0045mxxntl.html")
      .then((response) => {
        // console.log("response", response);
        return response.body as ReadableStream;
      })
      .then((rb) => {
        const reader = rb.getReader();
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  // console.log("done", done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                // console.log(done, value);
                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) =>
        // Respond with our stream
        new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text()
      )
      .then((result) => {
        // Do things with result
        // console.log("result", result);

        var parser = new DOMParser();
        var doc = parser.parseFromString(result, "text/html");
        // console.log("doc", doc);

        // 获取所有meta标签
        const metaTags = doc.getElementsByTagName("meta");
        console.log("metaTags", metaTags);
        // 循环遍历所有meta标签
        for (let i = 0; i < metaTags.length; i++) {
          // 检查meta标签是否有og属性
          if (
            GET_OG_CONTENT.includes(metaTags[i].getAttribute("property") ?? "")
          ) {
            // 如果找到og属性，则获取其内容并将其存储在变量中
            const ogContent = metaTags[i].getAttribute("content");
            console.log(metaTags[i].getAttribute("property"), ogContent);
            setValue((prev) => [...prev, ogContent]);
          }
        }
      });
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
