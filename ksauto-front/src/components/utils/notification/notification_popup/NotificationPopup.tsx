
import {PopupClose} from "@/components/utils/notification/icons/PopupClose";
import {NotificationCard} from "@/components/utils/notification/NotificationCard/NotificationCard";

type NotificationPopupProps = {
    items: Array<{
        id: number | string;
        title: string;
        text: string;
        date: string;
        read?: boolean;
    }>
    onClose?: () => void;
    onDelete?: (id: number | string) => void;
    isOpen?: boolean;
}

export function NotificationPopup({ items, onClose, onDelete, isOpen = false }: NotificationPopupProps) {
    const handleClearAll = () => {
        if (onDelete) {
            items.forEach(item => onDelete(item.id));
        }
    }
    return (
        <div
            className={`header-notif-wrapper ${isOpen ? "open" : ""}`}
            data-check-popup="true"
        >
            <div className="header-notif-title-block">
                <p className="header-notif-title">Уведомления</p>
                <div className="mob-header-notif-wrapper-close">
                    <PopupClose onClick={onClose} />
                </div>

                {items.length > 0 && <p className="header-notif-clear" onClick={handleClearAll}>Очистить все</p>}
            </div>

            <div className="header-notif-list">
                {items.length > 0 ? (
                    items.map((item) => (
                        <NotificationCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            text={item.text}
                            date={item.date}
                            read={item.read}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="header-notif-item-empty">
                        <div className="header-notif-item-desc">Список уведомлений пуст</div>
                    </div>
                )}
            </div>
        </div>
    );
}