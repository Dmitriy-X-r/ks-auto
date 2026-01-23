import Link from 'next/link'
import { NewsItem } from '../type'

interface Props {
    item: NewsItem
}

export default function NewsElement({ item }: Props) {
    return (
        <Link href={item.link} className="review_main-item">
            <div className="review_main-wrapper">
                <img
                    className="review_main-img"
                    src={item.image}
                    alt={item.title}
                />

                <div className="review_main-text">
                    <p className="review_main-title">{item.title}</p>

                    <div className="news-item-info">
                        <p className="news-item-info-date">{item.date}</p>

                        <p className="news-item-info-count">
                            <svg width="10" height="11" viewBox="0 0 10 11">
                                <path
                                    d="M5 2.375C2.896 2.375.625 4.399.625 5.5S2.896 8.625 5 8.625 9.375 6.601 9.375 5.5 7.104 2.375 5 2.375Z"
                                    fill="#ffffff"
                                />
                            </svg>

                            <span>{item.views ?? 0}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
