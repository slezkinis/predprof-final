document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('wavFile');
    const fileNameDisplay = document.getElementById('fileName');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const outputText = document.getElementById('outputText');
    const errorMessage = document.getElementById('errorMessage');


    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            errorMessage.textContent = '';
        } else {
            fileNameDisplay.textContent = 'Файл не выбран';
        }
    });
});