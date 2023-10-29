import styled from "styled-components";
import DisplayStyle from "../Display/Display";
import ButtonStyle from "../Button/Button";
import { useState } from "react";

const SectionStyle = styled.section`
    width: 450px;
    height: 620px;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 2%;
    border-radius: 20px;
`;

const ButtonsSectionStyle = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 375px;
`;

function Section() {
    const [expression, setExpression] = useState("0");
    const symbols = ["+", "-", "x", "÷", "**", "%"];
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const clearDisplay = () => {
        setExpression("0");
    };

    const resetError = () => {
        let temp = expression;

        if (temp === "ERRO") clearDisplay();
    };

    const addToDisplay = (value) => {
        let temp = expression;

        if (numbers.includes(value) && temp === "0") temp = value;
        else if (
            symbols.includes(value) &&
            symbols.includes(temp[temp.length - 1])
        )
            temp = temp.slice(0, temp.length - 1).concat(value);
        else if (!(value === "." && temp.toString().includes(".")))
            temp = temp.concat(value);

        setExpression(temp);
        resetError();
    };

    const calculateResult = (expression) => {
        let temp = expression,
            index = findLastSymbol(temp);

        if (
            index == temp.length - 1 &&
            (temp[index] == "+" || temp[index] == "-")
        )
            temp = temp.concat(eval(temp.slice(0, index)));
        else if (
            index == temp.length - 1 &&
            (temp[index] == "x" || temp[index] == "÷" || temp[index] == "%")
        ) {
            let indexSecondLastSymbol = findLastSymbol(temp.slice(0, index));

            temp = temp
                .slice(0, indexSecondLastSymbol + 1)
                .concat(
                    temp.slice(indexSecondLastSymbol + 1, index + 1),
                    Number(temp.slice(indexSecondLastSymbol + 1, index))
                );
        } else
            temp = temp
                .slice(0, index + 1)
                .concat(Number(temp.slice(index + 1, temp.length)));

        temp = convertSymbols(temp);
        console.log(temp);
        temp = eval(temp);

        if (
            temp.toString().toUpperCase() === "NAN" ||
            temp.toString().toUpperCase() === "INFINITY" ||
            temp.toString().toUpperCase() === "UNDEFINED" ||
            temp.toString().toUpperCase() === "-INFINITY" ||
            temp.toString().toUpperCase() === "-NAN" ||
            temp.toString().toUpperCase() === "-UNDEFINED"
        )
            temp = "ERRO";

        setExpression(temp.toString());
        resetError();
    };

    const squareValue = (expression) => {
        let temp = expression,
            index = findLastSymbol(temp);

        if (
            index == temp.length - 1 &&
            (temp[index] == "+" || temp[index] == "-")
        )
            temp = temp.concat(Math.pow(eval(temp.slice(0, index)), 2));
        else if (
            index == temp.length - 1 &&
            (temp[index] == "x" || temp[index] == "÷" || temp[index] == "%")
        ) {
            let indexSecondLastSymbol = findLastSymbol(temp.slice(0, index));
            temp = temp
                .slice(0, indexSecondLastSymbol + 1)
                .concat(
                    temp.slice(indexSecondLastSymbol + 1, index + 1),
                    Math.pow(
                        Number(temp.slice(indexSecondLastSymbol + 1, index)),
                        2
                    )
                );
        } else
            temp = temp
                .slice(0, index + 1)
                .concat(
                    Math.pow(Number(temp.slice(index + 1, temp.length)), 2)
                );

        setExpression(temp);
        resetError();
    };

    const convertSymbols = (expression) => {
        if (expression.includes("x"))
            expression = expression.replaceAll("x", "*");
        if (expression.includes("÷"))
            expression = expression.replaceAll("÷", "/");
        return expression;
    };

    const changeValueSign = (expression) => {
        let temp = expression,
            index = findLastSymbol(temp);

        if (
            index == temp.length - 1 &&
            (temp[index] == "+" || temp[index] == "-")
        )
            temp = temp.concat("-", eval(temp.slice(0, index)));
        else if (
            index == temp.length - 1 &&
            (temp[index] == "x" || temp[index] == "÷" || temp[index] == "%")
        ) {
            let indexSecondLastSymbol = findLastSymbol(temp.slice(0, index));
            temp = temp
                .slice(0, indexSecondLastSymbol + 1)
                .concat(
                    temp.slice(indexSecondLastSymbol + 1, index + 1),
                    "-",
                    Number(temp.slice(indexSecondLastSymbol + 1, index))
                );
        } else
            temp = temp
                .slice(0, index + 1)
                .concat("-", Number(temp.slice(index + 1, temp.length)));

        temp = clearMinusMinus(temp);

        setExpression(temp);
        resetError();
    };

    const clearMinusMinus = (expression) => {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === "-" && expression[i + 1] === "-") {
                let temp = expression.slice(0, i),
                    aux = expression.slice(i + 2, expression.length);

                expression = temp.concat(aux);
            }
        }
        return expression;
    };

    const findLastSymbol = (expression) => {
        for (let i = expression.length - 1; i >= 0; i--)
            if (symbols.includes(expression[i])) return i;

        return -1;
    };

    const operations = [
        {
            content: "AC",
            value: "AC",
            action: clearDisplay,
        },
        {
            content: "x²",
            value: expression,
            action: squareValue,
        },
        {
            content: "±",
            value: expression,
            action: changeValueSign,
        },
        {
            content: "%",
            value: "%",
            action: addToDisplay,
        },
        {
            content: "7",
            value: "7",
            action: addToDisplay,
        },
        {
            content: "8",
            value: "8",
            action: addToDisplay,
        },
        {
            content: "9",
            value: "9",
            action: addToDisplay,
        },
        {
            content: "÷",
            value: "÷",
            action: addToDisplay,
        },
        {
            content: "4",
            value: "4",
            action: addToDisplay,
        },
        {
            content: "5",
            value: "5",
            action: addToDisplay,
        },
        {
            content: "6",
            value: "6",
            action: addToDisplay,
        },
        {
            content: "x",
            value: "x",
            action: addToDisplay,
        },
        {
            content: "1",
            value: "1",
            action: addToDisplay,
        },
        {
            content: "2",
            value: "2",
            action: addToDisplay,
        },
        {
            content: "3",
            value: "3",
            action: addToDisplay,
        },
        {
            content: "-",
            value: "-",
            action: addToDisplay,
        },
        {
            content: "0",
            value: "0",
            action: addToDisplay,
        },
        {
            content: ".",
            value: ".",
            action: addToDisplay,
        },
        {
            content: "=",
            value: expression,
            action: calculateResult,
        },
        {
            content: "+",
            value: "+",
            action: addToDisplay,
        },
    ];

    return (
        <>
            <SectionStyle>
                <DisplayStyle value={expression}></DisplayStyle>
                <ButtonsSectionStyle>
                    {operations.map((item, index) => (
                        <ButtonStyle
                            key={index}
                            value={item.value}
                            content={item.content}
                            action={item.action}
                        >
                            {item.content}
                        </ButtonStyle>
                    ))}
                </ButtonsSectionStyle>
            </SectionStyle>
        </>
    );
}

export default Section;
