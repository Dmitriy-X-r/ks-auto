import {NotificationClose} from "@/components/utils/notification/icons/NotificationClose";

type NotificationCardProps = {
    id: number | string;
    title?: string;
    text?: string;
    date?: string;
    read: boolean;
    onDelete?: (id:number | string) => void;
}
export function NotificationCard({id,title,text,date,read,onDelete}: NotificationCardProps) {
    return (
        <div className={`header-notif-item ${!read ? "not-read" : ""}`} data-id={id}>
            <p className="header-notif-item-title">{title}</p>
            <p className="header-notif-item-desc">{text}</p>
            <p className="header-notif-item-date">{date}</p>

            <div className="header-notif-item-delete" onClick={() => onDelete?.(id)}>
                <NotificationClose />
            </div>
        </div>
    );
}