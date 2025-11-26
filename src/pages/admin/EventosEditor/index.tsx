import { useEffect, useState } from "react";
import api from "../../../config/api";
import {
    Container,
    FormCard,
    Input,
    TextArea,
    ButtonSalvar,
    Table,
    Img,
    DeleteButton,
    Header,
} from "./styles";
import { DashboardAdmin } from "../DashboardAdmin";

export function EventosEditor() {
    const token = localStorage.getItem("access_token");
    const [eventos, setEventos] = useState([]);
    const [file, setFile] = useState<File | null>(null);

    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
    });

    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        const res = await api.get("/eventos");
        setEventos(res.data);
    };

    // converte File -> base64 (sem prefixo data:)
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                // result será "data:<type>;base64,AAA..."
                // removemos o prefixo
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    const salvar = async () => {
        try {
            if (!file) return alert("Selecione uma imagem!");

            // converte
            const base64 = await fileToBase64(file);

            // prepara payload JSON
            const payload = {
                titulo: form.titulo,
                descricao: form.descricao,
                dataInicio: form.dataInicio || undefined,
                dataFim: form.dataFim || undefined,
                fileName: file.name,
                fileType: file.type,
                base64: base64, // sem data: prefix
            };

            await api.post('/eventos/upload', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            fetchEventos();
            setForm({ titulo: "", descricao: "", dataInicio: "", dataFim: "" });
            setFile(null);
        } catch (err) {
            console.error(err);
            alert('Erro ao enviar evento');
        }
    };

    const deletar = async (id: number) => {
        if (!confirm("Excluir evento?")) return;
        await api.delete(`/eventos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchEventos();
    };

    return (
        <DashboardAdmin>
            <Container>

                <Header>Gerenciar Eventos</Header>

                <FormCard>
                    <Input placeholder="Título"
                        value={form.titulo}
                        onChange={e => setForm({ ...form, titulo: e.target.value })}
                    />

                    <Input type="date"
                        value={form.dataInicio}
                        onChange={e => setForm({ ...form, dataInicio: e.target.value })}
                    />

                    <Input type="date"
                        value={form.dataFim}
                        onChange={e => setForm({ ...form, dataFim: e.target.value })}
                    />

                    <TextArea placeholder="Descrição"
                        value={form.descricao}
                        onChange={e => setForm({ ...form, descricao: e.target.value })}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setFile(e.target.files?.[0] || null)}
                    />

                    <ButtonSalvar onClick={salvar}>Salvar Evento</ButtonSalvar>
                </FormCard>


                <Table>
                    <thead>
                        <tr>
                            <th>Imagem</th><th>Título</th><th>Datas</th><th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {eventos.map((e: any) => (
                            <tr key={e.id}>
                                <td><Img src={e.imagem || ''} /></td>
                                <td>{e.titulo}</td>
                                <td>{e.dataInicio} → {e.dataFim}</td>

                                <td>
                                    <DeleteButton onClick={() => deletar(e.id)}>
                                        Excluir
                                    </DeleteButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Container>
        </DashboardAdmin>
    );
}
