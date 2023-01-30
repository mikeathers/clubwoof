import {en} from '@clubwoof-i18n'

export const registerPageI18nMock: i18nRegisterPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.registerPage)),
}

export const completeRegistrationPageI18nMock: i18nCompleteRegistrationPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.completeRegistrationPage)),
}

export const loginPageI18nMock: i18nLoginPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.loginPage)),
}

export const resendRegistrationLinkPageI18nMock: i18nResendRegistrationLinkPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.resendRegistrationLinkPage)),
}

export const forgotPasswordPageI18nMock: i18nForgotPasswordPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.forgotPasswordPage)),
}

export const completeForgotPasswordPageI18nMock: i18nCompleteForgotPasswordPage = {
  ...JSON.parse(JSON.stringify(en.pages.auth.completeForgotPasswordPage)),
}

export const errorPageI18nMock: i18nErrorPage = {
  ...JSON.parse(JSON.stringify(en.pages.errorPage)),
}
