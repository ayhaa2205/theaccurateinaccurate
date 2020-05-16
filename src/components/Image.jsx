import React from 'react';
import './Image.css';

const Image = ({src}) => {
    return (
        <img className={"image"} src={src}/>
    );
};

export default Image;
