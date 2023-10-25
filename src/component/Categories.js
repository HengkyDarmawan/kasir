import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';import { API_URL } from "../utils/constants";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUtensils, faHamburger, faGlassMartini, faCookie } from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}) => {
    if(nama == "Makanan") return <FontAwesomeIcon icon={faHamburger} className="mr-2" width={2}/>
    if(nama == "Minuman") return <FontAwesomeIcon icon={faGlassMartini}/>
    if(nama == "Cemilan") return <FontAwesomeIcon icon={faCookie} className="mr-2"/>
    return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
}

export default class Categories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             categories:[],
        }
    }
    componentDidMount(){
        axios.get(API_URL+"categories")
            .then(res => {
            const categories = res.data;
            this.setState({ categories });
            })
            .catch(error => [
            console.log(error)
            ])
    }
    render() {
        const {categories} = this.state
        const { changeCategory, categoriYangDipilih } = this.props
        return (
            <Col mt="3">
                <ListGroup className='justify-content-center content-category my-2' horizontal>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.nama)} className={categoriYangDipilih === category.nama && "category-aktif"}>
                                <Icon nama={category.nama}/> {category.nama}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}
