import { Input, Label } from "reactstrap";
import { Header } from "../../components/Header";
import {
    Context,
    ContactContainer,
    ContactCard,
    CustomButton,
    CustomDiv,
    CustomForm,
    InputGroup,
} from "./styles";
import { useRef } from "react";

export const Contato = () => {
    const form = useRef<HTMLFormElement | null>(null);

    const sendWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.current) return;

        const formData = new FormData(form.current);
        const name = formData.get("name");
        const email = formData.get("email");
        const descricao = formData.get("descricao");

        const mensagem = `Olá, meu nome é ${name}.
E-mail: ${email}
Mensagem: ${descricao}`;

        const numeroWhatsApp = "5511999999999";

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
            mensagem
        )}`;

        window.open(url, "_blank");
        form.current.reset();
    };

    return (
        <>
            <Header />
            <Context>
                <ContactContainer>
                    <ContactCard>
                        <CustomForm ref={form} onSubmit={sendWhatsApp}>
                            <CustomDiv>
                                <InputGroup>
                                    <Input required name="name" className="input" />
                                    <Label className="label">Nome</Label>
                                </InputGroup>

                                <InputGroup>
                                    <Input required name="email" type="email" className="input" />
                                    <Label className="label">E-mail</Label>
                                </InputGroup>

                                <InputGroup className="fullWidth">
                                    <Input
                                        required
                                        name="descricao"
                                        type="textarea"
                                        className="input textarea"
                                    />
                                    <Label className="label">Dúvidas ou sugestões</Label>
                                </InputGroup>
                            </CustomDiv>

                            <CustomButton type="submit">
                                Enviar para WhatsApp
                            </CustomButton>
                        </CustomForm>
                    </ContactCard>
                </ContactContainer>
            </Context>
        </>
    );
};