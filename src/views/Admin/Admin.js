import React, { useState } from "react";
import CsvDownloader from 'react-csv-downloader';
import { VscCloudDownload } from "react-icons/vsc";
import Dashboard from '../../components/Dashboard/Dashboard';
import Table from '../../components/Table/Table';
import logo from '../../assets/logo.png';
import './Admin.css';

function Admin() {

  const [campain, setCampain] = useState("");
  const [id, setId] = useState("");
  const [showElement, setShowElement] = useState(true);
/*   const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]); */
	
  function validateForm() {
    return id.length > 0 && campain.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowElement(false);
  }


const columns = [
  { path: "id",   name: "id usuário" }, 
  { path: "name",   name: "Nome Usuário" }, 
  { path: "email",   name: "E-mail" }, 
  { path: "campain", name: "Campanha" }, 
  { path: "hour", name: "Data" }, 
  { path: "qtd",  name: "Quantidade de Acertos" }, 
];

const body = [
  { id: 1, name: 'Kate',  email : 'teste@hotmail.com', campain: 'SenacReingresso', hour : '10/10/2020 05:35', qtd: '4' },
  { id: 2, name: 'Tom',   email : 'teste@hotmail.com', campain: 'SenacReingresso', hour : '10/10/2020 05:35', qtd: '3' },
  { id: 3, name: 'Ann',   email : 'teste@hotmail.com', campain: 'SenacReingresso', hour : '10/10/2020 05:35', qtd: '1' },
  { id: 4, name: 'Jack',  email : 'teste@hotmail.com', campain: 'SenacReingresso', hour : '10/10/2020 05:35', qtd: '2' }
];


const columnsEmails = [
  { path: "emailsucsses",   name: "Quantidade de e-mails enviados com sucesso" }, 
  { path: "emailerror",   name: "Quantidade de e-mails enviados com erro" }, 
  
];

const bodyEmails = [
  { id: 1, emailsucsses: '50',  emailerror: '10' },
];

const names = body.map((body) => (
  body.name)
)
const emails = body.map((body) => (
  body.email)
)
const campains = body.map((body) => (
  body.campain)
)
const hours = body.map((body) => (
  body.hour)
)
const qtds = body.map((body) => (
  body.qtd)
)

const dataCsv = [{
    first: 'Nome',
    second: names
  }, 
  {
    first: 'E-mail', 
    second: emails
  },
  {
    first: 'Campanha', 
    second: campains
  },
  {
    first: 'Data', 
    second: hours
  },
  {
    first: 'Quantidade de Acertos', 
    second: qtds
  },
];

return (
    <div className="content">
        <button className="fix"><img src={logo} alt="Logo" className="logo" /></button>
        { showElement ? (
            <form onSubmit={handleSubmit}>
                <label>Campanha</label>
                <input
                    autoFocus
                    type=""
                    value={campain}
                    onChange={(e) => setCampain(e.target.value)}
                />
            
                <label>Id usuário</label>
                <input
                    type="password"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button className="btn" type="submit" disabled={!validateForm()}>Login</button>
            </form>
        ) : ( <>
        <div className="content-type">
          <Dashboard/>
          <Table id="1" columns={columnsEmails} body={bodyEmails} />
          <Table id="2" columns={columns} body={body} />
        </div>
        <CsvDownloader className="download" datas={dataCsv} filename="converta_canpain" extension=".csv" separator=";"> Download.csv <VscCloudDownload /></CsvDownloader>
      </> )}
    </div>
  );
}

export default Admin;

