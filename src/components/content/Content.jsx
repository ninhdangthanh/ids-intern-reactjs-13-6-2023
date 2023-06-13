import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingSelector, paginationSelector, productsRemainingSelector, searchSelector, totalPageSelector } from "../../redux/products/selector";
import "./content.css"
import { paginationFilterChange } from "../../redux/filterSlice";
import { createProduct, deleteProduct, editProduct } from "../../redux/products/productSlice";
import { useState } from "react";
import { useDebounce } from "../../hook/useDebounce";

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

export default function Content() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        resetForm()
        setModelCreate(true)
    };

    const dispatch = useDispatch();
    const products = useSelector(productsRemainingSelector)
    const totalPage = useSelector(totalPageSelector)
    const search = useSelector(searchSelector)
    const pagination = useSelector(paginationSelector)
    const isLoading = useSelector(isLoadingSelector)

    //form state
    const [modelCreate, setModelCreate] = useState(true)

    const [id, setId] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)


    useEffect(() => {
    }, [products])
    
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
        let product = products.find(item => item.id == id)
        console.log("product11111", product);
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
    }

    const editProductSubmit = (e) => {
        e.preventDefault();
        dispatch(editProduct({id, name, description, price }))
        handleClose()
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this PRODUCT with id = " + id)) {
            dispatch(deleteProduct(id))
          } else {
            console.log("Delete operation canceled");
          }
      
    }

    const createProductSubmit = (e) => {
        e.preventDefault();

        dispatch(createProduct({
            name: name,
            description: description,
            price: price
        }))

        resetForm()

        setOpen(false)
    }

    const resetForm = () => {
        setName("")
        setDescription("")
        setPrice(0)
    }
    
    return (
        isLoading ? <h1>Loading....</h1> : <div class="content_right">
            <Button onClick={handleOpen}>Create</Button>
            <table class="table table_user_list list_restaurant">
                <thead>
                    <tr>
                        <th class="th-bg" scope="col">ID</th>
                        <th class="th-bg" scope="col">Name</th>
                        <th class="th-bg" scope="col">Price</th>
                        <th class="th-bg" scope="col">Description</th>
                        <th class="th-bg" scope="col">Edit</th>
                        <th class="th-bg" scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody class="body_restaurant">
                    {
                        products.map(item => {
                            return <tr class="hover-item-restaurant">
                                        <th scope="row">{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.description}</td>
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
                <form onSubmit={modelCreate ? createProductSubmit : editProductSubmit} id="productForm">
                    
                    <label for="name">Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" name="name" required /> <br /> <br />
                    
                    <label for="description">Description:</label>
                    <textarea  value={description} onChange={e => setDescription(e.target.value)}id="description" name="description" required></textarea> <br /> <br />
                    
                    <label for="price">Price:</label>
                    <input  value={price} onChange={e => setPrice(e.target.value)}type="number" id="price" name="price" step="0.01" required /> <br /> <br />
                    
                    <button type="submit">Submit</button>
                </form>
                </Box>
            </Modal>
        </div>
    </div>
    )
}