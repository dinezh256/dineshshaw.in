import { useEffect, useState } from "react";


export const useLocalStorage = (key) => {
    if (typeof window === "undefined") return [undefined, () => { }]
    const item = localStorage.getItem(key);
    const parsedItem = item ? JSON.parse(item) : undefined

    const [value, setValue] = useState(parsedItem);

    const setItem = (val) => {
        try {
            localStorage.setItem(key, JSON.stringify(val));
            setValue(val);
            return true;
        } catch (e) {
            return false
        }
    };

    return [value, setItem];
}