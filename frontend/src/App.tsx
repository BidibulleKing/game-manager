import { Route } from 'wouter'
import './App.css'
import Layout from './layouts/Layout'
import Games from './pages/games/Games'
import GameResults from './pages/games/GameResults'
import Players from './pages/players/Players'
import PlayerResults from './pages/players/PlayerResults'
import ResultsPage from './pages/results/ResultsPage'
import Library from './pages/Library'
import Account from './pages/Account'

function App() {
	return (
		<Layout>
			<Route path="/games" component={Games} />
			<Route path="/games/search" component={GameResults} />
			<Route path="/games/results" component={() => <ResultsPage type="games" title="Résultats des jeux" />} />
			<Route path="/players" component={Players} />
			<Route path="/players/search" component={PlayerResults} />
			<Route path="/players/results" component={() => <ResultsPage type="players" title="Résultats des joueurs" />} />
			<Route path="/library" component={Library} />
			<Route path="/library/search" component={() => <ResultsPage type="user-games" title="Recherche dans ma bibliothèque" />} />
			<Route path="/account" component={Account} />
		</Layout>
	)
}

export default App
