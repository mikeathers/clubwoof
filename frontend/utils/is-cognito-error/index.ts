// eslint-disable-next-line
export const isCognitoError = (obj: any): obj is CognitoError => {
  return 'code' in obj && 'message' in obj && 'name' in obj
}
