import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = {
    message: string;
    onClose: () => void;
};

export function FavoritePopup({ message, onClose }: Props) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // авто-скрытие через 3 секунды
        return () => clearTimeout(timer);
    }, [onClose]);

    return createPortal(
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <p className="popup_notification" style={{ textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>
                    {message}
                </p>

                <div className="popup-window-buttons">
                    <button
                        className="button_primary_popup"
                        onClick={onClose}
                        style={{ width: "100px", textAlign: "center" }}
                    >
                        ОК
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
