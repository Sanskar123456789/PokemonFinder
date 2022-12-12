import React, {  useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import  axios  from 'axios';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button'; 
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addPokes } from '../features/pokemon';


let formData = new FormData();

export default function NewPoke() {
  const [name, setName] = useState('');
  const [CP, setCp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense_type, setDefenseType] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const submit= () => {
    let valid = true;
    if(name ===''){
      alert("Please enter a name");
      valid = false;
    }
    else if(CP===''){
      alert("Please enter a CP");
      valid = false;
    }
    else if(attack===''){
      alert("Please enter a Attack");
      valid = false;
    }
    else if(defense_type===''){
      alert("Please enter a Defense type");
      valid = false;
    }

    else if(!formData.get('image')){
      alert("Please submit a image");
      valid = false;
    }

    if(valid){
      formData.append('name', name)
      formData.append('CP', CP)
      formData.append('defense_type', defense_type)
      formData.append('attack', attack)
      
      axios.post("http://localhost:3000/api/pokemon/new", formData, {}).then(response => {
          dispatch(addPokes(response.data));
          
          formData = new FormData();
          navigate("/");
      })
    }
  }

  const upload = (event) => {
    formData.append('image', event.files[0]);
  }

  return (
    <div>
      <Card title="New Pokemon" style={{ width: '40rem', marginBottom: '2em', marginLeft:'4em', marginTop:'2em' }}>
        
          <span className="p-float-label m-2">
              <InputText id="username" value={name} onChange={(e) => {setName(e.target.value)}} />
              <label htmlFor="username">Name</label>
          </span>
          <span className="p-float-label m-2">
              <InputText id="username" value={CP} onChange={(e) => setCp(e.target.value)} />
              <label htmlFor="username">CP</label>
          </span>
          <span className="p-float-label m-2">
              <InputText id="username" value={defense_type} onChange={(e) => setDefenseType(e.target.value)} />
              <label htmlFor="username">DefenseType</label>
          </span>
          <span className="p-float-label m-2">
              <InputText id="username" value={attack} onChange={(e) => setAttack(e.target.value)} />
              <label htmlFor="username">Attack</label>
          </span>
          
          <FileUpload className="m-2" mode="basic" accept="image/*" maxFileSize={1000000} onSelect={(e)=>{upload(e)}} />

          <Button  className="m-2" label="Submit" aria-label="Submit" onClick={submit} />

      </Card>
    </div>
  )
}



