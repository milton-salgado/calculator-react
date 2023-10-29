import styled from "styled-components";
import "./style.css";

const DisplayStyle = styled.input`
    background-color: #a7af7c;
    width: 375px;
    height: 80px;
    border-radius: 10px;
    padding: 10px;
    text-align: right;
    font-family: "Digital-7";
    font-size: 56px;
    -webkit-box-shadow: inset 0 0 15px -4px #000000;
    box-shadow: inset 0 0 15px -4px #000000;
`;

const Display = ({ value, action }) => {
    return (
        <>
            <DisplayStyle
                type="text"
                readOnly={true}
                onChange={() => action(value)}
                value={value}
            ></DisplayStyle>
        </>
    );
};

export default Display;
