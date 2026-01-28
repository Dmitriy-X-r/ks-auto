import Link from 'next/link'

export default function AdvertisingElement({ className }: { className?: string }) {
    return (
        <Link href="/advertisement/" className={`catalog__review_main ${className ?? ""}`}>
            <span className="catalog__review_main-title">
                Место для вашей рекламы
            </span>

            <span className="catalog__review_main-desc">
                Выберите место для вашей рекламы
            </span>

            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                    d="M10.625 4.375V9.375H15.625V10.625H10.625V15.625H9.375V10.625H4.375V9.375H9.375V4.375Z"
                    fill="#E23737"
                />
            </svg>

            <span className="catalog__review_main-btn">Разместить</span>
        </Link>
    )
}
