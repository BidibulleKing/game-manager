import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import styles from "./sortbar.module.css";

interface SortbarProps {
	onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
	value?: string;
	options?: Array<{ value: string; label: string; }>;
}

export default function Sortbar({ onSortChange, value, options }: SortbarProps) {
	const [location, setLocation] = useLocation();
	const [currentSort, setCurrentSort] = useState(value || 'default');

	const getContextualOptions = () => {
		if (location.includes('/players')) {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'minutes_spent_desc', label: 'Les plus actifs' },
			];
		} else {
			return [
				{ value: 'default', label: 'Trier par' },
				{ value: 'rating_desc', label: 'Les mieux notés' },
				{ value: 'minutes_spent_desc', label: 'Les plus joués' },
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

		const [sortBy, sortOrder] = selectedValue.split('_');

		let finalSortBy = sortBy;
		let finalSortOrder = sortOrder as 'asc' | 'desc';

		if (sortBy === 'minutes' && (sortOrder === 'spent' || selectedValue.includes('minutes_spent'))) {
			finalSortBy = 'minutes_spent';
			finalSortOrder = selectedValue.includes('_desc') ? 'desc' : 'asc';
		}

		if (onSortChange) {
			onSortChange(finalSortBy, finalSortOrder);
		} else {
			const currentPath = window.location.pathname;
			let resultType = 'games';

			if (currentPath.includes('/players')) {
				resultType = 'players';
			}

			const searchParams = new URLSearchParams();
			searchParams.set('sortBy', finalSortBy);
			searchParams.set('sortOrder', finalSortOrder);
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