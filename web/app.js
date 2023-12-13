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
        const dropdownOptions = side === "left"
            ? '<option class="dropdown__option" value="auto" selected>Определить язык</option>'
            : '';
    
        const languageOptions = languages.map(language => {
            return `<option class="dropdown__option" value="${language.name}">${language.name}</option>`;
        }).join('');
    
        return `
            <section class="app__frame app__frame--${side}">
                <select class="dropdown" name="lang" id="${id}">
                    ${dropdownOptions}
                    ${languageOptions}
                </select>
                <textarea id="text-area-${side}" ${attr} class="app__frame--input" placeholder="${text}" id="iText"></textarea>
            </section>
        `;
    }
    

    app.innerHTML = `
        <div class="app__header"></div>
        ${getFrame("left", "iLang", "Введите, что вы хотите перевести...", "")}
        <button class="app__swap" onclick="swap()">
            <img class="app__swap--image" src="./assets/icons/swap.svg" alt="Swap">
        </button>
        ${getFrame("right", "oLang", "", "readonly")}
        <button class="app__go" id="go" onclick="translateText()">Перевод с ChatGPT<img class="app__go--image" id="goImage" src="./assets/icons/go.svg" alt="Go"></button>
    `;
}

async function translateText() {
    const oData = [document.getElementById('iLang').value, document.getElementById('oLang').value, document.getElementById('text-area-left').value];

    document.getElementById('go').disabled = true;
    
    document.getElementById('go').classList.toggle('app__go--block')
    document.getElementById('goImage').classList.toggle('hidden')
    
    document.getElementById('text-area-right').value = await eel.get_data(oData)();
    
    document.getElementById('go').classList.toggle('app__go--block')
    document.getElementById('goImage').classList.toggle('hidden')

    document.getElementById('go').disabled = false;
}

function swap() {
    const leftDropdown = document.getElementById('iLang');
    const rightDropdown = document.getElementById('oLang');

    const leftDropdownValue = leftDropdown.value;
    const rightDropdownValue = rightDropdown.value;

    const leftInput = document.getElementById('text-area-left');
    const rightInput = document.getElementById('text-area-right');

    const leftInputValue = leftInput.value;
    const rightInputValue = rightInput.value;

    if (leftDropdownValue !== "auto") {
        leftDropdown.value = rightDropdownValue;
        rightDropdown.value = leftDropdownValue;

        if (leftInputValue !== "" & rightInputValue !== "") {
            leftInput.value = rightInputValue;
            rightInput.value = leftInputValue;
        }
    }
}

initApp();