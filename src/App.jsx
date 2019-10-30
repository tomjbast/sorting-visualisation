import React from 'react';
import Select from 'react-select'

import Bar from './Bar'
import sortingFunctions from './sortingFunctions'
import './styles/App.css';

const dataPoints = [
  {value: 5, label: "5"},
  {value: 10, label: "10"},
  {value: 25, label: "25"},
  {value: 50, label: "50"},
  {value: 100, label: "100"},
  {value: 250, label: "250"},
]

const sortMethod = [
  {value:sortingFunctions.bubbleSort, label: "Bubble Sort"},
  {value:sortingFunctions.selectSort, label: "Select Sort"}
]

class App extends React.Component {

  constructor(p){
    super(p)

    this.state = {
      dataToSort: [],
      dataPoints: 0,
      sortFunction: undefined,
      sortName: '',
      ascending: true
    }

    this.handleDataSelect = this.handleDataSelect.bind(this)
    this.handleSortSelect = this.handleSortSelect.bind(this)

  }

  handleSortSelect(e){

    const initialTrans = e.value.name.replace( /([A-Z])/g, " $1" );
    const sortName = initialTrans.charAt(0).toUpperCase() + initialTrans.slice(1);

    this.setState({
      sortFunction: e.value,
      sortName
    })
  }

  handleDataSelect(e){

    const dataToSort = []

    for (let i=0; i<e.value+1; i++ ){
      const randomNumber = Math.round(Math.random()*500)
      dataToSort.push(randomNumber)
    }

    this.setState({
      dataToSort,
      dataPoints:e.value
    })
  }

  render (){
    return (
      <div className="app">
        <div className="header">
          <div className="header-left">
          </div>
          <div className="button-wrapper">
            <div className="sort-wrapper">
              <div className="select-wrapper" style={{width:'100%'}}>
                <Select
                  placeholder ="Sort Type"
                  value ={
                   this.state.sortName ? {label:this.state.sortName} : null
                  }
                  onChange = {this.handleSortSelect}
                  options ={sortMethod}
                />
              </div>
            </div>
            <div className="data-points-wrapper">
              <div className="select-wrapper" style={{width:'100%'}}>
                <Select
                  placeholder ="Data Points"
                  value ={
                    this.state.dataPoints ? {label:this.state.dataPoints} : null
                  }
                  onChange = {this.handleDataSelect}
                  options ={dataPoints}
                />
              </div>
            </div>
            <div className="start-wrapper">
              <button>Start Sort</button>
            </div>
          </div>
          <div className="header-right">
          </div>
        </div>
        <div className="body">
          <div className="body-left">
          </div>
          <div className="graph-wrapper">
            {
              this.state.dataToSort.map(number => <Bar height={number}/>)
            }
          </div>
          <div className="body-right">
          </div>
        </div>
      </div>
    );
  }

}

export default App;
