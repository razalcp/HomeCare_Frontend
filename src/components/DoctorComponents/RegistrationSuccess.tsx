import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

const RegistrationSuccess = () => {
  
  useEffect(()=>{
    const getDocData=async()=>{

    }
    getDocData()
  })
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <CheckCircle className="text-green-500" size={100} />
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">Registration Completed</h1>
      <p className="text-gray-600 mt-2">Successful. Please wait for confirmation.</p>
    </div>
  );
};

export default RegistrationSuccess;