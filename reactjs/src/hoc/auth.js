import  { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from "react-router-dom";

export default function AuthFunction(SpecticComponent, option, adminRoute = null) {
    //null -> 아무나 출입 가능
    //true -> 로그인한 사용자만 출입 가능
    //false -> 로그인한 사용자는 출입 불가능
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth) {
                    // 로그인 안한 상태
                    if(option) {
                        navigate('/login')
                    }
                } else {
                    // 로그인 한 상태
                    if (adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if (option === false) {
                            navigate('/')
                        }
                    }

                }

            })
        } , [ dispatch, navigate])
        return (<SpecticComponent />)

    }

    return <AuthenticationCheck />
}