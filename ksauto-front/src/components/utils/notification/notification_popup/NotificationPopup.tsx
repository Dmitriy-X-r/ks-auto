
import {PopupClose} from "@/components/utils/notification/icons/PopupClose";
import {NotificationCard} from "@/components/utils/notification/NotificationCard/NotificationCard";
import {useEffect} from "react";

type NotificationPopupProps = {
    items: Array<{
        id: number | string;
        title: string;
        text: string;
        date: string;
        read: boolean;
    }>;
    onClose?: () => void;
    onDelete?: (id: number | string) => void;
    onMarkAsRead?: (ids: Array<number | string>) => void;
    onDeleteAll?: () => void;
    isOpen?: boolean;
};

export function NotificationPopup({
                                      items,
                                      onClose,
                                      onDelete,
                                      onMarkAsRead,
                                      onDeleteAll,
                                      isOpen = false,
                                  }: NotificationPopupProps) {

    useEffect(() => {
        if (!isOpen) return;

        const unreadIds = items.filter(item => !item.read).map(item => item.id);
        if (unreadIds.length === 0) return;

        const timer = setTimeout(() => {
            if (onMarkAsRead) onMarkAsRead(unreadIds);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isOpen, items, onMarkAsRead]);

    const handleClearAll = () => {
        if (onDeleteAll) onDeleteAll();
    };

    return (
        <div className={`header-notif-wrapper ${isOpen ? "open" : ""}`} data-check-popup="true">
            <div className="header-notif-title-block">
                <p className="header-notif-title">Уведомления</p>
                <div className="mob-header-notif-wrapper-close">
                    <PopupClose onClick={onClose} />
                </div>
                {items.length > 0 && (
                    <p className="header-notif-clear" onClick={handleClearAll}>
                        Очистить все
                    </p>
                )}
            </div>

            <div className="header-notif-list">
                {items.length > 0 ? (
                    items.map(item => (
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