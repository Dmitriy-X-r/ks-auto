// Raw интерфейс от API
export interface NotificationApiItemRaw {
    ID: string;
    UF_ELEMENT: string;
    UF_DATA: string;
    UF_TYPE: string;
    UF_TEXT: string;
    UF_READ: string;
    UF_USER_ID: string;
    UF_TITLE: string;
    URL: string;
}

// UI интерфейс для Popup
export interface NotificationUIItem {
    id: number;
    title: string;
    text: string;
    date: string;
    read: boolean;
    url: string;
}

// Маппер
export function mapNotification(item: NotificationApiItemRaw): NotificationUIItem {
    const [datePart] = item.UF_DATA.split(" "); // "2026-01-26"
    const [year, month, day] = datePart.split("-");
    return {
        id: Number(item.ID),
        title: item.UF_TITLE,
        text: item.UF_TEXT,
        date: `${day}.${month}.${year}`,
        read: item.UF_READ === "1",
        url: item.URL,
    };
}
