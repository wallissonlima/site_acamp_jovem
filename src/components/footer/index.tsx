import { Context, FooterCustom, FooterPag, FooterText } from "./styles"
import cartao from "../../assets/cartao.png"

export const Footer: React.FC = () => {
    return (
        <Context>
            <FooterCustom className="footer-content">
                <div className="row">
                    <div className="col">
                        <h4>CATEGORIAS</h4>
                        <p>Início</p>
                        <p>Todos os produtos</p>
                        <p>Roupas</p>
                        <p>Marcas</p>
                        <p>Tênis</p>
                        <p>Contato</p>
                    </div>
                    <div className="col">
                        <h4>DEPARTAMENTOS</h4>
                        <p>horario de atendimento</p>
                        <p>Instagram</p>
                        <p>Guia de medidas</p>
                        <p>Feedbacks</p>
                        <p>Trocas e devoluções</p>
                        <p>Politica de privacidade</p>
                    </div>
                    <div className="col">
                        <h4>ENTRE EM CONTATO CONOSCO</h4>
                        <p>Links para as redes sociais.</p>
                    </div>
                </div>
            </FooterCustom>
            <FooterPag>
                <h5>Meios de Pagamento:</h5>
                <img src={cartao} alt="Meios de Pagamento" />
            </FooterPag>
            <FooterText>
                <p>© 2021 COUSINS Store. Todos os direitos reservados.</p>
            </FooterText>
        </Context>
    )
}