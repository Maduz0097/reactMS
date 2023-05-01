import React, {useEffect} from 'react';
import { useSubscription, gql } from '@apollo/client';

const NEWS_EVENT_ADDED = gql`
    subscription NewsEventAdded {
        newsFeed {
            title
            description
        }
    }
`;

function NewsEvent() {
    const { data, loading, error } = useSubscription(NEWS_EVENT_ADDED);
    useEffect(() => {
        console.log(data?.newsFeed)

    },[data])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Remote Service</h2>
            <p>
                Title  :   {data?.newsFeed.title}
            </p>
            <p>
                Description  :   {data?.newsFeed.description}
            </p>
        </div>
    );
}

export default NewsEvent;
