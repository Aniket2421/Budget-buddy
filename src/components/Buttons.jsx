import React from 'react'

const Buttons = ({text,onclick,blue,disabled}) => {
  return (
    <div className={blue ? "btn btn-blue" : 'btn'} onClick={onclick} disabled = {disabled} >
        {text}

    </div>
  )
}

export default Buttons