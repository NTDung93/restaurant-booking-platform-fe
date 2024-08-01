const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const OTP_TIMER = process.env.NEXT_PUBLIC_OTP_TIMER ?? 120;
const VNPT_KEY = process.env.NEXT_PUBLIC_VNPT_KEY;
const SOFT_CERTIFICATE =
  process.env.NEXT_PUBLIC_SOFT_CERTIFICATE === 'true' ? true : false;

export { BASE_API_URL, OTP_TIMER, VNPT_KEY, SOFT_CERTIFICATE };
