import styled from "styled-components";

const HeaderStyle = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15vh;
`;

const HeaderH1Style = styled.h1`
    text-align: center;
    font-size: 64px;
    color: white;
`;

function Header() {
    return (
        <>
            <HeaderStyle>
                <HeaderH1Style>Calculadora</HeaderH1Style>
            </HeaderStyle>
        </>
    );
}

export default Header;
