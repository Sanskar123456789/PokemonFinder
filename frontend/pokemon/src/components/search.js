import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { useDispatch, useSelector } from 'react-redux';
import { searchPokes } from '../features/pokemon';

export default function Search() {
  const [value3, setValue3] = useState('');
  const pokeData = useSelector((state) => state.poke.data);
  const copy = useSelector((state) => state.poke.copy);
  const dispatch= useDispatch();
  
  useEffect(()=>{
    if(value3===""){
        dispatch(searchPokes(copy));
    }else{
        // eslint-disable-next-line array-callback-return
        let a = pokeData.filter(item=>{
            if(item.name.includes(value3))
            return item;
        })
        dispatch(searchPokes(a));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value3])

  return (
    <div>
      <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Search" />
        </span>
    </div>
  )
}
