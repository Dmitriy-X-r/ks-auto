import React from "react";
import {FavoriteIcon} from "@/components/utils/favorite/FavoriteIcon/FavoriteIcon";

type FavoriteLinkProps = {
    hasFavorites?: boolean;
    href?: string;
    className?: string;
};

export function FavoriteLink({ hasFavorites = true, href = "/personal/favorite/", className }: FavoriteLinkProps) {
    return (
        <a
            href={href}
            className={`header-fav ${hasFavorites ? "fav-isset" : ""} ${className || ""}`}
        >
            <FavoriteIcon filled={false} color="black" />
        </a>
    );
}