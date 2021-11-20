import React from 'react';
import './Table.css';

const Table = ({ id, columns, body }) => (
  <div className="flex">
    <table className='customers'>
      <tbody>
        <tr>
          {columns.map(({ path, name }) => (
            <th key={path}>{name}</th>
          ))}
        </tr>
        {body.map((rowData) => (
          <tr key={rowData[id]}>
            {columns.map(({ path }) => (
              <td  key={path}>
                {rowData[path]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
);


export default Table;