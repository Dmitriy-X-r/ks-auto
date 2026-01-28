import { CatalogCard } from '@/lib/mappers/mapTop100';

export function mergePremiumRegularFirstPage(
    premium: CatalogCard[],
    regular: CatalogCard[],
    totalItems = 11
): CatalogCard[] {
    const result: CatalogCard[] = regular.slice(0, totalItems); // максимум 11 белых
    let premIndex = 0;

    // Позиции, куда ставим премиум: 4, 8, ... (0-based: 3, 7, 11)
    for (let i = 3; i < result.length && premIndex < premium.length; i += 4) {
        result[i] = premium[premIndex++];
    }

    return result;
}
export function mergePremiumRegularNextPages(
    premium: CatalogCard[],
    regular: CatalogCard[]
): CatalogCard[] {
    const result: CatalogCard[] = [];
    let pIndex = 0;
    let rIndex = 0;

    while (rIndex < regular.length || pIndex < premium.length) {
        // Премиум в начало
        if (pIndex < premium.length) {
            result.push(premium[pIndex++]);
        }

        // Три белых
        for (let i = 0; i < 3 && rIndex < regular.length; i++) {
            result.push(regular[rIndex++]);
        }
    }

    return result;
}
