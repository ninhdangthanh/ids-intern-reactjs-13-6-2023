import React, { useEffect } from "react";
import Order from "./../../components/order/Order"
import { fetchOrders } from "../../redux/order/orderSlice";
import { useDispatch } from "react-redux";

export default function OrderScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchOrders());
    }, []);
    
    return (
        <Order />
    )
}