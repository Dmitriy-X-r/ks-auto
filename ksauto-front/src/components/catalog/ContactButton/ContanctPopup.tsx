import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getMangoPhone } from "@/lib/api/get_mango"; // путь к твоему методу
import './popup.css'
type Props = {
    phone: string;
    name?: string | null;
    time?: string | null;
    userId: number | string;
    onClose: () => void;
    portalId: string;
};

export function ContactPopup({ phone, name, time, userId, onClose,portalId }: Props) {
    const [loading, setLoading] = useState(false);
    const [mangoPhone, setMangoPhone] = useState<string | null>(null);
    useEffect(() => {
        // блокируем скролл
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleShowPhone = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/mango-phone?r_num_string=${phone}&user_id=${userId}`);
            const data = await res.json();
            setMangoPhone(data.result?.status === "success" ? data.result.phone : "Ошибка");
        } catch {
            setMangoPhone("Ошибка сети");
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <button className="popup__close" onClick={onClose} aria-label="Закрыть" />

                <h3 className="popup__title">Связаться с владельцем</h3>
                <p className="popup__name">{name ?? "Менеджер"}</p>

                <div className="popup-window-buttons">
                    {!mangoPhone ? (
                        <button
                            className="button_primary_popup"
                            onClick={handleShowPhone}
                            disabled={loading}
                        >
                            {loading ? "Загрузка..." : "Показать телефон"}
                        </button>
                    ) : (
                        <div className="popup-phone-wrapper">
                            <a href={`tel:${mangoPhone}`} className="popup__phone">
                                {mangoPhone}
                            </a>

                            <div
                                className="catalog-popup-contact-info-icon"
                                style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
                            >
                <span
                    className="tooltip"
                >
  <svg
      width="15"
      height="13"
      viewBox="0 0 15 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: "calc(50% - 7.5px)", left: "-14px" }}
  >
    <path d="M0 6.5L15 0.437822V12.5622L0 6.5Z" fill="#000"></path>
  </svg>
  <b>Временный номер</b>
  Номер будет доступен для связи с продавцом только сейчас
</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}


