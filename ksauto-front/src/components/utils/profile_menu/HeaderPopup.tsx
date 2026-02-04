import { ProfileMenuApiResponse } from "@/lib/api/get_profile_menu";
import { HeaderProfileTitle } from "./HeaderProfileTitle";
import { HeaderProfileMenu } from "./HeaderProfileMenu";

type Props = {
    data: ProfileMenuApiResponse;
};

export function HeaderProfilePopup({ data }: Props) {
    return (
        <div className="header-profile-block">
            <HeaderProfileTitle data={data} />
            <HeaderProfileMenu data={data} />
        </div>
    );
}
