import { ReactNode } from 'react'
import { Container, ContainerProps, Content, ContentProps } from './layout.styles'
import { defaultTheme } from '@clubwoof-styles'
import { Grommet } from 'grommet'

interface LayoutProps extends ContentProps, ContainerProps {
  children: ReactNode | ReactNode[]
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  width,
  paddingTop,
  backgroundColor,
}) => {
  return (
    <Grommet theme={defaultTheme}>
      <Container backgroundColor={backgroundColor}>
        <Content width={width} paddingTop={paddingTop}>
          {children}
        </Content>
      </Container>
    </Grommet>
  )
}
