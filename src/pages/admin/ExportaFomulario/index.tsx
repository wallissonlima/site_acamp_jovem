import { DashboardAdmin } from "../DashboardAdmin";
import { BackButton, ButtonEditor, Container, DeleteButton, Header, Table } from "./styles";
import { useState, useEffect } from "react";
import api from "../../../config/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

export const ExportaFormulario = () => {
    const token = localStorage.getItem("access_token");
    const [formulario, setFormulario] = useState<any[]>([]);

    const fetchFormulario = async () => {
        if (!token) return;
        try {
            const res = await api.get("/api/formulario", {
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
            "Data Nascimento": f.dataNascimento ? new Date(f.dataNascimento).toLocaleDateString() : "",
            "Nome Responsável": f.nomeResponsavel ?? "",
            "Telefone Responsável": f.telefoneResponsavel ?? "",
            "Tamanho Camiseta": f.tamanhoCamiseta ?? "",
            "Autorização Imagem": f.autorizacaoImagem ?? "",
            "Alergia / Restrição": f.alergiaRestricao ?? "",
            Descrição: f.descricao ?? "",
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Formularios");

        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "formularios.xlsx");
    };

    const deletarTudo = async () => {
        if (!confirm("Deseja realmente apagar todos os formulários?")) return;
        try {
            await api.delete("/api/formulario/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchFormulario();
            toast("Todos os formulários foram excluídos!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao excluir todos os formulários");
        }
    };


    useEffect(() => {
        fetchFormulario();
    }, []);

    return (
        <DashboardAdmin>
            <Container>
                <Header>
                    <h2>
                        Exporta Formulário
                    </h2>
                    <ButtonEditor>
                        <div>
                            <BackButton onClick={exportToExcel}>Exporta</BackButton>
                        </div>
                        <div>
                            <DeleteButton onClick={deletarTudo}>Limpa o banco</DeleteButton>
                        </div>
                    </ButtonEditor>
                </Header>
                <Table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Data nascimento</th>
                            <th>Telefone</th>
                            <th>Nome Credencial</th>
                        </tr>
                    </thead>

                    <tbody>
                        {formulario.map((e) => (
                            <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.dataNascimento}</td>
                                <td>{e.telefone}</td>
                                <td>{e.nomeCredencial}</td>



                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </DashboardAdmin>
    );
};
