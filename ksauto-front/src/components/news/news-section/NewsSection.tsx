// src/components/news/news-section/NewsSection.tsx
import AdvertisingElement from '@/components/advertising-element/Advertising-element'
import NewsElement from '@/components/news/news-element/NewsElement'
import { getNews } from '@/lib/api/news'
import { mapNews, NewsUIItem } from '@/lib/mappers/mapNews'

export default async function NewsSection() {
    const data = await getNews()
    const news: NewsUIItem[] = data.result.map(mapNews)
    return (
        <section className="section_main shadow new-container">
            <div className="review_main">
                <div className="sale-title-block">
                    <h2 className="second-title">Новости</h2>
                    <a href="/news/" className="link_btn link_btn__light">
                        К новостям
                    </a>
                </div>

                <div className="review_main__list">
                    <AdvertisingElement />

                    {news.map(item => (
                        <NewsElement key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
