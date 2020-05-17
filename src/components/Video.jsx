import React from 'react';
import "./Video.css";

const Video = ({src, controls, location, big, align }) => {
    return (
        <>
            {location === "external" ?
                <iframe src={src} className={"iframe-video"} frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe> :
                <video src={`videos/${src}`} className={`video ${big?'big':''} ${align}`} autoPlay muted playsinline loop>
                </video>
            }
        </>
    )
        ;
};

export default Video;
