import {StoryFn} from '@storybook/react'
import styled from 'styled-components'
import {HiUser} from 'react-icons/hi2'
import {TextInput, TextInputProps} from '@clubwoof-components'

export default {
  title: 'Components/TextInput',
  component: TextInput,
  decorators: [
    (Story: React.FC) => (
      <Container>
        <Form>
          <Story />
        </Form>
      </Container>
    ),
  ],
}

const Container = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.div`
  width: 40%;
`

export const WithBorder: StoryFn<TextInputProps> = () => (
  <>
    <TextInput withBorder placeholder={'First name'} type={'name'} />
    <TextInput
      withBorder
      placeholder={'Last name'}
      type={'name'}
      error={'Last name is required'}
    />
  </>
)

export const WithoutBorder: StoryFn<TextInputProps> = () => (
  <>
    <TextInput placeholder={'First name'} type={'name'} />
    <TextInput placeholder={'Last name'} type={'name'} />
  </>
)

export const WithIcon: StoryFn<TextInputProps> = () => (
  <>
    <TextInput icon={<HiUser />} placeholder={'First name'} type={'name'} />
    <TextInput icon={<HiUser />} placeholder={'Last name'} type={'name'} />
  </>
)

export const WithError: StoryFn<TextInputProps> = () => (
  <>
    <TextInput placeholder={'First name'} type={'name'} error={'First name required'} />
    <TextInput placeholder={'Last name'} type={'name'} />
  </>
)
