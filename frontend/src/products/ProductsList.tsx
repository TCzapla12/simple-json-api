import { useQuery } from "jsonapi-react";
import Loading from "../utils/Loading";
import { productDTO } from "./products.model";
import { useNavigate } from "react-router-dom";

export default function ProductsList(props: productsListProps) {
    const imgStyle = { width: '40px', height: '40px'};
    const navigation = useNavigate();

    if (props.isLoading) {
        return <Loading />
    }
    else if (props.products?.length === 0) {
        return <>There is no elements to display</>
    }
    else return <table className="table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            {props.products?.map((product: productDTO) => (
                <tr key={product.id} onClick={() => navigation(`/product/${product.id}`)} className="pointer">
                    <td>{product.id}</td>
                    <td>
                        <img style={imgStyle} src={product.picture} alt={product.name} />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category.name}</td>
                    
                    <td>{product.price} zł</td>
                </tr>
            ))}
        </tbody>

    </table>
}

interface productsListProps {
    products?: productDTO[];
    isLoading?: boolean;
    errors?: any;
}

