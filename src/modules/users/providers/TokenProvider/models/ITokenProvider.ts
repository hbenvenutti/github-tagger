export default interface ITokenProvider {
  signToken(userId: string): Promise<string>;
  verifyToken(token: string): Promise<string>;
}
