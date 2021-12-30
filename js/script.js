class Stack
{
    constructor()
    {
        this.array = [];
    }

    push(element)
    {
        this.array.push(element);
    }
    pop()
    {
        this.array.pop();
    }
    peek()
    {
        return this.array[this.array.length - 1];
    }
    isEmpty()
    {
        return this.array.length === 0;
    }
}

let sectionTwoButtons = document.getElementsByClassName("number");
let display = document.getElementById("display");

let allClear = document.getElementById("clear");
let backspace = document.getElementById("backspace");
let square = document.getElementById("square");
let fraction = document.getElementById("fraction");

let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let multiply = document.getElementById("multiply");
let divide = document.getElementById("divide");
let root = document.getElementById("root");
let log = document.getElementById("log");
let sin = document.getElementById("sin");
let cos = document.getElementById("cos");
let tan = document.getElementById("tan");
let inverse = document.getElementById("inverse");
let dot = document.getElementById("dot");
let equals = document.getElementById("equals");

for (let i=0;i<sectionTwoButtons.length;i++)
{
    sectionTwoButtons[i].addEventListener("click", function () {
        display.value += sectionTwoButtons[i].textContent;
    });
}

plus.addEventListener("click", function () {
    display.value += "+";
});

minus.addEventListener("click", function () {
    display.value += "-";
});

multiply.addEventListener("click", function () {
    display.value += "*";
});

divide.addEventListener("click", function () {
    display.value += "/";
});

dot.addEventListener("click", function () {
    display.value += ".";
});

allClear.addEventListener("click", function () {
    display.value = "";
});

backspace.addEventListener("click", function () {
    display.value = display.value.slice(0, -1);
});

equals.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = ans;
    else
        alert("Syntax Error: Please check entered expression again!");
});

sin.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = Math.sin(ans * (180 / Math.PI));
    else
        alert("Syntax Error: Please check entered expression again!");
});

cos.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = Math.cos(ans * (180 / Math.PI));
    else
        alert("Syntax Error: Please check entered expression again!");
});

tan.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = Math.tan(ans * (180 / Math.PI));
    else
        alert("Syntax Error: Please check entered expression again!");
});

log.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = Math.log(ans);
    else
        alert("Syntax Error: Please check entered expression again!");
});

root.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = Math.root(ans);
    else
        alert("Syntax Error: Please check entered expression again!");
});

inverse.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = 1/ans;
    else
        alert("Syntax Error: Please check entered expression again!");
});

square.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
        display.value = ans * ans;
    else
        alert("Syntax Error: Please check entered expression again!");
});

fraction.addEventListener("click", function () {
    let postfix = infixToPostfix(display.value);
    let ans = evaluatePostfix(postfix);

    if (ans !== undefined && !isNaN(ans) && ans !== null)
    {
        let numberOfPlaces = ans.toString().split(".")[1].length;
        ans *= Math.pow(10, numberOfPlaces);
        let gcdAns = gcd(ans, Math.pow(10, numberOfPlaces));

        display.value = (ans/gcdAns) + "/" + (Math.pow(10, numberOfPlaces)/gcdAns);
    }
    else
        alert("Syntax Error: Please check entered expression again!");
});

function precedence(operator)
{
    if (operator === "+" || operator === "-")
        return 1;
    if (operator === "*" || operator === "/")
        return 2;
}

function infixToPostfix(infix)
{
    let stack = new Stack();
    let temp = "";
    let postfix = [];

    for (let ch in infix)
    {
        if (infix[ch] === "." || !isNaN(parseInt(infix[ch])))
        {
            if (temp.includes(".") && infix[ch] === ".")
                return undefined;

            temp += infix[ch];
        }
        else if (infix[ch] === "(")
            stack.push("(");
        else if (infix[ch] === ")")
        {
            if (temp !== "")
            {
                postfix.push(temp);
                temp = "";
            }

            while (stack.peek() !== "(")
            {
                postfix.push(stack.peek());
                stack.pop();
            }

            stack.pop();
        }
        else
        {
            if (temp !== "")
            {
                postfix.push(temp);
                temp = "";
            }

            while (!stack.isEmpty() && precedence(stack.peek()) >= precedence(infix[ch]))
            {
                postfix.push(stack.peek());
                stack.pop();
            }
            stack.push(infix[ch]);
        }
    }

    if (temp !== "")
        postfix.push(temp);

    while (!stack.isEmpty())
    {
        postfix.push(stack.peek());
        stack.pop();
    }

    return postfix;
}

function evaluatePostfix(postfix)
{
    if (postfix === undefined)
        return undefined;

    let stack = new Stack();
    for (let ele in postfix)
    {
        if (!isNaN(parseFloat(postfix[ele])))
            stack.push(postfix[ele]);
        else
        {
            let num2 = parseFloat(stack.peek());
            stack.pop();
            let num1 = parseFloat(stack.peek());
            stack.pop();

            switch (postfix[ele])
            {
                case '+':
                {
                    stack.push((num1 + num2).toString());
                    break;
                }
                case '-':
                {
                    stack.push((num1 - num2).toString());
                    break;
                }
                case '/':
                {
                    stack.push((num1 / num2).toString());
                    break;
                }
                case '*':
                {
                    stack.push((num1 * num2).toString());
                    break;
                }
            }
        }
    }

    return stack.peek();
}

function gcd(x, y)
{
    if (y === 0)
        return x;

    return gcd(y, x%y);
}