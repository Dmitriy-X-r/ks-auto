"use client";

import { useEffect, useState } from "react";
import { CatalogCard } from '@/components/catalog/CatalogCard/catalogCard';
import AdvertisingElement from '@/components/advertising-element/Advertising-element';
import { CatalogCard as CatalogItem } from '@/lib/mappers/mapTop100';
import { getLastAds } from '@/lib/api/ads';
import {
    mergePremiumRegularFirstPage,
    mergePremiumRegularNextPages
} from '@/lib/functions/mergeArray';
import './LatestArrivals.css';

export default function LatestArrivals() {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadItems(1, true);
    }, []);

    async function loadItems(page: number, initial = false) {
        if (loading) return;
        setLoading(true);

        try {
            const [premiumItems, regularItems] = await Promise.all([
                getLastAds({ page, premium: true }),
                getLastAds({ page, premium: false }),
            ]);

            let merged: CatalogItem[];
            if (page === 1) {
                merged = mergePremiumRegularFirstPage(premiumItems, regularItems);
            } else {
                merged = mergePremiumRegularNextPages(premiumItems, regularItems);
            }

            setItems(prev => initial ? merged : [...prev, ...merged]);
            setNextPage(page + 1);
            setHasMore(premiumItems.length + regularItems.length > 0);

        } catch (err) {
            console.error("Failed to load latest arrivals", err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="sale-title-block new-container">
                <h2 className="second-title">Последние поступления</h2>
                <a href="/catalog/" className="link_btn link_btn__light">В каталог</a>
            </div>

            <section className="section_main catalog catalog-new new-container">
                <div className="catalog__list" id="catalog__list">
                    <AdvertisingElement className="catalog__items__adverting-element" />

                    {items.map(item => (
                        <div key={item.id} className="catalog__items news-item">
                            <CatalogCard item={item} />
                        </div>
                    ))}

                    {hasMore && (
                        <div
                            className="load_more"
                            onClick={() => loadItems(nextPage)}
                            role="button"
                            tabIndex={0}
                            style={{ cursor: "pointer" }}
                        >
                            {loading ? "Загрузка..." : "Показать ещё"}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
