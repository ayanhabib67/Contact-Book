import React from 'react'

let ButtonCmp = ({text ="Button" ,onClick  ,style}) => {
  return (
    <>
      <button style={style}   onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCmp
