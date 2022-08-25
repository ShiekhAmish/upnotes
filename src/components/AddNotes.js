import React from 'react'
import { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNotes} = context;
    const [note, setnote] = useState({title:"",description:"", tag:""})
    const SubmitClick =(e)=>{
        e.preventDefault();
    addNotes(note.title,note.description,note.tag);
    setnote({title:"",description:"", tag:""});
    props.showAlert("Note Added Successfully", 'success')
    }
    const onChange =(e)=>{
        setnote({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className='container my-3'>
      <h2>
     Add A Note
    </h2>
   <div className=" my-3">
   <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" onChange={onChange} id="title" name="title" value={note.title} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description"  className="form-label">Description</label>
    <input type="text" className="form-control" onChange={onChange} id="description" value={note.description} name="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag"  className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange} id="tag" value={note.tag} name="tag"/>
  </div>
 
  <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary"  onClick={SubmitClick}>Add Note</button>
</form>
   </div>
    </div>
  )
}

export default AddNotes
