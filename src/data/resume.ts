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
        summary: "Ran GRPO post-training experiments for generative robot policies, connecting complete robot attempts, task rewards and shared policy updates. Integrated advantage statistics, collection progress and algorithm-state checkpointing to support training continuation, and iterated on demonstration data and SFT starting policies.",
        technicalNotes: [
          {
            title: "Rollouts and shared policy updates",
            text: "Variable-length, complete robot attempts and task outcomes feed a shared GRPO training core. The integration coordinates collection quotas and optimizer-step boundaries so that robot data collection and policy updates form a consistent training loop.",
          },
          {
            title: "Advantages and training state",
            text: "The training integration supports group-relative, leave-one-out advantages and EMA baselines. Advantage statistics and algorithm state are checkpointed alongside collection progress, allowing training to continue with its state intact.",
          },
        ],
      },
      {
        id: "dagger",
        title: "Online and offline DAgger",
        summary: "Implemented and maintain the DAgger annotation system, supporting multi-camera trajectory review, interval-level action-quality labels and task subgoals. Built data-processing components for multi-platform LeRobot conversion, state–camera alignment and quality-aware online/offline policy training.",
        technicalNotes: [
          {
            title: "Temporal alignment and trimming",
            text: "Camera frames and robot states remain aligned during trajectory conversion. Idle segments at the beginning and end are trimmed while preserving pauses and small motions needed for precise alignment.",
          },
          {
            title: "Data selection and weighting",
            text: "Action quality and action source are assessed separately, including within human takeover trajectories. Quality labels guide the choice of imitation targets; dataset sampling frequency and per-action loss weights are separate controls in quality-weighted behavior cloning.",
          },
        ],
      },
      {
        id: "robots",
        title: "Real-robot adaptation",
        summary: "Adapted policy interfaces across Galaxea R1 Pro, Spirit AI Moz1, AgiBot and YAM, covering observations, actions, datasets and environment wrappers. Integrated RTC on AgiBot G1, coordinating prefix conditioning, inference latency and action queues for asynchronous real-robot execution.",
        technicalNotes: [
          {
            title: "Platform interfaces",
            text: "Observation mappings, gripper and action conversion, dataset adapters and environment wrappers connect each platform's camera, state and action conventions to the learned policy.",
          },
          {
            title: "Asynchronous RTC execution",
            text: "On AgiBot G1, pending actions supply the prefix for the next action chunk while the current queue is consumed. Inference latency is converted to action steps, and positions already consumed during generation are skipped when the continuation is queued.",
          },
        ],
      },
    ],
  },
  {
    role: "Algorithm Engineer",
    organization: "Alibaba Group",
    href: "https://www.alibabagroup.com/",
    location: "Hangzhou, China · On-site",
    period: "Feb. 2025 - Jul. 2025",
    detail: "Worked on a metric-driven automated training loop, connecting large-scale data selection, model training and evaluation. Evaluation feedback updates the data-selection model, with the goal of reducing manual intervention.",
  },
  {
    role: "Algorithm Engineer",
    organization: "01.AI",
    href: "https://www.01.ai/",
    location: "Hangzhou, Zhejiang, China · On-site",
    period: "Oct. 2023 - Jan. 2025",
    detail: "Worked on multimodal generation and understanding: SDXL training across anime, comic-book and cinematic styles, plus data curation and model training for Yi-VL.",
    additionalDetail:
      "Worked on instruction-guided video editing, including long-video clipping and video-quality filtering. The workflow used SFT followed by direct preference optimization (DPO), with human preferences guiding clip selection and sequencing in structured editing plans.",
    technicalNotes: [
      {
        title: "Structured editing and preference data",
        text: "The model takes an instruction and one or more videos as input and produces a JSON editing plan. Human comparisons between two candidate plans for the same input provide paired preference data for DPO training.",
      },
    ],
  },
] as const;
