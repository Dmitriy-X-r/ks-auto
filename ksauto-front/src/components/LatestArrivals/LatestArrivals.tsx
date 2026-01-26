"use client";

import { useEffect, useState } from "react";
import { CatalogCard } from '@/components/catalog/CatalogCard/catalogCard';
import AdvertisingElement from '@/components/advertising-element/Advertising-element';
import { CatalogCard as CatalogItem } from '@/lib/mappers/mapTop100';
import {getLastAds, getLastAdsClient} from '@/lib/api/ads';
import './LatestArrivals.css';
import {mergeFirstPage, mergeNextPage,} from '@/lib/catalog-grid/mergePages';

export default function LatestArrivals() {
    const [items, setItems] = useState<CatalogItem[]>([]);
    const REGULAR_PAGE_SIZE = 11;
    const [premiumPool, setPremiumPool] = useState<CatalogItem[]>([]);
    const [regularBuffer, setRegularBuffer] = useState<CatalogItem[]>([]);

    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const premium = await getLastAdsClient({ premium: true, pageSize: REGULAR_PAGE_SIZE });
                setPremiumPool(premium);
                await loadItems(1, true, premium);
            } catch (e) {
                console.error("Failed to load premium ads", e);
            }
        })();
    }, []);
    async function loadItems(page: number, initial = false,premiumOverride?: CatalogItem[]) {
        if (loading) return;
        setLoading(true);

        try {
            const regular = await getLastAdsClient({
                page, premium: false,
                pageSize: REGULAR_PAGE_SIZE
            });
            const effectivePremium = premiumOverride ?? premiumPool;
            const sources = {
                premiumPool: [...effectivePremium],
                regularBuffer: [...regularBuffer, ...regular],
            };
            const merged =
                page === 1
                    ? mergeFirstPage(sources)
                    : mergeNextPage(sources);

            setItems(prev => (initial ? merged : [...prev, ...merged]));
            setPremiumPool(sources.premiumPool);
            setRegularBuffer(sources.regularBuffer);

            setNextPage(page + 1);
            setHasMore(regular.length > 0);
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
                <a href="/catalog/" className="link_btn link_btn__light">
                    В каталог
                </a>
            </div>

            <section className="section_main catalog catalog-new new-container">
                <div className="catalog__list" id="catalog__list">
                    {/* Баннер */}
                    <AdvertisingElement className="catalog__items__adverting-element" />

                    {items.map(item => (
                        <div key={`${item.id}-${item.created_by}`} className="catalog__items news-item">
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
