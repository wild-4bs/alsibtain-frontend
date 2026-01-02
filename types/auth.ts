export type LoginResponse = {
  message: string;
  payload: {
    email: string;
    id: string;
  };
  token: string;
};

export type CheckAuthResponse = {
  message: string;
  status: number;
};
