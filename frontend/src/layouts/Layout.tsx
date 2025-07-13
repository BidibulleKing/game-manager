// import Footer from "../partials/footer/Footer";
import Header from "../partials/header/Header";
import styles from "./layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />

			<main className={styles.main}>
				{children}
			</main>

			{/* <Footer /> */}
		</>
	);
}