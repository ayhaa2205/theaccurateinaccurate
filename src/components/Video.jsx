import React from 'react';
import "./Video.css";

const Video = ({src, controls, location, big}) => {
    return (
        <>
            {location === "external" ?
                <iframe src={src} className={"iframe-video"} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe> :
                <video className={`video ${big?'big':''}`} autoPlay loop>
                    <source src={location === "external" ? src : `videos/${src}`} type="video/mp4"/>
                </video>
            }
        </>
    )
        ;
};

export default Video;
