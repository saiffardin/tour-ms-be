import { renewAccessToken } from "@/app/utils/user-tokens";

export const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await renewAccessToken(refreshToken);

  return {
    accessToken: newAccessToken,
  };
};
