// retorna valor principal
export function value(key: string, fallback = "") {
    return window.data?.[key]?.value || fallback;
}

// retorna título
export function title(key: string, fallback = "") {
    return window.data?.[key]?.title || fallback;
}

// retorna descrição
export function description(key: string, fallback = "") {
    return window.data?.[key]?.description || fallback;
}

// imagens com suporte a base64
export function getImage(key: string, fallback?: string) {
    const v = window.data?.[key]?.value;
    if (!v) return fallback || "";
    if (v.startsWith("data:") || v.startsWith("http")) return v;
    return `data:image/jpeg;base64,${v}`;
}
