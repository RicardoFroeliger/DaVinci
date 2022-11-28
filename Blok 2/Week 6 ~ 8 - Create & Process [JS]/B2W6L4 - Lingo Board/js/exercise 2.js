window.onload = () => {
    const createElement = (element, Class, target, text, type) => {
        let elm = document.createElement(element);
        if(text && text !== null) elm.appendChild(document.createTextNode(text));
        if(type) elm.type = type
        elm.classList.add(Class);
        target.appendChild(elm);
        return elm;
    };

    /* Create Body of Board */
    let topDiv = createElement('div', 'top', document.body);
    let bottomDiv = createElement('div', 'bottom', document.body);

    /* Create Inputs and Their Labels */
    createElement('h1', 'top', topDiv, 'Word:');
    createElement('h1', 'bottom', topDiv, 'Check Letter:');
    let topInput = createElement('input', 'top', topDiv, null, 'text');
    let bottomInput = createElement('input', 'bottom', topDiv, null, 'text');




    
    /* Detects When a Input is Updated */
    let lastChanges = [topInput.value, bottomInput.value];
    setInterval(() => {
        if(
            lastChanges[0] !== topInput.value || 
            lastChanges[1] !== bottomInput.value
        ) inputUpdate(); 
        lastChanges = [topInput.value, bottomInput.value];
    }, 10);

    /* Code Executed if Input is Updated */
    const inputUpdate = () => {
        let boxes = [];
        for(const BOX of document.querySelectorAll('div.box')) {
            BOX.parentNode.removeChild(BOX);
        };

        const createBoxes = letters => {
            let leftValEven = (((letters.length + 1) / 2) * 15) - 15;
            let leftValOdd = ((letters.length - 1) / 2) * 15;
            let allBoxes = [];
            for(const LETTER of letters.reverse()) {
                if(letters.length % 2 == 0) {
                    let box = createElement('div', 'box', bottomDiv, LETTER);
                    box.style.left = `calc(50% + ${leftValEven}vmin)`;
                    leftValEven -= 15;
                    allBoxes.push(box);
                } else if(letters.length % 2 == 1) {
                    let box = createElement('div', 'box', bottomDiv, LETTER);
                    box.style.left = `calc(50% + ${leftValOdd}vmin)`;
                    leftValOdd -= 15;
                    allBoxes.push(box);
                };
            };
            return allBoxes;
        };

        /* Validate Top Input */
        if(!topInput.value.match(/^[A-Za-z]+$/) || topInput.value.length > 8) {
            topInput.value = '';
        } else {
            let characters = topInput.value.split('');
            for(let C in characters) characters[C] = characters[C].toUpperCase();
            boxes = createBoxes(characters).reverse();
        };
        
        
        if(topInput.value.length > 2) {
        
            /* Validate Bottom Input */
            if(!bottomInput.value.match(/^[A-Za-z]+$/) || lastChanges[0] !== topInput.value) {
                bottomInput.value = '';
            } else if(bottomInput.value.length > 1) {
                let characters = bottomInput.value.split('');
                characters.shift();
                bottomInput.value = characters;
            };
        
            /* Change Box Appearance */
            let topChars = topInput.value.toLowerCase().split('');
            for(const CHAR of topChars) {
                if(CHAR === bottomInput.value.toLowerCase()) {
                    let indexes = [];
                    for(let i = 0; i < topChars.length; i++) if(topChars[i] === CHAR) indexes.push(i);
                    for(const IND of indexes) boxes[IND].style.background = '#33cc33';
                };
            };
        } else bottomInput.value = '';
    };
};