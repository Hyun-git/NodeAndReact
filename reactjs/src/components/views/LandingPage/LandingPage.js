import React, { useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function LandingPage() {

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('api/hello')
    .then(res => console.log(res))
  })

  const onClickHandler = () => {
    axios.get('api/users/logout')
      .then(res => {
        if(res.data.logoutSuccess) {
          navigate('/login')
        } else {
          console.log(res.data.err)
        }
      })
  }
 
  return (
    <div>
      LandingPage

      <button onClick={onClickHandler}>
        LogOut
      </button>
    </div>
  )
}

export default LandingPage
