import React from 'react';
import "./Video.css";

const Video = ({src, controls, location, big, align, intro}) => {
    return (
        <>
            {location === "external" ?
                <iframe src={src} className={"iframe-video"} frameborder="0" allow="autoplay; fullscreen" allowFullScreen></iframe> :
                <video src={`videos/${src}`} className={`video ${big?'big':''} ${align}`} autoPlay muted playsInline loop>
                </video>

            }
        </>
    )
        ;
};

export default Video;
