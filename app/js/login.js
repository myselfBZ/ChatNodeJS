async function logIn() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  if (usernameInput.value !== "" && passwordInput.value !== "") {
    const user = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const userJson = JSON.stringify(user);
    try {
      const response = await fetch("http://localhost:3000/log-in/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: userJson,
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        const container = document.getElementById("container");
        const message = document.createElement("p");
        message.textContent = jsonResponse.message;
        container.appendChild(message);
      } else {
        const { token } = jsonResponse;

        localStorage.setItem("jwtToken", token);
        window.location.href = "index.html";
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Fill out both fields");
  }
}
