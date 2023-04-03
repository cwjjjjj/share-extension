import { getCurrentTab } from "../utils/getCurrentTab";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { useState } from "react";

export default function Follow() {
  const [htmlInfo, setHtmlInfo] = useState({});
  const handleShare = async () => {
    const tabInfo = await getCurrentTab();
    const { url, title, favIconUrl } = tabInfo ?? {};
    if (!url) {
      return;
    }
    const htmlInfo = await getLinkPreview(url);
    setHtmlInfo({ htmlInfo, url, title, favIconUrl });
    console.log("info", htmlInfo, url, title, favIconUrl);
  };
  return (
    <div>
      <header>
        <button onClick={handleShare}>分享当前网页</button>
      </header>
      {JSON.stringify(htmlInfo)}
      <main>内容</main>
    </div>
  );
}
