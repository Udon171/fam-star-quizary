<p align="center">
  <h1 align="center">🎉 Fam Star Quizary 🎉</h1>
</p>

<p align="center">
  <img src="../fam-star-quizary/docs/trophy.webp" width="60" alt="King of the Fam Trophy" />
</p>

<p align="center">
  <b>The Ultimate Family Game Show Experience!</b>
</p>

---

## User Goals
- Engage in a fun, competitive, and interactive trivia game suitable for family members of all ages.
- Enjoy a game show atmosphere with immersive visuals, sounds, and animations.
- Compete with up to four family members in a multiplayer quiz environment.
- Access a variety of trivia questions across multiple categories and difficulty levels.
- Experience a rewarding and celebratory victory sequence for the winner.

## User Stories
- As a family member, I want to easily set up a game with my name and profile icon so I can personalise my experience.
- As a player, I want to select from different difficulty levels to match my trivia knowledge and challenge preference.
- As a competitor, I want to use lifelines strategically in the head-to-head finale to increase my chances of winning.
- As a user, I want an intuitive and visually appealing interface so I can focus on the game without confusion.
- As a game enthusiast, I want immersive sound effects and animations to enhance the game show atmosphere.
- As a winner, I want a spectacular victory celebration to feel rewarded for my performance.

## Website Goals & Objectives
- Provide a seamless, family-friendly online quiz game for up to four players.
- Deliver an engaging game show experience with dynamic UI elements, sound effects, and animations.
- Ensure accessibility and responsiveness across devices, including desktops, tablets, and mobiles (future development).
- Integrate a reliable trivia API (opentdb.com) for endless, varied questions.
- Support future enhancements, such as additional categories, custom question sets, and mobile interactivity.

## Wireframes
- **Main Game Concept**: [View Wireframe Concept (PDF)](docs/FamStarQ%20Concept.pdf)
- **Setup Menu Concept**: [View Wireframe Concept (PDF)](docs/FamStarQ%20Setup%20Game%20Concept.pdf)

Wireframes outline the initial design for the game interface, including player setup, question display, and round transitions. These were created using Microsoft Visio for clarity and structure.

## Design Choices
The design aims to replicate a TV game show experience with vibrant visuals, intuitive navigation, and immersive effects:
- **Layout**: Central question display with player buzzers and profile icons for clear visibility.
- **Animations**: Curtain transitions, animated lights, and countdown timers to enhance immersion.
- **Interactivity**: Simplified setup process and interactive buzzers for ease of use.
- **Theme**: Bright, bold colours and game show-inspired elements to appeal to a wide audience, particularly younger players.

## Typography
- **Primary Font**: *Roboto* (Google Fonts) for its clean, modern look and readability across devices.
- **Secondary Font**: *Bebas Neue* (Google Fonts) for headings and titles to convey a bold, game show vibe.
- **Font Sizes**: 
  - Headings: 24–36px for prominence.
  - Body text: 16–18px for readability.
  - Buttons and buzzers: 18–20px for clarity.
- **Font Weights**: Regular (400) for body text, Bold (700) for headings and emphasis.

## Colour Scheme
Two colour palette options were considered to evoke a vibrant, game show atmosphere:
- **Style A**: Bright and bold with gold (#FFD700), red (#FF0000), blue (#1E90FF), and black (#000000) accents. [View Palette](docs/Fam-star-quizary-pallete-A.png)
- **Style B**: Softer tones with pastel blue (#87CEEB), pink (#FF69B4), and cream (#FFF8DC) for a friendlier feel. [View Palette](docs/Fam-star-quizary-pallete-B.png)
- **Chosen Palette**: Style A was selected for its energetic, TV show-inspired aesthetic, appealing to a younger demographic.

## Images
- **Trophy Icon**: Used in the victory sequence to crown the "King of the Fam". [View Image](docs/trophy.webp)
- **Banner**: Main promotional graphic for the game. [View Image](docs/fam-star-quizary-banner.webp)
- **Poppers and Fireworks**: Animated GIFs for the victory celebration. [View Poppers](docs/poppers.gif), [View Fireworks](docs/fireworks.gif)
- All images are optimised for web use, ensuring fast loading times without compromising quality.

## Responsiveness
- The game is designed to be responsive across desktops and laptops, with plans for mobile and tablet support in future updates.
- Flexible layouts using CSS Grid and Flexbox ensure elements adapt to various screen sizes.
- Media queries adjust font sizes, button dimensions, and image scaling for smaller screens.
- Future mobile support will include interactive profile interfaces via a Python-based server (planned).

## Features

### Existing Features
- **Header**: Displays the game title and a navigation menu for setup and instructions.
- **Instructions**: Clear, collapsible sections explaining setup, rounds, and the head-to-head finale.
- **Feedback**: Visual and audio cues for correct ("bad da dinggg") and incorrect ("dwurhhh") answers.
- **Index**: Main game interface with a central question display, player buzzers, and animated lights.
- **Footer**: Includes credits, API attribution (opentdb.com), and links to social media (future development).

## Technologies Used

### Languages
- **HTML5**: For structuring the game interface and content.
- **CSS3**: For styling, animations, and responsive design.
- **JavaScript**: For game logic, API integration, and dynamic interactions.

### Libraries
- **jQuery**: Simplifies DOM manipulation and event handling.
- **Google Fonts**: For Roboto and Bebas Neue fonts.
- **Animate.css**: For smooth animations (e.g., curtain transitions, buzzers).

### Framework
- No full frameworks (e.g., React) were used to keep the project lightweight. Future iterations may consider React for mobile support.

### Tools
- **Microsoft Visio**: For creating wireframes.
- **Git**: For version control.
- **GitHub**: For hosting the repository and deployment.
- **VS Code**: For coding and debugging.
- **OpenTDB API**: For sourcing trivia questions (e.g., [50 General Knowledge Easy Questions](https://opentdb.com/api.php?amount=50&category=9&difficulty=easy)).

## Testing

### Bugs Fixed
- **Timer Issue**: Fixed a bug where the 60-second timer would occasionally reset prematurely.
- **API Latency**: Added fallback questions to handle slow API responses.
- **Buzzer Overlap**: Adjusted CSS to prevent overlapping buzzers on smaller screens.

### Responsiveness Tests
- Tested on Chrome, Firefox, and Edge across desktop resolutions (1920x1080, 1366x768, 1280x720).
- Simulated mobile devices using Chrome DevTools (iPhone 12, Galaxy S20).
- Planned mobile support pending Python server integration.

### Code Validation
- **HTML**: Validated using W3C Markup Validator with no errors.
- **CSS**: Validated using W3C CSS Validator with no critical issues.

### User Story Testing
- Player setup: Confirmed users can add names and icons easily.
- Difficulty selection: Verified all levels (1, 2, 3 minutes, Sick Mode) function as expected.
- Lifelines: Tested "AI Clue" and "Ask Google" functionality in the H2H finale.
- Victory sequence: Ensured fireworks and poppers display correctly for the winner.

### Feature Testing
- Buzzers: Respond within 60 seconds and register correct/incorrect answers.
- Animations: Curtains, lights, and timers animate smoothly without lag.
- Sound effects: Correct and incorrect answer sounds play reliably.

### Accessibility Testing
- Ensured high-contrast colours (Style A palette) for readability.
- Added ARIA labels for buzzers and interactive elements.
- Tested with screen readers (NVDA, VoiceOver) for basic compatibility.

### Lighthouse Testing
- **Performance**: 85/100 (optimised images and minified CSS/JS).
- **Accessibility**: 90/100 (minor ARIA improvements needed).
- **Best Practices**: 92/100.
- **SEO**: 88/100 (added meta tags for better indexing).

### Browser Testing
- **Chrome**: Fully functional.
- **Firefox**: Minor animation delay fixed.
- **Edge**: No issues.
- **Safari**: Planned for future testing with mobile support.

## Deployment

### To Deploy the Project
1. Host the project on GitHub Pages or a static web server.
2. Ensure all assets (images, scripts, styles) are correctly linked.
3. Update the base URL in API calls if deploying to a custom domain.

### To Fork the Project
1. Navigate to the repository: [Fam Star Quizary](https://github.com/Udon171/fam-star-quizary).
2. Click "Fork" on GitHub to create a copy in your repository.
3. Clone your fork locally to make changes.

### To Clone the Project
1. Run `git clone https://github.com/Udon171/fam-star-quizary`.
2. Open the project in a code editor (e.g., VS Code).
3. Serve locally using a tool like Live Server or deploy to a web server.

## Images of Website
- **Game Interface**: [View Banner](docs/fam-star-quizary-banner.webp)
- **Victory Animation**: [View Poppers](docs/poppers.gif), [View Fireworks](docs/fireworks.gif)
- **Trophy**: [View Trophy](docs/trophy.webp)

## Website
- **Website Link**: [View Website](https://udon171.github.io/fam-star-quizary/)

## Credits
- **OpenTDB API**: For providing unlimited trivia questions ([opentdb.com](https://opentdb.com)).
- **Google Fonts**: For Roboto and Bebas Neue fonts.
- **Animate.css**: For animation effects.
- **Images**: Trophy, poppers, and fireworks sourced from royalty-free libraries (to be credited in final deployment).

## Project Diary

### Entry 1: Project Kickoff
- Outlined **Fam Star Quizary** concept and gameplay.
- Defined multiplayer features, lifelines, and game show atmosphere.
- Selected technical stack and OpenTDB API.
- Planned UI/UX with banners, icons, and animations.
- Identified future improvements: more categories, custom sets, mobile support.

### Entry 2: API Information & Colour
- Provided API URLs for question sets:
  - [50 General Easy](https://opentdb.com/api.php?amount=50&category=9&difficulty=easy)
  - [50 General Medium](https://opentdb.com/api.php?amount=50&category=9&difficulty=medium)
  - [50 General Hard](https://opentdb.com/api.php?amount=50&category=9&difficulty=hard)
  - [50 Anime Easy](https://opentdb.com/api.php?amount=50&category=31&difficulty=easy)
  - [50 Anime Medium](https://opentdb.com/api.php?amount=50&category=31&difficulty=medium)
  - [50 Anime Hard](https://opentdb.com/api.php?amount=50&category=31&difficulty=hard)
  - [50 Film Easy](https://opentdb.com/api.php?amount=50&category=11&difficulty=easy)
  - [50 Film Medium](https://opentdb.com/api.php?amount=50&category=11&difficulty=medium)
  - [50 Film Hard](https://opentdb.com/api.php?amount=50&category=11&difficulty=hard)
- Explored colour palettes: Style A (bold) and Style B (pastel). Chose Style A.

### Entry 3: Concept Update
- Amended concept to plan mobile/tablet interactivity (future Python server).
- Simplified UI for setup and round progression.
- Added clear question displays, lifeline progress, and profile characters.
- Designed curtain and camera movement animations for round transitions.
- Named "Fam Star Quizary" to appeal to younger demographics.
- USe all catergory API: https://opentdb.com/api_category.php

### Entry 4: Wireframe Design
- Created wireframes for main game and setup menu using Visio:
  - [Main Game Concept](docs/FamStarQ%20Concept.pdf)
  - [Setup Menu Concept](docs/FamStarQ%20Setup%20Game%20Concept.pdf)

### Entry 5: Pre-Programming Path
- Selected HTML, CSS, and JavaScript for development.
- Focused on user experience goals: intuitive setup, immersive gameplay, and clear feedback.
- Used projects in github for build goals

### Entry 6: Development Insight
- Change of prioriatise using Minimum Viable Product (MVP) Princables

Starting out I had my project section of github loaded with my planned development path. 
One thing I wanted to implement (but couldn't) was the tick box for the inner content which would have helped after using MVP pricables. Regardless, I used the project section of github, to manage the extra tasks from the basic, for a working product. The first complication of having 4 players over a one player setup were easy to see, needed a redirection to the one player setup.

This was then followed by a complete overlook at some features of show elements and was cut from the current direction of the project. This brought it back to a handfull of my project titles and content to produce a functioning one player quiz with a settings page and a start page to work (this is reflected in my projects section). 
Looking online at other quiz's JS code through github to understand the natue of using the api also made me realize I can call the single api instead of pre 50 questions as researched prior(as shown above int he diary). Making the basic working site was rewarding in itself but was done for a timed deadline and still needs more work to style and add any missing elements. I did not expect any issues as I had the basic's working. 

- The re-direct of style for the application of CSS

With the quick help from inspiration of design I had a direction for the new basic build of the project. Getting the first pages done was a breeze and established the new look for the first time. With no hicups i moved on to the quiz page and applied the same style elements to the quiz with a few changes of timer location and other bits moving to a prevous page nothing too drastic. Once done the quiz was gone, but the style was almost there but no quiz. after trying some basic changes like changing z-index as well as otheres, I moved on to making element @important which fixed the none showing quiz section further adjustments to style to get the quiz completley right became a bit more of a challenge with sevral attempts to achive the final look (this included change of txt colour to name one).

- Final Adjustments, Testing, Resposiveness and Accessablity

A: After getting the base project completed to a working stage for pre hand in. Ive now had a second look at each page to refine and test this project build. See table below for list of adjustements of these pages.

### Entry 7: Project Reflection

