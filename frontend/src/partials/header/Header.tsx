import { useState } from "react";
import Tabs from "../../components/tabs/Tabs";
import AuthModal from "../../components/auth/AuthModal";
import styles from "./header.module.css";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const menuClass = isOpen ? styles.menuOpen : "";

	return (
		<>
			<header>
				<div className={styles.container}>
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
				</div>
			</header>

			<AuthModal
				isOpen={showAuthModal}
				onClose={() => setShowAuthModal(false)}
			/>
		</>
	);
}