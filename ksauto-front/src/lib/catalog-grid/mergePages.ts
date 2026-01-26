import {GridSources} from "@/lib/catalog-grid/types";
import { buildCatalogGrid } from './buildGrid';
import { FIRST_PAGE_PATTERN, NEXT_PAGE_PATTERN } from './patterns';

export function mergeFirstPage(sources: GridSources, existingIds: Set<string>) {
    return buildCatalogGrid(FIRST_PAGE_PATTERN, sources, existingIds);
}

export function mergeNextPage(sources: GridSources, existingIds: Set<string>) {
    return buildCatalogGrid(NEXT_PAGE_PATTERN, sources, existingIds);
}