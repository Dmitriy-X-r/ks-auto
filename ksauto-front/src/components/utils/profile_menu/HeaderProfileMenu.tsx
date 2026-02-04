import { ProfileMenuApiResponse } from "@/lib/api/get_profile_menu";
import { HeaderProfileMenuItem } from "./HeaderProfileMenuItem";

type Props = {
    data: ProfileMenuApiResponse;
};

export function HeaderProfileMenu({ data }: Props) {
    return (
        <div className="header-profile-menu">
            <HeaderProfileMenuItem {...data.ads} />
            <HeaderProfileMenuItem {...data.report} />
            <HeaderProfileMenuItem {...data.profile} />
            <HeaderProfileMenuItem {...data.logout} exit />
        </div>
    );
}
