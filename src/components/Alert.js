import React from 'react'

function Alert(props) {

    const capitalize = (word) =>{
        if (word==='success')
        {
          word= 'Success'
        }
        else if(word==='danger')
        {
          word= 'Error'
        }
        return word;
    }

  return (
    <div style={{height:'70px'}}>
      {
        props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            
            </div>
      }
    </div>
    

  )
}

export default Alert