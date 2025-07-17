import { useEffect } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Pagination from '../../components/pagination/Pagination';
import GameCard from '../../components/gamecard/GameCard';
import PlayerCard from '../../components/playercard/PlayerCard';
import { useSearch } from '../../hooks/useSearch';
import { useUrlParams } from '../../hooks/useUrlParams';
import type { GameType } from '../../types/GameType';
import type { PlayerType } from '../../types/PlayerType';
import type { SearchParams } from '../../types/SearchResultType';
import styles from './results.module.css';

interface ResultsPageProps {
	type: 'games' | 'players';
	title: string;
	initialParams?: SearchParams;
}

export default function ResultsPage({ type, title, initialParams = {} }: ResultsPageProps) {
	const defaultParams = {
		page: 1,
		limit: 12,
		sortBy: type === 'games' ? 'rating' : 'minutes_spent',
		sortOrder: 'desc' as const,
		...initialParams
	};

	const { params, updateParams } = useUrlParams(defaultParams);
	const { data: results, loading, error, refetch } = useSearch(type, params);

	// Handle URL changes to keep the state in sync
	useEffect(() => {
		const handleUrlChange = () => {
			const urlParams = new URLSearchParams(window.location.search);
			const newParams: SearchParams = {
				search: urlParams.get('search') || undefined,
				page: parseInt(urlParams.get('page') || '1'),
				limit: parseInt(urlParams.get('limit') || '12'),
				sortBy: urlParams.get('sortBy') || defaultParams.sortBy,
				sortOrder: (urlParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
			};
			updateParams(newParams);
		};

		window.addEventListener('popstate', handleUrlChange);
		return () => window.removeEventListener('popstate', handleUrlChange);
	}, [updateParams, defaultParams.sortBy]);

	const handlePageChange = (page: number) => {
		updateParams({ page });
	};

	const handleLimitChange = (limit: number) => {
		updateParams({ limit, page: 1 });
	};

	const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
		updateParams({ sortBy, sortOrder, page: 1 });
	};

	const currentSortValue = params.sortBy && params.sortOrder
		? `${params.sortBy}_${params.sortOrder}`
		: 'default';

	const renderCard = (item: GameType | PlayerType, index: number) => {
		if (type === 'games') {
			return <GameCard key={index} game={item as GameType} />;
		} else {
			return <PlayerCard key={index} card={item as PlayerType} />;
		}
	};

	return (
		<>
			<Topbar
				onSortChange={handleSortChange}
				sortValue={currentSortValue}
			/>

			<div className={styles.header}>
				<h1>{title}</h1>
				{results?.pagination?.totalItems !== undefined && (
					<p className={styles.resultsCount}>
						{results.pagination.totalItems} résultat{results.pagination.totalItems > 1 ? 's' : ''}
					</p>
				)}
			</div>

			<div className={styles.controls}>
				<div className={styles.limitControls}>
					<label>Éléments par page :</label>
					<select
						value={params.limit}
						onChange={(e) => handleLimitChange(Number(e.target.value))}
						className={styles.limitSelect}
					>
						<option value={6}>6</option>
						<option value={12}>12</option>
						<option value={24}>24</option>
						<option value={48}>48</option>
					</select>
				</div>
			</div>

			{loading && (
				<div className={styles.loading}>
					<p>Chargement...</p>
				</div>
			)}

			{error && (
				<div className={styles.error}>
					<p>Erreur : {error}</p>
					<button onClick={() => refetch()} className={styles.retryBtn}>
						Réessayer
					</button>
				</div>
			)}

			{results && !loading && (
				<>
					<div className={styles.resultsGrid}>
						{results.data?.map((item, index) => renderCard(item, index))}
					</div>

					{results.data?.length === 0 && (
						<div className={styles.noResults}>
							<p>Aucun résultat trouvé</p>
						</div>
					)}

					{results.pagination?.totalPages > 1 && (
						<Pagination
							pagination={results.pagination}
							onPageChange={handlePageChange}
						/>
					)}
				</>
			)}
		</>
	);
}
