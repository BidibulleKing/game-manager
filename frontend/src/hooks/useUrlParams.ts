import { useState, useEffect, useCallback } from 'react';
import type { SearchParams } from '../types/SearchResultType';

export function useUrlParams(initialParams: SearchParams = {}) {
	const [params, setParams] = useState<SearchParams>(initialParams);

	// Read parameters from the URL on initial load
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const newParams: SearchParams = {
			search: urlParams.get('search') || initialParams.search,
			page: parseInt(urlParams.get('page') || '1') || initialParams.page || 1,
			limit: parseInt(urlParams.get('limit') || '12') || initialParams.limit || 12,
			sortBy: urlParams.get('sortBy') || initialParams.sortBy,
			sortOrder: (urlParams.get('sortOrder') as 'asc' | 'desc') || initialParams.sortOrder || 'desc'
		};

		setParams(newParams);
	}, [initialParams.search, initialParams.page, initialParams.limit, initialParams.sortBy, initialParams.sortOrder]);

	// Update the URL when the parameters change
	const updateParams = useCallback((newParams: Partial<SearchParams>) => {
		const updatedParams = { ...params, ...newParams };
		setParams(updatedParams);

		const urlParams = new URLSearchParams();

		if (updatedParams.search) urlParams.set('search', updatedParams.search);
		if (updatedParams.page && updatedParams.page > 1) urlParams.set('page', updatedParams.page.toString());
		if (updatedParams.limit && updatedParams.limit !== 12) urlParams.set('limit', updatedParams.limit.toString());
		if (updatedParams.sortBy) urlParams.set('sortBy', updatedParams.sortBy);
		if (updatedParams.sortOrder && updatedParams.sortOrder !== 'desc') urlParams.set('sortOrder', updatedParams.sortOrder);

		const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
		window.history.replaceState({}, '', newUrl);
	}, [params]);

	return {
		params,
		updateParams
	};
}
