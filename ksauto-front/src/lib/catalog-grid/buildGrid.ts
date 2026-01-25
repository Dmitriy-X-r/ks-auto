import { GridSources, GridSlot } from './types';

export function buildCatalogGrid(
    pattern: GridSlot[],
    sources: GridSources
) {
    const result = [];

    for (const slot of pattern) {
        if (slot === 'P') {
            if (sources.premiumPool.length) {
                result.push(sources.premiumPool.shift()!);
            } else if (sources.regularBuffer.length) {
                result.push(sources.regularBuffer.shift()!);
            }
        } else {
            if (sources.regularBuffer.length) {
                result.push(sources.regularBuffer.shift()!);
            }
        }
    }

    return result;
}