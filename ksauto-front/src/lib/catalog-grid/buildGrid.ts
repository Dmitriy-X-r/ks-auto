import { GridSources, GridSlot } from './types';
import { CatalogCard } from '@/lib/mappers/mapTop100';

export function buildCatalogGrid(
    pattern: GridSlot[],
    sources: GridSources,
    existingIds: Set<string>
) {
    const result: CatalogCard[] = [];

    for (const slot of pattern) {
        let candidate: CatalogCard | undefined;

        if (slot === 'P') {
            // Сначала premium
            candidate = sources.premiumPool.find(
                x => !existingIds.has(`${x.id}-${x.created_by}`)
            );

            // Если премиум закончился, fallback обычная
            if (!candidate) {
                candidate = sources.regularBuffer.find(
                    x => !existingIds.has(`${x.id}-${x.created_by}`)
                );

                // Если нет уникальных — берём любую оставшуюся
                if (!candidate && sources.regularBuffer.length) {
                    candidate = sources.regularBuffer[0];
                }
            }
        } else {
            // O-слот
            candidate = sources.regularBuffer.find(
                x => !existingIds.has(`${x.id}-${x.created_by}`)
            );

            if (!candidate && sources.regularBuffer.length) {
                candidate = sources.regularBuffer[0];
            }
        }

        if (candidate) {
            result.push(candidate);
            existingIds.add(`${candidate.id}-${candidate.created_by}`);

            sources.premiumPool = sources.premiumPool.filter(x => x !== candidate);
            sources.regularBuffer = sources.regularBuffer.filter(x => x !== candidate);
        }
    }

    return result;
}

