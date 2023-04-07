import { css } from "@emotion/react";
import Avatar from "./Avatar";

export const MOCK_IMG =
  "https://avatars.githubusercontent.com/u/22167673?s=48&v=4";

export default function UserSmallCard() {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 40px 30px 60px;
        justify-items: center;
        align-items: center;
      `}
    >
      <Avatar src={MOCK_IMG} />
      <span>大头</span>
      <span>几分钟前</span>
    </div>
  );
}
