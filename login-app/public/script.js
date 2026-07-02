let currentTab = "login";

function switchTab(tab) {
  currentTab = tab;

  document.getElementById("tab-login").classList.toggle("active", tab === "login");
  document.getElementById("tab-register").classList.toggle("active", tab === "register");
  document.getElementById("submit-btn").textContent = tab === "login" ? "Login" : "Register";
  setMessage("", "");
}

function setMessage(text, type) {
  const el = document.getElementById("message");
  el.textContent = text;
  el.className = type;
}

document.getElementById("auth-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    setMessage("Please fill in all fields.", "error");
    return;
  }

  const endpoint = currentTab === "login" ? "/api/login" : "/api/register";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message, "success");
      if (currentTab === "register") switchTab("login");
    } else {
      setMessage(data.error || "Something went wrong.", "error");
    }
  } catch (err) {
    if (err instanceof TypeError || err instanceof SyntaxError) {
      setMessage("Unexpected response from server.", "error");
    } else {
      setMessage("Network error. Please try again.", "error");
    }
  }
});
