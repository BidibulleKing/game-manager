import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import styles from "./searchbar.module.css";

export default function Searchbar() {
	const [search, setSearch] = useState('');
	const [searchType, setSearchType] = useState('games');
	const [location, setLocation] = useLocation();

	useEffect(() => {
		if (location.includes('/players/') && location.match(/\/players\/\d+/)) {
			setSearchType('games');
		} else if (location.includes('/players')) {
			setSearchType('players');
		} else {
			setSearchType('games');
		}
	}, [location]);

	const getPlaceholder = () => {
		if (location.includes('/library')) {
			return 'Rechercher dans ma bibliothèque...';
		}
		if (location.includes('/players/') && location.match(/\/players\/\d+/)) {
			return 'Rechercher dans les jeux du joueur...';
		}
		return searchType === 'players'
			? 'Rechercher des joueurs...'
			: 'Rechercher des jeux...';
	};

	const handleSearch = () => {
		if (search.trim()) {
			if (location.includes('/library')) {
				setLocation(`/library/search?search=${encodeURIComponent(search.trim())}`);
			} else if (location.includes('/players/') && location.match(/\/players\/\d+/)) {
				const currentParams = new URLSearchParams(window.location.search);
				currentParams.set('search', search.trim());
				currentParams.set('page', '1');
				setLocation(`${window.location.pathname}?${currentParams.toString()}`);
			} else {
				setLocation(`/${searchType}/search?search=${encodeURIComponent(search.trim())}`);
			}
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearch();
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.searchForm}>
			<input
				type="text"
				placeholder={getPlaceholder()}
				className={styles.searchbar}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyPress={handleKeyPress}
			/>
		</form>
	);
}