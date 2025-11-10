import { LessonStep, Topic, Unit } from "../types/lesson";

export const buildStepsForTopic = (
  unit: Unit,
  topic: Topic
): LessonStep[] => {
  const baseId = topic.id.replace(".", "-");
  return [
    {
      id: `${topic.id}-step1`,
      label: "观看导学视频",
      type: "video",
      description: "短片讲解重点脉络，建议先看视频再阅读笔记。",
      videoSrc: `/videos/unit${unit.id}/${baseId}-intro.mp4`,
      durationLabel: "约 5-10 分钟",
    },
    {
      id: `${topic.id}-step2`,
      label: "阅读笔记",
      type: "notes",
      description: "完整图文笔记，涵盖考试关键词与案例。",
      contentId: topic.id,
    },
  ];
};
