import { useEffect, useState } from "react";
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
    showProgressLabel?: boolean; // 👈 ADICIONADO

}

export function EventTimeline({
    eventDate,
    startDate,
    milestones = [],
    title = "Evento",
    showProgressLabel = true, // 👈 VALOR PADRÃO (MOSTRA)
    showOnlyDaysAndProgress = false,
}: EventTimelineProps) {

    const [remaining, setRemaining] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const update = () => {
            const target = new Date(eventDate).getTime();
            const now = Date.now();
            const diff = target - now;

            if (isNaN(target)) return console.error("❌ EVENTDATE inválido:", eventDate);

            setRemaining({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, [eventDate]);

    /** progresso visual contando desde o início do ano */
    const progress = (() => {
        const now = Date.now();

        const start = new Date(new Date().getFullYear(), 0, 1).getTime(); // 1º janeiro
        const end = new Date(eventDate).getTime();

        if (isNaN(end)) return 0;
        if (now <= start) return 0;
        if (now >= end) return 100;

        const duration = end - start;
        const elapsed = now - start;

        return (elapsed / duration) * 100;
    })();

    return (
        <Container>

            {/* 🔥 MODO SIMPLIFICADO SOMENTE DIAS + PROGRESSO */}
            {showOnlyDaysAndProgress ? (
                <Section style={{ textAlign: "center" }}>

                    <Countdown style={{ fontSize: "26px", fontWeight: "bold" }}>
                        Faltam {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
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
                        Data do evento: {new Date(eventDate).toLocaleDateString("pt-BR")}
                    </DateText>

                </Section>
            ) : (
                <>
                    {/* 🔹 Layout original completo */}
                    <Section>
                        <Title>{title}</Title>

                        <Label>Contagem regressiva</Label>

                        <Countdown>
                            Faltam {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
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
                            Data do evento: {new Date(eventDate).toLocaleDateString("pt-BR")}
                        </DateText>
                    </Section>

                    {milestones.length > 0 && (
                        <Section>
                            <Label>📍 Linha do Tempo</Label>
                            <MilestoneList>
                                {milestones.map(m => (
                                    <MilestoneItem key={m.id}>
                                        <strong>{m.title}</strong> — {new Date(m.date).toLocaleDateString("pt-BR")}
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
