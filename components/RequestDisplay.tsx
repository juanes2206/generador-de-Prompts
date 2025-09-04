
import React from 'react';
import { USER_REQUEST, ASSIGNMENT_DETAILS } from '../constants';

const RequestDisplay: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-indigo-400 mb-3">Solicitud de Usuario</h2>
      <p className="text-gray-300 italic mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-600">"{USER_REQUEST}"</p>
      
      <h2 className="text-lg font-semibold text-indigo-400 mb-3">Detalles de la Tarea</h2>
      <div className="text-gray-400 space-y-2 text-sm whitespace-pre-wrap flex-grow overflow-y-auto pr-2">
        {ASSIGNMENT_DETAILS}
      </div>
    </div>
  );
};

export default RequestDisplay;
