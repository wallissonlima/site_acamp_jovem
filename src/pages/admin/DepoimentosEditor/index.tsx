import { useEffect, useState } from "react";
import api from "../../../config/api";
import {
    PageContainer,
    Title,
    AddBox,
    TextArea,
    Button,
    List,
    ItemCard,
    DeleteBtn
} from "./styles";

export const DepoimentosEditor = () => {
    const [depoimentos, setDepoimentos] = useState([]);
    const [novoTexto, setNovoTexto] = useState("");

    useEffect(() => {
        loadDepoimentos();
    }, []);

    const loadDepoimentos = async () => {
        const res = await api.get("/api/depoimentos");

        const depoArray = Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data.depoimentos)
                ? res.data.depoimentos
                : [];

        setDepoimentos(depoArray);
    };



    const salvarNovo = async () => {
        if (!novoTexto.trim()) return alert("Digite o depoimento");

        await api.post("/api/depoimentos", { texto: novoTexto });
        setNovoTexto("");
        loadDepoimentos();
    };

    const atualizar = async (id, texto) => {
        await api.put(`/api/depoimentos/${id}`, { texto });
    };

    const excluir = async (id) => {
        if (!confirm("Deseja realmente deletar?")) return;
        await api.delete(`/api/depoimentos/${id}`);
        loadDepoimentos();
    };

    return (

        <PageContainer>

            <Title>Gerenciar Depoimentos</Title>

            <AddBox>
                <TextArea
                    placeholder="Escreva um novo depoimento..."
                    value={novoTexto}
                    onChange={(e) => setNovoTexto(e.target.value)}
                />
                <Button onClick={salvarNovo}>+ Adicionar</Button>
            </AddBox>

            <List>
                {Array.isArray(depoimentos) && depoimentos.length > 0 ? (
                    depoimentos.map(d => (
                        <ItemCard key={d.id}>
                            <TextArea
                                value={d.texto}
                                onChange={(e) => atualizar(d.id, e.target.value)}
                            />
                            <DeleteBtn onClick={() => excluir(d.id)}>
                                Remover
                            </DeleteBtn>
                        </ItemCard>
                    ))
                ) : (
                    <p>Nenhum depoimento encontrado.</p>
                )}
            </List>

        </PageContainer>

    );
};
