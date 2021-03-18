---
title: "How to Run a Coding Bootcamp in a High School Classroom"
category: "Teaching"
date: 2019-03-27
published: "true"
slug: "how-to-run-a-coding-bootcamp-in-a-high-school-classroom"
tags:
    - teaching
    - learning
    - instruction strategies
---

Over the last 5 years, I've had opportunities to teaching coding to high schoolers, middle schoolers, college students, future web-dev professionals, and ex-prisoners. At the end of each course or workshop, I inevitably get the question, "So where do I go from here?".

In 2013 there were a few online platforms that bloggers and chatrooms were optimistic about - Codecademy and The Odin Project in particular. I'd usually recommend one and encourage them to explore any digital resources they found interesting.

<figure style="float: right; margin: 0 0 10px 40px">
  <img src="https://upload.wikimedia.org/wikipedia/en/d/d7/Codecademy-home.png" alt="codecademy landing page" />
  <figcaption>The Codecademy landing page</figcaption>
</figure>

But today we're nearing two decades since the turn of the millennium. There has never been a better time to dive headfirst into computer programming. Codecademy has only gotten better (along with adding pro features), Khan Academy has added multiple courses in programming and computer science, and we've seen the birth of FreeCodeCamp - a staple for newbies looking to learn coding online. All this without mentioning the plethora of coding articles and tutorials available on medium and other content publishing websites.

## Bootcamp

This trend has done wonders for autodidacts and teachers alike. At my high school, I've leveraged each of these tools to create a bootcamp for my Intro to Programming course.

During the first two months of the 2nd semester, students chart their own path by selecting activities from a number of online content providers and track their progress each day. When they've completed certain milestones, they have the opportunity to take assessments aimed at demonstrating mastery of the skills they're practicing.

The tech stack to keep this whole system running is almost all Google Apps for Education. I'll break down the essentials here.

### The Content

First, decide which skills you want your students to master. For my class, I went with the basics of web development. That means HTML, CSS, and JavaScript fundamentals along with modern design principles. This seemed like the logical step after first semester. We began the year with an introduction to building websites with HTML and CSS and then transitioned into drawing with the p5.js library. 

**Khan Academy** is the perfect compliment here as they offer an Intro to Programming course using processing.js, as well as their HTML and CSS intro course. Students who enjoy significant guidance will benefit from this course as Khan Academy intermixes video lessons, practice questions, and code challenges very nicely.

**Codecademy** is another option and students who like to put headphones in, read the challenge, and then do their best to complete them gravitate towards this platform. 

**FreeCodeCamp** (FCC) is the most extensive and can often be the most difficult, but I've found students who feel somewhat comfortable with web dev concepts excel at these challenges. Over the last couple years, the team at FCC added content for backend JavaScript, React.js, and D3 - making them a truly valuable resource for any budding software engineer.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/FreeCodeCamp_logo.png" alt="FreeCodeCamp logo" />
  <figcaption>FreeCodeCamp logo in all its simplistic glory</figcaption>
</figure>


**YouTube** offers a plethora of coding tutorials as well and I put a playlist of 40 videos teaching HTML and CSS fundamentals in the Google Form. Students watch the videos, code along on c9.io, and end up with a full website.

FCC and Khan Academy do the best job in providing actionable data to assess what students are working on and when they've completed each challenge. These services act as a solid monitoring platform, but I've found they're not enough. To get a full grasp on what your kids are doing over the course of the bootcamp, have them self report their progress.

Students choose the activities they'd like to work on each day, and then mark the activities they've completed in a Google Form at the end of the period. All of their submission data is sent to a Google Sheet where I run some formulas that automate the analytics.

### The Submission Repository

Storing students' submission data in a Google Sheet serves three purposes.

1. Keep a timestamped record of every activity students have worked on individually.
2. Provide aggregate data on which content areas students are focusing on week-to-week.
3. Create charts, graphs, and tables that can be shared with the class to gamify and motivate.

Developing a system that aggregates responses properly turned out to be the trickiest part. My current system uses a Google Form with the following layout:

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdRFQb_0yQdZiZKSP3kBrqvRhuWWiQX9AfluSf6YN5YrsdBCg/viewform?embedded=true" width="640" height="1000" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>

Every time students submit, they must include their student ID, first name, and last name. This is because they often misspell their names, and use multiple emails when submitting their work. I have to uniquely identify the student for each submission and this has proven to be the least labor-intensive way to do that.

Below that, the form is sectioned off into each content provider.

For Khan Academy and Codecademy, I listed out each module and lesson individually. FreeCodeCamp has too many challenges to handle in that way. Instead I just have students use their FCC public profiles to record how many challenges they had started and ended with each day.

There are also locations to checkmark watching my YouTube video lessons (feel free to substitute in your own playlist and lessons here), and any reading or summary materials they took advantage of. At the end of the form, there is a place for students to submit any assessments they complete.

Each submission comes in as a row in the Google Sheet, with each cell containing either a comma-separated list of lessons the student has finished, names and links for assessments the student has taken, or a number representing the FCC challenges they've started and completed.

### Data Processing

Because the Google Form is composed primarily of checkboxes, it's important do some data processing on the back end.

First, create a sheet that will process the data for each learning platform. For example, I create 'Khan Academy Data', 'Codecademy Data', 'FCC Data', 'YouTube Data', and 'Assessment Data' sheets at the start. I also create a 'Student Roster' sheet that holds the IDs, names, grades, and emails of the entire school. This will come in handy later.

Then, in the first cell of the *2ND COLUMN* of each sheet, paste in a formula that queries the submission sheet for only lessons related to that platform. Here's an example of what would go in my FreeCodeCamp Sheet.

```javascript
=QUERY('Student Submissions'!A1:AF, "SELECT A, B, C, D, AE, AF where AE is not null and AF is not null ")
```

There's a better way to do this with the `=FILTER()` method, but for topics with only two inputs, this will do just fine. Also it may be helpful to remove duplicate submissions (students often submit the same activity 3,4,10 times in a row).

In the *1ST COLUMN* create a row for 'Calculated ID' and insert this formula:

```javascript
=IF(
  ISERROR(VLOOKUP(
    $C2,'Student Roster'!$A$2:$G, 7, FALSE
  )),
  VLOOKUP(
    trim(lower($D2))&"*"&trim(lower($E2))&"*",'Student Roster'!$F$2:$G$600, 2, FALSE
  ),
  $C2
)
```

This is slightly more complicated, so let me break it down. First, it checks to see if it can lookup the submitted ID in the 'Student Roster' sheet. In the case of no error, just enter the ID. If there's an error, then it takes the submitted first and last name, lowercases them, trims the whitespace, and looks up the ID using two reference columns in the 'Student Roster' sheet.

The calculated ID starts each row so that we can uniquely identify the student associated with each submission.

With that info in hand, we can now aggregate the data. For FreeCodeCamp, I just query for the maximum number of completed challenges each student has, and sort them in descending order.

The formula looks like this:

```javascript
=QUERY(A$2:$G, "SELECT A, D, E, max(G) group by A, D, E order by max(G) desc limit 20")
```

Now we have a 4-column output that is easily transformed into a top 20 leaderboard bar graph.

For platforms like Khan Academy, Codecademy, and YouTube, the process is slightly more complicated. First, get a unique list of completed lessons, activities, or videos. Then, assign a point value to each lesson and calculate each student's score before creating a top 20 leaderboard.

In the end, the entire submission repo Google Sheet will look something like this:

<iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSXFY_64iVTKJjd5kGYurZmpnlaGIJpOuqrQvpFJPRs0u0jq7ySIqpIL6ItiAVNyPFAjM53me2aRwQl/pubhtml?widget=true&amp;headers=false" width="960" height="569" allowfullscreen="true"></iframe>


### How to Start, Facilitate, and End Bootcamp

Running the bootcamp itself might seem like the easy part, and it often is. However, I've found that implementing a few simple strategies can have a profound impact on how hard students will work for you. Find your own systems and run them with fidelity. Here are mine.

#### At The Start

Motivate students by framing the bootcamp period as a means to teach them how to learn.

I start the bootcamp at the beginning of 2nd semester so that we can review the final exam from semester 1. We go over each question and students grade their own exams (I've already graded them, but it's good practice to have them assess themselves). Then, students reflect on the concepts they performed well on, and the ones they struggled with most deeply.

We then discuss the results. I explain to them that by this time in their learning journey, I don't expect them to have mastered every concept. In fact, it's acceptable to assume they've forgotten much of what they've learned. The lesson then transitions into a discussion on the famous <a src="https://en.wikipedia.org/wiki/Forgetting_curve">forgetting curve</a>.

<figure style="">
  <img style="border: none; padding: 20px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/ForgettingCurve.svg/400px-ForgettingCurve.svg.png" alt="The forgetting curve." />
  <figcaption>The forgetting curve. Students forget almost 50% of what they've learned within 20 minutes and almost 75% within 3 days.</figcaption>
</figure>

I show students the wikipedia page on the forgetting curve and we go over strategies shown to improve our ability to retain content. As a class, we outline the effects of <a href="https://en.wikipedia.org/wiki/Spaced_repetition" >spaced repetition learning</a> and talk about how we'll implement it in this course. By revisiting content continuously and testing ourselves over spaced-out intervals, we can reduce the amount of knowledge forgotten and commit concepts to long-term memory.

Here's the Google Slides I use for this week:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRi4bWUNqcWlWZKHJZlbaVenNSRARvjvog4aASGvWTI8LUOgIxY-qwufYop4owhPFlfN0HasRf8q4jx/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

Having appropriately framed this bootcamp as an opportunity to teach students how to learn optimally, I then move into the content and assessment options available to them. Each student fills out an action plan detailing what content they'd like to focus on, and a projected calendar for when they'd like to complete each assessment. At the end, I let them know that the whole class will take one final assessment when the bootcamp is done to see how much they've grown.

Afterwards, we start the show.

#### Facilitating Bootcamp

At the beginning of each week, show a public version of the student leaderboard (either with names or with only IDs). Celebrate high achieving students and talk about some of the difficulties students have come up against.

Conference with individual students at least once every two weeks and show them a timeline graph of what they've worked on each day. Ask them if they need to adjust any part of their project timeline and if there's any mini-lessons they would like you to teach. If you recognize any patterns, address them with small group lectures.

Students who whip through the content should be moved to assessment and projects as quickly as possible. Culminating projects capture and highlight many of the things students have mastered, and should be a focal point of the bootcamp.

Here are a few HTML and CSS projects that have worked really well for me:

**Re-creations**

1. Wikipedia Topic Page (easiest) (re-create something like this: https://en.wikipedia.org/wiki/Front-end_web_development, not everything - just most of it)
2. Instagram Profile Page (medium) (exemplar: https://codepen.io/jastor11-the-decoder/pen/ZPMOxK or something like it)
3. AirBnB Booking Page (harder) (re-create this: https://www.airbnb.com/rooms/plus/3563679 or something like it)

**On Your Own**

4. Personal Portfolio Project (find some exemplars on codepen - there are a ton) (specifications: follow the freecodecamp guidelines, loosely. https://learn.freecodecamp.org/responsive-web-design/responsive-web-design-projects/build-a-personal-portfolio-webpage )
5. Build a Product Landing Page (exemplar: https://codepen.io/jastor11-the-decoder/pen/NJMXqY) (honestly, just find a post on dribbble that showcases a product and try to build it. Look here: https://dribbble.com/tags/landing_page).
6. Build a Non-Profit Landing Page (exemplars can be found on codepen as well)

#### Concluding the Bootcamp

At the end, make sure to tell students you're proud of them. Proud of how hard they've worked, proud of how they've struggled, and proud of how they've grown.

Showcase some of the premier projects and assessments created during the bootcamp and compare them to finished work from first semester. Show students how far they've come. It's a powerful thing. Let them know that it doesn't have to stop here. They can take this same system and apply it to whatever concept they'd like to learn.

Then give them one final assessment that mirrors concepts from the bootcamp. Scan all student tests into your computer, and hand them back their tests. Also, give each student a detailed answer key for the test, and have them grade themselves. Provide one last reflection sheet and get feedback on how the bootcamp can be improved for future classes.

And finally, when that's all done, have an awards ceremony where you pass out prizes (I just draw funny things on paper plates and pretend they're plaques) and celebrate achievement.

## Wrapping Up and Resources

I definitely feel there's room for improvement in this system, but it accomplishes my ultimate goals.

1. Teach students how to learn things on their own.
2. Have students produce projects that showcase their skills
3. Demonstrate growth through iterative practice and assessment

When those three criteria are met, students seem to thrive and find a sense of flow in their work. I'd love to hear any ways to better this process. Here is a sample list of resources I use to make the bootcamp happen.

+ Google Form - https://forms.gle/A7YXSxqsv8Jikgs69
+ Google Sheet Submission Repo - https://docs.google.com/spreadsheets/d/1KHIV5cXD5-NqruaYID_2HwTeV4YvWFdbrcEHP59yPlE/edit?usp=sharing
+ Google Sheet Public Scoreboard - https://docs.google.com/spreadsheets/d/1NfpaqeOIKmQpYW9-yu8Vu1Y-U5-cBhrcgQM0CSZ_ROI/edit?usp=sharing
+ Google Slides Kickoff and Resources - https://docs.google.com/presentation/d/1VdQkqdZBmkrW0NpFdnJkv0iv1vidZ8MJSJHVQkfOgUM/edit?usp=sharing
+ Google Doc Checklist - https://docs.google.com/document/d/15IZkYCUxrWWzpYup6zpB_irfEkRAtiBNnrjfiX3Mgik/edit?usp=sharing
