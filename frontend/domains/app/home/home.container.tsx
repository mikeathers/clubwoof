import {HomeComponent} from './home.component'
import {withUnauthenticatedRedirect} from '@clubwoof-hoc'

export const Home: React.FC = () => {
  return <HomeComponent />
}

export default withUnauthenticatedRedirect(Home)
