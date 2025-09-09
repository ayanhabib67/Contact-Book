import React from 'react'

let  InputFeildCmp = ({title="text" , placeholder ,onChange ,value ,style ,onFocus ,onBlur}) => {
  return (
    <>
      <input type={title} onFocus={onFocus}  onBlur={onBlur} style={style} value={value}  placeholder={placeholder}  onChange={onChange}  />
    </>
  )
}

export default InputFeildCmp
