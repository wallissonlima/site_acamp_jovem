import React, { useEffect, useState } from "react";

import { DashboardAdmin } from "../../DashboardAdmin"; // Layout/admin wrapper
import {
    Container,
    ItemCard,
    PreviewImg,
    ButtonAdd,
    ButtonSave,
    ButtonDelete,
    InputFile,
    InputText,
    Grid
} from "./styles"; // Componentes estilizados
import api from "../../../../config/api"; // Instância do Axios configurada
import { toast } from "react-toastify";

// Tipo do item do carousel
type Item = {
    id?: number; // ID do banco
    tempId?: string; // ID temporário para novos itens ainda não salvos
    altText?: string; // Texto alternativo da imagem
    src?: string; // URL da imagem ou Base64 para preview
    newImage?: File | null; // Arquivo selecionado no editor (antes de salvar)
    isNew?: boolean; // Flag para novos itens
    sortOrder?: number; // Ordem do item
};

export const CarouselEditor: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]); // Estado com todos os itens do carousel

    // Função para carregar itens do backend
    const load = async () => {
        const res = await api.get("/api/carousel");

        const list = Array.isArray(res.data)
            ? res.data
            : res.data.items ?? res.data.carousel ?? [];

        const mapped = list.map((i: any) => ({
            id: i.id,
            altText: i.altText,
            src: i.imageBase64
                ? `data:${i.mimeType};base64,${i.imageBase64}`
                : "",
            sortOrder: i.sortOrder,
            isNew: false,
            newImage: null,
        }));

        setItems(mapped);
    };


    // Carregar os itens assim que o componente monta
    useEffect(() => { load(); }, []);

    // Função para atualizar campos de texto ou número
    const handleChange = (key: string | number, field: string, value: any) => {
        setItems(prev => prev.map(it => {
            // Identifica o item pelo id ou tempId
            const match = (it.id && it.id === key) || (it.tempId && it.tempId === key);
            if (!match) return it; // Se não for o item, retorna inalterado
            return { ...it, [field]: value }; // Atualiza o campo desejado
        }));
    };

    // Função para atualizar imagem do item
    const handleImage = (key: string | number, file?: File) => {
        if (!file) return;
        const preview = URL.createObjectURL(file); // Cria preview temporário
        setItems(prev => prev.map(it => {
            const match = (it.id && it.id === key) || (it.tempId && it.tempId === key);
            if (!match) return it;
            return { ...it, newImage: file, src: preview }; // Atualiza preview e arquivo
        }));
    };

    // Adiciona um novo item ao carousel
    const addItem = () => {
        const tempId = `t_${Date.now()}`; // Gera ID temporário único
        setItems(prev => [
            ...prev,
            { tempId, altText: "", src: "", newImage: null, isNew: true, sortOrder: prev.length },
        ]);
    };

    // Função para remover item do estado e do banco
    const removeItem = async (key: string | number, id?: number) => {
        if (id) {
            try {
                await api.delete(`/api/carousel/${id}`);
                toast.success("Item deletado com sucesso!");
            } catch (err) {
                console.error("Erro ao deletar item:", err);
                toast.error("Não foi possível deletar o item do servidor.");
                return;
            }
        }

        setItems(prev => prev.filter(it => !((it.id && it.id === key) || (it.tempId && it.tempId === key))));
    };



    // Função para salvar alterações no backend
    const save = async () => {
        try {
            const fd = new FormData(); // FormData para enviar arquivos
            // Monta payload com dados do item
            const payload = items.map(it => ({
                id: it.id,
                tempId: it.tempId,
                altText: it.altText,
                sortOrder: it.sortOrder ?? 0,
                isNew: it.isNew ?? false,
            }));

            fd.append("items", JSON.stringify(payload)); // Envia dados do item

            // Adiciona arquivos ao FormData
            items.forEach(it => {
                const key = `file-${it.id ?? it.tempId}`; // Nome do campo
                if (it.newImage) {
                    fd.append(key, it.newImage, (it.newImage as File).name);
                }
            });

            // Chamada POST para salvar
            await api.post("/api/carousel/save", fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Salvo com sucesso!");
            load(); // Recarrega itens do backend
        } catch (err) {
            console.error(err);
            toast.error("Erro ao salvar. Veja console.");
        }
    };

    return (
        <DashboardAdmin>
            <Container>
                <h1>Editor do Carrossel</h1>

                <ButtonAdd onClick={addItem}>+ Adicionar Banner</ButtonAdd>

                <Grid>
                    {Array.isArray(items) && items.map(item => {
                        const key = (item.id ?? item.tempId) as any;
                        return (
                            <ItemCard key={key}>
                                {item.src ? (
                                    <PreviewImg src={item.src} alt="" />
                                ) : <div style={{ height: 150, background: '#0f1220', borderRadius: 8 }} />}

                                <InputFile
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImage(key, file);
                                    }}
                                />

                                <InputText
                                    value={item.altText}
                                    placeholder="Texto alternativo"
                                    onChange={(e) => handleChange(key, "altText", e.target.value)}
                                />

                                <InputText
                                    type="number"
                                    value={item.sortOrder ?? 0}
                                    onChange={(e) => handleChange(key, "sortOrder", Number(e.target.value))}
                                />

                                <ButtonDelete onClick={() => removeItem(key, item.id)}>Remover</ButtonDelete>

                            </ItemCard>
                        );
                    })}
                </Grid>

                <ButtonSave onClick={save}>Salvar alterações</ButtonSave>
            </Container>
        </DashboardAdmin>
    );
};
