import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

const CreatePages = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        )
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <input
          type='text'
          placeholder='Вставьте ссылку'
          id='email'
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onKeyPress={pressHandler}
        />
        <label htmlFor='link'>Введите ссылку</label>
      </div>
    </div>
  )
}

export default CreatePages
