import React from "react"
import styled from "styled-components"

import authentication from "src/assets/svg/undraw_authentication.svg"
import business_plan from "src/assets/svg/undraw_business_plan.svg"
import code_review from "src/assets/svg/undraw_code_review.svg"
import code_thinking from "src/assets/svg/undraw_code_thinking.svg"
import code_typing from "src/assets/svg/undraw_code_typing.svg"
import creative_experiment from "src/assets/svg/undraw_creative_experiment.svg"
import completed_steps from "src/assets/svg/undraw_completed_steps.svg"
import design_thinking from "src/assets/svg/undraw_design_thinking.svg"
import dev_focus from "src/assets/svg/undraw_dev_focus.svg"
import developer_activity from "src/assets/svg/undraw_developer_activity.svg"
import exams from "src/assets/svg/undraw_exams.svg"
import fastapi from "src/assets/svg/up_and_running_with_fastapi.svg"
import food from "src/assets/svg/undraw_environment.svg"
import full_stack from "src/assets/svg/undraw_server_cluster.svg"
import experience_design from "src/assets/svg/undraw_experience_design.svg"
import undraw_functions from "src/assets/svg/undraw_functions.svg"
import goals from "src/assets/svg/undraw_goals.svg"
import good_team from "src/assets/svg/undraw_good_team.svg"
import hacker_mindset from "src/assets/svg/undraw_hacker_mindset.svg"
import health_fitness from "src/assets/svg/undraw_health_fitness.svg"
import investing from "src/assets/svg/undraw_investing.svg"
import marketing from "src/assets/svg/undraw_marketing.svg"
import monitor from "src/assets/svg/undraw_monitor.svg"
import multitasking from "src/assets/svg/undraw_multitasking.svg"
import not_found from "src/assets/svg/undraw_page_not_found.svg"
import personal_growth from "src/assets/svg/undraw_personal_growth.svg"
import personal_trainer from "src/assets/svg/undraw_personal_trainer.svg"
import photography from "src/assets/svg/undraw_photography.svg"
import polaroid from "src/assets/svg/undraw_polaroid.svg"
import programmer from "src/assets/svg/undraw_programmer.svg"
import undraw_online_test from "src/assets/svg/undraw_online_test.svg"
// import programming from 'src/assets/svg/undraw_programming.svg'
import react_svg from "src/assets/svg/undraw_react.svg"
import recording from "src/assets/svg/undraw_recording.svg"
// import secure_login from "src/assets/svg/undraw_secure_login.svg"
import security from "src/assets/svg/undraw_security.svg"
import servers from "src/assets/svg/undraw_server_status.svg"
import site_content from "src/assets/svg/undraw_site_content.svg"
import static_website from "src/assets/svg/undraw_static_website.svg"
import web_developer from "src/assets/svg/undraw_web_developer.svg"
import teacher from "src/assets/svg/undraw_teacher.svg"
import version_control from "src/assets/svg/undraw_version_control.svg"

const StyledImg = styled.img``

interface IBlogCategorySVG {
  category: string
  style?: Record<string, any>
}
const BlogCategorySVG: React.FC<IBlogCategorySVG> = (props) => {
  let svg
  switch (props.category) {
    // case "Backend":
    //   svg = dev_focus
    //   break
    case "Authentication":
      svg = authentication
      break
    case "FastAPI":
      svg = fastapi
      break
    case "Security":
      svg = security
      break
    case "Python":
      svg = dev_focus
      // svg = code_thinking
      break
    case "Code Review":
      svg = code_review
      break
    case "Code Thinking":
      svg = code_thinking
      break
    case "Code Typing":
      svg = code_typing
      break
    case "DevOps":
      svg = completed_steps
      break
    case "Hacker Mindset":
      svg = hacker_mindset
      break
    case "Business":
      svg = business_plan
      break
    case "Creativity":
      svg = creative_experiment
      break
    case "Course Review":
      svg = creative_experiment
      break
    case "Design":
      svg = design_thinking
      break
    case "Full Stack":
      svg = full_stack
      break
    case "Programming":
      svg = developer_activity
      break
    case "Learning":
      svg = exams
      break
    // case 'Experience Design':
    case "Simulations and Visualizations":
      svg = experience_design
      break
    case "Data Science":
      svg = undraw_functions
      break
    case "Productivity":
      svg = goals
      break
    case "Teamwork":
      svg = good_team
      break
    case "Health & Fitness":
      svg = health_fitness
      break
    case "Cooking & Food":
      svg = food
      break
    case "Marketing":
      svg = marketing
      break
    case "Statistics":
      svg = investing
      break
    case "Solutions":
      svg = monitor
      break
    case "Self Improvement":
      svg = multitasking
      break
    case "Personal Development":
      svg = personal_growth
      break
    case "Personal Training":
      svg = personal_trainer
      break
    case "Photography":
      svg = photography
      break
    case "Programmer":
      svg = programmer
      break
    case "Advanced Photography":
      svg = polaroid
      break
    case "React":
      svg = react_svg
      break
    case "Web Development":
      svg = static_website
      break
    case "Databases":
      // svg = programming
      svg = servers
      break
    case "Music":
      svg = recording
      break
    case "Site Design":
      // case 'Simulations and Visualizations':
      svg = site_content
      break
    case "Teaching":
      svg = teacher
      break
    case "Tech":
      svg = version_control
      break
    case "Testing":
      svg = undraw_online_test
      break
    case "Web Developer":
      svg = web_developer
      break
    default:
      svg = not_found
      break
    // svg = dev_focus
  }

  return <StyledImg src={svg} alt="undraw svg icon" {...props} />
}

export default BlogCategorySVG
