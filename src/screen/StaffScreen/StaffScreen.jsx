import React, { useEffect } from "react";
import Staff from "../../components/staff/Staff";
import { useDispatch } from "react-redux";
import { fetchStaffs } from "../../redux/staff/staffSlice";

export default function StaffScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchStaffs());
    }, []);

    return (
        <Staff />
        // <h1>Staff Screen</h1>
    )
}