import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: term,
      success: (() => {
        console.log('Successfuly sent POST request. Sending GET request.');
        this.fetch();
      }),
      error: ((err) => {
        console.log('Sent POST request but server returned an error.');
      })
    });
  }


  fetch () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: ((data) => {
        console.log('Successfuly sent GET request. Refreshing data.');
        this.updateState(data);
      }),
      error: ((err) => {
        console.log('Sent GET request but server returned an error.');
      })
    });
  }

  updateState (data) {
    this.setState({ repos: data });
  }

  componentDidMount () {
    this.fetch();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));