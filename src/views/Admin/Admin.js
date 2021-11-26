import React, { useState } from "react";
import CsvDownloader from 'react-csv-downloader';
import { VscCloudDownload } from "react-icons/vsc";
import { Chart } from "react-google-charts";
import logo from '../../assets/logo.png';
import Api from  '../../service/api';
import './Admin.css';

function Admin() {

  const [campain, setCampain] = useState("");
  const [showElement, setShowElement] = useState(true);
  const [dataEnter, setDataEnter] = useState([]);
  const [dataEmails, setDataEmails] = useState([]);
  const [dataAwnserOne, setDataAwserOne ] = useState(0);
  const [dataAwnserTwo, setDataAwserTwo ] = useState(0);
  const [dataAwnserTree, setDataAwserTree ] = useState(0);
  const [dataAwnserFour, setDataAwserFour ] = useState(0);

  const [options] = useState({
    title: 'Acertos perguntas',
    colors: ['#252d4a', '#555e7d', '#999ee1', '#7075b8'],
    
  });

  const [optionsBar] = useState({
    title: 'E-mails',
    colors: ['#252d4a', '#7075b8', '#999ee1', '#555e7d'],

  });

  const columns = [
    { path: "name",   name: "Nome Usuário" }, 
    { path: "email",   name: "E-mail" }, 
    { path: "campain", name: "Campanha" }, 
    { path: "hour", name: "Data" }, 
    { path: "qtd",  name: "Quantidade de Acertos" }, 
  ];

  const columnsEmails = [
    { path: "emailsucsses",   name: "Quantidade de e-mails enviados" }, 
    { path: "emailview",      name: "Quantidade de e-mails vizualizados" }, 
    
  ];

  const names = dataEnter.map((names) => (
    names.nome)
  )

  const dataCsv = [{
      first: 'Nome',
      second: names
  }]; 

  function validateForm() {
    return campain === 'ShopBlackFriday2021';
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    setShowElement(false);
    loadEnter();
    loadAwnsers();
    loadEmail();
  }

  async function loadEnter(){
    await Api.get(`/dadosEntrada/${campain}`,{
    }).then(response => {
      setDataEnter(response.data)
    })
  }

  async function loadEmail(){
    await Api.get(`/dadosEnvioEmail/${campain}`,{
    }).then(response => {
      setDataEmails(response.data)
    })
  }

  async function loadAwnsers(){
    await Api.get(`/dadosNumeroAcertosPorPergunta/${campain}/1`,{
    }).then(response => {
      setDataAwserOne(response.data.acertos)
    })
    await Api.get(`/dadosNumeroAcertosPorPergunta/${campain}/2`,{
    }).then(response => {
      setDataAwserTwo(response.data.acertos)
    })
    await Api.get(`/dadosNumeroAcertosPorPergunta/${campain}/3`,{
    }).then(response => {
      setDataAwserTree(response.data.acertos)
    })
    await Api.get(`/dadosNumeroAcertosPorPergunta/${campain}/4`,{
    }).then(response => {
      setDataAwserFour(response.data.acertos)
    })
  }


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
                <button className="btn" type="submit" disabled={!validateForm()}>Login</button>
            </form>
        ) : ( <>
         {/*  charts */}    
          <div className="content-type">
            <div className="App">
              <header className="App-header">
                <div style={{display: "flex"}}>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    data={[
                      ['Pergunta', 'Quantidade de Acertos'],
                      ['Pergunta 1', dataAwnserOne],
                      ['Pergunta 2', dataAwnserTwo],
                      ['Pergunta 3', dataAwnserTree],
                      ['Pergunta 4', dataAwnserFour],
                    ]}
                    options={options}
                  />
                  <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    data={[
                      ['E-mails', 'Env.', 'Visu.'],
                      ['', dataEmails.length, dataEnter.length ],
                    ]}
                    options={optionsBar}
                  />
                </div>
              </header>
          </div>
          {/*  tbale e-mails */}          
          <table className='customers'>
              <tbody>
                <tr>
                  {columnsEmails.map(({ path, name }) => (
                    <th key={path}>{name}</th>
                  ))}
                </tr>
                <tr>
                  <td>
                  { dataEmails.length }
                  </td>
                  <td>
                  { dataEnter.length }
                  </td>
                </tr>
              </tbody>
            </table>
            {/*  tbale peoples */}    
            <table className='customers'>
              <tbody>
                <tr>
                  {columns.map(({ path, name }) => (
                    <th key={path}>{name}</th>
                  ))}
                </tr>
                { dataEnter.map((data, index) => (    
                    <>
                    <tr key={index} >
                       <td key={data}>
                          {data.nome}
                        </td>
                        <td key={data} >
                        {data.email}
                        </td>
                        <td key={data} >
                        0
                        </td>
                        <td key={data} >
                        0
                        </td>
                        <td key={data} >
                        0
                        </td>
                    </tr>
                    </>
                  
                  ))
                } 
              </tbody>
            </table>
            </div>
       
        <CsvDownloader className="download" datas={dataCsv} filename="converta_canpain" extension=".csv" separator=";"> Download.csv <VscCloudDownload /></CsvDownloader>
      </> )}
    </div>
  );
}

export default Admin;

