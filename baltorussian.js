class BaltorussianTranslator {
    constructor() {
        this.scriptType = 'cyrillic';
        this.grammarRules = this.initializeGrammarRules();
        this.dictionary = this.initializeDictionary();
        this.pronouns = this.initializePronouns();
    }

    initializeGrammarRules() {
        return {
            cases: {
                nominative: { name: 'Именительный', question: 'кто? что?' },
                genitive: { name: 'Родительный', question: 'кого? чего?', endings: { singular: ['a', 'ja'], plural: ['ov', 'ej'] } },
                dative: { name: 'Дательный', question: 'кому? чему?', endings: { singular: ['u', 'ju'], plural: ['am', 'jam'] } },
                accusative: { name: 'Винительный', question: 'кого? что?', endings: { singular: ['u', 'ju'], plural: ['ov', 'ej'] } },
                instrumental: { name: 'Творительный', question: 'кем? чем?', endings: { singular: ['om', 'em'], plural: ['ami', 'jami'] } },
                locative: { name: 'Предложный', question: 'о ком? о чём?', endings: { singular: ['e', 'je'], plural: ['ah', 'jah'] } }
            },
            verbEndings: {
                present: {
                    'я': 'u',     // govoru
                    'ты': 'i',    // govori
                    'он': '',     // govor
                    'она': '',    // govor
                    'оно': '',    // govor
                    'мы': 'am',   // govoram
                    'вы': 'ate',  // govorate
                    'они': ''     // govor
                },
                past: {
                    masculine: 'il',
                    feminine: 'ila',
                    plural: 'ili'
                }
            }
        };
    }

    initializeDictionary() {
        return {
            // Существительные { основа, тип склонения, род }
            'человек': { base: 'čelovek', type: 'masc', gender: 'masc' },
            'дом': { base: 'dom', type: 'masc', gender: 'masc' },
            'вода': { base: 'voda', type: 'fem', gender: 'fem' },
            'хлеб': { base: 'hleb', type: 'masc', gender: 'masc' },
            'мать': { base: 'mat', type: 'fem', gender: 'fem' },
            'отец': { base: 'otec', type: 'masc', gender: 'masc' },
            'город': { base: 'gorod', type: 'masc', gender: 'masc' },
            'книга': { base: 'kniga', type: 'fem', gender: 'fem' },
            'окно': { base: 'okno', type: 'neut', gender: 'neut' },
            'море': { base: 'more', type: 'neut', gender: 'neut' },

            // Прилагательные { основа }
            'красивый': { base: 'krasiv' },
            'большой': { base: 'bolš' },
            'маленький': { base: 'malenjk' },
            'хороший': { base: 'horoš' },
            'новый': { base: 'nov' },
            'старый': { base: 'star' },

            // Глаголы { основа }
            'видеть': { base: 'vid' },
            'говорить': { base: 'govor' },
            'идти': { base: 'is' },
            'дать': { base: 'dav' },
            'есть': { base: 'jed' },
            'пить': { base: 'pij' },
            'читать': { base: 'čitaj' },
            'писать': { base: 'pis' }
        };
    }

    initializePronouns() {
        return {
            'я': { base: 'es', type: 'pronoun' },
            'ты': { base: 'tu', type: 'pronoun' },
            'он': { base: 'viņš', type: 'pronoun' },
            'она': { base: 'viņa', type: 'pronoun' },
            'оно': { base: 'tas', type: 'pronoun' },
            'мы': { base: 'mēs', type: 'pronoun' },
            'вы': { base: 'jūs', type: 'pronoun' },
            'они': { base: 'viņi', type: 'pronoun' },
            
            'мне': { base: 'man', type: 'pronoun-dative' },
            'тебе': { base: 'tev', type: 'pronoun-dative' },
            'ему': { base: 'viņam', type: 'pronoun-dative' },
            'ей': { base: 'viņai', type: 'pronoun-dative' },
            'нам': { base: 'mums', type: 'pronoun-dative' },
            'вам': { base: 'jums', type: 'pronoun-dative' },
            'им': { base: 'viņiem', type: 'pronoun-dative' }
        };
    }

    setScriptType(type) {
        this.scriptType = type;
    }

    // Определение падежа по контексту (упрощенная версия)
    detectCase(word, position, sentence, prevWord, nextWord) {
        const lowerWord = word.toLowerCase();
        const lowerPrev = prevWord ? prevWord.toLowerCase() : '';
        const lowerNext = nextWord ? nextWord.toLowerCase() : '';

        // Определение по предлогам
        if (['у', 'от', 'из', 'до', 'без', 'для', 'ради', 'около'].includes(lowerPrev)) {
            return 'genitive';
        }
        if (['к', 'по', 'благодаря', 'вопреки'].includes(lowerPrev)) {
            return 'dative';
        }
        if (['через', 'про', 'сквозь'].includes(lowerPrev)) {
            return 'accusative';
        }
        if (['с', 'со', 'под', 'за', 'над', 'перед', 'между'].includes(lowerPrev)) {
            return 'instrumental';
        }
        if (['в', 'во', 'на', 'о', 'об', 'при'].includes(lowerPrev)) {
            return 'locative';
        }

        // Определение по глаголам
        if (['видеть', 'смотреть', 'любить', 'знать', 'понимать'].includes(lowerPrev)) {
            return 'accusative';
        }
        if (['дать', 'подарить', 'показать', 'объяснить'].includes(lowerPrev) && position > 0) {
            return 'dative';
        }

        // По умолчанию
        return position === 0 ? 'nominative' : 'accusative';
    }

    // Определение числа
    detectNumber(word) {
        const pluralEndings = ['и', 'ы', 'а', 'я'];
        const lastChar = word.toLowerCase().slice(-1);
        return pluralEndings.includes(lastChar) ? 'plural' : 'singular';
    }

    // Получение окончания для существительного
    getNounEnding(nounType, gender, number, nounCase) {
        const endings = this.grammarRules.cases[nounCase].endings;
        if (!endings) return '';

        const numberEndings = endings[number];
        if (!numberEndings) return '';

        // Простая логика выбора окончания на основе типа и рода
        if (nounType === 'masc') {
            return numberEndings[0]; // Первое окончание для мужского рода
        } else if (nounType === 'fem') {
            return numberEndings[1] || numberEndings[0]; // Второе для женского, или первое
        } else {
            return numberEndings[1] || numberEndings[0]; // Для среднего
        }
    }

    // Согласование прилагательных с существительными
    getAdjectiveEnding(gender, number, nounCase) {
        const baseEndings = {
            'masc': { singular: { nominative: 'ij', other: 'ogo' } },
            'fem': { singular: { nominative: 'aja', other: 'oj' } },
            'neut': { singular: { nominative: 'oje', other: 'ogo' } }
        };

        const genderEndings = baseEndings[gender] || baseEndings['masc'];
        const isNominative = nounCase === 'nominative';
        
        return isNominative ? genderEndings.singular.nominative : genderEndings.singular.other;
    }

    // Получение глагольного окончания
    getVerbEnding(pronoun, tense = 'present') {
        const endings = this.grammarRules.verbEndings[tense];
        return endings[pronoun] || '';
    }

    // Транслитерация кириллица-латиница
    toLatin(text) {
        const translitMap = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'jo', 'ж': 'ž', 'з': 'z', 'и': 'i',
            'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č',
            'ш': 'š', 'щ': 'šč', 'ъ': '', 'ы': 'y', 'ь': '',
            'э': 'e', 'ю': 'ju', 'я': 'ja',
            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
            'Е': 'E', 'Ё': 'Jo', 'Ж': 'Ž', 'З': 'Z', 'И': 'I',
            'Й': 'J', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
            'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
            'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Č',
            'Ш': 'Š', 'Щ': 'Šč', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
            'Э': 'E', 'Ю': 'Ju', 'Я': 'Ja'
        };

        return text.split('').map(char => translitMap[char] || char).join('');
    }

    // Основной метод перевода
    translate(text) {
        if (!text.trim()) return { translation: '', analysis: [] };

        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        let fullTranslation = '';
        let fullAnalysis = [];

        sentences.forEach(sentence => {
            const trimmedSentence = sentence.trim();
            if (!trimmedSentence) return;

            const words = trimmedSentence.split(/\s+/);
            const translatedWords = [];
            const analysis = [];

            let currentPronoun = 'он'; // По умолчанию

            words.forEach((word, index) => {
                const prevWord = index > 0 ? words[index - 1] : '';
                const nextWord = index < words.length - 1 ? words[index + 1] : '';
                const lowerWord = word.toLowerCase();

                let translatedWord = word;
                let originalBase = '';
                let ending = '';
                let grammarInfo = '';

                // Обработка местоимений
                if (this.pronouns[lowerWord]) {
                    const pronoun = this.pronouns[lowerWord];
                    translatedWord = pronoun.base;
                    currentPronoun = word;
                    grammarInfo = `местоимение -> ${translatedWord}`;
                }
                // Обработка существительных
                else if (this.dictionary[lowerWord] && this.dictionary[lowerWord].type) {
                    const noun = this.dictionary[lowerWord];
                    const nounCase = this.detectCase(word, index, trimmedSentence, prevWord, nextWord);
                    const number = this.detectNumber(word);
                    
                    ending = this.getNounEnding(noun.type, noun.gender, number, nounCase);
                    originalBase = noun.base;
                    translatedWord = noun.base + ending;
                    
                    grammarInfo = `сущ. (${this.grammarRules.cases[nounCase].name}) -> ${noun.base} + ${ending}`;
                }
                // Обработка прилагательных
                else if (this.dictionary[lowerWord] && !this.dictionary[lowerWord].type) {
                    const adjective = this.dictionary[lowerWord];
                    // Упрощенное согласование - ищем следующее существительное
                    let gender = 'masc';
                    let number = 'singular';
                    let nounCase = 'nominative';

                    for (let i = index + 1; i < words.length; i++) {
                        const nextWord = words[i].toLowerCase();
                        if (this.dictionary[nextWord] && this.dictionary[nextWord].type) {
                            const nextNoun = this.dictionary[nextWord];
                            gender = nextNoun.gender;
                            number = this.detectNumber(words[i]);
                            nounCase = this.detectCase(words[i], i, trimmedSentence, words[i-1], words[i+1]);
                            break;
                        }
                    }

                    ending = this.getAdjectiveEnding(gender, number, nounCase);
                    originalBase = adjective.base;
                    translatedWord = adjective.base + ending;
                    
                    grammarInfo = `прил. (${gender}, ${number}) -> ${adjective.base} + ${ending}`;
                }
                // Обработка глаголов
                else if (this.dictionary[lowerWord] && this.dictionary[lowerWord].base) {
                    const verb = this.dictionary[lowerWord];
                    ending = this.getVerbEnding(currentPronoun);
                    originalBase = verb.base;
                    translatedWord = verb.base + ending;
                    
                    grammarInfo = `глагол (${currentPronoun}) -> ${verb.base} + ${ending}`;
                }
                // Предлоги и другие слова остаются как есть
                else {
                    translatedWord = word;
                    grammarInfo = 'неизменяемое слово';
                }

                // Конвертация в выбранную письменность
                if (this.scriptType === 'latin') {
                    translatedWord = this.toLatin(translatedWord);
                }

                translatedWords.push(translatedWord);

                if (originalBase) {
                    analysis.push({
                        original: word,
                        translated: translatedWord,
                        base: originalBase,
                        ending: ending,
                        info: grammarInfo
                    });
                }
            });

            const translatedSentence = translatedWords.join(' ');
            fullTranslation += translatedSentence + '. ';
            fullAnalysis = fullAnalysis.concat(analysis);
        });

        return {
            translation: fullTranslation.trim(),
            analysis: fullAnalysis
        };
    }
                                                                       }
