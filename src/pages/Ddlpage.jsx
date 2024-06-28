import React, { useState } from 'react';
import RenameTable from '../component/Ddl/RenameTable';
import AlterTable from '../component/Ddl/AlterTable';
import CreateTable from '../component/Ddl/CreateTable';
import DropTable from '../component/Ddl/ DropTable';
import Side from '../component/Side';

const Ddlpage = () => {
    const [ddlcomm, setDdlComm] = useState('');

    const handleDdl = (e) => {
        setDdlComm(e.target.value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-6 min-h-full lg:min-h-screen">
            <div className="lg:col-span-3 bg-gradient-to-tr from-custom-peach to-custom-pink rounded-md flex flex-col w-full p-4">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        <button className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" value='create' onClick={handleDdl}>Create</button>
                        <button className="bg-amber-300 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" value='alter' onClick={handleDdl}>Alter</button>
                        <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded" value='rename' onClick={handleDdl}>Rename</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" value='drop' onClick={handleDdl}>Drop</button>
                    </div>
                </div>
                <div className="flex-grow">
                    {ddlcomm === 'create' && <CreateTable />}
                    {ddlcomm === 'alter' && <AlterTable />}
                    {ddlcomm === 'rename' && <RenameTable />}
                    {ddlcomm === 'drop' && <DropTable />}
                </div>
            </div>
            <div className="h-full lg:col-span-1">
                <Side />
            </div>
        </div>
    );
};

export default Ddlpage;
