import { BackButton, ButtonEditor, Container, DeleteButton, Header, Table } from "./styles";
import { useState, useEffect } from "react";
import api from "../../../config/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

//formata o CPF
function formatCPF(value: any) {
    if (!value) return "";
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

//renderiza o status do pagamento
function renderStatus(status: string) {
    switch (status) {
        case "APROVADO":
            return <span style={{ color: "green", fontWeight: 600 }}>Aprovado</span>;

        case "EM_PROCESSAMENTO":
            return <span style={{ color: "orange", fontWeight: 600 }}>Em processamento</span>;

        case "NAO_APROVADO":
            return <span style={{ color: "red", fontWeight: 600 }}>Não aprovado</span>;

        default:
            return <span>-</span>;
    }
}


export const ExportaServos = () => {
    const token = localStorage.getItem("access_token");
    const [formulario, setFormulario] = useState<any[]>([]);

    const fetchFormulario = async () => {
        if (!token) return;
        try {
            const res = await api.get("/api/formularioServos", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormulario(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // 🔹 Exporta para Excel
    const exportToExcel = () => {
        if (formulario.length === 0) {
            alert("Não há dados para exportar");
            return;
        }

        // Cria uma cópia dos dados para não incluir campos desnecessários
        const data = formulario.map(f => ({
            Nome: f.name,
            Email: f.email,
            Telefone: f.telefone ?? "",
            "Nome Credencial": f.nomeCredencial,
            "CPF": formatCPF(f.cpf),
            "Tamanho Camiseta": f.tamanhoCamiseta ?? "",
            "Alergia / Restrição": f.alergiaRestricao ?? "",
            "Status Pagamento": f.statusPagamento ?? "",
            Descrição: f.descricao ?? "",
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Formularios");

        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "formularios.xlsx");
    };

    //Deleta um servos
    const deletar = async (id: string) => {
        if (!confirm("Deseja realmente apagar servo?")) return;
        try {
            await api.delete(`/api/formularioServos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFormulario();
            toast("Servo excluídos com sucesso");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao excluir o servo");
        }
    };
    useEffect(() => {
        fetchFormulario();
    }, []);

    return (
        <Container>
            <Header>
                <h2>
                    Exporta Formulário Servos
                </h2>
                <ButtonEditor>
                    <div>
                        <BackButton onClick={exportToExcel}>Exporta</BackButton>
                    </div>
                    {/* <div>
                            <DeleteButton onClick={deletarTudo}>Limpa o banco</DeleteButton>
                        </div> */}
                </ButtonEditor>
            </Header>
            <Table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Nome Credencial</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {formulario.map((e) => (
                        <tr key={e.id}>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{formatCPF(e.cpf)}</td>
                            <td>{e.nomeCredencial}</td>
                            <td>{renderStatus(e.statusPagamento)}</td>
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
};
