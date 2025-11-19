class BaltorussianTranslator {
    constructor() {
        this.scriptType = 'cyrillic';
        this.grammarRules = this.initializeGrammarRules();
        this.dictionary = this.initializeDictionary();
        this.pronouns = this.initializePronouns();
        this.smartEndings = this.initializeSmartEndings();
    }

    initializeGrammarRules() {
        return {
            cases: {
                nominative: { name: 'Именительный', question: 'кто? что?' },
                genitive: { name: 'Родительный', question: 'кого? чего?', endings: { singular: ['a', 'as'], plural: ['u', 'as'] } },
                dative: { name: 'Дательный', question: 'кому? чему?', endings: { singular: ['am', 'ai'], plural: ['iem', 'ām'] } },
                accusative: { name: 'Винительный', question: 'кого? что?', endings: { singular: ['u', 'u'], plural: ['us', 'as'] } },
                instrumental: { name: 'Творительный', question: 'кем? чем?', endings: { singular: ['u', 'u'], plural: ['iem', 'ām'] } },
                locative: { name: 'Предложный', question: 'о ком? о чём?', endings: { singular: ['ā', 'ā'], plural: ['os', 'ās'] } }
            },
            verbEndings: {
                present: {
                    'я': 'u',     // govoru
                    'ты': 'i',    // govori
                    'он': '',     // govor
                    'она': '',    // govor
                    'оно': '',    // govor
                    'мы': 'am',   // govoram
                    'вы': 'at',   // govorat
                    'они': ''     // govor
                },
                past: {
                    masculine: 'ja',
                    feminine: 'ja',
                    plural: 'ja'
                }
            }
        };
    }

    initializeDictionary() {
        return {
            // Существительные { основа, тип склонения, род }
            'человек': { base: 'cilvēk', type: 'masc', gender: 'masc' },
            'дом': { base: 'māj', type: 'fem', gender: 'fem' },
            'вода': { base: 'ūden', type: 'masc', gender: 'masc' },
            'хлеб': { base: 'maiz', type: 'fem', gender: 'fem' },
            'мать': { base: 'māt', type: 'fem', gender: 'fem' },
            'отец': { base: 'tēv', type: 'masc', gender: 'masc' },
            'город': { base: 'pilsēt', type: 'fem', gender: 'fem' },
            'книга': { base: 'grāmat', type: 'fem', gender: 'fem' },
            'окно': { base: 'log', type: 'masc', gender: 'masc' },
            'море': { base: 'jūr', type: 'fem', gender: 'fem' },
            'девушка': { base: 'meiten', type: 'fem', gender: 'fem' },
            'парень': { base: 'zēn', type: 'masc', gender: 'masc' },
            'машина': { base: 'mašīn', type: 'fem', gender: 'fem' },
            'улица': { base: 'īl', type: 'fem', gender: 'fem' },
            'день': { base: 'dien', type: 'fem', gender: 'fem' },
            'ночь': { base: 'nakts', type: 'fem', gender: 'fem' },
            'время': { base: 'laik', type: 'masc', gender: 'masc' },
            'рука': { base: 'rok', type: 'fem', gender: 'fem' },
            'нога': { base: 'kāj', type: 'fem', gender: 'fem' },
            'голова': { base: 'galv', type: 'fem', gender: 'fem' },

            // Глаголы { основа }
            'видеть': { base: 'redz' },
            'говорить': { base: 'run' },
            'идти': { base: 'iet' },
            'дать': { base: 'dot' },
            'есть': { base: 'ēst' },
            'пить': { base: 'dzert' },
            'читать': { base: 'lasīt' },
            'писать': { base: 'rakstīt' },
            'понимать': { base: 'saprast' },
            'знать': { base: 'zināt' },
            'любить': { base: 'mīlēt' },
            'работать': { base: 'strādāt' },
            'жить': { base: 'dzīvot' },
            'смотреть': { base: 'skatīties' },
            'слышать': { base: 'dzirdēt' },
            'думать': { base: 'domāt' }
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
            'им': { base: 'viņiem', type: 'pronoun-dative' },

            'меня': { base: 'mani', type: 'pronoun-accusative' },
            'тебя': { base: 'tevi', type: 'pronoun-accusative' },
            'его': { base: 'viņu', type: 'pronoun-accusative' },
            'её': { base: 'viņu', type: 'pronoun-accusative' },
            'нас': { base: 'mūs', type: 'pronoun-accusative' },
            'вас': { base: 'jūs', type: 'pronoun-accusative' },
            'их': { base: 'viņus', type: 'pronoun-accusative' }
        };
    }

    initializeSmartEndings() {
        return {
            // Латышские окончания для русских прилагательных
            adjectiveEndings: {
                'ый': 'ais',    // крутой -> krutais
                'ой': 'ais',    // большой -> bolšais  
                'ий': 'ais',    // синий -> siniais
                'ая': 'a',      // красивая -> krasiva
                'яя': 'a',      // синяя -> sinia
                'ое': 'ais',    // большое -> bolšais
                'ее': 'ais',    // синее -> siniais
                'ые': 'ie',     // красивые -> krasivie
                'ие': 'ie'      // синие -> sinie
            },
            
            // Латышские падежные окончания
            caseEndings: {
                'masc': {
                    'nominative': 's',
                    'genitive': 'a', 
                    'dative': 'am',
                    'accusative': 'u',
                    'instrumental': 'u',
                    'locative': 'ā'
                },
                'fem': {
                    'nominative': 'a',
                    'genitive': 'as',
                    'dative': 'ai',
                    'accusative': 'u',
                    'instrumental': 'u', 
                    'locative': 'ā'
                },
                'neut': {
                    'nominative': 's',
                    'genitive': 'a',
                    'dative': 'am',
                    'accusative': 'u',
                    'instrumental': 'u',
                    'locative': 'ā'
                }
            }
        };
    }

    setScriptType(type) {
        this.scriptType = type;
    }

    // Автоматическое определение прилагательных
    isAdjective(word) {
        const adjectiveEndings = ['ый', 'ой', 'ий', 'ая', 'яя', 'ое', 'ее', 'ые', 'ие'];
        return adjectiveEndings.some(ending => word.toLowerCase().endsWith(ending));
    }

    // Применение балтийских окончаний к прилагательным
    applyBalticAdjectiveEnding(word) {
        const lowerWord = word.toLowerCase();
        
        for (const [russianEnding, balticEnding] of Object.entries(this.smartEndings.adjectiveEndings)) {
            if (lowerWord.endsWith(russianEnding)) {
                const base = this.toLatin(lowerWord.slice(0, -russianEnding.length));
                return base + balticEnding;
            }
        }
        
        return this.toLatin(word);
    }

    // Получение падежного окончания для существительных
    getCaseEnding(gender, nounCase) {
        const genderEndings = this.smartEndings.caseEndings[gender] || this.smartEndings.caseEndings['masc'];
        return genderEndings[nounCase] || '';
    }

    // Определение падежа по контексту
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
        if (['через', 'про', 'сквозь', 'в', 'на'].includes(lowerPrev)) {
            return 'accusative';
        }
        if (['с', 'со', 'под', 'за', 'над', 'перед', 'между'].includes(lowerPrev)) {
            return 'instrumental';
        }
        if (['о', 'об', 'в', 'на', 'при'].includes(lowerPrev)) {
            return 'locative';
        }

        // Определение по глаголам
        if (['видеть', 'смотреть', 'любить', 'знать', 'понимать'].includes(lowerPrev)) {
            return 'accusative';
        }
        if (['дать', 'подарить', 'показать', 'объяснить'].includes(lowerPrev) && position > 0) {
            return 'dative';
        }

        return position === 0 ? 'nominative' : 'accusative';
    }

    // Определение числа
    detectNumber(word) {
        const pluralEndings = ['и', 'ы', 'а', 'я'];
        const lastChar = word.toLowerCase().slice(-1);
        return pluralEndings.includes(lastChar) ? 'plural' : 'singular';
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

            let currentPronoun = 'он';

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
                // Обработка прилагательных с балтийскими окончаниями
                else if (this.isAdjective(lowerWord)) {
                    translatedWord = this.applyBalticAdjectiveEnding(word);
                    grammarInfo = `прил. (балт. окончание) -> ${translatedWord}`;
                }
                // Обработка существительных
                else if (this.dictionary[lowerWord] && this.dictionary[lowerWord].type) {
                    const noun = this.dictionary[lowerWord];
                    const nounCase = this.detectCase(word, index, trimmedSentence, prevWord, nextWord);
                    const number = this.detectNumber(word);
                    
                    ending = this.getCaseEnding(noun.gender, nounCase);
                    originalBase = noun.base;
                    translatedWord = noun.base + ending;
                    
                    grammarInfo = `сущ. (${this.grammarRules.cases[nounCase].name}) -> ${noun.base} + ${ending}`;
                }
                // Обработка глаголов
                else if (this.dictionary[lowerWord] && this.dictionary[lowerWord].base) {
                    const verb = this.dictionary[lowerWord];
                    ending = this.getVerbEnding(currentPronoun);
                    originalBase = verb.base;
                    translatedWord = verb.base + ending;
                    
                    grammarInfo = `глагол (${currentPronoun}) -> ${verb.base} + ${ending}`;
                }
                // Предлоги и другие слова
                else {
                    translatedWord = this.toLatin(word);
                    grammarInfo = 'неизменяемое слово';
                }

                // Конвертация в выбранную письменность
                if (this.scriptType === 'latin') {
                    translatedWord = this.toLatin(translatedWord);
                } else {
                    // Для кириллицы оставляем как есть (но можно добавить обратную транслитерацию)
                }

                translatedWords.push(translatedWord);

                if (originalBase || grammarInfo.includes('балт. окончание')) {
                    analysis.push({
                        original: word,
                        translated: translatedWord,
                        base: originalBase || word,
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
    }        if (['через', 'про', 'сквозь'].includes(lowerPrev)) {
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
