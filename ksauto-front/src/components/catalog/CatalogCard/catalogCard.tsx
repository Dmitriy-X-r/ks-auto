import { ContactButton } from "@/components/catalog/ContactButton/ContactButton";
import {useState} from "react";

interface CatalogCardProps {
    item: {
        id: number | string;
        detailUrl: string;
        marka: string;
        model: string;
        price: number;
        pictures?: string[];
        location?: string;
        year: number | string;
        power: number | string;
        mileage: number | string;
        driveUnit: string;
        boxCar: string;
        phone_number?: string;
        saler_name?: string;
        time_job?: string;
        created_by: number | string;
        isClubService?: boolean;
    };
}

export function CatalogCard({ item }: CatalogCardProps) {
    const [isFav, setFav] = useState(false);
    const pictures = item.pictures?.length
        ? item.pictures
        : ["/local/img/no-photo.png"];

    return (
        <div className="catalog__items">
            <div
                className={`catalog__items-fav ${isFav ? "active" : ""}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setFav(v => !v);
                }}
                role="button"
            />

            <div className="catalog__items-link">
                {/* Стикеры */}
                <div className="catalog-sticker-list">
                    {item.isClubService && (
                        <p className="sale_list__check catalog__items-check">
                            Клубный сервис
                        </p>
                    )}
                </div>

                <a href={item.detailUrl}>
                    {/* ПК */}
                    <div className="pc-catalog__slider catalog__items-picture">
                        {pictures.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                className="catalog__items-picture-image"
                                alt={`${item.marka} ${item.model}`}
                                loading="lazy"
                            />
                        ))}
                    </div>

                    {/* Мобилка */}
                    <div className="mob-catalog__slider mob-catalog__items-picture">
                        {pictures.map((src, idx) => (
                            <div
                                key={idx}
                                className="catalog__items-picture-image-wrapper"
                            >
                                <img
                                    src={src}
                                    className="catalog__items-picture-image"
                                    alt={`${item.marka} ${item.model}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </a>

                <div className="catalog__items-block">
                    <a
                        href={item.detailUrl}
                        className="catalog__items-block-title"
                    >
                        <h3 className="third-title catalog__items-title">
                            {item.marka} {item.model}
                        </h3>

                        <div className="catalog__items-price-wrapper">
                            <p className="catalog__items-price">
                                {item.price.toLocaleString()} ₽
                            </p>
                        </div>
                    </a>

                    {item.location && (
                        <div className="catalog__items-location">
                            <p>{item.location}</p>
                        </div>
                    )}

                    <div className="catalog__items-tab">
                        <div className="catalog__items-tab-item">
                            {item.year} г.
                        </div>
                        <div className="catalog__items-tab-item">
                            {item.power} л.с.
                        </div>
                        <div className="catalog__items-tab-item">
                            {item.mileage} км
                        </div>
                        <div className="catalog__items-tab-item">
                            {item.driveUnit} привод
                        </div>
                        <div className="catalog__items-tab-item">
                            {item.boxCar}
                        </div>
                    </div>

                    <ContactButton
                        userId={item.created_by}
                        phone={item.phone_number || null}
                        name={item.saler_name}
                        time={item.time_job}
                    />
                </div>
            </div>
        </div>
    );
}
