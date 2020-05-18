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
             let section = word.substring(word.indexOf('[')+1, word.indexOf(']'));
             let removedLinkWord=word.replace(/\[.*?\]/, "");
             let wordParsed =removedLinkWord.split("-").join(" ");
             return <Link className={"chapter-link"}
                          spy={true} smooth={true}
                          duration={800}
                          onClick={() => setCurrentScrollIndex(section)}
                          to={section}>{wordParsed} </Link>;
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
                return <div className={"text"}><ReactMarkdown source={content}/></div>;
            case "toc":
                return <div className={"text centered"}>{tableOfContentParser(content)}</div>;
            case "carousel":
                return <Carousel content={content} align={align}/>;
            case "image":
                return <Image src={`images/${content}`}></Image>;
            case "video":
                return <Video big={true} location={location} src={content}></Video>;
            case "intro":
                return <Link
                    className={"intro__button"} to={`section-1`}
                    spy={true} smooth={true}
                    duration={800} onClick={() => setCurrentScrollIndex( 1)}
                   >
                    <Video intro={true} big={true} location={location} src={content}></Video></Link>;

        }
    };

    const renderLayout = () => {
        return layout.sections.map((section, index) => {
            if(section.length===3){
                return <div name={`section-${index}`} bp={"grid"} className={"section"}>
                    <div className={"center"} bp={"4@md 12@sm"}>{getContentItemElement(section[0], "left")}</div>
                    <div className={"center centertext"} bp={"4@md 12@sm"}>{getContentItemElement(section[1], "center")}</div>
                    <div className={"center"} bp={"4@md 12@sm"}>{getContentItemElement(section[2], "right")}</div>
                    <Link className="hidden"
                          onSetActive={section => setCurrentScrollIndex(parseInt(section.split("-")[1]))}
                          to={`section-${index}`} spy={true} hashSpy={true}/>
                </div>;
            }
            if (section.length === 2) {
                return <div name={`section-${index}`} bp={"grid"} className={"section"}>
                    <Link className="hidden"
                          onSetActive={section => setCurrentScrollIndex(parseInt(section.split("-")[1]))}
                          to={`section-${index}`} spy={true} hashSpy={true}/>
                    <div className={"center padright"} bp={"6@md 12@sm"}>{getContentItemElement(section[0], "left")}</div>
                    <div className={"center padleft"} bp={"6@md 12@sm"}>{getContentItemElement(section[1], "right")}</div>

                </div>;
            } else {
                return <div name={`section-${index}`} bp={"grid"} className={"section"}>
                    <Link className="hidden"
                          onSetActive={section => setCurrentScrollIndex(parseInt(section.split("-")[1]))}
                          to={`section-${index}`} spy={true} hashSpy={true}/>
                    <div className={"center"} bp={"12"}>{getContentItemElement(section[0], "center")}</div>

                </div>;
            }
        });
    };

    return (
        <div className="App">
            <div className={"logo"} bp={"grid"}>
                <div bp={12}>
                <Link  to={`section-0`}
                                           spy={true} smooth={true}
                                           duration={800} onClick={() => setCurrentScrollIndex(0)}>
                THE ACCURATE INACCURATE
            </Link></div>
            </div>

            {renderLayout()}
            <div bp={'grid'}
                     className={"navigation"}>
                {currentScrollIndex === 0 ? <div bp={'6 text-left'}></div> :
                    <Link bp={'6 text-left'} activeClass="active" class={"navigation__button"} to={`section-${currentScrollIndex - 1}`}
                          spy={true} smooth={true}
                          duration={800} onClick={() => setCurrentScrollIndex(currentScrollIndex - 1)}>
                        Previous
                    </Link>}
                {currentScrollIndex === layout.sections.length - 1 ? <div bp={'6 text-left'}></div> :
                    <Link bp={'6 text-right'} activeClass="active" class={"navigation__button"} to={`section-${currentScrollIndex + 1}`}
                          spy={true} smooth={true}
                          duration={800} onClick={() => setCurrentScrollIndex(currentScrollIndex + 1)}>
                        Next
                    </Link>}
            </div>
        </div>
    );
}

export default App;
