async function signup() {
    const username = document.querySelector("#signup-username").value;
    const password = document.querySelector("#signup-password").value;

    const res = await axios.post("/signup", {
        username: username,
        password: password
    })

    alert("SignUp Is Success!");
    console.log(res);
    
}