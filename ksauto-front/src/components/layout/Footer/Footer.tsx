"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import './Footer.css';

export default function Footer() {
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShowArrow(window.scrollY > 300);
        };
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="big_wrapper-footer">
                <div className="new-container">
                    <footer>
                        <div className="footer">
                            {/* LEFT */}
                            <div className="footer-block__first">
                                <div className="footer-block___logo">
                                    <Link href="/" className="header-menu__logo">
                                        <img
                                            src="/local/templates/new/img/logo.svg"
                                            alt="КС АВТО"
                                            className="header-menu__logo"
                                        />
                                    </Link>
                                </div>

                                <div className="footer-block__policy">
                                    <Link href="/oferta/" className="footer-block__policy-text">
                                        Пользовательское соглашение
                                    </Link>
                                    <Link href="/policy/" className="footer-block__policy-text">
                                        Политика конфиденциальности
                                    </Link>
                                    <Link href="/advertisement/" className="footer-block__policy-text">
                                        Разместить рекламу
                                    </Link>
                                    <Link href="/autocredit/" className="footer-block__policy-text">
                                        Автокредитование
                                    </Link>
                                </div>
                            </div>

                            {/* CENTER */}
                            <div className="footer-block__third">
                                <Link
                                    href="/catalog/"
                                    className="link_btn link_btn__light link_btn__light_footer"
                                >
                                    В каталог
                                </Link>

                                <a
                                    href="https://www.rustore.ru/catalog/app/ru.ksauto.app"
                                    className="footer-app"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img
                                        src="/local/templates/new/img/app-icon2.svg"
                                        alt="КС авто приложение"
                                    />
                                    <span>Мобильное приложение</span>
                                </a>
                            </div>

                            {/* RIGHT */}
                            <div className="footer-block__fourth">
                                <h2 className="second-title footer-contact-title">
                                    Связь с нами
                                </h2>

                                <a
                                    href="tel:+74951299222"
                                    className="footer-block__phone"
                                >
                                    <img
                                        src="/local/templates/new/img/phone.svg"
                                        alt=""
                                    />
                                    +7 (495) 129-92-22
                                </a>

                                <a
                                    href="https://t.me/clubserv_support"
                                    className="link_btn link_btn__dark footer-support-button"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>Тех. поддержка</span>
                                </a>
                            </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="footer-copi">
                            <div className="footer-block__cop">
                                {/* === pay_systems.php (1:1) === */}
                                <div className="pay_systems">
                                    <img src="/img/pay_system/mir.png" alt="" />
                                    <img src="/img/pay_system/master_card.png" alt="" />
                                    <img src="/img/pay_system/visa.png" alt="" />
                                </div>

                                <p className="footer-block__cop-text footer-block__info">
                                    Сайт предоставляет исключительно информационные услуги
                                </p>
                                <p className="footer-block__cop-text footer-block__info">
                                    Клубный сервис © {new Date().getFullYear()}
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Стрелка наверх */}
            <div
                className="arrow-up show"
                id="arrow-up"
                onClick={scrollToTop}
                role="button"
                tabIndex={0}
                style={{ display: showArrow ? undefined : "none" }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") scrollToTop();
                }}
                aria-label="Наверх"
                title="Наверх"
            >
                <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1L9 9L1 17"
                        stroke="#353433"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </>
    );
}