// Registrace Service Workeru pro offline podporu a lepší výkon
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Pokus o registraci service-worker.js
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker byl zaregistrován s rozsahem:', registration.scope);
        }).catch(error => {
            console.error('Registrace Service Workeru selhala:', error);
        });
    });
}

// Získání odkazů na HTML prvky podle jejich ID
const addTab = document.getElementById('add-tab'); // Záložka pro přidání filmu
const listTab = document.getElementById('list-tab'); // Záložka pro seznam filmů
const addMovieSection = document.getElementById('add-movie'); // Sekce pro přidání filmu
const movieListSection = document.getElementById('movie-list'); // Sekce pro seznam filmů
const saveButton = document.getElementById('save-button'); // Tlačítko pro uložení filmu
const moviesContainer = document.getElementById('movies-container'); // Kontejner pro zobrazení uložených filmů

// Přepínání na záložku "Přidat film"
addTab.addEventListener('click', () => {
    addTab.classList.add('active'); // Označení záložky "Přidat film" jako aktivní
    listTab.classList.remove('active'); // Odebrání aktivního stavu ze záložky "Seznam filmů"
    addMovieSection.classList.remove('hidden'); // Zobrazení sekce pro přidání filmu
    movieListSection.classList.add('hidden'); // Skrytí sekce se seznamem filmů
});

// Přepínání na záložku "Seznam filmů"
listTab.addEventListener('click', () => {
    listTab.classList.add('active'); // Označení záložky "Seznam filmů" jako aktivní
    addTab.classList.remove('active'); // Odebrání aktivního stavu ze záložky "Přidat film"
    movieListSection.classList.remove('hidden'); // Zobrazení sekce se seznamem filmů
    addMovieSection.classList.add('hidden'); // Skrytí sekce pro přidání filmu
    displayMovies(); // Zobrazení uložených filmů
});

// Ukládání filmu do localStorage
saveButton.addEventListener('click', () => {
    // Získání hodnot z formuláře
    const title = document.getElementById('Z1').src; // Název filmu
    const description = document.getElementById('Z2').src; // Popis filmu
    const rating = document.getElementById('Z3').src; // Hodnocení filmu

    // Kontrola, zda jsou všechna pole vyplněná
    
        // Vytvoření objektu filmu
        const movie = { title, description, rating };
        // Načtení existujících filmů z localStorage nebo vytvoření prázdného pole
        const movies = JSON.parse(localStorage.getItem('movies')) || [];
        // Přidání nového filmu do seznamu
        movies.push(movie);
        // Uložení aktualizovaného seznamu filmů do localStorage
        localStorage.setItem('movies', JSON.stringify(movies));

        // Potvrzení uložení a vyčištění formuláře
        alert('Film byl uložen!');
        document.getElementById('Z1').value = '';
        document.getElementById('Z2').value = '';
        document.getElementById('Z3').value = '';
});



// Funkce pro zobrazení uložených filmů
function displayMovies() {
    // Načtení filmů z localStorage nebo prázdného pole
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    // Vyčištění kontejneru před zobrazením filmů
    moviesContainer.innerHTML = '';

    // Pokud nejsou žádné uložené filmy, zobrazí se hlášení
    if (movies.length === 0) {
        moviesContainer.innerHTML = '<p>Žádné filmy nejsou uložené.</p>';
        return;
    }

    // Pro každý uložený film vytvoříme HTML prvek a přidáme ho do kontejneru
    movies.forEach((movie) => {
        const movieElement = document.createElement('div'); // Vytvoření nového divu pro film
        movieElement.classList.add('movie'); // Přidání třídy pro stylování
        movieElement.innerHTML = `
            <h3>${movie.title}</h3> <!-- Zobrazení názvu filmu -->
            <p>${movie.description}</p> <!-- Zobrazení popisu filmu -->
            <p><strong>Hodnocení:</strong> ${movie.rating}/10</p> <!-- Zobrazení hodnocení filmu -->
        `;
        moviesContainer.appendChild(movieElement); // Přidání divu filmu do kontejneru
    });
}
