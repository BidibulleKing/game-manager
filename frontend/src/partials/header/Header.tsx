import { useState } from "react";
import Tabs from "../../components/tabs/Tabs";
import styles from "./header.module.css";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const menuClass = isOpen ? styles.menuOpen : "";

	return (
		<header>
			<img src="/header-logo.png" alt="Game Manager Logo" width="97" height="41" />

			<nav>
				<button className={styles.burger} onClick={toggleMenu}>
					<span />
					<span />
					<span />
				</button>

				<div className={`${styles.menu} ${menuClass}`}>
					<Tabs />
				</div>
			</nav>
		</header>
	);
}