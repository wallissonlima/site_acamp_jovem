import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import { DashboardAdmin } from "../DashboardAdmin";

import {
    Form,
    Row,
    Label,
    Input,
    Textarea,
    Btn,
    PreviewBox,
    FileLine,
    Table,
    Container,
    Img
} from "./styles";
import axios from "axios";
import { toast } from "react-toastify";

type ContentMap = Record<string, { id?: number; value?: string }>;

export const HomeEditor = () => {

    const page = "home";
    const [eventos, setEventos] = useState([]);
    const keys = [
        "acampa_image_left",
        "acampa_title",
        "acampa_short",
        "acampa_button",
        "acampa_image_right",
        "acampa_about_title",
        "acampa_about_text",
        "acampa_new_field"
    ];

    const [content, setContent] = useState<ContentMap>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadContent();
        loadEventos();
    }, []);

    const loadContent = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/content/admin", { params: { page } });
            setContent(res.data || {});
        } finally {
            setLoading(false);
        }
    };

    const loadEventos = async () => {
        const res = await api.get("/api/content/admin");
        setEventos(res.data);
    };


    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
        });
    }

    const getPreviewSrc = (key: string) => {
        const v = content[key]?.value;
        if (!v) return "";
        if (v.startsWith("data:") || v.startsWith("http")) return v;
        return `data:image/jpeg;base64,${v}`;
    };


    const handleText = (key: string, val: string) =>
        setContent((c) => ({ ...c, [key]: { ...(c[key] ?? {}), value: val } }));

    const handleFile = async (key: string, file?: File) => {
        if (!file) return;
        const base64 = await fileToBase64(file);
        setContent((c) => ({ ...c, [key]: { ...(c[key] ?? {}), value: base64 } }));
    };


    const save = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");

        const payload = keys.map((key) => ({
            page,
            key,
            type: key.includes("image") ? "image" : "text",
            value: content[key]?.value || "",
            title: content[key]?.title || "",
            description: content[key]?.description || "",
            id: content[key]?.id || undefined,
        }));

        try {
            await api.post("/api/content/admin", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast("Conteúdo salvo com sucesso!");
            loadContent();
            loadEventos();
        } catch {
            toast.error("Erro ao salvar conteúdo");
        } finally {
            setLoading(false);
        }
    };


    //   DELETE
    const handleDelete = async (id: number) => {
        if (!confirm("Excluir conteúdo?")) return;

        const token = localStorage.getItem("token"); // ← agora o token correto

        await api.delete(`/api/content/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        loadEventos();
    };



    return (
        <DashboardAdmin>
            <Container>
                <Form onSubmit={save}>
                    <h2 style={{ textAlign: "center" }}>Editar Seção - Acampa</h2>

                    <Row>
                        <FileLine>
                            <Label>Imagem Esquerda</Label>
                            <input type="file" accept="image/*"
                                onChange={(ev) => handleFile("acampa_image_left", ev.target.files?.[0])} />

                            <PreviewBox>
                                {getPreviewSrc("acampa_image_left")
                                    ? <img src={getPreviewSrc("acampa_image_left")} />
                                    : <span>Sem imagem</span>}
                            </PreviewBox>

                            <Label>Título</Label>
                            <Input
                                value={content.acampa_image_left?.title || ""}
                                onChange={(e) => setContent((c) => ({
                                    ...c,
                                    acampa_image_left: { ...(c.acampa_image_left ?? {}), title: e.target.value }
                                }))} />

                            <Label>Descrição</Label>
                            <Textarea
                                value={content.acampa_image_left?.description || ""}
                                onChange={(e) => setContent((c) => ({
                                    ...c,
                                    acampa_image_left: { ...(c.acampa_image_left ?? {}), description: e.target.value }
                                }))} />
                        </FileLine>


                        <FileLine>
                            <Label>Imagem Direita</Label>
                            <input type="file" accept="image/*"
                                onChange={(ev) => handleFile("acampa_image_right", ev.target.files?.[0])} />

                            <PreviewBox>
                                {getPreviewSrc("acampa_image_right")
                                    ? <img src={getPreviewSrc("acampa_image_right")} />
                                    : <span>Sem imagem</span>}
                            </PreviewBox>

                            <Label>Título</Label>
                            <Input
                                value={content.acampa_image_right?.title || ""}
                                onChange={(e) => setContent((c) => ({
                                    ...c,
                                    acampa_image_right: { ...(c.acampa_image_right ?? {}), title: e.target.value }
                                }))} />

                            <Label>Descrição</Label>
                            <Textarea
                                value={content.acampa_image_right?.description || ""}
                                onChange={(e) => setContent((c) => ({
                                    ...c,
                                    acampa_image_right: { ...(c.acampa_image_right ?? {}), description: e.target.value }
                                }))} />
                        </FileLine>
                    </Row>

                    <Btn type="submit" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                    </Btn>
                </Form>


                {/* ==== TABELA COM ITEMS QUE TEM IMG + TITLE + DESC ==== */}
                <div style={{ maxWidth: "900px", margin: "20px auto" }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {eventos
                                .filter(e => e.value && e.title && e.description)
                                .map(e => (
                                    <tr key={e.id}>
                                        <td>
                                            <Img src={
                                                e.value.startsWith("data:")
                                                    ? e.value
                                                    : `data:image/jpeg;base64,${e.value}`
                                            } />
                                        </td>

                                        <td>{e.title}</td>
                                        <td>{e.description}</td>

                                        <td>
                                            <button
                                                onClick={() => handleDelete(e.id)}
                                                style={{
                                                    background: "#e74c3c",
                                                    border: "none",
                                                    padding: "6px 12px",
                                                    borderRadius: 6,
                                                    color: "#fff",
                                                    cursor: "pointer"
                                                }}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </DashboardAdmin>
    );
};
