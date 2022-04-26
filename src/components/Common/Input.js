const Input = ({formik, name, label, type="text"}) => {
    return (  
        <div className='formControl'>
        <label htmlFor={name
        }>{label}</label>
        <input type="text" name={name} id={name}
        // onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.name}
        {...formik.getFieldProps(name)} />
        {formik.errors[name] && formik.touched[name] && (<div className='error'> {formik.errors[name]}</div>) }
    </div>
    );
}
 
export default Input;