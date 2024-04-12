const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTcxMjg0OTAwNiwiZXhwIjoxNzEyODU2MjA2fQ.H6ob5epjwrsXUHN3qUTsNEBefvgOgjWSqyB2PwpnWGg";

async function signUp() {
  const usernameForm = document.getElementById("username");
  const passwordForm = document.getElementById("password");
  if (usernameForm.value !== "" && passwordForm.value !== "") {
    let user = {
      username: usernameForm.value,
      password: passwordForm.value,
    };
    usernameForm.value = "";
    passwordForm.value = "";
    const userJSON = JSON.stringify(user);
    console.log(userJSON);
    try {
      const response = await fetch("http://localhost:3000/sign-up/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userJSON,
      });

      if (response.status >= 400 && response.status <= 499) {
        const container = document.getElementById("container");
        const p = document.createElement("p");
        const message = await response.json();
        p.textContent = message.message;
        container.appendChild(p);
      } else {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        const { token } = jsonResponse;
        localStorage.setItem("jwtToken", token);
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    alert("Fill out both of fields");
  }
}
