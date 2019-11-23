import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { log } from 'util';

class Note extends Component {
    constructor() {
        super();

        this.state = {
            notes: [],
            title: '',
            description: ''
        }

        this.handlerTitle = this.handlerTitle.bind(this);
        this.handlerDescription = this.handlerDescription.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);

    }

    componentDidMount() {
        axios.get('/api/note').then(response => {
            this.setState({
                notes: response.data
            });
        });
    }

    handlerTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handlerDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handlerSubmit(e) {
        e.preventDefault();

        axios.post('/api/note', {
            title: this.state.title,
            description: this.state.description,
        }).then(response => {
            let newNotes = [...this.state.notes];
            newNotes.push({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
            });

            this.setState({
                notes: newNotes,
                title: '',
                description: '',
            });
        });
    }

    handlerDelete(id) {
        axios.delete(`/api/note/${id}`).then(response => {

            let newNotes = this.state.notes.filter((value, key) => {
                return value.id !== id
            });

            this.setState({
                notes: newNotes
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">List of notes</div>

                            <div className="card-body">
                                <form onSubmit={this.handlerSubmit.bind(this)}>
                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Title</label>
                                        <div className="col-md-8">
                                            <input onChange={this.handlerTitle} id="title" type="title" className="form-control" value={this.state.title} name="title" autoFocus />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Description</label>
                                        <div className="col-md-8">
                                            <input onChange={this.handlerDescription} id="description" type="description" className="form-control" value={this.state.description} name="description" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-2 col-form-label text-md-right"></label>
                                        <div className="col-md-8">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>
                                <hr />
                                <h3>List:</h3>
                                <table className="table table-conden">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.notes.map(item => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td><button className="btn btn-danger" onClick={() => this.handlerDelete(item.id)}>Delete</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;

if (document.getElementById('note')) {
    ReactDOM.render(<Note />, document.getElementById('note'));
}
