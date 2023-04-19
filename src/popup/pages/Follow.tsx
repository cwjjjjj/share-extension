import { getCurrentTab } from "../utils/getCurrentTab";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import SharePopup from "../components/SharePopup";
import { useEffect } from "react";

export default function Follow() {
  return (
    <div>
      follow
      <header>
        <SharePopup />
      </header>
      <main>内容</main>
    </div>
  );
}
