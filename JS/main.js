function copyText(textAreaId) {
    var textArea = document.getElementById(textAreaId);
    // Temporarily enable the textarea to allow copying
    textArea.disabled = false;
    // Select the text
    textArea.select();
    // Copy the selected text
    document.execCommand('copy');
    // Temporarily disable the textarea to prevent immediate re-copying
    textArea.disabled = true;
    // Temporarily change button text to "Copied"
    var button = event.target;
    var originalText = button.textContent;
    button.textContent = "Copied";
    // Revert button text to original after 2 seconds
    setTimeout(function() {
        button.textContent = originalText;
    }, 2000);
}

const arabicToEnglishMap = {
    'ض': 'q', 'ص': 'w', 'ث': 'e', 'ق': 'r', 'ف': 't', 'غ': 'y', 'ع': 'u', 'ه': 'i', 'خ': 'o', 'ح': 'p',
    'ج': '[', 'د': ']', 'ش': 'a', 'س': 's', 'ي': 'd', 'ب': 'f', 'ل': 'g', 'ا': 'h', 'ت': 'j', 'ن': 'k',
    'م': 'l', 'ك': ';', 'ط': '\'', 'ئ': 'z', 'ء': 'x', 'ؤ': 'c', 'ر': 'v', 'لا': 'b', 'ى': 'n', 'ة': 'm',
    'و': ',', 'ز': '.', 'ظ': '/', 'ِ': 'A', 'ٍ': 'S', ']': 'D', '[': 'F', 'لآ': 'B', 'أ': 'H', 'آ': 'N',
    'ـ': 'J', '،': 'K', '/': 'L', ':': ':', '"': '"', 'َ': 'Q', 'ً': 'W', 'ُ': 'E', 'ٌ': 'R', 'لإ': 'T', 'إ': 'Y',
    '‘': 'U', '÷': 'I', '×': 'O', '؛': 'P', '<': '{', '>': '}', '؟': '?', '~': 'Z', 'ْ': 'X', '}': 'C', '{': 'V',
    '’': 'M', ',': '<', '.': '>', '': '', 'ذ': '`'
    // Add more mappings as needed
};

const englishToArabicMap = {};
// Reverse the mapping
for (let key in arabicToEnglishMap) {
    englishToArabicMap[arabicToEnglishMap[key]] = key;
}

// Function to check if the Shift key is pressed
function isShiftPressed(event) {
    return event.shiftKey;
}

// Function to convert Arabic text to English
function convertText(event) {
    const arabicText = document.getElementById('arabicText').value;
    let englishText = '';

    for (let i = 0; i < arabicText.length; i++) {
        let char = arabicText[i];
        let nextChar = arabicText[i + 1];
        let combinedChars = char + nextChar;

        if (arabicToEnglishMap[combinedChars]) {
            englishText += isShiftPressed(event) ? arabicToEnglishMap[combinedChars].toUpperCase() : arabicToEnglishMap[combinedChars];
            i++; // Skip the next character
        } else if (arabicToEnglishMap[char]) {
            englishText += isShiftPressed(event) ? arabicToEnglishMap[char].toUpperCase() : arabicToEnglishMap[char];
        } else {
            englishText += char;
        }
    }

    document.getElementById('englishText').value = englishText;

    if (arabicText.trim() === '') {
        document.getElementById('englishText').removeAttribute('disabled');
        document.getElementById('englishText').style.backgroundColor = 'initial';
    } else {
        document.getElementById('englishText').disabled = true;
        document.getElementById('englishText').style.backgroundColor = '#f8f9fa';
    }
}

// Function to convert English text to Arabic
function convertToArabic() {
    const englishText = document.getElementById('englishText').value;
    let arabicText = '';

    for (let char of englishText) {
        if (englishToArabicMap[char]) {
            arabicText += englishToArabicMap[char];
        } else {
            arabicText += char;
        }
    }

    document.getElementById('arabicText').value = arabicText;

    if (englishText.trim() === '') {
        document.getElementById('arabicText').removeAttribute('disabled');
        document.getElementById('arabicText').style.backgroundColor = 'initial';
    } else {
        document.getElementById('arabicText').disabled = true;
        document.getElementById('arabicText').style.backgroundColor = '#f8f9fa';
    }
}

// Event listener to detect changes in the Arabic text input field
document.getElementById('arabicText').addEventListener('input', convertText);

// Event listener to detect changes in the English text input field
document.getElementById('englishText').addEventListener('input', convertToArabic);

// Initial conversion when the page loads
convertText();
convertToArabic();