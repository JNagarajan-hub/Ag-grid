import { useEffect, useMemo, useState, useRef } from 'react'
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { MdDelete } from "react-icons/md";
import Header from "./component/Header"
import Footer from "./component/Footer"
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import axios from "axios";
import './App.css'


 

function App() {

  const gridRef = useRef();

  const [rowData, setRowData] = useState([
    { id: 1, name: "Aarav", gender: "Male", department: "Product Development" },
    { id: 2, name: "Meera", gender: "Female", department: "Marketing" },
    { id: 3, name: "Vikram", gender: "Male", department: "Finance" },
    { id: 4, name: "Ananya", gender: "Female", department: "Human Resources" },
    { id: 5, name: "Rohan", gender: "Male", department: "Quality Assurance" },
    { id: 6, name: "Ram", gender: "Male", department: "Sales" },
    // { id: 7, name: "Siddharth", gender: "Male", department: "Operations" },
    // { id: 8, name: "Priya", gender: "Female", department: "IT Support" },
    // { id: 9, name: "Arjun", gender: "Male", department: "Design" },
    // { id: 10, name: "Kavya", gender: "Female", department: "Customer Service" },
    // { id: 11, name: "Dev", gender: "Male", department: "R&D" },
  ]);

 const customButton = (params) => {
    return <button className='delbtn' onClick={() => delRow(params.data.id)}><MdDelete className='delicon' /></button>
  }

  const colDef = useMemo(() => {
    return [
      {
        headerName: "SNo",field:"id", valueGetter: "node.rowIndex+1", width: 90,
        headerCheckboxSelection: true,
        checkboxSelection: true,

      },
      { headerName: "Name", field: "name", flex: 1 },
      {
        headerName: "Gender",
        field: "gender", flex: 1,
        valueFormatter: params => {
          if (params.value === "Male") {
            return `♂ ${params.value}`;
          }
          if (params.value === "Female") {
            return `♀ ${params.value}`;
          }
        }
      },
      { headerName: "Department", field: "department", flex: 1 },
      { headerName: "Action", field: "button", flex: 1, editable: false, cellRenderer: customButton }
    ]
  }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5155/api/role");
  //       const arr = Object.values(res.data)
  //       console.log(arr);
  //       setRowData(arr);
  //     } catch (err) {
  //       console.error("Error fetching roles:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const onDelete = () => {
    const confirmDelete = window.confirm("Are you sure want to delete this item?")
    if (confirmDelete) {
      const selectedNodes = gridRef.current.api.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      const newData = rowData.filter((row) => !selectedData.includes(row));
      setRowData(newData);
      gridRef.current.api.deselectAll();
    }
  };

  const delRow = (id) => {
    const confirmDelete = window.confirm("Are you sure want to delete this item?");
    if (confirmDelete) {
      setRowData(items => items.filter(item => item.id !== id));
    }
  }

  const newInd = rowData.length > 0 ? Math.max(...rowData.map((row) => row.id)) + 1 : 1;

  const add = () => {
    const newRow = { id: newInd, name: "", gender: "", department: "" };
    setRowData((prev) => [...prev, newRow]);

  };
  const show = () => {
    gridRef.current.api.stopEditing();
    console.log(rowData);
  }



  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      sortable:true
    }
  },[])



  const onSearch = (e) => {
    if (gridRef.current) {
      gridRef.current.api.setGridOption('quickFilterText', e.target.value.trim());
    }
  };
  return (
    <>
      <Header />
      <div className="container">

        <div className="row">
          <input type="search" placeholder='search' onInput={onSearch} id='search' />
          <button onClick={add} id='add'>Add</button>
          <button onClick={show} id='show'>show data</button>
        </div>

        <div className="row1">
          <button id='delete' onClick={onDelete}>DeleteSelected</button>
        </div>

        <div className='table'>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={colDef}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 10, 20]}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            domLayout='autoHeight'
          />
        </div>
      </div>
      <Footer />
    </>



  )
}

export default App

