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
import { toast } from "react-toastify";

export function EventosEditor() {
    // Token salvo no navegador para autenticação
    const token = localStorage.getItem("access_token");

    // Lista de eventos carregados da API
    const [eventos, setEventos] = useState([]);

    // Arquivo de imagem selecionado pelo usuário
    const [file, setFile] = useState<File | null>(null);

    // Estado do formulário de criação/edição
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
    });

    // Carrega os eventos ao abrir a página
    useEffect(() => {
        fetchEventos();
    }, []);

    // Busca todos os eventos cadastrados na API
    const fetchEventos = async () => {
        const res = await api.get("/api/eventos");

        const eventosArray = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.eventos)
                ? res.data.eventos
                : [];

        setEventos(eventosArray);
    };



    // Converte um arquivo (File) em base64 sem o prefixo "data:image/png..."
    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            // Quando terminar a leitura
            reader.onload = () => {
                const result = reader.result as string;

                // Divide e remove o prefixo do base64
                const base64 = result.split(',')[1];
                resolve(base64);
            };

            reader.onerror = (err) => reject(err);

            // Lê o arquivo como dataURL
            reader.readAsDataURL(file);
        });
    }

    // Envia o formulário + imagem para a API
    const salvar = async () => {
        try {
            if (!file) return alert("Selecione uma imagem!");

            // Converte o arquivo antes de enviar
            const base64 = await fileToBase64(file);

            // Objeto que será enviado ao backend
            const payload = {
                titulo: form.titulo,
                descricao: form.descricao,
                dataInicio: form.dataInicio || undefined,
                dataFim: form.dataFim || undefined,
                fileName: file.name,
                fileType: file.type,
                base64: base64, // somente o base64 limpo
            };

            // Envio para rota protegida
            await api.post('/api/eventos/upload', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success("Salvo com sucesso!");
            // Atualiza lista
            fetchEventos();

            // Limpa formulário
            setForm({ titulo: "", descricao: "", dataInicio: "", dataFim: "" });
            setFile(null);

        } catch (err) {
            console.error(err);
            toast.error('Erro ao enviar evento');
        }
    };

    // Remove um evento pelo ID
    const deletar = async (id: number) => {
        if (!confirm("Excluir evento?")) return;

        await api.delete(`/api/eventos/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Deletado com sucesso!");
        // Atualiza lista
        fetchEventos();
    };

    return (
        <Container>

            <Header>Gerenciar Eventos</Header>

            {/* Formulário para criar evento */}
            <FormCard>
                <Input
                    placeholder="Título"
                    value={form.titulo}
                    onChange={e => setForm({ ...form, titulo: e.target.value })}
                />

                <Input
                    type="date"
                    value={form.dataInicio}
                    onChange={e => setForm({ ...form, dataInicio: e.target.value })}
                />

                <Input
                    type="date"
                    value={form.dataFim}
                    onChange={e => setForm({ ...form, dataFim: e.target.value })}
                />

                <TextArea
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={e => setForm({ ...form, descricao: e.target.value })}
                />

                {/* Input de imagem */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFile(e.target.files?.[0] || null)}
                />

                <ButtonSalvar onClick={salvar}>Salvar Evento</ButtonSalvar>
            </FormCard>

            {/* Tabela com eventos existentes */}
            <Table>
                <thead>
                    <tr>
                        <th>Imagem</th>
                        <th>Título</th>
                        <th>Data início</th>
                        <th>Data fim</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {Array.isArray(eventos) && eventos.map(e => (
                        <tr key={e.id}>
                            <td><Img src={e.imagem || ''} /></td>
                            <td>{e.titulo}</td>
                            <td>{e.dataInicio ? new Date(e.dataInicio).toLocaleDateString("pt-BR") : '-'}</td>
                            <td>{e.dataFim ? new Date(e.dataFim).toLocaleDateString("pt-BR") : '-'}</td>
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
    );
}

