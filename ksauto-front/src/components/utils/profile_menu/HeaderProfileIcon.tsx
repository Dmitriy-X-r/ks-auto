import Image from "next/image";

type Props = {
    avatar: string;
};

export function HeaderProfileIcon({ avatar }: Props) {
    const avatarUrl = process.env.NEXT_PUBLIC_MAIN_DOMAIN! + avatar.replace(/^\\/, '').replace(/\\/g, '');
    return (
        <div className="header-profile-icon">
            <img
                src={avatarUrl}
                alt="avatar"
                className="header__profile-avatar"
                width={40}
                height={40}
            />
        </div>
    );
}
