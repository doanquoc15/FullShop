import { useEffect } from "react";
import "./productList.css";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { Link, useNavigate } from "react-router-dom";
import Edit from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProduct } from "../../redux/apiCall";
const ProductList = () => {
    //validate
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //state
    const data = useSelector(state => state.product.products)
    //get all product
    useEffect(() => {
        getAllProduct(dispatch);
    }, [dispatch]);


    const handleDelete = (id) => {
        deleteProduct(dispatch, id);
    };

    const columns = [
        { field: "_id", headerName: "ID", width: 220 },
        {
            field: "product",
            headerName: "Product",
            width: 220,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: "quantity",
            headerName: "Quantity",
            width: 100,
        },

        {
            field: "price",
            headerName: "Price",
            width: 100,
        },
        {
            field: "isStock",
            headerName: "Stock",
            width: 100,
        },
        {
            field: "isActive",
            headerName: "Active",
            width: 120,
        },
        {
            field: "action",
            headerName: "Action",
            width: 140,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.row._id}`}>
                            <Edit />
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <button
                onClick={() => navigate('/newProduct')}
                className="addProduct">Create product</button>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                getRowId={row => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}

export default ProductList;