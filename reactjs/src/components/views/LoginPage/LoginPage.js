import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'


function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    let body = {
      email : Email,
      password: Password
    }
    dispatch(loginUser(body)).then(response =>{
      if( response.payload.loginSuccess ){
        navigate('/')
      } else {
        alert('wrong email or password')
      }
    })
  }

  return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100%', width: '100%'}}>
        <form style={{ display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEamilHandler} />
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />
          <br />
          <button>
            login
          </button>
        </form>
    </div>
  )
}

export default LoginPage
