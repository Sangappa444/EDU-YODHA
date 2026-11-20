export interface Internship {
  slug: string;
  title: string;
  icon: string;
  description: string;
  skills: string[];
  overview: string;
  learningOutcomes: string[];
  projectInfo: string;
  eligibility: string[];
  applicationProcess: string[];
  faqs: { question: string; answer: string }[];
  fee: number;
}

export const internships: Internship[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    icon: 'Globe',
    description: 'Build modern, responsive websites using the latest web technologies.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'Responsive Design'],
    overview:
      'The Web Development internship program is designed to give you hands-on experience building real-world websites and web applications. You will work on practical projects that reinforce core web development concepts and help you build a professional portfolio.',
    learningOutcomes: [
      'Understand the fundamentals of web development including HTML, CSS, and JavaScript',
      'Build responsive and mobile-friendly web pages',
      'Work with modern web frameworks and libraries',
      'Develop a practical understanding of web design principles',
      'Create and structure web projects professionally',
      'Gain exposure to version control and development workflows',
    ],
    projectInfo:
      'You will work on practical web development assignments including building responsive web pages, implementing UI components, and developing small web applications. Project details are shared after enrollment.',
    eligibility: [
      'Students currently enrolled in any undergraduate or postgraduate program',
      'Basic understanding of computers and the internet',
      'No prior programming experience required (beginners welcome)',
      'Access to a computer with internet connectivity',
    ],
    applicationProcess: [
      'Fill out the application form below with your details',
      'Upload your resume or student ID',
      'Our team will review your application',
      'You will receive a confirmation email with further details',
      'Complete the enrollment by paying the program fee of ₹5,000',
      'Begin your internship with an orientation session',
    ],
    faqs: [
      { question: 'Is prior experience required?', answer: 'No prior experience is required. This program welcomes beginners.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
      { question: 'Will I receive a certificate?', answer: 'Program completion details including any certificates are communicated after enrollment.' },
      { question: 'Is this a remote internship?', answer: 'Program delivery details are shared after enrollment.' },
      { question: 'What if I have more questions?', answer: 'Contact us through the contact page at eduyodha.com/contact.' },
    ],
    fee: 5000,
  },
  {
    slug: 'full-stack-development',
    title: 'Full Stack Development',
    icon: 'Layers',
    description: 'Master both frontend and backend development for complete web applications.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'JavaScript'],
    overview:
      'The Full Stack Development internship provides comprehensive training in both frontend and backend technologies. You will gain practical skills to build complete web applications from scratch, covering everything from UI design to database integration.',
    learningOutcomes: [
      'Build complete web applications using frontend and backend technologies',
      'Work with React for building interactive user interfaces',
      'Develop backend APIs using Node.js and Express',
      'Understand database design and integration with MongoDB',
      'Learn about RESTful API design principles',
      'Deploy and manage full stack web applications',
    ],
    projectInfo:
      'Projects involve building complete web applications with both frontend and backend components. You will work on assignments that simulate real-world full stack development scenarios.',
    eligibility: [
      'Students enrolled in Computer Science, IT, or related programs',
      'Basic knowledge of HTML, CSS, and JavaScript preferred',
      'Familiarity with any programming language is an advantage',
      'Access to a computer with internet connectivity',
    ],
    applicationProcess: [
      'Submit the application form with your academic details',
      'Upload your resume',
      'Application review by our team',
      'Receive confirmation and enrollment details',
      'Pay the program fee of ₹5,000',
      'Start your program with an onboarding session',
    ],
    faqs: [
      { question: 'Do I need to know React before applying?', answer: 'Basic JavaScript knowledge is helpful but not mandatory. The program covers fundamentals.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
      { question: 'Is this program suitable for beginners?', answer: 'Some prior programming exposure is helpful, though we cover the fundamentals.' },
      { question: 'How do I contact EDU YODHA?', answer: 'Visit eduyodha.com/contact for all enquiries.' },
    ],
    fee: 5000,
  },
  {
    slug: 'python-programming',
    title: 'Python Programming',
    icon: 'Code2',
    description: 'Learn Python programming from fundamentals to practical applications.',
    skills: ['Python', 'OOP', 'File Handling', 'Libraries', 'Scripting', 'Automation'],
    overview:
      'This internship focuses on building strong Python programming foundations and applying them to real-world scenarios. You will learn Python syntax, object-oriented programming, and work on practical programming assignments.',
    learningOutcomes: [
      'Understand Python syntax and programming fundamentals',
      'Apply object-oriented programming concepts in Python',
      'Work with Python libraries and modules',
      'Write scripts for automation and data processing',
      'Handle files, exceptions, and I/O operations',
      'Build small Python-based applications',
    ],
    projectInfo:
      'Projects include building Python scripts, automation tools, and small applications. Assignments are practical and designed to reinforce Python programming skills.',
    eligibility: [
      'Open to students from all educational backgrounds',
      'Basic understanding of computers and logic',
      'No prior programming experience required',
      'Access to a computer with Python installation capability',
    ],
    applicationProcess: [
      'Complete the application form',
      'Submit your resume or student details',
      'Review and confirmation from our team',
      'Enrollment confirmation email',
      'Fee payment of ₹5,000',
      'Program commencement with orientation',
    ],
    faqs: [
      { question: 'Is Python programming beginner-friendly?', answer: 'Yes, Python is one of the best languages for beginners and this program starts from fundamentals.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
      { question: 'Will projects be assigned?', answer: 'Yes, practical assignments and projects are part of the program.' },
    ],
    fee: 5000,
  },
  {
    slug: 'java-development',
    title: 'Java Development',
    icon: 'Coffee',
    description: 'Build robust applications using Java and enterprise development practices.',
    skills: ['Java', 'OOP', 'Spring Boot', 'MySQL', 'Data Structures', 'JDBC'],
    overview:
      'The Java Development internship helps you build a solid foundation in Java programming and enterprise application development. You will learn core Java concepts, object-oriented principles, and work with popular Java frameworks.',
    learningOutcomes: [
      'Master core Java programming concepts and syntax',
      'Apply object-oriented programming principles effectively',
      'Work with Java collections, exceptions, and I/O',
      'Build applications using Spring Boot basics',
      'Connect Java applications with MySQL databases',
      'Understand Java development best practices',
    ],
    projectInfo:
      'Projects involve building Java console applications, simple web services, and database-connected programs. Practical assignments reinforce both core Java and framework usage.',
    eligibility: [
      'Students from CS, IT, or engineering programs preferred',
      'Basic understanding of programming logic helpful',
      'No prior Java experience required',
      'Computer with Java installation capability',
    ],
    applicationProcess: [
      'Fill the application form',
      'Upload your resume',
      'Team reviews your application',
      'Confirmation email sent',
      'Pay ₹5,000 enrollment fee',
      'Begin program with onboarding',
    ],
    faqs: [
      { question: 'Do I need prior Java knowledge?', answer: 'No, the program starts from Java fundamentals.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    icon: 'Brain',
    description: 'Explore AI concepts, tools, and practical implementation techniques.',
    skills: ['Python', 'ML Basics', 'Neural Networks', 'TensorFlow', 'NLP', 'AI Tools'],
    overview:
      'This internship introduces you to the exciting field of Artificial Intelligence. You will explore fundamental AI concepts, tools, and techniques, and apply them through practical programming exercises and projects.',
    learningOutcomes: [
      'Understand core concepts and history of Artificial Intelligence',
      'Learn how machine learning forms the foundation of modern AI',
      'Explore neural networks and deep learning basics',
      'Work with Python libraries used in AI development',
      'Get introduced to Natural Language Processing concepts',
      'Understand practical AI applications in the real world',
    ],
    projectInfo:
      'Projects involve implementing basic AI algorithms, working with pre-trained models, and experimenting with AI tools. Assignments are designed to build practical understanding.',
    eligibility: [
      'Students from CS, IT, Mathematics, or related fields preferred',
      'Basic Python programming knowledge is helpful',
      'Strong interest in AI and emerging technologies',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Submit application form with details',
      'Upload resume',
      'Application review',
      'Enrollment confirmation',
      'Fee payment of ₹5,000',
      'Program orientation and commencement',
    ],
    faqs: [
      { question: 'Is AI internship suitable for beginners?', answer: 'Basic programming knowledge is recommended. The program covers AI fundamentals progressively.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'machine-learning',
    title: 'Machine Learning',
    icon: 'Cpu',
    description: 'Learn to build intelligent systems using machine learning algorithms.',
    skills: ['Python', 'Scikit-learn', 'Data Processing', 'Model Training', 'Evaluation', 'NumPy'],
    overview:
      'The Machine Learning internship program gives you hands-on experience building and evaluating ML models. You will learn supervised and unsupervised learning techniques, work with real datasets, and understand the ML development pipeline.',
    learningOutcomes: [
      'Understand machine learning concepts and the ML pipeline',
      'Work with supervised and unsupervised learning algorithms',
      'Process and prepare data for machine learning',
      'Build and evaluate ML models using Scikit-learn',
      'Understand model performance metrics and improvement techniques',
      'Apply ML concepts to practical problem-solving scenarios',
    ],
    projectInfo:
      'Projects involve building ML models on real datasets, evaluating performance, and presenting findings. Assignments cover the complete ML workflow from data preparation to model evaluation.',
    eligibility: [
      'Students from CS, IT, Statistics, Mathematics, or related programs',
      'Basic Python programming knowledge recommended',
      'Familiarity with basic mathematics (statistics, linear algebra) helpful',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Complete application form',
      'Submit resume',
      'Application review by team',
      'Confirmation email',
      'Pay program fee ₹5,000',
      'Onboarding and program start',
    ],
    faqs: [
      { question: 'Do I need to know statistics?', answer: 'Basic mathematical understanding is helpful but not strictly required.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    icon: 'BarChart3',
    description: 'Analyze and interpret complex data to derive meaningful insights.',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistics', 'Matplotlib'],
    overview:
      'The Data Science internship teaches you to work with data end-to-end — from collection and cleaning to analysis and visualization. You will gain practical skills in Python-based data science tools and learn how to derive insights from real datasets.',
    learningOutcomes: [
      'Understand the data science workflow and methodology',
      'Work with Pandas and NumPy for data manipulation',
      'Perform exploratory data analysis on real datasets',
      'Create meaningful data visualizations',
      'Apply statistical concepts to data analysis',
      'Communicate data-driven insights effectively',
    ],
    projectInfo:
      'Projects involve analyzing real-world datasets, creating visualizations, and presenting data insights. Assignments are designed to build a practical data science portfolio.',
    eligibility: [
      'Students from any background with interest in data',
      'Basic Python knowledge is helpful',
      'Comfort with mathematics and statistics is an advantage',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Fill application form',
      'Upload resume',
      'Team review',
      'Confirmation email',
      'Fee payment ₹5,000',
      'Program orientation',
    ],
    faqs: [
      { question: 'Is Data Science suitable for non-CS students?', answer: 'Yes, students from any background with interest in data and analytics can apply.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    icon: 'TrendingUp',
    description: 'Master tools and techniques for data-driven decision making.',
    skills: ['Excel', 'SQL', 'Power BI', 'Tableau', 'Python', 'Data Reporting'],
    overview:
      'The Data Analytics internship focuses on practical analytics skills using industry-standard tools. You will learn to work with data using Excel, SQL, and visualization platforms like Power BI and Tableau to support data-driven decision making.',
    learningOutcomes: [
      'Work confidently with Excel for data analysis and reporting',
      'Write SQL queries to extract and manipulate data',
      'Build dashboards and reports using Power BI or Tableau',
      'Understand key analytics concepts and KPIs',
      'Perform data cleaning, transformation, and summarization',
      'Present data insights through effective visualizations',
    ],
    projectInfo:
      'Projects involve building analytics reports, dashboards, and presenting business insights from datasets. Assignments simulate real-world analytics scenarios.',
    eligibility: [
      'Open to students from all disciplines',
      'Basic computer skills and familiarity with Excel recommended',
      'No prior coding experience required',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Submit application form',
      'Upload resume',
      'Review and confirmation',
      'Enrollment email',
      'Pay ₹5,000 fee',
      'Start program',
    ],
    faqs: [
      { question: 'Do I need to know coding for Data Analytics?', answer: 'No, the program starts with Excel and SQL which do not require prior coding experience.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security',
    icon: 'Shield',
    description: 'Learn to protect digital systems, networks, and data from threats.',
    skills: ['Network Security', 'Ethical Hacking Basics', 'Cryptography', 'Security Tools', 'Risk Assessment'],
    overview:
      'The Cyber Security internship introduces you to the fundamentals of information security and digital protection. You will explore network security concepts, ethical hacking principles, cryptography basics, and industry-standard security practices.',
    learningOutcomes: [
      'Understand core cyber security concepts and threats',
      'Learn about network security and common vulnerabilities',
      'Explore ethical hacking principles and responsible disclosure',
      'Understand cryptography and secure communication',
      'Work with basic security tools and techniques',
      'Learn about security frameworks and best practices',
    ],
    projectInfo:
      'Projects involve security analysis exercises, vulnerability assessments in controlled environments, and security documentation. All activities are conducted in ethical, legal learning environments.',
    eligibility: [
      'Students from CS, IT, Electronics, or related programs',
      'Basic networking and computer knowledge helpful',
      'Strong interest in security and technology',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Fill application form',
      'Upload resume',
      'Team review',
      'Confirmation email',
      'Pay ₹5,000 fee',
      'Onboarding and program start',
    ],
    faqs: [
      { question: 'Is ethical hacking legal?', answer: 'The program covers ethical hacking concepts in controlled, educational environments only.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    icon: 'Cloud',
    description: 'Understand cloud platforms, services, and deployment strategies.',
    skills: ['Cloud Basics', 'AWS/Azure/GCP', 'Cloud Architecture', 'DevOps Concepts', 'Docker Basics'],
    overview:
      'The Cloud Computing internship introduces you to the world of cloud technology. You will explore major cloud platforms, understand cloud service models, and get hands-on exposure to cloud deployment and management concepts.',
    learningOutcomes: [
      'Understand cloud computing concepts, models, and service types',
      'Get introduced to major cloud platforms (AWS, Azure, GCP)',
      'Explore cloud deployment and architecture fundamentals',
      'Learn about DevOps concepts and cloud-native development',
      'Understand containerization basics with Docker',
      'Work on cloud-related practical exercises',
    ],
    projectInfo:
      'Projects involve cloud architecture design exercises, working with cloud free tiers, and understanding cloud deployment scenarios. Practical exposure to cloud tools is part of the assignments.',
    eligibility: [
      'Students from CS, IT, or engineering programs',
      'Basic understanding of networking and operating systems helpful',
      'Interest in cloud technology and infrastructure',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Submit application form',
      'Upload resume',
      'Application reviewed',
      'Confirmation email',
      'Pay ₹5,000 fee',
      'Program begins',
    ],
    faqs: [
      { question: 'Which cloud platform will I learn?', answer: 'The program covers fundamentals applicable across major platforms including AWS, Azure, and GCP basics.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: 'Palette',
    description: 'Design user-centered interfaces and digital experiences.',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'Design Principles', 'User Research', 'Design Systems'],
    overview:
      'The UI/UX Design internship teaches you the principles and practices of designing digital products that users love. You will learn to create wireframes, prototypes, and high-fidelity designs using Figma, while understanding core UX research and design thinking methodologies.',
    learningOutcomes: [
      'Understand UI/UX design principles and design thinking',
      'Work with Figma for professional UI design',
      'Create wireframes, mockups, and interactive prototypes',
      'Apply color theory, typography, and visual design principles',
      'Conduct basic user research and usability testing',
      'Build a design portfolio with practical projects',
    ],
    projectInfo:
      'Projects include designing interfaces for mobile and web applications, creating design systems, and presenting design rationale. You will build a practical design portfolio through the program.',
    eligibility: [
      'Open to students from all educational backgrounds',
      'Creative interest and aesthetic sensibility helpful',
      'No prior design experience required',
      'Computer with Figma access (free plan available)',
    ],
    applicationProcess: [
      'Fill application form',
      'Upload resume or portfolio (if any)',
      'Review by team',
      'Confirmation email',
      'Pay ₹5,000 fee',
      'Program begins',
    ],
    faqs: [
      { question: 'Do I need any design software?', answer: 'Figma is used and has a free plan sufficient for this program.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'Megaphone',
    description: 'Learn digital marketing strategies, tools, and campaign management.',
    skills: ['SEO', 'Social Media Marketing', 'Google Ads Basics', 'Content Marketing', 'Analytics', 'Email Marketing'],
    overview:
      'The Digital Marketing internship gives you practical experience in online marketing strategies and tools. You will learn SEO, social media marketing, content strategy, and analytics, preparing you for a career in the growing digital marketing field.',
    learningOutcomes: [
      'Understand core digital marketing channels and strategies',
      'Learn SEO principles and on-page optimization techniques',
      'Work with social media marketing and content planning',
      'Get introduced to Google Ads and paid marketing basics',
      'Analyze marketing performance using analytics tools',
      'Develop content marketing and email marketing skills',
    ],
    projectInfo:
      'Projects involve creating digital marketing plans, SEO analysis reports, social media content calendars, and campaign performance analysis. Real-world marketing scenarios form the basis of assignments.',
    eligibility: [
      'Open to students from all disciplines',
      'Interest in marketing, communication, and digital media',
      'Good written communication skills helpful',
      'Computer with internet access',
    ],
    applicationProcess: [
      'Submit application form',
      'Upload resume',
      'Application review',
      'Confirmation email',
      'Pay ₹5,000 fee',
      'Program onboarding',
    ],
    faqs: [
      { question: 'Is Digital Marketing suitable for non-marketing students?', answer: 'Yes, students from any background with interest in marketing can apply.' },
      { question: 'What is the program fee?', answer: 'The program fee is ₹5,000.' },
    ],
    fee: 5000,
  },
];

export function getInternshipBySlug(slug: string): Internship | undefined {
  return internships.find((i) => i.slug === slug);
}
