import 'dotenv/config';
import { db } from '../src/lib/db';
import { portfolioItems } from '../src/db/schema';

async function seed() {
  console.log("Seeding sample portfolio items...");

  const samples = [
    {
      title: "Spring Robotics & AI Bootcamp",
      slug: "spring-robotics-and-ai-bootcamp",
      type: "WORKSHOP",
      status: "UPCOMING",
      category: "Robotics & AI",
      eventDate: "May 2, 2026",
      eventTime: "10:00 AM - 1:30 PM",
      location: "Innovation Hub, Beirut & Online",
      summary: "Hands-on robotics lab where kids build smart sensor gadgets and discover modern AI concepts through play.",
      content: `### About This Workshop
Join us for an inspiring, hands-on weekend bootcamp where young creators turn imagination into working technology!

#### What Young Creators Will Experience:
* **Interactive Robotics:** Build sensor-driven circuits and understand how machines read the world.
* **Friendly AI Logic:** Demystify how smart assistants think and solve puzzles.
* **Team Showcase:** Pitch inventions to fellow parents and mentors with confidence.

**All materials, kid-safe starter kits, and snacks are provided!** Space is strictly limited to 15 innovators to ensure personalized mentorship.`,
      coverImageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
      ]),
      ctaText: "Reserve a Seat in the Lab",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 1,
    },
    {
      title: "Young Founders Market & Pitch Day",
      slug: "young-founders-market-and-pitch-day",
      type: "ACTIVITY",
      status: "COMPLETED",
      category: "Entrepreneurship",
      eventDate: "March 15, 2026",
      eventTime: "2:00 PM - 6:00 PM",
      location: "Kidpreneur Arena",
      summary: "Over 35 kids launched their mini-enterprises, handled real currency transactions, and pitched business models to a lively audience.",
      content: `### An Unforgettable Celebration of Kid Enterprise!
Last month, our young learners took the stage to run their very own storefronts! From eco-friendly crafts and seed paper cards to homemade lemonade stands with unit-cost pricing, our young entrepreneurs proved that age is just a number.

#### Key Milestones Achieved:
* **35+ Student Ventures** showcased.
* **100% of participants** calculated their profit margins and explained their value propositions.
* **Special Guest Mentors** awarded badges for Creative Branding and Social Impact.`,
      coverImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80"
      ]),
      ctaText: "Join the Next Cohort",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 2,
    },
    {
      title: "Behind the Scenes: Prototyping Day on Instagram",
      slug: "behind-the-scenes-prototyping-day",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Social Moments",
      eventDate: "April 5, 2026",
      summary: "Catch the energy! Watch our young innovators test their cardboard prototypes and refine their first customer interviews.",
      content: "Watch our students tackle real design challenges and support each other's vision on Instagram.",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/C6r6-x0sK9d/",
      ctaText: "Follow Us on Instagram",
      ctaUrl: "https://www.instagram.com/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 3,
    }
  ];

  for (const item of samples) {
    await db.insert(portfolioItems).values(item).onConflictDoNothing();
  }

  console.log("Sample portfolio items seeded successfully!");
}

seed()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
