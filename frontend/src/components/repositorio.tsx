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
    tags: [''],
    id: undefined
}

interface SearchProps {
    search: string,
    checked: boolean
}

const search: SearchProps = {
    search: '',
    checked: false
}

const baseURL: string = 'http://localhost:3000/tools'

const initialState = {
    rep: repositorio,
    list: [{ ...repositorio }],
    searchBar: search
}


class Repositorio extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseURL).then(resp => {
            this.setState({ list: resp.data })
            console.log(resp.data)
        })
    }

    save(e: React.SyntheticEvent) {
        e.preventDefault()
        const rep = this.state.rep
        rep.tags = rep.tags[0].split(',')
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
        if (target === "tags") {
            rep[`${target}`] = event.currentTarget.value.split(' ')
        } else rep[`${target}`] = event.currentTarget.value

        this.setState({ rep })
    }

    updateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const searchBar = { ...this.state.searchBar }
        searchBar.search = event.currentTarget.value
        this.setState({ searchBar })
    }

    updateCheck = () => {
        const searchBar = { ...this.state.searchBar }
        searchBar.checked = !this.state.searchBar.checked
        this.setState ({searchBar})        
    }

    renderSearch() {
        return <div className="search-bar">
            <div>
                <input type="text" name="search" value={this.state.searchBar.search}
                    onChange={e => this.updateSearch(e)} />
                <label >
                    <input type="checkbox" name="checked" checked={this.state.searchBar.checked}
                        onChange={this.updateCheck} />
                    search in tags only
                </label>

            </div>
            <button>Add Tool</button>
        </div>
    }

    renderCards() {
        return this.state.list.map((rep) => {
            return <div className="card">
                <a href={rep.link} className="title">{rep.title}</a>
                <p className="description">{rep.description}</p>
                <div className="tags">
                   { rep.tags.map(tag => {
                        return <span>#{tag} </span>
                    })}
                </div>
            </div>
        })
    }

    render() {
        return <div>
            {this.renderSearch()}
            {this.renderCards()}
        </div>
    }

}


export default Repositorio