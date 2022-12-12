import  React , { useState } from 'react'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function Navbar() {
const [visibleLeft, setVisibleLeft] = useState(false);
  return (
    <div>
        <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
            <ul>
                <li className="Links">
                    <Link className="nav-link active" to={'/'}>Home</Link>
                </li>
                <li className="Links">
                    <Link className="nav-link" to={'/all'}>All Pokemon</Link>
                  
                </li>
                <li className="Links">
                    <Link className="nav-link" to={'/new'}>New Pokemon</Link>
                </li>
            </ul>
        </Sidebar>
        <Button icon="pi pi-bars" className="p-button-rounded p-button-warning m-2" onClick={(e) => setVisibleLeft(true)}/>
    </div>
  )
}



