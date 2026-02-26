import { useEffect, useState } from "react";
import api from "../../../config/api";
import {
    Container,
    Card,
    Title,
    Input,
    Row,
    ButtonAdd,
    ButtonSave,
    ButtonDelete,
    MilestoneBox,
    MilestoneHeader,
    Table,
} from "./styles";
import { toast } from "react-toastify";

export const CronogramaEditor = () => {
    const token = localStorage.getItem("access_token");

    const [milestones, setMilestones] = useState<any[]>([]);
    const [cronograma, setCronograma] = useState<any[]>([]);
    const [eventDate, setEventDate] = useState<string>("");

    const load = async () => {
        try {
            const res = await api.get("/api/timeline");

            // 🔐 PROTEÇÃO TOTAL
            const apiMilestones = Array.isArray(res.data?.milestones)
                ? res.data.milestones
                : [];

            setMilestones(apiMilestones);
            setCronograma(apiMilestones);

            // 🔐 só seta se for válida
            if (res.data?.eventDate) {
                setEventDate(res.data.eventDate.slice(0, 16));
            } else {
                setEventDate("");
            }

        } catch (err) {
            console.error("Erro ao carregar cronograma:", err);
            setMilestones([]);
            setCronograma([]);
            setEventDate("");
        }
    };

    const save = async () => {
        if (!eventDate) {
            toast.error("Informe a data do evento");
            return;
        }

        const dataToSend = {
            eventDate: new Date(eventDate).toISOString(),
            milestones: milestones.map(m => ({
                ...m,
                date: m.date ? new Date(m.date).toISOString() : null,
            })),
        };

        await api.post("/api/timeline", dataToSend);
        toast.success("Salvo com sucesso!");
        load();
    };

    const addMilestone = () => {
        setMilestones([...milestones, { title: "", date: "", note: "" }]);
    };

    const updateField = (i: number, field: string, value: string) => {
        const copy = [...milestones];
        copy[i] = { ...copy[i], [field]: value };
        setMilestones(copy);
    };

    const removeMilestone = (i: number) => {
        setMilestones(milestones.filter((_, index) => index !== i));
    };

    useEffect(() => {
        load();
    }, []);

    return (
            <Container>

                <Title>📅 Editor de Cronograma</Title>

                <Card>
                    <label>Data do Evento</label>
                    <Input
                        type="datetime-local"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </Card>

                <Title>📝 Marcos do Evento</Title>

                {milestones.map((m, i) => (
                    <MilestoneBox key={i}>
                        <MilestoneHeader>
                            <strong>Marco #{i + 1}</strong>
                            <ButtonDelete onClick={() => removeMilestone(i)}>
                                Remover
                            </ButtonDelete>
                        </MilestoneHeader>

                        <Row>
                            <Input
                                placeholder="Título"
                                value={m.title}
                                onChange={(e) => updateField(i, "title", e.target.value)}
                            />

                            <Input
                                type="date"
                                value={m.date || ""}
                                onChange={(e) => updateField(i, "date", e.target.value)}
                            />
                        </Row>

                        <Input
                            placeholder="Nota"
                            value={m.note || ""}
                            onChange={(e) => updateField(i, "note", e.target.value)}
                        />
                    </MilestoneBox>
                ))}

                <ButtonAdd onClick={addMilestone}>+ Adicionar Marco</ButtonAdd>
                <ButtonSave onClick={save}>💾 Salvar Alterações</ButtonSave>

                <Table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Data</th>
                            <th>Nota</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cronograma.map((e) => (
                            <tr key={e.id}>
                                <td>{e.title}</td>
                                <td>{new Date(e.date).toLocaleDateString("pt-BR")}</td>
                                <td>{e.note}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>

    );
};
