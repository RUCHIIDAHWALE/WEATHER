async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const resultEl = document.getElementById("result");

    if (!city) {
        resultEl.innerHTML =
            "<p class='error'>⚠ Please enter a city name.</p>";
        return;
    }

    const apiKey = "a8cefa380aa93d4bbf26233e2bd1ec91";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            resultEl.innerHTML =
                `<p class='error'>Error: ${data.message}</p>`;
            return;
        }

        resultEl.innerHTML = `
            <h2>${data.name}</h2>
            <p>🌡 Temperature: <b>${data.main.temp} °C</b></p>
            <p>💧 Humidity: <b>${data.main.humidity}%</b></p>
            <p>💨 Wind Speed: <b>${data.wind.speed} m/s</b></p>
            <p>🌥 Condition: <b>${data.weather[0].description}</b></p>
        `;

    } catch (error) {
        resultEl.innerHTML =
            "<p class='error'>Network error. Try again.</p>";
        console.error(error);
    }
}