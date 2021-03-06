
// 首页 ==》 推荐课程
import React, { Component } from 'react';
import './HomeCourse.css';
import courseImg from './img/course.png';
import evaluation from './img/evaluation.png';

import Axios from '../../global/axios.js';
import { Link } from "react-router-dom";

export default class HomeCourse extends Component {
    constructor(){
        super()
        this.state = {
            courseType : ['父母课程','孩子课程'],
            typeActive : 0,
            data : {
                parent : [],
                child : []
            },
            imgPrefix : sessionStorage.getItem("imgPrefix")
        }
    }
    componentWillMount(){
        let parentArr = [];
        let childArr = [];
        Axios.recommend().then((res)=>{
            if(res.data.result instanceof Array){
                for (const iterator of res.data.result) {
                    if(iterator.pushType === "parent"){
                        parentArr = [...parentArr,iterator]
                    }else{
                        childArr = [...childArr,iterator]
                    }
                }
            }
            this.setState({
                data : {
                    parent : parentArr,
                    child : childArr
                }
            })
        })
    }
    courseType = (parame) => {
        this.setState({
            typeActive : parame
        })
    }
    render() {
        const { courseType, typeActive, data } = this.state;
        const parentDom = data.parent.map((item,index)=>(
            <li key={ index }>
                <Link to={{
                    pathname: '/parentClassList/course',
                    search: `id=${ item.pushId }`
                }}>
                    <div className="imgPlaceholder">
                        <img src={ this.state.imgPrefix + item.photoOsskey } alt=""/>
                    </div>
                    <h5>{ item.courseName }</h5>
                </Link>
            </li>
        ));
        const childDom = data.child.map((item,index)=>(
            <li key={ index }>
                <Link to={{
                    pathname: '/childClassList/course',
                    search: `id=${ item.pushId }`
                }}>
                    <div className="imgPlaceholder">
                        <img src={ this.state.imgPrefix + item.photoOsskey } alt=""/>
                    </div>
                    <h5>{ item.courseName }</h5>
                </Link>
            </li>
        ));
        return (
            <section className="home-course">
                <div className="main-public">
                    <h5 className="home-item-title">推荐课程</h5>
                    <ul className="home-course-type">
                        { courseType.map((item, index)=>(
                            <li
                                key={ index }
                                className={ typeActive===index?"active":null }
                                onClick={ ()=>{this.courseType(index)} }
                            >{ item }</li>
                        )) }
                    </ul>
                    <ul className="home-course-item followingHeight">
                        { typeActive===0?parentDom:childDom }
                    </ul>
                    <aside className="home-evaluation">
                        <img src={ evaluation } alt=""/>
                        <div>
                            <h2>不知道怎么选课?先测评一下吧</h2>
                            <a href="http://www.haoxuehome.com/cp/"><button>进入测评</button></a>
                        </div>
                    </aside>
                </div>
            </section>
        );
    }
}