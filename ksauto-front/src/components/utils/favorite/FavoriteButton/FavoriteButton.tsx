"use client";
import React, { useEffect, useState } from "react";
import { FavoriteIcon } from "@/components/utils/favorite/FavoriteIcon/FavoriteIcon";
import {useFavorites} from "@/providers/FavoritesProvider";
import {getAuthToken} from "@/lib/auth/getAuthToken";
import {FavoritePopup} from "@/components/utils/favorite/FavoriteButton/favoritePopup";

type FavoriteButtonProps = {
    itemId: number | string;
};

export function FavoriteButton({ itemId }: { itemId: string | number }) {
    const { favorites, toggleFavorite } = useFavorites();
    const [loading, setLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    const isFav = favorites.includes(String(itemId));

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            await toggleFavorite(String(itemId));

            setPopupMessage(isFav ? "Удалено из избранного" : "Добавлено в избранное");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className={`catalog__items-fav ${isFav ? "active" : ""}`}
                onClick={handleClick}
                role="button"
                aria-label="Добавить в избранное"
            >
                <FavoriteIcon filled={isFav} color="#FFFFFF" />
            </div>

            {popupMessage && (
                <FavoritePopup
                    message={popupMessage}
                    onClose={() => setPopupMessage(null)}
                />
            )}
        </>
    );
}

