import type { ChurchInfo, ServiceSchedule, Ministry, Sermon, ChurchEvent, Leader, BeliefItem } from '../types';

/**
 * =======================================================================
 * JESUS CHRIST LORD & SAVIOR CHURCH (JCLS) - CENTRAL DATA REPOSITORY
 * =======================================================================
 * 
 * Official Church Information:
 * - Address: 71 Hills Street Talanay Area C, Brgy. Batasan Hills, Quezon City, Metro Manila
 * - Contact: 09158744311
 * - Email: jesuschristlordandsavior@gmail.com
 * - Doctrine: The 16 Fundamental Truths of the Assemblies of God
 */

export const churchInfo: ChurchInfo = {
  name: 'Jesus Christ Lord & Savior Church',
  shortName: 'JCLS Church',
  tagline: 'Go and Make Disciples',
  themeScripture: {
    verse: 'Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all things that I have commanded you; and lo, I am with you always, even to the end of the age.',
    reference: 'Matthew 28:19–20'
  },
  visionStatement: 'To be a vibrant, Christ-centered, Spirit-empowered congregation advancing God’s Kingdom, transforming lives, and raising passionate disciples in Batasan Hills, Quezon City and beyond.',
  missionStatement: 'Dedicated to passionate worship, sound Pentecostal teaching, loving fellowship, and intentional discipleship—empowering every believer to live out the Great Commission.',
  city: 'Quezon City',
  country: 'Philippines',
  locationName: 'Jesus Christ Lord & Savior Church (Batasan Hills)',
  addressLine1: '71 Hills Street, Talanay Area C',
  addressLine2: 'Brgy. Batasan Hills, Quezon City, Metro Manila',
  phone: '09158744311',
  email: 'jesuschristlordandsavior@gmail.com',
  officeHours: 'Tuesday – Saturday: 9:00 AM – 5:00 PM | Sunday Services: 9:00 AM – 5:00 PM',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100064906381049',
  youtubeUrl: 'https://www.youtube.com',
  instagramUrl: 'https://www.instagram.com',
  logo: '/images/church-logo.png',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jesus+Christ+Lord+and+Savior+Church+71+Hills+Street+Talanay+Area+C+Brgy+Batasan+Hills+Quezon+City',
  isAddressPendingVerification: false
};

export const serviceSchedules: ServiceSchedule[] = [
  {
    id: 'sunday-main-service',
    day: 'Every Sunday',
    time: '9:00 AM – 12:00 NN',
    name: 'Main Celebration Service',
    description: 'Our primary corporate celebration gathering featuring vibrant Spirit-led praise and worship, biblical preaching from the Word of God, and personal ministry for families and believers of all ages.',
    location: 'Main Sanctuary • 71 Hills Street, Batasan Hills',
    isOnlineStreamed: true,
    isPlaceholder: false
  },
  {
    id: 'sunday-young-pro',
    day: 'Every 2nd and 3rd Sunday',
    time: '1:30 PM – 3:00 PM',
    name: 'Young Professionals Fellowship',
    description: 'A focused community of working young professionals and college graduates gathering for biblical mentorship, career guidance, godly leadership, and mutual encouragement in the marketplace.',
    location: 'Fellowship Hall • 71 Hills Street, Batasan Hills',
    isOnlineStreamed: false,
    isPlaceholder: false
  },
  {
    id: 'sunday-youth',
    day: 'Every Sunday',
    time: '3:00 PM – 5:00 PM',
    name: 'Youth Fellowship (#JCLSYoungPro)',
    description: 'An energetic, passionate gathering for high school and university youth to encounter the Holy Spirit, grow deep in discipleship, build authentic friendships, and live boldly for Christ.',
    location: 'Main Sanctuary • 71 Hills Street, Batasan Hills',
    isOnlineStreamed: false,
    isPlaceholder: false
  },
  {
    id: 'saturday-rehearsals',
    day: 'Every Saturday',
    time: '5:00 PM – 9:00 PM',
    name: 'Musicians & Worship Team Rehearsal',
    description: 'Dedicated spiritual preparation, prayer, vocal harmonization, and instrumental rehearsals for our praise and worship musicians preparing for Sunday ministry.',
    location: 'Music Sanctuary • 71 Hills Street, Batasan Hills',
    isOnlineStreamed: false,
    isPlaceholder: false
  }
];

export const ministriesData: Ministry[] = [
  {
    id: 'worship-creative',
    name: 'Worship & Music Ministry',
    category: 'worship',
    tagline: 'Leading the congregation into spirit-filled adoring praise of Jesus.',
    description: 'Our musicians, vocalists, and sound team prepare weekly in prayer and practice to foster an atmosphere where the Holy Spirit moves freely and Jesus Christ is glorified.',
    schedule: 'Rehearsals: Saturdays from 5:00 PM – 9:00 PM | Services: Sundays',
    audience: 'Vocalists, musicians, audio-visual technical team',
    image: '/images/hero-worship.jpg',
    leaderTitle: 'Worship Ministry Lead',
    isPlaceholder: false
  },
  {
    id: 'young-pro',
    name: 'Young Professionals Ministry',
    category: 'generation',
    tagline: 'Equipping believers to shine as Christ’s ambassadors in the workplace.',
    description: 'Mentoring young working adults in career excellence, biblical ethics, kingdom stewardship, and authentic Christian brotherhood and sisterhood.',
    schedule: 'Every 2nd and 3rd Sunday at 1:30 PM – 3:00 PM',
    audience: 'Graduates, working professionals, and career builders',
    image: '/images/community-fellowship.jpg',
    leaderTitle: 'Young Pro Director',
    isPlaceholder: false
  },
  {
    id: 'youth-generation',
    name: 'Youth Fellowship (#JCLSYoungPro)',
    category: 'generation',
    tagline: 'Raising an unashamed generation ablaze for the Gospel.',
    description: 'A dynamic, welcoming environment where students navigate teen and college life, experience the power of the Holy Spirit, and build lasting godly friendships.',
    schedule: 'Sundays at 3:00 PM – 5:00 PM',
    audience: 'High school and university students',
    image: '/images/youth-ministry.jpg',
    leaderTitle: 'Youth Pastor / Coordinator',
    isPlaceholder: false
  },
  {
    id: 'kids-kingdom',
    name: 'JCLS Children’s Church',
    category: 'generation',
    tagline: 'Instilling God’s Word and love into young hearts.',
    description: 'Fun, age-appropriate Bible lessons, energetic praise songs, crafts, and caring teachers providing a safe, joyful atmosphere during our Sunday Morning Service.',
    schedule: 'Sundays at 9:00 AM – 12:00 NN (Concurrent with Main Service)',
    audience: 'Ages 2 to 12 (Toddlers to Grade 6)',
    image: '/images/kids-ministry.jpg',
    leaderTitle: 'Children’s Ministry Team',
    isPlaceholder: false
  },
  {
    id: 'prayer-intercession',
    name: 'Intercession & Pastoral Care',
    category: 'care',
    tagline: 'Standing in the gap through fervent prayer and compassionate care.',
    description: 'A devoted ministry committed to praying over church family needs, visiting the sick, hospital care, and interceding for revival in Batasan Hills and Quezon City.',
    schedule: 'Weekly Intercessory Prayer & Post-Service Ministry',
    audience: 'Open to all seeking prayer or called to intercede',
    image: '/images/prayer-ministry.jpg',
    leaderTitle: 'Prayer Ministry Coordinator',
    isPlaceholder: false
  },
  {
    id: 'discipleship-evangelism',
    name: 'Discipleship & Community Outreach',
    category: 'outreach',
    tagline: 'Fulfilling the Great Commission of Matthew 28:19–20.',
    description: 'Actively bringing Christ’s love to the communities of Talanay and Batasan Hills through cell groups, community evangelism, compassion ministry, and believer baptism classes.',
    schedule: 'Weekly Cell Gatherings & Monthly Outreach',
    audience: 'Volunteers and community seekers',
    image: '/images/pastor-preaching.jpg',
    leaderTitle: 'Outreach & Cell Ministry Coordinator',
    isPlaceholder: false
  }
];

export const sermonsData: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'The Great Commission: Walking in Divine Authority',
    series: 'Go and Make Disciples',
    speaker: 'Pastor in Charge',
    speakerRole: 'Senior Pastor',
    date: 'October 11, 2026',
    passage: 'Matthew 28:18–20',
    description: 'Jesus gave His Church a mandate backed by all authority in heaven and on earth. Discover how every believer in Batasan Hills is called and anointed to be a disciple-maker.',
    duration: '45 min',
    videoUrl: 'https://www.youtube.com/embed/g3m7r59pQZ0', // Dignified Christian praise & worship reflection
    thumbnail: '/images/pastor-preaching.jpg',
    notes: [
      'All authority in heaven and earth belongs to Jesus Christ.',
      'The Great Commission is not a suggestion; it is the heartbeat of the Church.',
      'Making disciples begins with genuine love, truth, and intentional fellowship.',
      'The unfailing promise: "I am with you always, even to the end of the age."'
    ],
    keyVerses: ['Matthew 28:18–20', 'Acts 1:8', 'Mark 16:15–18'],
    isFeatured: true,
    isPlaceholder: false
  },
  {
    id: 'sermon-2',
    title: 'Empowered by the Holy Spirit: The Pentecostal Reality',
    series: 'Spirit-Filled Living',
    speaker: 'Pastor in Charge',
    speakerRole: 'Senior Pastor',
    date: 'October 4, 2026',
    passage: 'Acts 2:1–4, 38–39',
    description: 'The baptism in the Holy Spirit is an experience promised to all believers, empowering us with divine boldness, supernatural gifts, and a passion for witness.',
    duration: '48 min',
    videoUrl: 'https://www.youtube.com/embed/g3m7r59pQZ0',
    thumbnail: '/images/hero-worship.jpg',
    notes: [
      'The Holy Spirit empowers our witness beyond human strength.',
      'Speaking in other tongues as the Spirit enables is the initial physical evidence.',
      'The promise is for you, your children, and all who are far off.'
    ],
    keyVerses: ['Acts 2:1-4', 'Acts 2:38-39', '1 Corinthians 12:4-11'],
    isFeatured: false,
    isPlaceholder: false
  },
  {
    id: 'sermon-3',
    title: 'Divine Healing: Christ the Healer Still Today',
    series: 'Fundamental Truths',
    speaker: 'Pastoral Team',
    speakerRole: 'Associate Minister',
    date: 'September 27, 2026',
    passage: 'Isaiah 53:4–5 & James 5:14–16',
    description: 'By His stripes we are healed. Exploring God’s covenant promise of physical and emotional healing provided through Christ’s redemptive work at Calvary.',
    duration: '42 min',
    videoUrl: 'https://www.youtube.com/embed/g3m7r59pQZ0',
    thumbnail: '/images/prayer-ministry.jpg',
    notes: [
      'Christ bore our infirmities and carried our sorrows on the cross.',
      'The prayer of faith will save the sick, and the Lord will raise them up.',
      'Healing is a privilege provided for every believer in Christ.'
    ],
    keyVerses: ['Isaiah 53:4-5', 'Matthew 8:16-17', 'James 5:14-16'],
    isFeatured: false,
    isPlaceholder: false
  },
  {
    id: 'sermon-4',
    title: 'The Blessed Hope: Anchored in Christ’s Imminent Return',
    series: 'End Times & Hope',
    speaker: 'Pastor in Charge',
    speakerRole: 'Senior Pastor',
    date: 'September 20, 2026',
    passage: '1 Thessalonians 4:13–18 & Titus 2:13',
    description: 'In an uncertain world, our hope is anchored in the visible, triumphant return of Jesus Christ to gather His Church and establish His righteous kingdom.',
    duration: '40 min',
    videoUrl: 'https://www.youtube.com/embed/g3m7r59pQZ0',
    thumbnail: '/images/youth-ministry.jpg',
    notes: [
      'Looking for the blessed hope and glorious appearing of our great God and Savior.',
      'The dead in Christ will rise first, and we who are alive will be caught up together.',
      'Live with expectancy, holy conduct, and urgency in evangelism.'
    ],
    keyVerses: ['1 Thessalonians 4:16-17', 'Titus 2:13', 'Revelation 22:20'],
    isFeatured: false,
    isPlaceholder: false
  }
];

export const churchEvents: ChurchEvent[] = [
  {
    id: 'event-1',
    title: 'Annual Church Anniversary & Thanksgiving Celebration',
    category: 'conference',
    dateDisplay: 'Sunday, November 8, 2026',
    isoDate: '2026-11-08',
    time: '9:00 AM – 1:00 PM',
    location: 'JCLS Sanctuary • 71 Hills Street, Batasan Hills, QC',
    description: 'Join us as we give all glory to God for His faithfulness to Jesus Christ Lord & Savior Church with combined praise, special presentations, and an anniversary feast.',
    image: '/images/hero-worship.jpg',
    registrationRequired: true,
    registrationStatus: 'open',
    highlight: true,
    isPlaceholder: false
  },
  {
    id: 'event-2',
    title: 'Ignite: Youth & Young Pro Night of Worship',
    category: 'youth',
    dateDisplay: 'Every Sunday',
    isoDate: '2026-10-25',
    time: '1:30 PM (Young Pro) & 3:00 PM (Youth)',
    location: 'JCLS Sanctuary • 71 Hills Street, Batasan Hills, QC',
    description: 'An uplifting gathering featuring praise and worship, personal testimonies, and an empowering message for students and working young adults (#JCLSYoungPro).',
    image: '/images/youth-ministry.jpg',
    registrationRequired: false,
    highlight: false,
    isPlaceholder: false
  },
  {
    id: 'event-3',
    title: 'Musicians & Praise Team Rehearsal',
    category: 'fellowship',
    dateDisplay: 'Every Saturday',
    isoDate: '2026-10-24',
    time: '5:00 PM – 9:00 PM',
    location: 'JCLS Sanctuary • 71 Hills Street, Batasan Hills, QC',
    description: 'Weekly team practice, prayer, and vocal harmonization for our instrumentalists, sound technicians, and singers preparing for Sunday celebration.',
    image: '/images/hero-worship.jpg',
    registrationRequired: false,
    highlight: false,
    isPlaceholder: false
  },
  {
    id: 'event-4',
    title: 'Believer’s Water Baptism & Discipleship Class',
    category: 'fellowship',
    dateDisplay: 'Saturday, November 21, 2026',
    isoDate: '2026-11-21',
    time: '8:00 AM – 12:00 PM',
    location: 'JCLS Grounds & Baptismal Pool',
    description: 'Public identification with Jesus Christ in His death, burial, and resurrection through water baptism by immersion according to the Scriptures.',
    image: '/images/community-fellowship.jpg',
    registrationRequired: true,
    registrationStatus: 'open',
    highlight: false,
    isPlaceholder: false
  }
];

export const leadershipTeam: Leader[] = [
  {
    id: 'pastor-head',
    name: 'Senior Pastor & Head Minister',
    role: 'Senior Pastor',
    bio: 'Faithfully shepherding the flock of Jesus Christ Lord & Savior Church in Batasan Hills, preaching the uncompromised Word of God and casting vision for regional revival and kingdom discipleship.',
    image: '/images/pastor-preaching.jpg',
    isPlaceholder: true
  },
  {
    id: 'pastor-associate',
    name: 'Associate Pastor & Pastoral Care',
    role: 'Associate Pastor',
    bio: 'Overseeing member visitation, family counseling, cell group discipleship, and hospital prayer ministry with a compassionate shepherd’s heart.',
    image: '/images/community-fellowship.jpg',
    isPlaceholder: true
  },
  {
    id: 'leader-youngpro-youth',
    name: 'Youth & Young Professionals Director',
    role: 'Youth & Marketplace Ministry',
    bio: 'Guiding university students and marketplace professionals into Christlike character, purposeful living, and bold evangelism throughout Metro Manila.',
    image: '/images/youth-ministry.jpg',
    isPlaceholder: true
  },
  {
    id: 'leader-worship',
    name: 'Worship & Creative Arts Director',
    role: 'Music Ministry Leader',
    bio: 'Leading our Saturday musician rehearsals (5:00 PM – 9:00 PM) and guiding Sunday worship into spirit-filled praise exalting the Lord Jesus Christ.',
    image: '/images/hero-worship.jpg',
    isPlaceholder: true
  }
];

/**
 * =======================================================================
 * THE 16 FUNDAMENTAL TRUTHS OF THE ASSEMBLIES OF GOD
 * =======================================================================
 * The doctrinal foundation of Jesus Christ Lord & Savior Church.
 */
export const beliefsData: BeliefItem[] = [
  {
    id: 'truth-1',
    topic: '1. The Scriptures Inspired',
    summary: 'The Bible is the inspired Word of God and our authoritative guide for faith and conduct.',
    scriptureReferences: ['2 Timothy 3:15–17', '1 Thessalonians 2:13', '2 Peter 1:21'],
    details: 'The Scriptures, both the Old and New Testaments, are verbally inspired of God and are the revelation of God to man, the infallible, authoritative rule of faith and conduct.'
  },
  {
    id: 'truth-2',
    topic: '2. The One True God',
    summary: 'We believe in one true God, eternally existing as Father, Son, and Holy Spirit.',
    scriptureReferences: ['Deuteronomy 6:4', 'Isaiah 43:10–11', 'Matthew 28:19', 'Luke 3:22'],
    details: 'The one true God has revealed Himself as the eternally self-existent "I AM," the Creator of heaven and earth and the Redeemer of mankind. He has further revealed Himself as embodying the principles of relationship and association as Father, Son, and Holy Spirit.'
  },
  {
    id: 'truth-3',
    topic: '3. The Deity of the Lord Jesus Christ',
    summary: 'Jesus Christ is the Son of God, fully divine, who died for our sins and rose bodily.',
    scriptureReferences: ['Matthew 1:23', 'Hebrews 7:26', '1 Corinthians 15:3–4', 'Acts 1:9, 11'],
    details: 'The Lord Jesus Christ is the eternal Son of God. The Scriptures declare His virgin birth, sinless life, miracles, substitutionary work on the cross, bodily resurrection from the dead, and exaltation at the right hand of God.'
  },
  {
    id: 'truth-4',
    topic: '4. The Fall of Man',
    summary: 'Humanity was created good and upright but fell into sin through disobedience.',
    scriptureReferences: ['Genesis 1:26–27', 'Genesis 2:17', 'Genesis 3:6', 'Romans 5:12–19'],
    details: 'Man was created good and upright; for God said, "Let us make man in our image, after our likeness." However, man by voluntary transgression fell and thereby incurred not only physical death but also spiritual death, which is separation from God.'
  },
  {
    id: 'truth-5',
    topic: '5. The Salvation of Man',
    summary: 'Salvation comes through Jesus Christ alone, by God’s grace, received through repentance and faith.',
    scriptureReferences: ['Luke 24:47', 'John 3:3', 'Romans 10:13–15', 'Ephesians 2:8', 'Titus 2:11'],
    details: 'Man\'s only hope of redemption is through the shed blood of Jesus Christ the Son of God. Salvation is received through repentance toward God and faith toward the Lord Jesus Christ, resulting in inward evidence of the Spirit and outward evidence of a life of righteousness.'
  },
  {
    id: 'truth-6',
    topic: '6. The Ordinances of the Church',
    summary: 'Water baptism by immersion and Holy Communion as ordinances established by Christ.',
    scriptureReferences: ['Matthew 28:19', 'Mark 16:16', 'Acts 10:47–48', '1 Corinthians 11:26'],
    details: 'Baptism in water: The ordinance of baptism by immersion is commanded by the Scriptures for all who have repented and believed on Christ as Savior and Lord. Holy Communion: The Lord\'s Supper, consisting of the elements—bread and the fruit of the vine—expresses our sharing the divine nature of our Lord Jesus Christ, a memorial of His suffering and death, and a prophecy of His second coming.'
  },
  {
    id: 'truth-7',
    topic: '7. The Baptism in the Holy Spirit',
    summary: 'An experience distinct from and following the new birth, empowering believers for witness.',
    scriptureReferences: ['Luke 24:49', 'Acts 1:4, 8', '1 Corinthians 12:1–31', 'Acts 10:44–46'],
    details: 'All believers are entitled to and should ardently expect and earnestly seek the promise of the Father, the baptism in the Holy Spirit and fire, according to the command of our Lord Jesus Christ. This was the normal experience of all in the early Christian Church, imparting power for life and service.'
  },
  {
    id: 'truth-8',
    topic: '8. The Initial Physical Evidence of the Baptism in the Holy Spirit',
    summary: 'The initial physical evidence is speaking in other tongues as the Spirit enables.',
    scriptureReferences: ['Acts 2:4', '1 Corinthians 12:4–10', '1 Corinthians 12:28'],
    details: 'The baptism of believers in the Holy Spirit is witnessed by the initial physical sign of speaking with other tongues as the Spirit of God gives them utterance (Acts 2:4). The speaking in tongues in this instance is the same in essence as the gift of tongues, but distinct in purpose and use.'
  },
  {
    id: 'truth-9',
    topic: '9. Sanctification',
    summary: 'Being separated from evil and dedicated to God, living a holy life through Christ and the Spirit.',
    scriptureReferences: ['Hebrews 12:14', '1 Peter 1:15–16', '1 Thessalonians 5:23–24', 'Romans 12:1–2'],
    details: 'Sanctification is an act of separation from that which is evil, and of dedication unto God. The Scriptures teach a life of "holiness without which no man shall see the Lord." By the power of the Holy Spirit we are able to obey the command: "Be ye holy, for I am holy."'
  },
  {
    id: 'truth-10',
    topic: '10. The Church and Its Mission',
    summary: 'The Church is the body of Christ called to evangelize, worship, disciple, and show compassion.',
    scriptureReferences: ['Ephesians 1:22–23', 'Ephesians 2:22', 'Hebrews 12:23', 'Matthew 28:19–20'],
    details: 'The Church is the Body of Christ, the habitation of God through the Spirit, with divine appointments for the fulfillment of her great commission. Each believer, born of the Spirit, is an integral part of the General Assembly and Church of the Firstborn, called to evangelize the world and minister to needs.'
  },
  {
    id: 'truth-11',
    topic: '11. The Ministry',
    summary: 'God calls and equips ministers to lead the Church in evangelism, worship, and service.',
    scriptureReferences: ['Mark 16:15–20', 'John 4:23–24', 'Ephesians 4:11–16'],
    details: 'A divinely called and scripturally ordained ministry has been provided by our Lord for the fourfold purpose of leading the Church in: (1) Evangelization of the world, (2) Worship of God, (3) Building a body of saints being perfected in the image of His Son, and (4) Meeting human need with ministries of love and compassion.'
  },
  {
    id: 'truth-12',
    topic: '12. Divine Healing',
    summary: 'Divine healing is provided through Christ’s redemptive work and is available to believers.',
    scriptureReferences: ['Isaiah 53:4–5', 'Matthew 8:16–17', 'James 5:14–16'],
    details: 'Divine healing is an integral part of the gospel. Deliverance from sickness is provided for in the atonement, and is the privilege of all believers through the prayer of faith.'
  },
  {
    id: 'truth-13',
    topic: '13. The Blessed Hope',
    summary: 'The imminent return of Jesus Christ, the resurrection of believers, and being gathered with Him.',
    scriptureReferences: ['1 Thessalonians 4:16–17', 'Romans 8:23', 'Titus 2:13', '1 Corinthians 15:51–52'],
    details: 'The resurrection of those who have fallen asleep in Christ and their translation together with those who are alive and remain unto the coming of the Lord is the imminent and blessed hope of the church.'
  },
  {
    id: 'truth-14',
    topic: '14. The Millennial Reign of Christ',
    summary: 'Jesus Christ will return visibly and reign on earth for a thousand years.',
    scriptureReferences: ['Zechariah 14:5', 'Matthew 24:27', 'Matthew 24:30', 'Revelation 1:7', 'Revelation 20:1–6'],
    details: 'The second coming of Christ includes the rapture of the saints, which is our blessed hope, followed by the visible return of Christ with His saints to reign on earth for one thousand years. This millennial reign will bring the salvation of national Israel and the establishment of universal peace.'
  },
  {
    id: 'truth-15',
    topic: '15. The Final Judgment',
    summary: 'There will be a final judgment with eternal consequences for those not in the Book of Life.',
    scriptureReferences: ['Matthew 25:46', 'Mark 9:43–48', 'Revelation 19:20', 'Revelation 20:11–15', 'Revelation 21:8'],
    details: 'There will be a final judgment in which the wicked dead will be raised and judged according to their works. Whosoever is not found written in the Book of Life, together with the devil and his angels, the beast and the false prophet, will be consigned to the everlasting punishment in the lake of fire.'
  },
  {
    id: 'truth-16',
    topic: '16. The New Heavens and the New Earth',
    summary: 'God will establish a new heaven and a new earth where righteousness dwells forever.',
    scriptureReferences: ['2 Peter 3:13', 'Revelation 21', 'Revelation 22'],
    details: '"We, according to His promise, look for new heavens and a new earth wherein dwelleth righteousness." Christ will wipe every tear from our eyes, and there shall be no more death, sorrow, or crying, for the former things have passed away.'
  }
];

export const coreValues = [
  {
    title: 'Presence-Driven Worship',
    subtitle: 'Exalting Jesus Above All',
    description: 'We believe that true transformation happens when God’s manifest presence is welcomed and honored in reverent, spirit-led praise.'
  },
  {
    title: 'Pentecostal Power',
    subtitle: 'Empowered by the Holy Spirit',
    description: 'Walking in the full reality of Acts 2:4—speaking in tongues, praying in the Spirit, and operating in divine healing and spiritual gifts.'
  },
  {
    title: 'Intentional Discipleship',
    subtitle: 'Matthew 28:19–20',
    description: 'We do not measure success simply by attendance, but by disciples made—believers who walk in maturity, holiness, and fruitfulness.'
  },
  {
    title: 'Authentic Family',
    subtitle: 'Batasan Hills Community',
    description: 'God never intended for us to walk alone. We cultivate a loving, multi-generational household of faith where everyone is cherished.'
  },
  {
    title: 'Kingdom Impact',
    subtitle: 'Light to Quezon City & Beyond',
    description: 'Empowered by the Spirit, we serve our community with compassion, generosity, and bold evangelism to manifest Christ’s love.'
  }
];
