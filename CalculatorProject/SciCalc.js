function flip() {
    document.getElementById("main-calc").classList.toggle("flip");
}

document.addEventListener("DOMContentLoaded", () => {
    let screen = document.getElementById("back-output");
    let buttons = document.querySelectorAll(".Scientific-btn");
    let expression = ""; 

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.id;
            const buttonValue = button.textContent;
            if (buttonId === "normal") {
                clearAll();
                flip();
                return; 
            }

            if (buttonId === "clear-all-scientific") {
                clearAll();
            } else if (buttonId === "clear-after-operator-scientific") {
                clearEntry();
            } else if (buttonId === "clear-last-scientific") {
                deleteLast();
            } else if (buttonId === "equals-scientific") {
                evaluateExpression();
            } else if (buttonId === "pi") {
                appendToExpression(Math.PI.toFixed(8));
            } else if (buttonId === "e") {
                appendToExpression(Math.E.toFixed(8));
            } else if (buttonId === "square") {
                square();
            } else if (buttonId === "inverse") {
                inverse();
            } else if (buttonId === "absolute") {
                absolute();
            } else if (buttonId === "exp") {
                appendToExpression("e^");
            } else if (buttonId === "modulus") {
                appendToExpression("%");
            } else if (buttonId === "sqrt") {
                sqrt();
            } else if (buttonId === "factorial") {
                factorial();
            } else if (buttonId === "power") {
                appendToExpression("^");
            } else if (buttonId === "log") {
                logBase10();
            } else if (buttonId === "ln") {
                naturalLog();
            } else if (buttonId === "ten-power-x") {
                tenPowerX();
            } else {
                appendToExpression(buttonValue);
            }
        });
    });

    function appendToExpression(value) {
        if (screen.value === "0" && !isNaN(value)) {
            expression = value;
        } else {
            expression += value;
        }
        screen.value = expression;
    }

    function evaluateExpression() {
        try {
            let result = expression.replace(/x/g, "*").replace(/\^/g, "**"); 
            screen.value = eval(result);
            expression = screen.value;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function clearAll() {
        expression = "";
        screen.value = "0";
    }

    function clearEntry() {
        let lastOperatorIndex = Math.max(
            expression.lastIndexOf("+"),
            expression.lastIndexOf("-"),
            expression.lastIndexOf("*"),
            expression.lastIndexOf("/"),
            expression.lastIndexOf("%"),
            expression.lastIndexOf("^")
        );

        if (lastOperatorIndex !== -1) {
            expression = expression.slice(0, lastOperatorIndex + 1);
        } else {
            expression = "";
        }
        screen.value = expression || "0";
    }

    function deleteLast() {
        expression = expression.slice(0, -1);
        screen.value = expression || "0";
    }

    function square() {
        try {
            expression = eval(expression) ** 2;
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function inverse() {
        try {
            expression = 1 / eval(expression);
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function absolute() {
        try {
            expression = Math.abs(eval(expression));
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function sqrt() {
        try {
            expression = Math.sqrt(eval(expression));
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function factorial() {
        try {
            let num = eval(expression);
            let fact = 1;
            for (let i = 1; i <= num; i++) {
                fact *= i;
            }
            expression = fact;
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function logBase10() {
        try {
            expression = Math.log10(eval(expression));
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function naturalLog() {
        try {
            expression = Math.log(eval(expression));
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }

    function tenPowerX() {
        try {
            expression = 10 ** eval(expression);
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }
});
