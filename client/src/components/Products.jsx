import React, { useEffect, useState } from 'react';
import { Container, Image } from '../styled-components/styledProducts';
import Product from './Product';
import { publicRequest } from '../common/api';
import Loading from '../pages/Loading/Loading';

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
    //get all product by category or get all product
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await publicRequest.get(cat ? `/products?category=${cat}` : `/products`);
                setProducts(res.data)
                setFilteredProducts(res.data)
            } catch (error) {
                console.log('Error:', error)
            }
            setLoading(false)
        };
        fetchData();
    }, [cat]);

    //get products by filter color or size
    useEffect(() => {
        setLoading(true)
        cat && setFilteredProducts(
            products.filter(item =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        )
        setLoading(false)
    }, [products, filters, cat]);
    //sort products by newest or desc or asc
    useEffect(() => {
        if (sort === 'newest') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.createdAt - b.createdAt))
        }
        else if (sort === 'asc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
        }
        else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
        }
        return;
    }, [sort])
    return (
        <Container>

            {filteredProducts.length !== 0 ? filteredProducts.map((product, idx) => (
                <Product product={product} key={idx} />
            )) : ( loading ? <Loading /> : <Image src='https://tradebharat.in/assets/catalogue/img/no-product-found.png' />)}


        </Container>
    );
};

export default Products;