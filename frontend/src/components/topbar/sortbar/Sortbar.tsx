import styles from "./sortbar.module.css";

export default function Sortbar() {
	return (
		<select className={styles.sortbar}>
			<option value="default">Trier par</option>
			<option value="rate">Les mieux notés</option>
			<option value="play">Les plus joués</option>
		</select>
	);
}