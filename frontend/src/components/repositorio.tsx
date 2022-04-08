import { render } from "@testing-library/react";
import React, { Component } from "react";
import axios from 'axios'

interface RepositorioProps {
    title: string,
    link: string,
    description: string,
    tags: [],
    id: number
}

const repositorio: RepositorioProps = {
    title: '',
    link: '',
    description: '',
    tags: [],
    id: -1
}

const baseURL:string = 'http://localhost:3000/tools'

const initialState = {
    rep: repositorio,
    list: [{...repositorio}]
}


class Repositorio extends Component {

    state = {...initialState}

    componentWillMount() {
        axios(baseURL).then( resp => {
            this.setState({list: resp.data})
        })
    }

    renderCards() {
        return this.state.list.map(rep => {
            return <div className="card">
                <a href={rep.link} className="title">{rep.title}</a>
                <p className="description">{rep.description}</p>
                <div className="tags">
                    {rep.tags.map(tag => {
                        return <span>#{tag} </span>
                    })}
                </div>
            </div>
         })
    }

    render() {
        return this.renderCards()
    }
}



export default Repositorio