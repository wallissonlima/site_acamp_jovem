import {
    ContactGrid,
    ContactItem,
    ContactLabel,
    ContactValue,
    Context,
    FooterContent,
    FooterCustom,
    FooterText,
    SectionTitle,
} from "./styles";

export const Footer: React.FC = () => {
    return (
        <Context>
            <FooterCustom>
                <FooterContent>
                    <SectionTitle>Entre em contato conosco</SectionTitle>

                    <ContactGrid>
                        <ContactItem>
                            <ContactLabel>Telefone</ContactLabel>
                            <ContactValue href="tel:+5561999999999">
                                (61) 99999-9999
                            </ContactValue>
                        </ContactItem>

                        <ContactItem>
                            <ContactLabel>E-mail</ContactLabel>
                            <ContactValue href="mailto:financeiro@acampajovem.com.br">
                                financeiro@acampajovem.com.br
                            </ContactValue>
                        </ContactItem>
                    </ContactGrid>
                </FooterContent>
            </FooterCustom>

            <FooterText>
                <p>© 2025 Acampa Jovem. Todos os direitos reservados.</p>
            </FooterText>
        </Context>
    );
};