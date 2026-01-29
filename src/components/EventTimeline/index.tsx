import { useEffect, useMemo, useState } from "react";
import {
    Container,
    Section,
    Title,
    Countdown,
    ProgressBar,
    ProgressFill,
    DateText,
    Label,
    MilestoneList,
    MilestoneItem,
} from "./styles";

interface Milestone {
    id: number;
    title: string;
    date: string;
    note?: string;
}

interface EventTimelineProps {
    eventDate: string;
    startDate?: string;
    milestones?: Milestone[];
    title?: string;
    showProgressLabel?: boolean;
    showOnlyDaysAndProgress?: boolean;
}

export function EventTimeline({
    eventDate,
    startDate,
    milestones = [],
    title = "Evento",
    showProgressLabel = true,
    showOnlyDaysAndProgress = false,
}: EventTimelineProps) {
    /** 🔐 validação centralizada da data */
    const eventTime = useMemo(() => {
        if (!eventDate) return NaN;
        const time = new Date(eventDate).getTime();
        return isNaN(time) ? NaN : time;
    }, [eventDate]);

    /** 🚨 se a data for inválida, não renderiza o contador */
    if (isNaN(eventTime)) {
        console.error("❌ EVENTDATE inválido:", eventDate);

        return (
            <Container>
                <Section>
                    <Title>{title}</Title>
                    <DateText>Data do evento inválida</DateText>
                </Section>
            </Container>
        );
    }

    const [remaining, setRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const update = () => {
            const now = Date.now();
            const diff = eventTime - now;

            setRemaining({
                days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
                hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
                minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
                seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
            });
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [eventTime]);

    /** 📊 progresso visual desde o início do ano */
    const progress = useMemo(() => {
        const now = Date.now();
        const start = new Date(new Date().getFullYear(), 0, 1).getTime();

        if (now <= start) return 0;
        if (now >= eventTime) return 100;

        const duration = eventTime - start;
        const elapsed = now - start;

        return Math.min(100, Math.max(0, (elapsed / duration) * 100));
    }, [eventTime]);

    return (
        <Container>
            {showOnlyDaysAndProgress ? (
                /* 🔥 MODO SIMPLIFICADO */
                <Section style={{ textAlign: "center" }}>
                    <Countdown style={{ fontSize: "26px", fontWeight: "bold" }}>
                        Faltam {remaining.days}d {remaining.hours}h {remaining.minutes}m{" "}
                        {remaining.seconds}s
                    </Countdown>

                    <ProgressBar>
                        <ProgressFill style={{ width: `${progress}%`, position: "relative" }}>
                            <span
                                style={{
                                    position: "absolute",
                                    right: 5,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            >
                                {Math.floor(progress)}%
                            </span>
                        </ProgressFill>
                    </ProgressBar>

                    <DateText style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>
                        Data do evento:{" "}
                        {new Date(eventTime).toLocaleDateString("pt-BR")}
                    </DateText>
                </Section>
            ) : (
                <>
                    {/* 🔹 Layout completo */}
                    <Section>
                        <Title>{title}</Title>

                        <Label>Contagem regressiva</Label>

                        <Countdown>
                            Faltam {remaining.days}d {remaining.hours}h {remaining.minutes}m{" "}
                            {remaining.seconds}s
                        </Countdown>

                        <ProgressBar>
                            <ProgressFill style={{ width: `${progress}%`, position: "relative" }}>
                                {showProgressLabel && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            right: 5,
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            fontSize: "12px",
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {Math.floor(progress)}%
                                    </span>
                                )}
                            </ProgressFill>
                        </ProgressBar>

                        <DateText>
                            Data do evento:{" "}
                            {new Date(eventTime).toLocaleDateString("pt-BR")}
                        </DateText>
                    </Section>

                    {Array.isArray(milestones) && milestones.length > 0 && (
                        <Section>
                            <Label>📍 Linha do Tempo</Label>
                            <MilestoneList>
                                {milestones.map((m) => (
                                    <MilestoneItem key={m.id}>
                                        <strong>{m.title}</strong> —{" "}
                                        {new Date(m.date).toLocaleDateString("pt-BR")}
                                        <br />
                                        <small>{m.note}</small>
                                    </MilestoneItem>
                                ))}
                            </MilestoneList>
                        </Section>
                    )}
                </>
            )}
        </Container>
    );
}
