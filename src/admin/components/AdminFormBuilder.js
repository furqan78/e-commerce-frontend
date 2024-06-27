import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AdminFormBuilder = ({ onSchemaChange }) => {
    const [fields, setFields] = useState([]);
    const [newField, setNewField] = useState({
        name: '',
        label: '',
        type: 'text',
        required: false,
        minLength: '',
        maxLength: '',
        minValue: '',
        maxValue: ''
    });

    const addField = () => {
        console.log(newField, 'fetching fields')
        setFields([...fields, { ...newField, id: uuidv4() }]);
        setNewField({
            name: '',
            label: '',
            type: 'text',
            required: false,
            minLength: '',
            maxLength: '',
            minValue: '',
            maxValue: ''
        });
        onSchemaChange([...fields, { ...newField, id: uuidv4() }]);
    };

    const removeField = (id) => {
        const updatedFields = fields.filter(field => field.id !== id);
        setFields(updatedFields);
        onSchemaChange(updatedFields);
    };

    return (
        <div className='p-12 bg-white'>
            <div className='w-fit shadow-sm border border-gray-200 p-10'>
            <h2 className='text-gray-900 font-bold'>Form Builder</h2>
                <div className='mt-3 flex gap-3 items-center'>
                    <input
                        type="text"
                        placeholder="Field Name"
                        value={newField.name}
                        className='block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200'
                        onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Field Label"
                        value={newField.label}
                        className='block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200'
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    />
                </div>
                <div className='mt-3 flex gap-3 items-center'>
                    <select
                        value={newField.type}
                        className='block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200'
                        onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="textarea">Textarea</option>
                        <option value="number">Number</option>
                    </select>

                    <label>
                        Required
                    </label>
                    <input
                        type="checkbox"
                        checked={newField.required}
                        className='h-4 w-4 cursor-pointer border border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                    />
                </div>
                <div className='mt-3'>
                    {newField.type === 'number' && (
                        <>
                            <div className='mt-3 flex items-center gap-3'>
                                <input
                                    type="number"
                                    placeholder="Min Value"
                                    value={newField.minValue}
                                    className='block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200'
                                    onChange={(e) => setNewField({ ...newField, minValue: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Max Value"
                                    value={newField.maxValue}
                                    className='block w-fit rounded-sm border border-gray-400 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200'
                                    onChange={(e) => setNewField({ ...newField, maxValue: e.target.value })}
                                />
                            </div>
                        </>
                    )}
                </div>
                <button className='bg-nile-blue cursor-pointer my-3 w-fit mx-auto text-white text-m py-2 px-8 rounded-sm' onClick={addField}>Add Field</button>
            </div>
            <ul>
                {fields.map(field => (
                    <li key={field.id}>
                        {field.label} ({field.type}) {field.required ? '(Required)' : ''}
                        <button onClick={() => removeField(field.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminFormBuilder;
