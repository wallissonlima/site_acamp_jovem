import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { CarouselContainer } from "./styles";
import api from "../../config/api";

export const CustomCarousel: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/api/carousel");

                // 🔹 Garante que items seja sempre array
                const list = Array.isArray(res.data)
                    ? res.data
                    : res.data.items ?? res.data.carousel ?? [];

                setItems(list);
            } catch (err) {
                console.error("Erro ao carregar carousel:", err);
                setItems([]); // fallback para array vazio
            }
        };

        load();
    }, []);

    // 🔹 Se não houver itens, não renderiza nada
    if (!items || items.length === 0) return null;

    return (
        <CarouselContainer>
            <Carousel>
                {items.map(item => (
                    <Carousel.Item key={item.id ?? item.tempId}>
                        <img
                            src={item.imageBase64 ? `data:${item.mimeType};base64,${item.imageBase64}` : ""}
                            alt={item.altText ?? `Banner ${item.id ?? ''}`}
                            className="d-block w-100"
                            style={{ height: "500px", objectFit: "cover" }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </CarouselContainer>
    );
};
