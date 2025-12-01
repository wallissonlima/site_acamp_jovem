import { useEffect, useState } from "react";
import { EventTimeline } from "../../components/EventTimeline";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import { Content } from "./styles";
import api from "../../config/api";

export const Cronograma = () => {
    const [milestones, setMilestones] = useState([]);
    const [eventDate, setEventDate] = useState("");

    const loadTimeline = async () => {
        const res = await api.get("/api/timeline");
        setMilestones(res.data.milestones);
        setEventDate(res.data.eventDate);
    };

    useEffect(() => { loadTimeline(); }, []);
    useEffect(() => {
        loadTimeline();
    }, []);

    useEffect(() => {
        console.log("EVENTDATE =>", eventDate);
        console.log("MILESTONES =>", milestones);
    }, [eventDate, milestones]);


    return (
        <>
            <Header />
            <Content>
                <EventTimeline
                    eventDate={eventDate}
                    title="Contagem Regressiva para o Evento"
                    milestones={milestones}
                />
            </Content>
            <Footer />
        </>
    )
}
