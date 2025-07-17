export type SearchResultType<T> = {
	data: T[];
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		itemsPerPage: number;
		hasNext: boolean;
		hasPrevious: boolean;
	};
};

export type SearchParams = {
	search?: string;
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
};
