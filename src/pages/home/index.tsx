import { CustomCarousel } from "../../components/Carousel";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import {
    Content,
    CustomButton,
    DepoiContent,
    EventButton,
    EventCard,
    EventContent,
    EventInfo,
    EventInfo2,
    EventosGrid,
    Img,
    ModernButton,
    ModernCancelButton,
    ModernFooter,
    ModernInfo,
    ModernModal,
    ModernTitle,
    Section,
} from "./styles";

import acampa from "../../assets/test.png";
import jovem from "../../assets/image.png";

import { useEffect, useRef, useState } from "react";
import api from "../../config/api";
import { Modal } from "react-bootstrap";
import { FormAcampa } from "../../operaction/formAcampa";
import { MercadoPagoButton } from "../admin/ButtonPago";
import { EventTimeline } from "../../components/EventTimeline";
import { FormServos } from "../../operaction/formServos/indesx";
import axios from "axios";

function limitarTexto(texto: string, limite = 60) {
    if (!texto) return '';
    return texto.length > limite
        ? texto.slice(0, limite) + '...'
        : texto;
}

export const Home = () => {
    const [openInscricao, setOpenInscricao] = useState<boolean>(false);
    const [openEvento, setOpenEvento] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);

    const formRef = useRef<HTMLFormElement | null>(null);
    const [formTipo, setFormTipo] = useState<'acampa' | 'servos'>('acampa');
    const [content, setContent] = useState<Record<string, any>>({});
    const [eventos, setEventos] = useState<any[]>([]);
    const [depoimentos, setDepoimentos] = useState<any[]>([]);

    const [eventDate, setEventDate] = useState("");
    const [milestones, setMilestones] = useState([]);

    const [limiteVagas, setLimiteVagas] = useState<number | null>(null);
    const [totalInscritos, setTotalInscritos] = useState(0);

    const [limiteServos, setLimiteServos] = useState<number | null>(null);
    const [totalServos, setTotalServos] = useState(0);
    const [tipoPagamento, setTipoPagamento] = useState<'SERVO' | 'PARTICIPANTE' | null>(null);
    const [showPayment, setShowPayment] = useState(false);

    useEffect(() => {
        // 🔹 Carrega conteúdo da página Home
        api.get('/api/content', { params: { page: 'home' } })
            .then(r => {
                const data = Array.isArray(r.data)
                    ? r.data.reduce((acc: any, item: any) => {
                        acc[item.key] = { id: item.id, ...item }; // pega title, description também
                        return acc;
                    }, {})
                    : r.data || {};

                setContent(data);
            })
            .catch(() => { });

        // 🔹 Eventos
        api.get("/api/eventos").then(res => setEventos(res.data)).catch(err => console.log(err));

        // 🔹 Depoimentos
        api.get('/api/depoimentos').then(r => setDepoimentos(r.data)).catch(() => { });

    }, []);

    // helper para acessar valor de conteúdo
    const value = (key: string, fallback = '') => content[key]?.value ?? fallback;
    const titleValue = (key: string, fallback = '') => content[key]?.title ?? fallback;
    const descriptionValue = (key: string, fallback = '') => content[key]?.description ?? fallback;

    // helper para imagens
    const getImage = (key: string, fallback: string) =>
        content[key]?.value ? `data:image/jpeg;base64,${content[key].value}` : fallback;

    // acessa blocos da Acampa
    const left = content["acampa_image_left"];
    const right = content["acampa_image_right"];

    const loadTimeline = async () => {
        const res = await api.get("/api/timeline");
        setMilestones(res.data.milestones);
        setEventDate(res.data.eventDate);
    };
    useEffect(() => {
        loadTimeline();
    }, []);

    const handleSubmitForm = () => {
        if (!formRef.current) return;
        formRef.current.requestSubmit();
    };

    //limite para inscrição 
    useEffect(() => {
        async function carregarDados() {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/limite-inscricao/status"
                );

                console.log("STATUS API:", response.data);

                // PARTICIPANTES
                setLimiteVagas(response.data.limiteParticipantes);
                setTotalInscritos(response.data.totalParticipantes);

                // SERVOS 👇 (ESTAVA FALTANDO)
                setLimiteServos(response.data.limiteServos);
                setTotalServos(response.data.totalServos);

            } catch (error) {
                console.error("Erro ao carregar status", error);
            }
        }

        carregarDados();
    }, []);


    const vagasEsgotadas =
        limiteVagas !== null && totalInscritos >= limiteVagas;
    const vagasServosEsgotadas =
        limiteServos !== null && totalServos >= limiteServos;



    return (
        <>
            <Header />
            <Content>
                <CustomCarousel />
                <EventTimeline
                    eventDate={eventDate}
                    showOnlyDaysAndProgress={true}
                />

                {/* Seção Eventos */}
                <Section id="eventos">
                    <h1>{value('eventos_title', 'Conheça nossos eventos')}</h1>
                    <EventosGrid>
                        {eventos.length > 0 ? (
                            eventos.map(e => (
                                <EventCard key={e.id} onClick={() => {
                                    setEventoSelecionado(e);
                                    setOpenEvento(true);
                                }}>
                                    <img
                                        loading="lazy"
                                        src={e.imagem || value('event_default_image')}
                                        alt={e.descricao}
                                    />
                                    <h3>{limitarTexto(e.descricao, 150)}</h3>

                                    {/* <h5>{new Date(e.dataInicio).toLocaleDateString("pt-BR")} → {new Date(e.dataFim).toLocaleDateString("pt-BR")}</h5> */}
                                </EventCard>
                            ))
                        ) : (
                            ['event_1', 'event_2', 'event_3', 'event_4'].map(k => (
                                <EventCard key={k}>
                                    <img loading="lazy" src={getImage(k + '_image', jovem)} alt={titleValue(k + '_title')} />
                                    <h3>{titleValue(k + '_title')}</h3>
                                </EventCard>
                            ))
                        )}
                    </EventosGrid>
                </Section>

                {/* Seção Acampa Jovem */}
                <EventContent id="acampajovem">

                    <img src={left?.value ? `data:image/jpeg;base64,${left.value}` : jovem} alt={titleValue('acampa_image_left')} />
                    <EventInfo>
                        <h2>{left?.title || "Acampa Jovem 2026"}</h2>
                        <p>{left?.description || "Informações adicionais sobre o evento."}</p>
                        <EventButton>
                            <CustomButton
                                disabled={vagasEsgotadas}
                                onClick={() => {
                                    if (vagasEsgotadas) return;

                                    setFormTipo("acampa");
                                    setTipoPagamento("PARTICIPANTE"); // 👈 define o tipo
                                    setOpenInscricao(true);             // 👈 abre o modal
                                }}
                            >
                                {vagasEsgotadas
                                    ? "Inscrições encerradas"
                                    : "Inscrições participantes"}
                            </CustomButton>
                        </EventButton>


                    </EventInfo>

                    <img src={right?.value ? `data:image/jpeg;base64,${right.value}` : acampa} alt={titleValue('acampa_image_right')} />
                    <EventInfo2>
                        <h2>{right?.title || "Uma experiência que transforma vidas!"}</h2>
                        <p>{right?.description || "Inspirado por Deus..."}</p>
                        <EventButton>
                            <CustomButton
                                disabled={vagasServosEsgotadas}
                                onClick={() => {
                                    if (vagasServosEsgotadas) return;

                                    setFormTipo('servos');
                                    setTipoPagamento("SERVO");
                                    setOpenInscricao(true);
                                }}
                            >
                                {vagasServosEsgotadas
                                    ? "Vagas de servos esgotadas"
                                    : "Inscrições Servos"}
                            </CustomButton>
                        </EventButton>


                    </EventInfo2>
                </EventContent>

                {/* Depoimentos */}
                <Section id="depoimentos">
                    <h1>{value('depoimentos_title', 'Depoimentos')}</h1>

                    <DepoiContent>
                        {depoimentos?.length > 0 ? (
                            depoimentos.map(d => (
                                <p key={d.id}>{d.texto}</p>
                            ))
                        ) : (
                            [...Array(3)].map((_, i) => (
                                <p key={i}>{value(`depoimento_${i + 1}`, 'Depoimento padrão...')}</p>
                            ))
                        )}
                    </DepoiContent>
                </Section>

            </Content>
            <Footer />

            {/* Modal */}
            <Modal
                show={openInscricao}
                onHide={() => setOpenInscricao(false)}
                centered
                size="lg"
            >
                <ModernModal>
                    <ModernTitle>
                        {formTipo === 'acampa'
                            ? 'ACAMPA JOVEM  – INSCRIÇÃO PARTICIPANTE'
                            : 'ACAMPA JOVEM  – INSCRIÇÃO SERVOS'}
                    </ModernTitle>

                    <ModernInfo>
                        {formTipo === 'acampa' ? (
                            <>
                                Idade para participar: 14 a 21 anos <br />
                                Preencha com atenção todos os campos.
                            </>
                        ) : (
                            <>
                                Formulário exclusivo para servos do evento.
                            </>
                        )}
                    </ModernInfo>

                    {formTipo === 'acampa' ? (
                        <FormAcampa
                            ref={formRef}
                            onSuccess={() => {
                                setOpenInscricao(false);
                                setShowPayment(true); // 👈 abre pagamento
                            }}
                        />
                    ) : (
                        <FormServos
                            ref={formRef}
                            onSuccess={() => {
                                setOpenInscricao(false);
                                setShowPayment(true);
                            }}
                        />
                    )}
                    <ModernFooter>
                        <ModernButton type="button" onClick={handleSubmitForm}>
                            ENVIAR INSCRIÇÃO
                        </ModernButton>

                        <ModernCancelButton onClick={() => setOpenInscricao(false)}>
                            Cancelar
                        </ModernCancelButton>
                    </ModernFooter>
                </ModernModal>
            </Modal>

            {/* 🔹 MODAL DE PAGAMENTO */}
            <Modal
                show={showPayment}
                onHide={() => setShowPayment(false)}
                centered
                size="md"
            >
                <div style={{ textAlign: "center", padding: 20 }}>
                    <h3>Pagamento da Inscrição</h3>

                    <p>
                        Inscrição salva com sucesso!
                        Agora finalize o pagamento.
                    </p>

                    {tipoPagamento && (
                        <MercadoPagoButton tipo={tipoPagamento} />
                    )}

                    <button
                        style={{ marginTop: 20 }}
                        onClick={() => setShowPayment(false)}
                    >
                        Fechar
                    </button>
                </div>
            </Modal>

            {/* Modal de Eventos */}
            <Modal
                show={openEvento}
                onHide={() => setOpenEvento(false)}
                centered
                size="lg"
            >
                <ModernModal>
                    <ModernTitle>
                        <h2>{eventoSelecionado?.titulo || 'Evento'}</h2>
                    </ModernTitle>

                    <ModernInfo>
                        {eventoSelecionado && (
                            <>
                                <Img src={eventoSelecionado.imagem || ''} />

                                <p style={{ color: "#000", padding: 10 }}><b>{eventoSelecionado.descricao}</b> </p>

                                <p>
                                    📅 {new Date(eventoSelecionado.dataInicio).toLocaleDateString("pt-BR")}
                                    {' '}→{' '}
                                    {new Date(eventoSelecionado.dataFim).toLocaleDateString("pt-BR")}
                                </p>
                            </>
                        )}
                    </ModernInfo>

                    <ModernFooter >
                        <ModernCancelButton onClick={() => setOpenEvento(false)}>
                            Fechar
                        </ModernCancelButton>
                    </ModernFooter>
                </ModernModal>
            </Modal>
        </>
    );
};
