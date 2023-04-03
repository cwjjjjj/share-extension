import { getCurrentTab } from "../utils/getCurrentTab";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export default function Follow() {
  const handleShare = async () => {
    const tabInfo = await getCurrentTab();
    const { url, title, favIconUrl } = tabInfo ?? {};
    if (!url) {
      return;
    }
    const htmlInfo = await getLinkPreview(url);
    console.log("info", htmlInfo, url, title, favIconUrl);
  };
  return (
    <div>
      <header>
        <button onClick={handleShare}>分享当前网页</button>
      </header>

      <main>内容</main>
    </div>
  );
}
