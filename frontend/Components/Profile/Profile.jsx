"use client"
import { useState } from "react";
import Styles from "./Profile.module.css";
// import { useAuth } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'


export const Profile = () => {
//   const { user, updateUsername, refreshUserProfil } = useAuth()
  const [username, setUsername] = useState('Username')
  const [email, setEmail] = useState('email')
  const [name, setName] = useState('Георгий')
  const [lastName, setLastName] = useState('Асриев')
  return (
    <div className={Styles.profile}>
        <h1 className={Styles.profile_header}>Профиль</h1>
        <p className={Styles.left_text}>Email</p>
        <p className={Styles.email}>{email}</p>
        <p className={Styles.left_text}>Имя</p>
        <p className={Styles.nickname}>{name}</p>
        <p className={Styles.left_text}>Фамилия</p>
        <p className={Styles.nickname}>{lastName}</p>
        <p className={Styles.left_text}>Имя пользователя</p>
        <p className={Styles.nickname}>{username}</p>
    </div>
  );
};
