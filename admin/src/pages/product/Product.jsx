import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { useSelector, useDispatch } from "react-redux";
import HasTag from "../hastag/HasTag";
import styled from 'styled-components'
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCall";
import Loading from '../Loading/Loading'
const Color = styled.span`
    background : ${({ color }) => color};
    padding : 4px 20px;
    height : 40px;
    border-radius : 10px;
    margin-right : 15px;
`;

export default function Product() {
    const { productId } = useParams();
    const productCurrent = useSelector(state => state.product.products.find((product) => product._id === productId));
    const [image, setImage] = useState(productCurrent && productCurrent.img);
    const [imageView, setImageView] = useState(productCurrent && productCurrent.img?.url);
    const [pStats, setPStats] = useState([]);
    const dispatch = useDispatch();
    const [title, setTitle] = useState(productCurrent && productCurrent.title)
    const [price, setPrice] = useState(productCurrent && productCurrent.price)
    const [quantity, setQuantity] = useState(productCurrent && productCurrent.quantity)
    const [desc, setDesc] = useState(productCurrent &&productCurrent.desc)
    const [isStock, setIsStock] = useState(productCurrent && productCurrent.isStock)
    const [isActive, setIsActive] = useState(productCurrent && productCurrent.isActive)
    const [color, setColor] = useState();
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})


    useEffect(() => {
        setLoading(true)
        const fetchData = async (req, res) => {
            try {
                const res = await userRequest.get(`/products/find/${productId}`)
                setProduct(res.data)
            } catch (error) {
                console.log('Error :', error)
            }
            setLoading(false)
        };

        fetchData()
    }, [productId]);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    //methode    
    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        TransformFile(file);
    }

    //hien thi image truoc khi dua len mongoose
    const TransformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                console.log(reader)
                setImage(reader.result)
                setImageView(reader.result)
            }
        } else {
            setImage('')
        }
    };

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get(`orders/income?pid=${productId}`);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: months[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, []);

    //handle update product
    const handleUpdate = (e) => {
        e.preventDefault();
        updateProduct(dispatch, productId, {
            ...product,
            title,
            image,
            price,
            quantity,
            desc,
            color,
            isStock,
            isActive
        })
    }
    return (
        loading ? <Loading /> : (<div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">

                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product && product.img?.url} alt="" className="productInfoImg" />
                        <span className="productName">{product && product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">ID</span>:
                            <span className="productInfoValue">{product && product._id}</span>

                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Sales</span>:
                            <span className="productInfoValue">${product && product.price}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Description</span>:
                            <span className="productInfoValue">{product && product.desc}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Quantity</span>:
                            <span className="productInfoValue">{product && product.quantity}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Color</span>:
                            <span className="productInfoValue">{product.color && product.color.map(item => (<Color color={item} />))}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Active</span>:
                            <span className="productInfoValue">{product && product.isActive ? 'yes' : 'no'}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">In stock</span>:
                            <span className="productInfoValue">{product && product.isStock ? 'yes' : 'no'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Apple AirPod"
                            value={title} />
                        <label>Cost</label>
                        <input
                            onChange={e => setPrice(e.target.value)}
                            type="number"
                            placeholder="12.3$"
                            value={price} />
                        <label>Quantity</label>
                        <input
                            onChange={e => setQuantity(e.target.value)}
                            type="number"
                            placeholder="100"
                            value={quantity} />
                        <label>Description</label>
                        <input
                            onChange={e => setDesc(e.target.value)}
                            type="text"
                            placeholder="Description..."
                            value={desc} />
                        <label>Color</label>
                        <HasTag
                            setColor={setColor}
                            tag={product.color} />
                        <label>In Stock</label>
                        <select
                            name="inStock"
                            id="idStock"
                            onChange={() => setIsStock(!isStock)}>
                            <option value="yes" selected={isStock && true}>Yes</option>
                            <option value="no" selected={!isStock && true} >No</option>
                        </select>
                        <label>Active</label>
                        <select
                            name="active"
                            id="active"
                            onChange={() =>setIsActive(!isActive)}>
                            <option value="yes" selected = {isActive && true}>Yes</option>
                            <option value="no" selected={!isActive && true}>No</option>
                        </select>
                    </div>

                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={imageView} alt="" className="productUploadImg" />
                            <label for="file">
                                <input
                                    type="file"
                                    accept='image/png, image/jpg, image/jpeg'
                                    onChange={handleProductImageUpload} />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button className="productButton" onClick={handleUpdate}>Update</button>
                    </div>
                </form>
            </div>
        </div>)

    );

}
