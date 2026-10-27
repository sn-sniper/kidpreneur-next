import 'dotenv/config';
import { db } from '../src/lib/db';
import { portfolioItems } from '../src/db/schema';
import { eq, or } from 'drizzle-orm';

async function updateInstagramPosts() {
  console.log("Updating portfolio items with real active Instagram posts from @kidpreneur.journey...");

  // 1. Delete broken dummy/fake Instagram posts
  await db.delete(portfolioItems).where(
    or(
      eq(portfolioItems.instagramUrl, "https://www.instagram.com/p/C6r6-x0sK9d/"),
      eq(portfolioItems.instagramUrl, "https://www.instagram.com/kidpreneur.journey/")
    )
  );

  // 2. Insert the real, authentic Instagram posts from @kidpreneur.journey
  const realPosts = [
    {
      title: "From Curiosity to Business: Self Discovery Journey",
      slug: "from-curiosity-to-business-self-discovery",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Bootcamp Reel",
      eventDate: "Recent Highlight",
      summary: "Every Friday hands-on journey helping kids ages 9-13 build digital skills, soft skills, and business mindset through play at Koozpace Yarzeh.",
      content: "From Curiosity to Business! Hands-on entrepreneurship and self-discovery workshop by Dr. Sarah Sidani. Watch our young founders explore real-world problem solving.",
      coverImageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DcynKmHDFCX/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/p/DcynKmHDFCX/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 3,
    },
    {
      title: "More Creating, Less Scrolling: The Entrepreneur Mindset",
      slug: "more-creating-less-scrolling-entrepreneur-mindset",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Classroom Reels",
      eventDate: "Recent Highlight",
      summary: "Full bloom — that's the entrepreneur mindset! Watch how our young students transition from passive screen consumers into active digital creators and innovators.",
      content: "More creating, less scrolling. Watch Dr. Sarah Sidani and young innovators in action testing creative prototypes and developing their digital eye on Instagram @kidpreneur.journey.",
      coverImageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
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
      slug: "what-does-creative-thinking-truly-mean",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Parenting & Mindset",
      eventDate: "Classroom Moments",
      summary: "Teaching young minds to look at challenges from different angles and uncover innovative solutions no one else saw.",
      content: "شو يعني تفكير إبداعي؟ إنو طفلك يتعلم يشوف الأمور من زوايا مختلفة ويلاقي حلول ما كانت على بال حدا. Follow @kidpreneur.journey on Instagram.",
      coverImageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
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
      slug: "play-based-learning-experiential-teamwork",
      type: "INSTAGRAM",
      status: "COMPLETED",
      category: "Classroom Reels",
      eventDate: "Workshop Moments",
      summary: "مبين الأولاد بس عم يلعبوا؟ Behind every game is a structured lesson in team collaboration, critical thinking, and early enterprise fundamentals.",
      content: "Behind every game is a structured lesson in team collaboration and critical thinking. Follow @kidpreneur.journey on Instagram for behind-the-scenes moments.",
      coverImageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      galleryImages: "[]",
      instagramUrl: "https://www.instagram.com/p/DecT3k-CA9b/",
      ctaText: "Watch Reel on Instagram",
      ctaUrl: "https://www.instagram.com/p/DecT3k-CA9b/",
      isFeatured: 1,
      isPublished: 1,
      orderIndex: 8,
    }
  ];

  for (const item of realPosts) {
    await db.insert(portfolioItems).values(item).onConflictDoNothing();
  }

  console.log("Successfully updated with real active Instagram posts!");
}

updateInstagramPosts()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
