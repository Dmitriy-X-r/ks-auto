"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import "swiper/css";

type Props = {
  pictures: string[];
  alt: string;
  baseUrl?: string;
};

export function CardImagesSlider({ pictures, alt, baseUrl = "" }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  const lastXRef = useRef<number | null>(null);
  const accRef = useRef(0);          // накопленная дельта
  const lastMoveAtRef = useRef(0);   // анти-дребезг

  // чувствительность: сколько пикселей нужно, чтобы сдвинуть на 1 слайд
  const PX_PER_SLIDE = 25;           // 12–25 обычно норм
  const MIN_INTERVAL = 150;           // мс, чтобы не молотило слишком часто

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const x = e.clientX;

    // первая точка — просто запоминаем
    if (lastXRef.current === null) {
      lastXRef.current = x;
      return;
    }

    const dx = x - lastXRef.current;
    lastXRef.current = x;

    // мелкий шум игнорим (дрожание руки)
    if (Math.abs(dx) < 1) return;

    accRef.current += dx;

    const now = Date.now();
    if (now - lastMoveAtRef.current < MIN_INTERVAL) return;

    // если накопили достаточно пикселей — листаем
    while (accRef.current >= PX_PER_SLIDE) {
      swiper.slideNext();
      accRef.current -= PX_PER_SLIDE;
      lastMoveAtRef.current = now;
    }

    while (accRef.current <= -PX_PER_SLIDE) {
      swiper.slidePrev();
      accRef.current += PX_PER_SLIDE;
      lastMoveAtRef.current = now;
    }
  }

  function handleMouseLeave() {
    lastXRef.current = null;
    accRef.current = 0;
  }

  return (
    <div
      className="card-images-slider"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      <Swiper
        modules={[A11y]}
        slidesPerView={1}
        allowTouchMove={false}
        speed={180}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {pictures.map((src, idx) => (
          <SwiperSlide key={`${src}-${idx}`}>
            <img
              className="catalog__items-picture-image"
              src={`${baseUrl}${src}`}
              alt={alt}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
