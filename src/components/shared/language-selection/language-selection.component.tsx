import React from 'react'
import {LanguageSwitcher} from 'next-export-i18n'

import {LanguageSelectionContainer} from './language-selection.styles'

export const LanguageSelection: React.FC = () => {
  return (
    <LanguageSelectionContainer>
      <LanguageSwitcher lang="en">🇬🇧 English</LanguageSwitcher>
      {' | '}
      <LanguageSwitcher lang="pl">🇵🇱 Polski</LanguageSwitcher>
    </LanguageSelectionContainer>
  )
}
