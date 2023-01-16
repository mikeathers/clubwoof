import {ReactNode} from 'react'
import {defaultTheme} from '@clubwoof-styles'
import {Grommet} from 'grommet'
import {
  Bubble,
  BubblePositioning,
  Container,
  ContainerProps,
  Content,
  ContentProps,
} from './layout.styles'
import {LanguageSelection} from '../language-selection'
import {Footer} from '../footer'
import {LanguageSelectionProps} from '../language-selection/language-selection.styles'

interface LayoutProps extends ContentProps, ContainerProps, LanguageSelectionProps {
  children: ReactNode | ReactNode[]
  bubbleOnePositioning?: BubblePositioning
  bubbleTwoPositioning?: BubblePositioning
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  paddingTop,
  backgroundColor,
  bubbleOnePositioning,
  bubbleTwoPositioning,
  textColour,
  width,
}) => {
  return (
    <Grommet theme={defaultTheme}>
      <LanguageSelection textColour={textColour} />
      <Container backgroundColor={backgroundColor}>
        {bubbleOnePositioning && (
          <Bubble
            src="/pink-bubbles.svg"
            alt="bubbles"
            width={100}
            height={100}
            position={bubbleOnePositioning}
          />
        )}
        <Content paddingTop={paddingTop} width={width}>
          {children}
        </Content>
      </Container>

      {bubbleTwoPositioning && (
        <Bubble
          src="/pink-bubbles.svg"
          alt="bubbles"
          width={100}
          height={100}
          position={bubbleTwoPositioning}
        />
      )}
      <Footer />
    </Grommet>
  )
}
