const formatMinutes = (minutes: number): string => {
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return `${hours}h${mins < 10 ? '0' : ''}${mins}m`;
};

export { formatMinutes };