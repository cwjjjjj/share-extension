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
    if (!profile.avatar && !profile.avatarFileInfo) {
      Toast.show({
        content: "请选择头像",
      });
      return;
    }
    setIsLoading(true);
    await post(PROFILE_UPDATE, {
      nickname: profile.name,
      avatar: profile?.avatar,
      avatarFileInfo: profile?.avatarFileInfo,
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

        label {
          display: grid;
          grid-template-columns: 60px 100px;
          align-items: center;
        }
      `}
    >
      <NavBar
        onBack={() => {
          navigator(-1);
        }}
        right={
          <Button color="success" size="mini">
            关注
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
        <label>
          用户名：
          <Input
            placeholder="请输入用户名"
            value={currentNickname}
            onChange={setCurrentNickname}
          />
        </label>
        <label>
          头像：
          <Avatar src={user.avatar} />
        </label>
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
          <label>
            上传头像
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
                setCurrentAvatar(undefined);
                updateProfile({
                  name: currentNickname,
                  avatarFileInfo: res,
                });
              }}
            />
          </label>
        </section>
        <Button
          color="primary"
          onClick={() => {
            updateProfile();
          }}
        >
          确定
        </Button>
      </div>
    </div>
  );
}
