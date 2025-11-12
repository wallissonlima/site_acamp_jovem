import styled from "styled-components";

export const Context = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px; 
  background: #000;
  `;

export const FooterCustom = styled.footer`
  padding: 20px;
  text-align: center;
  border-top:  1px solid rgba(255, 255, 255, 0.15);

  h4{
    margin-bottom: 15px;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
`;

export const FooterPag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  padding: 10px;
  text-align: center;
  border-top:  1px solid rgba(255, 255, 255, 0.15);

  img{
    width: 20%;
  }
`;

export const FooterText = styled.div`
 padding: 0px 2px;
 font-size: small;

 background-color:${(props) => props.theme["gray-900"]} ;
`;