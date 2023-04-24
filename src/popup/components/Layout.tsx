import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router-dom";
import Meun from "./Meun";
import { Button } from "antd-mobile";
import SharePopup from "./SharePopup";
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "../constants/api";
import { get } from "../utils";
import { User } from "../types";
import { useRecoilState } from "recoil";
import { userState } from "../store";

export default function Layout() {
  const navigator = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const { data: profile } = useQuery({
    queryKey: [USER_PROFILE],
    queryFn: async () =>
      get<{ success: boolean; data: User }>(USER_PROFILE).then(
        (res) => res.data.data
      ),
    onSuccess: (data) => {
      setUser(data);
      if (!data?.nickname || !data?.avatar) {
        navigator("./profile-setting");
      }
    },
  });

  return (
    <div
      css={css`
        height: 600px;
        width: 400px;
        padding: 5px;
      `}
    >
      <main
        css={css`
          height: calc(100% - 30px);
        `}
      >
        {/* <header>
          {import.meta.env.VITE_DEV_ENV}
          <Button
            onClick={() => {
              navigator("./login");
            }}
          >
            login
          </Button>
        </header> */}
        <Outlet />
      </main>
      <Meun />
    </div>
  );
}
