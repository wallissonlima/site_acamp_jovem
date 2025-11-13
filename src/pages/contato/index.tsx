import { Input, Label } from "reactstrap";
import { Header } from "../../components/Header"
import { Context, CustomButton, CustomDiv, CustomForm } from "./styles";
import { Footer } from "../../components/footer";
import { useRef } from "react";

export const Contato = () => {
    const form = useRef(null);

    const sendWhatsApp = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const name = formData.get("name");
        const email = formData.get("email");
        const descricao = formData.get("Duvidas ou sugestões");

        const mensagem = `Olá, meu nome é ${name}. 
        E-mail: ${email}
        Mensagem: ${descricao}`;

        // Substitua pelo seu número no formato 55 + DDD + número
        const numeroWhatsApp = "5511999999999";

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
            mensagem
        )}`;

        window.open(url, "_blank");
        form.current.reset(); // limpa os campos
    };

    return (
        <>
            <Header />
            <Context>
                <div>
                    <CustomForm ref={form} onSubmit={sendWhatsApp}>
                        <CustomDiv>
                            <div>
                                <Input
                                    required
                                    className="inputName"
                                    name="name"
                                    type="text"
                                />
                                <Label className="nameLabel">Nome</Label>
                            </div>
                            <div>
                                <Input
                                    required
                                    className="inputEmail"
                                    name="email"
                                    type="text"
                                />
                                <Label className="emailLabel">E-mail</Label>
                            </div>
                            <div>
                                <Input
                                    required
                                    className="inputDescricao"
                                    name="descricao"
                                    type="text"
                                />
                                <Label className="descricaoLabel">Duvidas ou sugestões</Label>
                            </div>
                        </CustomDiv>
                        <CustomButton type="submit">Enviar para WhatsApp</CustomButton>
                    </CustomForm>
                </div>
            </Context>
            <Footer />
        </>
    );
};