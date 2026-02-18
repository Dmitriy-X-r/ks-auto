import { ReactNode } from "react";
import "./catalog.css";

export default function CatalogLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="catalog-page">
            <div className="catalog-container catalog-container--with-layout">
                {children}
            </div>
        </div>
    );
}
