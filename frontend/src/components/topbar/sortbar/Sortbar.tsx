import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import styles from "./sortbar.module.css";

interface SortbarProps {
	onSortChange?: (sortBy: string) => void;
	value?: string;
	options?: Array<{ value: string; label: string; }>;
}

export default function Sortbar({ onSortChange, value, options }: SortbarProps) {
	const [location, setLocation] = useLocation();
	const [currentSort, setCurrentSort] = useState(value || 'default');

	const getContextualOptions = () => {
		if (location.includes('/players/') && location.match(/\/players\/\d+/)) {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'rating_desc', label: 'Les mieux notés' },
				{ value: 'minutes_spent_desc', label: 'Les plus joués' },
				{ value: 'added_at_desc', label: 'Récemment ajoutés' },
			];
		} else if (location.includes('/players')) {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'minutes_spent_desc', label: 'Les plus actifs' },
			];
		} else if (location.includes('/library') || location.includes('/library/search')) {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'rating_desc', label: 'Les mieux notés' },
				{ value: 'minutes_spent_desc', label: 'Les plus joués' },
				{ value: 'added_at_desc', label: 'Récemment ajoutés' },
			];
		} else {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'rating_desc', label: 'Les mieux notés' },
				{ value: 'minutes_spent_desc', label: 'Les plus joués' },
				{ value: 'added_at_desc', label: 'Récemment ajoutés' },
			];
		}
	};

	const sortOptions = options || getContextualOptions();

	useEffect(() => {
		if (value !== undefined) {
			setCurrentSort(value);
		}
	}, [value]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = e.target.value;
		setCurrentSort(selectedValue);

		if (selectedValue === 'default') {
			return;
		}

		const [sortBy] = selectedValue.split('_');

		let finalSortBy = sortBy;

		if (sortBy === 'minutes' && selectedValue.includes('minutes_spent')) {
			finalSortBy = 'minutes_spent';
		}

		if (sortBy === 'added' && selectedValue.includes('added_at')) {
			finalSortBy = 'added_at';
		}

		if (onSortChange) {
			onSortChange(finalSortBy);
		} else {
			const currentPath = window.location.pathname;

			if (currentPath.includes('/library')) {
				const searchParams = new URLSearchParams();
				searchParams.set('sortBy', finalSortBy);
				searchParams.set('page', '1');
				setLocation(`/library/search?${searchParams.toString()}`);
				return;
			}

			if (currentPath.includes('/players/') && currentPath.match(/\/players\/\d+/)) {
				const currentParams = new URLSearchParams(window.location.search);
				currentParams.set('sortBy', finalSortBy);
				currentParams.set('page', '1');
				setLocation(`${currentPath}?${currentParams.toString()}`);
				return;
			}

			let resultType = 'games';
			if (currentPath.includes('/players')) {
				resultType = 'players';
			}

			const searchParams = new URLSearchParams();
			searchParams.set('sortBy', finalSortBy);
			searchParams.set('page', '1');

			setLocation(`/${resultType}/results?${searchParams.toString()}`);
		}
	};

	return (
		<select
			className={styles.sortbar}
			value={currentSort}
			onChange={handleSortChange}
		>
			{sortOptions.map(option => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}