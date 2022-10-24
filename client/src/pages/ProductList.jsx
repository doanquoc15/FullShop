import React, { useState } from 'react';
import { Container, FilterContainer, Title, Filter, FilterText, Option, Select } from '../styled-components/styledProductList';
import Products from '../components/Products'
import { useLocation } from 'react-router-dom';


const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');

    const handleFilters = (e) => {
        const value = e.target.value;
        console.log('vl', value)
        value && setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }
    return (
        <Container>
            <Title>Dresses</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product:</FilterText>
                    <Select name='color' onClick={handleFilters}>
                        <Option value='' selected="true" disabled="disabled" >--Color--</Option>
                        <Option value='white'>White </Option>
                        <Option value='black'>Black </Option>
                        <Option value='blue'>Blue </Option>
                        <Option value='yellow'>Yellow </Option>
                        <Option value='green'>Green </Option>
                    </Select>
                    <Select name='size' onClick={handleFilters}>
                        <Option value='' selected="true" disabled="disabled">--Size--</Option>
                        <Option value='XL'>XS </Option>
                        <Option value='S'>S </Option>
                        <Option value='M'>M </Option>
                        <Option value='L'>L </Option>
                        <Option value='XL'>XL </Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Product:</FilterText>
                    <Select onClick={e => setSort(e.target.value)}>
                        <Option value='newest' selected="true">Newest</Option>
                        <Option value='asc'>Price (asc) </Option>
                        <Option value='desc'>Price (desc) </Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
        </Container>
    );
};

export default ProductList;