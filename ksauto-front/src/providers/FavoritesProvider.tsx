"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {getAuthToken} from "@/lib/auth/getAuthToken";
import {getFavoriteList} from "@/lib/api/favorite";

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
            const token = getAuthToken(); // клиентский token
            if (!token) {
                setFavorites([]);
                setInitialized(true);
                return;
            }

            try {
                const res = await fetch("/api/favorites", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch favorites");

                const data = await res.json();
                console.log(data);
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

        const token = getAuthToken();
        if (!token) {
            console.warn("User not authorized");
            return;
        }

        setLoading(true);

        const isFav = favorites.includes(id);

        setFavorites(prev =>
            isFav ? prev.filter(f => f !== id) : [...prev, id]
        );

        try {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: isFav ? "delete" : "add",
                    productId: id,
                }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }
        } catch (e) {
            // rollback
            setFavorites(prev =>
                isFav ? [...prev, id] : prev.filter(f => f !== id)
            );
        } finally {
            setLoading(false);
        }
    };

    if (!initialized) return null;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error("useFavorites must be used inside FavoritesProvider");
    }
    return ctx;
}
