"use client"

import { useState } from 'react'
import Styles from "./Register.module.css";


export const Register = () => {
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      console.log('data')
    } catch (err: any) {
      let errorMessage = 'Ошибка входа'
      if (err.response?.status === 401) {
        errorMessage = 'Неверный логин или пароль'
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail
      } else if (err.response?.data?.non_field_errors?.[0]) {
        errorMessage = err.response.data.non_field_errors[0]
      }
      setError(errorMessage)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFormData({...formData, [e.target.name]: e.target.value})
    console.log('data')
  }

  return (
    <form className={Styles.register} onSubmit={handleSubmit}>
        <h1 className={Styles.title}>Зарегистрировать пользователя</h1>
        <div className={Styles.input_text}>Электронная почта</div>
        <input id='email' name='email' type='email' placeholder='Введите email' className={Styles.input} onChange={handleChange} required></input>
        <div className={Styles.input_text}>Пароль</div>
        <input id='password' name='password' type='password' placeholder='Введите пароль' className={Styles.input} onChange={handleChange} required></input>
        <div className={Styles.input_text}>Имя</div>
        <input id='name' name='name' type='text' placeholder='Введите имя' className={Styles.input} onChange={handleChange} required></input>
        <div className={Styles.input_text}>Фамилия</div>
        <input id='lastname' name='lastname' type='text' placeholder='Введите фамилию' className={Styles.input} onChange={handleChange} required></input>
        {error && (
          <div className={Styles.error_message}>{error}</div>
        )}
        <button type='submit' className={Styles.register_button}>Зарегистрировать</button>
    </form>
  );
};
