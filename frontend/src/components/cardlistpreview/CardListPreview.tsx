export default function CardListPreview({ cards }) {
	return (
		<>
			<h2>Les plus joués</h2>

			<div>
				{cards.map((card, index) => (
					<Card key={index} />
				))}
			</div>
		</>
	);
}