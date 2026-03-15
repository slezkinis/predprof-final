document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('wavFile');
    const fileNameDisplay = document.getElementById('fileName');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const outputText = document.getElementById('outputText');
    const errorMessage = document.getElementById('errorMessage');

    // Отображение имени выбранного файла
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            errorMessage.textContent = '';
        } else {
            fileNameDisplay.textContent = 'Файл не выбран';
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!fileInput.files.length) {
            errorMessage.textContent = 'Пожалуйста, выберите файл.';
            return;
        }

        // Подготовка интерфейса
        submitBtn.disabled = true;
        loader.style.display = 'flex';
        errorMessage.textContent = '';
        outputText.innerHTML = '<span class="placeholder">Обработка...</span>';

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
            // Отправка на сервер
            // Замените '/api/upload' на ваш реальный маршрут во Flask
            const response = await fetch('/', {
                method: 'POST',
                body: formData
                // Не устанавливаем Content-Type вручную, браузер сделает это сам для multipart/form-data
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка при загрузке файла');
            }

            const data = await response.json();

            // Вывод текста (предполагаем, что сервер возвращает JSON { "text": "..." })
            if (data.text) {
                outputText.textContent = data.text;
            } else if (data.message) {
                outputText.textContent = data.message;
            } else {
                outputText.textContent = 'Файл загружен, но текст не получен.';
            }

        } catch (err) {
            console.error(err);
            errorMessage.textContent = err.message || 'Произошла неизвестная ошибка';
            outputText.innerHTML = '<span class="placeholder">Ошибка загрузки</span>';
        } finally {
            // Возврат интерфейса в исходное состояние
            submitBtn.disabled = false;
            loader.style.display = 'none';
        }
    });
});
