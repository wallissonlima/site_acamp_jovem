import styled from "styled-components";

export const CarouselContainer = styled.div`
  width: 100%;
  height: 500px;
  background: #000; /* evita piscada branca */
  overflow: hidden;
  margin-top: 1px;

  .carousel {
    height: 100%;
  }

  .carousel-item {
    height: 100%;
  }

  .carousel-inner {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    filter: invert(1); /* deixa as setas brancas */
  }

  .carousel-indicators [data-bs-target] {
    background-color: white;
  }
`;
