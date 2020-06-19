import React, {useState, useEffect} from 'react';
import User from './components/User';
import UserForm from './components/UserForm';
import formSchema from './validation/formSchema';
import axios from 'axios';
import * as Yup from 'yup';
import './App.css'
// / 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// // 🔥 STEP 2- FLESH OUT FriendForm.jsx
// /// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// //// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP

//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  avatar: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  ///// CHECKBOXES /////
  terms: false,
}
const initialFormErrors = {
  avatar: '',
  first_name: '',
  last_name: '',
  email: '',
  password: ''
}
const initialUsers = []
const initialDisabled = true

function App() {
  ///// STATES /////
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  ///// HELPERS /////
  // ///// 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT USERS IN STATE
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setUsers(res.data.data)
        console.log('SUCCESS', res.data)
      })
      .catch(err => {
        console.log('ERROR', err)
        debugger
      })
  }
  
  // ////// 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([...users, res.data])
      })
      .catch(err => {
        console.log('POST ERROR', err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }
  
  ///// EVENT HANDLERS /////
  const onInputChange = event => {
    const name = event.target.name
    const value = event.target.value

    // /////////// 🔥 STEP 11- RUN VALIDATION WITH YUP
    Yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]:''
        })
      })
      .catch(err => {
        console.log('YUP ERROR', err)
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0] // investigate
        })
      })
      setFormValues({
        ...formValues,
        [name]: value
      })
  }

  const onCheckboxChange = event => {
      // /////// 🔥 STEP 7- IMPLEMENT!
      const {name, checked} = event.target
      Yup
        .reach(formSchema, name)
        .validate(checked)
        .then(() => {
          setFormErrors({
            ...formErrors,
            [name]: ''
          });
        })
        .catch(err => {
          setFormErrors({
            ...formErrors,
            [name]: err.errors[0]
          });
        });
      setFormValues({
        ...formValues,
        [name]: checked
      })
  }

  const onSubmit = event => {
    event.preventDefault()

    const newUser = {
      avatar: formValues.avatar,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      password: formValues.password,
      // //////// 🔥 STEP 8- WHAT ABOUT ~terms~?
      terms: formValues.terms
    }

    // ///////// 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewUser(newUser)
  }

  ///// SIDE EFFECTS /////
  useEffect(() => {
    getUsers()
  }, [])

  // ////////// 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
  useEffect(() => {
    formSchema.isValid(formValues).then(valid => {
      setDisabled(!valid)
    })
  }, [formValues])


  return (
    <div className="App">
      <h1>User Onboarding</h1>
      <UserForm
      values={formValues}
      onInputChange={onInputChange}
      onCheckboxChange={onCheckboxChange}
      onSubmit={onSubmit}
      disabled={disabled}
      errors={formErrors}
      />
      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
