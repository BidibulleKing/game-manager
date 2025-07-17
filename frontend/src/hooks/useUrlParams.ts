import { useState, useEffect, useCallback, useRef } from 'react';
import type { SearchParams } from '../types/SearchResultType';

export function useUrlParams(initialParams: SearchParams = {}) {
	const initialParamsRef = useRef(initialParams);
	initialParamsRef.current = initialParams;

	const [params, setParams] = useState<SearchParams>(() => {
		// Initialize from URL on first render
		const urlParams = new URLSearchParams(window.location.search);
		return {
			search: urlParams.get('search') || initialParams.search,
			page: parseInt(urlParams.get('page') || '1') || initialParams.page || 1,
			limit: parseInt(urlParams.get('limit') || '12') || initialParams.limit || 12,
			sortBy: urlParams.get('sortBy') || initialParams.sortBy
		};
	});

	// Only listen to browser navigation (back/forward)
	useEffect(() => {
		const handlePopState = () => {
			const urlParams = new URLSearchParams(window.location.search);
			const current = initialParamsRef.current;
			const newParams: SearchParams = {
				search: urlParams.get('search') || current.search,
				page: parseInt(urlParams.get('page') || '1') || current.page || 1,
				limit: parseInt(urlParams.get('limit') || '12') || current.limit || 12,
				sortBy: urlParams.get('sortBy') || current.sortBy
			};
			setParams(newParams);
		};

		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	// Update the URL when the parameters change
	const updateParams = useCallback((newParams: Partial<SearchParams>) => {
		console.log('🔄 updateParams called with:', newParams);
		const updatedParams = { ...params, ...newParams };
		console.log('📝 updatedParams:', updatedParams);
		setParams(updatedParams);

		const urlParams = new URLSearchParams();

		if (updatedParams.search) urlParams.set('search', updatedParams.search);
		if (updatedParams.page && updatedParams.page > 1) urlParams.set('page', updatedParams.page.toString());
		if (updatedParams.limit && updatedParams.limit !== 12) urlParams.set('limit', updatedParams.limit.toString());
		if (updatedParams.sortBy) urlParams.set('sortBy', updatedParams.sortBy);

		const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
		console.log('🌐 updating URL to:', newUrl);
		window.history.replaceState({}, '', newUrl);
	}, [params]);

	return {
		params,
		updateParams
	};
}
