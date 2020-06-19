import React from 'react';

export default function UserForm(props){
    const {
        values,
        onSubmit,
        onInputChange,
        onCheckboxChange,
        disabled,
        errors,
      } = props

    return (
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add User</h2>
                {/* DISABLE THE BUTTON */}
                <button disabled={disabled}>Submit</button>

                <div className='errors'>
                {/* RENDER THE VALIDATION ERRORS HERE */} 
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>

            <div className='form-group inputs'>
            {/* ////////// TEXT INPUTS ////////// */}
                <h3>Information</h3>
                <label>First Name: &nbsp;
                    <input
                    value={values.first_name} 
                    onChange={onInputChange}
                    name='first_name'
                    type='text'
                    />
                </label>
                <br/>
                <label>Last Name: &nbsp;
                    <input
                    value={values.last_name} 
                    onChange={onInputChange}
                    name='last_name'
                    type='text'
                    />
                </label>
                <br/>
                <label>Email: &nbsp;
                    <input 
                    value={values.email}
                    onChange={onInputChange}
                    name='email'
                    type='text'
                    />
                </label>
                <br/>
                <label>Password: &nbsp;
                    <input 
                    value={values.password}
                    onChange={onInputChange}
                    name='password'
                    type='password'
                    />
                </label>
            </div>
            <br/>
            <div className='form-group checkboxes'>
                <label>Terms of Service
                    <input 
                        type='checkbox'
                        name='terms'
                        onChange={onCheckboxChange}
                        checked={values.terms}
                    />
                </label>
            </div>
        </form>
    )
}

// - [x] First & Last Name
// - [x] Email
// - [x] Password
// - [x] Terms of Service (checkbox)
// - [x] A Submit button to send our form data to the server.