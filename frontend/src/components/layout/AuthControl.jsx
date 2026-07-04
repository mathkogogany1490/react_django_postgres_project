import React from 'react'
import { useCurrentUser } from '../../store/hooks/useUser'

const AuthControl = ({
    message = "로그인 후 이용 가능합니다."
}) => {
    const {data:user} = useCurrentUser();

    if(user) return null;
  return (
    <div>
      <div>{message}</div>
    </div>
  )
}

export default AuthControl
