import React from 'react'

let ButtonCmp = ({text ="Button" ,onClick }) => {
  return (
    <>
      <button   onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCmp
