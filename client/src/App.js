import React, {Suspense, useEffect} from 'react';
import './App.css';
import NewsEventList from './NewsEventList';
import NewsEventForm from './NewsEventForm';
import ErrorBoundary from "./ErrorBoundry";
const RemoteList = React.lazy(() => import("Remote/NewsEvent"));

function App() {
    useEffect(()=>{
        const webSocket = new WebSocket('ws://localhost:4002/graphql');

        webSocket.onmessage = function (e) {
            console.log(e);
        };

        webSocket.onopen = function () {
            console.log('WebSocket connection opened');
            webSocket.send('test');
        };

        webSocket.onclose = function () {
            console.log('WebSocket connection closed');
        };

        webSocket.onerror = function (error) {
            console.error('WebSocket error:', error);
        };

    },[])
    return (
        <div className="App">

            <NewsEventForm />
            {/*<NewsEventList />*/}
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <RemoteList/>
                </Suspense>

            </ErrorBoundary>

        </div>
    );
}

export default App;
