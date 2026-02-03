"use client";
import { useEffect, useRef, useState } from "react";
import { NotificationImage } from "@/components/utils/notification/icons/NotificationImage";
import { NotificationPopup } from "@/components/utils/notification/notification_popup/NotificationPopup";

export function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [items, setItems] = useState([
        { id: 1, title: "Новое сообщение", text: "Вы получили новое сообщение", date: "03.02.2026", read: false },
        { id: 2, title: "Обновление", text: "Сайт обновлён", date: "02.02.2026", read: true },
    ]);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleDelete = (id: number | string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
                isOpen={isOpen}
            />
        </div>
    );
}
