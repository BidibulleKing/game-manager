import Searchbar from "./searchbar/Searchbar";
import Sortbar from "./sortbar/Sortbar";
import styles from "./topbar.module.css";

export default function Topbar() {
	return (
		<div className={styles.topbar}>
			<Searchbar />
			<Sortbar />
		</div>
	);
}