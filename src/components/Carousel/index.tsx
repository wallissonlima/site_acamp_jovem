import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap"; // Carousel do react-bootstrap
import { CarouselContainer } from "./styles"; // Container estilizado
import api from "../../config/api"; // Instância do Axios configurada

// Componente principal do carousel
export const CustomCarousel: React.FC = () => {
    // Estado que guarda todos os itens do carousel
    const [items, setItems] = useState<any[]>([]);

    // useEffect para carregar os itens assim que o componente monta
    useEffect(() => {
        const load = async () => {
            try {
                // Faz uma chamada GET para buscar todos os banners
                const res = await api.get("/api/carousel");
                setItems(res.data); // Atualiza estado com os itens do backend
            } catch (err) {
                // Se houver erro, exibe no console
                console.error("Erro ao carregar carousel:", err);
            }
        };
        load();
    }, []); // Array vazio → roda somente na montagem

    // Se não houver itens, não renderiza nada
    if (!items || items.length === 0) return null;

    return (
        <CarouselContainer>
            <Carousel>
                {items.map((item) => (
                    <Carousel.Item key={item.id}>
                        <img
                            // Monta src para Base64: data:<tipo>;base64,<dados>
                            src={`data:${item.mimeType};base64,${item.imageBase64}`}
                            alt={item.altText ?? `Banner ${item.id}`} // Texto alternativo
                            className="d-block w-100" // Bootstrap: imagem ocupa toda a largura
                            style={{ height: "500px", objectFit: "cover" }} // Ajusta altura e recorte
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </CarouselContainer>
    );
};
