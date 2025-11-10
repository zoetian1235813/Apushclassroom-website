const { WECHAT_APP_ID, WECHAT_APP_SECRET } = process.env;

const WECHAT_OAUTH_URL = "https://open.weixin.qq.com/connect/qrconnect";
const WECHAT_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token";
const WECHAT_USER_INFO_URL = "https://api.weixin.qq.com/sns/userinfo";

export const ensureWeChatConfig = () => {
  if (!WECHAT_APP_ID || !WECHAT_APP_SECRET) {
    throw new Error("WeChat credentials are not configured");
  }
};

export const buildWeChatAuthUrl = ({ redirectUri, state }) => {
  ensureWeChatConfig();
  const encodedRedirect = encodeURIComponent(redirectUri);
  return `${WECHAT_OAUTH_URL}?appid=${WECHAT_APP_ID}&redirect_uri=${encodedRedirect}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;
};

export const exchangeWeChatCode = async (code) => {
  ensureWeChatConfig();
  const url = `${WECHAT_ACCESS_TOKEN_URL}?appid=${WECHAT_APP_ID}&secret=${WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.errcode) {
    const error = new Error(data.errmsg || "Failed to exchange WeChat code");
    error.details = data;
    throw error;
  }
  return data;
};

export const fetchWeChatUserInfo = async (accessToken, openId) => {
  const url = `${WECHAT_USER_INFO_URL}?access_token=${accessToken}&openid=${openId}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.errcode) {
    const error = new Error(data.errmsg || "Failed to fetch WeChat user info");
    error.details = data;
    throw error;
  }
  return data;
};
