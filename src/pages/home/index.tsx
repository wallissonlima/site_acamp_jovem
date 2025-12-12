import { CustomCarousel } from "../../components/Carousel";
import { Footer } from "../../components/footer";
import { Header } from "../../components/Header";
import {
    ButtonClose,
    Content,
    CustomButton,
    DepoiContent,
    EventButton,
    EventCard,
    EventContent,
    EventInfo,
    EventInfo2,
    EventosGrid,
    ModernButton,
    ModernCancelButton,
    ModernFooter,
    ModernInfo,
    ModernModal,
    ModernTitle,
    PaymentCloseButton,
    Section,
} from "./styles";

import acampa from "../../assets/test.png";
import jovem from "../../assets/image.png";

import { useEffect, useRef, useState } from "react";
import api from "../../config/api";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { FormAcampa } from "../../operaction/formAcampa";
import { MercadoPagoButton } from "../admin/ButtonPago";
import { EventTimeline } from "../../components/EventTimeline";

export const Home = () => {
    const [openInscricao, setOpenInscricao] = useState<boolean>(false);
    const formRef = useRef(null);
    const [content, setContent] = useState<Record<string, any>>({});
    const [eventos, setEventos] = useState<any[]>([]);
    const [depoimentos, setDepoimentos] = useState<any[]>([]);
    const [showPayment, setShowPayment] = useState(false);
    const [eventDate, setEventDate] = useState("");
    const [milestones, setMilestones] = useState([]);


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
                                <EventCard key={e.id} onClick={() => console.log("clicou no evento", e.id)}>
                                    <img
                                        loading="lazy"
                                        src={e.imagem || value('event_default_image')}
                                        alt={e.descricao}
                                    />
                                    <h3>{e.descricao}</h3>
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
                            <CustomButton onClick={() => setOpenInscricao(true)}>
                                Inscrições participantes
                            </CustomButton>
                        </EventButton>
                    </EventInfo>

                    <img src={right?.value ? `data:image/jpeg;base64,${right.value}` : acampa} alt={titleValue('acampa_image_right')} />
                    <EventInfo2>
                        <h2>{right?.title || "Uma experiência que transforma vidas!"}</h2>
                        <p>{right?.description || "Inspirado por Deus..."}</p>
                        <EventButton>
                            <CustomButton onClick={() => setOpenInscricao(true)}>
                                Inscrições Servos
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
                    <ModernTitle>ACAMPA JOVEM 2025 – INSCRIÇÃO</ModernTitle>

                    <ModernInfo>
                        Idade para participar: 14 a 21 anos <br />
                        Preencha com atenção todos os campos. Essa ficha não poderá ser alterada.
                    </ModernInfo>

                    <FormAcampa
                        ref={formRef}
                        onSuccess={() => {
                            setOpenInscricao(false);
                            setShowPayment(true);
                        }}
                    />

                    <ModernFooter>
                        <ModernButton
                            type="submit"
                            onClick={() => {
                                if (formRef.current) {
                                    formRef.current.requestSubmit();
                                }
                            }}
                        >
                            ENVIAR INSCRIÇÃO
                        </ModernButton>

                        <ModernCancelButton onClick={() => setOpenInscricao(false)}>
                            Cancelar
                        </ModernCancelButton>
                    </ModernFooter>
                </ModernModal>
            </Modal>

            <Modal
                show={showPayment}
                onHide={() => setShowPayment(false)}
                centered
                size="md"
            >
                <ModernModal style={{ textAlign: "center" }}>
                    <ModernTitle>Pagamento da Inscrição</ModernTitle>

                    <ModernInfo>
                        Finalize o pagamento para confirmar sua vaga.
                    </ModernInfo>

                    <MercadoPagoButton />

                    <PaymentCloseButton onClick={() => setShowPayment(false)}>
                        Fechar
                    </PaymentCloseButton>
                </ModernModal>
            </Modal>



        </>
    );
};
