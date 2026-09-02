/* ==========================================================================
   ITINERA - India Destination Database (All 36 States & UTs)
   Created by Rahul Mahto
   ========================================================================== */

const INDIAN_STATES_UT = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", 
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const DESTINATIONS_DATABASE = [
  // 1. MEGHALAYA
  {
    id: 1,
    name: "Cherrapunji & Cherrapunjee Valleys",
    state: "Meghalaya",
    budget: 5500,
    rating: 4.9,
    tag: "green",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    duration: "3–5 days",
    bestTravelWindow: "June–September",
    stayType: "Homestay",
    foodCue: "Local Khasi Jadoh & Bamboo Shoots",
    travelStyle: ["nature", "green", "rainy", "slow"],
    youtubeQuery: "Meghalaya Cherrapunji monsoon trip guide",
    popularScore: 95,
    greenScore: 99
  },
  {
    id: 2,
    name: "Dawki & Umngot River",
    state: "Meghalaya",
    budget: 4800,
    rating: 4.8,
    tag: "scenic",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    duration: "2–3 days",
    bestTravelWindow: "October–April",
    stayType: "Riverside Camping",
    foodCue: "Fresh River Fish Curry",
    travelStyle: ["nature", "scenic", "slow"],
    youtubeQuery: "Dawki crystal clear river Meghalaya",
    popularScore: 88,
    greenScore: 85
  },
  // 2. KASHMIR
  {
    id: 3,
    name: "Srinagar & Dal Lake",
    state: "Jammu and Kashmir",
    budget: 8500,
    rating: 4.9,
    tag: "scenic",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
    duration: "4–6 days",
    bestTravelWindow: "September–November & April–June",
    stayType: "Heritage Houseboat",
    foodCue: "Kashmiri Wazwan & Kahwa Tea",
    travelStyle: ["scenic", "culture", "slow"],
    youtubeQuery: "Srinagar Dal Lake houseboat experience",
    popularScore: 98,
    greenScore: 70
  },
  {
    id: 4,
    name: "Gulmarg Alpine Meadows",
    state: "Jammu and Kashmir",
    budget: 12000,
    rating: 4.9,
    tag: "mountains",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
    duration: "3–4 days",
    bestTravelWindow: "December–March (Snow) / May–Sep",
    stayType: "Ski Resort",
    foodCue: "Rogan Josh & Warm Nadru Yakhni",
    travelStyle: ["mountains", "scenic", "adventure"],
    youtubeQuery: "Gulmarg Gondola snow sports Kashmir",
    popularScore: 96,
    greenScore: 65
  },
  // 3. KERALA
  {
    id: 5,
    name: "Munnar Tea Estates",
    state: "Kerala",
    budget: 6000,
    rating: 4.8,
    tag: "green",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    duration: "3–4 days",
    bestTravelWindow: "September–March",
    stayType: "Plantation Bungalow",
    foodCue: "Kerala Sadhya & Cardamom Tea",
    travelStyle: ["green", "nature", "slow"],
    youtubeQuery: "Munnar Kerala tea gardens vlog",
    popularScore: 94,
    greenScore: 95
  },
  {
    id: 6,
    name: "Alleppey Backwaters",
    state: "Kerala",
    budget: 7500,
    rating: 4.7,
    tag: "coast",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    duration: "2–3 days",
    bestTravelWindow: "October–March",
    stayType: "Luxury Kettuvallam Houseboat",
    foodCue: "Karimeen Pollichathu (Pearl Spot Fish)",
    travelStyle: ["slow", "scenic", "coast"],
    youtubeQuery: "Alleppey houseboat backwaters Kerala",
    popularScore: 92,
    greenScore: 80
  },
  // 4. RAJASTHAN
  {
    id: 7,
    name: "Udaipur Lakes & Palaces",
    state: "Rajasthan",
    budget: 9000,
    rating: 4.9,
    tag: "culture",
    image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f1c?auto=format&fit=crop&w=800&q=80",
    duration: "3–4 days",
    bestTravelWindow: "October–March",
    stayType: "Heritage Haveli",
    foodCue: "Dal Baati Churma & Ker Sangri",
    travelStyle: ["culture", "scenic", "slow"],
    youtubeQuery: "Udaipur City Palace Lake Pichola travel",
    popularScore: 97,
    greenScore: 40
  },
  {
    id: 8,
    name: "Jaisalmer Desert Dunes",
    state: "Rajasthan",
    budget: 6500,
    rating: 4.8,
    tag: "culture",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    duration: "2–3 days",
    bestTravelWindow: "November–February",
    stayType: "Desert Luxury Camp",
    foodCue: "Laal Maas & Bajra Roti",
    travelStyle: ["culture", "adventure"],
    youtubeQuery: "Jaisalmer Thar desert safari camping",
    popularScore: 91,
    greenScore: 20
  },
  // 5. HIMACHAL PRADESH
  {
    id: 9,
    name: "Spiti Valley Roadtrip",
    state: "Himachal Pradesh",
    budget: 14000,
    rating: 4.9,
    tag: "mountains",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    duration: "6–7 days",
    bestTravelWindow: "June–September",
    stayType: "Monastery Homestay",
    foodCue: "Butter Tea & Thukpa",
    travelStyle: ["mountains", "adventure", "scenic"],
    youtubeQuery: "Spiti Valley rugged mountain road trip",
    popularScore: 90,
    greenScore: 45
  },
  // 6. SIKKIM
  {
    id: 10,
    name: "Yumthang Valley & Lachung",
    state: "Sikkim",
    budget: 8000,
    rating: 4.8,
    tag: "mountains",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    duration: "4–5 days",
    bestTravelWindow: "March–June & Sept–Dec",
    stayType: "Sikkimese Wooden Cottage",
    foodCue: "Steamed Momos & Gundruk Soup",
    travelStyle: ["mountains", "nature", "scenic"],
    youtubeQuery: "North Sikkim Yumthang Valley flowers snow",
    popularScore: 89,
    greenScore: 88
  },
  // 7. KARNATAKA
  {
    id: 11,
    name: "Coorg Coffee Plantations",
    state: "Karnataka",
    budget: 5000,
    rating: 4.7,
    tag: "green",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    duration: "2–3 days",
    bestTravelWindow: "September–March",
    stayType: "Estate Estate Stay",
    foodCue: "Pandi Curry & Akki Oti",
    travelStyle: ["green", "nature", "slow"],
    youtubeQuery: "Coorg coffee plantation homestay travel",
    popularScore: 86,
    greenScore: 92
  },
  {
    id: 12,
    name: "Hampi Heritage Ruins",
    state: "Karnataka",
    budget: 4200,
    rating: 4.9,
    tag: "culture",
    image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&w=800&q=80",
    duration: "3–4 days",
    bestTravelWindow: "October–February",
    stayType: "Boutique Guest House",
    foodCue: "South Indian Thali & Filter Coffee",
    travelStyle: ["culture", "slow", "scenic"],
    youtubeQuery: "Hampi Vijayanagara empire ruins guide",
    popularScore: 93,
    greenScore: 50
  },
  // 8. GOA
  {
    id: 13,
    name: "South Goa Quiet Beaches",
    state: "Goa",
    budget: 6500,
    rating: 4.8,
    tag: "coast",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    duration: "4–5 days",
    bestTravelWindow: "November–February & July–Sep (Monsoon)",
    stayType: "Beach Eco-Hut",
    foodCue: "Goan Fish Curry Rice & Bebinca",
    travelStyle: ["coast", "slow", "green"],
    youtubeQuery: "South Goa peaceful beaches Agonda Palolem",
    popularScore: 96,
    greenScore: 75
  },
  // 9. LADAKH
  {
    id: 14,
    name: "Pangong Lake & Leh",
    state: "Ladakh",
    budget: 15000,
    rating: 4.9,
    tag: "mountains",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80",
    duration: "6–7 days",
    bestTravelWindow: "May–September",
    stayType: "High-Altitude Glamping",
    foodCue: "Skyu & Tibetan Butter Tea",
    travelStyle: ["mountains", "adventure", "scenic"],
    youtubeQuery: "Leh Ladakh Pangong Tso road trip experience",
    popularScore: 99,
    greenScore: 30
  },
  // 10. UTTARAKHAND
  {
    id: 15,
    name: "Valley of Flowers",
    state: "Uttarakhand",
    budget: 7000,
    rating: 4.9,
    tag: "green",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    duration: "4–5 days",
    bestTravelWindow: "July–September",
    stayType: "Trekking Lodge",
    foodCue: "Aloo ke Gutke & Garhwali Thali",
    travelStyle: ["nature", "green", "mountains"],
    youtubeQuery: "Valley of Flowers Uttarakhand monsoon trek",
    popularScore: 87,
    greenScore: 98
  }
];

// Helper to generate dynamic placeholders for remaining 26 states/UTs in India Atlas
const GENERATE_ALL_REGIONS = () => {
  return INDIAN_STATES_UT.map(stateName => {
    const existing = DESTINATIONS_DATABASE.filter(d => d.state === stateName);
    return {
      state: stateName,
      destinations: existing.length > 0 ? existing : [
        { name: `${stateName} Highlights`, duration: "2–4 days" },
        { name: `Cultural Capital of ${stateName}`, duration: "3 days" },
        { name: `Scenic Escape in ${stateName}`, duration: "2 days" }
      ]
    };
  });
};