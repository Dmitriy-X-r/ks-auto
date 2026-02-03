'use client';
import { ContactButton } from "@/components/catalog/ContactButton/ContactButton";
import { useState, useEffect } from "react";
import "./catalogCard.css";
import { CardImagesSlider } from "./CardImagesSlider";
import { CardImagesSliderMobile } from "./CardImagesSliderMobile";
import {FavoriteButton} from "@/components/utils/favorite/FavoriteButton/FavoriteButton";


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
      setIsMobile(window.innerWidth <= 1150);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

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
        className="catalog__items-fav">
        <FavoriteButton itemId={item.id} />
      </div>

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
              {item.isPremium ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.1023 2.57803C2.21412 2.47556 2.37666 2.45054 2.51413 2.51464L10.0053 6.00783C10.1412 6.07121 10.2263 6.20945 10.2217 6.35934C10.217 6.50922 10.1235 6.64192 9.98393 6.69674L6.96348 7.88306L5.51842 10.7886C5.45164 10.9229 5.3113 11.0045 5.16158 10.996C5.01186 10.9876 4.88155 10.8908 4.83027 10.7499L2.00326 2.98277C1.95139 2.84024 1.99047 2.6805 2.1023 2.57803ZM3.01767 3.57698L5.2361 9.67206L6.35624 7.41981C6.39762 7.3366 6.46842 7.27173 6.55492 7.23776L8.89622 6.31818L3.01767 3.57698Z" fill="#E23737"></path>
                  </svg>
              ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.1023 2.57803C2.21412 2.47556 2.37666 2.45054 2.51413 2.51464L10.0053 6.00783C10.1412 6.07121 10.2263 6.20945 10.2217 6.35934C10.217 6.50922 10.1235 6.64192 9.98393 6.69674L6.96348 7.88306L5.51842 10.7886C5.45164 10.9229 5.3113 11.0045 5.16158 10.996C5.01186 10.9876 4.88155 10.8908 4.83027 10.7499L2.00326 2.98277C1.95139 2.84024 1.99047 2.6805 2.1023 2.57803ZM3.01767 3.57698L5.2361 9.67206L6.35624 7.41981C6.39762 7.3366 6.46842 7.27173 6.55492 7.23776L8.89622 6.31818L3.01767 3.57698Z" fill="#E23737" style={{fill: "#E23737", stroke: "none" }}></path>
                  </svg>
              )}
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