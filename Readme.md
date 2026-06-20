# 🌤️ SkySync

**SkySync** is a lightweight, responsive, and user-friendly weather dashboard that provides real-time weather information based on the user's current location or a manually entered city name.

Designed with simplicity and speed in mind, SkySync helps users stay informed about essential weather conditions, including **temperature**, **humidity**, **wind speed**, and **UV index levels**, enabling safer outdoor planning.

---

## ✨ Features

### 📍 Auto Geolocation

* Automatically detects the user's current location using the browser's **Geolocation API**.
* Instantly fetches and displays local weather data without requiring manual input.

### 🔍 Manual City Search

* Allows users to search weather information by entering a city name.
* Provides a smooth fallback experience when location access is unavailable or denied.

### ☀️ UV Protection Alerts

* Includes an intelligent UV Index helper.
* Displays color-coded UV status levels with practical safety recommendations.

### 🎨 Dynamic User Interface

* Dashboard updates automatically based on user interaction.
* Supports both geolocation-based and manual weather searches seamlessly.

### 📱 Responsive Design

* Clean, modern, and mobile-friendly interface.
* Optimized for desktops, tablets, and smartphones.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skysync.git
cd skysync
```

### 2. Configure Your API Key

Navigate to:

```javascript
./helpers/key.js
```

Replace:

```javascript
"Your_Own_Weather_Api_Key"
```

with your WeatherAPI.com API key.

### 3. Launch the Application

Open:

```html
index.html
```

in your browser.

> **Important:** Use a local development server (such as the VS Code Live Server extension) to ensure JavaScript modules and the Geolocation API work correctly.

---

## 📂 Project Structure

```plaintext
SkySync/
│
├── index.html          # Main application structure
├── app.js              # Core application logic
├── style.css           # UI styling and responsiveness
│
└── helpers/
    ├── key.js          # Weather API key configuration
    └── uvray.js        # UV index classification logic
```

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)

### Web APIs

* Geolocation API
* Fetch API

### Weather Service

* WeatherAPI.com

---

## 🛡️ UV Index Classification

SkySync includes a dedicated UV helper that converts numerical UV values into meaningful safety guidance.

| UV Range | Status       | Safety Advice                                  |
| -------- | ------------ | ---------------------------------------------- |
| 0 – 2    | 🟢 Low       | Safe to stay outside.                          |
| 3 – 5    | 🟡 Moderate  | Wear sunscreen and a hat.                      |
| 6 – 7    | 🟠 High      | Seek shade and wear protection.                |
| 8 – 10   | 🔴 Very High | Avoid prolonged outdoor exposure at noon.      |
| 11+      | 🟣 Extreme   | High risk of harm. Stay indoors when possible. |

---

## 🎯 Future Enhancements

* 5-Day Weather Forecast
* Dark Mode Support
* Weather Icons & Animations
* Air Quality Index (AQI)
* Temperature Unit Toggle (°C / °F)

---

## 📜 License

This project is open-source and available for personal and educational use. Feel free to modify and improve it according to your needs.

---

## ❤️ Acknowledgements

Built with passion to help users stay informed, protected, and synced with the skies.

**Stay informed. Stay prepared. Stay SkySync. 🌤️**
