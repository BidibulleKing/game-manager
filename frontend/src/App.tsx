import { Route } from 'wouter'
import './App.css'
import Layout from './layouts/Layout'
import Games from './pages/games/Games'
import Players from './pages/players/Players'
import Library from './pages/Library'
import Account from './pages/Account'

function App() {
	return (
		<Layout>
			<Route path="/games" component={Games} />
			<Route path="/players" component={Players} />
			<Route path="/library" component={Library} />
			<Route path="/account" component={Account} />
		</Layout>
	)
}

export default App
