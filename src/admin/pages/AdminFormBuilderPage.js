import React, { useState } from 'react';
import AdminFormBuilder from '../components/AdminFormBuilder';
import DynamicForm from '../components/DynamicForm';
function AdminFormBuilderPage() {
  const [formSchema, setFormSchema] = useState([]);

  return (
    <div className='bg-white flex h-full w-full'>
      <AdminFormBuilder onSchemaChange={setFormSchema} />
      <DynamicForm schema={formSchema} />
    </div>
  );
}

export default AdminFormBuilderPage;
