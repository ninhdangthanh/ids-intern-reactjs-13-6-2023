import { useDispatch } from "react-redux";
import Content from "../../components/content/Content";
import { fetchProducts } from "../../redux/products/productSlice";
import { useEffect } from "react";

export default function ProductScreen() {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchProducts());
    }, []);
    
    return (
        <Content />
    )
}