import React from 'react'
import OTPs from './components/otp'
import WriteUp from './components/write-up'
import "./style.css"

export default function page() {
  const onOtsubmit = () =>{
    console.log("login successful...")
  }
  return (
    <div className="verification">
      <div className="main">
        <WriteUp/>
        <OTPs length={5} />
      </div>
    </div>
  )
}
