import type { SearchResultType } from '../../types/SearchResultType';
import styles from './pagination.module.css';

interface PaginationProps {
	pagination: SearchResultType<unknown>['pagination'];
	onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: PaginationProps) {
	const { currentPage, totalPages, hasPrevious, hasNext } = pagination;

	const getVisiblePages = () => {
		const pages = [];
		const maxVisible = 5;

		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		const end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	return (
		<div className={styles.pagination}>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={!hasPrevious}
				className={styles.paginationBtn}
			>
				&larr;
			</button>

			{currentPage > 3 && (
				<>
					<button onClick={() => onPageChange(1)} className={styles.paginationBtn}>1</button>
					{currentPage > 4 && <span className={styles.paginationEllipsis}>...</span>}
				</>
			)}

			{getVisiblePages().map(page => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`${styles.paginationBtn} ${page === currentPage ? styles.active : ''}`}
				>
					{page}
				</button>
			))}

			{currentPage < totalPages - 2 && (
				<>
					{currentPage < totalPages - 3 && <span className={styles.paginationEllipsis}>...</span>}
					<button onClick={() => onPageChange(totalPages)} className={styles.paginationBtn}>
						{totalPages}
					</button>
				</>
			)}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={!hasNext}
				className={styles.paginationBtn}
			>
				&rarr;
			</button>
		</div>
	);
}
