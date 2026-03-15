import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");

export const setTokens = (accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === "production";

  Cookies.set("accessToken", accessToken, { secure: isProd, sameSite: "strict" });
  Cookies.set("refreshToken", refreshToken, { secure: isProd, sameSite: "strict" });
};

export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};