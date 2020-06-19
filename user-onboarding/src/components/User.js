import React from 'react';

function User({details}) {
    if(!details){
        return<h3>Fetching details...</h3>
    }

    return(
        <div className='user container'>
            <h2>{details.first_name} {details.last_name}</h2>
            <img src={details.avatar} alt='avatar'/>
            <p>Email: {details.email}</p>
            <p>Password: {details.password}</p>
        </div>    
        )
}

export default User