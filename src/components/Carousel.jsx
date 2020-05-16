import React, {useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import "./Carousel.css";
import Image from "./Image";
import Video from "./Video";

const Carousel = ({content, align}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const renderContent = () => {
        return content.map(contentItem => {
            if (contentItem.slideType === "image") return <Image src={`images/${contentItem.content}`}/>;
            if (contentItem.slideType === "video") return <Video controls={true} location={contentItem.location} src={`${contentItem.content}`}/>
            ;
        });
    };
    let contentArray=renderContent();

    const increaseSlideIndex=()=>{
        if(currentSlideIndex===content.length-1){
            setCurrentSlideIndex(0);
        }else{
            setCurrentSlideIndex(currentSlideIndex+1);
        }
    };
    return (
        <div className={"carousel"}>

            <div className={"carousel__slider"}>
                {contentArray[currentSlideIndex]}
                <button className={"carousel__button"} onClick={increaseSlideIndex}></button>
            </div>

            <div className={`carousel__info carousel__info--${align}`}>
                <div className={"carousel-info__count"}>{currentSlideIndex + 1}/{content.length}</div>
                <div>{content[currentSlideIndex].slideDescription}</div>
            </div>
        </div>
    );
};

export default Carousel;
