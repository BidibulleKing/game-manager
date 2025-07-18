import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import styles from "./searchbar.module.css";

export default function Searchbar() {
	const [search, setSearch] = useState('');
	const [searchType, setSearchType] = useState('games');
	const [location, setLocation] = useLocation();

	useEffect(() => {
		if (location.includes('/players')) {
			setSearchType('players');
		} else {
			setSearchType('games');
		}
	}, [location]);

	const getPlaceholder = () => {
		if (location.includes('/library')) {
			return 'Rechercher dans ma bibliothèque...';
		}
		return searchType === 'players'
			? 'Rechercher des joueurs...'
			: 'Rechercher des jeux...';
	};

	const handleSearch = () => {
		if (search.trim()) {
			// Si on est dans la Library, on recherche dans les jeux de l'utilisateur
			if (location.includes('/library')) {
				setLocation(`/games/my-search?search=${encodeURIComponent(search.trim())}`);
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