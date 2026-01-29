"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
    pictures: string[];
    alt: string;
    baseUrl?: string;
};

export function CardImagesSliderMobile({ pictures, alt, baseUrl = "" }: Props) {
    return (
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={10}
            allowTouchMove={true}
            speed={180}
            pagination={{
                clickable: true,
                el: '.swiper-pagination', // Указываем кастомный элемент для пагинации
            }}
        >
            {pictures.map((src, idx) => (
                <SwiperSlide key={`${src}-${idx}`} className="swiper-slide">
                    <div className="image-container">
                        <img
                            className="catalog__items-picture-image"
                            src={`${baseUrl}${src}`}
                            alt={alt}
                            loading="lazy"
                            draggable={false}
                        />
                    </div>
                </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div> {/* Пагинация внутри контейнера */}
        </Swiper>
    );
}