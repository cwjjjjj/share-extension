import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { get } from "../utils";

export default function Login() {
  const navigator = useNavigate();

  return (
    <div
      css={css`
        color: red;
      `}
    >
      Login
      <button
        onClick={() => {
          navigator("./mine");
        }}
      >
        to mine
      </button>
      <div
        onClick={() => {
          get("123");
        }}
      >
        test
      </div>
    </div>
  );
}
