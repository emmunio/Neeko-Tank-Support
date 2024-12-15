document.addEventListener('DOMContentLoaded', function () {
    // Metoda 1: Sprawdzenie MIME Type za pomocą navigator.mimeTypes
    function checkMIMESupport() {
        return !!navigator.mimeTypes['image/avif'];
    }

    // Metoda 2: Tworzenie i ładowanie obiektu Image z base64
    function checkImageSupport() {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAAAAGF2aWZoYXZpZgAAABlhcmlsAAAAANpwAA';
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    // Metoda 3: Sprawdzenie wsparcia przez Canvas (toDataURL)
    function checkCanvasSupport() {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    }

    // Metoda 4: Ładowanie rzeczywistego pliku .avif (przykład z serwerem)
    function checkServerImageSupport() {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = 'test.avif';  // Zamień na prawdziwą ścieżkę do pliku .avif
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    // Funkcja do sprawdzania, czy urządzenie to telewizor
    function isSmartTV() {
        const userAgent = navigator.userAgent.toLowerCase();
        const tvBrands = ['smart-tv', 'smarttv', 'samsung', 'lg', 'hbbtv', 'webos', 'netcast', 'tizen'];
        return tvBrands.some(brand => userAgent.includes(brand));
    }

    // Funkcja, która uruchamia wszystkie metody
    async function checkAVIFSupport() {
        // Blokada telewizorów
        if (isSmartTV()) {
            document.body.innerHTML = `
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                    height: 100vh;
                    background-color: #F9D4FF;
                ">
                    <h1>Strona nie jest dostępna na telewizorach Smart TV.</h1>
                </div>
            `;
            return;
        }

        const mimeSupport = checkMIMESupport();  // Szybka metoda synchroniczna
        const imageSupport = await checkImageSupport();  // Asynchroniczne sprawdzenie ładowania obrazu base64
        const canvasSupport = checkCanvasSupport();  // Sprawdzenie wsparcia w Canvas
        const serverImageSupport = await checkServerImageSupport();  // Asynchroniczne ładowanie pliku z serwera

        // Jeżeli wszystkie metody zwrócą false, pokaż błąd
        if (!mimeSupport && !imageSupport && !canvasSupport && !serverImageSupport) {
            document.body.innerHTML = `
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100vw;
                    height: 100vh;
                    background-color: #F9D4FF;
                ">
                    <h1>Browser not supported. Please update your software.</h1>
                </div>
            `;
        } else {
            console.log('Przeglądarka obsługuje AVIF');
        }
    }

    // Wywołanie funkcji sprawdzającej wsparcie
    checkAVIFSupport();
});
