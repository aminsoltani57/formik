import React from "react";

const InputSelectOptions = ({formik, name, selectOptions} ) => {
    return ( 
        <div className='formControl'>
         <select name={name}{...formik.getFieldProps(name)}>
            {selectOptions.map((item)=>(  
    <option key={item.value}value={item.value}>
                   {item.label}
                   
                   </option>))}
                   
  
</select>
{/* <label htmlFor={item.value}>{item.label}</label> */}
    
{formik.errors[name] && formik.touched[name] && (<div className='error'> {formik.errors[name]}</div>) }  


             
    
   
       </div>
     );
}
 
export default InputSelectOptions;