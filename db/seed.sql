-- ============================================================================
-- JCLS Church Website — Verified Seed Data
-- ============================================================================

-- 1. MINISTRIES (6 Official Ministries with Confirmed Schedules)
INSERT INTO ministries (id, slug, name, tagline, description, schedule, audience, category, image, display_order, is_active)
VALUES
('worship-ministry', 'worship', 'Worship Ministry', 'Leading the Congregation into God''s Holy Presence', 'A passionate team of vocalists, instrumentalists, and audio-visual technicians dedicated to cultivating an atmosphere of deep, Spirit-led worship during all services and prayer gatherings.', 'Rehearsals: Saturday 3:00 PM | Sunday Call-Time: 7:30 AM', 'Musicians, Vocalists, Tech Volunteers', 'worship', '/images/worship.jpg', 1, TRUE),

('young-professionals', 'young-professionals', 'Young Professionals Ministry', 'Kingdom Excellence in the Workplace and Society', 'Equipping single and married working adults to navigate career, finances, relationships, and leadership with biblical integrity and an unwavering commitment to the Great Commission.', 'Bi-Weekly Friday Fellowship: 7:00 PM', 'Working Adults, College Graduates (Ages 22+)', 'discipleship', '/images/young-professionals.jpg', 2, TRUE),

('youth-fellowship', 'gimik', 'Youth Fellowship (GIMIK)', 'Passionate, Pure, and Purpose-Driven for Jesus Christ', 'Our high-energy student fellowship where teenagers and university students encounter Jesus, build authentic godly friendships, and discover their divine calling in this generation.', 'Every Saturday: 4:00 PM – 6:00 PM', 'High School and College Students', 'generation', '/images/youth.jpg', 3, TRUE),

('children-ministry', 'children', 'Children Ministry', 'Training Up Children in the Way They Should Go', 'A safe, joyful, and creative environment where kids learn biblical truth through interactive Bible lessons, praise and worship, arts, crafts, and loving volunteer teachers.', 'Every Sunday Morning: 9:30 AM (during Main Service)', 'Toddlers to Pre-teens (Ages 3–12)', 'generation', '/images/children.jpg', 4, TRUE),

('womens-ministry', 'womens', 'Women''s Ministry', 'Women of Faith, Prayer, and Virtuous Grace', 'A supportive sisterhood of women pursuing spiritual growth, intercessory prayer, godly families, and community care through regular Bible studies and fellowship circles.', 'Monthly Fellowship: 2nd Saturday 2:00 PM', 'All Women, Mothers, and Homemakers', 'care', '/images/womens.jpg', 5, TRUE),

('mens-ministry', 'mens', 'Men''s Ministry', 'Men of Honor, Strength, and Spiritual Leadership', 'Challenging and encouraging men to stand as godly servant leaders in their homes, workplace, church, and society through accountability, prayer, and practical discipleship.', 'Monthly Breakfast Fellowship: 3rd Saturday 7:00 AM', 'Men, Fathers, and Husbands', 'discipleship', '/images/mens.jpg', 6, TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  schedule = EXCLUDED.schedule,
  audience = EXCLUDED.audience,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order;

-- 2. LEADERSHIP TEAM (Verified Pastoral & Ministry Leadership)
INSERT INTO leadership (id, name, role, title, bio, image, display_order, is_active)
VALUES
('pastor-zaldy-ordonio', 'Rev. Zaldy Ordonio', 'Senior Pastor', 'Senior Pastor & Elder', 'Serving as Senior Pastor of Jesus Christ Lord & Savior Church with apostolic vision and pastoral devotion. Pastor Zaldy faithfully shepherds the Batasan Hills congregation with a heart for evangelism, biblical preaching, and raising disciples of Jesus Christ.', '/images/pastor-zaldy-ordonio.jpg', 1, TRUE),

('rogin-ordonio', 'Sis. Rogin Ordonio', 'Pastoral Elder & Women''s Leader', 'Pastoral Elder', 'Faithfully serving alongside the pastoral leadership in ministering to families, guiding the Women''s Ministry, coordinating pastoral care, and nurturing intercessory prayer across our church community.', '/images/rogin-ordonio.jpg', 2, TRUE),

('genrev-ordonio', 'Bro. Genrev Ordonio', 'Ministry Coordinator & Youth Leader', 'Ministry Director', 'Active in youth mentorship, leadership coordination, church technology, and discipling the next generation of passionate believers in Christ.', '/images/genrev-ordonio.jpg', 3, TRUE),

('isaiah-ordonio', 'Bro. Isaiah Ordonio', 'Worship & Creative Media Leader', 'Creative Director', 'Dedicated to serving the Lord through music, audio-visual technical ministry, and youth outreach, helping create a vibrant atmosphere for corporate worship.', '/images/isaiah-ordonio.jpg', 4, TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  title = EXCLUDED.title,
  bio = EXCLUDED.bio,
  image = EXCLUDED.image,
  display_order = EXCLUDED.display_order;

-- 3. EVENTS (Only the Annual Thanksgiving on Nov 22, 2026)
INSERT INTO events (id, title, date, date_display, time, location, description, category, image, is_featured, is_published, is_archived)
VALUES
('annual-thanksgiving-2026', 'JCLS Annual Church Thanksgiving 2026', '2026-11-22', 'Sunday, November 22, 2026', '9:00 AM – 1:00 PM', 'JCLS Main Sanctuary, 71 Hills Street, Batasan Hills, Quezon City', 'Our grand corporate celebration of God''s unfailing faithfulness, provision, and mighty works in Jesus Christ Lord & Savior Church throughout the year. Featuring united choir worship, heartfelt testimonies, pastoral blessing, and fellowship feast.', 'Celebration', '/images/church-thanksgiving.jpg', TRUE, TRUE, FALSE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  date = EXCLUDED.date,
  date_display = EXCLUDED.date_display,
  time = EXCLUDED.time,
  location = EXCLUDED.location,
  description = EXCLUDED.description,
  is_featured = EXCLUDED.is_featured,
  is_published = EXCLUDED.is_published;

-- 4. MESSAGES / SERMONS
INSERT INTO messages (id, title, speaker, speaker_title, date, series, scripture, scripture_verse, video_url, audio_url, thumbnail, summary, key_takeaways, is_featured, is_published)
VALUES
('great-commission-living', 'Living Out the Great Commission Every Day', 'Rev. Zaldy Ordonio', 'Senior Pastor', '2026-10-18', 'Go and Make Disciples', 'Matthew 28:18–20', 'All authority in heaven and on earth has been given to me. Go therefore and make disciples of all nations...', 'https://www.youtube.com', '', '/images/message-01.jpg', 'Pastor Zaldy expounds on our church''s core theme scripture, reminding every believer that the Great Commission is not a suggestion for a few, but a divine mandate for every follower of Jesus Christ in the workplace, home, and community.', '["The Great Commission begins with recognizing Christ''s supreme authority", "Discipleship happens in the rhythm of everyday life", "We have Christ''s unwavering promise: I am with you always"]'::jsonb, TRUE, TRUE),

('standing-firm-faith', 'Standing Firm in Faith Through Trials', 'Rev. Zaldy Ordonio', 'Senior Pastor', '2026-10-11', 'Unshakable Kingdom', 'James 1:2–4', 'Count it all joy, my brothers, when you meet trials of various kinds...', 'https://www.youtube.com', '', '/images/message-02.jpg', 'An encouraging and pastoral message on maintaining joy, prayer, and biblical endurance when facing health, financial, and family challenges.', '["Trials test and refine our faith like gold", "Endurance produces spiritual maturity", "God gives wisdom generously to those who ask in faith"]'::jsonb, FALSE, TRUE),

('power-of-united-prayer', 'The Power of United Corporate Prayer', 'Sis. Rogin Ordonio', 'Pastoral Elder', '2026-10-04', 'House of Prayer', 'Acts 4:29–31', 'And when they had prayed, the place in which they were gathered together was shaken...', 'https://www.youtube.com', '', '/images/message-03.jpg', 'A stirring teaching on how corporate, Spirit-filled intercession breaks spiritual strongholds, opens doors for the Gospel, and releases God''s supernatural power.', '["Believers are called to united, persistent prayer", "Boldness comes through the Holy Spirit", "God moves powerfully when His people gather in one accord"]'::jsonb, FALSE, TRUE)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  speaker = EXCLUDED.speaker,
  speaker_title = EXCLUDED.speaker_title,
  series = EXCLUDED.series,
  scripture = EXCLUDED.scripture,
  thumbnail = EXCLUDED.thumbnail,
  summary = EXCLUDED.summary;

-- 5. WEBSITE SETTINGS
INSERT INTO website_settings (key, value)
VALUES
('church_info', '{
  "name": "Jesus Christ Lord & Savior Church",
  "shortName": "JCLS Church",
  "tagline": "Go and Make Disciples",
  "city": "Quezon City",
  "country": "Philippines",
  "addressLine1": "71 Hills Street, Talanay Area C",
  "addressLine2": "Brgy. Batasan Hills, Quezon City, Metro Manila",
  "phone": "09158744311",
  "email": "jesuschristlordandsavior@gmail.com",
  "officeHours": "Tuesday – Saturday: 9:00 AM – 5:00 PM | Sunday Services: 9:00 AM – 5:00 PM",
  "facebookUrl": "https://www.facebook.com/profile.php?id=100064906381049",
  "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Jesus+Christ+Lord+and+Savior+Church+71+Hills+Street+Talanay+Area+C+Brgy+Batasan+Hills+Quezon+City"
}'::jsonb),
('service_schedules', '[
  {
    "id": "sunday-main-service",
    "name": "Sunday Main Celebration Service",
    "day": "Every Sunday",
    "time": "9:00 AM – 12:00 NN",
    "location": "Main Sanctuary",
    "description": "Our primary weekly gathering with vibrant praise and worship, deep expository preaching of God''s Word, and prayer ministry."
  },
  {
    "id": "sunday-afternoon-service",
    "name": "Sunday Afternoon Service",
    "day": "Every Sunday",
    "time": "2:00 PM – 4:00 PM",
    "location": "Main Sanctuary",
    "description": "Afternoon praise, discipleship teaching, and fellowship."
  },
  {
    "id": "midweek-prayer-meeting",
    "name": "Midweek Prayer & Bible Study",
    "day": "Every Wednesday",
    "time": "7:00 PM – 8:30 PM",
    "location": "Sanctuary & Online",
    "description": "Corporate intercessory prayer for our families, church, and nation, followed by in-depth Bible study."
  }
]'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
