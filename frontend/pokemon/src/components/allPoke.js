import React from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { deletePokemons, deletePokes, getPokemons } from '../features/pokemon';

const mystyle = {
  display: 'flex', 
  justifyContent: 'space-evenly',
  flexWrap: "wrap",
}
function AllPoke() {
 
  const dispatch = useDispatch();
  const pokeData = useSelector((state)=> state.poke.data);
  

  const footer = (data)=>{
    return (
      <span>
          <Button label="Delete" icon="pi pi-trash" className="p-button-danger ml-2 m-2" onClick={
              ()=>{
              dispatch(deletePokemons(data._id))
              dispatch(deletePokes(data._id));
            }
          }/>
      </span>
  )};

  return (
    <div className="Pokecards" style={mystyle}>
      {
        pokeData.map(data=>{
          return  <Card 
                      title="Pokemon" 
                      className="m-2"
                      subTitle={data.name} 
                      style={{ width: '15em',height:"min-content" }} 
                      footer={footer(data)}
                      header={
                        <img alt="Card" src={data.image} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                      }>
                      <p className="m-0" style={{lineHeight: '1'}}>
                        CP:{data.CP}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        Attact:{data.attack}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        DefenseType :{data.defense_type}
                      </p>
                  </Card>
        })
      }
    </div>
  )
}

export default AllPoke