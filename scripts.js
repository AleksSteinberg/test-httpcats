document.addEventListener('DOMContentLoaded', function() {
    const loadButton = document.querySelector('.load');
    const inputField = document.querySelector('.input');
    const catImage = document.querySelector('.img');
    const counter = document.querySelector('.counter');
    const lastSection = document.querySelector('.last');

    let lastErrors = JSON.parse(localStorage.getItem('lastErrors')) || [];
    const firstVisit = lastErrors.length === 0;

    if (firstVisit) {
        lastErrors = ['404'];
        lastSection.classList.remove('show');
    } else {
        lastSection.classList.add('show');
        const index404 = lastErrors.indexOf('404');
        if (index404 !== -1) lastErrors.splice(index404, 1);
    }

    updateLastErrors();

    catImage.src = "https://http.cat/" + lastErrors[0];

    inputField.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') loadImage();
    });

    loadButton.addEventListener('click', loadImage);

    function loadImage() {
        const errorCode = inputField.value.trim();
        if (errorCode === '') return alert("Введите код ошибки");

        catImage.src = "https://http.cat/" + errorCode;
        catImage.onload = function() {
            counter.textContent = errorCode;
            lastErrors.unshift(errorCode);
            lastErrors = lastErrors.slice(0, 5);
            localStorage.setItem('lastErrors', JSON.stringify(lastErrors));
            updateLastErrors();
            if (!lastSection.classList.contains('show')) lastSection.classList.add('show');
        };
        catImage.onerror = function() { alert("Нет котика для этого кода ошибки :("); };
    }

    function updateLastErrors() { counter.textContent = lastErrors.join(', '); }
});
