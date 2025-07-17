import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Tabs from "../../components/tabs/Tabs";
import AuthModal from "../../components/auth/AuthModal";
import styles from "./header.module.css";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [showAuthModal, setShowAuthModal] = useState(false);
	const { isAuthenticated, logout } = useAuth();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const menuClass = isOpen ? styles.menuOpen : "";

	return (
		<>
			<header>
				<div className={styles.container}>
					<img src="/header-logo.png" alt="Game Manager Logo" width="97" height="41" />

					<nav className={styles.navbar}>
						<button className={styles.burger} onClick={toggleMenu}>
							<span />
							<span />
							<span />
						</button>

						<div className={`${styles.menu} ${menuClass}`}>
							<Tabs />
						</div>

						<div className={styles.authSection}>
							{isAuthenticated ? (
								<div className={styles.userMenu}>
									<button className={styles.logoutBtn} onClick={logout}>
										Déconnexion
									</button>
								</div>
							) : (
								<button
									className={styles.loginBtn}
									onClick={() => setShowAuthModal(true)}
								>
									Connexion
								</button>
							)}
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