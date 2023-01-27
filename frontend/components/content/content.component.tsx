import {ReactNode} from 'react'
import {StyledContent} from './content.styles'

interface ContentProps {
  children: ReactNode | ReactNode[]
}
export const Content: React.FC<ContentProps> = (props) => (
  <StyledContent>{props.children}</StyledContent>
)
