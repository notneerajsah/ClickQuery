import React, { useState } from 'react';
import RenameTable from './RenameTable';
import AlterTable from './AlterTable';
import CreateTable from './CreateTable';
import DropTable from './ DropTable';
import Side from '../Side';

const Ddlpage= () => {
    const [ddlcomm, setDdlComm] = useState('');

    const handleDdl = (e) => {
        setDdlComm(e.target.value);
    };

    return (
        //         <div className="flex flex-col bg-custom-peach rounded-lg p-8 mt-8 mx-auto ms-4 right-7  sm:grid grid-cols-5 grid-rows-2 px-4 min-h-full py-6 lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
        //     <div className=" rounded-md flex items-center">
        //         <button className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" value='create' onClick={handleDdl}>Create</button>
        //         <button className="bg-amber-300 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" value='alter' onClick={handleDdl}>Alter</button>
        //         <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded" value='rename' onClick={handleDdl}>Rename</button>
        //         <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" value='drop' onClick={handleDdl}>Drop</button>
        //     </div>

        //     {/* Render the appropriate component based on ddlcomm state */}
        //     <div className=''>
        //         {ddlcomm === 'create' && <CreateTable />}
        //         {ddlcomm === 'alter' && <AlterTable />}
        //         {ddlcomm === 'rename' && <RenameTable />}
        //         {ddlcomm === 'drop' && <DropTable />}
        //     </div>
        // </div>
        <div className="w-min-screeen sm:grid grid-cols-5 grid-rows-2 px-4 py-6 min-h-full lg:min-h-screen space-y-6 sm:space-y-0 sm:gap-4">
            <div className="col-span-4 bg-gradient-to-tr bg-custom-peach rounded-md flex  w-auto">

                <div className="ml-2 mb-2">
                    <div className="rounded-md mt-2 flex  xl:gap-2 sm:gap-1">        
                         <button className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" value='create' onClick={handleDdl}>Create</button>
                        <button className="bg-amber-300 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" value='alter' onClick={handleDdl}>Alter</button>
                        <button className="bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded" value='rename' onClick={handleDdl}>Rename</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" value='drop' onClick={handleDdl}>Drop</button>
                    </div>
                    <div className=''>
                        {ddlcomm === 'create' && <CreateTable />}
                        {ddlcomm === 'alter' && <AlterTable />}       
                          {ddlcomm === 'rename' && <RenameTable />}
                        {ddlcomm === 'drop' && <DropTable />}
                    </div>
                </div>


            </div>
            <div class="h-96 col-span-1 ">
                    <Side/>
            </div>
        </div>

    );
};

export default Ddlpage;
