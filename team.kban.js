import { Agent, Task, Team } from 'kaibanjs';
import { ChatOpenAI } from '@langchain/openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your .env file.');
}

// Initialize the language model
const llm = new ChatOpenAI({
    openAIApiKey: OPENAI_API_KEY,
    modelName: 'gpt-4-turbo-preview',
    temperature: 0.7,
});

// Define agents with proper tools
const profileAnalyst = new Agent({
    name: 'Zoe', 
    role: 'Profile Analyst', 
    goal: 'Extract structured information from conversational user input.', 
    background: 'Data Processor',
    model: llm,
    llmConfig: {
        apiKey: OPENAI_API_KEY,
        model: 'gpt-4-turbo-preview'
    },
    tools: [{
        name: 'extractProfile',
        description: 'Extract structured profile information from text',
        func: async ({ input }) => {
            try {
                return { success: true, data: input };
            } catch (error) {
                console.error('Profile extraction error:', error);
                return { success: false, error: error.message };
            }
        }
    }]
});

const resumeWriter = new Agent({
    name: 'Alex Mercer', 
    role: 'Resume Writer', 
    goal: `Craft compelling, well-structured resumes that effectively showcase job seekers qualifications and achievements.`,
    background: `Extensive experience in recruiting, copywriting, and human resources, enabling effective resume design that stands out to employers.`,
    model: llm,
    llmConfig: {
        apiKey: OPENAI_API_KEY,
        model: 'gpt-4-turbo-preview'
    },
    tools: [{
        name: 'formatResume',
        description: 'Format the resume data into a professional layout',
        func: async ({ input }) => {
            try {
                return { success: true, data: input };
            } catch (error) {
                console.error('Resume formatting error:', error);
                return { success: false, error: error.message };
            }
        }
    }]
});

// Define tasks with proper error handling
const processingTask = new Task({ 
    name: 'Process Profile',  
    description: `Extract relevant details such as name, experience, skills, and job history from the user's 'aboutMe' input. aboutMe: {aboutMe}`,
    expectedOutput: 'Structured data ready to be used for a resume creation.', 
    agent: profileAnalyst,
    onError: (error) => {
        console.error('Processing task error:', error);
        throw new Error('Failed to process profile information');
    }
});

const resumeCreationTask = new Task({ 
    name: 'Create Resume',  
    description: `Utilize the structured data to create a detailed and attractive resume. 
    Enrich the resume content by inferring additional details from the provided information.
    Include sections such as a personal summary, detailed work experience, skills, and educational background.`,
    expectedOutput: `A professionally formatted resume in markdown format, ready for submission to potential employers.`, 
    agent: resumeWriter,
    onError: (error) => {
        console.error('Resume creation task error:', error);
        throw new Error('Failed to create resume');
    }
});

// Create a team with proper error handling
const team = new Team({
    name: 'Resume Creation Team',
    agents: [profileAnalyst, resumeWriter],
    tasks: [processingTask, resumeCreationTask],
    inputs: { 
        aboutMe: `My name is David Llaca. 
        JavaScript Developer for 5 years. 
        I worked for three years at Disney, 
        where I developed user interfaces for their primary landing pages
        using React, NextJS, and Redux. Before Disney, 
        I was a Junior Front-End Developer at American Airlines, 
        where I worked with Vue and Tailwind. 
        I earned a Bachelor of Science in Computer Science from FIU in 2018, 
        and I completed a JavaScript bootcamp that same year.`
    },
    config: {
        llm: {
            apiKey: OPENAI_API_KEY,
            model: 'gpt-4-turbo-preview'
        }
    },
    onError: (error) => {
        console.error('Team execution error:', error);
        throw new Error('Team execution failed');
    }
});

export default team;

/******************************************************************
 *                                                                  *
 *        Ready to supercharge your JavaScript AI Agents?         *
 *                                                                *
 * This is just a starting point, but if you're ready to flex:     *
 *                                                                *
 *   Build a custom UI and control your agents like a boss.     *
 *   Equip your agents with tools (APIs, databases—you name it).*
 *   Integrate different AI models (OpenAI, Anthropic, etc.).   *
 *   Create setups so advanced, even you'll be impressed.       *
 *                                                                *
 * JavaScript AI Agents are here to stay!                       *
 *                                                                *
 * Head to https://kaibanjs.com                                *
 * 
 * PS: It's way cooler than this basic example.                 *
 *                                                                *
 ******************************************************************/
