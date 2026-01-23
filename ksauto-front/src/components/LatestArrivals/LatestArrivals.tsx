"use client";

import { useMemo, useState } from "react";
import AdvertisingElement from '@/components/advertising-element/Advertising-element'
import './LatestArrivals.css';

type CatalogItem = {
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

    year?: number | string | null;
    power?: number | string | null;
    mileage?: number | string | null;
    driveUnit?: string | null;
    boxCar?: string | null;

    pictures: string[];
    createdBy?: number | string;
    phones?: string[]; // для data-phones (потом подставишь реальные)
    userName?: string;
    userTimeJob?: string;
    managerPhoneOrId?: string | number; // data-usr
};

function formatPrice(v?: number | null) {
    if (v === null || v === undefined) return "";
    return `${Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
}

// мок “пагинации”
function genMoreMock(fromId: number, count: number): CatalogItem[] {
    const basePics = ["/local/img/no-photo.png"];
    const marks = ["Toyota", "BMW", "Lada (ВАЗ)", "Kia", "Hyundai", "Nissan", "Renault", "Volkswagen", "Ford"];
    const models = ["Camry", "X5", "Vesta", "Rio", "Solaris", "Qashqai", "Duster", "Polo", "Focus"];

    return Array.from({ length: count }).map((_, i) => {
        const id = fromId + i;
        const idx = id % marks.length;
        return {
            id,
            detailUrl: `/catalog/cars/${id}/`,
            marka: marks[idx],
            model: models[idx],
            price: 900000 + (id % 10) * 250000,
            discountPrice: id % 3 === 0 ? 1200000 + (id % 10) * 250000 : null,
            isClubService: id % 4 === 0,
            discountNote: id % 5 === 0 ? "Выгодно" : null,
            carAvailability: id % 7 === 0 ? "Под заказ" : null,
            location: ["Москва", "СПб", "Казань", "Екатеринбург"][id % 4],
            year: 2018 + (id % 7),
            power: 100 + (id % 8) * 20,
            mileage: 10000 + (id % 12) * 9000,
            driveUnit: ["передний", "полный", "задний"][id % 3],
            boxCar: ["автомат", "механика", "робот"][id % 3],
            pictures: basePics,
            managerPhoneOrId: "mock",
            phones: ["+7 (495) 129-92-22"],
            userName: "Менеджер",
            userTimeJob: "09:00–21:00",
        };
    });
}

export default function LatestArrivals() {
    // аналог “НЕ на favorite странице” — в Next ты сам решишь условие
    const showTitle = true;

    // ===== МОКИ (первый экран) =====
    const initial = useMemo(() => genMoreMock(1, 8), []);
    const [items, setItems] = useState<CatalogItem[]>(initial);

    // мок “пагинации”
    const [nextPage, setNextPage] = useState(2);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // потом будешь брать из API

    async function onLoadMore() {
        if (loading || !hasMore) return;
        setLoading(true);

        // ✅ здесь потом будет fetch к API:
        // const res = await fetch(`/api/latest?page=${nextPage}`);
        // const data = await res.json();
        // setItems(prev => [...prev, ...data.items]);
        // setHasMore(data.hasMore);

        // пока — моки
        await new Promise((r) => setTimeout(r, 400));
        const more = genMoreMock(items.length + 1, 8);
        setItems((prev) => [...prev, ...more]);
        setNextPage((p) => p + 1);

        // для демо ограничим
        if (nextPage >= 3) setHasMore(false);

        setLoading(false);
    }

    return (
        <>
            {showTitle ? (
                <div className="sale-title-block new-container">
                    <h2 className="second-title">Последние поступления</h2>
                    <a href="/catalog/" className="link_btn link_btn__light">
                        В каталог
                    </a>
                </div>
            ) : null}

            <section className="section_main catalog catalog-new new-container">
                <div className="catalog__list" id="catalog__list">
                    <AdvertisingElement className="catalog__items__adverting-element" />
                    {items.map((item, idx) => (
                        <div key={item.id} className="catalog__items news-item">
                            {/* fav */}
                            <div className="catalog__items-fav" data-id={item.id}>
                                <svg id="curve_chart" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 10.0543C4.5 7.90742 6.24039 5.9375 8.38728 5.9375C9.67202 5.9375 11.0625 6.5625 11.9999 7.5C12.9375 6.5625 14.328 5.9375 15.6127 5.9375C17.7596 5.9375 19.5 7.90742 19.5 10.0543C19.5 11.4136 18.9295 12.7105 17.9275 13.6289L12.6525 18.7424C12.2889 19.0949 11.711 19.0949 11.3474 18.7424L6.07249 13.6289C5.0705 12.7105 4.5 11.4136 4.5 10.0543Z" />
                                </svg>
                            </div>

                            <div className="catalog__items-link">
                                {/* stickers */}
                                <div className="catalog-sticker-list">
                                    {item.isClubService ? <p className="sale_list__check catalog__items-check">Клубный сервис</p> : null}
                                    {item.discountNote ? <p className="sale_list__check catalog__items-check">{item.discountNote}</p> : null}
                                    {item.carAvailability ? <p className="sale_list__check sale-list__die catalog__items-check">{item.carAvailability}</p> : null}
                                </div>

                                {/* pictures (pc + mob как в шаблоне) */}
                                <a href={item.detailUrl}>
                                    <div className={`pc-catalog__slider catalog__items-picture${item.isClubService ? " club_service_img" : ""}`}>
                                        {(item.pictures?.length ? item.pictures : ["/local/img/no-photo.png"]).slice(0, 5).map((src, i) => (
                                            <img key={`${item.id}-pc-${i}`} className="catalog__items-picture-image" src={src} alt={`${item.marka} ${item.model}`} loading="lazy" />
                                        ))}
                                    </div>

                                    <div className={`mob-catalog__slider mob-catalog__items-picture${item.isClubService ? " club_service_img" : ""}`}>
                                        {(item.pictures?.length ? item.pictures : ["/local/img/no-photo.png"]).slice(0, 5).map((src, i) => (
                                            <div key={`${item.id}-mb-${i}`} className="catalog__items-picture-image-wrapper">
                                                <img className="catalog__items-picture-image" src={src} alt={`${item.marka} ${item.model}`} loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                </a>

                                {/* content */}
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
                                                <path d="M2.1023 2.57803C2.21412 2.47556 2.37666 2.45054 2.51413 2.51464L10.0053 6.00783C10.1412 6.07121 10.2263 6.20945 10.2217 6.35934C10.217 6.50922 10.1235 6.64192 9.98393 6.69674L6.96348 7.88306L5.51842 10.7886C5.45164 10.9229 5.3113 11.0045 5.16158 10.996C5.01186 10.9876 4.88155 10.8908 4.83027 10.7499L2.00326 2.98277C1.95139 2.84024 1.99047 2.6805 2.1023 2.57803ZM3.01767 3.57698L5.2361 9.67206L6.35624 7.41981C6.39762 7.3366 6.46842 7.27173 6.55492 7.23776L8.89622 6.31818L3.01767 3.57698Z" fill="#E23737" style={{ fill: "#E23737", stroke: "none" }} />
                                            </svg>
                                            <p>{item.location}</p>
                                        </div>
                                    ) : null}

                                    <div className="catalog__items-tab">
                                        {item.year ? <div className="catalog__items-tab-item">{item.year} г.</div> : null}
                                        {item.power ? <div className="catalog__items-tab-item">{item.power} л.с.</div> : null}
                                        {item.mileage ? <div className="catalog__items-tab-item">{item.mileage} км</div> : null}
                                        {item.driveUnit ? <div className="catalog__items-tab-item">{item.driveUnit} привод</div> : null}
                                        {item.boxCar ? <div className="catalog__items-tab-item">{item.boxCar}</div> : null}
                                    </div>

                                    <div
                                        className="catalog__items-block-btn link_btn link_btn__light"
                                        data-usr={String(item.managerPhoneOrId ?? "mock")}
                                        data-phones={btoa((item.phones ?? []).join(","))}
                                        data-name={item.userName ?? ""}
                                        data-title={item.userTimeJob ?? ""}
                                    >
                                        Связаться
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* === NAV_STRING аналог: кнопка “Показать ещё” === */}
                    {hasMore ? (
                        <div
                            className="load_more"
                            data-url={`/catalog/?PAGEN_1=${nextPage}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onLoadMore();
                            }}
                            role="button"
                            tabIndex={0}
                            style={{ cursor: "pointer" }}
                        >
                            {loading ? "Загрузка..." : "Показать ещё"}
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
}