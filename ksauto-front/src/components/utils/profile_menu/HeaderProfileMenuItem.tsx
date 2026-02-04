import Link from "next/link";

type Props = {
    link: string;
    name: string;
    img: string;
    exit?: boolean;
};

export function HeaderProfileMenuItem({ link, name, img, exit }: Props) {
    return (
        <Link
            href={link}
            className={`header-profile-menu-item ${
                exit ? "header-profile-menu-item-exit" : ""
            }`}
        >
            <img src={img} alt={name} />
            <span>{name}</span>
        </Link>
    );
}
