import React, { useState } from 'react';
import './newProduct.css'
import HasTag from '../hastag/HasTag';
import { useDispatch } from 'react-redux';
import { sizeData, categoryData } from '../../adminData.js'
import { addProduct } from '../../redux/apiCall';

const NewProduct = () => {
    const dispatch = useDispatch();
    const [image, setImage] = useState()
    const [color, setColor] = useState([])
    const [title, setTitle] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    const [desc, setDesc] = useState()
    const [size, setSize] = useState([])
    const [isActive, setIsActive] = useState()
    const [categories, setCategories] = useState([])

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
            }
        } else {
            setImage('')
        }
    };

    // handle click checkbox 
    const handleClickCheckBox = (e) => {
        if (e.target.checked) {
            setSize([...size, e.target.value]);
            setCategories([...categories, e.target.value])
        }
        else {
            setSize(size.filter((item) => item !== e.target.value));
            setCategories(categories.filter((item) => item !== e.target.value))
        }
    };

    //handle submits
    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(dispatch, {
            img: image,
            title,
            desc,
            isActive,
            price,
            quantity,
            size,
            categories,
            color
        })
    }


    return (
        <div className="newProduct">
            <div>
                <h1 style={{ color: 'grey' }} >New Product</h1>
                <form className="addProductForm">
                    <div className="addProductItem">
                        <label>Image</label>
                        <input
                            type="file"
                            accept='image/png, image/jpg, image/jpeg'
                            onChange={handleProductImageUpload} />
                    </div>
                    <div className="addProductItem">
                        <label>Name</label>
                        <input
                            required
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Apple Airpods" />
                    </div>
                    <div className="addProductItem">
                        <label>Price</label>
                        <input
                            required
                            onChange={e => setPrice(e.target.value)}
                            type="text"
                            placeholder="32.4$" />
                    </div>
                    <div className="addProductItem">
                        <label>Size</label>
                        <div className="addProductItemSize">
                            {
                                categoryData && categoryData.map(item => (
                                    <div className="size">
                                        <input
                                            onChange={handleClickCheckBox}
                                            type="checkbox"
                                            id={item} value={item} />
                                        <label for={item}>{item}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="addProductItem">
                        <label>Quantity</label>
                        <input
                            required
                            onChange={e => setQuantity(e.target.value)}
                            type="number"
                            placeholder="123" />
                    </div>
                    <div className="addProductItem">
                        <label>Description</label>
                        <input
                            onChange={e => setDesc(e.target.value)}
                            type="text"
                            placeholder="Description detail ..." />
                    </div>
                    <div className="addProductItem">
                        <label>Color</label>
                        <HasTag tag={color} setColor={setColor} />
                    </div>
                    <div className="addProductItem">
                        <label>Size</label>
                        <div className="addProductItemSize">
                            {
                                sizeData && sizeData.map(item => (
                                    <div className="size">
                                        <input
                                            onChange={handleClickCheckBox}
                                            type="checkbox"
                                            id={item} value={item} />
                                        <label for={item}>{item}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="addProductItem">
                        <label>Active</label>
                        <select name="active" id="active" onChange={e => setIsActive(!isActive)}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="addProductButton">Create</button>
                </form>
            </div>
            <div>
                <h3 style={{ color: 'grey', letterSpacing: '1.5px', marginBottom: '1rem' }}>Display the image you have selected</h3>
                <div className="imageContainer">
                    <img src={image} alt="" />
                </div>
            </div>
        </div>
    );
};

export default NewProduct;