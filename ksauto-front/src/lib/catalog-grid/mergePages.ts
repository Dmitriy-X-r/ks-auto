import { GridSources } from './types';
import { buildCatalogGrid } from './buildGrid';
import { FIRST_PAGE_PATTERN, NEXT_PAGE_PATTERN } from './patterns';

export function mergeFirstPage(sources: GridSources) {
    return buildCatalogGrid(FIRST_PAGE_PATTERN, sources);
}

export function mergeNextPage(sources: GridSources) {
    return buildCatalogGrid(NEXT_PAGE_PATTERN, sources);
}