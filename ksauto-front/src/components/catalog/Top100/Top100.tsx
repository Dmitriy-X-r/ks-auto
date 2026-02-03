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
                <div>
                    <a href="/premium/" className="link_btn link_btn__light">
                        Смотреть все
                    </a>
                    <a href="/personal/my_ads/" className="link_btn link_btn__dark ads-link__btn ads-link__btn prem_add">
                        <span>Добавить</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.625 4.375C10.625 4.02982 10.3452 3.75 10 3.75C9.65482 3.75 9.375 4.02982 9.375 4.375V9.375H4.375C4.02982 9.375 3.75 9.65482 3.75 10C3.75 10.3452 4.02982 10.625 4.375 10.625H9.375V15.625C9.375 15.9702 9.65482 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V10.625H15.625C15.9702 10.625 16.25 10.3452 16.25 10C16.25 9.65482 15.9702 9.375 15.625 9.375H10.625V4.375Z" fill="white" style={{fill: "white", stroke: "none"}}></path>
                        </svg>
                    </a>
                </div>
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