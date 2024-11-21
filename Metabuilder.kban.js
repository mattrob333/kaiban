import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

// Initialize search tool for research
const searchTool = new TavilySearchResults({
    maxResults: 5,
    apiKey: import.meta.env.VITE_TAVILY_API_KEY  // Keeping as per your instruction
});

// First Principles Analyst Agent
const firstPrinciplesAnalyst = new Agent({
    name: 'Aristotle',
    role: 'First Principles Analyst',
    goal: 'Deconstruct complex problems into their fundamental components and core challenges',
    background: 'Expert in philosophical analysis, systems thinking, and problem decomposition',
    tools: [searchTool], // Needs search tool for researching problem domains
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, a master of first principles thinking.
            Your goal is to break down complex problems into their most fundamental elements.
            For any given task, you should:
            1. Identify the core problem statement
            2. Strip away assumptions and conventional approaches
            3. Identify the fundamental truths and components
            4. Map out the logical dependencies between components
            Current task: ${task.description}
        `
    }
});

// Requirements Engineer Agent
const requirementsEngineer = new Agent({
    name: 'Ada',
    role: 'Requirements Engineering Specialist',
    goal: 'Transform first principles analysis into concrete technical requirements and success criteria',
    background: 'Expert in requirements engineering, specification design, and success metrics',
    tools: [], // Doesn't need search tool as it works from first principles analysis
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, an expert in translating abstract concepts into concrete requirements.
            Your goal is to take the first principles analysis and create:
            1. Specific technical requirements
            2. Clear success criteria
            3. Measurable outcomes
            4. Dependency mappings
            Current task: ${task.description}
        `
    }
});

// Team Architect Agent
const teamArchitect = new Agent({
    name: 'Leonardo',
    role: 'Team Architecture Designer',
    goal: 'Design optimal team structures and role definitions based on requirements',
    background: 'Expert in organizational design, team dynamics, and role optimization',
    tools: [searchTool], // Needs search tool for researching team patterns and structures
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, a master of team design and role optimization.
            Your goal is to:
            1. Define necessary team roles based on requirements
            2. Design role interactions and dependencies
            3. Specify required expertise for each role
            4. Create optimal team structure
            Current task: ${task.description}
        `
    }
});

// Persona Designer Agent
const personaDesigner = new Agent({
    name: 'Jung',
    role: 'AI Persona Designer',
    goal: 'Create specialized AI agent personas optimized for specific roles',
    background: 'Expert in personality psychology, AI behavior design, and role optimization',
    tools: [], // Doesn't need search tool as it works from team architecture
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, an expert in creating specialized AI personas.
            For each role, design personas with:
            1. Specialized knowledge domains
            2. Behavioral characteristics
            3. Communication patterns
            4. Problem-solving approaches
            Current task: ${task.description}
        `
    }
});

// Workflow Optimizer Agent
const workflowOptimizer = new Agent({
    name: 'Taylor',
    role: 'Workflow Optimization Specialist',
    goal: 'Design and optimize task sequences and team workflows',
    background: 'Expert in process optimization, workflow design, and efficiency engineering',
    tools: [], // Doesn't need search tool as it works from team architecture
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, a master of workflow optimization.
            Your goal is to:
            1. Design task sequences
            2. Optimize parallel processes
            3. Minimize dependencies
            4. Maximize efficiency
            Current task: ${task.description}
        `
    }
});

// Team Generator Agent
const teamGenerator = new Agent({
    name: 'Genesis',
    role: 'Team Generation Specialist',
    goal: 'Generate complete, executable team configurations from optimized designs',
    background: 'Expert in KaibanJS implementation, team configuration, and system integration',
    llmConfig: {  // Added llmConfig as per issue #2
        provider: 'openai',
        model: 'gpt-4o'  // Keeping as per your instruction
    },
    tools: [searchTool],
    promptTemplates: {
        SYSTEM_MESSAGE: ({ agent, task }) => `
            You are ${agent.name}, responsible for creating executable team configurations.
            Your goal is to:
            1. Transform designs into KaibanJS configurations
            2. Set up agent interactions
            3. Configure task flows
            4. Implement error handling
            Current task: ${task.description}
        `
    }
});

// Define Tasks
const analysisTask = new Task({
    description: (inputs) => `Analyze the following task using first principles thinking to identify core components and challenges:

Task Description: ${inputs.userTask}

Break this down into:
1. Core problem statement
2. Fundamental components
3. Key dependencies
4. Critical assumptions
5. Base requirements`,
    expectedOutput: 'Structured analysis of fundamental components and their relationships',
    agent: firstPrinciplesAnalyst
});

const requirementsTask = new Task({
    description: (inputs) => `Transform the following first principles analysis into specific requirements and success criteria:

First Principles Analysis: ${inputs.firstPrinciplesAnalysis}

Provide:
1. Detailed requirements specification
2. Success metrics
3. Measurable outcomes
4. Dependency mappings`,
    expectedOutput: 'Detailed requirements specification and success metrics',
    agent: requirementsEngineer
});

const teamDesignTask = new Task({
    description: (inputs) => `Design optimal team structure and roles based on the following requirements:

Requirements: ${inputs.requirements}

Your output should include:
1. Complete team architecture with role definitions
2. Role interactions and dependencies
3. Required expertise for each role
4. Optimal team structure`,
    expectedOutput: 'Complete team architecture with role definitions',
    agent: teamArchitect
});

const personaCreationTask = new Task({
    description: (inputs) => `Create specialized AI personas for each defined role based on the following team architecture:

Team Architecture: ${inputs.teamArchitecture}

For each role, design personas with:
1. Specialized knowledge domains
2. Behavioral characteristics
3. Communication patterns
4. Problem-solving approaches`,
    expectedOutput: 'Detailed persona specifications for each team role',
    agent: personaDesigner
});

const workflowDesignTask = new Task({
    description: (inputs) => `Optimize task sequences and team workflows based on the following team architecture:

Team Architecture: ${inputs.teamArchitecture}

Your goal is to:
1. Design task sequences
2. Optimize parallel processes
3. Minimize dependencies
4. Maximize efficiency`,
    expectedOutput: 'Optimized workflow specification with task dependencies',
    agent: workflowOptimizer
});

const teamGenerationTask = new Task({
    description: (inputs) => `Generate an executable team configuration from the optimized design based on the following inputs:

Personas: ${inputs.personas}
Workflow: ${inputs.workflow}

Your goal is to:
1. Transform designs into KaibanJS configurations
2. Set up agent interactions
3. Configure task flows
4. Implement error handling`,
    expectedOutput: 'Complete KaibanJS team configuration ready for deployment',
    agent: teamGenerator
});

// Create Meta Team
const metaTeam = new Team({
    name: 'Meta Team Architect System',
    inputs: {
        userTask: 'Describe your task or problem'  // You may replace this with actual user input or a specific task
    },
    agents: [
        firstPrinciplesAnalyst,
        requirementsEngineer,
        teamArchitect,
        personaDesigner,
        workflowOptimizer,
        teamGenerator
    ],
    tasks: [
        analysisTask,
        requirementsTask,
        teamDesignTask,
        personaCreationTask,
        workflowDesignTask,
        teamGenerationTask
    ],
    workflow: {
        sequence: [
            {
                task: analysisTask,  // Referencing task instances directly
                input: (inputs) => ({ userTask: inputs.userTask }),
                output: 'firstPrinciplesAnalysis'
            },
            {
                task: requirementsTask,
                input: (outputs) => ({ firstPrinciplesAnalysis: outputs.firstPrinciplesAnalysis }),
                output: 'requirements'
            },
            {
                task: teamDesignTask,
                input: (outputs) => ({ requirements: outputs.requirements }),
                output: 'teamArchitecture'
            },
            {
                parallel: [
                    {
                        task: personaCreationTask,
                        input: (outputs) => ({ teamArchitecture: outputs.teamArchitecture }),
                        output: 'personas'
                    },
                    {
                        task: workflowDesignTask,
                        input: (outputs) => ({ teamArchitecture: outputs.teamArchitecture }),
                        output: 'workflow'
                    }
                ]
            },
            {
                task: teamGenerationTask,
                input: (outputs) => ({ personas: outputs.personas, workflow: outputs.workflow }),
                output: 'finalTeamConfiguration'
            }
        ],
        errorHandling: {
            maxRetries: 3,
            retryDelay: 1000,
            fallbackStrategy: 'continue-on-error'  // Updated to a standard strategy
        }
    },
    env: {
        OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
        TAVILY_API_KEY: import.meta.env.VITE_TAVILY_API_KEY
    }
});

export default metaTeam;
