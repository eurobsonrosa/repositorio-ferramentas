import React, { Component } from "react";
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

interface RepositorioProps {
    title: string,
    link: string,
    description: string,
    tags: string[],
    id?: number
}

const repositorio: RepositorioProps = {
    title: '',
    link: '',
    description: '',
    tags: [],
    id: undefined
}

const baseURL: string = 'http://localhost:3000/tools'

const initialState = {
    rep: repositorio,
    list: [{ ...repositorio }]
}


class Repositorio extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseURL).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    save(e: React.SyntheticEvent) {
        e.preventDefault()
        const rep = this.state.rep
        rep.tags = this.state.rep.tags[0].split(" ")
        axios.post(baseURL, rep)
            .then(resp => {
                const list = this.updateList(resp.data)
                this.setState({ rep: initialState.rep, list })

            })

    }
    remove(rep: RepositorioProps) {
        axios.delete(`${baseURL}/${rep.id}`)
            .then(resp => {
                const list = this.updateList(rep, false)
                this.setState({ list })
            })
    }

    updateList(rep: RepositorioProps, add = true) {
        const list = this.state.list.filter(r => r.id !== rep.id)
        if (add) list.unshift(rep)
        return list
    }

    updateField = (event: React.ChangeEvent<HTMLInputElement>): void => {

        const rep = { ...this.state.rep } as any
        const target: keyof RepositorioProps = event.target.name as keyof RepositorioProps
        rep[`${target}`] = event.currentTarget.value

        this.setState({ rep })
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


    //     render() {
    //         return this.renderForms()
    //     }
}


export default Repositorio