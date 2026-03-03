import { useState } from "react";

export const useLocalStorage = (key) => {
    const [value, setValue] = useState(() => {
        if (typeof window === "undefined") return undefined;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch {
            return undefined;
        }
    });

    const setItem = (val) => {
        try {
            localStorage.setItem(key, JSON.stringify(val));
            setValue(val);
            return true;
        } catch {
            return false;
        }
    };

    return [value, setItem];
};