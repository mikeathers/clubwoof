import {StyledForm} from './form.styles'
import {ReactNode} from 'react'

interface FormProps {
  children: ReactNode | ReactNode[]
}
export const Form: React.FC<FormProps> = (props) => (
  <StyledForm>{props.children}</StyledForm>
)
