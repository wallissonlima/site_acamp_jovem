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

export function EventTimeline({ eventDate, milestones = [], title = "Evento" }) {

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


    /** progresso visual */
    const progress = (() => {
        const total = new Date(eventDate).getTime() - Date.now();
        if (total <= 0) return 100;
        const start = Date.now();
        const duration = new Date(eventDate).getTime() - start;
        return Math.min(100, Math.max(0, (1 - total / duration) * 100));
    })();


    return (
        <Container>
            <Section>
                <Title>{title}</Title>

                <Label>Contagem regressiva</Label>

                <Countdown>
                    Faltam {remaining.days}d {remaining.hours}h {remaining.minutes}m {remaining.seconds}s
                </Countdown>

                <ProgressBar>
                    <ProgressFill style={{ width: `${progress}%` }} />
                </ProgressBar>

                <DateText>Data do evento: {new Date(eventDate).toLocaleDateString("pt-BR")}</DateText>
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
        </Container>
    );
}
