"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    cities: string[];
    value: string;                 // выбранный город (cityDraft)
    onChange: (v: string) => void;  // setCityDraft
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    maxItems?: number;             // чтобы не рендерить 1000
};

function normalize(s: string) {
    return s.trim().toLowerCase().replaceAll("ё", "е");
}

export default function CityCombobox({
                                         cities,
                                         value,
                                         onChange,
                                         placeholder = "Введите город",
                                         disabled,
                                         className,
                                         maxItems = 50,
                                     }: Props) {
    const [query, setQuery] = useState(value || "");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Если value поменяли извне — синхронизируем текст
    useEffect(() => {
        setQuery(value || "");
    }, [value]);

    const filtered = useMemo(() => {
        const q = normalize(query);
        if (!q) return cities.slice(0, maxItems);
        const res = cities.filter((c) => normalize(c).includes(q));
        return res.slice(0, maxItems);
    }, [cities, query, maxItems]);

    const selectCity = (city: string) => {
        onChange(city);
        setQuery(city);
        setOpen(false);
    };

    // клик снаружи — закрыть
    useEffect(() => {
        const onDocDown = (e: MouseEvent) => {
            const t = e.target as Node;
            if (!wrapRef.current?.contains(t)) setOpen(false);
        };
        document.addEventListener("mousedown", onDocDown);
        return () => document.removeEventListener("mousedown", onDocDown);
    }, []);

    // сброс активного индекса при изменении выдачи
    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setOpen(true);
            return;
        }

        if (e.key === "Escape") {
            setOpen(false);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
            return;
        }

        if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
        }

        if (e.key === "Enter") {
            if (!open) return;
            e.preventDefault();
            const pick = filtered[activeIndex] || filtered[0];
            if (pick) selectCity(pick);
            return;
        }
    };

    return (
        <div ref={wrapRef} className={className} style={{ position: "relative" }}>
            <input
                ref={inputRef}
                value={query}
                disabled={disabled}
                placeholder={placeholder}
                onFocus={() => setOpen(true)}
                onChange={(e) => {
                    const v = e.target.value;
                    setQuery(v);
                    setOpen(true);

                    // Важно: пока печатает — мы не фиксируем выбор (cityDraft) автоматически,
                    // чтобы "Сохранить" не записал мусор.
                    // Но если хочешь, можно разрешить ручной ввод и сохранять текст:
                    // onChange(v);
                }}
                onKeyDown={onKeyDown}
                className="geo-popup-select"
                style={{
                    width: "100%",
                    outline: "none",
                }}
                autoComplete="off"
            />

            {/* выпадашка */}
            {open && !disabled && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 6px)",
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        background: "#fff",
                        borderRadius: 12,
                        boxShadow: "0px 16px 24px 0px #0000001F",
                        overflow: "hidden",
                    }}
                >
                    <div style={{ maxHeight: 260, overflowY: "auto" }}>
                        {filtered.length ? (
                            filtered.map((c, idx) => {
                                const active = idx === activeIndex;
                                return (
                                    <div
                                        key={`${c}-${idx}`}
                                        onMouseEnter={() => setActiveIndex(idx)}
                                        onMouseDown={(e) => {
                                            // чтобы инпут не терял фокус раньше выбора
                                            e.preventDefault();
                                            selectCity(c);
                                        }}
                                        style={{
                                            padding: "10px 12px",
                                            cursor: "pointer",
                                            background: active ? "#EEEDEC" : "#fff",
                                            color: "#353433",
                                        }}
                                    >
                                        {c}
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ padding: "10px 12px", opacity: 0.7 }}>
                                Ничего не найдено
                            </div>
                        )}
                    </div>

                    {/* подсказка если городов очень много */}
                    {normalize(query) && cities.length > maxItems ? (
                        <div style={{ padding: "8px 12px", fontSize: 12, opacity: 0.7 }}>
                            Показаны первые {maxItems} совпадений
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}