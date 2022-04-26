//3thig in forms:1managing state 2handling form submission 3validation-error message// => formic library
import axios from 'axios';
import {useFormik } from 'formik';
import * as Yup from "yup";
import  { useEffect, useState } from 'react';
import Input from '../Common/Input';
import RadioInput from '../Common/RadioInput';
import InputSelectOptions from '../Common/InputSelectOptions';
import CheckBoxInput from '../Common/CheckBoxInput';

const initialValues={name:"", email:"", password:"", phoneNumber:"", passwordConfirm:"", gender:"", nationality:"", interests:[], terms:false}
// const validate=(values)=>{
//     let errors={}
//     if (!values.name){
//         errors.name="the name is not define";
//     }
//     if (!values.email){
//         errors.email="the email is not define";
//     }
//     if (!values.password){
//         errors.password="the password is not define";
//     }
//     return errors;
// }
const validationSchema=()=>Yup.object({
    name:Yup.string().required("Name is Required").min(6, "Name length is invalid"),
    email:Yup.string().email("invalid email format").required("Email is Required"),
    phoneNumber:Yup.string().required("PhoneNumber is Required").matches(/^[0-9]{11}$/, "phoneNumber is invaild").nullable(),
    password:Yup.string().required("Password is required").min(8, "Must be 8 characters or more")
    .matches(/[a-z]+/, "One lowercase character")
    .matches(/[A-Z]+/, "One uppercase character")
    .matches(/[@$!%*#?&]+/, "One special character")
    .matches(/\d+/, "One number"),
    passwordConfirm:Yup.string().required("passwordConfirm is required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    gender:Yup.string().required("checkbox is required"),
    nationality:Yup.string().required("nationality is required"),
    interests:Yup.array().required("atleast one interest is required"),
    terms:Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
   
})
const onSubmit=(values)=>{
    // console.log(values)
    axios.post("http://localhost:3001/users", values).then(res=>console.log(res.data)).catch(err=>console.log(err))
}

const SignUpForm = () => {
    //you should put the first value on "" (string) . you cant do that with null
    // const [formValue, setFormValue]=useState({name:"", email:"", password:""})
    // const changeHandler=(e)=>{
    //     setFormValue({...formValue, [e.target.name]:e.target.value})
    // }

    const [formValue, setFormValue]=useState(null);
    useEffect(()=>{
        axios.get("http://localhost:3001/users/1").then(res=>setFormValue(res.data))
        .catch(err=>console.log(err))
    },[])
   
    console.log(formValue)
    const checkBoxOptions=[
        {label:"React.js", value:"React.js"},
        {label:"Vue.js", value:"Vue.js"},
    ]
    const radioOptions=[
        {label:"MALE", value:"0"},
        {label:"FEMALE", value:"1"},
    ]
    const selectOptions=[
        {label:"select nationality ...", value:""},
        {label:"iran", value:"IR"},
        {label:"GERMANY", value:"GER"},
        {label:"USA", value:"US"},
    ]
    const formik=useFormik({
        initialValues: formValue || initialValues,
        onSubmit,
        validationSchema,
        validateOnMount:true,
        enableReinitialize:true,
        // validate,
    })
    console.log(formik)
    // const submitHandler=(e)=>{
    //     e.preventDefault()
    // }
  
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
<Input formik={formik} name="name" label="Name" />
<Input formik={formik} name="email" label="Email" type='email' />
<Input formik={formik} name="phoneNumber" label="Phone Number" />
<Input formik={formik} name="password" label="Password" type='password' />
<Input formik={formik} name="passwordConfirm" label="Password Confirmation" type='password' />
<InputSelectOptions name="nationality" formik={formik} selectOptions={selectOptions}/> 
<RadioInput formik={formik} radioOptions={radioOptions} name="gender" />
<CheckBoxInput formik={formik} checkBoxOptions={checkBoxOptions} name="interests" />
<div className='formControl'>
<input 
               id="terms"
               type="checkbox"
               name="terms"
               value={true}
               onChange={formik.handleChange}
               checked={formik.values.terms} />
  
    <label htmlFor="terms">Terms And Condition</label>
    {formik.errors.terms && formik.touched.terms && (<div className='error'> {formik.errors.terms}</div>) } </div>
            {/* <div className='formControl'>
                <label>name</label>
                <input type="text" name="name"
                // onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.name}
                {...formik.getFieldProps("name")} />
                {formik.errors.name && formik.touched.name && (<div className='error'> {formik.errors.name}</div>) }
            </div> */}
            {/* <div className='formControl'>
                <label>email</label>
                <input type="text"name="email"
                //  onChange={formik.handleChange}onBlur={formik.handleBlur}  value={formik.values.email} 
                {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (<div className='error'> {formik.errors.email}</div> )}
            </div> */}
            
            {/* <div className='formControl' >
                <label>Phone Number</label>
                <input type="text"name="phoneNumber"
                //  onChange={formik.handleChange}onBlur={formik.handleBlur}  value={formik.values.email} 
                {...formik.getFieldProps("phoneNumber")}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (<div className='error'> {formik.errors.phoneNumber}</div> )}
            </div> */}
           {/* < div className='formControl' >
                <label>
                    password
                    </label>
                <input type="text" name="password"
                // onChange={formik.handleChange}onBlur={formik.handleBlur}  value={formik.values.password} 
                {...formik.getFieldProps("password")}/>
                 {formik.errors.password && formik.touched.password && (<div className='error'> {formik.errors.password}</div>) }
            </div> */}
            {/* < div className='formControl'>
                <label>
                    password Confirm
                    </label>
                <input type="text" name="passwordConfirm"
                // onChange={formik.handleChange}onBlur={formik.handleBlur}  value={formik.values.password} 
                {...formik.getFieldProps("passwordConfirm")}/>
                 {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (<div className='error'> {formik.errors.passwordConfirm}</div>) }
            </div> */}
            {/* <div className='formControl'>
            <label htmlFor='0'>male</label>
                <input id="0" type="radio" name='gender' value="0" onChange={formik.handleChange} checked={formik.values.gender==="0"} />
                
                <label htmlFor='1'>female</label>
                <input id="1" type="radio" name='gender' value="1" onChange={formik.handleChange} checked={formik.values.gender==="1"} />
                {formik.errors.gender && formik.touched.gender && (<div className='error'> {formik.errors.gender}</div>) }
            </div> */}

               {/* <button onClick={()=>setFormValue(saveValues)}>loading data</button> */}
                <button type='submit' disabled={!formik.isValid}>sign up</button>
          

            </form>
        
        </div>
     );


    }
 
export default SignUpForm;
