import React, { Component } from 'react';
import './styles/App.scss';
import {range,fill} from "lodash";
import CustomList    from "./components/CustomList/CustomList.js";
import CustomGallery from "./components/CustomGallery/CustomGallery.js";
import CustomBox     from "./components/CustomBox/CustomBox.js";

import withScrolling from "./hoc/withScrolling.js";
import withDragDrop  from "./hoc/withDragDrop.js";

import {imagesPath}  from "./helpers/assets_paths";
import {colorsData,codeData} from "./helpers/variables";

import logoPath from "./assets/isotipo.svg";

const createScrollingBlog = (func) => {
  return 
}
const ScrollingBLog = withScrolling(
      CustomList, ()=>{this.setState({listAlert: "Se ha activado función OnScroll!"})}
  );

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dragBoxColor : "#212121",
      dropBoxesColor: fill(Array(9),"#212121"),
      dragData: null,
      listAlert : null,
      galleryAlert: null,
      isLoaded: false,
    }

    //SCROLLING List HIGH ORDER COMPONENT
    this.ScrollingBLog = withScrolling(
      CustomList, ()=>{this.setState({listAlert: "¡ Se ha activado función OnScroll List!"})}
    );
    //SCROLLING GALLERY HIGH ORDER COMPONENT
    this.ScrollingGallery = withScrolling(
      CustomGallery, ()=>{this.setState({galleryAlert: "¡ Se ha activado función OnScroll Gallery!"})}
    );
    //DRAG BOX HIGH ORDER COMPONENT
    this.DragBox = withDragDrop(CustomBox, 
      (e)=>{this.handleDragStart(e)},   //On Drag Start Function
      (e)=>{},                          //On Drag  Function
      (e)=>{}                           //On Drag End Function
    );
    //DRAG AND DROP HIGH ORDER COMPONET
    this.DragDropBox = withDragDrop(CustomBox, 
      (e)=>{this.handleDragStart(e)},          //On Drag Start Function
      (e)=>{},                                 //On Drag  Function
      (e)=>{} ,                                //On Drag End Function
      (e)=>{} ,                                //On Drag End Function
      (e)=>{this.handleDrop(e)}                //On Drag End Function
    );
  }

  handleDragStart(e){
    e.dataTransfer.setData("text", 
      e.target.children[0].children[0].style.backgroundColor)
  }

  handleDrop(e){
    const index = parseInt(e.target.getAttribute("index"));
    if(!isNaN(index)){
      return this.setState(
        {
          dropBoxesColor: [
            ...this.state.dropBoxesColor.slice(0,index),
            e.dataTransfer.getData("text"),
            ...this.state.dropBoxesColor.slice(index + 1)
          ]
        }
      )
    }
  }

  render() {
    
    const {
      ScrollingBLog,
      ScrollingGallery,
      DragBox,
      DragDropBox
    } = this;

    return (
      <div className="app">
        <header className="app-header">
          <img src={logoPath}/> 
        </header>
        <div className="title-section">
         <span></span>
         <h1> High Order Component Test</h1> 
        </div>
        <section className="app-body">
          <h2> On Scrolling Components </h2>
          <div className="scrolling-section">
            <div className="scrolling-subsection">
              <span> {this.state.listAlert != null ? this.state.listAlert : ""} </span>
              <ScrollingBLog
                data ={codeData}
              />
            </div>
            <div className="scrolling-subsection">
              <span> {this.state.galleryAlert != null ? this.state.galleryAlert : ""} </span>
              <ScrollingGallery
                data ={imagesPath}
              />
            </div>
          </div>
        </section>
        <section className="app-body">
          <h2> On Drag/Drop Components </h2>
          <div className="dragdrop-section">
            <div className="drag-container">
              <DragBox 
                color={this.state.dragBoxColor}
              />
              <select name="colors" onChange={(e)=> {this.setState({dragBoxColor: e.target.value})}}>
                {colorsData.map((element,index)=> {
                  return(<option value={element.code}>{element.name}</option>)
                  })
                }    
              </select>
            </div>
            <div className="drop-container">
              {range(9).map((item) =>{
                return(
                  <DragDropBox
                    key={item} 
                    color={this.state.dropBoxesColor[item]}
                    index={item}
                  />
                )}
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
