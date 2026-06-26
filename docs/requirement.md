# Java OOP Question Hub - Frontend Development Prompt

You are an expert React.js engineer, UI/UX designer, and frontend architect.

Your task is to build a modern, responsive educational website named **Java OOP Question Hub**.

This project is **NOT** an online compiler, LMS, or e-learning platform.

It is a clean, fast, and well-organized question bank built for personal study and revision.

The website will consume JSON data that already exists. **Do not generate questions or syllabus content.** Simply read and display the provided JSON files.

---

# Tech Stack

Use the following technologies:

* React 19
* Vite
* Tailwind CSS
* React Router DOM
* Lucide React Icons
* Framer Motion (subtle animations only)

Do **NOT** use Redux, Firebase, Supabase, authentication systems, databases, or a backend.
Use localstorage for bookmark.

Everything should work using local JSON files.

---

# Goal

The website should help users:

* Browse Java questions by unit
* Browse questions by topic
* Search questions
* Filter questions
* Bookmark questions
* Mark questions as completed
* Read answers
* Practice for exams and viva

The website should feel similar to modern documentation websites such as:

* Roadmap.sh
* Frontend Mentor
* shadcn/ui
* Tailwind CSS Docs

Clean.

Minimal.

Fast.

Professional.

---

# Data Source

Use the following JSON files located inside:

src/data/

Example:

src/data/

* units.json
* topics.json
* questions.json

The application should dynamically render everything from these JSON files.

Never hardcode units or questions.

---

# Routing

Create the following routes.

/

Home page

/units

Displays all units

/unit/:unitId

Displays a single unit

/topic/:topicId

Displays all questions inside one topic

/question/:questionId

Displays one question

/bookmarks

Bookmarked questions

/search

Search page

/about

About page

/*

404 page

---

# Layout

Every page should contain

Navbar

Main Content

Footer

Desktop Layout

* Fixed Navbar
* Responsive content
* Clean spacing
* Max width container

Mobile Layout

* Responsive navigation
* Hamburger menu
* Comfortable touch targets

---

# Home Page

Include

Hero section

Website description

Total Units

Total Topics

Total Questions

Quick navigation buttons

Recently viewed questions (optional)

Featured Units

Simple statistics cards

Beautiful gradient header

---

# Units Page

Display all units as responsive cards.

Each card should show

* Unit Number
* Unit Title
* Short Description
* Number of Topics
* Number of Questions
* Estimated Study Time
* Difficulty
* Open Button

Cards should animate slightly on hover.

---

# Unit Page

Display

Unit title

Description

Progress Bar

Topic List

Question Statistics

Topics should appear as cards.

Each topic card should display

* Topic Name
* Total Questions
* Easy
* Medium
* Hard

Clicking opens the topic page.

---

# Topic Page

Display

Breadcrumb

Topic title

Question count

Difficulty filters

Question type filters

Question cards

Each Question Card should include

Title

Difficulty badge

Question Type

Tags

Bookmark button

Completed indicator

Open button

---

# Question Detail Page

Display

Question Title

Difficulty Badge

Question Type

Tags

Estimated Time

Marks

Question

Hidden Answer Section

Show Answer button

Explanation

Java Code Block

Previous Question

Next Question

Bookmark button

Mark Complete button

If code exists, render it using syntax-highlighted code blocks.

---

# Search

Create a search page.

Allow searching by

Title

Keyword

Topic

Difficulty

Question Type

Tag

The search should be instant.

---

# Bookmark Feature

Bookmarks should use Local Storage.

Users can

Add Bookmark

Remove Bookmark

View all bookmarks

Bookmarks persist after refresh.

---

# Progress Tracking

Users should be able to mark questions as completed.

Save progress in Local Storage.

Display

Completed Questions

Remaining Questions

Completion Percentage

Progress Bar

Show progress per unit.

---

# Filters

Support filters for

Difficulty

Easy

Medium

Hard

Question Type

Theory

Programming

MCQ

Interview

Viva

Debugging

Output

Lab

Assignment

Sorting

Newest

Alphabetical

Difficulty

---

# Components

Create reusable components.

Navbar

Footer

Container

PageHeader

UnitCard

TopicCard

QuestionCard

DifficultyBadge

Tag

SearchBar

FilterBar

ProgressBar

Breadcrumb

BookmarkButton

CompletedButton

CodeBlock

EmptyState

LoadingSkeleton

No duplicated UI.

---

# UI Style

Use modern card layouts.

Rounded corners

Soft shadows

Blue primary color

Gray backgrounds

Excellent spacing

Readable typography

Consistent buttons

Professional icons

Subtle hover animations

Responsive grid

No clutter.

---

# Typography

Use clean font sizes.

Strong headings

Comfortable paragraph spacing

Readable code blocks

---

# Animations

Use Framer Motion only for

Page transitions

Card hover

Fade in

Accordion

Avoid excessive animations.

---

# Folder Structure

src/

components/

layout/

common/

questions/

units/

topics/

pages/

hooks/

utils/

data/

styles/

assets/

App.jsx

main.jsx

Keep the architecture modular.

---

# Code Quality

Write clean React code.

Use functional components.

Use hooks.

Avoid unnecessary state.

Use reusable helper functions.

Separate UI from logic.

Write maintainable code.

---

# Accessibility

Use semantic HTML.

Proper heading hierarchy.

Keyboard accessible buttons.

Visible focus states.

ARIA labels where appropriate.

---

# Responsiveness

Desktop

Tablet

Mobile

The website must look polished on every screen size.

---

# Performance

Lazy load pages.

Use React.memo where appropriate.

Keep components lightweight.

Avoid unnecessary re-renders.

---

# Final Goal

Create a polished, production-quality frontend that is simple, elegant, and easy to extend.

The focus should always remain on helping users browse, search, and study Java Object-Oriented Programming questions efficiently.

The design should prioritize readability and ease of navigation over flashy effects.

All content should be loaded dynamically from the provided JSON files.
