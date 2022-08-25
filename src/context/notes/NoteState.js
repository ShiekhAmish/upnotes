import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState =(props)=>{
    const noteInitial=[]
      const host = "http://localhost:5000"
      const [notes, setnotes] = useState(noteInitial)

      const getNotes = async ()=>{

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            
          },
        

        });
        
        const json = await response.json()
        console.log(json)
        setnotes(json)
      }


      // Add a Notes
      const addNotes = async(title,description,tag)=>{

        //TODO for call API

          const responce = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },
          
            body: JSON.stringify({title,description,tag})
  
          });

       const note= await responce.json();
        setnotes(notes.concat(note))
    }

      // Delete a Notes
      const deleteNotes =async (id)=>{
        const responce = await fetch(`${host}/api/notes/deletenotes/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            
          },
        

        });
        
      const json = responce.json();
      
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
      }
      //Edit a Notes
      const editNotes =async (id,title,description,tag)=>{
        

          const responce = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
              
            },
          
            body: JSON.stringify({title,description,tag})
  
          });
          
        const json = responce.json();
      let newNotes= JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element._id === id)
          {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setnotes(newNotes);
      }
      return(
        <NoteContext.Provider value={{notes,addNotes,deleteNotes,editNotes,getNotes}}>
            
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;


