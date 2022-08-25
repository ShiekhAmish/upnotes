import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NotesItem = (props) => {
    const {note,updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNotes} = context;
  return (
    <div className='col-md-3'>
       
      <div className="card my-3" >

  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-pen-to-square mx-1"onClick={()=>(updateNote(note))}></i>
    <i className="fa-solid fa-trash-can mx-1" onClick={()=>{deleteNotes(note._id); props.showAlert("Deleted Successfully", 'success');}}></i>
    </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>
    </div>
  )
}

export default NotesItem
