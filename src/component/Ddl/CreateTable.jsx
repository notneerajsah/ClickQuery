import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const CreateTable = () => {
    const [tablename, setTablename] = useState('');
    const [numAttributes, setNumAttributes] = useState(0);
    const [attributes, setAttributes] = useState(Array.from({ length: numAttributes }, () => ''));
    const [dataTypes, setDataTypes] = useState(Array.from({ length: numAttributes }, () => ''));
    const [constraints, setConstraints] = useState(Array.from({ length: numAttributes }, () => ''));
    const [message, setMessage] = useState('');

    const handleAttributeChange = (e, index) => {
        const updatedAttributes = [...attributes];
        updatedAttributes[index] = e.target.value;
        setAttributes(updatedAttributes);
    };

    const handleDataTypeChange = (e, index) => {
        const updatedDataTypes = [...dataTypes];
        updatedDataTypes[index] = e.target.value;
        setDataTypes(updatedDataTypes);
    };

    const handleConstraintChange = (e, index) => {
        const updatedConstraints = [...constraints];
        updatedConstraints[index] = e.target.value;
        setConstraints(updatedConstraints);
    };

    const handleAddAttribute = () => {
        setNumAttributes(numAttributes + 1);
        setAttributes([...attributes, '']);
        setDataTypes([...dataTypes, '']);
        setConstraints([...constraints, '']);
    };

    const handleRemoveAttribute = () => {
        if (numAttributes > 0) {
            setNumAttributes(numAttributes - 1);
            setAttributes(attributes.slice(0, numAttributes - 1));
            setDataTypes(dataTypes.slice(0, numAttributes - 1));
            setConstraints(constraints.slice(0, numAttributes - 1));
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);

        const tableInfo = {
            decodedToken,
            tablename,
            attributes: attributes.slice(0, numAttributes),
            dataTypes: dataTypes.slice(0, numAttributes),
            constraints: constraints.slice(0, numAttributes)
        };

        try {
            const response = await axios.post('http://localhost:3334/ddl/createtable', tableInfo);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error creating table: ' + error.message);
        }
    };

    const renderAttributeInputs = () => {
        let inputs = [];
        for (let i = 0; i < numAttributes; i++) {
            inputs.push(
                <div key={i} className="mt-4">
                    <label className="block text-gray-700">{`Attribute ${i + 1}`}</label>
                    <input
                        type="text"
                        placeholder={`Attribute ${i + 1}`}
                        value={attributes[i] || ''}
                        onChange={(e) => handleAttributeChange(e, i)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <label className="block mt-2 text-gray-700">Data type</label>
                    <input
                        type="text"
                        placeholder={`Data type for Attribute ${i + 1}`}
                        value={dataTypes[i] || ''}
                        onChange={(e) => handleDataTypeChange(e, i)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <label className="block mt-2 text-gray-700">Constraint</label>
                    <input
                        type="text"
                        placeholder={`Constraint for Attribute ${i + 1}`}
                        value={constraints[i] || ''}
                        onChange={(e) => handleConstraintChange(e, i)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className="max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Create Table</h1>
            <label htmlFor="tableName" className="block text-gray-700">Table Name</label>
            <input
                value={tablename}
                onChange={(e) => setTablename(e.target.value)}
                id="tableName"
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="mt-4">
                <label className="block text-gray-700">Number of Attributes</label>
                <input
                    type="number"
                    value={numAttributes}
                    onChange={(e) => setNumAttributes(parseInt(e.target.value))}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>

            <div className="mt-4 overflow-y-auto max-h-40">
                {renderAttributeInputs()}
            </div>

            <div className="flex justify-between mt-4">
                <button onClick={handleAddAttribute} className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                    Add Attribute
                </button>
                <button onClick={handleRemoveAttribute} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                    Remove Attribute
                </button>
            </div>

            <button
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 mt-4"
                onClick={handleSubmit}
            >
                Create Table
            </button>
            {message && <p className="mt-4 text-sm text-gray-500">{message}</p>}
        </div>
    );
};

export default CreateTable;
