import React from "react";

type FavoriteIconProps = {
    filled?: boolean; // true — закрашено
    width?: number;
    height?: number;
    strokeColor?: string; // цвет обводки
    fillColor?: string;   // цвет заливки
    className?: string;
};

export function FavoriteIcon({
                                 filled = false,
                                 width = 20,
                                 height = 20,
                                 strokeColor,
                                 fillColor,
                                 className,
                             }: FavoriteIconProps) {

    const fill = filled ? fillColor || "#FF5A5F" : fillColor || "none";
    const stroke = strokeColor || (filled ? "#fff" : "#353433");

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill={fill}
            stroke={stroke}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M4.93001 10.2193L4.91715 10.2075C4.17344 9.52577 3.75 8.5632 3.75 7.55431C3.75 6.00367 5.02124 4.6875 6.38728 4.6875C7.30619 4.6875 8.3876 5.15538 9.11603 5.88385L9.99988 6.76777L10.8838 5.88391C11.6124 5.15537 12.6938 4.6875 13.6127 4.6875C14.9788 4.6875 16.25 6.00367 16.25 7.55431C16.25 8.5632 15.8266 9.52577 15.0829 10.2075L15.07 10.2193L9.99995 15.1341L4.93001 10.2193ZM9.99994 5C9.0625 4.0625 7.67202 3.4375 6.38728 3.4375C4.24039 3.4375 2.5 5.40742 2.5 7.55431C2.5 8.91358 3.0705 10.2105 4.07249 11.1289L9.34741 16.2424C9.71103 16.5949 10.2889 16.5949 10.6525 16.2424L15.9275 11.1289C16.9295 10.2105 17.5 8.91358 17.5 7.55431C17.5 5.40742 15.7596 3.4375 13.6127 3.4375C12.328 3.4375 10.9375 4.0625 9.99994 5Z"
                strokeWidth={0.9}
            />
        </svg>
    );
}
