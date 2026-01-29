"use client";

import { useEffect, useMemo, useState } from "react";
import './MainInfo.css';
import { isInfoBeforeReportError } from "@/lib/api/infoBeforeReport";
import type { InfoBeforeReportSuccess } from "@/lib/api/infoBeforeReport";
import { BASE_PATH } from "@/lib/basePath";
import ServerMainInfo from "@/components/MainInfo/serverMainInfo";


function declensionRu(n: number, one: string, few: string, many: string) {
    // супер-простой аналог Bitrix Declension для "предложение"
    const abs = Math.abs(n) % 100;
    const last = abs % 10;
    if (abs > 10 && abs < 20) return many;
    if (last > 1 && last < 5) return few;
    if (last === 1) return one;
    return many;
}
type CarTypeItem = { url: string; text: string; img: string };
type PopularBrandItem = { url: string; name: string };
type MainInfoProps = {
    initialData: {
        offersCount: number;
        offersWord: string;
        offersUrl: string;
        carTypes: CarTypeItem[];
        popularBrands: PopularBrandItem[];
        brandsAllUrl: string;
    };
};
function formatNumber(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function MainInfo({ initialData }: MainInfoProps) {


    const [searchValue, setSearchValue] = useState("");

    const [carInfo, setCarInfo] = useState<InfoBeforeReportSuccess | null>(null);
    type CostsView = "form" | "result" | "no-result";

    const [costsView, setCostsView] = useState<CostsView>("form");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);




    const [isAppPopupOpen, setAppPopupOpen] = useState(false);
    const [appPopupTab, setAppPopupTab] = useState<"iOS" | "Android">("iOS");



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
            <ServerMainInfo
                offersCount={initialData.offersCount}
                offersWord={initialData.offersWord}
                offersUrl={initialData.offersUrl}
                carTypes={initialData.carTypes}
                popularBrands={initialData.popularBrands}
                brandsAllUrl={initialData.brandsAllUrl}
            />

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

                    <div className={`main-app-popup${isAppPopupOpen ? " active" : ""}`} data-check-popup="true">

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
                    {costsView === "form" && (
                        <div className="get-costs-wrapper">
                            <p className="get-costs-title">
                                Проверьте любой автомобиль перед покупкой <span className="error"></span>
                            </p>

                            {errorMessage && (
                                <p className="get-costs-error">
                                    {errorMessage}
                                </p>
                            )}
                            <p className="get-costs-subtitle">
                                Ограничения, штрафы, возможные владельцы, участие в ДТП и многое другое
                            </p>

                            <form
                                data-action="get-middle-costs"
                                onSubmit={(e) => {
                                    console.log("salam aleikym!!");
                                    e.preventDefault();
                                    setCarInfo(null);

                                    fetch(`/api/info-before-report?searchPhrase=${encodeURIComponent(searchValue)}`)
                                        .then((res) => res.json())
                                        .then((data) => {
                                            const result = data.result;

                                            if (isInfoBeforeReportError(result)) {
                                                setCarInfo(null);
                                                setErrorMessage(result.ERROR);
                                                setCostsView("form");
                                                return;
                                            }

                                            if (!result) {
                                                setCarInfo(null);
                                                setErrorMessage("Автомобиль не найден");
                                                setCostsView("no-result");
                                                return;
                                            }

                                            setErrorMessage(null);
                                            setCarInfo(result);
                                            setCostsView("result");
                                        })
                                        .catch(() => {
                                            setCarInfo(null);
                                            setErrorMessage("Ошибка сервера. Попробуйте позже");
                                            setCostsView("no-result");
                                        });


                                    // console.log(carInfo);
                                    // console.log(errorMessage);
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
                    )}

                    {/* Эти блоки на старом сайте показывались/прятались скриптами.
                        Пока оставляем в DOM как в PHP (стили сами разрулят display), а потом подключим логику. */}

                    {costsView === "result" && carInfo && (
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
                                <div
                                    className="costs-result-buttons-reset"
                                    onClick={() => {
                                        setCarInfo(null);
                                        setErrorMessage(null);
                                        setCostsView("form");
                                    }}
                                >
                                    Вернуться
                                </div>
                                {/* TODO: link зависит от авторизации/типа юзера — позже подключим */}
                                <a href="/auth/" className="costs-result-buttons-add link_btn link_btn__dark">
                                    Получить отчет
                                </a>
                            </div>
                        </div>
                    )}
                    {costsView === "no-result" && (
                        <div className="costs-no-result">
                            <p className="get-costs-title">Автомобиль не найден</p>
                            <p className="costs-subtitle">Попробуйте другой госномер или VIN</p>
                            <div
                                className="costs-result-buttons-reset"
                                onClick={() => {
                                    setCarInfo(null);
                                    setErrorMessage(null);
                                    setCostsView("form");
                                }}
                            >
                                Вернуться
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}