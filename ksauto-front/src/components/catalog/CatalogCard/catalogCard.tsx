'use client';
import { ContactButton } from "@/components/catalog/ContactButton/ContactButton";
import { useState, useEffect } from "react";
import "./catalogCard.css";
import { CardImagesSlider } from "./CardImagesSlider";
import { CardImagesSliderMobile } from "./CardImagesSliderMobile";

interface CatalogCardProps {
  item: {
    id: number | string;
    detailUrl: string;
    marka: string;
    model: string;
    price: number;
    pictures?: string[];
    location?: string | null;
    year: number | string;
    power: number | string;
    mileage: number | string;
    driveUnit: string;
    boxCar: string;
    phone_number?: string | null;
    saler_name?: string | null;
    time_job?: string | null;
    created_by: number | string;
    isClubService?: boolean;
    isPremium?: boolean;
    clubServiceText?: string | null;
  };
}

export function CatalogCard({ item }: CatalogCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1150); // если ширина экрана меньше 1150px
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile); // обновляем состояние при изменении размера окна

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const BASE_URL = "https://dev.ks-auto.ru";

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
          setFav((v) => !v);
        }}
        role="button"
      />

      <div className="catalog__items-link">
        <div className="catalog-sticker-list">
          {item.isPremium && (
            <div className="catalog__items-adcheck">
              <img src="/img/crown.svg" alt="crown" />
            </div>
          )}
          {item.clubServiceText && (
            <p className="sale_list__check catalog__items-check">
              {item.clubServiceText}
            </p>
          )}
        </div>

        <a href={item.detailUrl}>
          <div className="catalog__items-picture">
            {isMobile ? (
              <CardImagesSliderMobile pictures={pictures} baseUrl={BASE_URL} alt={`${item.marka} ${item.model}`} />
            ) : (
              <CardImagesSlider
                pictures={pictures}
                baseUrl={BASE_URL}
                alt={`${item.marka} ${item.model}`}
              />
            )}
          </div>
        </a>

        <div className={`catalog__items-block ${item.isPremium ? "catalog__premium-bg" : ""}`}>
          <a href={item.detailUrl} className="catalog__items-block-title">
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
            <div className="catalog__items-tab-item">{item.year} г.</div>
            <div className="catalog__items-tab-item">{item.power} л.с.</div>
            <div className="catalog__items-tab-item">{item.mileage} км</div>
            <div className="catalog__items-tab-item">{item.driveUnit} привод</div>
            <div className="catalog__items-tab-item">{item.boxCar}</div>
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