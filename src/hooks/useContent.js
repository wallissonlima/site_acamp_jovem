import { useEffect, useState } from "react";
import api from "../config/api";

export function useContent(page) {
    const [content, setContent] = useState({});
    
    async function load() {
        const res = await api.get(`/content/page/${page}`);
        const obj = {};

        res.data.forEach(c => obj[c.key] = c.value); 
        setContent(obj);
    }

    useEffect(() => { load(); }, []);

    return content;
}
