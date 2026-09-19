export const initialActivities = [
  {
    sessionNumber: 1,
    title: "Activity 1 — Meet Our Kidpreneur",
    description: "Friendly learner profile. This should feel like discovery, not registration paperwork.",
    objective: "Get to know you and setup your profile.",
    icon: "👋",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "profile.display_name", type: "short_text", label: "What should we call you?", placeholder: "Your name or nickname" },
        { id: "profile.age", type: "select", label: "How old are you?", options: ["6", "7", "8", "9", "10", "11", "12", "13+"] },
        { id: "profile.interests", type: "multi_select", label: "What do you enjoy doing? Choose as many as you like.", options: ["Art & Design", "Building things", "Sports", "Animals", "Science & Nature", "Helping people", "Computers", "Reading"] },
        { id: "profile.favorite_topic", type: "short_text", label: "Something you can talk about for a long time is..." },
        { id: "profile.help_strength", type: "short_text", label: "Something people often ask you to help with is..." },
        { id: "profile.early_problem", type: "long_text", label: "If you could make one thing easier or better, what would it be?" },
        { id: "profile.learning_goals", type: "multi_select", label: "What would you love to learn during Launchpad?", options: ["Coming up with ideas", "Making money", "Helping the planet", "Building a product", "Speaking confidently"] },
        { id: "profile.start_feeling", type: "4_point_scale", label: "How are you feeling about starting?", options: ["Excited!", "Curious", "A bit nervous", "Not sure yet"] }
      ]
    })
  },
  {
    sessionNumber: 2,
    title: "Activity 2 — My Kidpreneur Mindset Check-In",
    description: "Baseline mindset self-check. There are no right or wrong answers — this is your starting point.",
    objective: "Understand your current mindset before you begin the journey.",
    icon: "🧠",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "mindset.initial.qualities", type: "multi_select", label: "Which Kidpreneur qualities sound most like you?", options: ["Curious", "Brave", "Persistent", "Creative", "Problem-solver"] },
        { id: "mindset.initial.curiosity", type: "4_point_scale", label: "I ask questions when I am curious.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.multiple_solutions", type: "4_point_scale", label: "I can think of more than one solution to a problem.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.share_ideas", type: "4_point_scale", label: "I share my ideas even if they are not perfect.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.persistence", type: "4_point_scale", label: "I try again when something doesn't work.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.learn_mistakes", type: "4_point_scale", label: "I can learn something from a mistake.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.notice_improve", type: "4_point_scale", label: "I notice things around me that could be improved.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.initial.challenge_response", type: "select", label: "If something I tried did not work, what would I most likely do?", options: ["Give up", "Ask for help", "Try a different way", "Get angry"] },
        { id: "mindset.initial.growth_area", type: "long_text", label: "Something I would love to become better at is..." },
        { id: "mindset.initial.superpower", type: "long_text", label: "One thing I think I am already good at is..." },
        { id: "mindset.initial.goal", type: "long_text", label: "One thing I want to practise during Launchpad is..." },
        { id: "mindset.initial.week_challenge", type: "short_text", label: "During the next week, I will try to..." },
        { id: "mindset.initial.curiosity_prompt", type: "long_text", label: "Finish one: What if... / Could we... / How might I..." }
      ]
    })
  },
  {
    sessionNumber: 3,
    title: "Activity 3 — My Strengths & Interests Map",
    description: "Self-discovery activity: enjoy, good at, want to learn, then a concise strengths profile.",
    objective: "Identify what you are good at to leverage it in your Kidpreneur journey.",
    icon: "⭐",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "strengths.enjoy", type: "multi_select", label: "Which activities do you enjoy?", options: ["Drawing", "Coding", "Talking to people", "Building", "Organizing"] },
        { id: "strengths.good_at", type: "multi_select", label: "What are you good at?", options: ["Listening", "Math", "Creativity", "Fixing things", "Writing"] },
        { id: "strengths.enjoy_top", type: "long_text", label: "Add at least 3 things you ENJOY." },
        { id: "strengths.good_at_top", type: "long_text", label: "Add at least 3 things you're GOOD AT." },
        { id: "strengths.want_learn", type: "long_text", label: "Add at least 3 things you WANT TO LEARN." },
        { id: "strengths.proud_story", type: "long_text", label: "Think of a moment when you felt proud. What happened?" },
        { id: "strengths.proud_action", type: "long_text", label: "What did you do?" },
        { id: "strengths.proud_stren", type: "short_text", label: "Which strength did you use?" },
        { id: "strengths.people", type: "short_text", label: "Who do you enjoy helping or working with?" },
        { id: "strengths.curiosity", type: "short_text", label: "One thing you are curious about is..." },
        { id: "strengths.profile_sentence", type: "long_text", label: "Complete: I enjoy __, I am good at __, and I want to learn __." },
        { id: "strengths.week_strength", type: "short_text", label: "My Kidpreneur strength for this week is..." }
      ]
    })
  },
  {
    sessionNumber: 4,
    title: "Activity 4 — My Kidpreneur Problem Detective",
    description: "Observation activity. Remember: do not solve yet.",
    objective: "Identify problems around you that need solving.",
    icon: "🔍",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "problems.home", type: "long_text", label: "What have you noticed at HOME that could be easier or better?" },
        { id: "problems.school", type: "long_text", label: "What have you noticed at SCHOOL?" },
        { id: "problems.hobbies", type: "long_text", label: "What have you noticed during HOBBIES / SPORTS?" },
        { id: "problems.community", type: "long_text", label: "What have you noticed in your COMMUNITY?" },
        { id: "problems.online", type: "long_text", label: "What have you noticed ONLINE / WITH TECHNOLOGY?" },
        { id: "problems.annoyances", type: "long_text", label: "Add 3 things that annoy or frustrate you." },
        { id: "problems.wish_easier", type: "long_text", label: "Finish 3 times: I wish it were easier to..." },
        { id: "problems.other_people", type: "long_text", label: "Add problems you notice other people having: Who? What? Where/when?" },
        { id: "problems.detective_pick", type: "short_text", label: "Choose one problem to investigate." },
        { id: "problems.detective_detail", type: "long_text", label: "WHAT is happening? WHO? WHERE? WHEN? WHY does it matter?" },
        { id: "problems.top3", type: "long_text", label: "Choose your Top 3 problems to explore." },
        { id: "problems.curiosity_pick", type: "short_text", label: "The problem I am most curious about is..." },
        { id: "problems.curiosity_reason", type: "long_text", label: "I want to understand it better because..." }
      ]
    })
  },
  {
    sessionNumber: 5,
    title: "Activity 5 — My Kidpreneur Problem Explorer",
    description: "Simple customer/problem discovery. Ask open questions and listen.",
    objective: "Understand your problem deeply from the perspective of others.",
    icon: "🌍",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "explorer.problem", type: "short_text", label: "My problem to explore" },
        { id: "explorer.assumptions", type: "long_text", label: "What do I THINK I know about this problem?" },
        { id: "explorer.questions_to_learn", type: "long_text", label: "What do I still need to find out?" },
        { id: "explorer.interviewees", type: "long_text", label: "Who could I talk to? Add 2–3 people/types of people." },
        { id: "explorer.interview_questions", type: "long_text", label: "Prepare 5 curious questions." },
        { id: "explorer.interview1_notes", type: "long_text", label: "Conversation 1 — what did you hear?" },
        { id: "explorer.interview2_notes", type: "long_text", label: "Conversation 2 — what did you hear?" },
        { id: "explorer.interview3_notes", type: "long_text", label: "Conversation 3 — what did you hear?" },
        { id: "explorer.patterns", type: "long_text", label: "What did you hear more than once?" },
        { id: "explorer.surprise", type: "long_text", label: "What surprised you?" },
        { id: "explorer.changed_thinking", type: "long_text", label: "What changed your thinking?" },
        { id: "explorer.updated_problem", type: "long_text", label: "Rewrite the problem now that you know more." }
      ]
    })
  },
  {
    sessionNumber: 6,
    title: "Activity 6 — My Solution Idea Factory",
    description: "Ideation. Encourage quantity before evaluation.",
    objective: "Brainstorm as many wild and creative solutions as possible.",
    icon: "🏭",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "solutions.problem", type: "short_text", label: "My current problem" },
        { id: "solutions.user_learning", type: "long_text", label: "What did I learn about the people experiencing it?" },
        { id: "solutions.crazy_ideas", type: "long_text", label: "Crazy ideas first — add at least 4 wild possibilities." },
        { id: "solutions.easier", type: "long_text", label: "Could I make it easier?" },
        { id: "solutions.faster", type: "long_text", label: "Could I make it faster?" },
        { id: "solutions.fun", type: "long_text", label: "Could I make it more fun?" },
        { id: "solutions.safer_useful", type: "long_text", label: "Could I make it safer or more useful?" },
        { id: "solutions.different", type: "long_text", label: "Could I do it in a completely different way?" },
        { id: "solutions.six", type: "long_text", label: "Create at least 6 possible solutions." },
        { id: "solutions.six_benefit", type: "long_text", label: "For each: how could it help?" },
        { id: "solutions.mixed", type: "long_text", label: "Mix or improve ideas." },
        { id: "solutions.top3", type: "long_text", label: "Choose your Top 3 solutions." }
      ]
    })
  },
  {
    sessionNumber: 7,
    title: "Activity 7 — Choose Your Strongest Solution",
    description: "Compare the Top 3 using simple criteria.",
    objective: "Narrow down your ideas to the strongest one.",
    icon: "🎯",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "choice.top3_snapshot", type: "long_text", label: "Review your Top 3 solutions." },
        { id: "choice.fit_problem", type: "select", label: "For each idea: Does it fit the problem?", options: ["Yes", "Unsure", "Needs work"] },
        { id: "choice.fit_people", type: "select", label: "Would it help the person?", options: ["Yes", "Unsure", "Needs work"] },
        { id: "choice.simple", type: "select", label: "Can I explain it simply?", options: ["Yes", "Unsure", "Needs work"] },
        { id: "choice.testable", type: "select", label: "Could I try a simple version?", options: ["Yes", "Unsure", "Needs work"] },
        { id: "choice.excitement", type: "select", label: "Do I want to keep working on it?", options: ["Yes", "Unsure", "Needs work"] },
        { id: "choice.strengths", type: "long_text", label: "For each idea: What is strong about it?" },
        { id: "choice.difficulties", type: "long_text", label: "For each idea: What may be difficult?" },
        { id: "choice.selected_solution", type: "short_text", label: "Choose ONE solution to develop." },
        { id: "choice.reason", type: "long_text", label: "I chose this because..." },
        { id: "choice.solution_statement", type: "long_text", label: "Complete: My solution helps __ who struggle with __ by __." },
        { id: "choice.open_questions", type: "long_text", label: "What do I still need to learn?" }
      ]
    })
  },
  {
    sessionNumber: 8,
    title: "Activity 8 — Build Your First Prototype",
    description: "Prototype planning. It doesn't need to be perfect, just testable.",
    objective: "Create a simple version of your idea to test with others.",
    icon: "🛠️",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "prototype.solution", type: "short_text", label: "My chosen solution" },
        { id: "prototype.type", type: "select", label: "What type of prototype will you make?", options: ["Physical model", "Drawing/Sketch", "Digital design", "Roleplay script", "Other"] },
        { id: "prototype.main_test", type: "long_text", label: "What is the ONE important thing your prototype needs to show?" },
        { id: "prototype.user_action", type: "long_text", label: "What should a person be able to see or do?" },
        { id: "prototype.leave_out", type: "long_text", label: "What can you leave out for now?" },
        { id: "prototype.materials", type: "long_text", label: "What materials/tools do you need?" },
        { id: "prototype.plan", type: "long_text", label: "Sketch or plan your prototype (describe it here)." },
        { id: "prototype.self_check", type: "select", label: "Can another person understand what this is meant to do?", options: ["Yes", "Not yet"] }
      ]
    })
  },
  {
    sessionNumber: 9,
    title: "Activity 9 — Test It & Get Feedback",
    description: "Testing log. Encourage observation and open questions.",
    objective: "See how people use your prototype and learn from their reactions.",
    icon: "📝",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "testing.goal", type: "long_text", label: "What do you most want to learn from this test?" },
        { id: "testing.testers", type: "long_text", label: "Choose 2–3 testers. Who are they and why are they relevant?" },
        { id: "testing.questions", type: "long_text", label: "Use these 5 suggested questions + add one of your own." },
        { id: "testing.observed_understand", type: "long_text", label: "What did testers understand quickly?" },
        { id: "testing.observed_hesitate", type: "long_text", label: "Where did they hesitate?" },
        { id: "testing.observed_action", type: "long_text", label: "What did they try to do?" },
        { id: "testing.observed_surprise", type: "long_text", label: "What surprised you?" },
        { id: "testing.tester1", type: "long_text", label: "Tester 1 feedback: useful / confusing / change / other" },
        { id: "testing.tester2", type: "long_text", label: "Tester 2 feedback" },
        { id: "testing.tester3", type: "long_text", label: "Tester 3 feedback" },
        { id: "testing.pattern", type: "long_text", label: "What did you hear more than once?" },
        { id: "testing.keep", type: "long_text", label: "KEEP — what seems to work?" },
        { id: "testing.change", type: "long_text", label: "CHANGE — what needs work?" },
        { id: "testing.explore", type: "long_text", label: "EXPLORE — what are you still unsure about?" },
        { id: "testing.reflection", type: "long_text", label: "Feedback helped me learn that..." }
      ]
    })
  },
  {
    sessionNumber: 10,
    title: "Activity 10 — Improve Your Idea",
    description: "Turn feedback into deliberate Version 2 decisions.",
    objective: "Make your solution better based on what you learned.",
    icon: "📈",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "improve.feedback_snapshot", type: "long_text", label: "Review KEEP / CHANGE / EXPLORE." },
        { id: "improve.pattern", type: "long_text", label: "What did more than one person mention?" },
        { id: "improve.blocker", type: "long_text", label: "What stopped or confused a tester?" },
        { id: "improve.useful", type: "long_text", label: "What did people find especially useful?" },
        { id: "improve.reject_reason", type: "long_text", label: "Which suggestion will you NOT use, and why?" },
        { id: "improve.change_options", type: "long_text", label: "Add up to 4 possible changes. For each: why, user benefit, decision." },
        { id: "improve.selected_changes", type: "long_text", label: "Choose the 1–3 most important changes." },
        { id: "improve.v2_plan", type: "long_text", label: "Sketch/describe Version 2." },
        { id: "improve.before_after", type: "long_text", label: "What was weak/confusing in V1 and how is V2 different?" },
        { id: "improve.quality_check", type: "select", label: "My solution still responds to the original problem.", options: ["Yes", "Needs adjustment"] },
        { id: "improve.reflection_feedback", type: "long_text", label: "The most useful feedback I received was..." },
        { id: "improve.self_learning", type: "long_text", label: "Something I learned about myself as a Kidpreneur..." }
      ]
    })
  },
  {
    sessionNumber: 11,
    title: "Activity 11 — Who Is It For? + Your Value",
    description: "Clarify target user and benefit/value without heavy business terminology.",
    objective: "Define clearly who your customer is and why they care.",
    icon: "👥",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "value.target_user", type: "short_text", label: "Who is your idea really for?" },
        { id: "value.user_stage", type: "short_text", label: "Age/stage, if relevant" },
        { id: "value.where", type: "short_text", label: "Where might you find them?" },
        { id: "value.situation", type: "long_text", label: "When do they experience the problem?" },
        { id: "value.journey", type: "long_text", label: "Before / During / After: what happens in their experience?" },
        { id: "value.benefits", type: "multi_select", label: "What positive difference does your solution create?", options: ["Saves time", "Saves money", "Brings joy", "Keeps safe", "Teaches something", "Other"] },
        { id: "value.main_benefit", type: "long_text", label: "The biggest positive difference is..." },
        { id: "value.feature_benefit", type: "long_text", label: "List features and explain why each one matters." },
        { id: "value.statement_draft", type: "long_text", label: "Build: My idea helps __ who struggle with __ by helping them __." },
        { id: "value.real_person_feedback", type: "long_text", label: "Check it with one real person: what did you learn?" },
        { id: "value.statement_final", type: "long_text", label: "Rewrite your clearest final value statement." }
      ]
    })
  },
  {
    sessionNumber: 12,
    title: "Activity 12 — Money Basics: Cost, Price & Profit",
    description: "Simple calculations with editable currency label.",
    objective: "Understand the financial side of your idea.",
    icon: "💲",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "money.currency", type: "short_text", label: "Choose the currency you want to use (e.g., $, €, £)." },
        { id: "money.cost_items", type: "long_text", label: "List items/resources needed for ONE unit/customer/service and estimated cost." },
        { id: "money.cost_recurring", type: "short_text", label: "Do you need this every time? (Yes/No per row)" },
        { id: "money.unit_cost", type: "short_text", label: "Estimated cost for one" },
        { id: "money.price", type: "short_text", label: "Possible selling price" },
        { id: "money.unit_profit", type: "short_text", label: "Estimated profit for one (price - cost)" },
        { id: "money.practice", type: "long_text", label: "Try sample calculations A/B/C." },
        { id: "money.comparable_price", type: "short_text", label: "What does a similar option cost?" },
        { id: "money.price_reason", type: "long_text", label: "Why does your chosen price make sense?" },
        { id: "money.five_revenue", type: "short_text", label: "If you serve/sell to 5: money received" },
        { id: "money.five_cost", type: "short_text", label: "Total cost for 5" },
        { id: "money.five_profit", type: "short_text", label: "Estimated profit for 5" },
        { id: "money.open_question", type: "short_text", label: "One money question you still have" },
        { id: "money.social_funding", type: "long_text", label: "If the idea is free/social: how might costs be covered?" }
      ]
    })
  },
  {
    sessionNumber: 13,
    title: "Activity 13 — My Kidpreneur Project Plan",
    description: "This is the key synthesis activity. Pulling it all together.",
    objective: "Combine all your work into a single, cohesive project plan.",
    icon: "📋",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "plan.problem", type: "long_text", label: "The problem" },
        { id: "plan.problem_user", type: "short_text", label: "Who experiences it?" },
        { id: "plan.problem_why", type: "long_text", label: "Why does it matter?" },
        { id: "plan.solution", type: "long_text", label: "My solution" },
        { id: "plan.how_it_works", type: "long_text", label: "How does it work?" },
        { id: "plan.improvement", type: "long_text", label: "What changed after testing?" },
        { id: "plan.target_user", type: "short_text", label: "My main user/customer" },
        { id: "plan.value_statement", type: "long_text", label: "My final value statement" },
        { id: "plan.difference", type: "long_text", label: "What makes my idea different/useful?" },
        { id: "plan.discovery", type: "long_text", label: "How could people first discover it?" },
        { id: "plan.resources", type: "long_text", label: "What do I need? Why?" },
        { id: "plan.money", type: "long_text", label: "Cost / price / profit" },
        { id: "plan.social_funding", type: "long_text", label: "If free/social: how might costs be covered?" },
        { id: "plan.next_steps", type: "long_text", label: "My first 3 action steps: step / helper / when" },
        { id: "plan.summary", type: "long_text", label: "One-page summary" },
        { id: "plan.pitch_ready", type: "select", label: "Ready for pitch checklist", options: ["Yes, I'm ready!", "Almost"] }
      ]
    })
  },
  {
    sessionNumber: 14,
    title: "Activity 14 — Tell Your Story & Pitch Your Idea",
    description: "Pitch builder + optional final video upload.",
    objective: "Prepare your final presentation to share your idea with the world.",
    icon: "🎤",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "pitch.story", type: "long_text", label: "Build your pitch story: problem / who / solution / value / learning / numbers / next" },
        { id: "pitch.opening_type", type: "select", label: "Choose your opening style.", options: ["Question", "Story", "Surprising Fact", "Bold Statement"] },
        { id: "pitch.opening", type: "long_text", label: "Write your opening." },
        { id: "pitch.idea_statement", type: "long_text", label: "Clear idea statement" },
        { id: "pitch.visual", type: "multi_select", label: "What will you show?", options: ["Prototype", "Drawing", "Slides", "Nothing"] },
        { id: "pitch.visual_focus", type: "short_text", label: "What is the one thing you want people to notice?" },
        { id: "pitch.draft", type: "long_text", label: "Write your 2-minute pitch draft." },
        { id: "pitch.practice_check", type: "select", label: "Practice checklist", options: ["Done"] },
        { id: "pitch.practice_feedback", type: "long_text", label: "Practice with one person: what should you improve?" },
        { id: "pitch.cue_card", type: "long_text", label: "Final cue card" },
        { id: "pitch.after_reflection", type: "long_text", label: "After I pitch: proud / question / improve next time" }
      ]
    })
  },
  {
    sessionNumber: 15,
    title: "Activity 15 — Final Mindset Check-In & Journey Reflection",
    description: "Repeat baseline mindset statements, show growth carefully, then reflect on project and personal development.",
    objective: "Celebrate how far you have come and lock in your new skills.",
    icon: "🏆",
    activityType: "dynamic_form",
    activityPayload: JSON.stringify({
      fields: [
        { id: "mindset.final.curiosity", type: "4_point_scale", label: "I ask questions when I am curious.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.final.multiple_solutions", type: "4_point_scale", label: "I can think of more than one solution to a problem.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.final.share_ideas", type: "4_point_scale", label: "I share my ideas even if they are not perfect.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.final.persistence", type: "4_point_scale", label: "I try again when something doesn't work.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.final.learn_mistakes", type: "4_point_scale", label: "I can learn something from a mistake.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "mindset.final.notice_improve", type: "4_point_scale", label: "I notice things around me that could be improved.", options: ["Never", "Sometimes", "Often", "Always"] },
        { id: "closing.growth", type: "long_text", label: "One area where I notice growth" },
        { id: "closing.challenge", type: "long_text", label: "One area that is still challenging" },
        { id: "closing.keep_practising", type: "long_text", label: "One mindset skill I want to keep practising" },
        { id: "closing.proud", type: "long_text", label: "What are you most proud of?" },
        { id: "closing.hardest", type: "long_text", label: "What was hardest?" },
        { id: "closing.mistake_learning", type: "long_text", label: "One mistake/setback that taught you something" },
        { id: "closing.self_learning", type: "long_text", label: "One thing you learned about yourself" },
        { id: "closing.skills", type: "multi_select", label: "Which skills did you build?", options: ["Communication", "Problem Solving", "Resilience", "Creativity", "Financial Literacy"] },
        { id: "closing.most_improve", type: "short_text", label: "Which skill improved most?" },
        { id: "closing.project_journey", type: "long_text", label: "Start / Learn / Improve journey" },
        { id: "closing.next_choice", type: "multi_select", label: "What would you like to do next?", options: ["Start a new project", "Keep working on this one", "Take a break", "Learn something new"] },
        { id: "closing.next_step", type: "short_text", label: "My next small step will be..." },
        { id: "closing.future_note", type: "long_text", label: "A note to my future self" },
        { id: "closing.used_to_think", type: "long_text", label: "I used to think entrepreneurship was..." },
        { id: "closing.now_think", type: "long_text", label: "Now I think entrepreneurship is..." }
      ]
    })
  }
];
