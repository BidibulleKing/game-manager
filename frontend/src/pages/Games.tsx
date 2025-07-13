import CardListPreview from "../components/cardlistpreview/CardListPreview";
import Topbar from "../components/topbar/Topbar";

export default function Games() {
	return (
		<>
			<Topbar />

			<CardListPreview cards={[]} />
		</>
	);
}