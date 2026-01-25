"use client";

import { useEffect, useMemo, useState } from "react";
import './MainInfo.css'
import { getMainSection } from "@/lib/api/mainSection";
import { getInfoBeforeReport } from "@/lib/api/infoBeforeReport";
import { InfoBeforeReportResponse } from "@/lib/api/infoBeforeReport";

type Brand = { name: string; code: string }; // code пригодится для URL marka_{code}

function declensionRu(n: number, one: string, few: string, many: string) {
    // супер-простой аналог Bitrix Declension для "предложение"
    const abs = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return many;
    if (last > 1 && last < 5) return few;
    if (last === 1) return one;
    return many;
}

function formatNumber(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function MainInfo() {
    // ====== МОКИ (потом заменишь на API) ======
    const [offersCount, setOffersCount] = useState<number | null>(null);
    const [offersWord, setOffersWord] = useState<string>("предложений");
    const [offersUrl, setOffersUrl] = useState<string>();

    const [searchValue, setSearchValue] = useState("");
    const [carInfo, setCarInfo] = useState<InfoBeforeReportResponse["result"] | null>(null);
    const [searchError, setSearchError] = useState(false);

    const popularBrandsMock: Brand[] = useMemo(
        () => [
            { name: "Lada (ВАЗ)", code: "lada" },
            { name: "Toyota", code: "toyota" },
            { name: "Kia", code: "kia" },
            { name: "Volkswagen", code: "volkswagen" },
            { name: "Hyundai", code: "hyundai" },
            { name: "Nissan", code: "nissan" },
            { name: "Renault", code: "renault" },
            { name: "BMW", code: "bmw" },
            { name: "Ford", code: "ford" },
        ],
        []
    );

    // ====== popup "Скачать приложение" (PC версия) ======
    const [isAppPopupOpen, setAppPopupOpen] = useState(false);
    const [appPopupTab, setAppPopupTab] = useState<"iOS" | "Android">("iOS");

    useEffect(() => {
        getMainSection()
            .then(data => {
            console.log("API data:", data);
            const countStr = data.result.block1.count;
            console.log("Count string:", countStr);

            const countNum = parseInt(countStr, 10) || 0;
            setOffersCount(countNum);

            const url = data.result.block1.title_url1;
            setOffersUrl(url);

            setOffersWord(data.result.block1.count_text || "предложений");
            })
        .catch(() => {
            setOffersCount(0);
            setOffersWord("предложений");
            });
        }, []);

    useEffect(() => {
        // закрытие по Esc
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setAppPopupOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);


    // ====== mobile: клик по "Скачать приложение" ведёт в стор ======
    useEffect(() => {
        const btn = document.querySelector('.main-app-block-mob[data-action="link-to-market"]');

        if (!btn) return;

        const onClick = () => {
            const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

            // iOS
            if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
                window.location.href = "https://apps.apple.com/ru/app/%D0%BA%D1%81-%D0%B0%D0%B2%D1%82%D0%BE/id6739260667";
                return;
            }

            // Android
            if (/android/i.test(ua)) {
                window.location.href = "https://www.rustore.ru/catalog/app/ru.ksauto.app";
                return;
            }
        };

        btn.addEventListener("click", onClick);
        return () => btn.removeEventListener("click", onClick);
    }, []);

    // const offersWord = declensionRu(offersCount, "предложение", "предложения", "предложений");

    return (
        <div className="main-wrapper-body new-container">
            {/* ===== banner-main ===== */}
            <div className="banner-main">
                <div className="banner-main-text">
                    <h1 className="banner-main-title">Купить или самостоятельно продать автомобиль</h1>
                    <p> Доступно по всей России </p>

                    <a
                        href={offersUrl}
                        className="link_btn link_btn__dark mob-link_btn___catalog-btn desk-catalog-vse desk-catalog-vse-pc"
                    >
                        {offersCount !== null && (
                            <>
                            Показать {formatNumber(offersCount)} {offersWord}
                            </>
                        )}
                    </a>

                    <a
                        href="/catalog/cars/?showfilter=Y"
                        className="link_btn link_btn__dark mob-link_btn___catalog-btn desk-catalog-vse desk-catalog-vse-mb"
                    >
                        Поиск авто по параметрам
                    </a>
                </div>

                <div className="banner-catalog">
                    <div className="banner-catalog-type">
                        <h2>Тип автомобиля</h2>
                        <div className="banner-catalog-type-list">
                            <a href="/catalog/cars/filter/type-is-new/apply/" className="banner-catalog-type-item">
                                <img src="/img/img-type-1.png" alt="Новые" />
                                <p>Новые</p>
                            </a>

                            <a href="/catalog/cars/filter/type-is-with_mileage/apply/" className="banner-catalog-type-item">
                                <img src="/img/img-type-2.png" alt="С пробегом" />
                                <p>С пробегом</p>
                            </a>

                            <a href="/catalog/cars/filter/order_use-is-y/apply/" className="banner-catalog-type-item">
                                <img src="/img/img-type-3.png" alt="На заказ" />
                                <p>На заказ</p>
                            </a>

                            <a href="/catalog/cars/filter/seller-is-11411/apply/" className="banner-catalog-type-item">
                                <img src="/img/img-type-4.png" alt="От КС" />
                                <p>От КС</p>
                            </a>
                        </div>
                    </div>

                    <div className="banner-main-catalog-marks">
                        <h2>Популярные марки</h2>
                        <div>
                            {popularBrandsMock.slice(0, 9).map((b) => (
                                <a key={b.code} href={`/catalog/cars/marka_${b.code}/`} className="banner-main__items-list">
                                    {b.name}
                                </a>
                            ))}

                            <a className="banner-main-catalog-marks-all" href="/catalog/cars/?showfilter=Y">
                                Смотреть все
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.64645 5.85355C4.84171 6.04882 5.15829 6.04882 5.35355 5.85355L9.85355 1.35355C10.0488 1.15829 10.0488 0.841709 9.85355 0.646447C9.65829 0.451184 9.34171 0.451184 9.14645 0.646447L5 4.79289L0.853553 0.646447C0.658291 0.451184 0.341709 0.451184 0.146447 0.646447C-0.0488155 0.841709 -0.0488155 1.15829 0.146447 1.35355L4.64645 5.85355Z"
                                        fill="#E23737"
                                        style={{ fill: "#E23737", stroke: "none" }}
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== main-costs ===== */}
            <div className="main-costs">
                {/* app + telegram */}
                <div className="main-app">
                    {/* PC: открывает попап */}
                    <div
                        className="main-app-block main-app-block-pc"
                        data-action="main-app-popup"
                        data-check-popup="true"
                        onClick={() => setAppPopupOpen(true)}
                        role="button"
                        tabIndex={0}
                    >
                        <img src="/img/app-icon.svg" alt="" />
                        <div>
                            <p className="main-app-title">КС Авто</p>
                            <p className="main-app-subtitle">Скачать приложение</p>
                        </div>
                    </div>

                    {/* MOB: ссылка в стор (логика в useEffect) */}
                    <div className="main-app-block main-app-block-mob" data-action="link-to-market">
                        <img src="/img/app-icon.svg" alt="" />
                        <div>
                            <p className="main-app-title">КС Авто</p>
                            <p className="main-app-subtitle">Скачать приложение</p>
                        </div>
                    </div>

                    <a href="https://t.me/KSAUTORU" className="main-app-block">
                        <img src="/img/tg.svg" alt="" />
                        <div>
                            <p className="main-app-title">Telegram-канал</p>
                            <p className="main-app-subtitle">Общайтесь между собой</p>
                        </div>
                    </a>

                    {isAppPopupOpen ? (
                        <div
                            onClick={() => setAppPopupOpen(false)}
                            style={{ position: "fixed", inset: 0, zIndex: 9998 }}
                            aria-hidden
                        />
                    ) : null}

                    {/* POPUP (PC) */}
                    <div className={`main-app-popup${isAppPopupOpen ? " active" : ""}`} data-check-popup="true">
                        {/* кликабельный фон (если в css есть overlay через псевдо — не мешает) */}


                        <div className="main-app-popup-close" onClick={() => setAppPopupOpen(false)} role="button" tabIndex={0}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.68306 8.68306C8.92714 8.43898 9.32286 8.43898 9.56694 8.68306L16 15.1161L22.4331 8.68306C22.6771 8.43898 23.0729 8.43898 23.3169 8.68306C23.561 8.92714 23.561 9.32286 23.3169 9.56694L16.8839 16L23.3169 22.4331C23.561 22.6771 23.561 23.0729 23.3169 23.3169C23.0729 23.561 22.6771 23.561 22.4331 23.3169L16 16.8839L9.56694 23.3169C9.32286 23.561 8.92714 23.561 8.68306 23.3169C8.43898 23.0729 8.43898 22.6771 8.68306 22.4331L15.1161 16L8.68306 9.56694C8.43898 9.32286 8.43898 8.92714 8.68306 8.68306Z"
                                    fill="#353433"
                                    style={{ fill: "#353433", stroke: "none" }}
                                />
                            </svg>
                        </div>

                        <div className="main-app-popup-title-block">
                            <img src="/local/templates/new/img/app-icon2.svg" alt="КС авто приложение" />
                            <p className="main-app-popup-title">КС Авто</p>
                            <p className="main-app-popup-text">Выберите платформу для скачивания приложения</p>
                        </div>

                        <div className="main-app-popup-tab">
                            <p
                                className={appPopupTab === "iOS" ? "active" : ""}
                                data-tab-qr="iOS"
                                onClick={() => setAppPopupTab("iOS")}
                                role="button"
                                tabIndex={0}
                            >
                                iOS
                            </p>
                            <p
                                className={appPopupTab === "Android" ? "active" : ""}
                                data-tab-qr="Android"
                                onClick={() => setAppPopupTab("Android")}
                                role="button"
                                tabIndex={0}
                            >
                                Android
                            </p>
                        </div>

                        <div className="main-app-popup-qr">
                            <img
                                className={appPopupTab === "iOS" ? "active" : ""}
                                src="/local/templates/new/img/QR.png"
                                alt="QR iOS"
                                data-qr="iOS"
                            />
                            <img
                                className={appPopupTab === "Android" ? "active" : ""}
                                src="/local/templates/new/img/QR-rustore.png"
                                alt="QR Android"
                                data-qr="Android"
                            />
                        </div>

                        <p className="main-app-popup-info">Наведите камеру на QR-код и перейдите по ссылке</p>
                    </div>
                </div>

                {/* ===== get-costs ===== */}
                <div className="get-costs" data-action="get-report">
                    <div className="get-costs-wrapper">
                        <p className="get-costs-title">
                            Проверьте любой автомобиль перед покупкой <span className="error"></span>
                        </p>
                        <p className="get-costs-subtitle">
                            Ограничения, штрафы, возможные владельцы, участие в ДТП и многое другое
                        </p>

                        <form
                            data-action="get-middle-costs"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSearchError(false);
                                setCarInfo(null);

                                getInfoBeforeReport(searchValue)
                                .then((data) => {
                                    setCarInfo(data.result);
                                })
                                .catch(() => {
                                    setSearchError(true);
                                });
                            }}
                        >
                            <label>
                                <input type="text" placeholder="Госномер или VIN" name="VIN_OR_NUBMER" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} required />
                            </label>
                            <button className="link_btn link_btn__dark" type="submit">
                                Получить отчёт
                            </button>
                        </form>
                    </div>

                    {/* Эти блоки на старом сайте показывались/прятались скриптами.
                        Пока оставляем в DOM как в PHP (стили сами разрулят display), а потом подключим логику. */}

                    {carInfo && ( 
                        <div className="costs-result">
                            <p className="get-costs-title">Автомобиль найден</p>
                            <p className="costs-subtitle">Детальная информация доступна в отчёте</p>

                            <div className="costs-result-item">
                                <div className="costs-result-item-img">
                                    <img
                                        src={carInfo.image ?? "/img/img-type-1.png"}
                                        alt=""
                                    />
                                </div>
                                <div className="costs-result-item-text">
                                    <p className="costs-result-item-title">
                                        {carInfo.marka} {carInfo.model}
                                    </p>
                                    <div className="costs-result-item-tabs">
                                         {carInfo.year ? <span>{carInfo.year} г.</span> : null}
                                        {carInfo.power ? <span>{Math.round(carInfo.power)} л.с.</span> : null}
                                    </div>
                                    <p className="costs-result-item-price"></p>
                                </div>
                            </div>

                            <div className="costs-result-buttons">
                                <div className="costs-result-buttons-reset" onClick={() => setCarInfo(null)}>Вернуться</div>

                                {/* TODO: link зависит от авторизации/типа юзера — позже подключим */}
                                <a href="/auth/" className="costs-result-buttons-add link_btn link_btn__dark">
                                    Получить отчет
                                </a>
                            </div>
                        </div>
                    )}
                    {searchError && (
                        <div className="costs-no-result">
                            <p className="get-costs-title">Автомобиль не найден</p>
                            <p className="costs-subtitle">Попробуйте другой госномер или VIN</p>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}