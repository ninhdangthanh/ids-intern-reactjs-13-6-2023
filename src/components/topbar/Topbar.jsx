import React, { useEffect } from "react"
import "./topbar.css"
import { useState } from "react";
import { searchFilterChange } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hook/useDebounce";
import { removeIsLoading, setIsLoading } from "../../redux/products/productSlice";


export default function Topbar() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    const searchQuery = useDebounce(inputValue, 2000);
    
    useEffect(() => {
        if (searchQuery || inputValue.length <= 0) searchCharacter();
        async function searchCharacter() {
            await dispatch(searchFilterChange(searchQuery))
            await dispatch(removeIsLoading())
        }
    }, [searchQuery]);

    useEffect(() => {
        dispatch(setIsLoading())
    }, [inputValue])

    useEffect(() => {
        dispatch(removeIsLoading())
    }, [])
    
    
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        console.log("search", inputValue);
        dispatch(searchFilterChange(inputValue))
    }
    
    return (
        <>
        <div class="header">
        <div class="header_wrap">
            <Link to="/product" class="food_header_logo">
            <img src="https://logos-download.com/wp-content/uploads/2017/01/Circle_Food_Store_logo-700x342.png" alt="" />
            </Link>

            <div onSubmit={handleSubmit} class="search_header w-25">
                 <form  action="${pageContext.request.contextPath}/search_itemfood" method="post" class="search_header_wrap">
                     <input value={inputValue} onChange={handleChange} class="search_header_input" id="searchingFood" name="searchingFood" type="text"
                         placeholder="Search Input" />
                     <button type="submit">Search</button>
                 </form>
             </div>

        </div>
    </div>
        </>
    )
}