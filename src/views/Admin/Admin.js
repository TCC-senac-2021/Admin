import React, { useState } from "react";
import CsvDownloader from 'react-csv-downloader';
import Loader from 'react-loader-spinner';
import { VscCloudDownload } from "react-icons/vsc";
import { Chart } from "react-google-charts";
import logo from '../../assets/logo.png';
import Api from  '../../service/api';
import './Admin.css';

function Admin() {

  const [campain, setCampain] = useState("");
  const [showElement, setShowElement] = useState(true);
  const [loader, setLoader ] = useState(true);
  const [dataEnter, setDataEnter] = useState([]);
  const [dataEmails, setDataEmails] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
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
    { path: "coupon",  name: "Cupom Ganho" }, 
    { path: "qtd",  name: "Quantidade de Acertos" }, 
  ];

  const columnsEmails = [
    { path: "emailsucsses",   name: "Quantidade de e-mails enviados" }, 
    { path: "emailview",      name: "Quantidade de vezes que entraram no link do jogo" }, 
    
  ];

  const ids = dataUsers.map((ids) => (
    ids.id)
  )
  const names = dataUsers.map((names) => (
    names.nome)
  )
  const emails = dataUsers.map((emails) => (
    emails.email)
  )
  const hours = dataUsers.map((hours) => (
    hours.horarioemailenviado.split('T', 1).join(' ') )
  )

  const coupons = dataUsers.map((coupons) => (
    coupons.cupomGanho)
  )
  const qtds = dataUsers.map((qtds) => (
    qtds.acertos)
  )

  const dataCsv = [{
      first: 'ID',
      second: ids,
    },{
      first: 'Nome',
      second: names,
    },{
      first: 'E-mail',
      second: emails,
    },{
      first: 'Campanha',
      second: campain,
    },{
      first: 'Data',
      second: hours,
    },{
      first: 'Cupom Ganho',
      second: coupons,
    },{
      first: 'Acertos',
      second: qtds,
    },{
      first: 'Quantidade de e-mails Enviados',
      second: dataEmails.length,
  }]; 


  async function loading() {
      await Api.get(`/dadosEntrada/${campain}`,{
      }).then(response => {
        console.log(response.data)
        setDataEnter(response.data)
      })
      await Api.get(`/dadosUsuarios/${campain}`,{
      }).then(response => {
        console.log(response.data)
        setDataUsers(response.data)
      })
      await Api.get(`/dadosEnvioEmail/${campain}`,{
      }).then(response => {
        console.log(response.data)
        setDataEmails(response.data)
      })
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
    setLoader(false); 
  }
  
  
  function validateForm() {
    return campain === 'ShopBlackFriday2021';
  }

  function handleSubmit(event) {
    event.preventDefault();
    setShowElement(false);
    loading();
  }

  function refreshPage() {
    window.location.reload(false);
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
        { loader ? (  <Loader type="Circles" height={150} width={150}/>
			     ) : ( <>   
          <button className="logout" onClick={refreshPage}>Sair</button>
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
              
            <table className='customers'>
              <tbody title="table-users">
                <tr>
                  {columns.map(({ path, name }) => (
                    <th key={path}>{name}</th>
                  ))}
                </tr>
                { dataUsers.map((data, index) => (    
                  data.id !== 25 &&
                      <tr key={index} >
                          <td>
                          {data.nome}
                          </td>
                          <td >
                          {data.email}
                          </td>
                          <td >
                          {campain}
                          </td>
                          <td >
                            { data.horarioemailenviado.split('T', 1).join(' ') }
                          </td>
                          <td >
                          {data.cupomGanho ? data.cupomGanho.toUpperCase() : 'Ainda Não jogou'}
                          </td>
                          <td >
                          {data.acertos}
                          </td>
                      </tr>
                  ))
                } 
              </tbody>
            </table>
          </div>
        <CsvDownloader className="download" datas={dataCsv} filename="converta_canpain" extension=".csv" separator=";"> Download.csv <VscCloudDownload /></CsvDownloader>
          </> )}
      </> )}
    </div>
  );
}

export default Admin;

