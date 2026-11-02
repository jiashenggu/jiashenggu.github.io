export const education = [
  {
    degree: "M.S. in Electrical and Computer Engineering (Machine Learning and Data Science)",
    institution: "University of Southern California",
    period: "Aug. 2021 - May 2023",
  },
  {
    degree: "B.E. in Telecommunications Engineering",
    institution: "Xidian University",
    period: "Sep. 2017 - Jun. 2021",
  },
] as const;

export const workExperience = [
  {
    role: "Research Engineer",
    organization: "NVIDIA",
    href: "https://www.nvidia.com/",
    location: "Shanghai, China · On-site",
    period: "Sep. 2025 - Present",
    detail: "Generative robot policies: GRPO, online/offline DAgger and real-robot adaptation.",
    highlights: [
      {
        id: "grpo",
        title: "GRPO post-training",
        summary: "Connected complete robot attempts to shared GRPO policy updates.",
        detail:
          "Robot attempts vary in length and need consistent grouping for GRPO updates. I connected complete-attempt collection to the shared training core, with leave-one-out advantages, EMA baselines and per-task return normalization. Collection quotas, optimizer-step boundaries and algorithm state are saved for continuation.",
      },
      {
        id: "dagger",
        title: "Online and offline DAgger",
        summary: "Connected robot rollouts and human annotations to online and offline policy updates.",
        detail:
          "I built components that turn robot rollouts and human annotations into training data for online and offline DAgger. Online workflows connect collection to policy updates; offline iterations aggregate demonstration and takeover trajectories. Quality-weighted training, controlled sampling and fixed-data replay support comparisons of training recipes, including lighting-consistency objectives.",
      },
      {
        id: "robots",
        title: "Real-robot adaptation",
        summary: "Adapted learned policies to the data and execution interfaces of four robot platforms.",
        detail:
          "Different robots expose different camera, state and action conventions. I adapted policies for Galaxea R1 Pro, Spirit AI Moz1, AgiBot and YAM through observation mappings, gripper/action conversion, dataset interfaces and environment wrappers. I integrated training-time RTC policies with asynchronous execution: training uses a clean action prefix and suffix-only denoising loss; inference fixes the pending action prefix while generating the continuation.",
      },
    ],
  },
  {
    role: "Algorithm Engineer",
    organization: "Alibaba Group",
    href: "https://www.alibabagroup.com/",
    location: "Hangzhou, China · On-site",
    period: "Feb. 2025 - Jul. 2025",
    detail: "Multimodal AI.",
  },
  {
    role: "Algorithm Engineer",
    organization: "01.AI",
    href: "https://www.01.ai/",
    location: "Hangzhou, Zhejiang, China · On-site",
    period: "Oct. 2023 - Jan. 2025",
    detail: "SDXL training; data curation and model training for Yi-VL.",
  },
] as const;
