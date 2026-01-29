import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import './popup.css'

type Props = {
    phone: string;
    name?: string | null;
    time?: string | null;
    userId: number | string;
    onClose: () => void;
    portalId: string;
};

// тип для данных от API
type MangoPhoneData = {
    status: 'success' | 'error';
    phone: string | null;
    qr: string | null;
};

export function ContactPopup({ phone, name, userId, onClose, portalId }: Props) {
    const [loading, setLoading] = useState(false);
    const [mangoData, setMangoData] = useState<MangoPhoneData | null>(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleShowPhone = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/next_main/api/mango-phone?r_num_string=${phone}&user_id=${userId}`);
            const data = await res.json();
            if (data.result?.status === "success") {
                setMangoData({
                    status: data.result.status,
                    phone: data.result.phone,
                    qr: data.result.qr
                });
            } else {
                setMangoData({
                    status: "error",
                    phone: "Ошибка",
                    qr: null
                });
            }
        } catch {
            setMangoData({
                status: "error",
                phone: "Ошибка сети",
                qr: null
            });
        } finally {
            setLoading(false);
        }
    };

    const mangoPhone = mangoData?.phone;
    const qr = mangoData?.qr;

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
                                <span className="tooltip">
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
                {qr && (
                    <div className="popup-qr-wrapper" style={{textAlign: "center" }}>
                        <img src={qr} alt="QR-код" width={200} height={200} />
                        <p style={{marginTop: "10px"}} className="catalog-popup-contact-info">
                            Наведите камеру на QR-код, чтобы позвонить с телефона
                        </p>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
