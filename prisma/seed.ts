import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

// Automatically load .env.local or .env if present
try {
  process.loadEnvFile?.('.env.local')
} catch {
  try {
    process.loadEnvFile?.('.env')
  } catch {
    // Rely on environment variables
  }
}

const prisma = new PrismaClient()

const PLACEHOLDER = '/assets/images/placeholder.png'

async function main() {
  console.log(`Start seeding ...`)

  // Clear existing data
  await prisma.placement.deleteMany()
  await prisma.post.deleteMany()
  await prisma.project.deleteMany()
  await prisma.faculty.deleteMany()

  // Seed Placements
  const placements = [
    { studentName: 'Aiswarya Raj', companyName: 'Lulu Group International', role: 'Digital Marketing Executive', image: PLACEHOLDER },
    { studentName: 'Mohammed Rashid', companyName: 'Kerala Blasters FC', role: 'Social Media Manager', image: PLACEHOLDER },
    { studentName: 'Sruthi K', companyName: 'Kannur Warriors FC', role: 'Content Creator', image: PLACEHOLDER },
    { studentName: 'Rahul Dev', companyName: 'Super League Kerala', role: 'Broadcast Assistant', image: PLACEHOLDER },
    { studentName: 'Fathima Nuha', companyName: 'Ogilvy', role: 'SEO Analyst', image: PLACEHOLDER },
    { studentName: 'Arjun Das', companyName: 'Techoriz Digital', role: 'Performance Marketer', image: PLACEHOLDER },
  ]

  for (const p of placements) {
    const placement = await prisma.placement.create({ data: p })
    console.log(`Created placement for: ${placement.studentName}`)
  }

  // Seed Posts (Blog)
  const posts = [
    {
      title: 'How Sports Marketing is Evolving in India',
      slug: 'how-sports-marketing-is-evolving',
      excerpt: 'The sports marketing landscape in India is undergoing a massive transformation with the rise of franchise leagues and digital media.',
      content: 'The sports marketing landscape in India is undergoing a massive transformation with the rise of franchise leagues and digital media...',
      image: PLACEHOLDER,
      publishedAt: new Date(),
    },
    {
      title: 'A Day in the Life of a Football Media Officer',
      slug: 'day-in-the-life-football-media-officer',
      excerpt: 'What does it take to manage the media operations for a professional football club on matchday?',
      content: 'What does it take to manage the media operations for a professional football club on matchday? It starts early...',
      image: PLACEHOLDER,
      publishedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      title: 'Top 5 Digital Skills Every Sports Professional Needs',
      slug: 'top-5-digital-skills-sports-professional',
      excerpt: 'From video editing to social media analytics, here are the top 5 skills you need to succeed in the modern sports industry.',
      content: 'From video editing to social media analytics, here are the top 5 skills you need to succeed in the modern sports industry...',
      image: PLACEHOLDER,
      publishedAt: new Date(Date.now() - 86400000 * 5),
    },
  ]

  for (const p of posts) {
    const post = await prisma.post.create({ data: p })
    console.log(`Created post: ${post.title}`)
  }

  // Seed Projects (home page portfolio)
  const projects = [
    {
      title: 'Kannur Warriors FC Partnership',
      categories: ['Matchday Media', 'Broadcast Production'],
      image: '/assets/images/kannur-warriors-champions.jpg',
      imageAlt: 'Kannur Warriors FC champions team photo',
      order: 1,
    },
    { title: 'Super League Kerala Campaign', categories: ['Digital Marketing', 'Club Marketing'], image: PLACEHOLDER, order: 2 },
    { title: 'Live Match Commentary', categories: ['Broadcast Production', 'Matchday Media'], image: PLACEHOLDER, order: 3 },
    { title: 'Fan Engagement Analytics', categories: ['Digital Marketing'], image: PLACEHOLDER, order: 4 },
  ]

  for (const p of projects) {
    const project = await prisma.project.create({ data: p })
    console.log(`Created project: ${project.title}`)
  }

  // Seed Faculty
  const faculty = [
    {
      name: "JUSHNA SHAHIN",
      role: "LECTURER",
      category: "core",
      image: "/assets/images/jushna.jpg",
      careerHighlights: [
        "WRITER, LAND OF FOOTBALL (HOTSTAR)",
        "COMMUNICATIONS DEPARTMENT, REAL MADRID CF, SPAIN",
        "FREELANCE FOOTBALL JOURNALIST COVERED MAJOR TOURNAMENTS - UEFA, FIFA, LALIGA, COPA DEL REY",
        "PLAYER INTERVIEWS: PAPU GOMEZ, JESUS NAVAS",
      ],
      teachingExperience: [
        "THE CHOICE SCHOOL, KOCHI (SPANISH INSTRUCTOR)",
        "MINISTRY OF EDUCATION, SPAIN (SECONDARY SCHOOLS AND LANGUAGE INSTITUTES ENGLISH LANGUAGE ASSISTANT)",
      ],
      order: 1,
    },
    {
      name: "LLOYD CANFIELD",
      role: "GUEST LECTURER",
      category: "guest",
      image: "/assets/images/lloyd.jpeg",
      video: "/assets/videos/lloyd intro video.mp4",
      experienceYears: "4 YEARS OF PROFESSIONAL EXPERIENCE",
      careerHighlights: [
        "2026 FIFA WORLD CUP",
        "COVERING CHELSEA FC AND ENGLAND",
        "2025 AND 2026 BALLON D'OR",
        "MATCH FOR HOPE IN QATAR",
        "INTERVIEWING USAIN BOLT",
      ],
      teachingExperience: [],
      order: 2,
    },
    {
      name: "Mukund",
      role: "Head of PR and Communications",
      category: "team",
      image: "https://tq1vyl1r3w.ufs.sh/f/S0YvW51nKk3e6KowU80V4X9R0n5xH1G3F2y7zLj8uK9rT8lJ",
      careerHighlights: [],
      teachingExperience: [],
      order: 3,
    },
    {
      name: "Shahana U P",
      role: "Academic Councillor",
      category: "team",
      image: "https://tq1vyl1r3w.ufs.sh/f/S0YvW51nKk3eqVl98iA3zZkV1o9P0L8T7vY6bJ3fM4cQn5hD",
      careerHighlights: [],
      teachingExperience: [],
      order: 4,
    },
    {
      name: "Nandana Bineesh",
      role: "Learning Advisor",
      category: "team",
      image: "https://tq1vyl1r3w.ufs.sh/f/S0YvW51nKk3e8K1zG29L3M9q6zP2V7X1Y5nK8bH4jC0xT6wB",
      careerHighlights: [],
      teachingExperience: [],
      order: 5,
    },
    {
      name: "Muhammed Sahal",
      role: "Content Strategist",
      category: "team",
      image: "https://tq1vyl1r3w.ufs.sh/f/S0YvW51nKk3erT9n5xK1oP2X5T7vL8hM6k3R9yC0bH1F4Z9n",
      careerHighlights: [],
      teachingExperience: [],
      order: 6,
    },
  ]

  for (const f of faculty) {
    const member = await prisma.faculty.create({ data: f })
    console.log(`Created faculty: ${member.name}`)
  }

  // Seed Site Images (upsert so re-seeding never wipes admin uploads)
  const siteImages = [
    { key: 'about-hero', url: PLACEHOLDER, alt: 'About Future Champs' },
    { key: 'course-hero', url: PLACEHOLDER, alt: 'Course' },
    { key: 'contact-hero', url: PLACEHOLDER, alt: 'Contact' },
    { key: 'faculty-hero', url: PLACEHOLDER, alt: 'Faculty' },
    { key: 'placements-hero', url: PLACEHOLDER, alt: 'Placements' },
    { key: 'blog-hero', url: PLACEHOLDER, alt: 'Blog' },
    { key: 'blog-detail-default', url: PLACEHOLDER, alt: 'Blog post' },
    { key: 'partner-photo', url: '/assets/images/kannur-warriors-celebration.jpg', alt: 'Kannur Warriors FC celebrating' },
    { key: 'leader-praveen', url: PLACEHOLDER, alt: 'Praveen Raman' },
    { key: 'leader-regin', url: PLACEHOLDER, alt: 'Regin C' },
    { key: 'leader-sayandh', url: PLACEHOLDER, alt: 'Sayandh T M' },
    { key: 'team-mukund', url: PLACEHOLDER, alt: 'Mukund' },
    { key: 'team-shahana', url: PLACEHOLDER, alt: 'Shahana U P' },
    { key: 'team-nandana', url: PLACEHOLDER, alt: 'Nandana Bineesh' },
    { key: 'team-sahal', url: PLACEHOLDER, alt: 'Muhammed Sahal' },
    { key: 'faculty-jushna', url: '/assets/images/jushna.jpg', alt: 'Jushna Shahin' },
  ]

  for (const img of siteImages) {
    await prisma.siteImage.upsert({
      where: { key: img.key },
      update: {},
      create: img,
    })
    console.log(`Ensured site image: ${img.key}`)
  }

  // Seed admin user
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.user.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash },
    })
    console.log(`Ensured admin user: ${email}`)
  } else {
    console.warn('ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user seed')
  }

  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
