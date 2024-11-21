import { Agent, Task, Team } from 'kaibanjs';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';

// Define the Tavily Search tool
const searchTool = new TavilySearchResults({
    maxResults: 5,
    apiKey: import.meta.env.VITE_TAVILY_API_KEY
});

// Company Profile Analyzer Agent
const companyProfiler = new Agent({
    name: 'Elena',
    role: 'Company Profile Analyzer',
    goal: 'Create comprehensive company profile and business context from initial inputs',
    background: 'Expert in business analysis, company profiling, and industry research',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Market Research Specialist Agent
const marketResearcher = new Agent({
    name: 'Diana',
    role: 'Market Research Specialist',
    goal: 'Conduct comprehensive market analysis and identify key business opportunities and threats.',
    background: 'Expert in market research, competitive analysis, and trend forecasting',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Competitive Intelligence Analyst Agent
const competitiveAnalyst = new Agent({
    name: 'Marcus',
    role: 'Competitive Intelligence Analyst',
    goal: 'Deep-dive analysis of competitors strategies, strengths, and weaknesses',
    background: 'Specialized in competitive analysis, strategic planning, and market positioning',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// AI Integration Strategist Agent
const aiStrategist = new Agent({
    name: 'Nova',
    role: 'AI Integration Strategist',
    goal: 'Identify and plan AI implementation opportunities across business operations',
    background: 'Expert in AI systems, business process optimization, and digital transformation',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Business Process Optimizer Agent
const processOptimizer = new Agent({
    name: 'Ray',
    role: 'Business Process Optimizer',
    goal: 'Analyze current business processes and identify optimization opportunities through AI',
    background: 'Specialized in business operations, workflow optimization, and automation',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Customer Insight Analyst Agent
const customerAnalyst = new Agent({
    name: 'Sophie',
    role: 'Customer Insight Analyst',
    goal: 'Analyze customer behavior, needs, and market positioning opportunities',
    background: 'Expert in customer analytics, behavioral analysis, and market segmentation',
    tools: [searchTool],
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Report Compiler Agent
const reportCompiler = new Agent({
    name: 'Atlas',
    role: 'Strategic Report Compiler',
    goal: 'Synthesize all analysis into actionable strategic recommendations',
    background: 'Expert in strategic planning and comprehensive report creation',
    tools: [], // This agent focuses on synthesis rather than search
    llmConfig: {
        provider: 'openai',
        model: 'gpt-4o'
    }
});

// Initial Company Profiling Task
const companyProfilingTask = new Task({
    description: `Analyze company profile and create detailed business context using:
    Company Name: {companyName}
    LinkedIn URL: {linkedinUrl}
    Website URL: {websiteUrl}
    
    Extract and structure the following information:
    - Company Overview
        * Mission and vision
        * Core values
        * Company history
        * Leadership team
    - Industry Classification
        * Primary industry
        * Sub-industries
        * Market position
    - Company Size and Stage
        * Employee count
        * Revenue range (if available)
        * Growth stage
        * Funding status
    - Target Market
        * Primary customer segments
        * Geographic focus
        * Market tier (enterprise, mid-market, SMB)
    - Product/Service Portfolio
        * Main offerings
        * Key features
        * Pricing model (if public)
        * USPs
    - Technology Stack
        * Core technologies
        * Development frameworks
        * Infrastructure
        * Third-party integrations
    - Key Business Metrics
        * Growth rate
        * Market share
        * Key partnerships
        * Notable achievements
    - Current Challenges
        * Market challenges
        * Operational challenges
        * Growth barriers
    - Strategic Goals
        * Short-term objectives
        * Long-term vision
        * Expansion plans
    - Geographic Presence
        * Office locations
        * Target regions
        * Market penetration
    - Key Personnel
        * Leadership team
        * Department heads
        * Notable team members
    - Corporate Culture
        * Work environment
        * Company values
        * Employee benefits
        * Development opportunities`,
    expectedOutput: 'Detailed company profile and business context document',
    agent: companyProfiler
});

// Market Analysis Task
const marketAnalysisTask = new Task({
    description: `Using the company profile: {companyProfile}
    
    Analyze the market landscape for {companyName} in the {companyProfile.industry}:
    - Industry size and growth rate
        * Current market size
        * Historical growth patterns
        * Future growth projections
        * Regional market variations
    - Key market trends and drivers
        * Technology trends
        * Consumer behavior shifts
        * Regulatory changes
        * Economic factors
    - Market segmentation
        * Customer segments
        * Geographic segments
        * Product/service segments
        * Price segments
    - Regulatory environment
        * Current regulations
        * Upcoming legislation
        * Compliance requirements
        * Regional variations
    - Market opportunities and threats
        * Growth opportunities
        * Emerging markets
        * Potential disruptions
        * Market risks
    
    Focus on: {companyProfile.targetMarket}
    Consider: {companyProfile.geographicPresence}`,
    expectedOutput: 'Detailed market analysis report with actionable insights',
    agent: marketResearcher
});

// Competitor Analysis Task
const competitorAnalysisTask = new Task({
    description: `Using the company profile: {companyProfile}
    Market analysis context: {marketAnalysisOutput}
    
    Research and analyze competitors of {companyName}:
    - Direct competitors in: {companyProfile.productPortfolio}
        * Product comparison
        * Market share
        * Pricing strategies
        * Technology capabilities
    - Indirect competitors targeting: {companyProfile.targetMarket}
        * Alternative solutions
        * Market overlap
        * Competitive advantages
    - SWOT analysis for each major competitor
        * Strengths assessment
        * Weaknesses identification
        * Opportunities evaluation
        * Threats analysis
    - Competitive advantages relative to {companyProfile.keyMetrics}
        * Technical advantages
        * Market positioning
        * Customer relationships
        * Innovation capacity
    - Market share analysis
        * Share by segment
        * Share by region
        * Share trends
        * Growth patterns
    - Competitor strategies and tactics
        * Marketing approaches
        * Sales strategies
        * Product development
        * Partnership strategies`,
    expectedOutput: 'Comprehensive competitive analysis with strategic implications',
    agent: competitiveAnalyst
});

// AI Opportunity Analysis Task
const aiOpportunityAnalysisTask = new Task({
    description: `Using the company profile: {companyProfile}
    Technology context: {companyProfile.techStack}
    Current challenges: {companyProfile.challenges}
    
    Research and identify AI implementation opportunities:
    - Process automation potential based on {companyProfile.currentProcesses}
        * Workflow automation
        * Document processing
        * Customer service automation
        * Data analysis automation
    - Customer experience enhancement for {companyProfile.targetMarket}
        * Personalization opportunities
        * Predictive service
        * Automated support
        * Experience optimization
    - Decision support systems aligned with {companyProfile.strategicGoals}
        * Data analytics implementation
        * Predictive modeling
        * Risk assessment
        * Performance optimization
    - Predictive analytics opportunities
        * Sales forecasting
        * Customer behavior prediction
        * Resource optimization
        * Risk prediction
    - Cost reduction possibilities through AI
        * Process optimization
        * Resource allocation
        * Preventive maintenance
        * Operational efficiency`,
    expectedOutput: 'AI opportunity map with prioritized implementation recommendations',
    agent: aiStrategist
});

// Process Optimization Task
const processOptimizationTask = new Task({
    description: `Using the company profile: {companyProfile}
    AI analysis context: {aiAnalysisOutput}
    
    Analyze and optimize:
    - Current process efficiency: {companyProfile.currentProcesses}
        * Process mapping
        * Bottleneck identification
        * Efficiency metrics
        * Improvement opportunities
    - Technology stack evaluation: {companyProfile.techStack}
        * Current capabilities
        * Integration opportunities
        * Upgrade paths
        * Technical debt
    - Team structure: {companyProfile.companySize}
        * Resource allocation
        * Skill gaps
        * Training needs
        * Collaboration patterns
    - AI integration points
        * Process automation
        * Decision support
        * Customer interaction
        * Data analysis
    - Implementation roadmap considering {companyProfile.challenges}
        * Short-term wins
        * Long-term goals
        * Resource requirements
        * Risk mitigation`,
    expectedOutput: 'Detailed process optimization plan with AI integration points',
    agent: processOptimizer
});

// Customer Analysis Task
const customerAnalysisTask = new Task({
    description: `Using the company profile: {companyProfile}
    Market context: {marketAnalysisOutput}
    
    Analyze customer base and market positioning:
    - Customer segmentation within {companyProfile.targetMarket}
        * Demographic analysis
        * Behavioral patterns
        * Need-based segments
        * Value-based segments
    - Customer needs analysis based on {companyProfile.productPortfolio}
        * Pain points
        * Usage patterns
        * Feature preferences
        * Value perception
    - Customer journey mapping
        * Touchpoints
        * Decision processes
        * Experience gaps
        * Improvement opportunities
    - Service gap analysis
        * Current service levels
        * Customer expectations
        * Competition comparison
        * Improvement priorities
    - Brand positioning relative to {competitorAnalysisOutput}
        * Brand perception
        * Value proposition
        * Competitive advantages
        * Market differentiation`,
    expectedOutput: 'Customer insight report with positioning recommendations',
    agent: customerAnalyst
});

// Compilation Task
const compilationTask = new Task({
    description: `Synthesize the following analyses from the teaminto a comprehensive strategic plan:

    Company Profile: {companyProfile}
    Market Analysis: {marketAnalysisOutput}
    Competitor Analysis: {competitorAnalysisOutput}
    AI Opportunities: {aiAnalysisOutput}
    Process Optimization: {processOptimizationOutput}
    Customer Insights: {customerAnalysisOutput}
    
    Final Report Format Below:

    #{companyName} Strategic Plan
    
    ## Executive Summary:
    - Summary of the {companyProfile} with a focus on ai opportunities and strategic recommendations

    ## Company Profile:
    - Company current state: {companyProfile.keyMetrics}
        * Current capabilities {companyProfile.currentCapabilities}
        * Resource availability {companyProfile.resourceAvailability}
        * Market position {companyProfile.marketPosition}
        * Competitive advantages {companyProfile.competitiveAdvantages}
    
    ## Market Analysis:
    - Market size and growth rate: {marketAnalysisOutput.marketSize}
        * Current market size {marketAnalysisOutput.currentMarketSize}
        * Future growth projections {marketAnalysisOutput.futureGrowthProjections}
    - Key market trends and drivers: {marketAnalysisOutput.marketTrends}
        * Technology trends {marketAnalysisOutput.technologyTrends}
        * Consumer behavior shifts {marketAnalysisOutput.consumerBehaviorShifts}
    
    ## Competitor Analysis:
    - Competitor landscape: {competitorAnalysisOutput.competitorLandscape}
        * Direct competitors
        * Competitive positioning {competitorAnalysisOutput.competitivePositioning}
        * Strategic initiatives {competitorAnalysisOutput.strategicInitiatives}
    - SWOT analysis for each major competitor: {competitorAnalysisOutput.swotAnalysis}
        * Strengths assessment {competitorAnalysisOutput.strengthsAssessment}
        * Weaknesses identification
        * Opportunities evaluation {competitorAnalysisOutput.opportunitiesEvaluation}
        * Threats analysis {competitorAnalysisOutput.threatsAnalysis}
    
    ## Customer Insights:
    - Customer segmentation: {customerAnalysisOutput.customerSegmentation}
        * Demographic analysis
        * Behavioral patterns {customerAnalysisOutput.behavioralPatterns}
        * Need-based segments {customerAnalysisOutput.needBasedSegments}
        * Value-based segments {customerAnalysisOutput.valueBasedSegments}
    - Customer needs analysis: {customerAnalysisOutput.customerNeeds}
        * Pain points {customerAnalysisOutput.painPoints}
        * Usage patterns {customerAnalysisOutput.usagePatterns}
        * Feature preferences {customerAnalysisOutput.featurePreferences}
        * Value perception {customerAnalysisOutput.valuePerception}
        
    ## Recommendations:
    Provide detailed recommendations for:
    1. Immediate actions (0-3 months) {reportCompiler.immediateActions} 
    2. Short-term initiatives (3-12 months) {reportCompiler.shortTermInitiatives}
    3. Long-term strategic moves (1-3 years) {reportCompiler.longTermStrategicMoves}
    4. Resource allocation and budgeting {reportCompiler.resourceAllocation}
    5. Risk mitigation strategies {reportCompiler.riskMitigation}
    6. Success metrics and KPIs {reportCompiler.successMetrics}`,
    expectedOutput: 'Complete strategic plan with actionable recommendations and implementation roadmap formatted as above',
    agent: reportCompiler
});

// Create Strategic Analysis Team
const team = new Team({
    name: 'Market Domination Strategy Team',
    agents: [
        companyProfiler,
        marketResearcher,
        competitiveAnalyst,
        aiStrategist,
        processOptimizer,
        customerAnalyst,
        reportCompiler
    ],
    tasks: [
        companyProfilingTask,
        marketAnalysisTask,
        competitorAnalysisTask,
        aiOpportunityAnalysisTask,
        processOptimizationTask,
        customerAnalysisTask,
        compilationTask
    ],
    inputs: {
        companyName: '',      // Company name to analyze
        linkedinUrl: '',      // LinkedIn company profile URL
        websiteUrl: ''        // Company website URL (optional)
    },
    env: {
        OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
        TAVILY_API_KEY: import.meta.env.VITE_TAVILY_API_KEY
    },
    workflow: {
        sequence: [
            {
                task: 'companyProfilingTask',
                output: 'companyProfile'
            },
            {
                task: 'marketAnalysisTask',
                dependencies: ['companyProfile'],
                output: 'marketAnalysisOutput'
            },
            {
                task: 'competitorAnalysisTask',
                dependencies: ['companyProfile', 'marketAnalysisOutput'],
                output: 'competitorAnalysisOutput'
            },
            {
                parallel: [
                    {
                        task: 'aiOpportunityAnalysisTask',
                        dependencies: ['companyProfile'],
                        output: 'aiAnalysisOutput'
                    },
                    {
                        task: 'customerAnalysisTask',
                        dependencies: ['companyProfile', 'marketAnalysisOutput', 'competitorAnalysisOutput'],
                        output: 'customerAnalysisOutput'
                    }
                ]
            },
            {
                task: 'processOptimizationTask',
                dependencies: ['companyProfile', 'aiAnalysisOutput'],
                output: 'processOptimizationOutput'
            },
            {
                task: 'compilationTask',
                dependencies: [
                    'companyProfile',
                    'marketAnalysisOutput',
                    'competitorAnalysisOutput',
                    'aiAnalysisOutput',
                    'customerAnalysisOutput',
                    'processOptimizationOutput'
                ],
                output: 'finalStrategyOutput'
            }
        ],
        errorHandling: {
            maxRetries: 3,
            retryDelay: 1000,
            fallbackStrategy: 'skip-failed-task'
        },
        outputAggregation: {
            format: 'structured_report',
            sections: [
                'Executive Summary',
                'Company Profile',
                'Market Analysis',
                'Competitive Landscape',
                'Customer Insights',
                'AI Implementation Strategy',
                'Process Optimization Plan',
                'Implementation Roadmap',
                'Risk Analysis',
                'Expected ROI'
            ]
        }
    }
});

export default team;