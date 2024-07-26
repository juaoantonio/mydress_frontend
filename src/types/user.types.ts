export type UserSignInInputDTO = {
  username: string;
  password: string;
};

export type UserSignInOutputDTO = {
  access: string;
  refresh: string;
};
