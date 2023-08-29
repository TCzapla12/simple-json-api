import { useQuery } from "jsonapi-react"
import ProductsList from "./ProductsList";
import { categoryDTO, productDTO } from "./products.model";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Form, Formik } from "formik";
import Pagination from "../utils/Pagination";
import RecordsPerPageSelect from "../utils/RecordsPerPageSelect";
import DisplayErrors, { error } from "../utils/DisplayErrors";
import { indirectUrlCategories, indirectUrlProduct } from "../endpoints";
export default function LandingPage() {
    const query = new URLSearchParams(useLocation().search);

    const products = useQuery(indirectUrlProduct + "?include=category&" + query);
    const categories = useQuery(indirectUrlCategories);

    const navigation = useNavigate();

    const initialValues: filterProductsForm = {
        name: '',
        categoryId: 0,
        priceMin: 0,
        priceMax: 0,
        sort: '',
        page: 1,
        recordsPerPage: 10
    }

    function getPages(value: number) {
        if (products.meta) {
            return Math.ceil(products.meta.total / value);
        }
        return 0;
    }

    function searchProducts(values: filterProductsForm) {
        modifyURL(values);
    }

    function modifyURL(values: filterProductsForm) {
        const filterStrings: string[] = [];
        const queryStrings: string[] = [];
        if (values.name) {
            filterStrings.push(`contains(name,'${values.name}')`);
        }
        if (values.categoryId > 0) {
            filterStrings.push(`equals(category.id,'${values.categoryId}')`);
        }
        if (values.priceMin > 0) {
            filterStrings.push(`greaterOrEqual(price,'${values.priceMin}')`);
        }
        if (values.priceMax > 0) {
            filterStrings.push(`lessOrEqual(price,'${values.priceMax}')`);
        }
        if (filterStrings.length > 1) {
            queryStrings.push(`filter=and(${filterStrings.join(",")})`)
        } else if (filterStrings.length === 1) {
            queryStrings.push(`filter=${filterStrings[0]}`);
        }
        if (values.sort === 'alphabetic') {
            queryStrings.push(`sort=name`);
        }
        else if (values.sort === 'ascending') {
            queryStrings.push(`sort=price`);
        }
        else if (values.sort === 'descending') {
            queryStrings.push(`sort=-price`);
        }
        queryStrings.push(`page[size]=${values.recordsPerPage}`);
        queryStrings.push(`page[number]=${values.page}`);
        navigation(`/?${queryStrings.join("&")}`);
    }

    useEffect(() => {
        searchProducts(initialValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h3>Products List</h3>
            <DisplayErrors error={products.error as error} />
            <DisplayErrors error={categories.error as error} />
            <Formik initialValues={initialValues} onSubmit={(values) => {
                values.page = 1; searchProducts(values);
            }}>
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="row gx-3 align-items-center mb-3 gy-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="name" placeholder="Name of the product" {...formikProps.getFieldProps("name")} />
                                </div>
                                <div className="col-auto">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Category</span>
                                        </div>
                                        <select className="form-select" {...formikProps.getFieldProps("categoryId")}>
                                            <option value="0">All</option>
                                            {categories.data?.map((category: categoryDTO) => <option key={category.id} value={category.id}>{category.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-auto w-auto">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">from</span>
                                        </div>
                                        <input style={{ maxWidth: '5rem' }} min="0" type="number" className="form-control" id="priceMin" {...formikProps.getFieldProps("priceMin")} />
                                        <div className="input-group-append">
                                            <span className="input-group-text">zł</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    -
                                </div>
                                <div className="col-auto">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">to</span>
                                        </div>
                                        <input style={{ maxWidth: '5rem' }} min={formikProps.values.priceMin} type="number" className="form-control" id="priceMax" {...formikProps.getFieldProps("priceMax")} />
                                        <div className="input-group-append">
                                            <span className="input-group-text">zł</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">Sort by</span>
                                        </div>
                                        <select className="form-select"{...formikProps.getFieldProps("sort")}>
                                            <option value="0">Default</option>
                                            <option value="alphabetic">Name: A to Z</option>
                                            <option value="ascending">Price: Low to High</option>
                                            <option value="descending">Price: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <RecordsPerPageSelect
                                        value={formikProps.values.recordsPerPage}
                                        onChange={(amountOfRecords) => {
                                            formikProps.values.recordsPerPage = amountOfRecords;
                                        }} />
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary" onClick={() => {
                                        formikProps.submitForm();
                                    }}>
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
                        <ProductsList products={products.data as productDTO[]} isLoading={products.isLoading} />
                        <Pagination totalAmountOfPages={getPages(formikProps.values.recordsPerPage)} onChange={newPage => {
                            formikProps.values.page = newPage;
                            searchProducts(formikProps.values);
                        }} currentPage={formikProps.values.page} />
                    </>
                )}
            </Formik>
        </>
    )
}

interface filterProductsForm {
    name: string,
    categoryId: number,
    priceMin: number,
    priceMax: number,
    sort: 'ascending' | 'descending' | 'alphabetic' | '',
    page: number,
    recordsPerPage: number
}