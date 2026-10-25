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
      title: "Dr. Sarah Sidani: Young Innovators Prototyping & F.A.I.L. Day",
      slug: "dr-sarah-sidani-prototyping-and-fail-day",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Classroom Reels",
      eventDate: "April 18, 2026",
      summary: "Celebrating F.A.I.L. (First Attempt In Learning)! Watch our young inventors test cardboard prototypes, conduct customer interviews, and turn mistakes into breakthroughs.",
      content: "Instead of asking 'What will they become?', we ask 'What skills are we helping them build today?' Watch highlights from our prototyping challenge on Instagram @kidpreneur.journey.",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/kidpreneur.journey/",
      ctaText: "Follow @kidpreneur.journey",
      ctaUrl: "https://www.instagram.com/kidpreneur.journey/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 3,
    },
    {
      title: "Digital Creators & Storytelling Lab",
      slug: "digital-creators-and-storytelling-lab",
      type: "WORKSHOP",
      status: "UPCOMING",
      category: "Digital Media",
      eventDate: "June 6, 2026",
      eventTime: "11:00 AM - 2:30 PM",
      location: "Beirut Community Center & Online",
      summary: "Helping children swap passive screen time for active digital skills—learning camera angles, video editing, and digital storytelling.",
      content: `### Transition from Screen-Consumers to Digital Creators!
Kids spend hours consuming content; in this interactive lab led by mentors and guest media creators, children learn how to direct, shoot, and produce their own inspirational stories.

#### Workshop Highlights:
* **Mobile Filmmaking & Framing:** Understanding visual storytelling and creative lighting.
* **Kid-Friendly Video Editing:** Hands-on cuts, transitions, sound effects, and voiceovers.
* **Positive Digital Footprint:** Using digital tools responsibly and ethically to inspire peers.`,
      coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
      ]),
      ctaText: "Join Digital Creators Cohort",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 4,
    },
    {
      title: "Junior Tech Hackathon: Eco-Inventions & Smart Cities",
      slug: "junior-tech-hackathon-eco-inventions",
      type: "ACTIVITY",
      status: "COMPLETED",
      category: "Maker Lab",
      eventDate: "January 28, 2026",
      eventTime: "9:30 AM - 4:00 PM",
      location: "Kidpreneur Arena & Maker Lab",
      summary: "28 young inventors teamed up to build working sensor-driven recycling bins, solar toys, and automated plant watering systems.",
      content: `### Young Innovators Building for a Greener Tomorrow!
Our 1-day hackathon challenged kids aged 8-14 to solve real environmental challenges through hands-on making.

#### Outstanding Inventions Created:
* **The Smart Solar Sorter:** Uses light sensors to detect and sort compostable materials.
* **Auto-Aqua Plant Minder:** Moisture-sensing probe linked to a micro-pump.
* **Cardboard City Cleaners:** Mobile rover chassis built from reclaimed cardboard and micro-servos.`,
      coverImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
      ]),
      ctaText: "Explore More Workshops",
      ctaUrl: "https://lab.the-kidpreneur-journey.com/register/lab",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 5,
    },
    {
      title: "Dr. Sarah Sidani: From Screen-Time to Game Creators",
      slug: "dr-sarah-sidani-from-screen-time-to-game-creators",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Parenting & Tech Reels",
      eventDate: "May 2, 2026",
      summary: "Turning gaming addictions into productive superpowers! Watch how our young students design logic flowcharts, sprites, and arcade mini-games.",
      content: "Kids love games; why not teach them how to build their own? Check out this reel on Instagram @kidpreneur.journey demonstrating our block coding curriculum.",
      coverImageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/kidpreneur.journey/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/kidpreneur.journey/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 6,
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
