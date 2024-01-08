import React from 'react'
import { useSelector } from 'react-redux'
import CommonModal from './CommonModal';

const SessionExpiry = () => {
    const session = useSelector((state) => state?.session);

    const onFunction = () => {
        localStorage.clear()
        window.location.href = "/";
    }
  return (
    <div>
        <CommonModal allOpen={session} setAllOpen={onFunction} onFunction={onFunction} title="Session Expiry" descrp="Do you want continue Please Logout" />
    </div>
  )
}

export default SessionExpiry