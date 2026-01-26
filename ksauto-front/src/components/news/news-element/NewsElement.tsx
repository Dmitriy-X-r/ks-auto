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
                           <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.75 5.5C8.75 5.41675 8.69499 5.21381 8.47844 4.91024C8.27413 4.62384 7.96992 4.31027 7.59363 4.01874C6.82961 3.42682 5.86747 3 5 3C4.13253 3 3.17039 3.42682 2.40637 4.01874C2.03008 4.31027 1.72587 4.62384 1.52156 4.91024C1.30501 5.21381 1.25 5.41675 1.25 5.5C1.25 5.58325 1.30501 5.78619 1.52156 6.08976C1.72587 6.37616 2.03008 6.68973 2.40637 6.98126C3.17039 7.57318 4.13253 8 5 8C5.86747 8 6.82961 7.57318 7.59363 6.98126C7.96992 6.68973 8.27413 6.37616 8.47844 6.08976C8.69499 5.78619 8.75 5.58325 8.75 5.5ZM9.375 5.5C9.375 6.60089 7.10375 8.625 5 8.625C2.89625 8.625 0.625 6.60089 0.625 5.5C0.625 4.39911 2.89625 2.375 5 2.375C7.10375 2.375 9.375 4.39911 9.375 5.5ZM6.5625 5.5C6.5625 6.36294 5.86294 7.0625 5 7.0625C4.13705 7.0625 3.4375 6.36294 3.4375 5.5C3.4375 4.63705 4.13705 3.9375 5 3.9375C5.86294 3.9375 6.5625 4.63705 6.5625 5.5ZM5 4.875C5 4.52982 4.72018 4.25 4.375 4.25C4.02982 4.25 3.75 4.52982 3.75 4.875C3.75 5.22018 4.02982 5.5 4.375 5.5C4.72018 5.5 5 5.22018 5 4.875Z" style={{fill: "#ffffff !important;", stroke: "none !important;"}}></path>
                            </svg>

                            <span>{item.views ?? 0}</span>
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
