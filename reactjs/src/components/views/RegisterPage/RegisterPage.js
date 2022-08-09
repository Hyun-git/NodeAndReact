import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

function RegisterPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Name , setName] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const onEamilHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()

    if (Password !== ConfirmPassword) {
      return alert('Password not match')
    }

    let body = {
      email : Email,
      name: Name,
      password: Password
    }

    dispatch(registerUser(body)).then(response =>{
      if(response.payload.registerSuccess){
        navigate('/login')
      } else {
        alert('Something went wrong')
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
    
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>ConfirmPassword</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

        <br />
        <button>
          register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
