type CarTypeItem = { url: string; text: string; img: string };
type PopularBrandItem = { url: string; name: string };

type Props = {
    offersCount: number;
    offersWord: string;
    offersUrl: string;
    carTypes: CarTypeItem[];
    popularBrands: PopularBrandItem[];
    brandsAllUrl: string;
};

function formatNumber(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function ServerMainInfo({
                                           offersCount,
                                           offersWord,
                                           offersUrl,
                                           carTypes,
                                           popularBrands,
                                           brandsAllUrl,
                                       }: Props) {
    return (
        <div className="main-wrapper-body new-container">
            <div className="banner-main">
                <div className="banner-main-text">
                    <h1 className="banner-main-title">
                        Купить или самостоятельно продать автомобиль
                    </h1>
                    <p>Доступно по всей России</p>

                    <a
                        href={offersUrl}
                        className="link_btn link_btn__dark mob-link_btn___catalog-btn desk-catalog-vse desk-catalog-vse-pc"
                    >
                        Показать {formatNumber(offersCount)} {offersWord}
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
                            {carTypes.map((t) => (
                                <a key={t.url} href={t.url} className="banner-catalog-type-item">
                                    <img src={t.img} alt={t.text} loading="lazy" />
                                    <p>{t.text}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="banner-main-catalog-marks">
                        <h2>Популярные марки</h2>
                        <div>
                            {popularBrands.slice(0, 9).map((b) => (
                                <a
                                    key={b.url}
                                    href={b.url.startsWith("/") ? b.url : `/${b.url}`}
                                    className="banner-main__items-list"
                                >
                                    {b.name}
                                </a>
                            ))}

                            <a
                                className="banner-main-catalog-marks-all"
                                href={brandsAllUrl}
                            >
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
        </div>
    );
}