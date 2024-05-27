export function assertToken(token: Maybe<string>): asserts token is string {
  if (!token) {
    throw new Error('No token provided');
  }
}
