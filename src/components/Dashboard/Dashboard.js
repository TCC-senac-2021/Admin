import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import './Dashboard.css';

/* import logo from './logo.svg';
import './App.css';
 */
function App() {
  const [options/* , setOptions */] = useState({
    title: 'Acertos perguntas',
    colors: ['#252d4a', '#555e7d', '#999ee1', '#7075b8'],
    
  });
  const [optionsBar/* , setOptionsBar */] = useState({
    title: 'E-mails Enviados',
    colors: ['#252d4a', '#7075b8', '#999ee1', '#555e7d'],

  });

  const [data/* , setData */] = useState([
    ['Pergunta', 'Quantidade de Acertos'],
    ['Pergunta 1', 100],
    ['Pergunta 2', 80],
    ['Pergunta 3', 50],
    ['Pergunta 4', 50],
  ]);
  const [dataBar/* , setDataBar */] = useState([
    ['E-mails', '50', '10'],
    ['Sucesso, Erro', 50, 10],

  ])
  return (
    <div className="App">
      <header className="App-header">
        <div style={{display: "flex"}}>
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            data={data}
            options={options}
          />
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            data={dataBar}
            options={optionsBar}
          />
        
        </div>
      </header>
    </div>
  );
}

export default App;