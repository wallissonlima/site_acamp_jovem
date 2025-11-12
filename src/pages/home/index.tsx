import { CustomCarousel } from "../../components/Carousel";
import { EventTimeline } from "../../components/EventTimeline";
import { Header } from "../../components/Header"; // ⬅️ importa o componente
import { Content } from "./styles";

export const Home = () => {
    // Exemplo de milestones (você pode ajustar as datas e títulos)
    const milestones = [
        { id: 1, title: "Lançar página do evento", date: "2025-11-20", note: "Página com formulário de inscrição" },
        { id: 2, title: "Início das inscrições", date: "2026-01-15", note: "Abertura das inscrições" },
        { id: 3, title: "Última chamada", date: "2026-07-20", note: "Preparação final" },
        { id: 4, title: "Dia do Evento", date: "2026-07-30", note: "Grande dia!" },
    ];

    return (
        <>
            <Header />
            <Content >
                <CustomCarousel />
                {/* Cronograma em tempo real */}
                <div>
                    <EventTimeline
                        eventDate="2026-07-30T18:00:00"
                        title="Contagem Regressiva para o Evento"
                        milestones={milestones}
                    />
                </div>
            </Content>
        </>
    );
};
