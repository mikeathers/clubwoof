import {Content, Layout, Text} from '@clubwoof-components'

export const HomeComponent: React.FC = () => {
  return (
    <Layout backgroundColor={'turquoise'} languageSelectionTextColour={'pureBlack'}>
      <Content>
        <Text element={'h1'} color={'pureBlack'}>
          Welcome
        </Text>
      </Content>
    </Layout>
  )
}
