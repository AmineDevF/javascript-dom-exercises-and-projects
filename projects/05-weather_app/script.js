// Clé API pour accéder aux données météorologiques depuis OpenWeatherMap.
// Remplace 'c1d1fd315ae3d987ee0cf68509d9f96b' par ta propre clé API si nécessaire.
const apiKey = 'c1d1fd315ae3d987ee0cf68509d9f96b';

// Déclaration d'une autre variable pour la clé API, non utilisée dans le code.
// Celle-ci pourrait être supprimée pour éviter toute confusion.
const apiKey1 = 'your_openweathermap_api_key';

// Sélectionne le bouton de recherche dans le document HTML en utilisant son ID.
const searchBtn = document.getElementById('search-btn');

// Sélectionne le champ de saisie où l'utilisateur entre le nom de la ville.
const cityInput = document.getElementById('city-input');

// Sélectionne les éléments HTML où les informations météorologiques seront affichées.
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Sélectionne la section contenant les informations météorologiques.
const weatherInfo = document.querySelector('.weather-info');

// Sélectionne l'élément HTML où les messages d'erreur seront affichés.
const errorMessage = document.getElementById('error-message');

// Ajoute un gestionnaire d'événement au bouton de recherche.
// Lorsque le bouton est cliqué, la fonction anonyme vérifie si un nom de ville est entré.
searchBtn.addEventListener('click', () => {
    // Récupère et nettoie la valeur entrée par l'utilisateur dans le champ de saisie.
    const city = cityInput.value.trim();
    
    // Si un nom de ville a été entré, appelle la fonction pour obtenir les données météo.
    if (city) {
        getWeather(city);
    } else {
        // Si le champ est vide, affiche un message d'erreur demandant d'entrer un nom de ville valide.
        displayError('Please enter a valid city name.');
    }
});

// Fonction pour obtenir les données météo depuis l'API OpenWeatherMap pour la ville donnée.
function getWeather(city) {
    // Crée l'URL pour la requête API en incluant le nom de la ville et la clé API.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Effectue une requête pour obtenir les données météorologiques.
    fetch(url)
        // Convertit la réponse en un objet JSON.
        .then(response => response.json())
        // Traite les données reçues.
        .then(data => {
            // Si le code de réponse est 200, cela signifie que la ville a été trouvée avec succès.
            if (data.cod === 200) {
                // Met à jour l'interface utilisateur avec les nouvelles informations météo.
                updateWeatherInfo(data);

                // Efface tout message d'erreur précédent.
                clearError();
            } else {
                // Si la ville n'est pas trouvée, affiche un message d'erreur.
                displayError('City not found. Please try another city.');
            }
        })
        // Si une erreur se produit lors de la requête (ex: problème de connexion), affiche un message d'erreur.
        .catch(error => {
            displayError('An error occurred. Please try again later.');
            console.error(error);
        });
}

// Fonction pour mettre à jour les informations météorologiques affichées à l'écran.
function updateWeatherInfo(data) {
    // Affiche le nom de la ville.
    console.log(data)
    cityName.textContent = data.name;
    // Affiche la température en degrés Celsius, arrondie à une décimale.
    temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
    // Affiche la description du temps avec un emoji, et capitalise la première lettre.
    description.textContent = `🌤️ ${capitalize(data.weather[0].description)}`;
    // Affiche le taux d'humidité.
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    // Affiche la vitesse du vent en mètre par seconde, arrondie à une décimale.
    wind.textContent = `💨 Wind Speed: ${data.wind.speed.toFixed(1)} m/s`;

    // Rend visible la section contenant les informations météo.
    weatherInfo.style.display = 'block';
}

// Fonction pour capitaliser la première lettre d'une chaîne de caractères.
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fonction pour afficher un message d'erreur.
function displayError(message) {
    // Affiche le message d'erreur passé en paramètre.
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    // Masque les informations météo, car elles ne sont pas pertinentes si une erreur est survenue.
    weatherInfo.style.display = 'none';
}

// Fonction pour effacer le message d'erreur.
function clearError() {
    // Réinitialise le contenu et masque l'affichage du message d'erreur.
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}
