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

function NewsEventList() {
    const { data, loading, error } = useSubscription(NEWS_EVENT_ADDED);
useEffect(() => {
    console.log(data?.newsFeed)

},[data])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <p>
            Title  :   {data?.newsFeed.title}
            </p>
            <p>
                Description  :   {data?.newsFeed.description}
            </p>
            {/*{data?.newsFeed?.map((newsEvent, index) => (*/}
            {/*    <div key={index}>*/}
            {/*        <h3>{newsEvent.title}</h3>*/}
            {/*        <p>{newsEvent.description}</p>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
}

export default NewsEventList;
