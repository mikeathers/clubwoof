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

export const resendRegistrationLinkPageI18nMock: i18nResendRegistrationLink = {
  ...JSON.parse(JSON.stringify(en.pages.auth.resendRegistrationLinkPage)),
}
