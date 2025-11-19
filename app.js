class BaltorussianApp {
    constructor() {
        this.translator = new BaltorussianTranslator();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const russianTextarea = document.getElementById('russianText');
        const scriptTypeSelect = document.getElementById('scriptType');
        const swapButton = document.getElementById('swapTexts');
        const exampleButtons = document.querySelectorAll('.example-buttons button');

        // Перевод при вводе
        russianTextarea.addEventListener('input', () => {
            this.translateText();
        });

        // Смена письменности
        scriptTypeSelect.addEventListener('change', (e) => {
            this.translator.setScriptType(e.target.value);
            this.translateText();
        });

        // Кнопка замены текстов
        swapButton.addEventListener('click', () => {
            const output = document.getElementById('baltorussianOutput').textContent;
            if (output) {
                russianTextarea.value = output;
                this.translateText();
            }
        });

        // Примеры
        exampleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                russianTextarea.value = e.target.dataset.text;
                this.translateText();
            });
        });
    }

    translateText() {
        const text = document.getElementById('russianText').value;
        const result = this.translator.translate(text);
        
        this.displayTranslation(result.translation);
        this.displayGrammarInfo(result.analysis);
    }

    displayTranslation(translatedText) {
        const outputElement = document.getElementById('baltorussianOutput');
        
        if (this.translator.scriptType === 'latin') {
            outputElement.textContent = translatedText;
        } else {
            outputElement.textContent = translatedText;
        }
    }

    displayGrammarInfo(analysis) {
        const grammarInfoElement = document.getElementById('grammarInfo');
        
        if (analysis.length === 0) {
            grammarInfoElement.innerHTML = '<p>Введите текст для анализа грамматики</p>';
            return;
        }

        let html = '<h4>Грамматический анализ:</h4>';
        
        analysis.forEach(item => {
            const endingDisplay = item.ending ? 
                `<span class="ending">+${item.ending}</span>` : 
                '<em>без окончания</em>';
            
            html += `
                <div class="grammar-item">
                    <strong>"${item.original}"</strong> → 
                    <span class="word-change">${item.base}</span>${endingDisplay} 
                    <br><small>${item.info}</small>
                </div>
            `;
        });

        grammarInfoElement.innerHTML = html;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new BaltorussianApp();
});
