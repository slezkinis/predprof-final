import os
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Конфигурация
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Максимум 16 МБ

# Создаем папку для загрузок, если нет
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload')
def upload_page():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    # Проверка наличия файла
    if 'file' not in request.files:
        return jsonify({'message': 'Файл не найден'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'message': 'Файл не выбран'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # --- ЗДЕСЬ ВАША ЛОГИКА ОБРАБОТКИ MP3 ---
        # Например: transcription = transcribe_audio(filepath)
        # Для примера вернем заглушку:
        fake_transcription = f"Файл '{filename}' успешно загружен.\n\nЗдесь должен быть текст расшифровки вашего аудио. \nИнтегрируйте сюда библиотеку вроде whisper или speech_recognition."
        
        return jsonify({
            'message': 'Успешно',
            'text': fake_transcription
        }), 200
    else:
        return jsonify({'message': 'Недопустимый формат файла. Только WAV.'}), 400

if __name__ == '__main__':
    app.run(debug=True)