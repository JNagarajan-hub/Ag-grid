import React, { useState } from 'react'

import '../App.css'

const FormComponent = ({ setRowData, rowData }) => {

    const [data, setData] = useState({
        name: "",
        gender: "Male",
        department: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }
    const addData = (e) => {
        e.preventDefault();
        setRowData(prev => [...prev, {
            name: data.name,
            gender: data.gender,
            department: data.department
        }]);

        setData({
            name: "",
            gender: "Male",
            department: ""
        });
    }

    const showData = () => {
        console.log(rowData);
    }

    return (
        <div className='formComponent'>
            <h2>Add Data to AG grid</h2>
            <form action="" onSubmit={addData} >
                <div className="group">
                    <label htmlFor="Name">Name</label>
                    <input required type="text" name='name' value={data.name} onChange={handleChange} placeholder='Name' />
                </div>
                <div className="group">
                    <label htmlFor="Gender">Gender</label>
                    <select required name="Gender" onChange={handleChange} value={data.gender} id="">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="group">
                    <label htmlFor="Department">Department</label>
                    <input required type="text" name='department' value={data.department} onChange={handleChange} placeholder='Department' />
                </div>
                <button type='submit'>Add Data</button>
            </form>
            <button onClick={showData}>Show all</button>

        </div>
    )
}

export default FormComponent