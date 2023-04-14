import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { get, post } from "../utils";
import { Button, Input } from "antd-mobile";
import { useState } from "react";
import { LOGIN_OR_SIGNUP, SEND_VERIFY_CODE } from "../constants/api";

export default function Login() {
  const navigator = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("19946273326");
  const [verifyCode, setVerifyCode] = useState<string>("3036");
  return (
    <div css={css``}>
      <hr />
      <section>
        短信验证码登录
        <div>
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
        </div>
      </section>
    </div>
  );
}
