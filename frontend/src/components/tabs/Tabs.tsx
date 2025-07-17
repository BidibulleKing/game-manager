import Tab from "./Tab";
import styles from "./tabs.module.css";

export default function Tabs() {
	return (
		<ul className={styles.tabs}>
			<li>
				<Tab route="/games" label="Games" />
			</li>
			<li>
				<Tab route="/players" label="Players" />
			</li>
			<li>
				<Tab route="/library" label="Library" />
			</li>
		</ul>
	);
}