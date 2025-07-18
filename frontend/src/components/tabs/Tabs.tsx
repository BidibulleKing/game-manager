import Tab from "./Tab";
import styles from "./tabs.module.css";

export default function Tabs() {
	return (
		<ul className={styles.tabs}>
			<li>
				<Tab route="/games" label="Jeux" />
			</li>
			<li>
				<Tab route="/players" label="Joueurs" />
			</li>
			<li>
				<Tab route="/library" label="Bibliothèque" />
			</li>
		</ul>
	);
}