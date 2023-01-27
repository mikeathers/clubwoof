//ts-ignore
//@typescript-eslint/no-explicit-any
export const errorHasMessage = (obj: any): obj is Error => {
  return typeof obj === 'object' && 'message' in obj
}

export const isCognitoError = (obj: any): obj is CognitoError => {
  return 'code' in obj && 'message' in obj && 'name' in obj
}
