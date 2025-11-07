const API_BASE = "http://127.0.0.1:3000/api";

// === LOGIN ===
async function loginUser() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem("user", JSON.stringify(data.user));
    location.href = "home.html";
  } else {
    alert(data.error || "Login failed");
  }
}

// === REGISTER ===
async function registerUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (data.success) {
    alert("Registered successfully!");
    location.href = "login.html";
  } else {
    alert(data.error || "Registration failed");
  }
}

// === LOAD TRENDING ===
async function loadTrending() {
  const container = document.getElementById("videos");
  container.innerHTML = `<p>Loading...</p>`;
  const res = await fetch(`${API_BASE}/trending`);
  const data = await res.json();
  container.innerHTML = "";
  data.forEach((v) => {
    const snippet = v.snippet;
    container.innerHTML += `
      <div class="video">
        <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}">
        <p>${snippet.title}</p>
      </div>`;
  });
}

// === SEARCH ===
async function searchVideos() {
  const query = document.getElementById("search").value.trim();
  if (!query) return loadTrending();

  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const container = document.getElementById("videos");
  container.innerHTML = "";
  data.forEach((v) => {
    const snippet = v.snippet;
    container.innerHTML += `
      <div class="video">
        <img src="${snippet.thumbnails.medium.url}" alt="${snippet.title}">
        <p>${snippet.title}</p>
      </div>`;
  });
}

// === LOGOUT ===
function logout() {
  localStorage.removeItem("user");
  location.href = "login.html";
}
