"use client";

import Link from "next/link";

import { useMemo, useState } from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./Top100.css"

type CatalogCard = {
    id: number | string;
    detailUrl: string;

    marka: string;
    model: string;

    price: number;
    discountPrice?: number | null;

    isClubService?: boolean;
    discountNote?: string | null;
    carAvailability?: string | null;

    location?: string | null;

    year: number | string;
    power: number | string;
    mileage: number | string;
    driveUnit: string;
    boxCar: string;

    pictures: string[];
};

function formatPrice(v?: number | null) {
    if (v === null || v === undefined) return "";
    return `${Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
}

export default function Top100() {
    const cabinetUrl = "/personal/my_ads/";
    const maxSlidesCount = 5;

    // ====== МОКИ ======
    const items: CatalogCard[] = useMemo(
        () => [
            {
                id: 1,
                detailUrl: "/premium/1/",
                marka: "Toyota",
                model: "Camry",
                price: 2899000,
                discountPrice: 3099000,
                isClubService: true,
                discountNote: "Скидка",
                location: "Москва",
                year: 2021,
                power: 181,
                mileage: 54000,
                driveUnit: "передний",
                boxCar: "автомат",
                pictures: ["/local/img/no-photo.png", "/local/img/no-photo.png"],
            },
            {
                id: 2,
                detailUrl: "/premium/2/",
                marka: "BMW",
                model: "X5",
                price: 6790000,
                discountPrice: null,
                isClubService: false,
                discountNote: null,
                location: "Санкт-Петербург",
                year: 2020,
                power: 340,
                mileage: 62000,
                driveUnit: "полный",
                boxCar: "автомат",
                pictures: ["/local/img/no-photo.png"],
            },
            {
                id: 3,
                detailUrl: "/premium/3/",
                marka: "Lada (ВАЗ)",
                model: "Vesta",
                price: 1299000,
                discountPrice: 1399000,
                isClubService: false,
                discountNote: "Выгодно",
                location: "Казань",
                year: 2023,
                power: 106,
                mileage: 12000,
                driveUnit: "передний",
                boxCar: "механика",
                pictures: ["/local/img/no-photo.png"],
            },
            {
                id: 4,
                detailUrl: "/premium/1/",
                marka: "Toyota",
                model: "Camry",
                price: 2899000,
                discountPrice: 3099000,
                isClubService: true,
                discountNote: "Скидка",
                location: "Москва",
                year: 2021,
                power: 181,
                mileage: 54000,
                driveUnit: "передний",
                boxCar: "автомат",
                pictures: ["/local/img/no-photo.png", "/local/img/no-photo.png"],
            },
            {
                id: 5,
                detailUrl: "/premium/2/",
                marka: "BMW",
                model: "X5",
                price: 6790000,
                discountPrice: null,
                isClubService: false,
                discountNote: null,
                location: "Санкт-Петербург",
                year: 2020,
                power: 340,
                mileage: 62000,
                driveUnit: "полный",
                boxCar: "автомат",
                pictures: ["/local/img/no-photo.png"],
            },
            {
                id: 6,
                detailUrl: "/premium/3/",
                marka: "Lada (ВАЗ)",
                model: "Vesta",
                price: 1299000,
                discountPrice: 1399000,
                isClubService: false,
                discountNote: "Выгодно",
                location: "Казань",
                year: 2023,
                power: 106,
                mileage: 12000,
                driveUnit: "передний",
                boxCar: "механика",
                pictures: ["/local/img/no-photo.png"],
            },
            // добавь ещё моков — будет как “Топ-100”
        ],
        []
    );

    return (
        <section className="section_main catalog catalog-new catalog-premium new-container">
            <div className="sale-title-block premium">
                <h2 className="second-title">Топ - 100</h2>

                <div>
                    <a href="/premium/" className="link_btn link_btn__light">
                        Смотреть все
                    </a>
                    <a href={cabinetUrl} className="link_btn link_btn__dark ads-link__btn ads-link__btn prem_add">
                        <span>Добавить</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.625 4.375C10.625 4.02982 10.3452 3.75 10 3.75C9.65482 3.75 9.375 4.02982 9.375 4.375V9.375H4.375C4.02982 9.375 3.75 9.65482 3.75 10C3.75 10.3452 4.02982 10.625 4.375 10.625H9.375V15.625C9.375 15.9702 9.65482 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V10.625H15.625C15.9702 10.625 16.25 10.3452 16.25 10C16.25 9.65482 15.9702 9.375 15.625 9.375H10.625V4.375Z"
                                fill="white"
                                style={{ fill: "white", stroke: "none" }}
                            />
                        </svg>
                    </a>
                </div>
            </div>

            {/* ВАЖНО: классы и id как в Bitrix */}
            <Swiper
                id="catalog-slider"
                className="catalog-slider"
                modules={[Autoplay]}
                loop
                speed={300}
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: false }}
                grabCursor
                simulateTouch
                allowTouchMove

                slidesPerView={4}
                slidesPerGroup={1}
                spaceBetween={16}
                watchOverflow

                // ✅ важное для “не показывать кусок следующего”
                centeredSlides={false}
                centeredSlidesBounds={true}
                slidesOffsetBefore={0}
                slidesOffsetAfter={0}

                breakpoints={{
                    0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 12 },
                    576: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 12 },
                    992: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16 },
                    1200: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 16 },
                    1400: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 16 },
                }}
            >
                {items.map((it) => (
                    <SwiperSlide key={it.id} className="catalog-slide">
                        <CatalogCardView item={it} maxSlidesCount={maxSlidesCount} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

function CatalogCardView({ item, maxSlidesCount }: { item: CatalogCard; maxSlidesCount: number }) {
    const [isFav, setFav] = useState(false);

    const addClForImg = item.isClubService ? " club_service_img" : "";
    const pictures = (item.pictures?.length ? item.pictures : ["/local/img/no-photo.png"]).slice(0, maxSlidesCount);

    return (
        <div className="catalog__items">
            <div
                className={`catalog__items-fav ${isFav ? "active" : ""}`}
                data-id={item.id}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFav((v) => !v);
                }}
                role="button"
                tabIndex={0}
            >
                <svg id="curve_chart" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 10.0543C4.5 7.90742 6.24039 5.9375 8.38728 5.9375C9.67202 5.9375 11.0625 6.5625 11.9999 7.5C12.9375 6.5625 14.328 5.9375 15.6127 5.9375C17.7596 5.9375 19.5 7.90742 19.5 10.0543C19.5 11.4136 18.9295 12.7105 17.9275 13.6289L12.6525 18.7424C12.2889 19.0949 11.711 19.0949 11.3474 18.7424L6.07249 13.6289C5.0705 12.7105 4.5 11.4136 4.5 10.0543Z" />
                </svg>
            </div>

            <div className="catalog__items-link">
                <div className="catalog-sticker-list">
                    {item.isClubService ? <p className="sale_list__check catalog__items-check">Клубный сервис</p> : null}
                    {item.discountNote ? <p className="sale_list__check catalog__items-check">{item.discountNote}</p> : null}
                    {item.carAvailability ? <p className="sale_list__check sale-list__die catalog__items-check">{item.carAvailability}</p> : null}
                </div>

                <a href={item.detailUrl}>
                    <div className={`pc-catalog__slider catalog__items-picture${addClForImg}`}>
                        {pictures.map((src, idx) => (
                            <img key={`${src}-${idx}`} className="catalog__items-picture-image" src={src} alt={`${item.marka} ${item.model}`} loading="lazy" />
                        ))}
                    </div>

                    <div className={`mob-catalog__slider mob-catalog__items-picture${addClForImg}`}>
                        {pictures.map((src, idx) => (
                            <div key={`${src}-${idx}`} className="catalog__items-picture-image-wrapper">
                                <img className="catalog__items-picture-image" src={src} alt={`${item.marka} ${item.model}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </a>

                <div className="catalog__items-block">
                    <a href={item.detailUrl} className="catalog__items-block-title">
                        <div>
                            <h3 className="third-title catalog__items-title">
                                {item.marka} {item.model}
                            </h3>
                        </div>

                        <div className="catalog__items-price-wrapper">
                            <p className="catalog__items-price">{formatPrice(item.price)}</p>
                            {item.discountPrice ? <p className="catalog__items-price_old active">{formatPrice(item.discountPrice)}</p> : null}
                        </div>
                    </a>

                    {item.location ? (
                        <div className="catalog__items-location">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M2.1023 2.57803C2.21412 2.47556 2.37666 2.45054 2.51413 2.51464L10.0053 6.00783C10.1412 6.07121 10.2263 6.20945 10.2217 6.35934C10.217 6.50922 10.1235 6.64192 9.98393 6.69674L6.96348 7.88306L5.51842 10.7886C5.45164 10.9229 5.3113 11.0045 5.16158 10.996C5.01186 10.9876 4.88155 10.8908 4.83027 10.7499L2.00326 2.98277C1.95139 2.84024 1.99047 2.6805 2.1023 2.57803ZM3.01767 3.57698L5.2361 9.67206L6.35624 7.41981C6.39762 7.3366 6.46842 7.27173 6.55492 7.23776L8.89622 6.31818L3.01767 3.57698Z"
                                    fill="#E23737"
                                    style={{ fill: "#E23737", stroke: "none" }}
                                />
                            </svg>
                            <p>{item.location}</p>
                        </div>
                    ) : null}

                    <div className="catalog__items-tab">
                        <div className="catalog__items-tab-item">{item.year} г.</div>
                        <div className="catalog__items-tab-item">{item.power} л.с.</div>
                        <div className="catalog__items-tab-item">{item.mileage} км</div>
                        <div className="catalog__items-tab-item">{item.driveUnit} привод</div>
                        <div className="catalog__items-tab-item">{item.boxCar}</div>
                    </div>

                    <div
                        className="catalog__items-block-btn link_btn link_btn__light"
                        data-usr={"mock"}
                        data-phones={btoa("+7 (495) 129-92-22")}
                        data-name={"Менеджер"}
                        data-title={"09:00–21:00"}
                    >
                        Связаться
                    </div>
                </div>
            </div>
        </div>
    );
}
