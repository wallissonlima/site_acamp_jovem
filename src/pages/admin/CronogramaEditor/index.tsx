import { useEffect, useState } from "react";
import api from "../../../config/api";
import { DashboardAdmin } from "../DashboardAdmin";
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
    DeleteButton,
} from "./styles";

export const CronogramaEditor = () => {
    const token = localStorage.getItem("access_token");
    const [milestones, setMilestones] = useState([]);
    const [eventDate, setEventDate] = useState("");
    const [cronograma, setCronograma] = useState([]);

    const load = async () => {
        const res = await api.get("/api/timeline");
        setMilestones(res.data.milestones);
        setCronograma(res.data.milestones);

        const formatted = res.data.eventDate
            ? res.data.eventDate.slice(0, 16)
            : "";

        setEventDate(formatted);
    };

    const save = async () => {
        const dataToSend = {
            eventDate: new Date(eventDate).toISOString(),
            milestones: milestones.map(m => ({
                ...m,
                date: new Date(m.date).toISOString()
            }))
        };

        await api.post("/api/timeline", dataToSend);
        load();
    };

    const addMilestone = () => {
        setMilestones([...milestones, { title: "", date: "", note: "" }]);
    };

    const updateField = (i, field, value) => {
        const copy = [...milestones];
        copy[i][field] = value;
        setMilestones(copy);
    };

    const removeMilestone = (i) => {
        setMilestones(milestones.filter((_, index) => index !== i));
    };

    useEffect(() => { load(); }, []);

    const deletar = async (id: number) => {
        if (!confirm("Excluir cronograma?")) return;
        await api.delete(`/api/timeline/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setCronograma([]);
    };

    return (
        <DashboardAdmin>
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
                            <ButtonDelete onClick={() => removeMilestone(i)}>Remover</ButtonDelete>
                        </MilestoneHeader>

                        <Row>
                            <Input placeholder="Título"
                                value={m.title}
                                onChange={(e) => updateField(i, "title", e.target.value)} />

                            <Input type="date"
                                value={m.date}
                                onChange={(e) => updateField(i, "date", e.target.value)} />
                        </Row>

                        <Input placeholder="Nota"
                            value={m.note}
                            onChange={(e) => updateField(i, "note", e.target.value)} />
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
                            {/* <th>Ações</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {cronograma.map((e: any) => (
                            <tr key={e.id}>
                                <td>{e.title}</td>
                                 <td>{new Date(e.date).toLocaleDateString("pt-BR")}</td>
                                <td>{e.note} </td>

                                {/* <td>
                                    <DeleteButton onClick={() => deletar(e.id)}>
                                        Excluir
                                    </DeleteButton>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </DashboardAdmin>
    );
};
