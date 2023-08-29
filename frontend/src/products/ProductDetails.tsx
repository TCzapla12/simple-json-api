import { useQuery } from "jsonapi-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { productDTO } from "./products.model";
import ReactMarkdown from "react-markdown";

export default function ProductDetails() {
    const { id }: any = useParams();
    const product = useQuery(`products/${id}?include=category`);

    useEffect(() => {
        console.log(product)
    }, [id, product.isLoading])

    return product.data ?
        <div className="mt-2">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h2>{(product.data as productDTO).name}</h2>
                    <div className="btn btn-primary btn-sm rounded-pill" style={{ cursor: 'default' }}>
                        {(product.data as productDTO).category.name}
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h2 className="text-danger">{(product.data as productDTO).price} zł</h2>
                    </div>

                </div>

            </div>

            <div style={{ display: "flex", marginTop: "1rem" }}>
                <span style={{ display: "inline-block", marginRight: "1rem" }}>
                    <img src={(product.data as productDTO).picture} style={{ width: "300px", height: "300px" }} alt="picture" />
                </span>
            </div>
            {(product.data as productDTO).description ? <div style={{ marginTop: '1rem' }}>
                <h3>Description</h3>
                <div>
                    <ReactMarkdown>{(product.data as productDTO).description!}</ReactMarkdown>
                </div>
            </div> : null}
        </div>
        : null
}