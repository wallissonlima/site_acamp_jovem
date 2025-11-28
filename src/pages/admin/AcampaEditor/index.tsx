import React, { useEffect, useState } from "react";
import api from "../../config/api"; // ajuste caminho
import styled from "styled-components";

const Form = styled.form`
  max-width: 900px;
  margin: 20px auto;
  display: grid;
  gap: 14px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`font-weight:600;`;
const Input = styled.input`padding:10px;border-radius:8px;border:1px solid #ddd;`;
const Textarea = styled.textarea`padding:10px;border-radius:8px;border:1px solid #ddd;min-height:90px;`;
const Btn = styled.button`background:#00bfa5;color:#fff;padding:10px 14px;border-radius:10px;border:none;cursor:pointer;`;

type ContentMap = Record<string, { id?: number; value?: string }>;

export function AdminAcampaEditor() {
  const page = "home";
  const keys = [
    "acampa_image_left",
    "acampa_title",
    "acampa_short",
    "acampa_button",
    "acampa_image_right",
    "acampa_about_title",
    "acampa_about_text",
  ];

  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/content", { params: { page } })
      .then((res) => {
        // res.data assumed to be map key -> contentBlock
        setContent(res.data || {});
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // convert File -> base64 (no data: prefix)
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1]); // without prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // preview src from content[key].value (may be dataURI or url)
  const getPreviewSrc = (key: string) => {
    const v = content[key]?.value;
    if (!v) return "";
    // if already stored without data: prefix maybe stored as dataURI or full URL
    if (v.startsWith("data:") || v.startsWith("http")) return v;
    // assume stored base64 without prefix: try jpeg
    return `data:image/jpeg;base64,${v}`;
  };

  // handler for text fields
  const handleText = (key: string, val: string) => {
    setContent((c) => ({ ...c, [key]: { ...(c[key] ?? {}), value: val } }));
  };

  // handler for file inputs
  const handleFile = async (key: string, file?: File) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    // store as data URI to preview easily and save full dataURI to backend if you prefer.
    // here we store the raw base64 string (no prefix) and backend will build dataURI if desired.
    setContent((c) => ({ ...c, [key]: { ...(c[key] ?? {}), value: base64 } }));
  };

  // submit -> build payload array: { key, page, value, type }
  const save = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      // map to payload (detect image keys)
      const payload = keys.map((key) => {
        const val = content[key]?.value ?? "";
        const isImage = key.includes("image") || key.includes("img");
        return {
          key,
          page,
          value: val,
          type: isImage ? "image" : "text",
          id: content[key]?.id ?? undefined, // optional
        };
      });

      // POST to /content/bulk (server should upsert these)
      await api.post("/content/bulk", payload);
      alert("Conteúdo salvo com sucesso!");
      // refetch
      const res = await api.get("/content", { params: { page } });
      setContent(res.data || {});
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar conteúdo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={save}>
      <h2>Editar seção Acampa</h2>

      <Row>
        <div>
          <Label>Imagem esquerda</Label>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={(ev) => handleFile("acampa_image_left", ev.target.files?.[0])}
            />
            <div style={{ width: 120, height: 80, overflow: "hidden", borderRadius: 8 }}>
              {getPreviewSrc("acampa_image_left") ? (
                <img src={getPreviewSrc("acampa_image_left")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ padding: 8, color: "#888" }}>Sem imagem</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label>Imagem direita</Label>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={(ev) => handleFile("acampa_image_right", ev.target.files?.[0])}
            />
            <div style={{ width: 120, height: 80, overflow: "hidden", borderRadius: 8 }}>
              {getPreviewSrc("acampa_image_right") ? (
                <img src={getPreviewSrc("acampa_image_right")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ padding: 8, color: "#888" }}>Sem imagem</div>
              )}
            </div>
          </div>
        </div>
      </Row>

      <Label>Título principal</Label>
      <Input value={content.acampa_title?.value || ""} onChange={(e) => handleText("acampa_title", e.target.value)} />

      <Label>Texto curto</Label>
      <Textarea value={content.acampa_short?.value || ""} onChange={(e) => handleText("acampa_short", e.target.value)} />

      <Label>Texto do botão</Label>
      <Input value={content.acampa_button?.value || ""} onChange={(e) => handleText("acampa_button", e.target.value)} />

      <Label>Título secundário</Label>
      <Input value={content.acampa_about_title?.value || ""} onChange={(e) => handleText("acampa_about_title", e.target.value)} />

      <Label>Texto secundário</Label>
      <Textarea value={content.acampa_about_text?.value || ""} onChange={(e) => handleText("acampa_about_text", e.target.value)} />

      <div style={{ display: "flex", gap: 10 }}>
        <Btn type="submit" disabled={loading}>{loading ? "Salvando..." : "Salvar"}</Btn>
        <Btn type="button" onClick={() => window.location.reload()}>Cancelar</Btn>
      </div>
    </Form>
  );
}
