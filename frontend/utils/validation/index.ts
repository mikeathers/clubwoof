export const passwordValidation = (value: string | undefined) => {
  if (!value) return false
  const hasUpperCase = /[A-Z]/.test(value)
  const hasLowerCase = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)
  const hasSymbol = /[!@#$%&*]/.test(value)
  let validConditions = 0
  const numberOfMustBeValidConditions = 4
  const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol]
  conditions.forEach((condition) => (condition ? (validConditions += 1) : null))
  return validConditions >= numberOfMustBeValidConditions
}
