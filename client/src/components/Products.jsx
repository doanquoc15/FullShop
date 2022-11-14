import React, { useEffect, useState } from 'react';
import { Container, Image } from '../styled-components/styledProducts';
import Product from './Product';
import { slice } from 'lodash'
import { publicRequest } from '../common/api';
import Loading from '../pages/Loading/Loading';
import { Button } from '../styled-components/styledProducts';

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
    //load More
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(8)
    const initialProducts = slice(filteredProducts, 0, index)
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
            setFilteredProducts(prev => [...prev].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
            console.log(filteredProducts)
        }
        else if (sort === 'asc') {
            setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
            console.log(filteredProducts)
        }
        else {
            setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
            console.log(filteredProducts)
        }
        return;
    }, [sort]);

    //load More
    const handleLoadmore = () => {
        setIndex(index + 4)

    };

    //hidden away 
    const handleHiddenAway = () => {
        setIndex(8)
    }
    return (
        <>
            <Container>
                {initialProducts.length !== 0 ? initialProducts.map((product, idx) => (
                    product.isActive && <Product product={product} key={idx} />
                )) : (loading ? <Loading /> : <Image src='https://tradebharat.in/assets/catalogue/img/no-product-found.png' />)}
                {filteredProducts.length > 8 && (index >= filteredProducts.length ? <Button onClick={handleHiddenAway}>HiddenAway</Button> : <Button onClick={handleLoadmore}>Load More</Button>)}
            </Container>
        </>
    );
};

export default Products;