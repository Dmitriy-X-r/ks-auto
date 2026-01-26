"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {  A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  pictures: string[];
  alt: string;
  baseUrl?: string; // чтобы правильно собрать https://dev.ks-auto.ru + /upload/...
};

export function CardImagesSlider({ pictures, alt, baseUrl = "" }: Props) {
  return (
    <div
      className="card-images-slider"
      // важно: чтобы клик по стрелкам/дотам не триггерил наружные обработчики
      onClick={(e) => e.stopPropagation()}
    >
      <Swiper
        modules={[  A11y]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        // ключевые опции для вложенного слайдера:
        nested={true}
        watchSlidesProgress={true}
        // чтобы тач/свайп не улетал во внешний Swiper
        touchStartPreventDefault={false}
        preventClicks={true}
        preventClicksPropagation={true}
      >
        {pictures.map((src, idx) => (
          <SwiperSlide key={`${src}-${idx}`}>
            <img
              className="catalog__items-picture-image"
              src={`${baseUrl}${src}`}
              alt={alt}
              loading="lazy"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}