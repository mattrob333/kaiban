import React, { useState, useEffect } from 'react';
import teams from "../teams.js";
import KaibanBoard from 'kaiban-board';
import 'kaiban-board/dist/index.css';

function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize teams
        try {
            // Log environment status
            console.log('Environment status:', {
                OPENAI_API_KEY: !!import.meta.env.VITE_OPENAI_API_KEY,
                NODE_ENV: import.meta.env.MODE
            });

            // Log teams configuration
            console.log('Teams configuration:', {
                teamsLength: teams.length,
                teamsData: teams.map(t => ({
                    name: t.name,
                    agentsCount: t.agents?.length,
                    tasksCount: t.tasks?.length,
                    hasConfig: !!t.config?.llm?.apiKey
                }))
            });

            setIsLoading(false);
        } catch (err) {
            console.error('Initialization error:', err);
            setError(err.message || 'Failed to initialize the application');
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                fontSize: '18px',
                backgroundColor: '#fff'
            }}>
                Loading Kaiban Board...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                padding: '20px', 
                color: 'red', 
                textAlign: 'center',
                fontSize: '18px',
                backgroundColor: '#fff'
            }}>
                Error: {error}
            </div>
        );
    }

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw',
            overflow: 'hidden',
            backgroundColor: '#fff'
        }}>
            <KaibanBoard 
                teams={teams} 
                onError={(error) => {
                    console.error('KaibanBoard error:', error);
                    setError(error.message || 'An error occurred in the Kaiban Board');
                }}
                debug={true}
            />
        </div>
    );
}

export default App;
