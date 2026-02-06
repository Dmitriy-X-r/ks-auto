import Link from "next/link";
import { ProfileMenuApiResponse } from "@/lib/api/get_profile_menu";

type Props = {
    data?: ProfileMenuApiResponse | null;
};

export function HeaderProfileTitle({ data }: Props) {
    const avatarUrl = process.env.NEXT_PUBLIC_MAIN_DOMAIN! + data?.avatar.replace(/^\\/, '').replace(/\\/g, '');
    console.log(avatarUrl);
    if (!data) return null;
    return (
        <div className="header-profile-title">
            <div className="header-profile-title-icon">
                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="header__profile-avatar"
                    width={40}
                    height={40}
                />
            </div>

            <Link href={data.profile.link} className="header-profile-title-name">
                {data.user}
            </Link>

            <div className="header-profile-title-tabs">
                <div className="header-profile-title-tab">
                    <p>{data.type}</p>
                </div>

                <div className="header-profile-title-tab header-profile-title-tab-copy">
                    <img src="/local/img/copy.svg" alt="Скопировать ID" />
                    <p>ID {data.id}</p>
                </div>

                <div className="header-profile-title-tab">
                    <p>С {data.data_register}</p>
                </div>
            </div>

            <Link href={data.profile.link}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotate(-90deg)", marginTop: "9px" }}
                >
                    <path
                        d="M4.64645 5.85355C4.84171 6.04882 5.15829 6.04882 5.35355 5.85355L9.85355 1.35355C10.0488 1.15829 10.0488 0.841709 9.85355 0.646447C9.65829 0.451184 9.34171 0.451184 9.14645 0.646447L5 4.79289L0.853553 0.646447C0.658291 0.451184 0.341709 0.451184 0.146447 0.646447C-0.0488155 0.841709 -0.0488155 1.15829 0.146447 1.35355L4.64645 5.85355Z"
                        fill="#E23737"
                    />
                </svg>
            </Link>
        </div>
    );
}
