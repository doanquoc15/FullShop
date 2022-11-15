import React, { useEffect, useState } from 'react';
import { Container, Image, SearchContainer, ContainerProduct, Input } from '../styled-components/styledProducts';
import Product from './Product';
import { slice } from 'lodash'
import { publicRequest } from '../common/api';
import Loading from '../pages/Loading/Loading';
import { Button } from '../styled-components/styledProducts';
import Search from '@mui/icons-material/Search';


const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filteredProducts, setFilteredProducts] = useState([])
    //search 
    const [query, setQuery] = useState('')
    const [data, setData] = useState('')

    //load More
    const [index, setIndex] = useState(8)
    // const initialProducts = slice(filteredProducts, 0, index)
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
        cat &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            )
    }, [products, cat, filters]);

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
    console.log('1',filteredProducts)

    //fetch search results
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            try {
                const res = await publicRequest.get(`/products/search?q=${query}`);
                setFilteredProducts(res.data)
                console.log('2',filteredProducts)
            } catch (error) {
                console.log("Error : ", error)
            }
        };
        setLoading(false)
        if (query.length === 0 || query.length > 2)
            fetchData();
    }, [query]);

    //load More
    const handleLoadmore = () => {
        setIndex(index + 4)

    };

    //hidden away 
    const handleHiddenAway = () => {
        setIndex(8)
    }
    return (
        <ContainerProduct>
            {loading ? <Loading /> : (<>
                <SearchContainer>
                    <Input
                        onChange={e => setQuery(e.target.value.toLowerCase())}
                        placeholder='Search key...' />
                    <Search />
                </SearchContainer>
                <Container>
                    {filteredProducts.length !== 0 ? filteredProducts.map((product, idx) => (
                        product.isActive && <Product product={product} key={idx} />
                    )) : (loading ? <Loading /> : <Image src='https://tradebharat.in/assets/catalogue/img/no-product-found.png' />)}
                    {/* {filteredProducts.length > 8 && (index >= filteredProducts.length ? <Button onClick={handleHiddenAway}>HiddenAway</Button> : <Button onClick={handleLoadmore}>Load More</Button>)} */}
                </Container></>)}
        </ContainerProduct>
    );
};

export default Products;