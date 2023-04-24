import { css } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AVATAR_LIST, PROFILE_UPDATE, USER_PROFILE } from "../constants/api";
import { get, post } from "../utils";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../store";
import { Button, Input, NavBar, Toast } from "antd-mobile";
import { handleUpload } from "../utils/upload";
import { useNavigate } from "react-router-dom";
import { QiniuFile } from "../@types/Qiniu";
import Avatar from "../components/Avatar";
import upload from "../assets/upload.svg";

const prefixUrl = "https://image-qiniu.jellow.site/";

export default function ProfileSetting() {
  const navigator = useNavigate();
  const queryClient = useQueryClient();
  const { data: avatarList } = useQuery<string[]>({
    queryKey: [AVATAR_LIST],
    queryFn: async () => get(AVATAR_LIST).then((res) => res.data.data),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useRecoilState(userState);

  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(
    user?.avatar
  );
  const [currentNickname, setCurrentNickname] = useState<string | undefined>(
    user?.nickname
  );

  const updateProfile = async (
    profile: {
      name?: string;
      avatar?: string;
      avatarFileInfo?: QiniuFile;
    } = {
      name: currentNickname,
      avatar: currentAvatar,
    }
  ) => {
    if (!profile.name) {
      Toast.show({
        content: "请输入用户名",
      });
      return;
    }
    if (!profile.avatar) {
      Toast.show({
        content: "请选择头像",
      });
      return;
    }
    setIsLoading(true);
    await post(PROFILE_UPDATE, {
      nickname: profile.name,
      avatar: profile?.avatar,
    });
    await queryClient.invalidateQueries([USER_PROFILE]);
    Toast.show({
      content: "资料修改成功",
    });
    setIsLoading(false);
  };

  return (
    <div
      css={css`
        padding: 10px;
        height: 100%;
        overflow: auto;

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

        .label {
          display: grid;
          grid-template-columns: 60px 100px 150px;
          align-items: center;
        }
      `}
    >
      <NavBar
        onBack={() => {
          navigator(-1);
        }}
        right={
          <Button
            color="success"
            size="mini"
            onClick={() => {
              updateProfile({
                name: currentNickname,
                avatar: currentAvatar,
              }).then((res) => {
                navigator("../explore");
              });
            }}
          >
            保存
          </Button>
        }
      >
        <div>
          <div>设置</div>
        </div>
      </NavBar>
      <div
        css={css`
          padding: 10px;
          overflow: auto;
          display: grid;
          gap: 5px;
          align-items: start;
          justify-items: start;
          grid-template-rows: 50px 50px 1fr 50px;
        `}
      >
        <div className="label">
          用户名：
          <Input
            placeholder="请输入用户名"
            value={currentNickname}
            onChange={setCurrentNickname}
          />
        </div>
        <div className="label">
          头像：
          <Avatar src={currentAvatar} />
          <label>
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 5px;
                background: #eeeeee;
                border-radius: 6px;
                padding: 6px 30px;
                cursor: pointer;
              `}
            >
              <img src={upload} alt="" /> 上传头像
            </div>
            <input
              type="file"
              id="albums"
              name="albums"
              accept="image/*"
              css={css`
                display: none;
              `}
              onChange={async (e) => {
                const files = e?.target?.files as unknown as File[];
                // 限制图片大小为 2mb
                if (files[0].size > 2 * 1024 * 1024) {
                  Toast.show({
                    content: "图片大小不能超过 2mb",
                  });
                  return;
                }
                const res = await handleUpload(files[0]);
                const avatarUrl = prefixUrl + res.key;
                setCurrentAvatar(avatarUrl);
                // updateProfile({
                //   name: currentNickname,
                //   avatarFileInfo: res,
                // });
                // updateProfile();
              }}
            />
          </label>
        </div>
        <section>
          <div className="avatar-list">
            {avatarList?.map((avatar) => (
              <div
                className={`avatar-wrap ${
                  currentAvatar === avatar && "avatar-wrap-active"
                }`}
                onClick={() => {
                  setCurrentAvatar(avatar);
                }}
                key={avatar}
              >
                <img src={avatar} alt="avatar" className="avatar" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
