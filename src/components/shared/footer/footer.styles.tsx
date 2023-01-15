import styled from 'styled-components'
import {spacing} from '@clubwoof-styles'

export const Container = styled.div`
  width: 100vw;
  background-color: rgba(0, 187, 249, 0.1);
  padding: ${spacing.space4x} 0;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
`

export const LeftContainer = styled.div`
  margin-right: ${spacing.space4x};
`

export const RightContainer = styled.div``

export const Logo = styled.div`
  height: 150px;
  width: 150px;
  position: relative;
  image {
    width: 100%;
    height: 100%;
  }
`
