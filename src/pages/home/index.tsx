import { CustomCarousel } from "../../components/Carousel";
// import { EventTimeline } from "../../components/EventTimeline";
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
    EventosGrid,
    Section,
} from "./styles";

import logo from "../../assets/logo.jpeg";
import deus from "../../assets/deus.png";
import virt from "../../assets/virtuosas.png";
import int from "../../assets/intimidade.png";
import acampa from "../../assets/test.png";
import jovem from "../../assets/image.png";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useEffect, useState } from "react";
import { FormAcampa } from "../../operaction/formAcampa";
import api from "../../config/api";

// 🔹 Dados fixos fora do componente (melhor performance)
// const milestones = [
//     { id: 1, title: "Lançar página do evento", date: "2025-11-20", note: "Página com formulário de inscrição" },
//     { id: 2, title: "Início das inscrições", date: "2026-01-15", note: "Abertura das inscrições" },
//     { id: 3, title: "Última chamada", date: "2026-07-20", note: "Preparação final" },
//     { id: 4, title: "Dia do Evento", date: "2026-07-30", note: "Grande dia!" },
// ];

const eventos = [
    { id: 1, descricao: "Acamapa Jovem", imagem: logo },
    { id: 2, descricao: "Intimidade com Deus", imagem: deus },
    { id: 3, descricao: "Mulheres Virtuosas", imagem: virt },
    { id: 4, descricao: "Intimidade com Maria", imagem: int },
];


export const Home = () => {
    const [openInscricao, setOpenInscricao] = useState(false);
    const [content, setContent] = useState<Record<string, any>>({});
    const [eventos, setEventos] = useState<any[]>([]);
    const [depoimentos, setDepoimentos] = useState<any[]>([]);

    useEffect(() => {
        // fetch content for home (map of key -> contentBlock)
        api.get('/content', { params: { page: 'home' } }).then(r => {
            // r.data is a map of key -> ContentBlock
            setContent(r.data || {});
        }).catch(() => { });

        // if you made Evento model & endpoints, fetch them:
        api.get("/eventos").then(res => {
            setEventos(res.data);
        }).catch(err => console.log(err));

        // depoimentos
        api.get('/depoimentos').then(r => setDepoimentos(r.data)).catch(() => { });
    }, []);

    // helper to read content value
    const value = (key: string, fallback = '') => {
        const cb = content[key];
        if (!cb) return fallback;
        return cb.value ?? fallback;
    };



    return (
        <>
            <Header />
            <Content>
                <CustomCarousel />

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
                                </EventCard>
                            ))
                        ) : (
                            ['event_1', 'event_2', 'event_3', 'event_4'].map(k => (
                                <EventCard key={k}>
                                    <img loading="lazy" src={value(k + '_image')} alt={value(k + '_title')} />
                                    <h3>{value(k + '_title')}</h3>
                                </EventCard>
                            ))
                        )}
                    </EventosGrid>
                </Section>


                <EventContent id="acampajovem">
                    <img src={value('acampa_image_left') || jovem} alt="Logo Acampa Jovem" />
                    <EventInfo>
                        <h2>{value('acampa_title', 'Acampa jovem 2026')}</h2>
                        <p>{value('acampa_short', 'Informações adicionais sobre o evento.')}</p>
                        <EventButton>
                            <CustomButton onClick={() => setOpenInscricao(true)}>{value('acampa_button', 'Inscrições')}</CustomButton>
                        </EventButton>
                    </EventInfo>

                    <img src={value('acampa_image_right') || acampa} alt="Logo Acampa Jovem" />
                    <EventInfo>
                        <h2>{value('acampa_about_title', 'Uma experiência com Deus que transforma vidas!')}</h2>
                        <p>{value('acampa_about_text', 'Inspirado por Deus ...')}</p>
                    </EventInfo>
                </EventContent>

                <Section id="depoimentos">
                    <h1>{value('depoimentos_title', 'Depoimentos')}</h1>
                    <DepoiContent>
                        {depoimentos.length ? depoimentos.map(d => <p key={d.id}>{d.texto}</p>) : (
                            [1, 2, 3].map(i => <p key={i}>{value('depoimento_' + i, '...')}</p>)
                        )}
                    </DepoiContent>
                </Section>

            </Content>
            <Footer />
            {/* modal as before */}
        </>
    );
}
