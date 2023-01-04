import { ReactNode } from 'react'
import {
  Bubble,
  BubblePositioning,
  Container,
  ContainerProps,
  Content,
  ContentProps,
} from './layout.styles'
import { defaultTheme } from '@clubwoof-styles'
import { Grommet } from 'grommet'

interface LayoutProps extends ContentProps, ContainerProps {
  children: ReactNode | ReactNode[]
  bubbleOnePositioning: BubblePositioning
  bubbleTwoPositioning: BubblePositioning
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  paddingTop,
  backgroundColor,
  bubbleOnePositioning,
  bubbleTwoPositioning,
}) => {
  return (
    <Grommet theme={defaultTheme}>
      <Container backgroundColor={backgroundColor}>
        <Bubble
          src={'/pink-bubbles.svg'}
          alt={'bubbles'}
          width={100}
          height={100}
          position={bubbleOnePositioning}
        />
        <Content paddingTop={paddingTop}>{children}</Content>
      </Container>

      <Bubble
        src={'/pink-bubbles.svg'}
        alt={'bubbles'}
        width={100}
        height={100}
        position={bubbleTwoPositioning}
      />
    </Grommet>
  )
}
