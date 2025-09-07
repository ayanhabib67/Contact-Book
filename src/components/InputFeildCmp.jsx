import React from 'react'

let  InputFeildCmp = ({title="text" , placeholder ,onChange ,value}) => {
  return (
    <>
      <input type={title}  value={value}  placeholder={placeholder}  onChange={onChange}  />
    </>
  )
}

export default InputFeildCmp
