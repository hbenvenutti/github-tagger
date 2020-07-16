export default interface ITokenProvider {
  signToken(userId: string): Promise<string>;
}
