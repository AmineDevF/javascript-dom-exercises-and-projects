// Obtenir l'élément d'affichage (écran de la calculatrice)
const display = document.getElementById('display');

// Sélectionner tous les boutons de la calculatrice
const buttons = document.querySelectorAll('button');

// Initialiser les variables pour gérer l'état de la calculatrice
let currentInput = '0'
let previousInput = ''
let operator = null

// Ajouter des écouteurs d'événement pour chaque bouton
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Obtenir l'action associé au bouton
        const action = button.dataset.action;
        // Obtenir le contenu du bouton
        const buttonContent = button.textContent;

        // Déterminer l'action en fonction du bouton cliqué
        if(!action) {
            handleNumber(buttonContent); // Gérer les entrées numériques
        } else if (action === 'clear') {
            clearDisplay(); // Effacer l'affichage et réinitialiser les variables
        } else if (action === 'equals') {
            calculate(); // Calculer le résultat
        } else if (action === 'percentage') {
            calculatePercentage(); // Calculer le pourcentage
        } else if (buttonContent === '.') {
            addDecimal(); // Gérer le point decimal
        } else {
            handleOperator(action); // Gérer les opérateurs
        }
    })
})

// Fonction qui permet de gérer les entrées numériques
const handleNumber = (number) => {
    if (currentInput === '0' && number !== '.') {
        // Remplacer le zéro initial par le chiffre entré
        currentInput = number;
    } else {
        // Ajouter le chiffre à l'entrée actuelle
        currentInput += number;
    }
    // Mettre à jour l'affichage
    updateDisplay(currentInput);
}

// Fonction pour gérer les opérateurs
const handleOperator = (selectedOperator) => {
    if (operator !== null) {
        calculate(); // Calculer le résultat de la précédente operation
    }

    // Stocker le nouvel opérateur
    operator = selectedOperator;

    // Stocker l'entrée actuelle pour la prochaine operation
    previousInput = currentInput;

    // Réinitialiser l'entrée actuelle
    currentInput = '';
}

const calculate = () => {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operator) {
        case 'add':
            result = prev + current;
            break;
        case 'subtract':
            result = prev - current;
            break;
        case 'multiply':
            result = prev * current;
            break;
        case 'divide':
            result = prev / current;
            break;
        default:
            return;
    }

    // Mettre à jour l'affichage avec le résultat
    updateDisplay(result.toString());

    // Réinitialiser les variables
    currentInput = result.toString(); // Convertir le resultat en String
    operator = null; //Réinitialisé l'opérateur
    previousInput = ''; // Réinitialiser l'entrée précédente
    updateDisplay(currentInput); // Mettre à jour l'affichage
}

// Fonction pour calculer le pourcentage
const calculatePercentage = () => {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString(); // Diviser l'entrée actuelle par 100 pour obtenir le pourcentage
        updateDisplay(currentInput); // Mettre à jour l'affichage avec le nouveau résultat
    }
}

// Fonction pour effacer l'affichage et réinitialiser les variables
const clearDisplay = () => {
    // Réinitialiser l'entrée actuelle à '0'
    currentInput = '0';
    // Effacer l'entrée précédente
    previousInput = '';
    // Réintialiser l'opérateur
    operator = null;
    updateDisplay(currentInput);
}

// Fonction pour ajouter un point décimal
const addDecimal = () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

// Fonction pour mettre à jour l'affichage
const updateDisplay = (value) => {
    display.textContent = value.length > 10 ? parseFloat(value).toPrecision(10) : value;
}

// Gérer des entrées clavier pour les opérations de la calculatrice
document.addEventListener('keydown', (event) => {
    const key = event.key

    if(!isNaN(key) || key === '.') {
        // Gérer l'entrée numérique et le point décimal
        handleNumber(key)
    } else if (key === 'Enter' || key === '=') {
        // Calculer et mettre à jour l'affichage
        calculate();
    } else if (key === 'Escape') {
        // Effacer l'affichage et réinitialiser les variables
        clearDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // Gérer les opérateurs
        handleOperator(key.replace('*', 'multiply').replace('/', 'divide'));
    } else if (key === '%') {
        // Calculer le pourcentage
        calculatePercentage();
    }
})