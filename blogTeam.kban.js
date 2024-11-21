import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { ChatOpenAI } from '@langchain/openai';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY;

if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Please check your .env file.');
}

if (!TAVILY_API_KEY) {
    throw new Error('Tavily API key is missing. Please check your .env file.');
}

// Define the search tool used by the Research Agent
const searchTool = new TavilySearchResults({
    maxResults: 5,
    apiKey: TAVILY_API_KEY
});

// Define the Research Agent
const researchAgent = new Agent({
    name: 'Ava',
    role: 'News Researcher',
    goal: 'Find and summarize the latest news on a given topic',
    background: 'Experienced in data analysis and information gathering',
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    },
    tools: [searchTool]
});
  
// Define the Writer Agent
const writerAgent = new Agent({
    name: 'Kai',
    role: 'Content Creator',
    goal: 'Create engaging blog posts based on provided information',
    background: 'Skilled in writing and content creation',
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    },
    tools: []
});

// Define Tasks
const researchTask = new Task({
    name: 'Latest news research',
    description: 'Research the latest news on the topic: {topic}',
    expectedOutput: 'A summary of the latest news and key points on the given topic',
    agent: researchAgent,
    onError: (error) => {
        console.error('Research task error:', error);
        throw new Error('Failed to complete research');
    }
});
  
const writingTask = new Task({
    name: 'Blog post writing',
    description: 'Write a blog post about {topic} based on the provided research',
    expectedOutput: 'An engaging blog post summarizing the latest news on the topic in Markdown format',
    agent: writerAgent,
    onError: (error) => {
        console.error('Writing task error:', error);
        throw new Error('Failed to write blog post');
    }
});

// Create the Team
const blogTeam = new Team({
    name: 'AI News Blogging Team',
    agents: [researchAgent, writerAgent],
    tasks: [researchTask, writingTask],
    inputs: {
        topic: ''  // This enables the input field
    },
    env: {
        OPENAI_API_KEY: OPENAI_API_KEY,
        TAVILY_API_KEY: TAVILY_API_KEY
    },
    onError: (error) => {
        console.error('Team execution error:', error);
        throw new Error('Team execution failed');
    }
});
  
export default blogTeam;