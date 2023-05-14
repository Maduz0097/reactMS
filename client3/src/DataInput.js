import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_NEWS_EVENT = gql`
    mutation CreateNewsEvent($title: String!) {
        createNewsEvent(title: $title) {
            title
        }
    }
`;

function DataInput() {
    const [createNewsEvent] = useMutation(CREATE_NEWS_EVENT);
    const [sendTime, setSendTime] = useState(0);
    const [title, setTitle] = useState("");


    const sendData =  async () => {
        try {
            await createNewsEvent({ variables: { title } });
            console.log(1,performance.now())
            setTitle('');
            let performanceTime = performance.now()
            setSendTime(performanceTime)

        } catch (error) {
            console.error('Error creating news event:', error);
        }

    };

    return (
        <>
            <div className={"data-input"}>
                <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <button onClick={sendData}>Send Data</button>
            <p>Data Send Time : {sendTime}</p>
        </>
    );
}

export default DataInput;
