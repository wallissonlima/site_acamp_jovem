import { useEffect, useState } from "react";
import { DashboardAdmin } from "../DashboardAdmin";
import {
    Container,
    FormCard,
    Header,
    Field,
    CheckboxRow,
    Section,
    SectionTitle,
    SectionButton,
} from "./styles";
import axios from "axios";
import { toast } from "react-toastify";

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}


export function ContentEditor() {
    const [limiteParticipantes, setLimiteParticipantes] = useState(0);
    const [limiteServos, setLimiteServos] = useState(0);
    const [valorParticipantes, setValorParticipantes] = useState(0);
    const [valorServos, setValorServos] = useState(0);
    const [ativo, setAtivo] = useState(true);
    const [loading, setLoading] = useState(false);

    const [totalParticipantes, setTotalParticipantes] = useState(0);
    const [totalServos, setTotalServos] = useState(0);

    const [valoresCarregados, setValoresCarregados] = useState(false);


    // 🔹 Buscar status
    useEffect(() => {
        async function carregarStatus() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/limite-inscricao/status"
                );

                setLimiteParticipantes(response.data.limiteParticipantes ?? 0);
                setLimiteServos(response.data.limiteServos ?? 0);

                setTotalParticipantes(response.data.totalParticipantes ?? 0);
                setTotalServos(response.data.totalServos ?? 0);

                setAtivo(response.data.ativo ?? true);
            } catch (error) {
                console.error("Erro ao carregar status", error);
            }
        }

        carregarStatus();
    }, []);


    // 🔹 Buscar valores da inscrição
    useEffect(() => {
        async function carregarValores() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/valor-incricao"
                );

                setValorParticipantes(response.data.priceParticipante ?? 0);
                setValorServos(response.data.priceServo ?? 0);

                setValoresCarregados(true);
            } catch (error) {
                console.error("Erro ao carregar valores", error);
                setValoresCarregados(false);
            }
        }

        carregarValores();
    }, []);


    //salvar limites
    async function salvarLimites() {
        try {
            setLoading(true);

            await axios.put("http://localhost:3000/api/limite-inscricao", {
                limiteParticipantes,
                limiteServos,
                ativo,
            });

            toast("Configurações salvas com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar configurações");
        } finally {
            setLoading(false);
        }
    }

    //salvar valores
    async function salvarValores() {
        try {

            await axios.put("http://localhost:3000/api/valor-incricao", {
                priceParticipante: valorParticipantes,
                priceServo: valorServos,
            });
            toast("Valores salvos com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar Valores");
        } finally {
            setLoading(false);
        }
    }


    return (
        <DashboardAdmin>
            <Container>
                <Header>Configurações das Inscrições</Header>

                <FormCard>
                    <div>

                        {/* STATUS PARTICIPANTES */}
                        <p>
                            <strong>Participantes:</strong>{" "}
                            {totalParticipantes}
                            {limiteParticipantes > 0 && ` / ${limiteParticipantes}`}
                        </p>

                        {/* STATUS SERVOS */}
                        <p>
                            <strong>Servos:</strong>{" "}
                            {totalServos}
                            {limiteServos > 0 && ` / ${limiteServos}`}
                        </p>

                    </div>
                    <div>

                        {/* VALOR PARTICIPANTES */}
                        <p>
                            <strong>Valor Participantes:</strong>{" "}
                            R$ {formatCurrency(valorParticipantes)}
                        </p>

                        {/* VALOR SERVOS */}
                        <p>
                            <strong>Valor Servos:</strong>{" "}
                            R$ {formatCurrency(valorServos)}
                        </p>
                    </div>

                    <CheckboxRow>
                        <input
                            type="checkbox"
                            checked={ativo}
                            onChange={(e) => setAtivo(e.target.checked)}
                        />
                        Inscrições ativas
                    </CheckboxRow>

                    {/* 🔹 LIMITES */}
                    <Section>
                        <SectionTitle>Limites</SectionTitle>

                        <Field>
                            <label>Limite participantes</label>
                            <input
                                type="number"
                                value={limiteParticipantes}
                                onChange={(e) => setLimiteParticipantes(+e.target.value)}
                            />
                        </Field>

                        <Field>
                            <label>Limite servos</label>
                            <input
                                type="number"
                                value={limiteServos}
                                onChange={(e) => setLimiteServos(+e.target.value)}
                            />
                        </Field>

                        <SectionButton onClick={salvarLimites} disabled={loading}>
                            Salvar limites
                        </SectionButton>
                    </Section>

                    {/* 🔹 VALORES */}
                    <Section>
                        <SectionTitle>Valores</SectionTitle>

                        <Field>
                            <label>Valor participantes</label>
                            <input
                                type="text"
                                value={formatCurrency(valorParticipantes)}
                                onChange={(e) => {
                                    const numericValue = e.target.value
                                        .replace(/\D/g, "");
                                    setValorParticipantes(Number(numericValue) / 100);
                                }}
                            />
                        </Field>

                        <Field>
                            <label>Valor servos</label>
                            <input
                                type="text"
                                value={formatCurrency(valorServos)}
                                onChange={(e) => {
                                    const numericValue = e.target.value
                                        .replace(/\D/g, "");
                                    setValorServos(Number(numericValue) / 100);
                                }}
                            />
                        </Field>


                        <SectionButton onClick={salvarValores}>
                            Salvar valores
                        </SectionButton>
                    </Section>
                </FormCard>
            </Container>
        </DashboardAdmin>
    );
}
