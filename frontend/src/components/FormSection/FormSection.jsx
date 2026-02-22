import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FromSection = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('* First name is required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('* Last name is required'),
      email: Yup.string().email('Invalid email address').required('* Email is required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
        <div className="flex flex-col justify-center content-center gap-4 p-4">
            <div className='flex justify-center'>
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            </div>
            <div>
                <p className="text-gray-600 text-center mb-6">Join us today! It takes only a few steps.</p>
            </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center content-center gap-4 p-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    className="border border-gray-300 rounded px-4 py-2"
                    />
                {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-red-500">{formik.errors.firstName}</div>
                ) : null}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    className="border border-gray-300 rounded px-4 py-2"
                    />
                {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-red-500">{formik.errors.lastName}</div>
                ) : null}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="border border-gray-300 rounded px-4 py-2"
                    />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                ) : null}
            </div>
            
            <button type="submit" className="cursor-pointer mt-9 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
            </button>
        </form>
    </div>
  );
};

export default FromSection;