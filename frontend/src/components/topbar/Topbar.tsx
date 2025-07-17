import Searchbar from "./searchbar/Searchbar";
import Sortbar from "./sortbar/Sortbar";
import styles from "./topbar.module.css";

interface TopbarProps {
	onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
	sortValue?: string;
	sortOptions?: Array<{ value: string; label: string; }>;
}

export default function Topbar({ onSortChange, sortValue, sortOptions }: TopbarProps) {
	return (
		<div className={styles.topbar}>
			<Searchbar />
			<Sortbar
				onSortChange={onSortChange}
				value={sortValue}
				options={sortOptions}
			/>
		</div>
	);
}