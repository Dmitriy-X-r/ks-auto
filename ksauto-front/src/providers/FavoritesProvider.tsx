"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {getAuthToken} from "@/lib/auth/getAuthToken";
import {addToFavorite, removeFromFavorite} from "@/lib/api/favorite";

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (id: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/favorites");
                if (!res.ok) return; // не авторизован или ошибка
                const data = await res.json();
                setFavorites(data.items || []);
            } catch (e) {
                console.error("Failed to load favorites", e);
            } finally {
                setInitialized(true);
            }
        })();
    }, []);

    const toggleFavorite = async (id: string) => {
        if (loading) return;
        setLoading(true);

        const token = getAuthToken();
        if (!token) return; // пользователь не авторизован, ничего не делаем

        try {
            const isFav = favorites.includes(id);

            if (isFav) {
                await removeFromFavorite(id, token);
                setFavorites(prev => prev.filter(f => f !== id));
            } else {
                await addToFavorite(id, token);
                setFavorites(prev => [...prev, id]);
            }
        } catch (e) {
            console.error("Failed to toggle favorite", e);
        } finally {
            setLoading(false);
        }
    };

    // если пользователь не авторизован, можно скрыть кнопки
    if (!initialized) return null;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
    return ctx;
}
