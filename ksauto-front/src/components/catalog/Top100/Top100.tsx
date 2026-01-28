"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { CatalogCard as CatalogCardType } from "@/lib/mappers/mapTop100";
import { CatalogCard } from "@/components/catalog/CatalogCard/catalogCard";

type Props = {
    items: CatalogCardType[];
};

export function Top100Section({ items }: Props) {
    if (!items.length) return null;
    const uniqueCars = Array.from(
        new Map(items.map(item => [`${item.id}-${item.created_by}`, item])).values()
    );
    return (
        <section className="section_main catalog catalog-new catalog-premium new-container">
            <div className="sale-title-block premium">
                <h2 className="second-title">Топ - 100</h2>
                <a href="/premium/" className="link_btn link_btn__light">
                    Смотреть все
                </a>
            </div>

            <div id="catalog-slider" className="catalog-slider">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    spaceBetween={16}
                    loop
                    grabCursor
                    watchOverflow
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 12 },
                        576: { slidesPerView: 2, spaceBetween: 12 },
                        992: { slidesPerView: 2, spaceBetween: 16 },
                        1200: { slidesPerView: 3, spaceBetween: 16 },
                        1400: { slidesPerView: 4, spaceBetween: 16 },
                    }}
                >
                    {uniqueCars.map(item => (
                        <SwiperSlide
                            key={`${item.id}-${item.created_by}`}
                            className="catalog-slide"
                        >
                            <CatalogCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}