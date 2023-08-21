import axios from "axios";

// 회원가입 api
export const register = async ({ username, password, email, phone }) => {
  try {
    const res = await axios.post("/api/user/signup", {
      username,
      email,
      password,
      phone,
    });
    return res.data;
  } catch (error) {
    console.error("resitster api error", error);
    throw error;
  }
};

// 회원정보 조회 api
export const getPrivateInfo = async ({ access, refresh }) => {
  const res = await axios.get(`/api/user/info`, {
    headers: {
      accessToken: access,
      refreshToken: refresh,
    },
  });
  return res;
};

// 회원정보 수정 api
export const putEditInfo = async ({ access, refresh, editName, editPhone }) => {
  const res = await axios.put(
    `/api/user/info`,
    {
      username: editName,
      phone: editPhone,
    },
    {
      headers: {
        accessToken: access,
        refreshToken: refresh,
      },
    }
  );
  return res;
};

// 회원 이메일로 인증 코드 전송 api
export const sendEmail = async ({ accessToken, refreshToken }) => {
  const res = await axios.post(`/api/user/email`, null, {
    headers: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  });
  return res.data.msg;
};

// 회원 비밀번호 수정 api
export const replacePassword = async ({
  accessToken,
  refreshToken,
  newPassword,
  code,
}) => {
  const res = await axios.put(
    `/api/user/password-reset?code=${code}`,
    {
      password: newPassword,
    },
    {
      headers: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    }
  );
  return res;
};
