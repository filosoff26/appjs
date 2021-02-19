const button = document.querySelector(".say-button");
const input = document.querySelector(".name");

button.addEventListener("click", sayHello);

async function sayHello(event) {
    event.preventDefault();
    const name = input.value;
    let response = await fetch("/api/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ name }),
    });

    let result = await response.json();
    alert(result);
};