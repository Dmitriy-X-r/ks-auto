"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {getAuthToken} from "@/lib/auth/getAuthToken";
import {NotificationBell} from "@/components/utils/notification/NotificationBell/NotificationBell";
import {FavoriteLink} from "@/components/utils/favorite/FavoriteLink/FavoriteLink";
import {HeaderProfile} from "@/components/utils/profile_menu/HeaderProfile";
import {ProfileMenuApiResponse} from "@/lib/api/get_profile_menu";

type HeaderActionsProps = {
    isAuth?: boolean | null;
    profileData: ProfileMenuApiResponse | null;
};
export function HeaderActions({ isAuth, profileData }: HeaderActionsProps) {


    return (
        <>
            {isAuth ? (
                <>
                    <NotificationBell />
                    <FavoriteLink />
                    {profileData && <HeaderProfile data={profileData} />}
                </>
            ) : (
                <Link href="/auth/" className="header-account header-account-not-auth">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.5 6.25C12.5 4.86929 11.3807 3.75 10 3.75C8.61929 3.75 7.5 4.86929 7.5 6.25C7.5 7.63071 8.61929 8.75 10 8.75C11.3807 8.75 12.5 7.63071 12.5 6.25ZM13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92893 10 6.25 8.32107 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25ZM3.75 15.9375C3.75 16.1101 3.88991 16.25 4.06249 16.25H15.9375C16.1101 16.25 16.25 16.1101 16.25 15.9375C16.25 15.2296 15.7874 14.3996 14.6408 13.6829C13.5118 12.9773 11.8743 12.5 10 12.5C8.12572 12.5 6.48821 12.9773 5.3592 13.6829C4.21256 14.3996 3.75 15.2296 3.75 15.9375ZM2.5 15.9375C2.5 13.3487 5.85786 11.25 10 11.25C14.1421 11.25 17.5 13.3487 17.5 15.9375C17.5 16.8004 16.8004 17.5 15.9375 17.5H4.06249C3.19955 17.5 2.5 16.8004 2.5 15.9375Z"
                            fill="#AAA6A1"
                            style={{ stroke: "none", fill: "#AAA6A1" }}
                        />
                    </svg>
                    <span>Войти</span>
                </Link>
            )}
        </>
    );
}
