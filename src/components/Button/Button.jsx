import styled from "styled-components";

const ButtonStyle = styled.button`
    width: 80px;
    height: 80px;
    border: 0;
    border-radius: 10px;
    font-size: 25px;
    color: whitesmoke;
    margin-top: 10px;
    background-color: #2f2f2f;
    -webkit-box-shadow: inset 0 0 15px -4px #000000;
    box-shadow: inset 0 0 15px -4px #000000;
    cursor: pointer;
`;

const Button = ({ value, content, action }) => {
    return (
        <>
            <ButtonStyle onClick={() => action(value)}>{content}</ButtonStyle>
        </>
    );
};

export default Button;
