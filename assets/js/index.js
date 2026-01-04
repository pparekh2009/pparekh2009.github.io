document.getElementById("contact-form").addEventListener('submit', async (e) => {
    e.preventDefault()

    let data = {
        name: getInputVal('name'),
        email: getInputVal('email'),
        subject: getInputVal('subject'),
        message: getInputVal('message')
    };

    const res = await fetch("https://rbrg4oz3n5mvqwsywjm4raycoe0hdiai.lambda-url.us-east-1.on.aws/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    console.log("res: ")
    console.log(res)

    console.log("res body: ")
    console.log(res.body)

    console.log("res type: " + (typeof res))

    const result = await res.json()
    console.log(result)
})

function getInputVal(id) {
    return document.getElementById(id).value
}