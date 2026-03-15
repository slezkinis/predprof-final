import Styles from "./Main.module.css";


export const Main = () => {
  return (
    <input className={Styles.file_input} type="file" name="file" accept=".waw, audio"/>
    <button>Отправить</button>
  );
};
