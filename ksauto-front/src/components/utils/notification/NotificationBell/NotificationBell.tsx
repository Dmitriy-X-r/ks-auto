import { useState, useEffect, useRef } from "react";
import {NotificationImage} from "@/components/utils/notification/icons/NotificationImage";
import {NotificationPopup} from "@/components/utils/notification/notification_popup/NotificationPopup";
import {NotificationUIItem} from "@/lib/mappers/mapNotification";
import {getAuthToken} from "@/lib/auth/getAuthToken";



export function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState<NotificationUIItem[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);

    const token = getAuthToken();

    // Удаление одного уведомления
    const handleDelete = async (id: number | string) => {
        setItems(prev => prev.filter(item => item.id !== id));

        if (!token) return;
        //next_main
        await fetch("/next_main/api/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: "deleteOne", id }),
        });
    };

    // Очистка всех уведомлений
    const handleDeleteAll = async () => {
        setItems([]);

        if (!token) return;
        //next_main
        await fetch("/next_main/api/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: "deleteAll" }),
        });
    };

    // Отметка уведомлений прочитанными
    const handleMarkAsRead = async (ids: Array<number | string>) => {
        setItems(prev => prev.map(item => (ids.includes(item.id) ? { ...item, read: true } : item)));

        if (!token || ids.length === 0) return;
        //next_main
        await fetch("/next_main/api/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action: "markAsRead", ids }),
        });
    };

    // Подгрузка уведомлений с API
    useEffect(() => {
        if (!token) return;
        //next_main
        fetch("/next_main/api/notifications", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => setItems(data.items || []))
            .catch(err => console.error("Failed to load notifications", err));
    }, [token]);

    // Закрытие при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <div className="header-notification-container" ref={containerRef}>
            <div
                className={`header-notification-icon ${items.some(i => !i.read) ? "notification-isset" : ""}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <NotificationImage />
            </div>

            <NotificationPopup
                items={items}
                onClose={() => setIsOpen(false)}
                onDelete={handleDelete}
                onDeleteAll={handleDeleteAll}
                onMarkAsRead={handleMarkAsRead}
                isOpen={isOpen}
            />
        </div>
    );
}
