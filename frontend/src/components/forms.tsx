import React from "react";
import Repositorio from "./repositorio";

export default class Forms extends Repositorio {

    renderForms() {
        return (
            <form className="forms">

                <div id="status">
                    Repository Created
                    <span id="close-btn"> &times;</span>
                </div>

                <h1 className="form-title">
                    <i className="fa-solid fa fa-plus">&nbsp;</i>
                     Add New Tool
                </h1>

                <div className="form-group">
                    <label>Tool Name</label>
                    <input type="text" className="form-control"
                        name="title"
                        value={this.state.rep.title}
                        onChange={e => this.updateField(e)} />
                </div>

                <div className="form-group">
                    <label>Tool Link</label>
                    <input type="text" className="form-control"
                        name="link"
                        value={this.state.rep.link}
                        onChange={e => this.updateField(e)} />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control description"
                        name="description"
                        value={this.state.rep.description}
                        onChange={e => this.updateField(e)} />
                </div>

                <div className="form-group">
                    <label>Tags</label>
                    <input type="text" className="form-control"
                        name="tags"
                        value={this.state.rep.tags}
                        onChange={e => this.updateField(e)} />
                </div>

                <div className="button">
                    <button
                        onClick={e => this.save(e)}>Save</button>
                </div>
            </form>
        )
    }

    render() {
        return this.renderForms()
    }
}