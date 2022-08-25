import React from 'react'
import { useContext,useEffect,useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNotes from './AddNotes';
import NotesItem from './NotesItem';
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
const {notes, getNotes,editNotes} = context;
useEffect(() => {
  if(localStorage.getItem('token'))
  {
    getNotes()
  }
  else
  {
    navigate('/login');
  }
  
}, [])
const [note, setnote] = useState({id:"",title:"",description:"", tag:""})
const ref = useRef(null);
const refClose = useRef(null);
const updateNote = (currentNote)=>{
ref.current.click();
setnote({id:currentNote._id ,title:currentNote.title, description: currentNote.description, tag: currentNote.tag})
}



const onChange =(e)=>{
  setnote({...note,[e.target.name]: e.target.value})
}

const handleClick =(e)=>{
  console.log("Updating the Note");
  
  editNotes(note.id,note.title,note.description, note.tag);
  refClose.current.click();
  props.showAlert("Updated Succesfully", 'success');

}
  return (
    <>
   

    <AddNotes showAlert = {props.showAlert}/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Your Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" onChange={onChange} id="title" value={note.title} name="title" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description"  className="form-label">Description</label>
    <input type="text" className="form-control" onChange={onChange} id="description" value={note.description} name="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag"  className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange} id="tag" value={note.tag} name="tag"/>
  </div>
 
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Update</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
    <h2>
      Your Notes
    </h2>
    <div className="container">
    {notes.length===0 && 'No Notes to Display'}
    </div>
    {notes.map((note)=>{
     return <NotesItem showAlert={props.showAlert} updateNote={updateNote} key={note._id} note= {note}/>
    })}
    
    </div>
    </>
  )
}

export default Notes
