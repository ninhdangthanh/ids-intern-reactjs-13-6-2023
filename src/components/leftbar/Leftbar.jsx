import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

export default function Leftbar(props) {
    const location = useLocation();
    
    useEffect(() => {
    })
    

    return (
        
        <>
            <div class="content_left">
                <Link to="/product" className={location.pathname === "/product" ? "content_left_item content_left_item_logout_active" : "content_left_item"}>Product</Link>
                <Link to="/staff" class={location.pathname === "/staff" ? "content_left_item content_left_item_logout_active" : "content_left_item"}>Staff</Link>
                <Link to="/order" class={location.pathname === "/order" ? "content_left_item content_left_item_logout_active" : "content_left_item"}>Order</Link>
            </div>
        </>
    )
}