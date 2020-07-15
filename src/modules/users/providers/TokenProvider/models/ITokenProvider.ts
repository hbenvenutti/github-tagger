export default interface ITokenProvider {
  signToken(payload: string): Promise<string>;
}
