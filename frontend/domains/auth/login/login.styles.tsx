import styled from 'styled-components'
import {colors, mediaQueries, spacing} from '@clubwoof-styles'
import {Button, TextInput} from '@clubwoof-components'

export const Content = styled.div`
  padding: ${spacing.space10x} 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${spacing.space10x};
  width: 80%;

  @media (${mediaQueries.l}) {
    width: 40%;
  }
`

export const DogImage = styled.div`
  width: 120px;
  height: 160px;
  position: relative;
  z-index: 1;
  margin-bottom: ${spacing.space5x};
  margin-top: ${spacing.space5x};

  @media (${mediaQueries.s}) {
    width: 150px;
    height: 180px;
    margin-top: ${spacing.space6x};
  }
  @media (${mediaQueries.xl}) {
    margin-top: 0;
  }

  image {
    width: 100%;
    height: 100%;
  }
`

export const Form = styled.form`
  margin-top: ${spacing.space6x};
  width: 180%;

  @media (${mediaQueries.s}) {
    width: 400px;
  }
`

export const FormInput = styled(TextInput)`
  &:focus {
    box-shadow: none;
    border-bottom: 1px solid ${colors.yellow};
  }
`

export const SubmitButton = styled(Button)`
  background-color: ${colors.yellow};
  color: ${colors.pink};
`
