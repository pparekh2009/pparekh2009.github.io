document.getElementById("contact-form").addEventListener('submit', async (e) => {
    e.preventDefault()

    let data = {
        name: getInputVal('name'),
        email: getInputVal('email'),
        subject: getInputVal('subject'),
        message: getInputVal('message')
    };

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageContainer = document.getElementById("submit-message-container");

    submitBtn.disabled = true;

    try {
        const response = await fetch("https://rbrg4oz3n5mvqwsywjm4raycoe0hdiai.lambda-url.us-east-1.on.aws/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            messageContainer.innerHTML = `<p class="submit-message submit-message-success">Your message was sent successfully.</p>`;
            form.reset();
        } else {
            messageContainer.innerHTML = `<p class="submit-message submit-message-error">Something went wrong. Please try again.</p>`;
        }
    } catch (err) {
        messageContainer.innerHTML = `<p class="submit-message submit-message-error">Something went wrong. Please try again.</p>`;
    } finally {
        submitBtn.disabled = false;
    }
})

function getInputVal(id) {
    return document.getElementById(id).value
}
