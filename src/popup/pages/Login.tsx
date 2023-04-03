import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
}
