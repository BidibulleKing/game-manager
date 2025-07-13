import { Link } from "wouter";
import styles from "./tab.module.css";

export default function Tab(
	{ route, label }: { route: string; label: string }
) {
	return <Link className={styles.tab} href={route}>{label}</Link>;
}
