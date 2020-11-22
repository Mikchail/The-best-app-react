import React from 'react';


const Input = (props) => {
    const {type} = props;
    return (
        <input {...props} type={type} />
    )
}


export default Input;