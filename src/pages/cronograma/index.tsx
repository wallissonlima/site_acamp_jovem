import { useEffect, useState } from "react";
import { EventTimeline } from "../../components/EventTimeline";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import { Content } from "./styles";
import { apiPublic } from "../../config/api/apiPublic/apiPublic";


export const Cronograma = () => {
    const [milestones, setMilestones] = useState([]);
    const [eventDate, setEventDate] = useState("");

    const loadTimeline = async () => {
        try {
            const res = await apiPublic.get("/api/timeline");

            // Certifica que o valor existe
            setMilestones(res.data.milestones ?? []);
            setEventDate(res.data.eventDate ?? null);

        } catch (err) {
            console.error("Erro ao carregar timeline:", err);
            setMilestones([]);
            setEventDate(null);
        }
    };

    useEffect(() => {
        loadTimeline();
    }, []);

    useEffect(() => {
    }, [eventDate, milestones]);


    return (
        <>
            <Header />
            <Content>
                {/* Renderiza somente se eventDate existir */}
                {eventDate ? (
                    <EventTimeline
                        eventDate={eventDate}
                        title="Contagem Regressiva para o Evento"
                        milestones={milestones}
                    />
                ) : (
                    <p>Carregando cronograma...</p>
                )}
            </Content>
            <div style={{ marginTop: "11%" }}>

                <Footer />
            </div>
        </>
    )
}
