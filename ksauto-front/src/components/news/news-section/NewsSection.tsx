"use client";

import { useEffect, useState } from "react";
import AdvertisingElement from '@/components/advertising-element/Advertising-element';
import NewsElement from '@/components/news/news-element/NewsElement';
import { mapNews, NewsUIItem } from '@/lib/mappers/mapNews';

export default function NewsSectionClient() {
    const [news, setNews] = useState<NewsUIItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/news?page=1&pageSize=5');
                const data = await res.json();
                if (data.result) {
                    setNews(data.result.map(mapNews));
                }
            } catch (e) {
                console.error('Failed to fetch news:', e);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div>Загрузка...</div>;

    return (
        <section className="section_main shadow new-container">
            <div className="review_main">
                <div className="sale-title-block">
                    <h2 className="second-title">Новости</h2>
                    <a href="/news/" className="link_btn link_btn__light">
                        К новостям
                    </a>
                </div>

                <div className="review_main__list">
                    <AdvertisingElement />

                    {news.map(item => (
                        <NewsElement key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}