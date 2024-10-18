export interface UserInterface {
  id: string,
  username: string,
  public_key: string,
  // private_key?: string,
  is_bot: boolean,
  auth_token: string
}

export interface UserDTOInterface {
  username: string,
  password: string,
  is_bot: boolean,
  public_key: string
}

export interface SignupResponse {
  private_key: string,
  user: UserInterface
}
