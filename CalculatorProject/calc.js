function flip() {
    document.getElementById("main-calc").classList.toggle("flip");
}

document.addEventListener("DOMContentLoaded", () => {
    let screen = document.getElementById("front-output");
    let buttons = document.querySelectorAll(".normal-btn");
    let expression = "";

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const buttonId = button.id;
            const buttonValue = button.textContent;

            if (buttonId === "scientific") {
                clearAll();
                flip();
                return; 
            }

            if (buttonId === "clear-all") {
                clearAll();
            } else if (buttonId === "clear-after-operator") {
                clearEntry();
            } else if (buttonId === "clear-last") {
                deleteLast();
            } else if (buttonId === "equals") {
                evaluateExpression();
            } else if (buttonId === "plus-minus") {
                toggleSign();
            } else if (buttonId === "percent") {
                convertToPercent();
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
            let result = expression.replace(/x/g, "*");
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
        let lastOperatorIndex = expression.lastIndexOf("+");
        lastOperatorIndex = Math.max(lastOperatorIndex, expression.lastIndexOf("-"));
        lastOperatorIndex = Math.max(lastOperatorIndex, expression.lastIndexOf("x"));
        lastOperatorIndex = Math.max(lastOperatorIndex, expression.lastIndexOf("/"));

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

    function toggleSign() {
        if (expression) {
            expression = expression.startsWith("-")
                ? expression.substring(1)
                : "-" + expression;
            screen.value = expression;
        }
    }

    function convertToPercent() {
        try {
            expression = (eval(expression) / 100).toString();
            screen.value = expression;
        } catch {
            screen.value = "Error";
            expression = "";
        }
    }
});
