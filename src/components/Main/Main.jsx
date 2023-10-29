import styled from "styled-components";
import SectionStyle from "../Section/Section";

const MainStyle = styled.main`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Main() {
    return (
        <>
            <MainStyle>
                <SectionStyle></SectionStyle>
            </MainStyle>
        </>
    );
}

export default Main;
