import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
{
  launchesPast(limit: 10) {
    mission_name
    launch_site {
      site_name_long
    }
  }
}
`;

function Posts() {
    const { loading, data } = useQuery(GET_DATA);

    if (loading) return "Loading...";

    const { launchesPast } = data;

    return launchesPast.map((launch) => (
        <div>
            {launch.mission_name} - {launch.launch_site.site_name_long}
        </div>
    ));
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                <Posts />
            </header>
        </div>
    );
}

export default App;
