const unsplash = (id: string, w = 1400, h = 1800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

export const images = {
  hero: unsplash("1596838132731-3301c3fd4317", 2000, 1200),
  heroMobile: unsplash("1596838132731-3301c3fd4317", 1200, 1800),
  about: unsplash("1517232115160-ff93364542dd", 1400, 1700),
};

export const avatars = {
  a: unsplash("1506863530036-1efeddceb993", 200, 200),
  b: unsplash("1535579710123-3c0f261c474e", 200, 200),
  c: unsplash("1606143412458-acc5f86de897", 200, 200),
};

export const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages & Pricing", href: "#pricing" },
  { label: "Get a Quote", href: "#contact" },
];

export const eventTypes = [
  {
    id: "e1",
    title: "Corporate Casino Events",
    category: "Birmingham",
    blurb:
      "Employee & client appreciation nights, product promotions and unforgettable holiday parties.",
    img: unsplash("1626200492328-cb7f48fe6adc", 1400, 1000),
  },
  {
    id: "e2",
    title: "Fundraising Casino Nights",
    category: "Central Alabama",
    blurb:
      "A proven crowd-pleaser for nonprofits, charities, schools and community groups.",
    img: unsplash("1653821355226-6def361cc7ab", 1400, 1000),
  },
  {
    id: "e3",
    title: "Weddings & Anniversaries",
    category: "Celebrations",
    blurb:
      "Cocktail hours, receptions and evening entertainment your guests will remember.",
    img: unsplash("1653821355736-0c2598d0a63e", 1400, 1000),
  },
  {
    id: "e4",
    title: "Birthdays, Grads & Bachelor Parties",
    category: "Milestones",
    blurb:
      "Mark milestones, graduations and retirements with real casino excitement.",
    img: unsplash("1563004097-3fc529e9ef32", 1400, 1000),
  },
  {
    id: "e5",
    title: "Christmas & Holiday Parties",
    category: "Seasonal",
    blurb:
      "Christmas, New Year and seasonal gatherings brought to life with Vegas flair.",
    img: unsplash("1771860824036-7a9104546395", 1400, 1000),
  },
  {
    id: "e6",
    title: "Every Special Occasion",
    category: "Custom",
    blurb:
      "Fully customizable casino entertainment tailored to any event you can imagine.",
    img: unsplash("1625076019815-b1a5f7e5ef1e", 1400, 1000),
  },
];

export const galleryImages = [
  unsplash("1626200492328-cb7f48fe6adc", 800, 1000),
  unsplash("1653821355226-6def361cc7ab", 800, 600),
  unsplash("1700781762961-17b4e984a9a9", 800, 600),
  unsplash("1563004097-3fc529e9ef32", 800, 1000),
  unsplash("1653821355736-0c2598d0a63e", 800, 600),
  unsplash("1771860824036-7a9104546395", 800, 1000),
];

export const offerings = [
  "Blackjack, poker, roulette, craps & more",
  "Professional-grade casino tables",
  "Experienced, energetic dealers",
  "Full delivery, setup, and takedown",
  "Perfect for holiday, corporate & private celebrations",
];

export const stats = [
  { value: 500, suffix: "+", label: "Events hosted" },
  { value: 20, suffix: "+", label: "Casino tables" },
  { value: 40, suffix: "+", label: "Professional dealers" },
  { value: 5, suffix: "★", label: "Client rated" },
];

export const whyUsItems = [
  {
    id: "s1",
    title: "Locally Owned & Operated",
    body: "A local team that knows Birmingham & Central Alabama, invested in making every event a success.",
    tags: ["Birmingham", "Central Alabama"],
  },
  {
    id: "s2",
    title: "Trusted for Corporate Events & Fundraisers",
    body: "A proven partner for employee appreciation nights, charity galas and community fundraisers.",
    tags: ["Corporate", "Fundraisers"],
  },
  {
    id: "s3",
    title: "Professional Dealers & Premium Equipment",
    body: "Experienced, energetic dealers and professional-grade casino tables for an authentic experience.",
    tags: ["Dealers", "Premium Tables"],
  },
  {
    id: "s4",
    title: "Fully Insured & Reliable",
    body: "Fully insured with dependable delivery, setup and takedown, so you can relax and enjoy the night.",
    tags: ["Insured", "Reliable"],
  },
];

export const testimonials = [
  {
    id: "q1",
    quote:
      "The dealers were professional, the tables looked amazing, and our employees had a fantastic time.",
    name: "Sarah M.",
    role: "Birmingham, AL",
    avatar: avatars.a,
  },
  {
    id: "q2",
    quote:
      "The casino atmosphere brought energy to the event and helped us create a memorable evening.",
    name: "Michael T.",
    role: "Hoover, AL",
    avatar: avatars.b,
  },
  {
    id: "q3",
    quote:
      "The tables, dealers, and overall experience made everyone feel like they were in a real casino.",
    name: "Jennifer R.",
    role: "Vestavia Hills, AL",
    avatar: avatars.c,
  },
];

export const pricingPackages = [
  {
    id: "p1",
    name: "The House",
    tables: "3 Tables",
    guests: "Up to 40 guests",
    games: ["Blackjack", "Roulette", "Poker"],
    price: "1,099",
  },
  {
    id: "p2",
    name: "Full House",
    tables: "5 Tables",
    guests: "Up to 60 guests",
    games: ["Blackjack x2", "Roulette", "Poker", "Mini-Craps"],
    price: "1,999",
  },
  {
    id: "p3",
    name: "The Pit",
    tables: "8 Tables",
    guests: "Up to 100 guests",
    games: [
      "Blackjack x4",
      "Roulette",
      "Poker",
      "Craps (12')",
      "Big 6 LED Money Wheel",
    ],
    price: "3,499",
  },
  {
    id: "p4",
    name: "All In",
    tables: "14 Tables, 3 Slots",
    guests: "Up to 150 guests",
    games: [
      "Blackjack x6",
      "Roulette x2",
      "Poker",
      "Craps (12')",
      "Big 6 LED Money Wheel",
      "Three Card Poker",
      "Mini Baccarat or Ultimate Texas Hold'em",
      "Casino War",
    ],
    price: "6,299",
  },
];

export const games = [
  "Blackjack",
  "Poker",
  "Roulette",
  "Craps",
  "Baccarat",
  "Wheel of Fortune",
];

export const faqs = [
  {
    id: "f1",
    q: "How much does a casino party cost in Birmingham?",
    a: "Pricing depends on your guest count, event duration, number of tables and any custom touches. Request a free quote and we’ll tailor a package to your event.",
  },
  {
    id: "f2",
    q: "Do you provide casino dealers in Birmingham?",
    a: "Yes. Every package includes experienced, energetic dealers who keep the tables running smoothly and the energy high all night.",
  },
  {
    id: "f3",
    q: "What types of events do you cater to?",
    a: "Corporate events, fundraisers, weddings, private celebrations and holiday parties — we bring authentic casino entertainment to any occasion.",
  },
  {
    id: "f4",
    q: "Do you travel outside Birmingham?",
    a: "Absolutely. We serve Birmingham and communities throughout Central Alabama, including Hoover, Tuscaloosa, Gadsden, Anniston and more.",
  },
];

export const footerNav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Packages & Pricing", href: "#pricing" },
  { label: "Contact Us", href: "#contact" },
];

export const PHONE = "256-384-0777";
export const PHONE_HREF = "tel:2563840777";
export const EMAIL = "info@casino-knight.com";
