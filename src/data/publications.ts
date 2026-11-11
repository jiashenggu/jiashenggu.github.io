import { translateFor, type Language } from "./i18n";

export function getPublications(language: Language) {
  const t = translateFor(language);
  return [
    {
      id: "gr00t2",
      shortTitle: "GR00T 2",
      title: "Scaling Robot Foundation Models for Generalization, Dexterity, and Adaptation",
      metadata: t("NVIDIA whitepaper · Nov 2026 · Contributor · NVIDIA GEAR", "NVIDIA 白皮书 · 2026 年 11 月 · 贡献者 · NVIDIA GEAR"),
      description: t(
        "GR00T 2 is a new generation of world action models that predict future video and robot actions together and run on parallel grippers, dexterous hands and humanoids. It was announced at CoRL 2026; my contributions are in RL post-training, DAgger data pipelines and real-robot adaptation.",
        "GR00T 2 是新一代世界动作模型，联合预测未来视频与机器人动作，可运行于平行夹爪、灵巧手和人形机器人，于 CoRL 2026 发布。我的贡献集中在强化学习后训练、DAgger 数据流程与真机适配。",
      ),
      paper: { label: t("Whitepaper", "白皮书"), href: "https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf" },
      project: { label: t("Project", "项目主页"), href: "https://research.nvidia.com/labs/gear/gr00t-2/" },
    },
    {
      id: "dreamzero",
      shortTitle: "DreamZero",
      title: "World Action Models are Zero-shot Policies",
      metadata: t("CoRL 2026 · Co-author · NVIDIA GEAR", "CoRL 2026 · 共同作者 · NVIDIA GEAR"),
      description: t(
        "DreamZero is a 14B world action model built on a pretrained video diffusion backbone.",
        "DreamZero 是一个基于预训练视频扩散骨干构建的世界动作模型，拥有 140 亿参数。",
      ),
      paper: { label: t("Paper", "论文"), href: "https://arxiv.org/abs/2602.15922" },
      project: { label: t("Project", "项目主页"), href: "https://dreamzero0.github.io/" },
      code: { label: t("Code", "代码"), href: "https://github.com/dreamzero0/dreamzero" },
    },
    {
      id: "language-research",
      title: "Robustness of Learning from Task Instructions",
      metadata: t(
        "Earlier academic research · Findings of ACL 2023 · First author",
        "早期学术研究 · Findings of ACL 2023 · 第一作者",
      ),
      description: t(
        "In earlier language-model research, I studied how instruction-following models generalize when task instructions are paraphrased, manipulated or made more or less concise.",
        "在早期的语言模型研究中，我研究了当任务指令被改写、修改或调整详略程度时，指令遵循模型的泛化表现。",
      ),
      paper: { label: t("ACL Anthology", "ACL 论文库"), href: "https://aclanthology.org/2023.findings-acl.875/" },
      pdf: { label: t("Paper PDF", "论文 PDF"), href: "https://aclanthology.org/2023.findings-acl.875.pdf" },
    },
  ] as const;
}
