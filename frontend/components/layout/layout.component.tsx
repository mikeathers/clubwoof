import {ReactNode} from 'react'
import {defaultTheme} from '@clubwoof-styles'
import {Grommet} from 'grommet'
import {
  Bubble,
  BubblePositioning,
  Container,
  ContainerProps,
  ContentProps,
} from './layout.styles'
import {LanguageSelection} from '../language-selection'
import {Footer} from '../footer'
import {LanguageSelectionProps} from '../language-selection/language-selection.styles'
import Image from 'next/image'

export interface LayoutProps
  extends ContentProps,
    ContainerProps,
    LanguageSelectionProps {
  children: ReactNode | ReactNode[]
  bubbleOnePositioning?: BubblePositioning
  bubbleTwoPositioning?: BubblePositioning
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  backgroundColor,
  bubbleOnePositioning,
  bubbleTwoPositioning,
  languageSelectionTextColour,
}) => {
  return (
    <Grommet theme={defaultTheme}>
      <LanguageSelection languageSelectionTextColour={languageSelectionTextColour} />
      <Container backgroundColor={backgroundColor}>
        {bubbleOnePositioning && (
          <Bubble position={bubbleOnePositioning}>
            <Image src="/pink-bubbles.svg" alt="bubbles" fill />
          </Bubble>
        )}
        {children}
      </Container>

      {bubbleTwoPositioning && (
        <Bubble position={bubbleTwoPositioning}>
          <Image src="/pink-bubbles.svg" alt="bubbles" fill />
        </Bubble>
      )}
      <Footer />
    </Grommet>
  )
}
