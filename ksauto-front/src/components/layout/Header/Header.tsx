"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type MenuItem = { href: string; label: string };

type CatalogChild = { href: string; label: string; picture?: string };
type CatalogItem = {
    id: string;
    href?: string; // у пункта без детей может быть ссылка
    label: string;
    picture?: string; // иконка сверху
    hidden?: boolean;
    isBigImg?: boolean;
    childsTitle?: string;
    childs?: CatalogChild[];
};

export default function Header() {
    const [isBurgerOpen, setBurgerOpen] = useState(false);
    const [isBurgerAccountMenu, setBurgerAccountMenu] = useState(false); // имитация состояния "меню аккаунта" внутри бургера
    const [isGeoOpen, setGeoOpen] = useState(false);
    const [isGeoMobOpen, setGeoMobOpen] = useState(false);

    // поиск как модалка
    const [isSearchOpen, setSearchOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const [isAddOfferOpen, setAddOfferOpen] = useState(false);
    const [isScrolled, setScrolled] = useState(false);

    // dropdown catalogs state (как active class в script.js)
    const [activeCatalogId, setActiveCatalogId] = useState<string | null>(null);

    // refs for click-outside on catalogs (<=1000)
    const catalogsPcRef = useRef<HTMLDivElement | null>(null);
    const catalogsMobRef = useRef<HTMLDivElement | null>(null);

    // СТАТИКА: верхнее меню (как bitrix:menu heder_left)
    const topMenu: MenuItem[] = useMemo(
        () => [
            { href: "/shares/", label: "Новости" },
            { href: "/trade-in/", label: "Trade-in" },
            { href: "/autocredit/", label: "Дисконтные карты" },
            { href: "/repair/", label: "Допоборудование и сервис" },
            { href: "/company/", label: "О компании" },
            { href: "/contacts/", label: "Контакты" },
            { href: "/contacts/", label: "Акции портала" },
        ],
        []
    );

    // СТАТИКА: меню в бургере (как bitrix:menu header-burger-menu)
    const burgerMenu: MenuItem[] = useMemo(
        () => [
            { href: "/catalog/", label: "Каталог авто" },
            { href: "/moto/", label: "Мото" },
            { href: "/spec/", label: "Спецтехника" },
            { href: "/news/", label: "Новости" },
            { href: "/shares/", label: "Акции" },
            { href: "/trade-in/", label: "Trade-in" },
            { href: "/autocredit/", label: "Автокредит" },
            { href: "/repair/", label: "Сервис" },
            { href: "/company/", label: "О компании" },
            { href: "/contacts/", label: "Контакты" },
        ],
        []
    );

    /**
     * Это аналог $arResult для header-catalog.
     */
    const catalogsData: CatalogItem[] = useMemo(
        () => [
            {
                id: "cars",
                label: "Автомобили",
                href: "/catalog/",
                picture: "/local/templates/new/img/icon/auto.svg",
            },
            {
                id: "com",
                label: "Ком.транспорт",
                href: "/com/", // <-- добавил, чтобы можно было кликнуть в "Разместить объявление"
                picture: "/local/templates/new/img/headerCatalog/komunal.png",
                childsTitle: "Коммерческий транспорт",
                childs: [
                    { href: "/com/light/", label: "Легкие коммерческие", picture: "/local/templates/new/img/headerCatalog/lightCommerc.png" },
                    { href: "/com/trucks/", label: "Грузовики", picture: "/local/templates/new/img/headerCatalog/gruz.png" },
                    { href: "/com/tractors/", label: "Седельные тягачи", picture: "/local/templates/new/img/headerCatalog/tigach.png" },
                ],
            },
            {
                id: "moto",
                label: "Мототехника",
                href: "/moto/", // <-- добавил
                picture: "/local/templates/new/img/headerCatalog/moto.png",
                childsTitle: "Мототехника",
                childs: [
                    { href: "/moto/motorcycles/", label: "Мотоциклы", picture: "/local/templates/new/img/headerCatalog/moto.png/" },
                    { href: "/moto/scooters/", label: "Скутеры", picture: "/local/templates/new/img/headerCatalog/skut.png/" },
                    { href: "/moto/atv/", label: "Вездеходы", picture: "/local/templates/new/img/headerCatalog/vezdehod.png/" },
                    { href: "/moto/snowmobiles/", label: "Снегоходы", picture: "/local/templates/new/img/headerCatalog/snegohod.png/" },
                ],
            },
            {
                id: "spec",
                label: "Спец.техника",
                href: "/spec/", // <-- добавил
                picture: "/local/templates/new/img/headerCatalog/tigach.png",
                childsTitle: "Спецтехника",
                childs: [
                    { href: "/spec/buses/", label: "Автобусы", picture: "/local/templates/new/img/headerCatalog/spec/bus.png" },
                    { href: "/spec/cranes/", label: "Автокраны", picture: "/local/templates/new/img/headerCatalog/spec/autokran.png" },
                    { href: "/spec/bulldozers/", label: "Бульдозеры", picture: "/local/templates/new/img/headerCatalog/spec/buldozer.png" },
                    { href: "/spec/utility/", label: "Коммунальная", picture: "/local/templates/new/img/headerCatalog/komunal.png" },
                    { href: "/spec/loaders/", label: "Погрузчики", picture: "/local/templates/new/img/headerCatalog/spec/pogruz.png" },
                    { href: "/spec/trailers/", label: "Прицепы и полуприцепы", picture: "/local/templates/new/img/headerCatalog/spec/pricep.png" },
                    { href: "/spec/agro/", label: "Сельскохозяйственная", picture: "/local/templates/new/img/headerCatalog/spec/selsk.png" },
                    { href: "/spec/road/", label: "Строительная и дорожная", picture: "/local/templates/new/img/headerCatalog/spec/stroit.png" },
                    { href: "/spec/bodies/", label: "Съемные кузова", picture: "/local/templates/new/img/headerCatalog/spec/siem.png" },
                    { href: "/spec/excavators/", label: "Экскаваторы", picture: "/local/templates/new/img/headerCatalog/spec/excavator.png" },
                ],
            },
        ],
        []
    );

    // helpers — повторяем script.js
    const isMobile = () => window.innerWidth <= 600;
    const isTabletOrLess = () => window.innerWidth <= 1000;

    const closeCatalogMobileOverlay = () => {
        setActiveCatalogId(null);
        document.body.classList.remove("scroll-no");
    };

    const toggleCatalog = (id: string) => {
        setActiveCatalogId((prev) => {
            const next = prev === id ? null : id;

            // body scroll-no только для моб-оверлея (<=600), как в script.js
            if (isMobile()) {
                if (next) document.body.classList.add("scroll-no");
                else document.body.classList.remove("scroll-no");
            } else {
                document.body.classList.remove("scroll-no");
            }

            return next;
        });
    };

    // scroll header shadow
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // глобальный scroll lock (бургер/гео/добавить/поиск) + не ломаем моб-оверлей каталога
    useEffect(() => {
        const needLock = isBurgerOpen || isGeoOpen || isGeoMobOpen || isAddOfferOpen || isSearchOpen;
        if (needLock) {
            document.body.classList.add("scroll-no");
        } else {
            // НЕ снимаем, если открыт моб-оверлей каталога (<=600)
            if (!isMobile() || !activeCatalogId) {
                document.body.classList.remove("scroll-no");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBurgerOpen, isGeoOpen, isGeoMobOpen, isAddOfferOpen, isSearchOpen]);

    // при ресайзе — если ушли с мобилки, снимаем scroll-no от каталога
    useEffect(() => {
        const onResize = () => {
            if (!isMobile()) {
                document.body.classList.remove("scroll-no");
            }
        };

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // click-outside для каталога при <=1000
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!isTabletOrLess()) return;
            if (!activeCatalogId) return;

            const target = e.target as Node;

            const inPc = catalogsPcRef.current?.contains(target);
            const inMob = catalogsMobRef.current?.contains(target);

            if (!inPc && !inMob) {
                if (isMobile()) closeCatalogMobileOverlay();
                else setActiveCatalogId(null);
            }
        };

        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, [activeCatalogId]);

    // Поиск: фокус на инпут, закрытие по Esc
    useEffect(() => {
        if (!isSearchOpen) return;

        // фокус
        setTimeout(() => searchInputRef.current?.focus(), 0);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSearchOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isSearchOpen]);

    const headerClass = `header${isScrolled ? " scroll" : ""}`;

    // для попапа "Разместить объявление" берём только главные пункты (без раскрытий)
    const addOfferItems = useMemo(() => {
        return catalogsData
            .filter((x) => !x.hidden)
            .map((x) => ({
                id: x.id,
                href: x.href || "#",
                label: x.label,
                picture: x.picture,
            }));
    }, [catalogsData]);

    return (
        <>
            <header className={headerClass}>
                {/* TOP */}
                <div className="header-top">
                    <div className="new-container">
                        {/* GEO desktop */}
                        <div className="header-geo" onClick={() => setGeoOpen(true)} role="button" tabIndex={0}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.803066 0.437536C0.952166 0.30091 1.16889 0.267554 1.35217 0.35302L11.3404 5.01061C11.5216 5.0951 11.6351 5.27943 11.6289 5.47928C11.6227 5.67912 11.498 5.85606 11.3119 5.92915L7.28464 7.51091L5.35789 11.385C5.26885 11.564 5.08173 11.6728 4.8821 11.6616C4.68248 11.6503 4.50874 11.5212 4.44036 11.3334L0.671015 0.977184C0.601848 0.787149 0.653966 0.574161 0.803066 0.437536ZM2.02356 1.76947L4.98147 9.89625L6.47499 6.89324C6.53016 6.7823 6.62456 6.6958 6.73989 6.65051L9.86162 5.42441L2.02356 1.76947Z"
                                    fill="white"
                                />
                            </svg>
                            <p>Любой город</p>
                        </div>

                        {/* top menu */}
                        <ul className="menu header__menu">
                            {topMenu.map((item, idx) => (
                                <li key={`${item.href}-${idx}`}>
                                    <Link className="menu__item" href={item.href}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* contact */}
                        <div className="header-contact">
                            <a href="tel:+74951299222">+7 (495) 129-92-22</a>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="header-bottom">
                    <div className="new-container">
                        {/* burger */}
                        <div className="header-burger" onClick={() => setBurgerOpen(true)} role="button" tabIndex={0}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.125 12.25C8.77982 12.25 8.5 12.5298 8.5 12.875C8.5 13.2202 8.77982 13.5 9.125 13.5H22.875C23.2202 13.5 23.5 13.2202 23.5 12.875C23.5 12.5298 23.2202 12.25 22.875 12.25H9.125ZM9.125 18.5C8.77982 18.5 8.5 18.7798 8.5 19.125C8.5 19.4702 8.77982 19.75 9.125 19.75H22.875C23.2202 19.75 23.5 19.4702 23.5 19.125C23.5 18.7798 23.2202 18.5 22.875 18.5H9.125Z"
                                    fill="#353433"
                                />
                            </svg>
                        </div>

                        {/* burger drawer */}
                        <div className={`header-burger-wrapper${isBurgerOpen ? " show" : ""}${isBurgerAccountMenu ? " menu-show" : ""}`}>
                            <div className="header-burger-top">
                                {/* not auth */}
                                <Link href="/auth/" className="header-account header-menu__top-auth" onClick={() => setBurgerOpen(false)}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.5 6.25C12.5 4.86929 11.3807 3.75 10 3.75C8.61929 3.75 7.5 4.86929 7.5 6.25C7.5 7.63071 8.61929 8.75 10 8.75C11.3807 8.75 12.5 7.63071 12.5 6.25ZM13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92893 10 6.25 8.32107 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25ZM3.75 15.9375C3.75 16.1101 3.88991 16.25 4.06249 16.25H15.9375C16.1101 16.25 16.25 16.1101 16.25 15.9375C16.25 15.2296 15.7874 14.3996 14.6408 13.6829C13.5118 12.9773 11.8743 12.5 10 12.5C8.12572 12.5 6.48821 12.9773 5.3592 13.6829C4.21256 14.3996 3.75 15.2296 3.75 15.9375ZM2.5 15.9375C2.5 13.3487 5.85786 11.25 10 11.25C14.1421 11.25 17.5 13.3487 17.5 15.9375C17.5 16.8004 16.8004 17.5 15.9375 17.5H4.06249C3.19955 17.5 2.5 16.8004 2.5 15.9375Z"
                                            fill="#AAA6A1"
                                        />
                                    </svg>
                                    <span>Войти</span>
                                </Link>

                                <div className="header-burger-top-buttons">
                                    <div className="header-burger-close" onClick={() => setBurgerOpen(false)} role="button" tabIndex={0}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.68306 8.68306C8.92714 8.43898 9.32286 8.43898 9.56694 8.68306L16 15.1161L22.4331 8.68306C22.6771 8.43898 23.0729 8.43898 23.3169 8.68306C23.561 8.92714 23.561 9.32286 23.3169 9.56694L16.8839 16L23.3169 22.4331C23.561 22.6771 23.561 23.0729 23.3169 23.3169C23.0729 23.561 22.6771 23.561 22.4331 23.3169L16 16.8839L9.56694 23.3169C9.32286 23.561 8.92714 23.561 8.68306 23.3169C8.43898 23.0729 8.43898 22.6771 8.68306 22.4331L15.1161 16L8.68306 9.56694C8.43898 9.32286 8.43898 8.92714 8.68306 8.68306Z"
                                                fill="#353433"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* geo mobile trigger */}
                            <div className="header-burger-geo" onClick={() => setGeoMobOpen(true)} role="button" tabIndex={0}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0.803066 0.437536C0.952166 0.30091 1.16889 0.267554 1.35217 0.35302L11.3404 5.01061C11.5216 5.0951 11.6351 5.27943 11.6289 5.47928C11.6227 5.67912 11.498 5.85606 11.3119 5.92915L7.28464 7.51091L5.35789 11.385C5.26885 11.564 5.08173 11.6728 4.8821 11.6616C4.68248 11.6503 4.50874 11.5212 4.44036 11.3334L0.671015 0.977184C0.601848 0.787149 0.653966 0.574161 0.803066 0.437536ZM2.02356 1.76947L4.98147 9.89625L6.47499 6.89324C6.53016 6.7823 6.62456 6.6958 6.73989 6.65051L9.86162 5.42441L2.02356 1.76947Z"
                                        fill="#E23737"
                                    />
                                </svg>
                                <p>Любой город</p>
                            </div>

                            {/* "поиск" внутри бургера — статикой */}
                            <div className="header-search-and-filter">
                                <div className="header-search-wrapper" style={{ width: "100%" }}>
                                    <input
                                        className="bx-form-control"
                                        placeholder="Поиск по объявлениям"
                                        style={{
                                            width: "100%",
                                            background: "#EEEDEC",
                                            borderRadius: 10,
                                            border: "none",
                                            padding: "10px 12px",
                                            fontSize: 17,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* add offer */}
                            <div className="header-add">
                                <div className="link_btn link_btn__dark ads-link__btn ads-link__btn add-offer" onClick={() => setAddOfferOpen(true)}>
                                    <span>Разместить объявление</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.625 4.375C10.625 4.02982 10.3452 3.75 10 3.75C9.65482 3.75 9.375 4.02982 9.375 4.375V9.375H4.375C4.02982 9.375 3.75 9.65482 3.75 10C3.75 10.3452 4.02982 10.625 4.375 10.625H9.375V15.625C9.375 15.9702 9.65482 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V10.625H15.625C15.9702 10.625 16.25 10.3452 16.25 10C16.25 9.65482 15.9702 9.375 15.625 9.375H10.625V4.375Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* burger menu */}
                            <div className="header-burger-menu">
                                <ul className="menu header__menu">
                                    {burgerMenu.map((item) => (
                                        <li key={item.href} className="header-burger-menu-item">
                                            <Link className="menu__item-sub menu__item" href={item.href} onClick={() => setBurgerOpen(false)}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a href="https://t.me/clubserv_support" className="link_btn link_btn__light header-support-button">
                                <span>Тех. поддержка</span>
                            </a>

                            <div className="header-burger-contact">
                                <a href="tel:+74951299222" className="header-burger-contact-red">
                                    <img src="/local/templates/new/img/phone.svg" alt="" />
                                </a>
                                <a href="https://wa.me/+79773986474">
                                    <img src="/local/templates/new/img/whatsapp-red.svg" alt="" />
                                </a>
                            </div>

                            <a href="https://www.rustore.ru/catalog/app/ru.ksauto.app" className="header-burger-app">
                                <img src="/img/app-icon.svg" alt="" />
                                <div>
                                    <p className="header-burger-app-title">КС Авто</p>
                                    <p className="header-burger-app-subtitle">Скачать приложение</p>
                                </div>
                            </a>
                        </div>

                        {/* logo */}
                        <Link href="/" className="logo">
                            <img src="/local/templates/new/img/logo.svg" alt="КС АВТО" />
                        </Link>

                        {/* search icon (открывает модалку) */}
                        <div className="header-search-icon" onClick={() => setSearchOpen(true)} role="button" tabIndex={0}>
                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20.2046 15.25C20.2046 12.4886 17.966 10.25 15.2046 10.25C12.4432 10.25 10.2046 12.4886 10.2046 15.25C10.2046 18.0114 12.4432 20.25 15.2046 20.25C17.966 20.25 20.2046 18.0114 20.2046 15.25ZM18.9114 20.2826C17.8743 21.0478 16.5923 21.5 15.2046 21.5C11.7528 21.5 8.95459 18.7018 8.95459 15.25C8.95459 11.7982 11.7528 9 15.2046 9C18.6564 9 21.4546 11.7982 21.4546 15.25C21.4546 16.6377 21.0023 17.9197 20.2372 18.9568L23.68 22.3996C24.0461 22.7657 24.0461 23.3593 23.68 23.7254C23.3139 24.0915 22.7203 24.0915 22.3542 23.7254L18.9114 20.2826Z"
                                    fill="#353433"
                                />
                            </svg>
                        </div>

                        {/* =========================
                            CATALOGS (как в Bitrix)
                           ========================= */}
                        <div className="catalogs-header-container catalogs-header-container-pc" ref={catalogsPcRef}>
                            <div className="catalogs-header-wrapper">
                                <div className="catalogs-header-list">
                                    {catalogsData
                                        .filter((el) => !el.hidden)
                                        .map((el) => {
                                            const hasChilds = !!el.childs?.length;
                                            const isActive = activeCatalogId === el.id;

                                            return (
                                                <div
                                                    key={el.id}
                                                    className={`catalogs-header-item-wrapper${isActive ? " active" : ""}`}
                                                    data-id={el.id}
                                                    {...(hasChilds ? ({ "data-has-childs": true } as any) : {})}
                                                    onClick={(e) => {
                                                        if (!hasChilds) return;
                                                        if (!isTabletOrLess()) return;

                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        toggleCatalog(el.id);
                                                    }}
                                                >
                                                    <a href={!hasChilds ? el.href : undefined} className="catalogs-header-item">
                                                        {el.picture ? <img src={el.picture} alt={el.label} /> : null}
                                                        <span>
                                                            {el.label}
                                                            {hasChilds ? (
                                                                <svg className="catalogs-header-item-arrow" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5.73484 4.35983C5.88128 4.21339 6.11872 4.21339 6.26516 4.35983L9.64017 7.73484C9.78661 7.88128 9.78661 8.11872 9.64017 8.26516C9.49372 8.41161 9.25628 8.41161 9.10983 8.26516L6 5.15533L2.89017 8.26516C2.74372 8.41161 2.50628 8.41161 2.35983 8.26516C2.21339 8.11872 2.21339 7.88128 2.35983 7.73484L5.73484 4.35983Z" />
                                                                </svg>
                                                            ) : null}
                                                        </span>
                                                    </a>

                                                    {hasChilds ? (
                                                        <div className="catalog-header-childs-wrapper">
                                                            <div className="catalog-header-childs-container">
                                                                {(el.childs || []).map((child) => (
                                                                    <a
                                                                        key={child.href}
                                                                        href={child.href}
                                                                        className="catalog-header-child"
                                                                        onClick={() => {
                                                                            setActiveCatalogId(null);
                                                                        }}
                                                                    >
                                                                        <div className="catalog-header-child-img-wrapper">
                                                                            {child.picture ? (
                                                                                <img src={child.picture} alt="" className={el.isBigImg ? "catalog-header-child-bi" : ""} />
                                                                            ) : null}
                                                                        </div>
                                                                        {child.label}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>

                        {/* login desktop (статично not auth) */}
                        <Link href="/auth/" className="header-account header-account-not-auth">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5 6.25C12.5 4.86929 11.3807 3.75 10 3.75C8.61929 3.75 7.5 4.86929 7.5 6.25C7.5 7.63071 8.61929 8.75 10 8.75C11.3807 8.75 12.5 7.63071 12.5 6.25ZM13.75 6.25C13.75 8.32107 12.0711 10 10 10C7.92893 10 6.25 8.32107 6.25 6.25C6.25 4.17893 7.92893 2.5 10 2.5C12.0711 2.5 13.75 4.17893 13.75 6.25ZM3.75 15.9375C3.75 16.1101 3.88991 16.25 4.06249 16.25H15.9375C16.1101 16.25 16.25 16.1101 16.25 15.9375C16.25 15.2296 15.7874 14.3996 14.6408 13.6829C13.5118 12.9773 11.8743 12.5 10 12.5C8.12572 12.5 6.48821 12.9773 5.3592 13.6829C4.21256 14.3996 3.75 15.2296 3.75 15.9375Z"
                                    fill="#AAA6A1"
                                />
                            </svg>
                            <span>Войти</span>
                        </Link>

                        {/* add offer desktop */}
                        <div className="header-add">
                            <div className="link_btn link_btn__dark ads-link__btn ads-link__btn add-offer" onClick={() => setAddOfferOpen(true)}>
                                <span>Разместить объявление</span>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.625 4.375C10.625 4.02982 10.3452 3.75 10 3.75C9.65482 3.75 9.375 4.02982 9.375 4.375V9.375H4.375C4.02982 9.375 3.75 9.65482 3.75 10C3.75 10.3452 4.02982 10.625 4.375 10.625H9.375V15.625C9.375 15.9702 9.65482 16.25 10 16.25C10.3452 16.25 10.625 15.9702 10.625 15.625V10.625H15.625C15.9702 10.625 16.25 10.3452 16.25 10C16.25 9.65482 15.9702 9.375 15.625 9.375H10.625V4.375Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* каталоги mobile контейнер (как в старом) */}
                    <div className="catalogs-header-container catalogs-header-container-mob" ref={catalogsMobRef}>
                        <div className="catalogs-header-wrapper">
                            <div className="catalogs-header-list">
                                {catalogsData
                                    .filter((el) => !el.hidden)
                                    .map((el) => {
                                        const hasChilds = !!el.childs?.length;
                                        const isActive = activeCatalogId === el.id;

                                        return (
                                            <div
                                                key={`mobtab-${el.id}`}
                                                className={`catalogs-header-item-wrapper${isActive ? " active" : ""}`}
                                                data-id={el.id}
                                                {...(hasChilds ? ({ "data-has-childs": true } as any) : {})}
                                                onClick={(e) => {
                                                    if (!hasChilds) return;
                                                    if (!isTabletOrLess()) return;

                                                    e.preventDefault();
                                                    e.stopPropagation();

                                                    toggleCatalog(el.id);
                                                }}
                                            >
                                                <a href={!hasChilds ? el.href : undefined} className="catalogs-header-item">
                                                    {el.picture ? <img src={el.picture} alt={el.label} /> : null}
                                                    <span>
                                                        {el.label}
                                                        {hasChilds ? (
                                                            <svg className="catalogs-header-item-arrow" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M5.73484 4.35983C5.88128 4.21339 6.11872 4.21339 6.26516 4.35983L9.64017 7.73484C9.78661 7.88128 9.78661 8.11872 9.64017 8.26516C9.49372 8.41161 9.25628 8.41161 9.10983 8.26516L6 5.15533L2.89017 8.26516C2.74372 8.41161 2.50628 8.41161 2.35983 8.26516C2.21339 8.11872 2.21339 7.88128 2.35983 7.73484L5.73484 4.35983Z" />
                                                            </svg>
                                                        ) : null}
                                                    </span>
                                                </a>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Моб-оверлеи детей */}
                            {catalogsData
                                .filter((el) => !el.hidden && !!el.childs?.length)
                                .map((el) => {
                                    const isActive = activeCatalogId === el.id;

                                    return (
                                        <div
                                            key={`mobchild-${el.id}`}
                                            className={`catalog-header-childs-wrapper-mob${isActive ? " active" : ""}`}
                                            data-id={el.id}
                                            onClick={(e) => {
                                                if (e.target === e.currentTarget) {
                                                    closeCatalogMobileOverlay();
                                                }
                                            }}
                                        >
                                            <div className="catalog-header-childs-container">
                                                <div
                                                    className="catalog-header-childs-mob-close"
                                                    onClick={() => closeCatalogMobileOverlay()}
                                                    role="button"
                                                    tabIndex={0}
                                                >
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M8.68306 8.68306C8.92714 8.43898 9.32286 8.43898 9.56694 8.68306L16 15.1161L22.4331 8.68306C22.6771 8.43898 23.0729 8.43898 23.3169 8.68306C23.561 8.92714 23.561 9.32286 23.3169 9.56694L16.8839 16L23.3169 22.4331C23.561 22.6771 23.561 23.0729 23.3169 23.3169C23.0729 23.561 22.6771 23.561 22.4331 23.3169L16 16.8839L9.56694 23.3169C9.32286 23.561 8.92714 23.561 8.68306 23.3169C8.43898 23.0729 8.43898 22.6771 8.68306 22.4331L15.1161 16L8.68306 9.56694C8.43898 9.32286 8.43898 8.92714 8.68306 8.68306Z"
                                                            style={{ fill: "#353433" }}
                                                        />
                                                    </svg>
                                                </div>

                                                {el.childsTitle ? <p className="catalog-header-childs-title">{el.childsTitle}</p> : null}

                                                <div className="catalog-header-childs-list">
                                                    {(el.childs || []).map((child) => (
                                                        <a
                                                            key={child.href}
                                                            href={child.href}
                                                            className="catalog-header-child"
                                                            onClick={() => {
                                                                closeCatalogMobileOverlay();
                                                            }}
                                                        >
                                                            <div className="catalog-header-child-img-wrapper">
                                                                {child.picture ? (
                                                                    <img src={child.picture} alt="" className={el.isBigImg ? "catalog-header-child-bi" : ""} />
                                                                ) : null}
                                                            </div>
                                                            {child.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    {/* /CATALOGS */}
                </div>

                {/* GEO POPUP desktop */}
                <div className={`geo-popup${isGeoOpen ? " show show-auto" : ""}`} id="geo-popup">
                    <div className="geo-popup-bg" onClick={() => setGeoOpen(false)} />
                    <div className="geo-popup-body geo-popup-body-auto">
                        <div className="geo-popup-close" onClick={() => setGeoOpen(false)} role="button" tabIndex={0}>
                            <img src="/local/img/close.png" alt="" />
                        </div>
                        <div className="geo-popup-title">Ваш город Москва?</div>
                        <p className="geo-popup-subtitle">Укажите город, чтобы увидеть ближайшие объявления</p>
                        <div className="geo-popup-save" onClick={() => setGeoOpen(false)}>
                            Все верно
                        </div>
                        <div className="geo-popup-auto" onClick={() => { }}>
                            Нет, сменить
                        </div>
                    </div>
                </div>

                {/* GEO POPUP mobile */}
                <div className={`geo-popup-mob geo-popup${isGeoMobOpen ? " show show-auto" : ""}`} id="geo-popup-mob">
                    <div className="geo-popup-bg" onClick={() => setGeoMobOpen(false)} />
                    <div className="geo-popup-body geo-popup-body-auto">
                        <div className="geo-popup-close" onClick={() => setGeoMobOpen(false)} role="button" tabIndex={0}>
                            <img src="/local/img/close.png" alt="" />
                        </div>
                        <div className="geo-popup-title">Ваш город Москва?</div>
                        <p className="geo-popup-subtitle">Укажите город, чтобы увидеть ближайшие объявления</p>
                        <div className="geo-popup-save" onClick={() => setGeoMobOpen(false)}>
                            Все верно
                        </div>
                        <div className="geo-popup-auto" onClick={() => { }}>
                            Нет, сменить
                        </div>
                    </div>
                </div>
            </header>

            {/* SEARCH MODAL */}
            {isSearchOpen ? (
                <div
                    className="header-search-modal"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 10050,
                        display: "flex",
                        alignItems: "start",
                        justifyContent: "center",
                        paddingTop: 90,
                    }}
                >
                    <div
                        className="header-search-modal-bg"
                        onClick={() => setSearchOpen(false)}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(53, 52, 51, 0.55)",
                        }}
                    />

                    <div
                        className="header-search-modal-body"
                        style={{
                            position: "relative",
                            zIndex: 1,
                            width: "min(720px, calc(100vw - 24px))",
                            background: "#fff",
                            borderRadius: 18,
                            boxShadow: "0px 16px 24px 0px #0000001F",
                            padding: 16,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <input
                                ref={searchInputRef}
                                className="bx-form-control"
                                placeholder="Поиск по объявлениям"
                                style={{
                                    width: "100%",
                                    background: "#EEEDEC",
                                    borderRadius: 10,
                                    border: "none",
                                    padding: "12px 12px",
                                    fontSize: 17,
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => setSearchOpen(false)}
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#EEEDEC",
                                    cursor: "pointer",
                                    flex: "0 0 auto",
                                }}
                                aria-label="Закрыть поиск"
                                title="Закрыть"
                            >
                                ✕
                            </button>
                        </div>

                        <div style={{ marginTop: 10, color: "#353433", opacity: 0.7, fontSize: 13 }}>Начните вводить запрос…</div>
                    </div>
                </div>
            ) : null}

            {/* popup add offer */}
            <div className={`popup-add-offer${isAddOfferOpen ? " show" : ""}`}>
                <div className="popup-add-offer-bg" onClick={() => setAddOfferOpen(false)} />
                <div className="popup-add-offer-body">
                    <div className="popup-add-offer-close" onClick={() => setAddOfferOpen(false)} role="button" tabIndex={0}>
                        <img src="/local/img/close.png" alt="" />
                    </div>
                    <div className="popup-add-offer-title third-title">Что размещаем?</div>

                    {/* ✅ НОВОЕ: только главные пункты (без раскрытий) */}
                    <div className="popup-add-offer-type">
                        {addOfferItems.map((it) => (
                            <Link key={it.id} href={it.href} onClick={() => setAddOfferOpen(false)}>
                                {it.picture ? <img src={it.picture} alt="" /> : null}
                                {it.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
