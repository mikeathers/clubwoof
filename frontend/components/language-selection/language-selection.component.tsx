import React from 'react'
import {LanguageSwitcher} from 'next-export-i18n'

import {
  LanguageSelectionContainer,
  LanguageSelectionProps,
} from './language-selection.styles'

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  languageSelectionTextColour,
}) => {
  return (
    <LanguageSelectionContainer languageSelectionTextColour={languageSelectionTextColour}>
      <LanguageSwitcher lang="en">🇬🇧 English</LanguageSwitcher>
      {' | '}
      <LanguageSwitcher lang="pl">🇵🇱 Polski</LanguageSwitcher>
    </LanguageSelectionContainer>
  )
}
