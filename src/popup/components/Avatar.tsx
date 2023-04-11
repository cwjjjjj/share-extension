import { css } from "@emotion/react";
import { ImgHTMLAttributes } from "react";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  showDot?: boolean;
}

export default function Avatar({
  showDot = false,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      css={css`
        position: relative;

        .dot {
          position: absolute;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background-color: var(--dot-red);
          z-index: 1;
          right: 0px;
          bottom: 6px;
          border: 2px solid #ffffff;
        }
      `}
      className={className}
    >
      <img
        css={css`
          width: 28px;
          height: 28px;
          object-fit: cover;
          border-radius: 50%;
        `}
        alt="avatar"
        {...props}
      />
      {showDot && <div className="dot" />}
    </div>
  );
}
