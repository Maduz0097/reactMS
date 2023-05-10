import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_NEWS_EVENT = gql`
    mutation CreateNewsEvent($title: String!, $description: String!) {
        createNewsEvent(title: $title, description: $description) {
            title
            description
        }
    }
`;

function NewsEventForm() {
    const [createNewsEvent] = useMutation(CREATE_NEWS_EVENT);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createNewsEvent({ variables: { title, description } });
            console.log(1,performance.now())
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating news event:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button type="submit">Create News Event</button>
        </form>
    );
}

export default NewsEventForm;
