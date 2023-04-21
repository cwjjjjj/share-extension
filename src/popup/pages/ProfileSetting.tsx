import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AVATAR_LIST, PROFILE_UPDATE, USER_PROFILE } from "../constants/api";
import { get, post } from "../utils";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import { Button, Input, Toast } from "antd-mobile";

export default function ProfileSetting() {
  const queryClient = useQueryClient();
  const { data: avatarList } = useQuery<string[]>({
    queryKey: [AVATAR_LIST],
    queryFn: async () => get(AVATAR_LIST).then((res) => res.data.data),
  });

  const [user, setUser] = useRecoilState(userState);

  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    user?.avatar
  );
  const [currentNickname, setCurrentNickname] = useState<string | undefined>(
    user?.nickname
  );

  return (
    <div
      css={css`
        padding: 10px;
        height: 100%;
        overflow: auto;
        display: grid;
        gap: 5px;
        align-items: start;
        justify-items: start;
        grid-template-rows: 50px 1fr 50px;

        .avatar-list {
          display: flex;
          flex-wrap: wrap;
        }

        .avatar-wrap {
          width: 40px;
          height: 40px;

          &-active {
            background: green;
          }
        }

        .avatar {
          height: 100%;
          width: 100%;
          border-radius: 50%;
        }
      `}
    >
      <label>
        用户名：
        <Input
          placeholder="请输入用户名"
          value={currentNickname}
          onChange={setCurrentNickname}
        />
      </label>
      <div className="avatar-list">
        {avatarList?.map((avatar) => (
          <div
            className={`avatar-wrap ${
              currentAvatar === avatar && "avatar-wrap-active"
            }`}
            onClick={() => {
              setCurrentAvatar(avatar);
            }}
          >
            <img src={avatar} alt="avatar" key={avatar} className="avatar" />
          </div>
        ))}
      </div>
      <Button
        color="primary"
        onClick={() => {
          post(PROFILE_UPDATE, {
            nickname: currentNickname,
            avatar: currentAvatar,
          }).then((res) => {
            Toast.show({
              content: "修改成功",
            });
            queryClient.invalidateQueries([USER_PROFILE]);
          });
        }}
      >
        确定
      </Button>
    </div>
  );
}
