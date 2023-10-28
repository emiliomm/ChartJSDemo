import { Component } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Home } from './components/Home';
import './App.css';

Chart.register(CategoryScale);

export default class App extends Component {

  render() {
    return (<Home />);
  }
}