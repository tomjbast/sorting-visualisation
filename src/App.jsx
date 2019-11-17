import React from 'react'
import Select from 'react-select'
import getUid from 'get-uid'
import {isMobile} from 'react-device-detect'

import Bar from './Bar'
import sortingFunctions from './sortingFunctions'
import './styles/App.css'

const dataPoints = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
  { value: 250, label: '250' },
]

if (isMobile) {
  dataPoints.pop()
}

const sortMethod = [
  { value: sortingFunctions.bubbleSort, label: 'Bubble Sort' },
  { value: sortingFunctions.selectSort, label: 'Select Sort' },
  { value: sortingFunctions.quickSort, label: 'Quick Sort' },
  { value: sortingFunctions.insertionSort, label: 'Insertion Sort' }
]

class App extends React.Component {

  constructor(p) {
    super(p)

    this.state = {
      sort:false,
      data: [],
      dataPoints: 0,
      sortFunction: undefined,
      sortName: '',
      ascending: true
    }

    this.handleDataSelect = this.handleDataSelect.bind(this)
    this.handleSortSelect = this.handleSortSelect.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handleStopSort = this.handleStopSort.bind(this)
    this.onIteration = this.onIteration.bind(this)

  }

  onIteration(array){

    if (!this.state.sort) return this.state.sort

    this.setState({
      data: array
    })

    return this.state.sort;
  }

  handleSortSelect(e) {
    // this is due to React-Select when clearing the field it sends null rather than e
    if (!e) {
      this.setState({
        sortFunction: undefined,
        sortName: ''
      })
      return
    }

    const initialTrans = e.value.name.replace(/([A-Z])/g, ' $1')
    const sortName = initialTrans.charAt(0).toUpperCase() + initialTrans.slice(1)

    this.setState({
      sortFunction: e.value,
      sortName
    })
  }

  handleDataSelect(e) {

    // this is due to React-Select when clearing the field it sends null rather than e
    if (!e) {
      this.setState({
        data: [],
        dataPoints: 0
      })
      return
    }

    this.setState({
      sort: false
    }, () => {
      const data = []
      for (let i = 0; i < e.value; i++) {
        const randomNumber = Math.round(Math.random() * 500)
        data.push(randomNumber)
      }

      this.setState({
        data,
        dataPoints: e.value
      })

    })

  }

  handleSort(){
    this.setState({
      sort: true
    }, () => {
      if (this.state.sortFunction && this.state.data && this.state.dataPoints){
        this.state.sortFunction(this.state.data, this.onIteration)
      } else {
        alert("Please enter a sort method and number of data points")
      }
    })
  }

  handleStopSort(){
    this.setState({
      sort: false
    })
  }

  render() {
    function isMobileDevice() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
    console.log(isMobileDevice())
    return (
      <div className="app">
        <div className="header">
          <div className="header-left">
          </div>
          <div className="button-wrapper">
            <div className="data-inputs">
              <div className="sort-wrapper">
                <div className="select-wrapper" style={{ width: '100%' }}>
                  <Select
                    placeholder="Sort Type"
                    inputProps={{readOnly:true}}
                    isClearable={true}
                    value={
                      this.state.sortName ? { label: this.state.sortName } : null
                    }
                    onChange={this.handleSortSelect}
                    options={sortMethod}
                  />
                </div>
              </div>
              <div className="data-points-wrapper">
                <div className="select-wrapper" style={{ width: '100%' }}>
                  <Select
                    placeholder="Data Points"
                    inputProps={{readOnly:true}}
                    isClearable={true}
                    value={
                      this.state.dataPoints ? { label: this.state.dataPoints } : null
                    }
                    onChange={this.handleDataSelect}
                    options={dataPoints}
                  />
                </div>
              </div>
            </div>
            <div className="user-select">
              <div className="start-wrapper">
                <button onClick={this.handleSort}>Start Sort</button>
              </div>
              <div className="stop-wrapper">
                <button onClick={this.handleStopSort}>Stop Sort</button>
              </div>
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
              this.state.data.map(number => <Bar height={number} key={getUid()}/>)
            }
          </div>
          <div className="body-right">
          </div>
        </div>
      </div>
    )
  }

}

export default App
