const app = document.getElementById('app');

async function fetchLanguages() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const uniqueLanguages = {};

        countries.forEach(country => {
            if (country.languages) {
                const languageCodes = Object.keys(country.languages);
                languageCodes.forEach(languageCode => {
                    uniqueLanguages[languageCode] = {
                        code: languageCode,
                        name: country.languages[languageCode],
                    };
                });
            }
        });

        return Object.values(uniqueLanguages);
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
}

async function initApp() {
    const languages = await fetchLanguages();

    function getFrame(side, id, text, attr) {
        const dropdownOptions = languages.map(language => {
            return `<option class="dropdown__option" value="${language.name}">${language.name}</option>`;
        }).join('');

        return `
            <section class="app__frame app__frame--${side}">
                <select class="dropdown" name="lang" id="${id}">
                    ${dropdownOptions}
                </select>
                <textarea ${attr} class="app__frame--input" placeholder="${text}" id="iText"></textarea>
            </section>
        `;
    }

    app.innerHTML = `
        ${getFrame("left", "iLang", "Введите, что вы хотите перевести...", "")}
        ${getFrame("right", "oLang", "", "readonly")}
        <button class="app__go" onclick="Translate()">Перевести с ChatGPT</button>
    `;
}

function Translate() {
    const fromLang = document.getElementById('iLang').value;
    const toLang = document.getElementById('oLang').value;
    const text = document.getElementById('iText').value;

    console.log(`Перевод с ${fromLang}, на ${toLang}, текст ${text}`);
}

initApp();