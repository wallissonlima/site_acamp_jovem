import { Carousel } from "react-bootstrap";
import { CarouselContainer } from "./styles"; // seus estilos
import logo1 from "../../assets/sit.png";
import logo from "../../assets/image.png";
import log2 from "../../assets/SITE.png";

const items = [
    { id: 1, src: logo1, altText: "Banner 1" },
    { id: 2, src: logo, altText: "Banner 2" },
    { id: 3, src: log2, altText: "Banner 3" },
];

export const CustomCarousel: React.FC = () => {
    return (
        <CarouselContainer>
            <Carousel>
                {items.map((item) => (
                    <Carousel.Item key={item.id}>
                        <img
                            src={item.src}
                            alt={item.altText}
                            className="d-block w-100"
                            style={{
                                height: "500px",
                                objectFit: "cover",
                            }}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </CarouselContainer>
    );
};
