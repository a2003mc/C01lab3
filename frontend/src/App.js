import React, { Component } from 'react';
import axios from 'axios';
import "./App.css";

class App extends Component {
  state = {
    notes: [],
    newNote: {
      title: '',
      content: ''
    }
  };

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      this.setState({ notes: response.data });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      newNote: {
        ...this.state.newNote,
        [name]: value
      }
    });
  };

  handleAddNote = async () => {
    try {
      await axios.post('http://localhost:5000/add', this.state.newNote);
      this.fetchNotes();
      this.setState({ newNote: { title: '', content: '' } });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  handleUpdateNote = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/update/${id}`, this.state.newNote);
      this.fetchNotes();
      this.setState({ newNote: { title: '', content: '' } });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      this.fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  handleDeleteAllNotes = async () => {
    try {
      await axios.delete('http://localhost:5000/deleteAll');
      this.fetchNotes();
    } catch (error) {
      console.error('Error deleting all notes:', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Notes App</h1>
        <div>
          <h2>Add Note</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.newNote.title}
            onChange={this.handleInputChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={this.state.newNote.content}
            onChange={this.handleInputChange}
          ></textarea>
          <button onClick={this.handleAddNote}>Add</button>
        </div>
        <div>
          <h2>Notes</h2>
          <ul>
            {this.state.notes.map((note) => (
              <li key={note._id}>
                <strong>{note.title}:</strong> {note.content}
                <button onClick={() => this.handleUpdateNote(note._id)}>Update</button>
                <button onClick={() => this.handleDeleteNote(note._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Delete All Notes</h2>
          <button onClick={this.handleDeleteAllNotes}>Delete All</button>
        </div>
      </div>
    );
  }
}

export default App;
