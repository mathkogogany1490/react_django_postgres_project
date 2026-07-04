import React from 'react'
import SalesTable from '../../components/sales/SalesTable'
import { useCurrentUser } from '../../store/hooks/useUser';
import AuthControl from '../../components/layout/AuthControl';

const SalesPage = () => {
  const {data: user} = useCurrentUser();
  if(!user){
    return(
      <AuthControl
        message="로그인 후 판매 정보를 조회할 수 있습니다."
      />
    )
  }
  return (
    <div>
        <SalesTable/>
    </div>
  )
}

export default SalesPage
