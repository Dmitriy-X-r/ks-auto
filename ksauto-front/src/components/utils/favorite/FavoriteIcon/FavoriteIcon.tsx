import React from "react";

type FavoriteIconProps = {
    filled?: boolean;
    color?: string;
    className?: string;
};

export function FavoriteIcon({
                                 filled = false,
                                 color = "#FFFFFF",
                                 className,
                             }: FavoriteIconProps) {
    return (
        <svg
            width={25}
            height={25}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M4.5 9.55431C4.5 7.40742 6.24039 5.4375 8.38728 5.4375C9.67202 5.4375 11.0625 6.0625 11.9999 7C12.9375 6.0625 14.328 5.4375 15.6127 5.4375C17.7596 5.4375 19.5 7.40742 19.5 9.55431C19.5 10.9136 18.9295 12.2105 17.9275 13.1289L12.6525 18.2424C12.2889 18.5949 11.711 18.5949 11.3474 18.2424L6.07249 13.1289C5.0705 12.2105 4.5 10.9136 4.5 9.55431Z"
                fill={filled ? color : "none"}
                stroke={color}
                strokeWidth={filled ? 0 : 1}
            />
        </svg>
    );
}