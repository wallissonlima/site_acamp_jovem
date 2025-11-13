import { Context, FooterCustom, FooterText } from "./styles"


export const Footer: React.FC = () => {
    return (
        <Context>
            <FooterCustom className="footer-content">
                <div className="row">

                    <div className="col">
                        <h4>ENTRE EM CONTATO CONOSCO</h4>
                        <p>Telefone: (61) 99999.9999</p>
                        <p>E-mail: financeiro@acampajovem.com.br</p>
                    </div>
                </div>
            </FooterCustom>
            {/* <FooterPag>
                <h5>Meios de Pagamento:</h5>
                <img src={cartao} alt="Meios de Pagamento" />
            </FooterPag> */}
            <FooterText>
                <p>© 2025 Acampa Jovem. Todos os direitos reservados.</p>
            </FooterText>
        </Context>
    )
}