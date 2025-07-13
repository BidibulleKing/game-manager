import styles from "./searchbar.module.css";

export default function Searchbar() {
	return (
		<input type="text" placeholder="Rechercher..." className={styles.searchbar} />
	)
}