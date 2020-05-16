import React, {useState, useEffect} from 'react';
import './App.css';
import "blueprint-css/dist/blueprint.min.css";
import Carousel from "./components/Carousel";
import {Link, Element, Events, animateScroll} from 'react-scroll';
import Image from "./components/Image";
import Video from "./components/Video";
import ReactMarkdown from 'react-markdown';



const layout = require("./layout.json");

function App() {
    let [currentScrollIndex, setCurrentScrollIndex] = useState(0);

    const tableOfContentParser=toc=>{
     let tocArray=toc.split(" ");
     return tocArray.map(word=>{
         if(word.startsWith("#")){
             let wordParsed =word.split("-").join(" ");
             return <i>{wordParsed} </i>;
         }
         if(word==="\n"){
             return <br/>;
         }
         return word+" ";
     });
    };

    const getContentItemElement = ({contentType, content, location="internal"}, align) => {
        switch (contentType) {
            case "text":
                return <div className={"text"}><ReactMarkdown source={content} /></div>;
            case "toc":
                return <div className={"text centered"}>{tableOfContentParser(content)}</div>;
            case "carousel":
                return <Carousel content={content} align={align}/>;
            case "image":
                return <Image src={content}></Image>;
            case "video":
                return <Video big={true} location={location} src={content}></Video>;
        }
    };

    const renderLayout = () => {
        return layout.sections.map((section, index) => {
            if (section.length === 2) {
                return <div name={`section-${index}`} bp={"grid"} className={"section"}>
                    <div className={"center"} bp={"6@md 12@sm"}>{getContentItemElement(section[0], "left")}</div>
                    <div className={"center"} bp={"6@md 12@sm"}>{getContentItemElement(section[1], "right")}</div>
                    <Link className="hidden"
                          onSetActive={section => setCurrentScrollIndex(parseInt(section.split("-")[1]))}
                          to={`section-${index}`} spy={true} hashSpy={true}/>
                </div>;
            } else {
                return <div name={`section-${index}`} bp={"grid"} className={"section"}>
                    <div className={"center"} bp={"12"}>{getContentItemElement(section[0], "center")}</div>
                    <Link className="hidden"
                          onSetActive={section => setCurrentScrollIndex(parseInt(section.split("-")[1]))}
                          to={`section-${index}`} spy={true} hashSpy={true}/>
                </div>;
            }
        });
    };

    return (
        <div className="App">
            <div className={"logo"}> <Link  to={`section-0`}
                                           spy={true} smooth={true}
                                           duration={800} onClick={() => setCurrentScrollIndex(0)}>
                THE ACCURATE INACCURATE
            </Link></div>

            {renderLayout()}
            <div className={"navigation"}>
                {currentScrollIndex === 0 ? <div></div> :
                    <Link activeClass="active" class={"navigation__button"} to={`section-${currentScrollIndex - 1}`}
                          spy={true} smooth={true}
                          duration={800} onClick={() => setCurrentScrollIndex(currentScrollIndex - 1)}>
                        Previous
                    </Link>}
                {currentScrollIndex === layout.sections.length - 1 ? <div></div> :
                    <Link activeClass="active" class={"navigation__button"} to={`section-${currentScrollIndex + 1}`}
                          spy={true} smooth={true}
                          duration={800} onClick={() => setCurrentScrollIndex(currentScrollIndex + 1)}>
                        Next
                    </Link>}
            </div>
        </div>
    );
}

export default App;
