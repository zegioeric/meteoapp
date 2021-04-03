import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableList = ({ cities, removeCity }) => {

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nome città</th>
          <th>Longitudine</th>
          <th>Latitudine</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        { 
          cities.map(city => (
            <tr key={city.id}>
              <td>{city.name}</td>
              <td>{city.lon}</td>
              <td>{city.lat}</td>
              <td>
                <Link className="btn-action" to={"/admin/city/edit/"+city.id}>✏️</Link>
                <span className="btn-action" onClick={() => {if(window.confirm('Vuoi rimuovere città?')){removeCity(city.id)}}}>🗑</span>  
              </td>
            </tr>
          )) 
        }
      </tbody>
    </Table>
    
  );
}

export default TableList;
