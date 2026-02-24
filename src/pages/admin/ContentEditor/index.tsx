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
import { toast } from "react-toastify";
import { adminService } from "../../../services/admin";


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

    // 🔹 Buscar status
    useEffect(() => {
        async function carregarStatus() {
            try {
                const data = await adminService.buscarStatus();

                setLimiteParticipantes(data.limiteParticipantes ?? 0);
                setLimiteServos(data.limiteServos ?? 0);
                setTotalParticipantes(data.totalParticipantes ?? 0);
                setTotalServos(data.totalServos ?? 0);
                setAtivo(data.ativo ?? true);
            } catch (error) {
                console.error("Erro ao carregar status", error);
                toast.error("Erro ao carregar status");
            }
        }

        carregarStatus();
    }, []);

    // 🔹 Buscar valores
    useEffect(() => {
        async function carregarValores() {
            try {
                const data = await adminService.buscarValores();

                setValorParticipantes(data.priceParticipante ?? 0);
                setValorServos(data.priceServo ?? 0);
            } catch (error) {
                console.error("Erro ao carregar valores", error);
                toast.error("Erro ao carregar valores");
            }
        }

        carregarValores();
    }, []);

    async function salvarLimites() {
        try {
            setLoading(true);

            await adminService.salvarLimites({
                limiteParticipantes,
                limiteServos,
                ativo,
            });

            toast.success("Configurações salvas com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar configurações");
        } finally {
            setLoading(false);
        }
    }

    async function salvarValores() {
        try {
            setLoading(true);

            await adminService.salvarValores({
                priceParticipante: valorParticipantes,
                priceServo: valorServos,
            });

            toast.success("Valores salvos com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar valores");
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
                        <p>
                            <strong>Participantes:</strong> {totalParticipantes}
                            {limiteParticipantes > 0 &&
                                ` / ${limiteParticipantes}`}
                        </p>

                        <p>
                            <strong>Servos:</strong> {totalServos}
                            {limiteServos > 0 && ` / ${limiteServos}`}
                        </p>
                    </div>

                    <div>
                        <p>
                            <strong>Valor Participantes:</strong>{" "}
                            {formatCurrency(valorParticipantes)}
                        </p>

                        <p>
                            <strong>Valor Servos:</strong>{" "}
                            {formatCurrency(valorServos)}
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
                                onChange={(e) =>
                                    setLimiteParticipantes(Number(e.target.value))
                                }
                            />
                        </Field>

                        <Field>
                            <label>Limite servos</label>
                            <input
                                type="number"
                                value={limiteServos}
                                onChange={(e) =>
                                    setLimiteServos(Number(e.target.value))
                                }
                            />
                        </Field>

                        <SectionButton onClick={salvarLimites} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar limites"}
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
                                    const numericValue = e.target.value.replace(/\D/g, "");
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
                                    const numericValue = e.target.value.replace(/\D/g, "");
                                    setValorServos(Number(numericValue) / 100);
                                }}
                            />
                        </Field>

                        <SectionButton onClick={salvarValores} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar valores"}
                        </SectionButton>
                    </Section>
                </FormCard>
            </Container>
        </DashboardAdmin>
    );
}