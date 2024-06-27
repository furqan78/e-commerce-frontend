import React from 'react';
import { useForm } from 'react-hook-form';
import { appLevelConstant } from '../../app/constant';

const DynamicForm = ({ schema }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
    reset();
  };

  return (
    <div>
      <h2>Dynamic Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {schema.map(field => (
          <div key={field.id}>
             <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    {field.label}
                                </label>
                                <div className="mt-2">
            {field.type === 'textarea' ? (
                <textarea
                className="block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200"
                {...register(field.name, {
                  required: field.required,
                })}
              />
            ) : (
              <input
              type={field.type}
              className="block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200"
                {...register(field.name, {
                  required: field.required ? appLevelConstant.REQUIRED : "",
                  min: field.type === 'number' && field.minValue && {
                    value: parseInt(field.minValue, 10), 
                    message: `${field.name} should be between ${field.min} to ${field.max}`},
                  max: field.type === 'number' && field.maxValue && 
                  {
                    value: parseInt(field.maxValue, 10),
                    message: `${field.name} should be between ${field.min} to ${field.max}`
                  }
                })}
              />
            )}
            {errors[field.name] && <span>{errors[field.name].message}</span>}
            {console.log(errors[field.name], "ftching errors")}
            </div>
          </div>
        ))}
        <div className='my-2'>
        <button className='bg-nile-blue cursor-pointer w-fit mx-auto text-white text-m py-2 px-8 rounded-sm' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
