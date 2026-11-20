# Training Plan

The plan for training pages and what we want to cover. 

## Intro
An intro about the project and some goals... saying this is focused on using AI in your every day workflow and not about building it into your apps or building MCP servers or anything of that nature

We will focus on Claude Cowork and Cursor 

Write a bit about how your style of communicating with the AI tools will need to be something you work on and develop as you learn what works for you and your personal workflows.

### Roles and Tools
Talk about the 2 roles we'll cover, indicate everyone should read all of it as we all sometimes cross these roles, and there is good information in all sections for everyone

### Current State of AI

Talk about hte current level of quality and their current state

Strategy: Associate level with an overly eager attitude and perpensity to make up things 

Developer: new grad level that tends to be overly verbose and still misinterprets requirements at times. Terrible at ui design implementation  

list the current fronteir models , and talk about how they each differ slightly and should be tested

## Fundamentals (cross functional)
In this section we want to cover some fundamental details about AI and how it works

### What is an LLM
Discuss what an LLM is, give a brief history with a little background before GPT3 then cover that big event, with some more modern news about 

### How they function
A quick overview about how a question you ask is answered showing some interactive element that shows a new fresh instance being loaded up, sent the data, stream it to the user, then forgetting everything. 

A big focus on this chapter will be on how when you start a new chat the AI forgets everything 

### Context Windows
A talk about context windows with a focus on how most tools will compact the window after some time (or block you) .. we also want to talk about any recency bias in these context windows. 

### Verbosity
Talk about how AIs are generally too verbose for many tasks, they are fast at both reading and writing, but you want things to be more focused for actual humans to use them

### Prompt Engineering Basics
A review of how to engineer your prompts, a focus on stating why something should be done, linking to relevant files and golden masters (best examples) and keeping your tasks bite sized.

### Model Selection
How to pick a model, things to think about, a small area about cost

### Hallucination & Verification
Talk about how LLMs will make things up, including apis that dont exist, and covering that often their data is out of date. Talk about always verifying things, and add a tips and tricks part at the bottom about things like linking to documentation or already existing code, or other existing documents or research you have. and a reminder that the LLM wont remember things between conversations 

## Requirements Gathering (Strategy)
This section will be all about how we gather requirements 

### Linking your Tools
A short section about linking confluence or your other documentation & ticketing tools to your AI tool of choice

### Templates
Talk about coming up with templates for your documents, we want to follow the golden master rule for how to do things.

### AI Rubber Ducking
Talk about asking the AI to question your assumptions, finding missing items, and keeping things short.

## Competitive Research (Strategy)
AI tools can accelerate competitive research significantly, but you need to know how to prompt effectively and where the gaps are.

### Setting Up Your Research
How to frame your research before opening an AI chat. Start with 3-5 specific strategic questions rather than vague "tell me about competitors." Cover how to give the AI context about your company, market, and what you're comparing so it can produce useful output. Cover avoiding leading questions: keep conclusions and hoped-for answers out of the prompt, since even mild framing makes the AI agree with you instead of researching. Mention that web-enabled AI tools (Gemini, Claude with search, Perplexity) are required, and that you need to tell teh AI to search the web or it may not and just make things up.

### Prompting for Research
Practical prompting techniques for competitive research tasks: asking AI to compare features across competitors, summarize a competitor's public positioning, analyze pricing pages, or identify gaps in a market. Show examples of good vs bad prompts. Emphasize iterative refinement: start broad, then drill into specifics. Include examples like "here's our product page and their product page, what are the key differences?"

### Citing Sources
Teach people that AI-generated citations are frequently wrong or fabricated. The rule: if you didn't click the link and verify it yourself, don't put it in your deliverable. Cover how to prompt AI to include sources, then how to verify them. Encourage using AI as a starting point for finding real sources rather than trusting what it hands you.

### Limitations to Teach Your Team
- AI knowledge has a cutoff, so recent competitor launches or pivots may be missing
- AI tends to give generic/surface-level competitive analysis unless you provide real context
- It's good at organizing and comparing information you feed it, less good at discovering truly new intelligence
- Statistics and market data from AI should never go into a deliverable without verification
- Niche or smaller competitors will have less reliable coverage

### Structuring Your Output
How to use AI to take your verified research and turn it into useful artifacts: comparison matrices, battlecards, executive summaries, SWOT analyses. Tie back to the Templates concept from Requirements Gathering. The AI is great at formatting and structuring once you've done the verification work.

## Requirements Writing  (Strategy)

### Skills with Templates

### Requirements Evaluation

### Including the Why

## Task Breakdowns (Both)

### AGENTS.md
Talk about how an agents.md file works here, that we should limit it's size, but including the tech stack and preferences for code structure here are important.

This can eb a short section, but have a few examples based off our sample unfinished project we'll be working off in the practical

### Including Context 
discuss how you can bridge the requirements and the current code to have the AI break down tasks while bridging the gap between a non-technical user and a technical user. The user can do this by running the coding tool in the folder that has both the requirements and the code or referencing the requirements from something like Confluence while in the code folder. 

Talk about asking the AI to break down tasks by how long they will take; the AI doesn't take into account the use of AI tools, and generally Konrad Group developers are faster then the estimates, so double the amount you would want them to take.

give some example prompts (link to requirement in the prompt, starting point in the code and additional details you may want to sprinkle in); link to the next section about streamlining the tool with skills.

### Task Breakdown Skills

In here similar to the structuring your output section, we build another skill but for breaking down requirements from that skill into tasks. (we'll also add this to the main project and again provide download links)

## Development  (Developer)

### Documentation 

Talk about the importance of documentation both in your code, but generally about approaches, design decisions and such. how these can help both the AI but new developers to the project

### Agent, Plan & Ask modes

Talk about the different modes available in the tools, and how powerful teh ask mode can be while learning the project, agent modes for coding and plan odes before beginning a task if you dont have well defined tickets/scope.

### Context Strategies

Talk about how the context window grows quickly and tools often compress the window as it goes. We suggest you start a new chat between each distinct task to keep the context window relevant.

### Prompting for Development

cover some prompting strategies, reiterate the golden master rule, talk about being exacting and also covering that the developer is a jr developer, similar to our other page. 

### Choosing Libraries/Frameworks

cover how picking good libraries for validation, api creation / docs, etc. can help the AI, and also just make your project better

### Utilizing Git

In here we want to talk about the power of git, using it to keep a thread going until it works. But also the willingness to just undo everything if it's not working, its sometimes easier to throw it away and start over then trying to get the AI to fix the code.

Also talk about using their git tool to review the changes before moving on (also covered in next section)

### Code Review
Talk about AI often moving the person's work to go form 75% dev, 15% Requirements / Docs Writing , 10% Code review; into this new model that is less coding and more the other things, but gets more done overall. We can have a nice visualization for this.

### Owning the Code
Cover that the user still owns the code written by  the AI, they need to be able to answer questions about it and its still theirs. This is what the AI said is not a good answer. They can question teh AI about its decisions to understand them, but they also need to agree with it.

### Debugging with AI
Talk about debugging being one of the greatest strengths of the AI, plugging in an error and asking it where the error lies is often very powerful. And most of the time the AI can fix the issue if it's described well. try having it fix it real quick, see if it works and you agree with the solution, git revert it and go back to asking it just to pinpoint the issue.

### CLI tools and AI
Talk here about how the AI is great with CLI tools, so having those installed on your system can help speed up things, you can list these in the agents file, or in skills depending on what makes sense. You can use the atlassian CLI as an example here.

## Documentation (Both)

Just talk about the over all importance of documentation 

### Documentation

Talk about how the documentation not only helps onboard new people strategy, devs, etc. but as we treat the AI like a new employee for every new chat session it also helps onboard them. 

documentation is now more important then ever, and one of the most valuable things in your repository going forward.

### Where

Ideally in your repo, this allows for some very powerful search tools. next best is in confluence or something else that can be accessed with a CLI tool or an MCP server. 

setup a good structure; document that and ideally build a skill to define your docs structure ... this skill should be super short

### What

talk about the different types of docs ... maybe group these?
- requirements
- tasks breakdowns 
- tickets
- runbooks
- guides / skills 
- Test plans
- decision logs

talk about what each one is used for, and how they can help the AI answer questions for the devs / strategy and others

### Templates

add in a list of templates we can provide in the docs, these should follow some industry standards like ADRs (link out to the web for these where possible)

## Testing (Developer)

### AI Test plan

Talk about improving testing plans by having the AI review your code on a branch or commit and provide a list of scenarios to test./

The developer should do these themselves before later using them when handing over to QA

### QA Tea usage

QA team members can ask the AI about a feature to discover edge cases (give an example prompt). Also you can use the AI to write tes plans based off requirements, even if they dont have access to the code; pipe in the requirements (ideally give it the ticket or confluence and have read that along with other requiremetns to mix it in)

the QA tester still has move overall project context, so they should also have a lense of the project as a whole and whats important to test... review the test plans, add/modify them.

### Security and Vulnerabilities

talk about how security is rarely a concern of the AI unless you explicitly tell it to.. and you will forget (or at least not be detailed enough). so always have an eye on security when reviewing the code. the AI is a new grad and eager, it'll take the easy route to finish features 


## Feedback Loops (Both)

Talk about rapidly resolving feedback loops with AI. 

- some feedback loops are you trying to fix what it made; be willing to start over, it's cheap
- talk about the other loop of reading what the AI did to understand why to better understand what info it needs. 

## Final words
give some final words before the practical

- start simple and work your way up to a more complicated workflow, figure out what works for you dont install every skill, MCP server and other thing into your workflow. 
- be detailed in your prompts; its more like writing requirements then traditional development
- treat the AI like it's an intern here just for you, and like any more senior person on the team that means more spending time writing requirements and doign code review


## Practical 
Have a practical project that we have in a stage where you can do requirements and then implement them using the AI tools.

this is setup in sample-project and we'll have some tasks for the user to do, running through the SDLC with some prompt sand looking at the output, and executing on it

## Exploring AI Capabilities (Both)

A second hands-on section that comes after the Practical. Trainees work in the Kaiju Mutual codebase ([public/downloads/kaiju-mutual.zip](public/downloads/kaiju-mutual.zip)), a monorepo with a public website, a consumer portal, an admin portal, and an API that talks to outside vendors. The goal is to explore what an AI agent can do in a larger, multi-app project than the dashboard sample.

The challenges are a sample of what agents can do, not a complete list. The tools change fast, so each challenge is meant to be a quick way to try one capability and see where it fits in your own work.
