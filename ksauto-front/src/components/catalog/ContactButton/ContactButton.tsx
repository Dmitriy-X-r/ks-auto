"use client";

import { useState } from "react";
import { ContactPopup } from "./ContanctPopup";
import { ContactButtonProps } from "./contact.types";


const FALLBACK_PHONE = "+74951277222";

export function ContactButton({ userId, phone, name, time }: ContactButtonProps) {
    const [open, setOpen] = useState(false);
    const resolvedPhone = phone ?? FALLBACK_PHONE;

    return (
        <>
            <button
                className="link_btn link_btn__light"
                onClick={() => setOpen(true)}
            >
                Связаться
            </button>

            {open && (
                <ContactPopup
                    userId={userId}
                    phone={resolvedPhone}
                    name={name}
                    time={time}
                    onClose={() => setOpen(false)}
                    portalId="popup-root"
                />
            )}
        </>
    );
}