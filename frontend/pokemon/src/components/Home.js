import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import Search from './search';

const mystyle = {
    width:"150%",
  }


export default function Home() {
    
    const pokeData = useSelector((state)=> state.poke.data);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
   
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.image} style={mystyle} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }
  return (
    <div style={{width:"95%",justifyContent: "center",textAlign: "center",padding:"12px",margin:"auto"}}>
        <div className="card">
        <br/>
        <Search></Search>
            <hr/>
                <h5>Pokemons</h5>
                
                  <DataTable value={pokeData} paginator responsiveLayout="scroll"
                      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                      rows={10}
                      paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                      <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                      <Column field="CP" header="CP" style={{ width: '25%' }}></Column>
                      <Column field="attack" header="Attack" style={{ width: '25%' }}></Column>
                      <Column field="defense_type" header="Defense Type" style={{ width: '25%' }}></Column>
                      <Column header="Image" body={imageBodyTemplate}></Column>
                  </DataTable>
                
            </div>
    </div>
    
  )
}
