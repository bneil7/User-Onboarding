import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    first_name: Yup
        .string()
        .min(3, 'First name must be at least 3 characters')
        .required('Field is required'),
    last_name: Yup
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .required('Field is required'),
    email: Yup
        .string()
        .email('Valid email address required')
        .required('Field is required'),
    password: Yup
        .string()
        .min(10, 'Password must be at least 10 characters')
        .required('Field is required'),
    terms: Yup
        .boolean()
        .oneOf([true], 'Please agree to Terms of Service')
        .required('You must agree to Terms of Service before continuing.')

})

export default formSchema