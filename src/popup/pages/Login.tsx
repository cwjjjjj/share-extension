import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils";
import { Button, CapsuleTabs, Input, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import {
  GET_QR_CODE,
  LOGIN_OR_SIGNUP,
  QR_CODE_STATUS,
  SEND_VERIFY_CODE,
} from "../constants/api";
import { useQuery } from "@tanstack/react-query";
import QRCode from "react-qr-code";
import { User } from "../types";
import { UndoOutline } from "antd-mobile-icons";

export interface QRCodeData {
  expAt: number;
  qrCode: string;
  sceneId: string;
}

export type LoginType = "qrCode" | "phoneNumber";

export default function Login() {
  const navigator = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [verifyCode, setVerifyCode] = useState<string>();
  const [isExpired, setIsExpired] = useState(false);
  const [loginType, setLoginType] = useState<LoginType>("qrCode");

  const [refetchInterval, setRefetchInterval] = useState<number | false>(1000);

  const {
    data: qrCodeData,
    error,
    refetch,
  } = useQuery<QRCodeData & { success: boolean }>({
    queryKey: [GET_QR_CODE],
    queryFn: async () => post(GET_QR_CODE).then((res) => res.data.data),
    onError: (err) => {
      Toast.show({
        content: "获取二维码失败 请稍后重试",
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: loginStatus } = useQuery<{
    success: boolean;
    status: string;
    user?: User;
  }>({
    queryKey: [QR_CODE_STATUS],
    queryFn: async () =>
      get(QR_CODE_STATUS, {
        params: { sceneId: qrCodeData?.sceneId },
      }).then((res) => res.data),
    refetchInterval: refetchInterval,
    onSuccess: (data) => {
      if (data.success && data.status === "done") {
        setRefetchInterval(false);
        Toast.show({
          content: "扫码成功",
        });
        setTimeout(() => {
          navigator("./follow");
        }, 2000);
      }
    },
  });

  useEffect(() => {
    let timer = setInterval(() => {
      const now = Date.now();
      const expiredTime = qrCodeData?.expAt;
      console.log(now, expiredTime);
      if (expiredTime && now >= expiredTime) {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [qrCodeData]);

  return (
    <div
      css={css`
        .code-wrap {
          height: 100%;
          display: grid;
          justify-content: center;
          position: relative;
        }
        .mask {
          height: 256px;
          width: 256px;
          opacity: 0.8;
        }
        .refresh {
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          justify-items: center;
          align-items: center;
          color: white;
          font-weight: 800;
          font-size: 18px;
        }
        main {
          padding: 20px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    >
      <header>
        <CapsuleTabs
          activeKey={loginType}
          onChange={(key) => {
            setLoginType(key as LoginType);
          }}
        >
          <CapsuleTabs.Tab title="手机号" key="phoneNumber" />
          <CapsuleTabs.Tab title="扫码登录" key="qrCode" />
        </CapsuleTabs>
      </header>

      <hr />

      <main>
        {loginType === "phoneNumber" && (
          <section>
            <div>
              手机号：
              <Input value={phoneNumber} onChange={setPhoneNumber} />
              <Button
                onClick={() => {
                  console.log({ phoneNumber });
                  post(SEND_VERIFY_CODE, {
                    phoneNumber,
                  });
                }}
              >
                获取验证码
              </Button>
            </div>
            <div>
              <Input value={verifyCode} onChange={setVerifyCode} />
              <Button
                onClick={() => {
                  post(LOGIN_OR_SIGNUP, {
                    phoneNumber,
                    verifyCode,
                  });
                }}
              >
                登录
              </Button>
            </div>
          </section>
        )}

        {loginType === "qrCode" && (
          <div className="code-wrap">
            {isExpired ? (
              <div className="mask">
                <QRCode
                  size={256}
                  value={""}
                  css={css`
                    filter: blur(8px);
                  `}
                />
                <div
                  className="refresh"
                  onClick={() => {
                    refetch();
                    setIsExpired(false);
                  }}
                >
                  <UndoOutline
                    css={css`
                      height: 100px;
                      width: 100px;
                      color: white;
                    `}
                  />
                  <div>点击刷新</div>
                </div>
              </div>
            ) : (
              <div>
                {qrCodeData?.qrCode && (
                  <QRCode size={256} value={qrCodeData?.qrCode} />
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
