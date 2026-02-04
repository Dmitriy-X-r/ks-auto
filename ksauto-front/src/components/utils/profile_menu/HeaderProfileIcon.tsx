import Image from "next/image";

type Props = {
    avatar: string;
};

export function HeaderProfileIcon({ avatar }: Props) {
    return (
        <div className="header-profile-icon">
            <Image
                src={avatar}
                alt=""
                className="header__profile-avatar"
                width={40}
                height={40}
            />
        </div>
    );
}
