import { Document } from 'langchain/document'

export function loadKnowledgeBase(): Document[] {
  const knowledgeBase = [
    {
      content: `Manish Ukirade is a Senior Product Manager and Tech Lead with 6+ years of experience in building scalable, cloud-native enterprise platforms. He is an expert in AI/ML, NLP, LLM solutions, driving revenue growth, and leading engineering teams. Skilled in product lifecycle, cloud architecture (AWS, Azure, GCP), DevOps, and SOC 2 Type II compliance.

PROFESSIONAL SUMMARY:
Manish is a Tech Lead | AI/ML Engineer | Cloud Architect based in Thane, India. He has proven expertise at turning complex needs into user-focused technology. He specializes in product leadership, AI/ML & NLP systems, system architecture & modernization, cloud & DevOps, and security & compliance.

CORE TECHNICAL SKILLS:

Programming Languages:
- JavaScript - Expert level, used extensively in Node.js development
- TypeScript - Advanced proficiency, type-safe development
- Node.js - Server-side JavaScript, RESTful APIs, microservices architecture
- Python - Backend development, data processing, ML model development
- React.js - Frontend development, component architecture
- Vue.js - Frontend framework, microservices-based applications
- AngularJS - Frontend framework

AI/ML & NLP:
- RASA - Conversational AI framework
- Chatbots - Development and integration
- LLM Integration - Large Language Model integration and fine-tuning
- ML Models - Machine learning model development and deployment
- Text Processing - NLP text analysis and processing
- Conversational AI - Building intelligent conversational systems
- MLOps - Machine Learning Operations and deployment pipelines

Cloud/DevOps:
- AWS (Amazon Web Services) - EC2, S3, Lambda, CloudFront, Route53, multi-cloud expertise
- Azure - Cloud services, application migration, infrastructure management
- GCP (Google Cloud Platform) - Pub/sub systems, API gateways, cloud migration
- Docker - Containerization, Docker Swarm, Docker Compose
- Kubernetes - Container orchestration
- CI/CD - Continuous Integration and Continuous Deployment pipelines
- Jenkins - Build automation and CI/CD
- Linux - System administration
- Shell Scripting - Automation scripts
- Automation - Infrastructure and deployment automation

Databases/Tools:
- MySQL - Relational database management
- PostgreSQL - Advanced database operations
- Redis - Caching and session management
- Firebase - Backend services and authentication
- Git - Version control
- Swagger - API documentation
- Jira - Project management
- Agile - Agile methodologies
- VAPT - Vulnerability Assessment and Penetration Testing

PROFESSIONAL EXPERIENCE:

W.E. Matter, Mumbai | Tech Lead + Engineering Lead (Apr 2023 – Present):
- Drove sustained revenue growth of nearly 2X year-over-year for the enterprise employee engagement platform by leading product strategy and engineering execution, achieving this growth over a 2.5-year tenure.
- Architected and launched an enterprise-grade employee engagement platform, successfully delivering robust functionality to diverse enterprise clients across various industries and significantly enhancing HR capabilities.
- Spearheaded the end-to-end design and development of a comprehensive Performance Management System (PMS) platform, delivering critical HR functionality and streamlining performance evaluation processes for NBFC customers.
- Developed and launched KYARA, an AI-enabled HR consultant leveraging NLP and LLM capabilities to autonomously run surveys, provide analytics-driven insights, generate strategic recommendations, and act as a conversational advisor for HR and leadership, improving decision-making efficiency.
- Owned the product roadmap, engineering strategy, and execution as Product and Technical Product Manager, fostering cross-functional collaboration to deliver high-impact features and achieve business objectives.
- Led successful SOC 2 Type II certification execution by drafting comprehensive policies (Data Privacy, Succession Planning, Tech, Business), managing vendor audits, ensuring documentation, and overseeing VAPT activities, thereby enhancing platform security and compliance posture.
- Managed and optimized DevOps infrastructure, including production servers, containerizing the entire stack with Docker Swarm + Compose, and overseeing MySQL, Redis, Node.js, and React services.
- Orchestrated and executed a complete application migration from AWS to Azure within 15 days, ensuring zero downtime and maintaining stringent security standards, resulting in cost efficiencies.

Bizpilot.in, Delhi | Software Engineer (Feb 2022 – Mar 2023):
- Led the complete redesign and development of the V2 platform from scratch, modernizing the technology stack and improving overall system performance and maintainability.
- Designed and implemented a robust CI/CD pipeline, automating build, test, and deployment processes to accelerate delivery cycles and improve code quality.
- Built a financial automation engine that reduced compliance processing time by approximately 200%, significantly enhancing operational efficiency and reducing manual effort.
- Managed servers and core DevOps infrastructure, ensuring high availability and performance for the financial software platform.

Raykor Technologies | Software Engineer (Sep 2021 – Feb 2022):
- Executed a critical application infrastructure migration from Azure to Google Cloud Platform (GCP) with zero downtime, ensuring seamless transition and enhanced scalability.
- Automated deployments and optimized system stability throughout the migration process, minimizing risks and ensuring business continuity.
- Developed REST APIs using Hapi.js, integrated advanced authentication mechanisms, and implemented Firebase authentication for secure user access.

Nexsales Corporation | Software Engineer (Aug 2019 – Aug 2021):
- Led the development of a new product from inception while managing and modernizing legacy Node.js 0.10 systems, bridging old and new technologies.
- Developed a Vue.js microservices-based dialer application with seamless integration for outbound calling via SIP servers, enhancing customer communication capabilities.
- Managed end-to-end server provisioning, deployments, and comprehensive DevOps responsibilities, ensuring robust infrastructure and operational efficiency for new product launches.
- Designed and implemented a scalable ML pipeline using Python & TensorFlow for text categorization and classification tasks, enabling advanced data analysis.
- Developed pub/sub systems and API gateways on GCP, facilitating efficient microservice communication and data flow.

KEY STRENGTHS:
- Product Leadership: Roadmap Ownership, Technical Product Management, Cross-functional Leadership, Enterprise Delivery, Stakeholder Management
- AI/ML & NLP: Conversational AI, LLM Integration, Chatbots, NLP Systems, Analytics Insights, ML Model Development
- System Architecture & Modernization: Cloud-Native Design, Platform Rewrites, Legacy Modernization, Scaling, Microservices Architecture
- Cloud & DevOps: Multi-Cloud Expertise (AWS, Azure, GCP), CI/CD Automation, Containerization (Docker), Infrastructure Management, High Availability
- Security & Compliance: SOC 2 Type II, VAPT, Security Policies, Data Privacy

EDUCATION:
B.E. in Information Technology from Bharati Vidyapeeth College of Engineering, Navi Mumbai (2015 – 2019)

CONTACT INFORMATION:
- Location: Thane, India 400605
- Phone: +91 869 198 3106
- Email: ukirademanish9797@gmail.com
- LinkedIn: https://www.linkedin.com/in/manish-ukirade-13b866124/`,
      metadata: { source: 'portfolio', type: 'general' },
    },
    {
      content: `MAJOR PROJECTS AND ACHIEVEMENTS:

1. KYARA - AI-Enabled HR Consultant
- Developed and launched KYARA, an AI-enabled HR consultant leveraging NLP and LLM capabilities
- Features: Autonomously runs surveys, provides analytics-driven insights, generates strategic recommendations
- Acts as a conversational advisor for HR and leadership
- Improves decision-making efficiency through AI-powered insights
- Technologies: NLP, LLM, Conversational AI, Analytics

2. Enterprise Employee Engagement Platform
- Architected and launched enterprise-grade employee engagement platform
- Successfully delivered robust functionality to diverse enterprise clients across various industries
- Significantly enhanced HR capabilities
- Drove sustained revenue growth of nearly 2X year-over-year
- Technologies: Node.js, React, MySQL, Redis, Docker Swarm, Docker Compose

3. Performance Management System (PMS) Platform
- Spearheaded end-to-end design and development of comprehensive Performance Management System
- Delivered critical HR functionality
- Streamlined performance evaluation processes for NBFC customers
- Technologies: Full-stack development, Enterprise architecture

4. Financial Automation Engine (Bizpilot)
- Built financial automation engine that reduced compliance processing time by approximately 200%
- Significantly enhanced operational efficiency
- Reduced manual effort in financial compliance
- Technologies: Node.js, Automation, CI/CD

5. Platform V2 Redesign (Bizpilot)
- Led complete redesign and development of V2 platform from scratch
- Modernized technology stack
- Improved overall system performance and maintainability
- Technologies: Modern web stack, CI/CD pipelines

6. Cloud Migration Projects:
- AWS to Azure Migration (W.E. Matter): Complete application migration within 15 days with zero downtime
- Azure to GCP Migration (Raykor): Critical application infrastructure migration with zero downtime
- Technologies: Multi-cloud expertise, Docker, Kubernetes, CI/CD

7. ML Pipeline for Text Categorization (Nexsales)
- Designed and implemented scalable ML pipeline using Python & TensorFlow
- Text categorization and classification tasks
- Enabled advanced data analysis
- Technologies: Python, TensorFlow, ML Models, MLOps

8. Vue.js Microservices Dialer Application (Nexsales)
- Developed Vue.js microservices-based dialer application
- Seamless integration for outbound calling via SIP servers
- Enhanced customer communication capabilities
- Technologies: Vue.js, Microservices, SIP integration

9. SOC 2 Type II Certification (W.E. Matter)
- Led successful SOC 2 Type II certification execution
- Drafted comprehensive policies (Data Privacy, Succession Planning, Tech, Business)
- Managed vendor audits, ensured documentation
- Oversaw VAPT activities
- Enhanced platform security and compliance posture`,
      metadata: { source: 'portfolio', type: 'projects' },
    },
    {
      content: `AI/ML & NLP EXPERTISE:

Manish has extensive experience in AI/ML and NLP technologies:

1. KYARA - AI-Enabled HR Consultant:
- Leverages NLP and LLM capabilities
- Autonomously runs surveys
- Provides analytics-driven insights
- Generates strategic recommendations
- Acts as conversational advisor for HR and leadership

2. Conversational AI:
- RASA framework expertise
- Chatbot development and integration
- LLM integration and fine-tuning
- Building intelligent conversational systems

3. Machine Learning:
- ML model development and deployment
- Text processing and NLP text analysis
- ML pipeline implementation using Python & TensorFlow
- Text categorization and classification
- MLOps - Machine Learning Operations and deployment pipelines

4. Technologies Used:
- Python for ML development
- TensorFlow for deep learning models
- RASA for conversational AI
- LLM integration (Large Language Models)
- NLP text processing
- MLOps pipelines`,
      metadata: { source: 'portfolio', type: 'ai-ml' },
    },
    {
      content: `CLOUD & DEVOPS EXPERTISE:

Manish has extensive multi-cloud expertise and DevOps experience:

1. Cloud Platforms:
- AWS (Amazon Web Services): EC2, S3, Lambda, CloudFront, Route53
- Azure: Cloud services, application migration, infrastructure management
- GCP (Google Cloud Platform): Pub/sub systems, API gateways, cloud migration

2. Major Cloud Migrations:
- AWS to Azure Migration (W.E. Matter): Complete application migration within 15 days with zero downtime, maintaining stringent security standards, resulting in cost efficiencies
- Azure to GCP Migration (Raykor): Critical application infrastructure migration with zero downtime, ensuring seamless transition and enhanced scalability

3. Containerization & Orchestration:
- Docker: Containerization, Docker Swarm, Docker Compose
- Containerized entire stack with Docker Swarm + Compose
- Kubernetes: Container orchestration

4. CI/CD & Automation:
- CI/CD pipelines: Automated build, test, and deployment processes
- Jenkins: Build automation and CI/CD
- Shell Scripting: Automation scripts
- Infrastructure automation

5. Infrastructure Management:
- Production server management
- High availability systems
- Server provisioning
- End-to-end deployments
- DevOps infrastructure optimization

6. Technologies:
- Linux system administration
- Git version control
- Infrastructure as Code
- Multi-cloud architecture design`,
      metadata: { source: 'portfolio', type: 'devops' },
    },
    {
      content: `PRODUCT LEADERSHIP & MANAGEMENT:

Manish has strong product leadership and management experience:

1. Product Strategy:
- Owned product roadmap as Product and Technical Product Manager
- Led engineering strategy and execution
- Drove sustained revenue growth of nearly 2X year-over-year
- Fostered cross-functional collaboration to deliver high-impact features

2. Technical Product Management:
- Bridge between business and engineering
- Technical decision-making
- Product lifecycle management
- Stakeholder management

3. Enterprise Delivery:
- Successfully delivered robust functionality to diverse enterprise clients
- Enterprise-grade platform architecture
- Cross-industry client delivery
- High-impact feature delivery

4. Team Leadership:
- Led engineering teams
- Cross-functional collaboration
- Technical leadership
- Engineering execution

5. Key Achievements:
- Drove 2X revenue growth through product strategy
- Delivered enterprise-grade platforms
- Led SOC 2 Type II certification
- Managed complex migrations with zero downtime`,
      metadata: { source: 'portfolio', type: 'leadership' },
    },
    {
      content: `SECURITY & COMPLIANCE:

Manish has expertise in security and compliance:

1. SOC 2 Type II Certification:
- Led successful SOC 2 Type II certification execution
- Drafted comprehensive policies:
  - Data Privacy Policy
  - Succession Planning Policy
  - Tech Policy
  - Business Policy
- Managed vendor audits
- Ensured documentation compliance
- Oversaw VAPT (Vulnerability Assessment and Penetration Testing) activities

2. Security Practices:
- Enhanced platform security and compliance posture
- Maintained stringent security standards during migrations
- Security-first approach to architecture
- Data privacy compliance

3. VAPT:
- Vulnerability Assessment and Penetration Testing
- Security testing and validation
- Security audit management`,
      metadata: { source: 'portfolio', type: 'security' },
    },
    {
      content: `BACKEND DEVELOPMENT EXPERTISE:

Manish has extensive backend development experience:

1. Node.js Development:
- Server-side JavaScript development
- RESTful APIs development
- Microservices architecture
- Hapi.js framework for REST APIs
- Express.js framework
- Fastify framework

2. Python Development:
- Backend development
- Data processing
- ML model development
- ML pipeline implementation
- Text processing

3. API Development:
- REST API design and implementation
- API gateway development on GCP
- Advanced authentication mechanisms
- Firebase authentication integration

4. Database Management:
- MySQL: Relational database management for production systems
- PostgreSQL: Advanced database operations
- Redis: Caching and session management
- Database optimization and performance tuning

5. Microservices:
- Microservices architecture design
- Pub/sub systems on GCP
- API gateways
- Service communication patterns

6. Technologies:
- Node.js for server-side development
- Python for backend and ML
- Hapi.js for REST APIs
- Firebase for authentication
- MySQL, PostgreSQL, Redis for data storage`,
      metadata: { source: 'portfolio', type: 'backend' },
    },
    {
      content: `FRONTEND DEVELOPMENT EXPERTISE:

Manish has frontend development experience:

1. React.js:
- Frontend development
- Component architecture
- Modern React patterns
- Enterprise-grade frontend applications

2. Vue.js:
- Frontend framework expertise
- Microservices-based applications
- Vue.js dialer application development
- Component-based architecture

3. AngularJS:
- Frontend framework experience
- Legacy system modernization

4. Modern Frontend:
- TypeScript for type-safe development
- Responsive design
- Interactive user interfaces
- Component architecture

5. Technologies:
- React.js for modern frontend
- Vue.js for microservices frontend
- AngularJS for legacy systems
- TypeScript for type safety
- JavaScript/TypeScript`,
      metadata: { source: 'portfolio', type: 'frontend' },
    },
  ]

  return knowledgeBase.map(
    (item) =>
      new Document({
        pageContent: item.content,
        metadata: item.metadata,
      })
  )
}
