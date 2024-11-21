import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

// Define the Tavily Search tool
const searchTool = new TavilySearchResults({
    maxResults: 5,
    apiKey: import.meta.env.VITE_TAVILY_API_KEY
});

// Define Agents
const businessModelAgent = new Agent({
    name: 'Business Model Analyst',
    role: 'Analyze Business Model and Scalability',
    goal: 'Extract and analyze information about the company’s revenue sources and scalability.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const fundingAgent = new Agent({
    name: 'Funding Specialist',
    role: 'Research Funding and Growth',
    goal: 'Gather data on funding rounds, investors, and key growth metrics.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const operationsAgent = new Agent({
    name: 'Operations Analyst',
    role: 'Examine Operational Insights',
    goal: 'Research the company’s infrastructure and operational efficiencies.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const exitStrategyAgent = new Agent({
    name: 'Exit Strategy Advisor',
    role: 'Investigate Exit Strategies',
    goal: 'Analyze previous exits and planning strategies.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const marketPositionAgent = new Agent({
    name: 'Market Analyst',
    role: 'Assess Market Position',
    goal: 'Determine market segmentation and brand strength.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const customerAcquisitionAgent = new Agent({
    name: 'Acquisition Strategist',
    role: 'Study Customer Acquisition',
    goal: 'Identify and analyze effective customer acquisition channels and strategies.',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

const reportCompilerAgent = new Agent({
    name: 'Report Compiler',
    role: 'Compile Comprehensive Report',
    goal: 'Synthesize information from all agents into a cohesive long report.',
    tools: [],  // This agent might not need search tools but rather document processing capabilities
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Define tasks and assign to agents
const businessModelTask = new Task({
    description: 'Search for information about the business model and scalability of {companyName}.',
    expectedOutput: 'Detailed report on revenue sources and scalability.',
    agent: businessModelAgent
});

const fundingTask = new Task({
    description: 'Search for detailed data on the funding history and growth metrics of {companyName}.',
    expectedOutput: 'Comprehensive report on funding rounds, amounts raised, and investors.',
    agent: fundingAgent
});

const operationsTask = new Task({
    description: 'Research operational setup and efficiency strategies of {companyName}.',
    expectedOutput: 'Analysis on infrastructure and operational efficiencies.',
    agent: operationsAgent
});

const exitStrategyTask = new Task({
    description: 'Investigate {companyName}’s previous exits and strategies for potential future exits.',
    expectedOutput: 'Report on past IPOs, acquisitions, or mergers and their strategic rationales.',
    agent: exitStrategyAgent
});

const marketPositionTask = new Task({
    description: 'Determine the market segmentation and assess the strength of {companyName}’s brand.',
    expectedOutput: 'Insights on market position and brand visibility.',
    agent: marketPositionAgent
});

const customerAcquisitionTask = new Task({
    description: 'Analyze the channels and strategies used for customer acquisition by {companyName}.',
    expectedOutput: 'Details on successful customer acquisition methods.',
    agent: customerAcquisitionAgent
});

const compilationTask = new Task({
    description: 'Compile all gathered data into a comprehensive report detailing all aspects of {companyName}.',
    expectedOutput: 'A complete, long-form report combining all research findings into a single document.',
    agent: reportCompilerAgent
});

// Define the team
const team = new Team({
    name: 'Company Research Team',
    agents: [
        businessModelAgent,
        fundingAgent,
        operationsAgent,
        exitStrategyAgent,
        marketPositionAgent,
        customerAcquisitionAgent,
        reportCompilerAgent
    ],
    tasks: [
        businessModelTask,
        fundingTask,
        operationsTask,
        exitStrategyTask,
        marketPositionTask,
        customerAcquisitionTask,
        compilationTask
    ],
    inputs: { companyName: 'Vercel' },  // Replace with the actual company name to research
    env: {
        OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
        TAVILY_API_KEY: import.meta.env.VITE_TAVILY_API_KEY
    }
});

export default team;

