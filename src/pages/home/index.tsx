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
import { useState } from "react";
import { FormAcampa } from "../../operaction/formAcampa";

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
    const [openInscricao, setOpenInscricao] = useState<boolean>(false);
    return (
        <>
            <Header />
            <Content>
                <CustomCarousel />

                {/* 🗓️ Cronograma */}
                {/* <section id="cronograma">
                    <EventTimeline
                        eventDate="2026-07-30T18:00:00"
                        title="Contagem Regressiva para o Evento"
                        milestones={milestones}
                    />
                </section> */}

                {/* 🎉 Seção de eventos */}
                <Section id="eventos">
                    <h1>Conheça nossos eventos</h1>
                    <EventosGrid>
                        {eventos.map((p) => (
                            <EventCard key={p.id}>
                                <img loading="lazy" src={p.imagem} alt={p.descricao} />
                                <h3>{p.descricao}</h3>
                            </EventCard>
                        ))}
                    </EventosGrid>
                </Section>

                {/* 🙏 Acampa Jovem */}
                <EventContent id="acampajovem">
                    <img src={jovem} alt="Logo Acampa Jovem" />
                    <EventInfo>
                        <h2>Acampa jovem 2026</h2>
                        <p>Informações adicionais sobre o evento.</p>

                        <EventButton>
                            <CustomButton onClick={() => setOpenInscricao(true)}>Inscrições</CustomButton>
                        </EventButton>
                    </EventInfo>

                    <img src={acampa} alt="Logo Acampa Jovem" />
                    <EventInfo>
                        <h2>Uma experiência com Deus que transforma vidas!</h2>
                        <p>
                            Inspirado por Deus e comunicado pela intercessão da virgem Santíssima ao pregador Alessandro,
                            o Acampa Jovem é uma adaptação do antigo encontro Intimidade com Deus: Jovem. Com adições da gincana
                            e da dinâmica de acampamento, retirando-se para uma fazenda por três dias, tendo pregações,
                            brincadeiras, teatro e muito mais.
                        </p>
                    </EventInfo>
                </EventContent>

                {/* 💬 Depoimentos */}
                <Section id="depoimentos">
                    <h1>Depoimentos</h1>
                    <DepoiContent>
                        <p>
                            Hoje eu tive uma experiência
                            incrível sobre o quão sobrenatural
                            o amor de Cristo e o perdão pode
                            agir, sempre pensei que conseguia
                            perdoar as pessoas e conviver
                            normalmente com esses traumas.
                            Mas em um momento na pregação
                            fui percebendo o quão falho e que
                            eu mentia pra mim mesmo sobre
                            esse perdão e sentimentos
                        </p>
                        <p>
                            Hoje eu tive uma experiência
                            incrível sobre o quão sobrenatural
                            o amor de Cristo e o perdão pode
                            agir, sempre pensei que conseguia
                            perdoar as pessoas e conviver
                            normalmente com esses traumas.
                            Mas em um momento na pregação
                            fui percebendo o quão falho e que
                            eu mentia pra mim mesmo sobre
                            esse perdão e sentimentos
                        </p>
                        <p>
                            Hoje eu tive uma experiência
                            incrível sobre o quão sobrenatural
                            o amor de Cristo e o perdão pode
                            agir, sempre pensei que conseguia
                            perdoar as pessoas e conviver
                            normalmente com esses traumas.
                            Mas em um momento na pregação
                            fui percebendo o quão falho e que
                            eu mentia pra mim mesmo sobre
                            esse perdão e sentimentos
                        </p>

                    </DepoiContent>
                </Section>
            </Content>
            <Footer />

            {/* Modal */}
            <Modal isOpen={openInscricao} centered={true} size="lg">
                <ModalHeader>
                    <h2 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                        ACAMPA JOVEM 2025 – INSCRIÇÃO
                    </h2>
                </ModalHeader>
                <ModalBody >
                    <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#1f5f5b" }}>
                        Idade para participar: 14 a 21 anos <br />
                        Preencha com atenção todos os campos. Essa ficha não poderá ser alterada.
                    </p>
                    <FormAcampa />
                </ModalBody>
                <ModalFooter style={{ padding: 5 }}>
                    <CustomButton
                        type="submit">
                        ENVIAR INSCRIÇÃO
                    </CustomButton>
                    <ButtonClose type="button" onClick={() => setOpenInscricao(!openInscricao)}>
                        Cancelar
                    </ButtonClose>
                </ModalFooter>
            </Modal>
        </>
    );
};
