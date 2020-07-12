export default interface ICreateUserDTO {
  username: string;
  email: string;
  password: string;
  github_token?: string;
}
