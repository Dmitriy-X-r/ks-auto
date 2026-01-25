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
}

export function mapTop100(item: Top100ApiItemRaw): CatalogCard {
    const nameParts = item.NAME.split(",").map(s => s.trim());
    const [marka, modelRaw, yearDriveBox] = nameParts;

    let year = '';
    let driveUnit = '';
    let boxCar = '';
    if (yearDriveBox) {
        const regex = /(\d{4})г\.,\s*(.*)\s*,\s*(.*)/;
        const match = yearDriveBox.match(regex);
        if (match) {
            year = match[1];
            driveUnit = match[2].toLowerCase().includes('задний') ? 'задний' : match[2].toLowerCase().includes('передний') ? 'передний' : match[2];
            boxCar = match[3];
        }
    }

    return {
        id: item.CREATED_BY + item.NAME,
        phone_number: item.PHONE ?? null,
        saler_name: item.DISPLAY_NAME ?? null,
        detailUrl: item.DETAIL_PAGE_URL ?? "#",
        created_by: item.CREATED_BY,
        time_job: item.TIME_JOB ?? null,
        marka: marka ?? "—",
        model: modelRaw ?? "—",
        price: Number(item.PRICE) || 0,
        location: item.CITY ?? null,
        year,
        power: 0,
        mileage: 0,
        driveUnit,
        boxCar,
        pictures: ["/local/img/no-photo.png"],
        isClubService: !!item.PRODVIGENIE,
    };
}