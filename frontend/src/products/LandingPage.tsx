import { useQuery } from "jsonapi-react"
import ProductsList from "./ProductsList";
import { categoryDTO, productDTO } from "./products.model";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
export default function LandingPage() {
    const query = new URLSearchParams(useLocation().search);
    const products = useQuery("products?include=category&" + query);
    const categories = useQuery("categories")
    const initialValues: filterProductsForm = {
        name: '',
        categoryId: 0,
        priceMin: 0,
        priceMax: 0,
        sort: '',
        page: 1,
        recordsPerPage: 10
    }

    const navigation = useNavigate();

    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

    function searchProducts(values: filterProductsForm) {
        modifyURL(values);
        //useQuery
        //category
    }

    function modifyURL(values: filterProductsForm) {
        console.log(values.categoryId)
        const queryStrings: string[] = [];
        if (values.name) {
            queryStrings.push(`filter=contains(name,'${values.name}')`);
        }
        if (values.categoryId) {
            queryStrings.push(`filter=contains(category.name,'${values.categoryId}')`);
        }
        if (values.priceMin > 0) {
            queryStrings.push(`filter=greaterOrEqual(price,'${values.priceMin}')`);
        }
        if (values.priceMax > 0) {
            queryStrings.push(`filter=lessOrEqual(price,'${values.priceMax}')`);
        }
        if (values.sort) {
            queryStrings.push(`sort=${values.name}`);
        }
        queryStrings.push(`page[size]=${values.recordsPerPage}`);
        queryStrings.push(`page[number]=${values.page}`);
        navigation(`/?${queryStrings.join("&")}`);
    }
    //two quierys
    useEffect(() => {
        console.log(query.get("category"))
        if (query.get("name")) {
            initialValues.name = query.get("name")!;
        }
        if (query.get("category")) {
            initialValues.categoryId = parseInt(query.get("category")!, 10);
        }
        if (query.get("pricemin")) {
            initialValues.priceMin = parseInt(query.get("pricemin")!, 10);
        }
        if (query.get("pricemax")) {
            initialValues.priceMax = parseInt(query.get("pricemax")!, 10);
        }
        if (query.get("sort")) {
            initialValues.sort = query.get("sort")!;
        }
        if (query.get("page[size]")) {
            initialValues.recordsPerPage = parseInt(query.get("page[size]")!, 10);
        }
        if (query.get("page[number]")) {
            initialValues.page = parseInt(query.get("page[number]")!, 10);
        }
        searchProducts(initialValues);
    }, []);

    useEffect(() => {
        console.log(products.data)
        console.log(products)
    }, [products.isLoading])

    return (
        <>
            <h3>Products List</h3>
            <Formik initialValues={initialValues} onSubmit={(values) => {
                values.page = 1; searchProducts(values);
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="row gx-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="name" placeholder="Name of the product" {...formikProps.getFieldProps("name")} />
                                </div>
                                <div className="col-auto">
                                    <select className="form-select" {...formikProps.getFieldProps("category")}>
                                        <option value="0">--Choose a category--</option>
                                        {categories.data?.map((category: categoryDTO) => <option key={category.id} value={category.name}>{category.name}</option>)}
                                    </select>
                                </div>
                                <div className="col-auto w-auto">
                                    <input type="number" className="form-control" id="priceMin" {...formikProps.getFieldProps("priceMin")} />
                                </div>
                                <div className="col-auto">
                                    -
                                </div>
                                <div className="col-auto">
                                    <input type="number" className="form-control" id="priceMax" {...formikProps.getFieldProps("priceMax")} />
                                </div>
                                <div className="col-auto">
                                    <select className="form-select"{...formikProps.getFieldProps("category")}>
                                        <option value="0">--Choose sorting--</option>
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary" onClick={() => formikProps.submitForm()}>
                                        Filter
                                    </button>
                                    <button
                                        className="btn btn-danger ms-3"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);
                                            searchProducts(initialValues);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </>
                )}
            </Formik>
            <ProductsList products={products.data as productDTO[]} isLoading={products.isLoading} errors={products.errors} />
        </>

    )
}

interface filterProductsForm {
    name: string,
    categoryId: number,
    priceMin: number,
    priceMax: number,
    sort: string,
    page: number,
    recordsPerPage: number
}