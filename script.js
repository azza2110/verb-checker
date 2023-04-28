let verbBlackList = ["discuss", "support", "review", "handle", "try", "do", "start", "commence", "continue", "further", "look into", "reach out", "get in touch", "contact", "talk", "investigate", "tackle", "consider", "look at", "address", "continue to try"];

let inputs = document.querySelectorAll(".textbox");

inputs.forEach(input => {
    input.addEventListener('focusout', (event) => verbCheck(event.target));
    input.addEventListener('focusin', (event) => hideSpans(event.target));
    verbCheck(input);
});

function verbCheck(editedInput) {
    let fullString = removeSpans(editedInput);
    let allWords = fullString.split(" ");
    let test1 = allWords[0];
    let test2 = allWords[0]+" "+allWords[1];
    let test3 = allWords[0]+" "+allWords[1]+" "+allWords[2];
    verbBlackList.forEach(vagueVerb => {
        if (vagueVerb == test3.toLowerCase()) {
            addSpan(editedInput, test3, allWords, 3);
        } else if (vagueVerb == test2.toLowerCase()) {
            addSpan(editedInput, test2 ,allWords, 2);
        } else if (vagueVerb == test1.toLowerCase()) {
            addSpan(editedInput, test1, allWords, 1);
        }
    })
}

function addSpan(editedInput, matchedPhrase, allWords, matchLength) {
    let remainingWords = allWords.slice(matchLength);
    let remainingString = " " + remainingWords.join(" ");
    editedInput.textContent = remainingString;
    let vagueSpan = document.createElement("span");
    vagueSpan.classList.add("vague");
    vagueSpan.textContent=matchedPhrase;
    let vagueTooltip = document.createElement("span");
    vagueTooltip.classList.add("tooltip");
    vagueTooltip.innerHTML="<b>Vague verb</b><br><br>Replace with something more specific";
    vagueSpan.append(vagueTooltip);
    editedInput.prepend(vagueSpan);
}

function hideSpans(focusedInput) {
    let spans = focusedInput.querySelectorAll("span");
    spans.forEach(span => span.classList.remove("vague"));
}

function removeSpans(editedInput) {
    let existingTooltip = editedInput.querySelector(".tooltip");
    if (existingTooltip !== null) existingTooltip.parentNode.removeChild(existingTooltip);
    editedInput.innerHTML = editedInput.textContent;
    return editedInput.textContent;
}

//Other code for demo page - Button
let button = document.querySelector(".button");

button.addEventListener('click', (event) => clearInputs());

function clearInputs() {
    inputs.forEach(input => input.innerHTML="")
}

//Other code for demo page - Blacklist
let wordList = document.querySelector(".wordlist")
verbBlackList.forEach(vagueVerb => {
    let newEntry = document.createElement("li");
    newEntry.textContent = vagueVerb;
    wordList.appendChild(newEntry);
})