"use client";
import './MainBanner.css';

type MainBannerProps = {
    href: string;
    target?: "_blank" | "_self";
    noIndex?: boolean;
    comment?: string;
    imageSrc?: string;
    imageAlt?: string;
};

export default function MainBanner({
    href,
    target = "_blank",
    noIndex = false,
    comment,
    imageSrc = "/img/main-banner.png",
    imageAlt = "",
}: MainBannerProps) {
    const banner = (
        <a
            href={href}
            className="main-banner"
            target={target}
            {...(noIndex ? { rel: "nofollow" } : {})}
        >
            {comment ? (
                <span className="main-banner-erid">{comment}</span>
            ) : null}

            <img src={imageSrc} alt={imageAlt} />
        </a>
    );

    // В Next.js <noindex> — невалидный тег,
    // но Яндекс его всё ещё понимает.
    // Если хочешь — можем заменить на meta / robots позже.
    if (noIndex) {
        return <div className='main-banner-container'>{banner}</div>;
    }

    return banner;
}