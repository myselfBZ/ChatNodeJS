addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    console.log("You are unauthorized to see this page");
  } else {
    const response = await fetch("http://localhost:3000/users/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    for (let i = 0; i < jsonResponse.length; i++) {
      const li = document.createElement("li");
      const users = document.getElementById("users");
      li.textContent = jsonResponse[i].username;
      users.appendChild(li);
    }
  }
});
