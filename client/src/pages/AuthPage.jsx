import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import cls from './pages.module.css'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const messages = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    messages(error)
    clearError()
  }, [error, messages, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async (event) => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      messages(data.messages)
    } catch (e) {}
  }
  const loginHandler = async (event) => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  let btn1_cls = ['btn yellow darken-4', ' ']
  btn1_cls.push(cls.myBtn)
  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Titel</h1>
        <div className='card blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Введите email'
                  id='email'
                  type='text'
                  name='email'
                  className={cls.yellowInput}
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='Введите пароль'
                  id='password'
                  type='password'
                  name='password'
                  className={cls.yellowInput}
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Пароль</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              onClick={loginHandler}
              disabled={loading}
              className={btn1_cls.join('')}
            >
              Войти
            </button>
            <button
              onClick={registerHandler}
              className='btn grey lighten-1 black-text'
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
