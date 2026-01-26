import { Top100ApiItemRaw } from '@/lib/api/top100';

export interface CatalogCard {
    id: string | number;
    detailUrl: string;
    phone_number: string | null;
    saler_name: string | null;
    time_job: string | null;
    marka: string;
    model: string;
    price: number;
    created_by: string | number;
    discountPrice?: number | null;
    isClubService?: boolean;
    discountNote?: string | null;
    carAvailability?: string | null;
    location?: string | null;
    year: number | string;
    power: number | string;
    mileage: number | string;
    driveUnit: string;
    boxCar: string;
    pictures: string[];
    isPremium: boolean;
}

export function mapTop100(item: Top100ApiItemRaw): CatalogCard {
    const nameParts = item.NAME.split(",").map(s => s.trim());

    const marka = nameParts[0] ?? "—";
    const modelRaw = nameParts[1] ?? "—";
    
    const yearMatch = item.NAME.match(/\b(19|20)\d{2}\b/);
    const year: string | number = yearMatch ? yearMatch[0] : '';

    const cardProps = item.CARD_DISPLAY_PROPERTY
        ? item.CARD_DISPLAY_PROPERTY.split(",").map(s => s.trim())
        : [];

    const [
        _engineVolume,
        powerRaw,
        mileageRaw,
        boxCar = '',
        driveUnit = '',
    ] = cardProps;

    const power = powerRaw
        ? Number(powerRaw.replace(/[^\d]/g, ''))
        : 0;

    const mileage = mileageRaw
        ? Number(mileageRaw.replace(/[^\d]/g, ''))
        : 0;

    return {
        id: item.CREATED_BY + item.NAME,
        phone_number: item.PHONE ?? null,
        saler_name: item.DISPLAY_NAME ?? null,
        detailUrl: item.DETAIL_PAGE_URL ?? "#",
        created_by: item.CREATED_BY,
        time_job: item.TIME_JOB ?? null,

        marka,
        model: modelRaw,
        price: Number(item.PRICE) || 0,
        location: item.CITY ?? null,
        year,
        power,
        mileage,
        driveUnit,
        boxCar,
        pictures: item.PICTURES?.length
            ? item.PICTURES
            : ["/img/no-img.webp"],
        isClubService: false,
        isPremium: !!item.PRODVIGENIE,
    };
}
