import React, { useEffect, useState, useRef } from "react";
import {
    Container,
    Section,
    Title,
    Countdown,
    ProgressBar,
    ProgressFill,
    DateText,
    Label,
} from "./styles";

interface Milestone {
    id: number;
    title: string;
    date: string;
    note?: string;
}

interface EventTimelineProps {
    eventDate: string;
    title?: string;
    milestones?: Milestone[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({
    eventDate = "2026-07-30T00:00:00",
    title = "Evento Principal",
}) => {
    const target = useRef(new Date(eventDate));
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const totalMs = target.current.getTime() - now.getTime();
    const absMs = Math.abs(totalMs);
    const seconds = Math.floor((absMs / 1000) % 60);
    const minutes = Math.floor((absMs / (1000 * 60)) % 60);
    const hours = Math.floor((absMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
    const status = totalMs > 0 ? "Faltam" : "Passou";

    // Progresso simples (dias)
    const start = new Date();
    const totalWindow = target.current.getTime() - start.getTime();
    const elapsedWindow = now.getTime() - start.getTime();
    const progress = totalWindow <= 0 ? 100 : Math.max(0, Math.min(100, (elapsedWindow / totalWindow) * 100));

    const formatDate = (d: Date | string) => {
        const dd = new Date(d);
        return dd.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <Container>
            <Section>
                <Title>{title}</Title>
                <Label>Contagem regressiva (tempo real)</Label>

                <Countdown>
                    {status} {days}d {hours}h {minutes}m {seconds}s
                </Countdown>

                <ProgressBar>
                    <ProgressFill style={{ width: `${progress}%` }} />
                </ProgressBar>

                <DateText>Data do evento: {formatDate(eventDate)}</DateText>
            </Section>
        </Container>
    );
};
