"use client";
import React, { useEffect, useState } from "react";
import { FavoriteIcon } from "@/components/utils/favorite/FavoriteIcon/FavoriteIcon";
import {useFavorites} from "@/providers/FavoritesProvider";
import {getAuthToken} from "@/lib/auth/getAuthToken";

type FavoriteButtonProps = {
    itemId: number | string;
};

export function FavoriteButton({ itemId }: FavoriteButtonProps) {

    const { favorites, toggleFavorite } = useFavorites(); // <-- контекст
    const [isFav, setIsFav] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setIsFav(favorites.includes(String(itemId)));
    }, [favorites, itemId]);
    const token=getAuthToken();
    if(!token)return null;
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            await toggleFavorite(String(itemId));
            setIsFav((prev) => !prev);
        } catch (e) {
            console.error("FavoriteButton error:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`catalog__items-fav ${isFav ? "active" : ""}`}
            onClick={handleClick}
            role="button"
            aria-label="Добавить в избранное"
        >
            <FavoriteIcon
                filled={isFav}
                width={24}
                height={25}
                strokeColor="#FFFFFF"
                fillColor="#FFFFFF"
            />
        </div>
    );
}
