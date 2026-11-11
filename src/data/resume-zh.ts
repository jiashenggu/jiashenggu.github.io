import { education, workExperience } from "./resume";

export const educationZh = [
  {
    ...education[0],
    degree: "电子与计算机工程硕士（机器学习与数据科学方向）",
    institution: "南加州大学",
    period: "2021年8月—2023年5月",
  },
  {
    ...education[1],
    degree: "通信工程学士",
    institution: "西安电子科技大学",
    period: "2017年9月—2021年6月",
  },
] as const;

export const workExperienceZh = [
  {
    ...workExperience[0],
    role: "研究工程师",
    organization: "英伟达",
    location: "中国上海 · 现场办公",
    period: "2025年9月—至今",
    detail: "面向 NVIDIA GR00T 2 的生成式机器人策略：GRPO、在线与离线 DAgger，以及真机适配。",
    highlights: [
      {
        id: "grpo",
        title: "GRPO 后训练",
        summary: "负责生成式机器人策略的 GRPO 后训练实验，将完整任务回合、奖励反馈接入共享策略更新流程。集成优势统计、采集进度与算法状态保存，支持训练续跑，并结合示范数据与 SFT 起点迭代开展策略优化。",
        technicalNotes: [
          {
            title: "完整回合与共享策略更新",
            text: "将变长的完整机器人尝试及任务结果接入共享 GRPO 训练核心。集成工作协调采集配额与优化器更新边界，使真机数据采集和策略更新形成一致的训练闭环。",
          },
          {
            title: "优势计算与训练状态",
            text: "训练集成支持组内相对优势、留一法和指数移动平均（EMA）基线。优势统计、算法状态与采集进度一并保存，使训练能够保留完整状态继续运行。",
          },
        ],
      },
      {
        id: "dagger",
        title: "在线与离线 DAgger",
        summary: "实现并持续维护 DAgger 标注系统，支持多相机轨迹查看、帧区间动作质量标注与任务子目标标记。构建多平台 LeRobot 数据转换、状态与相机对齐等处理组件，为基于动作质量的在线与离线策略训练提供支持。",
        technicalNotes: [
          {
            title: "时序对齐与裁剪",
            text: "轨迹转换过程中保持相机帧与机器人状态对齐。裁剪首尾空闲片段，同时保留精确对准所需的停顿与微小动作。",
          },
          {
            title: "数据筛选与权重",
            text: "动作质量与动作来源分别判断，人工接管轨迹也不例外。质量标签用于筛选适合模仿的动作；在质量加权行为克隆中，数据采样频率与逐动作损失权重分别控制。",
          },
        ],
      },
      {
        id: "robots",
        title: "真实机器人适配",
        summary: "适配 Galaxea R1 Pro、Spirit AI Moz1、AgiBot 和 YAM 四种平台的观测、动作、数据集与环境接口。在 AgiBot G1 上集成 RTC，协调前缀条件、推理延迟和动作队列，实现策略推理与真机执行的异步衔接。",
        technicalNotes: [
          {
            title: "平台接口",
            text: "通过观测映射、夹爪与动作转换、数据集适配和环境封装，将各平台的相机、状态与动作约定连接到学习策略。",
          },
          {
            title: "RTC 异步执行",
            text: "在 AgiBot G1 上，当前动作队列被消费的同时，待执行动作作为下一动作块的前缀条件。推理延迟换算为动作步数；续段入队时跳过生成期间已经消费的时间位置。",
          },
        ],
      },
    ],
  },
  {
    ...workExperience[1],
    role: "算法工程师",
    organization: "阿里巴巴",
    location: "中国杭州 · 现场办公",
    period: "2025年2月—2025年7月",
    detail: "研发指标驱动的自动训练闭环，串联大规模数据筛选、模型训练与评估，并基于评估反馈迭代更新数据选择模型，以减少人工干预。",
  },
  {
    ...workExperience[2],
    role: "算法工程师",
    organization: "零一万物（01.AI）",
    location: "中国杭州 · 现场办公",
    period: "2023年10月—2025年1月",
    detail: "参与多模态生成与理解模型的训练：开展 SDXL 训练，覆盖二次元、美漫和电影等风格，并参与 Yi-VL 的数据筛选与模型训练。",
    additionalDetail:
      "参与指令驱动的视频剪辑工作，包括长视频裁剪与视频质量筛选。训练流程采用 SFT 和直接偏好优化（DPO），通过人工偏好优化结构化剪辑方案中的片段选择与编排。",
    technicalNotes: [
      {
        title: "结构化剪辑与偏好数据",
        text: "模型以用户指令和一个或多个视频为输入，输出 JSON 格式的剪辑方案。人工比较同一输入下的两个候选方案，为 DPO 训练提供成对的偏好数据。",
      },
    ],
  },
] as const;
