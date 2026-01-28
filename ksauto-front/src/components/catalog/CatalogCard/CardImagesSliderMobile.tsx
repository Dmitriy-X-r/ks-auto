"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
    pictures: string[];
    alt: string;
    baseUrl?: string;
};

export function CardImagesSliderMobile({ pictures, alt, baseUrl = "" }: Props) {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={10}
            allowTouchMove={true}
            speed={180}
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
    );
}