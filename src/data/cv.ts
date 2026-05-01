export const cv = {
  summary:
    "NVIDIA GEAR Research Engineer working on robotic foundation models, large language models, and vision-language models. Research background spans natural language processing, code generation, instruction robustness, efficient vision networks, and biomedical AI analysis.",
  researchInterests: [
    "Robotic foundation models",
    "Large language models and vision-language models",
    "Natural language processing and generation",
    "Reliable methods for connecting natural language with structured data and task execution",
  ],
  education: [
    {
      institution: "University of Southern California",
      degree: "Honor M.S.",
      period: "Aug. 2021 - May 2023",
      details: [
        "GPA: 4.0/4.0",
        "Relevant coursework: deep learning, probability, linear algebra, parallel computing",
      ],
    },
    {
      institution: "Xidian University",
      degree: "B.E. in Telecommunications Engineering",
      period: "Sep. 2017 - Jun. 2021",
      details: [
        "GPA: 3.6/4.0, Top 10%",
        "Relevant coursework: data structures, calculus, discrete mathematics",
      ],
    },
  ],
  workExperience: [
    {
      organization: "NVIDIA",
      role: "Research Engineer",
      location: "Shanghai, China · On-site",
      period: "Sep. 2025 - Present",
      items: [
        "Work on artificial intelligence and Python systems for robotic foundation models, large language models, and vision-language models for embodied agents.",
        "Contribute to world-action model research for generalist robot policies and cross-embodiment transfer.",
        "Build research systems at the intersection of multimodal foundation models, robot learning, and embodied AI.",
      ],
    },
    {
      organization: "Alibaba Group",
      role: "Algorithm Engineer",
      location: "Hangzhou, China · On-site",
      period: "Feb. 2025 - Jul. 2025",
      items: ["Worked on Python-based algorithm engineering."],
    },
    {
      organization: "01.AI",
      role: "Algorithm Engineer",
      location: "Hangzhou, Zhejiang, China · On-site",
      period: "Oct. 2023 - Jan. 2025",
      items: ["Worked on large language model systems with PyTorch."],
    },
  ],
  researchExperience: [
    {
      organization: "Pennsylvania State University",
      role: "Research collaborator",
      period: "Jun. 2022 - Oct. 2022",
      mentor: "Wenpeng Yin",
      items: [
        "Studied robustness of learning from task instructions.",
        "Experimented with and analyzed instruction-tuned models under perturbed instructions.",
      ],
    },
    {
      organization: "North Carolina State University",
      role: "Research collaborator",
      period: "Aug. 2022 - 2023",
      mentor: "Dongkuan Xu and Xipeng Shen",
      items: [
        "Worked on zero-shot code generation via rule-AI co-learning from documents.",
        "Proposed a framework combining rule-based and AI-based methods to generate DSL code.",
      ],
    },
    {
      organization: "Shanghai Jiao Tong University",
      role: "Research collaborator",
      period: "Apr. 2023 - Jun. 2023",
      mentor: "Pengfei Liu",
      items: [
        "Trained LLaMA-13B through continued pretraining and finetuning on curated math datasets.",
        "Improved model performance on mathematical reasoning tasks.",
      ],
    },
    {
      organization: "University of Southern California",
      role: "Research collaborator",
      period: "Aug. 2022 - Dec. 2022",
      mentor: "Peter A. Beerel",
      items: [
        "Designed visual networks with very low FLOPs.",
        "Proposed and evaluated dilated depthwise convolution for capturing global information.",
      ],
    },
    {
      organization: "Dartmouth College",
      role: "Research collaborator",
      period: "May 2022 - Sep. 2022",
      mentor: "Soroush Vosoughi",
      items: [
        "Analyzed the evolution of artificial intelligence techniques in biomedical publications.",
        "Developed an analysis method for biomedical AI publication trends.",
      ],
    },
    {
      organization: "ETH Zurich",
      role: "Research collaborator",
      period: "Jun. 2020 - Oct. 2020",
      mentor: "Yuyi Wang",
      items: [
        "Designed pre-training tasks for text summarization.",
        "Used learned metrics to identify high-importance sentences as summaries for more effective pre-training.",
      ],
    },
  ],
  industryExperience: [
    {
      organization: "Lime",
      role: "SDE Intern",
      period: "May 2022 - Aug. 2022",
      items: [
        "Improved system scalability by refactoring timed feature extraction and computation.",
        "Optimized timed computations to improve overall system efficiency.",
      ],
    },
    {
      organization: "Transwarp",
      role: "NLP Intern",
      period: "Jan. 2021 - Apr. 2021",
      items: [
        "Designed and implemented a hybrid long-text summarization system.",
        "Combined DGCNN-based extractive summarization with BART-based abstractive refinement.",
      ],
    },
  ],
  teachingExperience: [
    {
      organization: "University of Southern California",
      role: "Teaching Assistant",
      period: "Fall 2022",
      items: ["EE 503: Probability for Electrical and Computer Engineers"],
    },
  ],
  professionalService: [
    "The European Chapter of the ACL (EACL), 2023",
    "ACM International Conference on Web Search and Data Mining (WSDM), 2023",
    "Association for Computational Linguistics (ACL), 2023",
    "Conference on Empirical Methods in Natural Language Processing (EMNLP), 2023",
    "The Association for the Advancement of Artificial Intelligence (AAAI), 2023",
  ],
  awards: [
    {
      title: "Masters Students Honors Program",
      organization: "USC Ming Hsieh Department of Electrical and Computer Engineering",
      year: "2021",
    },
    {
      title: "National Scholarship",
      organization: "Xidian University",
      year: "2018",
    },
  ],
  skills: [
    {
      label: "Programming",
      items: ["Python", "C++", "C", "R", "Java", "SQL", "JavaScript", "HTML", "MATLAB"],
    },
    {
      label: "Frameworks",
      items: ["PyTorch", "TensorFlow", "OpenCV", "NumPy", "Scikit-learn", "SciPy"],
    },
    {
      label: "Tools",
      items: ["Git", "LaTeX", "SPSS", "Mathematica", "AWS", "GCP", "Docker", "MongoDB"],
    },
  ],
  references: "Available upon request.",
} as const;
