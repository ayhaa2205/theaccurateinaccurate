import React from 'react';
import './Image.css';

const Image = ({src, align}) => {
    return (
        <img className={`image ${align}`} src={src}/>
    );
};

export default Image;
