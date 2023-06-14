import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./order.css"
import { useState } from "react";
import { isLoadingSelector, totalPageSelector, searchSelector, paginationSelector } from "../../redux/order/selector";
import { ordersRemainingSelector } from "../../redux/order/selector";
import { paginationFilterChange } from "../../redux/filterSlice";
import { createOrder, deleteOrder, editOrder } from "../../redux/order/orderSlice";

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
    const orders = useSelector(ordersRemainingSelector)
    const totalPage = useSelector(totalPageSelector)
    const search = useSelector(searchSelector)
    const pagination = useSelector(paginationSelector)

    //form state
    const [modelCreate, setModelCreate] = useState(true)

    const [id, setId] = useState(null)
    const [productId, setProductId] = useState("")
    const [quantity, setQuantity] = useState("")
    const [orderDate, setOrderDate] = useState("")

    const isLoading = useSelector(isLoadingSelector)


    // useEffect(() => {
    //     // console.log("staff", staff);

    // }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const year = date.getFullYear();

        // Formatting the date as dd/mm/yyyy
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        return formattedDate
    }

    const convertDateToTimestamp = (dateString) => {
        const [year, month, day] = dateString.split('-');

        const timestamp = new Date(`${month}/${day}/${year}`).getTime() / 1000;

        return timestamp;
    }
    
    const handlePage = (pageNumber) => {
        // console.log("pageNumber", pageNumber);
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
        let order = orders.find(item => item.id == id)
        setProductId(order.product_id)
        setQuantity(order.quantity)
        setOrderDate(order.order_date)

    }

    const editOrderSubmit = (e) => {
        e.preventDefault();
        // console.log(orderDate);
        // console.log(convertDateToTimestamp(orderDate));
        let dateString = convertDateToTimestamp(orderDate);
        dispatch(editOrder({id, product_id: productId, quantity, order_date: dateString }))
        handleClose()
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this ORDER with id = " + id)) {
            dispatch(deleteOrder(id))
          } else {
            console.log("Delete operation canceled");
          }
    }

    const createOrderSubmit = (e) => {
        e.preventDefault();

        let dateString = convertDateToTimestamp(orderDate);
        
        dispatch(createOrder({
            id, product_id: productId, quantity, order_date: dateString
        }))

        resetForm()

        setOpen(false)
    }

    const resetForm = () => {
        setProductId("")
        setQuantity("")
        setOrderDate("")
    }
    
    return (
        isLoading ? <h1>Loading....</h1> : <div class="content_right">
            <Button onClick={handleOpen}>Create</Button>
            <table class="table table_user_list list_restaurant">
                <thead>
                    <tr>
                        <th class="th-bg" scope="col">ID</th>
                        <th class="th-bg" scope="col">ProductID</th>
                        <th class="th-bg" scope="col">Quantity</th>
                        <th class="th-bg" scope="col">OrderDate</th>
                        <th class="th-bg" scope="col">Edit</th>
                        <th class="th-bg" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody class="body_restaurant">
                    {
                        orders.map(item => {
                            return <tr class="hover-item-restaurant">
                                        <th scope="row">{item.id}</th>
                                        <td>{item.product_id}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatDate(item.order_date)}</td>
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
                <form onSubmit={modelCreate ? createOrderSubmit : editOrderSubmit} id="productForm">
                    
                    <label for="name">Name:</label>
                    <input value={productId} onChange={e => setProductId(e.target.value)} type="text" id="name" name="name" required /> <br /> <br />
                    
                    <label for="position">Position:</label>
                    <input  value={quantity} onChange={e => setQuantity(e.target.value)} type="text" id="price" name="price" step="0.01" required /> <br /> <br />

                    <label for="department">Department:</label>
                    <input  value={orderDate} onChange={e => setOrderDate(e.target.value)}type="date" id="price" name="price" step="0.01" required /> <br /> <br />
                    
                    <button type="submit">Submit</button>
                </form>
                </Box>
            </Modal>
        </div>
    </div>
    )
}