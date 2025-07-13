import { Link, useLocation } from "wouter";
import styles from "./tab.module.css";

export default function Tab(
	{ route, label }: { route: string; label: string }
) {
	const [location] = useLocation();
	const isActive = location.startsWith(route);

	return <Link className={`${styles.tab} ${isActive ? styles.tabActive : ""}`} href={route}>{label}</Link>;
}
