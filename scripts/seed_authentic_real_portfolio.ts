import 'dotenv/config';
import { db } from '../src/lib/db';
import { portfolioItems } from '../src/db/schema';

async function seedAuthenticPortfolio() {
  console.log("Seeding 100% authentic real workshops and real Instagram artwork...");

  // Clear existing items to avoid dummy/sample leftovers
  await db.delete(portfolioItems);

  const realPortfolio = [
    {
      title: "The Kidpreneur Lab: Interactive 10-Session Adventure",
      slug: "the-kidpreneur-lab-interactive-adventure",
      type: "WORKSHOP",
      status: "UPCOMING",
      category: "Core Cohort",
      eventDate: "2026-11-06",
      eventTime: "Every Friday 4:30 PM - 6:30 PM",
      location: "Innovation Hub & Kidpreneur Lab Portal",
      summary: "Our flagship 10-session experiential journey where curious kids build real ventures, practice cashflow on interactive worksheets, and pitch with confidence.",
      content: `### Welcome to The Kidpreneur Lab!
Led by Dr. Sarah Sidani, The Kidpreneur Lab is an immersive learning space where children ages 7-14 discover the foundations of creative problem-solving, product design, financial literacy, and public speaking.

#### Highlights of the 10-Session Roadmap:
* **Session 1-3: Problem Discovery & Brainstorming** — Turning daily annoyances into business opportunities.
* **Session 4-6: Prototyping & Unit Economics** — Building kid-safe prototypes and understanding simple revenue models.
* **Session 7-8: Branding & Digital Eye** — Designing logos, product packaging, and storytelling assets.
* **Session 9-10: The Pitch Arena** — Presenting mini-ventures to mentors and parents.

Includes lifetime access to our digital worksheets, interactive tools, and achievement badges!`,
      coverImageUrl: "/instagram/curiosity_to_business.jpg",
      galleryImages: JSON.stringify([
        "/instagram/curiosity_to_business.jpg",
        "/instagram/more_creating_less_scrolling.jpg",
        "/instagram/marshmallow_challenge.jpg"
      ]),
      ctaText: "Enroll Child in Lab",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 1,
    },
    {
      title: "Video Editing & Digital Storytelling Workshop",
      slug: "video-editing-digital-storytelling-workshop",
      type: "WORKSHOP",
      status: "UPCOMING",
      category: "Digital Media",
      eventDate: "2026-11-20",
      eventTime: "10:00 AM - 1:00 PM",
      location: "The Koozpace, Yarzeh & Online",
      summary: "Ready to create some magic? Transitioning kids from passive consumers to active creators through mobile camera angles, video editing, and digital storytelling.",
      content: `### More Creating, Less Scrolling!
Kids spend hours watching videos every day. In this active, mentor-led studio workshop, we teach them how stories are constructed and produced.

#### Workshop Agenda:
* **Framing & Lighting:** How to set up an attractive shot using natural light and everyday props.
* **Kid-Safe Video Editing:** Cuts, transitions, adding audio tracks, and pacing.
* **Positive Impact:** Creating inspirational content that highlights teamwork and creative ideas.`,
      coverImageUrl: "/instagram/video_editing_workshop.jpg",
      galleryImages: JSON.stringify([
        "/instagram/video_editing_workshop.jpg",
        "/instagram/digital_storytelling.jpg"
      ]),
      ctaText: "Reserve Workshop Seat",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 2,
    },
    {
      title: "The Marshmallow Challenge: Teamwork & Prototyping Workshop",
      slug: "the-marshmallow-challenge-teamwork-workshop",
      type: "ACTIVITY",
      status: "COMPLETED",
      category: "Teamwork & Prototyping",
      eventDate: "2026-10-17",
      eventTime: "10:00 AM - 12:00 PM",
      location: "The Koozpace, Yarzeh (Ages 9-14)",
      summary: "One Challenge. One Team. Kids built structural towers with spaghetti and marshmallows, testing failure resilience (F.A.I.L.) and team collaboration.",
      content: `### An Unforgettable Hands-on Engineering Challenge!
On October 17, our young creators took part in the famous Marshmallow Challenge at The Koozpace, Yarzeh.

Working in small teams with limited materials (20 sticks of spaghetti, tape, string, and a single marshmallow), participants learned:
* **F.A.I.L. (First Attempt In Learning):** Embracing prototypes that collapse as learning opportunities.
* **Iterative Building:** Testing the weight of the marshmallow early rather than waiting until the last second.
* **Team Communication:** Listening to peers and dividing roles equitably.`,
      coverImageUrl: "/instagram/marshmallow_challenge.jpg",
      galleryImages: JSON.stringify([
        "/instagram/marshmallow_challenge.jpg",
        "/instagram/kids_playing_purpose.jpg"
      ]),
      ctaText: "View Workshop Story",
      ctaUrl: "/portfolio/the-marshmallow-challenge-teamwork-workshop",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 3,
    },
    {
      title: "From Curiosity to Business: Fall Cohort Launch",
      slug: "from-curiosity-to-business-fall-cohort-launch",
      type: "ACTIVITY",
      status: "COMPLETED",
      category: "Entrepreneurship",
      eventDate: "2026-10-03",
      eventTime: "4:30 PM - 6:30 PM",
      location: "The Koozpace, Yarzeh (Ages 9-13)",
      summary: "12-session self-discovery journey where young founders learn soft skills, business acumen, and creative problem solving through hands-on play.",
      content: `### Kicking Off Our Fall Journey at Koozpace!
On October 3, our young innovators embarked on a comprehensive 12-session self-discovery journey designed to turn natural childhood curiosity into practical enterprise skills.`,
      coverImageUrl: "/instagram/curiosity_to_business.jpg",
      galleryImages: JSON.stringify([
        "/instagram/curiosity_to_business.jpg",
        "/instagram/creative_thinking.jpg"
      ]),
      ctaText: "View Story & Gallery",
      ctaUrl: "/portfolio/from-curiosity-to-business-fall-cohort-launch",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 4,
    },
    {
      title: "From Curiosity to Business: Self Discovery Journey",
      slug: "from-curiosity-to-business-reel",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Bootcamp Reel",
      eventDate: "Recent Highlight",
      summary: "Every Friday hands-on journey helping kids ages 9-13 build digital skills, soft skills, and business mindset through play at Koozpace Yarzeh.",
      content: "From Curiosity to Business! Hands-on entrepreneurship and self-discovery workshop by Dr. Sarah Sidani. Watch our young founders explore real-world problem solving.",
      coverImageUrl: "/instagram/curiosity_to_business.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DcynKmHDFCX/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/p/DcynKmHDFCX/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 5,
    },
    {
      title: "More Creating, Less Scrolling: The Entrepreneur Mindset",
      slug: "more-creating-less-scrolling-mindset-reel",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Classroom Reels",
      eventDate: "Recent Highlight",
      summary: "Full bloom — that's the entrepreneur mindset! Watch how our young students transition from passive screen consumers into active digital creators and innovators.",
      content: "More creating, less scrolling. Watch Dr. Sarah Sidani and young innovators in action testing creative prototypes and developing their digital eye on Instagram @kidpreneur.journey.",
      coverImageUrl: "/instagram/more_creating_less_scrolling.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/reel/DepIRBcI0zY/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/reel/DepIRBcI0zY/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 6,
    },
    {
      title: "What Does Creative Thinking Truly Mean? (شو يعني تفكير إبداعي؟)",
      slug: "what-does-creative-thinking-truly-mean-post",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Parenting & Mindset",
      eventDate: "Classroom Moments",
      summary: "Teaching young minds to look at challenges from different angles and uncover innovative solutions no one else saw.",
      content: "شو يعني تفكير إبداعي؟ إنو طفلك يتعلم يشوف الأمور من زوايا مختلفة ويلاقي حلول ما كانت على بال حدا. Follow @kidpreneur.journey on Instagram.",
      coverImageUrl: "/instagram/creative_thinking.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/De7XdBaCLf3/",
      ctaText: "View Post on Instagram",
      ctaUrl: "https://www.instagram.com/p/De7XdBaCLf3/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 7,
    },
    {
      title: "Play-Based Learning & Experiential Teamwork in Action",
      slug: "play-based-learning-experiential-teamwork-post",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Classroom Reels",
      eventDate: "Workshop Moments",
      summary: "مبين الأولاد بس عم يلعبوا؟ Behind every game is a structured lesson in team collaboration, critical thinking, and early enterprise fundamentals.",
      content: "Behind every game is a structured lesson in team collaboration and critical thinking. Follow @kidpreneur.journey on Instagram for behind-the-scenes moments.",
      coverImageUrl: "/instagram/kids_playing_purpose.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DecT3k-CA9b/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/p/DecT3k-CA9b/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 8,
    },
    {
      title: "Healthy Habits Build Strong Minds (العادات الصحية بتبني عقول سليمة)",
      slug: "healthy-habits-build-strong-minds",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Parenting & Wellness",
      eventDate: "Wellness Post",
      summary: "مثل ما منعلم ولادنا يحلموا أحلام كبيرة، لازم نعلمهم كمان كيف يهتموا بحالهم وبصحتهم النفسية.",
      content: "العادات الصحية بتبني عقول سليمة. Follow @kidpreneur.journey on Instagram.",
      coverImageUrl: "/instagram/healthy_habits_mindset.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DeUzt95iLiO/",
      ctaText: "View Post on Instagram",
      ctaUrl: "https://www.instagram.com/p/DeUzt95iLiO/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 9,
    },
    {
      title: "When Your Child Says 'I am Bored' — Why Boredom Sparks Innovation",
      slug: "boredom-sparks-innovation",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Parenting Advice",
      eventDate: "Parenting Reel",
      summary: "إذا طفلك قلك 'زهقت'.. هيدا شي منيح! How unstructured time encourages young brains to create their own games and entrepreneurial solutions.",
      content: "إذا طفلك قلك 'زهقت' هيدا شي منيح! Follow @kidpreneur.journey on Instagram.",
      coverImageUrl: "/instagram/boredom_sparks_creativity.jpg",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DePgG2lDB0Q/",
      ctaText: "View Post on Instagram",
      ctaUrl: "https://www.instagram.com/p/DePgG2lDB0Q/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 10,
    }
  ];

  for (const item of realPortfolio) {
    await db.insert(portfolioItems).values(item);
  }

  console.log("Successfully seeded 100% authentic portfolio data!");
}

seedAuthenticPortfolio()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
