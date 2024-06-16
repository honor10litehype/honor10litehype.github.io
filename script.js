document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    addMessage(userInput, "user-message");
    document.getElementById("userInput").value = "";

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessage(botResponse, "bot-message");
    }, 1000);
}

function addMessage(message, className) {
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = message;

    const chatbox = document.getElementById("chatbox");
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
    const responses = {
        "hello": "Hi there!",
        "how are you": "I'm a bot, so I don't have feelings, but thanks for asking!",
        "what is your name": "I'm a chatbot created by you.",
        "bye": "Goodbye! Have a great day!",
        "default": "I'm not sure how to respond to that."
    };

    input = input.toLowerCase();
    return responses[input] || responses["default"];
}
