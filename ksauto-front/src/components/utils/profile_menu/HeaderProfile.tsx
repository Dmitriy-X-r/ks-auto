"use client";

import {useEffect, useRef, useState} from "react";
import { HeaderProfileIcon } from "./HeaderProfileIcon";
import { HeaderProfilePopup } from "./HeaderPopup";
import { ProfileMenuApiResponse } from "@/lib/api/get_profile_menu";

type Props = {
    data: ProfileMenuApiResponse;
};

export function HeaderProfile({ data }: Props) {
    const [active, setActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setActive(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className={`header-profile ${active ? "active" : ""}`} data-check-popup="true">
            <div onClick={() => setActive(v => !v)}>
                <HeaderProfileIcon avatar={data.avatar} />
            </div>

            <HeaderProfilePopup data={data} />
        </div>
    );
}
