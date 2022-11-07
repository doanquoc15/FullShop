import React, { useState } from 'react';
import './hastag.css'
import styled from 'styled-components'


const Color = styled.li`
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 8px 8px 0;
    background:  ${({ color }) => color};;
    cursor: pointer;
`;
const HasTag = ({ setColor, tag }) => {
    const [tags, setTags] = useState(tag);
    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        setColor([...tags.filter((_, index) => index !== indexToRemove)])
    };
    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            setColor([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return (
        <div className="tags-input">
            <ul id="tags">
                {tags && tags.map((tag, index) => (
                    <Color key={index} className="tag" color={tag}>
                        <span >{tag}</span>
                        <span className='tag-close-icon'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </Color>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => event.key === " " ? addTags(event) : null}
                placeholder="Add tag color"
            />
        </div>
    );
};

export default HasTag;
