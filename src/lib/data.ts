

// ─── Personal Info ──────────────────────────
export const personalInfo = {
  name: 'Rahul Raj',
  tagline: '',
  subtitles: [
    '👋 Welcome to My Portfolio',
    '✨ Building the Future',
    '🚀 Turning Ideas Into Reality',
    '💡 Creating Things That Matter',
    '🌍 Solving Real-World Problems',
    '🤝 Let\'s Build Something Amazing',
  ],
  about: `I'm a multidisciplinary systems engineer passionate about designing and building intelligent hardware-software solutions that bridge the physical and digital worlds. With deep expertise in automation, embedded control systems, robotics, and edge intelligence, I build technology that physical machines rely on.

From autonomous robots to real-time embedded logic, I bring complexity to life through clean software, clean layouts, and rigorous system-level engineering. I believe in engineering machines that are not just automated, but truly intelligent.`,
  education: {
    degree: 'B.Tech',
    university: 'UIET, Panjab University',
    year: '2023 - 2027',
    gpa: '8.5 / 10',
  },
  stats: [
    { label: 'Projects Built', value: 25, suffix: '+' },
    { label: 'Technologies', value: 30, suffix: '+' },
    { label: 'Competitions Won', value: 8, suffix: '' },
    { label: 'Years Experience', value: 3, suffix: '+' },
  ],
  resumeUrl: '/resume.pdf',
};

// ─── Skills ─────────────────────────────────
export interface Skill {
  name: string;
  category: string;
  icon?: string;
}

export const skillCategories = [
  'All', 'AI & Machine Learning', 'AI Frameworks', 'Computer Vision & Data', 'Backend & Tools', 'Vector Databases', 'Robotics & Embedded'
];

export const skills: Skill[] = [
  // AI & Machine Learning
  { name: 'Python', category: 'AI & Machine Learning' },
  { name: 'Machine Learning', category: 'AI & Machine Learning' },
  { name: 'Deep Learning', category: 'AI & Machine Learning' },
  { name: 'Generative AI', category: 'AI & Machine Learning' },
  { name: 'RAG', category: 'AI & Machine Learning' },
  { name: 'AI Agents', category: 'AI & Machine Learning' },
  { name: 'LLMs', category: 'AI & Machine Learning' },
  
  // AI Frameworks
  { name: 'LangChain', category: 'AI Frameworks' },
  { name: 'LangGraph', category: 'AI Frameworks' },
  { name: 'Hugging Face', category: 'AI Frameworks' },
  { name: 'TensorFlow', category: 'AI Frameworks' },
  { name: 'PyTorch', category: 'AI Frameworks' },
  { name: 'scikit-learn', category: 'AI Frameworks' },
  
  // Computer Vision & Data
  { name: 'OpenCV', category: 'Computer Vision & Data' },
  { name: 'Pandas', category: 'Computer Vision & Data' },
  { name: 'NumPy', category: 'Computer Vision & Data' },
  
  // Backend & Tools
  { name: 'FastAPI', category: 'Backend & Tools' },
  { name: 'Flask', category: 'Backend & Tools' },
  { name: 'Docker', category: 'Backend & Tools' },
  { name: 'Git', category: 'Backend & Tools' },
  { name: 'GitHub Actions', category: 'Backend & Tools' },
  
  // Vector Databases
  { name: 'ChromaDB', category: 'Vector Databases' },
  { name: 'Pinecone', category: 'Vector Databases' },
  
  // Robotics & Embedded
  { name: 'ESP32', category: 'Robotics & Embedded' },
  { name: 'ROS2', category: 'Robotics & Embedded' },
  { name: 'Gazebo', category: 'Robotics & Embedded' },
  { name: 'PID Control', category: 'Robotics & Embedded' },
  { name: 'Embedded Systems', category: 'Robotics & Embedded' },
];

// ─── Projects ───────────────────────────────
export interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  image: string;
  featured: boolean;
  category: string;
}

export const projects: Project[] = [
  {
    title: 'PUAI – University AI Assistant',
    description: 'An AI-powered university assistant built using Retrieval-Augmented Generation (RAG). The system answers questions from university documents using semantic search, embeddings, and Large Language Models.',
    longDescription: 'Developed an enterprise-ready RAG conversational assistant to resolve student queries from internal documents. Features include a vector embedding pipeline, similarity search indices, chat memory, and context-backed generation with citations.',
    techStack: ['Python', 'LangChain', 'LangGraph', 'Hugging Face', 'ChromaDB', 'LLMs', 'RAG'],
    github: 'https://github.com/shadesof-black/University-RAG',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    featured: true,
    category: 'AI',
  },
  {
    title: 'Movie Recommendation System',
    description: 'A machine learning-based movie recommendation engine that recommends similar movies using content-based filtering and cosine similarity.',
    longDescription: 'Created a content-based filtering model to analyze and rank movies using item descriptors, descriptions, and metadata. Integrated collaborative filtering embeddings and TMDB APIs for real-time recommendation updates and deployed onto Streamlit Cloud.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'TMDB API'],
    github: 'https://github.com/shadesof-black',
    liveDemo: 'https://recomandation---ml-project-fk.streamlit.app/',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    featured: true,
    category: 'AI',
  },
  {
    title: 'Diamond Price Prediction (MLOps)',
    description: 'An end-to-end MLOps project for predicting diamond prices using machine learning, Flask, Docker, CI/CD, and cloud deployment.',
    longDescription: 'Established a full MLOps workflow for a regression model predicting diamond valuation. Implemented automated data ingestion, model validation, containerized deployment using Docker, and automated CI/CD validation checks via GitHub Actions.',
    techStack: ['Python', 'Scikit-learn', 'Flask', 'Docker', 'GitHub Actions', 'CI/CD'],
    github: 'https://github.com/shadesof-black',
    liveDemo: 'https://diamond-price-app-latest.onrender.com/',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638',
    featured: true,
    category: 'AI',
  },
  {
    title: 'Autonomous Line Following Robot',
    description: 'Award-winning autonomous robot built using ESP32, QTR sensor array, and PID control. Secured 1st Position at IIT Mandi and 2nd Position at NIT Kurukshetra.',
    longDescription: 'Developed firmware for a high-speed line tracker using infrared QTR sensor arrays and PID control. Calibrated active sensors dynamically to handle grid intersections and won national recognition.',
    techStack: ['ESP32', 'Embedded Systems', 'PID', 'Robotics', 'Arduino'],
    github: 'https://github.com/shadesof-black',
    image: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f',
    featured: true,
    category: 'Robotics',
  },
  {
    title: 'Gesture-Controlled Prosthetic Arm',
    description: 'A 3D-printed prosthetic arm controlled using EMG sensors and ESP32 for real-time gesture recognition.',
    longDescription: 'Engineered a multi-DOF robotic prosthetic limb controlled by surface electromyography (EMG) muscle signals. Processed raw analog signals to classify hand gestures and mapped commands to actuator servos.',
    techStack: ['ESP32', 'EMG', 'Embedded Systems', 'IoT'],
    github: 'https://github.com/shadesof-black',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
    featured: true,
    category: 'Robotics',
  },
  {
    title: 'Wheat Crop Disease Detection',
    description: 'Deep learning-based computer vision system for detecting wheat crop diseases from leaf images.',
    longDescription: 'Created a CNN-based deep learning classifier using OpenCV and TensorFlow to identify crop pathologies from high-resolution images, optimizing farm diagnostics workflow.',
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'Deep Learning'],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    featured: true,
    category: 'AI',
  },
];

// ─── Social Links ───────────────────────────
export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'leetcode' | 'email' | 'instagram' | 'whatsapp' | 'twitter';
}

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/shadesof-black', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/26-11-rahul-raj', icon: 'linkedin' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/rahul_raj2611/', icon: 'leetcode' },
  { name: 'Email', url: 'mailto:rahulraj11635@gmail.com', icon: 'email' },
  { name: 'Instagram', url: 'https://www.instagram.com/_.shadeofblack_/', icon: 'instagram' },
  { name: 'WhatsApp', url: 'https://wa.me/919693943718', icon: 'whatsapp' },
];

// ─── Navigation ─────────────────────────────
export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

