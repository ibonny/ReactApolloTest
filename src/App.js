import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql } from '@apollo/client';

class App extends React.Component {
    client = "";

    constructor(props) {
        super(props)

        this.state = {
            client: {},
            result: {}
        };

        client = new ApolloClient({
            uri: 'https://api.spacex.land/graphql/',
            cache: new InMemoryCache()
        });
    }

    componentDidMount() {
        let { loading, error, data } = useQuery(gql`
            {
                launchesPast(limit: 10) {
                    launch_date_unix
                    details
                }
            }
        `);

        console.log(data);

        this.state.client.query({
            query: gql`
            {
                launchesPast(limit: 10) {
                    launch_date_unix
                    details
                }
            }
            `
        })
            .then(result => {
                console.log(typeof result.data.launchesPast);

                this.setState({ result: result.data.launchesPast })
            });
    }

    render() {
        let launches = (<></>);

        console.log(typeof this.state.result);

        // for (let entry of this.state.result) {
        //     launches += (
        //         { entry }
        //     )
        // }

        return (
            <ApolloProvider client={client}>
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

                        {launches}
                    </header>
                </div>
            </ApolloProvider>
        );
    }
}

export default App;
