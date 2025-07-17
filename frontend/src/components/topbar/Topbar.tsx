import Searchbar from "./searchbar/Searchbar";
import Sortbar from "./sortbar/Sortbar";
import styles from "./topbar.module.css";

interface TopbarProps {
	onSortChange?: (sortBy: string) => void;
	sortValue?: string;
	sortOptions?: Array<{ value: string; label: string; }>;
	children?: React.ReactNode;
}

export default function Topbar({ onSortChange, sortValue, sortOptions, children }: TopbarProps) {
	return (
		<div className={styles.topbar}>
			<Searchbar />
			<Sortbar
				onSortChange={onSortChange}
				value={sortValue}
				options={sortOptions}
			/>
			{children}
		</div>
	);
}