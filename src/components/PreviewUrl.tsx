import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

export type UrlData = Partial<{
  url: string;
  mediaType: string;
  contentType: string | undefined;
  favicons: string[];
  title: string;
  siteName: string | undefined;
  description: string | undefined;
  images: string[];
  videos: {
    url: string | undefined;
    secureUrl: string | null | undefined;
    type: string | null | undefined;
    width: string | undefined;
    height: string | undefined;
  }[];
}>;

export interface PreviewUrlProps extends HTMLAttributes<HTMLDivElement> {
  data: UrlData;
}

export default function PreviewUrl({ data, ...props }: PreviewUrlProps) {
  console.log("data", data);
  if (!data) {
    return null;
  }
  return (
    <div
      {...props}
      css={css`
        height: 800px;
        width: 500px;
      `}
    >
      <h4>
        {data?.title}
        <img src={data?.favicons?.[0]} alt="" />
      </h4>
      <p>{data?.description}</p>
      <img src={data?.images?.[0]} alt="" />
    </div>
  );
}
