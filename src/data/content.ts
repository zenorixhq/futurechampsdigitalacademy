export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  type: 'core' | 'guest';
  image: string;
  video?: string;
  experienceYears?: string;
  careerHighlights: string[];
  teachingExperience?: string[];
}

export const courseData = {
  tagline: "LEARN. CREATE. NETWORK.",
  overview: "FROM EUROPEAN CLUBS TO FIFA, AIFF, ISL, IPL, FEDERATIONS, ACADEMIES, SPORTS STARTUPS, AGENCIES, AND ATHLETE BRANDING—SPORTS ORGANIZATIONS ARE ACTIVELY LOOKING FOR SKILLED DIGITAL MARKETING AND MULTIMEDIA PROFESSIONALS.",
  curriculum: [
    {
      title: "Introduction to Sports Media",
      points: [
        "Understanding the sports media ecosystem",
        "Opportunities in sports media"
      ],
      assignment: "Graded Practical Assignment"
    },
    {
      title: "Sports Journalism & Reporting",
      points: [
        "How sports stories are written",
        "Match report",
        "Match analysis & commentary"
      ],
      assignment: "Graded Practical Assignment"
    },
    {
      title: "Social Media in Sports",
      points: [
        "Role of media in sports growth",
        "Broadcast rights & digital rights",
        "Matchday media operations",
        "Media accreditation & press protocol"
      ],
      assignment: "Graded Practical Assignment"
    },
    {
      title: "Interviewing Athletes & Media Ethics",
      points: [
        "Professional communication with players, coaches & clubs"
      ],
      assignment: "Graded Practical Assignment"
    },
    {
      title: "Building a Career in Sports Media",
      points: [
        "Accreditation",
        "Freelancing opportunities",
        "Networking & personal branding"
      ],
      assignment: "Graded Practical Assignment"
    },
    {
      title: "Sports Content Creator & Graphics",
      points: [
        "How to become a Sports Content Creator",
        "Finding clients & selling your work on social media",
        "Sports graphics in clubs, federations & tournaments"
      ],
      assignment: "Non-graded Assignment"
    },
    {
      title: "Sports Marketing Fundamentals",
      points: [
        "Sports marketing vs digital marketing",
        "Sports ecosystem (clubs, leagues, federations, brands, agencies)",
        "Fan psychology & emotional branding",
        "Revenue models in sports (tickets, merch, sponsors, media rights)",
        "Case studies"
      ]
    },
    {
      title: "Social Media Marketing for Sports",
      points: [
        "Mastering Instagram, Facebook, X & YouTube",
        "Matchday posting strategies",
        "Live content vs scheduled content",
        "Fan engagement tactics",
        "European clubs targeting Indian audiences via Indian content producers",
        "Meta ads"
      ]
    },
    {
      title: "Field Work & Training",
      points: [
        "Field work with club",
        "A match day",
        "Match day press conference"
      ]
    }
  ],
  practicalExperience: [
    "STADIUM FIELDWORK",
    "MATCHDAY ACCREDITATION ACCESS",
    "PITCH-SIDE EXPERIENCE",
    "PRESS CONFERENCE COVERAGE",
    "TRAINING SESSION ACCESS",
    "INDUSTRY EXPERT SESSIONS"
  ],
  careerOpportunities: [
    "FOOTBALL CLUBS",
    "SPORTS LEAGUES",
    "FEDERATIONS",
    "SPORTS AGENCIES",
    "ATHLETE MANAGEMENT COMPANIES",
    "SPORTS STARTUPS",
    "MEDIA & BROADCASTING"
  ]
};

export const facultyData: FacultyMember[] = [
  {
    id: "jushna-shahin",
    name: "JUSHNA SHAHIN",
    role: "LECTURER",
    type: "core",
    image: "/assets/images/jushna.jpg",
    careerHighlights: [
      "WRITER, LAND OF FOOTBALL (HOTSTAR)",
      "COMMUNICATIONS DEPARTMENT, REAL MADRID CF, SPAIN",
      "FREELANCE FOOTBALL JOURNALIST COVERED MAJOR TOURNAMENTS - UEFA, FIFA, LALIGA, COPA DEL REY",
      "PLAYER INTERVIEWS: PAPU GOMEZ, JESUS NAVAS"
    ],
    teachingExperience: [
      "THE CHOICE SCHOOL, KOCHI (SPANISH INSTRUCTOR)",
      "MINISTRY OF EDUCATION, SPAIN (SECONDARY SCHOOLS AND LANGUAGE INSTITUTES ENGLISH LANGUAGE ASSISTANT)"
    ]
  },
  {
    id: "lloyd-canfield",
    name: "LLOYD CANFIELD",
    role: "GUEST LECTURER",
    type: "guest",
    image: "/assets/images/lloyd.jpeg",
    video: "/assets/videos/lloyd intro video.mp4",
    experienceYears: "4 YEARS OF PROFESSIONAL EXPERIENCE",
    careerHighlights: [
      "2026 FIFA WORLD CUP",
      "COVERING CHELSEA FC AND ENGLAND",
      "2025 AND 2026 BALLON D'OR",
      "MATCH FOR HOPE IN QATAR",
      "INTERVIEWING USAIN BOLT"
    ]
  }
];
