import React, { useState } from 'react';
import InsertTable from '../component/Dml/InsertTable';
import UpdateTable from '../component/Dml/UpdateTable';
import Delete from '../component/Dml/Delete';
import Side from '../component/Side';

const Dmlpage = () => {
    const [dmlcomm, setDmlComm] = useState('');

    const handleDdl = (e) => {
        setDmlComm(e.target.value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-6 min-h-full lg:min-h-screen">
            <div className="lg:col-span-3 bg-gradient-to-tr from-custom-peach to-custom-pink rounded-md flex flex-col w-full p-4">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <button className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" value='insert' onClick={handleDdl}>insert</button>
                        <button className="bg-amber-300 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" value='update' onClick={handleDdl}>update</button>
                        <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded" value='delete' onClick={handleDdl}>delete'</button>

                    </div>
                </div>
                <div className="flex-grow">
                {dmlcomm === 'insert' && <InsertTable />}
                {dmlcomm === 'update' && <UpdateTable />}       
                {dmlcomm === 'delete' && <Delete />}
                </div>
            </div>
            <div className="h-full lg:col-span-1">
                <Side />
            </div>
        </div>
    );
};

export default Dmlpage;
