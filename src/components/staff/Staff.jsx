import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./staff.css"
import { paginationFilterChange } from "../../redux/filterSlice";
import { useState } from "react";
import { staffsRemainingSelector, paginationSelector, searchSelector, totalPageSelector, staffSelector } from "../../redux/staff/selector";
import { createStaff, deleteStaff, editStaff } from "../../redux/staff/staffSlice";
import { isLoadingSelector } from "../../redux/products/selector";

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Staff() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        resetForm()
        setModelCreate(true)
    };

    const dispatch = useDispatch();
    const staffs = useSelector(staffsRemainingSelector)
    const totalPage = useSelector(totalPageSelector)
    const search = useSelector(searchSelector)
    const pagination = useSelector(paginationSelector)

    //form state
    const [modelCreate, setModelCreate] = useState(true)

    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [department, setDepartment] = useState("")

    const isLoading = useSelector(isLoadingSelector)


    // useEffect(() => {
    //     // console.log("staff", staff);
    // }, [staffs])
    
    const handlePage = (pageNumber) => {
        console.log("pageNumber", pageNumber);
        dispatch(paginationFilterChange(pageNumber))
    }

    const renderPagination = () => {
        if(search != "") {
            return []
        }
        let viewData = []
        for (let i = 1; i <= totalPage; ++ i) {
            viewData.push(<li class={i === pagination ? "paginationActive" : ""} onClick={() => handlePage(i)}>{i}</li>)
        }
        return viewData
    }

    const handleEdit = (id) => {
        setModelCreate(false)
        handleOpen()
        setId(id)
        let staff = staffs.find(item => item.id == id)
        console.log("product11111", staff);
        setName(staff.name)
        setPosition(staff.position)
        setDepartment(staff.department)
    }

    const editStaffSubmit = (e) => {
        e.preventDefault();
        dispatch(editStaff({id, name, position, department }))
        handleClose()
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this STAFF with id = " + id)) {
            dispatch(deleteStaff(id))
          } else {
            console.log("Delete operation canceled");
          }
    }

    const createStaffSubmit = (e) => {
        e.preventDefault();

        dispatch(createStaff({
            name: name,
            position: position,
            department: department
        }))

        resetForm()

        setOpen(false)
    }

    const resetForm = () => {
        setName("")
        setPosition("")
        setDepartment("")
    }
    
    return (
        isLoading ? <h1>Loading....</h1> : <div class="content_right">
            <Button onClick={handleOpen}>Create</Button>
            <table class="table table_user_list list_restaurant">
                <thead>
                    <tr>
                        <th class="th-bg" scope="col">ID</th>
                        <th class="th-bg" scope="col">Name</th>
                        <th class="th-bg" scope="col">Position</th>
                        <th class="th-bg" scope="col">Department</th>
                        <th class="th-bg" scope="col">Edit</th>
                        <th class="th-bg" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody class="body_restaurant">
                    {
                        staffs.map(item => {
                            return <tr class="hover-item-restaurant">
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.position}</td>
                                        <td>{item.department}</td>
                                        <td><a onClick={() => handleEdit(item.id)} className="hoverLink">Edit</a></td>
                                        <td><a onClick={() => handleDelete(item.id)} className="hoverLink">Delete</a></td>
                                    </tr>   
                        })
                    }
                        
                </tbody>
            </table>
            <div>
                    <nav className="listPagination">
                        {renderPagination().map(item => item)}
                    </nav>
            <div>

            </div>

      
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <form onSubmit={modelCreate ? createStaffSubmit : editStaffSubmit} id="productForm">
                    
                    <label for="name">Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" required /> <br /> <br />
                    
                    <label for="position">Position:</label>
                    <input  value={position} onChange={e => setPosition(e.target.value)} type="text" id="price" name="price" step="0.01" required /> <br /> <br />

                    <label for="department">Department:</label>
                    <input  value={department} onChange={e => setDepartment(e.target.value)}type="text" id="price" name="price" step="0.01" required /> <br /> <br />
                    
                    <button type="submit">Submit</button>
                </form>
                </Box>
            </Modal>
        </div>
    </div>
    )
}