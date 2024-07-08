import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    date: yup.date().required(),
    time: yup.string().required('Time is required'),
  })
  .required();

export default schema;
