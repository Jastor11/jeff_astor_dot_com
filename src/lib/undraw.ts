import authentication from "../assets/svg/undraw_authentication.svg"
import business_plan from "../assets/svg/undraw_business_plan.svg"
import code_review from "../assets/svg/undraw_code_review.svg"
import code_thinking from "../assets/svg/undraw_code_thinking.svg"
import code_typing from "../assets/svg/undraw_code_typing.svg"
import creative_experiment from "../assets/svg/undraw_creative_experiment.svg"
import completed_steps from "../assets/svg/undraw_completed_steps.svg"
import design_thinking from "../assets/svg/undraw_design_thinking.svg"
import dev_focus from "../assets/svg/undraw_dev_focus.svg"
import developer_activity from "../assets/svg/undraw_developer_activity.svg"
import exams from "../assets/svg/undraw_exams.svg"
import fastapi from "../assets/svg/up_and_running_with_fastapi.svg"
import food from "../assets/svg/undraw_environment.svg"
import full_stack from "../assets/svg/undraw_server_cluster.svg"
import experience_design from "../assets/svg/undraw_experience_design.svg"
import undraw_functions from "../assets/svg/undraw_functions.svg"
import goals from "../assets/svg/undraw_goals.svg"
import good_team from "../assets/svg/undraw_good_team.svg"
import hacker_mindset from "../assets/svg/undraw_hacker_mindset.svg"
import health_fitness from "../assets/svg/undraw_health_fitness.svg"
import investing from "../assets/svg/undraw_investing.svg"
import marketing from "../assets/svg/undraw_marketing.svg"
import monitor from "../assets/svg/undraw_monitor.svg"
import multitasking from "../assets/svg/undraw_multitasking.svg"
import not_found from "../assets/svg/undraw_page_not_found.svg"
import personal_growth from "../assets/svg/undraw_personal_growth.svg"
import personal_trainer from "../assets/svg/undraw_personal_trainer.svg"
import photography from "../assets/svg/undraw_photography.svg"
import polaroid from "../assets/svg/undraw_polaroid.svg"
import programmer from "../assets/svg/undraw_programmer.svg"
import testing from "../assets/svg/undraw_online_test.svg"
import react_svg from "../assets/svg/undraw_react.svg"
import recording from "../assets/svg/undraw_recording.svg"
import security from "../assets/svg/undraw_security.svg"
import servers from "../assets/svg/undraw_server_status.svg"
import site_content from "../assets/svg/undraw_site_content.svg"
import static_website from "../assets/svg/undraw_static_website.svg"
import web_developer from "../assets/svg/undraw_web_developer.svg"
import teacher from "../assets/svg/undraw_teacher.svg"
import version_control from "../assets/svg/undraw_version_control.svg"

export const undrawImageAssetMapping = {
  authentication: authentication,
  business_plan: business_plan,
  code_review: code_review,
  code_thinking: code_thinking,
  code_typing: code_typing,
  creative_experiment: creative_experiment,
  completed_steps: completed_steps,
  design_thinking: design_thinking,
  dev_focus: dev_focus,
  developer_activity: developer_activity,
  exams: exams,
  fastapi: fastapi,
  food: food,
  full_stack: full_stack,
  experience_design: experience_design,
  undraw_functions: undraw_functions,
  goals: goals,
  good_team: good_team,
  hacker_mindset: hacker_mindset,
  health_fitness: health_fitness,
  investing: investing,
  marketing: marketing,
  monitor: monitor,
  multitasking: multitasking,
  not_found: not_found,
  personal_growth: personal_growth,
  personal_trainer: personal_trainer,
  photography: photography,
  polaroid: polaroid,
  programmer: programmer,
  testing: testing,
  react_svg: react_svg,
  recording: recording,
  security: security,
  servers: servers,
  site_content: site_content,
  static_website: static_website,
  web_developer: web_developer,
  teacher: teacher,
  version_control: version_control,
} as const

export const undrawMapping = {
  authentication: "undraw_authentication.svg",
  business_plan: "undraw_business_plan.svg",
  code_review: "undraw_code_review.svg",
  code_thinking: "undraw_code_thinking.svg",
  code_typing: "undraw_code_typing.svg",
  creative_experiment: "undraw_creative_experiment.svg",
  completed_steps: "undraw_completed_steps.svg",
  design_thinking: "undraw_design_thinking.svg",
  dev_focus: "undraw_dev_focus.svg",
  developer_activity: "undraw_developer_activity.svg",
  exams: "undraw_exams.svg",
  fastapi: "up_and_running_with_fastapi.svg",
  food: "undraw_environment.svg",
  full_stack: "undraw_server_cluster.svg",
  experience_design: "undraw_experience_design.svg",
  undraw_functions: "undraw_functions.svg",
  goals: "undraw_goals.svg",
  good_team: "undraw_good_team.svg",
  hacker_mindset: "undraw_hacker_mindset.svg",
  health_fitness: "undraw_health_fitness.svg",
  investing: "undraw_investing.svg",
  marketing: "undraw_marketing.svg",
  monitor: "undraw_monitor.svg",
  multitasking: "undraw_multitasking.svg",
  not_found: "undraw_page_not_found.svg",
  personal_growth: "undraw_personal_growth.svg",
  personal_trainer: "undraw_personal_trainer.svg",
  photography: "undraw_photography.svg",
  polaroid: "undraw_polaroid.svg",
  programmer: "undraw_programmer.svg",
  testing: "undraw_online_test.svg",
  react_svg: "undraw_react.svg",
  recording: "undraw_recording.svg",
  security: "undraw_security.svg",
  servers: "undraw_server_status.svg",
  site_content: "undraw_site_content.svg",
  static_website: "undraw_static_website.svg",
  web_developer: "undraw_web_developer.svg",
  teacher: "undraw_teacher.svg",
  version_control: "undraw_version_control.svg",
} as const

export type UndrawMapping = typeof undrawMapping
export type UndrawSvgName = keyof UndrawMapping

export const UndrawSvgNames = Object.fromEntries(Object.keys(undrawMapping).map((key) => [key, key])) as {
  [key in UndrawSvgName]: UndrawSvgName
}

export const categoryToUndrawMapping: Record<string, UndrawSvgName> = {
  Authentication: "authentication",
  "Business Plan": "business_plan",
  "Code Review": "code_review",
  "Code Thinking": "code_thinking",
  "Code Typing": "code_typing",
  // "Completed Steps": "completed_steps",
  "Cooking & Food": "food",
  "Course Review": "creative_experiment",
  Creativity: "creative_experiment",
  Databases: "servers",
  "Data Science": "undraw_functions",
  DevOps: "completed_steps",
  Design: "design_thinking",
  FastAPI: "fastapi",
  "Full Stack": "full_stack",
  "Health & Fitness": "health_fitness",
  Learning: "exams",
  Marketing: "marketing",
  "Personal Training": "personal_trainer",
  Photography: "photography",
  Productivity: "goals",
  Programming: "developer_activity",
  Programmer: "programmer",
  Python: "dev_focus",
  React: "react_svg",
  Security: "security",
  "Self Improvement": "multitasking",
  "Site Design": "site_content",
  "Simulations and Visualizations": "experience_design",
  Solutions: "monitor",
  Statistics: "investing",
  Teamwork: "good_team",
  Teaching: "teacher",
  Tech: "version_control",
  Testing: "testing",
  "Web Development": "static_website",
  "Web Developer": "web_developer",
  //
  NOT_FOUND: "not_found",
} as const

export function getUndrawSvgNameFromCategory(category: keyof typeof categoryToUndrawMapping): string {
  const undrawSvgName = categoryToUndrawMapping?.[category]
  const undrawSvgUrl = undrawMapping?.[undrawSvgName]
  return undrawSvgUrl
}
