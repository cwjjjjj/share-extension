import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { get } from "../utils";
import { Button, Input } from "antd-mobile";
import { useState } from "react";

export default function Login() {
  const navigator = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>("19946273326");

  return (
    <div css={css``}>
      <hr />
      <section>
        短信验证码登录
        <div>
          手机号：
          <Input value={phoneNumber} onChange={setPhoneNumber} />
          <Button
            onClick={() => {
              console.log({ phoneNumber });
              get("auth/sms/sendVerifyCode");
            }}
          >
            获取验证码
          </Button>
        </div>
      </section>
    </div>
  );
}
