export type SigninResponseDto = {
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    user_type: string;
    status: string;
    verification_status: string;
  };
  token: string;
  refresh_token: string;
  next_step: string;
  is_new_user: boolean;
  token_expires_in: number; // seconds
};

export type LoginRequestDto = {
  email: string;
  password: string;
  device_info: {
    platform: string;
    version: string;
    device_id: string;
  };
};

export type RefreshTokenResponseDto = {
  success: boolean;
  token: string;
  refresh_token: string;
  token_expires_in: number; // seconds
};
