/**
 * Pest Control Service Generator
 * Generates JSON files for all pest control service categories
 * Run with: node scripts/generate-services.js
 */

const fs = require('fs');
const path = require('path');

const services = [
  {
    id: "termite-inspection",
    name: "Termite Inspection",
    slug: "termite-inspection",
    shortDescription: "Professional termite inspections to detect and prevent timber pest damage",
    longDescription: "A comprehensive termite inspection is essential for every Sydney property owner. Our licensed inspectors use thermal imaging cameras, moisture meters, and decades of experience to detect termite activity, damage, and conditions conducive to infestation. Australian Standard AS 3660 recommends annual termite inspections for all properties in termite-prone areas - and most of Sydney falls into this high-risk category. A professional inspection can save you thousands in potential repair costs by catching problems early.",
    priceRange: { min: 250, max: 500, average: 350, display: "$250 - $500" },
    searchVolume: "very-high",
    urgency: "medium",
    commonIn: ["houses", "townhouses", "older-apartments", "commercial"],
    seasonality: "year-round",
    peakSeason: "spring-summer",
    timeToComplete: "1-2 hours",
    warrantyTypical: "Inspection report valid for 3 months",
    signs: [
      "Mud tubes on walls, foundations, or in subfloor",
      "Hollow-sounding timber when tapped",
      "Discarded wings near windows or doors",
      "Tight-fitting doors or windows that previously worked fine",
      "Bubbling, cracking, or distorted paint on timber surfaces",
      "Visible damage to skirting boards or door frames"
    ],
    process: [
      "Visual inspection of all accessible interior areas",
      "Thermal imaging camera scan to detect hidden activity",
      "Moisture meter readings to identify high-risk areas",
      "Roof void inspection (where accessible)",
      "Subfloor inspection (where accessible)",
      "External perimeter and garden bed inspection",
      "Detailed written report with photos and recommendations"
    ],
    faqs: [
      {
        question: "How often should I get a termite inspection?",
        answer: "Australian Standard AS 3660 recommends annual termite inspections for properties in termite-prone areas. Most of Sydney is classified as high-risk due to our warm, humid climate and soil conditions. Properties with previous termite history or those near bushland may benefit from 6-monthly inspections."
      },
      {
        question: "What happens if termites are found during the inspection?",
        answer: "If termites are found, your inspector will document the extent of activity and damage, then provide treatment recommendations. Options typically include chemical soil treatments, baiting systems, or physical barriers depending on the situation. The inspector will explain all options and provide quotes for treatment."
      },
      {
        question: "Is a termite inspection required when buying a property?",
        answer: "While not legally mandatory in NSW, a pre-purchase timber pest inspection is strongly recommended and most conveyancers advise it. Termite damage is not covered by standard home insurance and repairs can cost tens of thousands of dollars. The inspection cost is minimal compared to the potential risk."
      },
      {
        question: "What's included in the inspection report?",
        answer: "A comprehensive report includes findings from all inspected areas, photos of any damage or activity, thermal images, a risk assessment, and specific recommendations. The report follows Australian Standard AS 4349.3 format and can be used for insurance or legal purposes."
      },
      {
        question: "Can termites be detected behind walls?",
        answer: "Yes, thermal imaging cameras can detect termite activity behind walls by identifying temperature variations caused by termite nests and activity. Moisture meters also help identify areas of concern. However, some concealed areas may require invasive inspection for definitive detection."
      }
    ],
    seoTitle: "Termite Inspection Sydney - From $250 | Licensed Inspectors",
    seoDescription: "Book a termite inspection in Sydney from $250. Licensed inspectors with thermal imaging. Same-day reports available. Protect your property - get a free quote today.",
    relatedServices: ["termite-treatment", "general-pest-control", "pre-purchase-inspection"],
    keywords: ["termite inspection sydney", "white ant inspection", "timber pest inspection", "pre purchase pest inspection", "termite check", "termite inspection cost"]
  },
  {
    id: "termite-treatment",
    name: "Termite Treatment",
    slug: "termite-treatment",
    shortDescription: "Effective termite elimination and prevention treatments for Sydney homes",
    longDescription: "Termite treatment involves eliminating active termite colonies and creating barriers to prevent future infestations. Sydney's climate makes properties particularly vulnerable to termites, with damage costing Australian homeowners over $1.5 billion annually. Professional treatments include chemical soil barriers, baiting systems, and physical barriers. The right treatment depends on your property type, construction style, and the extent of any existing infestation.",
    priceRange: { min: 2000, max: 5000, average: 3500, display: "$2,000 - $5,000+" },
    searchVolume: "medium-high",
    urgency: "high",
    commonIn: ["houses", "townhouses", "commercial"],
    seasonality: "year-round",
    peakSeason: "spring-summer",
    timeToComplete: "1-3 days",
    warrantyTypical: "5-10 year warranty on barrier treatments",
    signs: [
      "Active termites found during inspection",
      "Extensive mud tubes or shelter tubes",
      "Significant timber damage visible",
      "Swarmers (flying termites) inside property",
      "Previous termite history requiring prevention"
    ],
    process: [
      "Detailed assessment of infestation extent",
      "Treatment plan development and quote",
      "Installation of chemical barrier or baiting system",
      "Treatment of active colonies",
      "Repair recommendations for damaged timber",
      "Ongoing monitoring schedule establishment",
      "Warranty documentation provided"
    ],
    faqs: [
      {
        question: "What's the difference between chemical barriers and baiting systems?",
        answer: "Chemical barriers create a treated zone in the soil around your property that kills or repels termites. Baiting systems use strategically placed stations containing slow-acting toxins that termites carry back to the colony. Chemical barriers provide immediate protection while baiting systems can eliminate entire colonies. Many pest controllers recommend a combination approach."
      },
      {
        question: "How long does termite treatment last?",
        answer: "Chemical soil treatments typically last 5-10 years depending on the product used and soil conditions. Baiting systems require ongoing monitoring and maintenance but can provide indefinite protection. Physical barriers installed during construction are permanent but should be inspected regularly."
      },
      {
        question: "Is termite treatment safe for my family and pets?",
        answer: "Modern termite treatments use products that are specifically designed to be low-risk for humans and pets when applied correctly. Chemical barriers are applied to the soil, not inside living areas. Your pest controller will advise on any precautions needed, which are typically minimal."
      },
      {
        question: "Will I need to leave my home during treatment?",
        answer: "For most termite treatments, you don't need to vacate your home. Chemical barrier installation is done externally around the property perimeter. Some situations may require brief vacating of specific areas, but this is uncommon and your pest controller will advise in advance."
      }
    ],
    seoTitle: "Termite Treatment Sydney - Expert Solutions | 5-10 Year Warranty",
    seoDescription: "Professional termite treatment in Sydney. Chemical barriers, baiting systems & colony elimination. Licensed technicians, up to 10 year warranty. Free quotes available.",
    relatedServices: ["termite-inspection", "pre-purchase-inspection", "general-pest-control"],
    keywords: ["termite treatment sydney", "termite control", "white ant treatment", "termite barrier", "termite baiting system", "termite exterminator"]
  },
  {
    id: "general-pest-control",
    name: "General Pest Control",
    slug: "general-pest-control",
    shortDescription: "Comprehensive pest control for cockroaches, spiders, ants, and silverfish",
    longDescription: "General pest control treatments target the most common household pests in Sydney including cockroaches, spiders, ants, and silverfish. A professional treatment creates a protective barrier around your home and targets pest harbourage areas. Most Sydney homes benefit from regular pest control every 6-12 months to maintain a pest-free environment. Our treatments are safe for families and pets once dry.",
    priceRange: { min: 150, max: 350, average: 220, display: "$150 - $350" },
    searchVolume: "very-high",
    urgency: "medium",
    commonIn: ["houses", "apartments", "townhouses", "commercial"],
    seasonality: "year-round",
    peakSeason: "summer",
    timeToComplete: "30-60 minutes",
    warrantyTypical: "6-12 month warranty",
    signs: [
      "Regular sightings of cockroaches, especially at night",
      "Spider webs accumulating around property",
      "Ant trails in kitchen or bathroom areas",
      "Silverfish damage to books, papers, or clothing",
      "General pest activity increasing"
    ],
    process: [
      "Property inspection to identify pest activity",
      "Treatment of internal harbourage areas",
      "External perimeter spray barrier",
      "Roof void dusting (if accessible)",
      "Targeted treatments for specific pest problems",
      "Advice on prevention measures",
      "Service report and warranty provided"
    ],
    faqs: [
      {
        question: "How long does a general pest treatment take?",
        answer: "A standard general pest treatment for an average home takes 30-60 minutes. Larger properties or those with significant pest problems may take longer. The treatment is quick and minimally disruptive."
      },
      {
        question: "How soon can I expect to see results?",
        answer: "You may see increased pest activity in the first few days as pests are flushed from hiding spots. This is normal and means the treatment is working. Most pest activity should significantly reduce within 1-2 weeks as the treatment takes full effect."
      },
      {
        question: "Is the treatment safe for children and pets?",
        answer: "Yes, modern pest control products are designed to be safe for families and pets once dry, which typically takes 1-2 hours. We recommend keeping children and pets away from treated areas until dry. Fish tanks should be covered during treatment."
      },
      {
        question: "How often should I get pest control?",
        answer: "For most Sydney homes, annual pest control is recommended as a minimum. Properties with recurring problems, those near bushland, or in pest-prone areas may benefit from 6-monthly treatments. Regular treatment prevents infestations from establishing."
      }
    ],
    seoTitle: "General Pest Control Sydney - From $150 | Same Day Service",
    seoDescription: "Professional pest control in Sydney from $150. Targets cockroaches, spiders, ants & silverfish. Safe for families. 6-12 month warranty. Book online today.",
    relatedServices: ["cockroach-control", "spider-control", "ant-control"],
    keywords: ["pest control sydney", "general pest control", "pest treatment", "pest exterminator", "home pest control", "pest spray"]
  },
  {
    id: "cockroach-control",
    name: "Cockroach Control",
    slug: "cockroach-control",
    shortDescription: "Targeted cockroach elimination for homes and businesses",
    longDescription: "Cockroaches are one of Sydney's most common and persistent pests. They carry diseases, trigger allergies, and contaminate food. Professional cockroach control targets both German cockroaches (smaller, found indoors) and Australian cockroaches (larger, often enter from outside). Our treatments include gel baits, residual sprays, and advice on eliminating food and water sources that attract these pests.",
    priceRange: { min: 150, max: 300, average: 200, display: "$150 - $300" },
    searchVolume: "high",
    urgency: "medium-high",
    commonIn: ["apartments", "restaurants", "houses", "commercial-kitchens"],
    seasonality: "year-round",
    peakSeason: "summer",
    timeToComplete: "30-60 minutes",
    warrantyTypical: "3-6 month warranty",
    signs: [
      "Live cockroaches, especially at night",
      "Cockroach droppings (small dark specks)",
      "Egg cases in hidden areas",
      "Musty odour in severe infestations",
      "Dead cockroaches appearing",
      "Smear marks along walls or surfaces"
    ],
    process: [
      "Identification of cockroach species",
      "Inspection of harbourage areas",
      "Gel bait application in key areas",
      "Residual spray treatment",
      "Crack and crevice treatment",
      "Advice on sanitation improvements",
      "Follow-up treatment if required"
    ],
    faqs: [
      {
        question: "Why do I have cockroaches even though my house is clean?",
        answer: "Cockroaches can enter the cleanest homes through drains, gaps around pipes, or in groceries and packaging. German cockroaches in particular can hitchhike into properties. While cleanliness helps, professional treatment is often needed to eliminate established populations."
      },
      {
        question: "What's the difference between German and Australian cockroaches?",
        answer: "German cockroaches are small (12-15mm), light brown, and live entirely indoors, often in kitchens and bathrooms. They breed rapidly and are harder to control. Australian cockroaches are larger (30-35mm), darker, and typically live outdoors but enter homes seeking food and water."
      },
      {
        question: "Will one treatment eliminate all cockroaches?",
        answer: "For German cockroaches, multiple treatments are often needed due to their rapid breeding cycle. The first treatment kills adults and nymphs, but eggs may hatch afterward. Follow-up treatments ensure complete elimination. Australian cockroaches often respond well to a single treatment with ongoing prevention."
      },
      {
        question: "Are cockroach treatments safe for food preparation areas?",
        answer: "Yes, professional cockroach treatments are designed to be safe for use in kitchens. Gel baits are applied in concealed areas away from food contact surfaces. We'll advise on any brief waiting period before using treated areas."
      }
    ],
    seoTitle: "Cockroach Control Sydney - Fast & Effective | From $150",
    seoDescription: "Professional cockroach control in Sydney. Eliminate German & Australian cockroaches fast. Safe treatments for homes & businesses. Get a free quote today.",
    relatedServices: ["general-pest-control", "commercial-pest-control", "ant-control"],
    keywords: ["cockroach control sydney", "cockroach treatment", "german cockroach", "cockroach exterminator", "cockroach spray", "get rid of cockroaches"]
  },
  {
    id: "rodent-control",
    name: "Rodent Control",
    slug: "rodent-control",
    shortDescription: "Effective rat and mouse control for Sydney properties",
    longDescription: "Rodents pose serious health risks and can cause significant property damage by gnawing through wires, pipes, and structural materials. Sydney's urban environment provides ideal conditions for rats and mice to thrive. Our rodent control service includes identification of species, location of entry points, baiting programs, and exclusion advice to prevent future infestations. We use tamper-resistant bait stations safe for properties with children and pets.",
    priceRange: { min: 200, max: 400, average: 280, display: "$200 - $400" },
    searchVolume: "high",
    urgency: "high",
    commonIn: ["houses", "commercial", "restaurants", "warehouses"],
    seasonality: "year-round",
    peakSeason: "autumn-winter",
    timeToComplete: "1-2 hours initial visit",
    warrantyTypical: "30-90 day warranty with monitoring",
    signs: [
      "Droppings - small dark pellets",
      "Gnaw marks on food packaging, wires, or timber",
      "Scratching or scurrying sounds, especially at night",
      "Grease marks along walls from fur",
      "Nests made of shredded materials",
      "Unusual pet behaviour (staring at walls)",
      "Musky odour"
    ],
    process: [
      "Property inspection to identify species and extent",
      "Location of entry points and harbourage areas",
      "Installation of tamper-resistant bait stations",
      "Placement of snap traps in key areas",
      "Advice on exclusion (sealing entry points)",
      "Sanitation recommendations",
      "Follow-up visits to monitor and replenish",
      "Removal of deceased rodents"
    ],
    faqs: [
      {
        question: "How do I know if I have rats or mice?",
        answer: "The easiest way to tell is by droppings. Mouse droppings are small (3-8mm) with pointed ends. Rat droppings are larger (10-20mm) with blunt ends. Rats also leave larger gnaw marks and grease trails. A professional inspection can confirm the species and extent of infestation."
      },
      {
        question: "Are rodent baits safe around children and pets?",
        answer: "We use tamper-resistant bait stations that prevent access by children and pets while allowing rodents to enter. The stations are locked and secured. However, we still recommend keeping bait stations in areas less accessible to curious children and pets where possible."
      },
      {
        question: "How long does it take to get rid of rodents?",
        answer: "A rodent problem can typically be controlled within 2-4 weeks with professional treatment. However, complete elimination and prevention requires addressing entry points and food sources. Ongoing monitoring may be recommended for severe infestations or commercial properties."
      },
      {
        question: "Will dead rodents smell in my walls?",
        answer: "There is a possibility rodents may die in concealed areas after consuming bait. Modern rodenticides contain ingredients that reduce odour and dry out carcasses. If a smell does occur, it typically lasts 1-2 weeks. We can advise on odour control methods if needed."
      }
    ],
    seoTitle: "Rodent Control Sydney - Rat & Mouse Removal | From $200",
    seoDescription: "Professional rodent control in Sydney. Safe, effective rat and mouse removal for homes & businesses. Tamper-resistant baits. Book your inspection today.",
    relatedServices: ["general-pest-control", "commercial-pest-control", "possum-removal"],
    keywords: ["rodent control sydney", "rat control", "mouse control", "rat exterminator", "mice removal", "rat problem sydney"]
  },
  {
    id: "spider-control",
    name: "Spider Control",
    slug: "spider-control",
    shortDescription: "Professional spider treatment for safer Sydney homes",
    longDescription: "Sydney is home to several spider species including venomous ones like the Funnel-web and Redback. Professional spider control reduces populations and creates a protective barrier around your property. Treatment targets webs, egg sacs, and spider harbourage areas. Regular treatment is especially important for properties with children, in bushland areas, or where dangerous spiders have been sighted.",
    priceRange: { min: 150, max: 300, average: 200, display: "$150 - $300" },
    searchVolume: "medium-high",
    urgency: "medium",
    commonIn: ["houses", "gardens", "sheds", "garages"],
    seasonality: "year-round",
    peakSeason: "summer-autumn",
    timeToComplete: "30-60 minutes",
    warrantyTypical: "6-12 month warranty",
    signs: [
      "Increasing spider webs around property",
      "Regular spider sightings indoors",
      "Dangerous spider sightings (Funnel-web, Redback)",
      "Spider egg sacs in corners or sheltered areas",
      "Property near bushland with high spider activity"
    ],
    process: [
      "Property inspection for spider activity",
      "Identification of spider species present",
      "Web removal and treatment",
      "External perimeter spray treatment",
      "Treatment of common harbourage areas",
      "Roof void and subfloor treatment if accessible",
      "Advice on reducing spider-friendly conditions"
    ],
    faqs: [
      {
        question: "Will spider treatment kill Funnel-web spiders?",
        answer: "Yes, professional spider treatments are effective against Funnel-web spiders. We pay particular attention to areas where Funnel-webs are commonly found including rockeries, garden beds, and around pools. Regular treatment significantly reduces encounters with these dangerous spiders."
      },
      {
        question: "How long does spider treatment last?",
        answer: "A professional spider treatment typically provides 6-12 months of protection. Properties with high spider pressure (near bushland, with gardens) may require more frequent treatment. We'll recommend an appropriate schedule based on your property's conditions."
      },
      {
        question: "Is spider treatment safe for other insects like bees?",
        answer: "Spider treatments target spiders specifically and are applied in areas spiders inhabit, not flowering plants. We take care to minimise impact on beneficial insects. If you have bee hives on your property, let us know so we can take appropriate precautions."
      },
      {
        question: "Should I remove spider webs before treatment?",
        answer: "No, we recommend leaving webs in place. Webs indicate active spider locations and treating them directly is more effective. We remove webs as part of the treatment process. New webs appearing after treatment are typically from spiders that have encountered the treatment."
      }
    ],
    seoTitle: "Spider Control Sydney - From $150 | Funnel-web Specialists",
    seoDescription: "Professional spider control in Sydney. Treatment for Funnel-webs, Redbacks & all common spiders. Safe for families. 6-12 month warranty. Book online now.",
    relatedServices: ["general-pest-control", "ant-control", "cockroach-control"],
    keywords: ["spider control sydney", "spider treatment", "funnel web spider", "redback spider", "spider exterminator", "spider spray"]
  },
  {
    id: "ant-control",
    name: "Ant Control",
    slug: "ant-control",
    shortDescription: "Effective ant elimination targeting the colony",
    longDescription: "Ants are social insects that live in large colonies, making DIY treatments often ineffective. Professional ant control identifies the species (crucial for effective treatment), locates nests, and uses targeted products that workers carry back to the colony. Sydney homes commonly deal with Black house ants, Coastal brown ants, and occasionally destructive species like Carpenter ants.",
    priceRange: { min: 150, max: 280, average: 180, display: "$150 - $280" },
    searchVolume: "high",
    urgency: "medium",
    commonIn: ["houses", "apartments", "gardens", "commercial"],
    seasonality: "year-round",
    peakSeason: "spring-summer",
    timeToComplete: "30-60 minutes",
    warrantyTypical: "3-6 month warranty",
    signs: [
      "Ant trails, especially leading to food sources",
      "Ants in kitchen, pantry, or around pet bowls",
      "Small piles of dirt indicating nest entry points",
      "Winged ants (swarmers) appearing indoors",
      "Large numbers of ants after rain",
      "Carpenter ant damage (frass near timber)"
    ],
    process: [
      "Identification of ant species",
      "Trailing ants back to locate nests",
      "Application of targeted ant baits",
      "Perimeter spray treatment",
      "Direct nest treatment where accessible",
      "Advice on reducing attractants",
      "Follow-up treatment if required"
    ],
    faqs: [
      {
        question: "Why do ants keep coming back after I spray them?",
        answer: "Surface sprays only kill the ants you see, which is a tiny fraction of the colony. The queen continues producing eggs. Professional treatments use baits that foraging ants carry back to the nest, eventually eliminating the colony including the queen. This provides lasting control."
      },
      {
        question: "Are there ants in Sydney that damage timber?",
        answer: "Yes, Carpenter ants can cause significant damage to timber structures. Unlike termites, they don't eat wood but excavate it for nesting, leaving behind sawdust-like frass. If you see large black ants near timber with small piles of debris, contact a professional for inspection."
      },
      {
        question: "How long does ant treatment take to work?",
        answer: "You should notice a significant reduction in ant activity within 1-2 weeks. The baits take time to be carried back to the nest and spread through the colony. Avoid spraying ants yourself during this period as it can interfere with the bait's effectiveness."
      },
      {
        question: "Why do I get ants inside after it rains?",
        answer: "Rain floods ant nests, forcing them to seek dry shelter - often your home. This is common in Sydney, especially in areas with clay soils. A perimeter treatment creates a barrier that intercepts ants trying to enter, rain or shine."
      }
    ],
    seoTitle: "Ant Control Sydney - Colony Elimination | From $150",
    seoDescription: "Professional ant control in Sydney. Targets the colony, not just visible ants. Effective against all species. 3-6 month warranty. Get a free quote today.",
    relatedServices: ["general-pest-control", "cockroach-control", "spider-control"],
    keywords: ["ant control sydney", "ant treatment", "ant exterminator", "get rid of ants", "carpenter ants", "black ants"]
  },
  {
    id: "bed-bug-treatment",
    name: "Bed Bug Treatment",
    slug: "bed-bug-treatment",
    shortDescription: "Specialist bed bug elimination for Sydney homes and hotels",
    longDescription: "Bed bugs are expert hitchhikers that have made a significant comeback worldwide, including in Sydney. These blood-feeding insects hide in mattresses, furniture, and cracks during the day and emerge at night to bite. Bed bug treatment requires specialist knowledge and often multiple visits due to their resilient nature. Our treatments include thorough inspection, targeted applications, and heat treatment options.",
    priceRange: { min: 300, max: 1500, average: 600, display: "$300 - $1,500" },
    searchVolume: "medium",
    urgency: "very-high",
    commonIn: ["houses", "apartments", "hotels", "backpackers"],
    seasonality: "year-round",
    peakSeason: "summer",
    timeToComplete: "2-4 hours",
    warrantyTypical: "30-60 day warranty with follow-ups",
    signs: [
      "Itchy bites in lines or clusters, often on exposed skin",
      "Small blood spots on sheets",
      "Dark faecal spots on mattress seams",
      "Live bed bugs (small, flat, reddish-brown)",
      "Sweet musty odour in severe infestations",
      "Cast skins and eggs in hiding spots"
    ],
    process: [
      "Thorough inspection to confirm bed bugs",
      "Assessment of infestation extent",
      "Preparation advice (washing, decluttering)",
      "Treatment of mattresses, furniture, and harbourage areas",
      "Crack and crevice treatment throughout room",
      "Optional heat treatment for severe cases",
      "Follow-up inspections and treatments",
      "Preventative advice for future"
    ],
    faqs: [
      {
        question: "How did I get bed bugs?",
        answer: "Bed bugs are excellent hitchhikers. They commonly travel in luggage from hotels, in second-hand furniture, or from adjacent apartments in multi-unit buildings. Having bed bugs is not a reflection of cleanliness - they're found in all types of accommodation from budget to 5-star."
      },
      {
        question: "Will one treatment eliminate bed bugs?",
        answer: "Most bed bug infestations require 2-3 treatments spaced about 2 weeks apart. This is because eggs are resistant to many treatments and hatch over time. Follow-up treatments catch newly hatched bed bugs before they can reproduce. We'll advise on the specific treatment plan for your situation."
      },
      {
        question: "Do I need to throw away my mattress?",
        answer: "In most cases, no. Professional treatment can effectively eliminate bed bugs from mattresses. However, severely infested or damaged mattresses may be better replaced. We'll advise based on inspection findings. Using mattress encasements after treatment helps prevent future problems."
      },
      {
        question: "Can bed bugs spread disease?",
        answer: "While bed bug bites are irritating and can cause allergic reactions in some people, bed bugs are not known to transmit diseases to humans. The main concerns are the physical and psychological discomfort they cause, plus the difficulty of elimination without professional help."
      }
    ],
    seoTitle: "Bed Bug Treatment Sydney - Expert Elimination | From $300",
    seoDescription: "Professional bed bug treatment in Sydney. Thorough inspection & targeted elimination. Multiple treatment options including heat. Discrete service. Call now.",
    relatedServices: ["general-pest-control", "flea-treatment", "mattress-cleaning"],
    keywords: ["bed bug treatment sydney", "bed bug removal", "bed bug exterminator", "get rid of bed bugs", "bed bug spray", "bed bug heat treatment"]
  },
  {
    id: "flea-treatment",
    name: "Flea Treatment",
    slug: "flea-treatment",
    shortDescription: "Complete flea elimination for homes with pets",
    longDescription: "Fleas can quickly become a major problem in homes with pets, but they can also affect pet-free households if previous occupants had animals or wildlife visits the property. Adult fleas represent only 5% of the population - the rest are eggs, larvae, and pupae hidden in carpets and furnishings. Professional treatment targets all life stages and includes advice on treating pets and preventing re-infestation.",
    priceRange: { min: 180, max: 350, average: 250, display: "$180 - $350" },
    searchVolume: "medium",
    urgency: "high",
    commonIn: ["houses", "apartments", "pet-owners", "rentals"],
    seasonality: "year-round",
    peakSeason: "spring-summer",
    timeToComplete: "1-2 hours",
    warrantyTypical: "30-60 day warranty",
    signs: [
      "Bites on ankles and lower legs",
      "Pet scratching excessively",
      "Small dark insects jumping",
      "Flea dirt (dark specks) in pet bedding",
      "Moving into home that previously had pets",
      "Bites appearing after time away from home"
    ],
    process: [
      "Inspection to confirm fleas and assess extent",
      "Treatment of all floor areas including carpets",
      "Targeted treatment of pet resting areas",
      "Treatment of outdoor areas pets frequent",
      "Advice on pet treatment coordination",
      "Guidance on vacuuming and washing routines",
      "Follow-up treatment if required"
    ],
    faqs: [
      {
        question: "Do I need to treat my pet as well?",
        answer: "Yes, successful flea control requires treating pets with veterinary-approved products at the same time as the home treatment. Without this, pets will continue to bring fleas inside. Your vet can recommend appropriate flea treatments for your specific pets."
      },
      {
        question: "Why am I seeing more fleas after treatment?",
        answer: "This is actually normal. Pupae (cocoons) are resistant to treatments and hatch when they detect vibration and warmth - like people walking around. Increased activity post-treatment stimulates hatching, and these new fleas contact the treatment and die. This typically resolves within 2-3 weeks."
      },
      {
        question: "I don't have pets - why do I have fleas?",
        answer: "Fleas can come from previous pet-owning occupants (pupae can survive months without hatching), visiting animals, or wildlife like possums or rats. Rental properties and newly purchased homes commonly have this issue. Professional treatment is effective regardless of the source."
      },
      {
        question: "How long until I can walk on treated carpets?",
        answer: "Most flea treatments dry within 1-2 hours, after which it's safe to walk on carpets. However, avoid vacuuming or mopping for at least 7 days to allow the treatment to work effectively. We'll provide specific guidance based on the products used."
      }
    ],
    seoTitle: "Flea Treatment Sydney - Complete Elimination | From $180",
    seoDescription: "Professional flea treatment in Sydney for homes with & without pets. Targets all life stages. Fast, effective results. Book your flea treatment today.",
    relatedServices: ["general-pest-control", "bed-bug-treatment", "rodent-control"],
    keywords: ["flea treatment sydney", "flea control", "flea exterminator", "get rid of fleas", "flea spray", "flea bomb"]
  },
  {
    id: "possum-removal",
    name: "Possum Removal",
    slug: "possum-removal",
    shortDescription: "Humane possum removal and exclusion services",
    longDescription: "Possums are protected native animals in NSW, making professional, humane removal essential. Brushtail and Ringtail possums commonly take up residence in Sydney roof spaces, causing noise disturbance, odour issues, and potential damage. Licensed operators use one-way exit systems and exclusion methods to humanely encourage possums to relocate, then seal entry points to prevent return.",
    priceRange: { min: 250, max: 600, average: 400, display: "$250 - $600" },
    searchVolume: "medium",
    urgency: "medium",
    commonIn: ["houses", "near-bushland", "older-homes"],
    seasonality: "year-round",
    peakSeason: "autumn-winter",
    timeToComplete: "2-4 hours plus follow-up",
    warrantyTypical: "12 month exclusion warranty",
    signs: [
      "Heavy thumping or running sounds in roof at night",
      "Stained ceilings from urine",
      "Strong ammonia smell",
      "Visible damage to roof or eaves",
      "Possum droppings (similar to large olive)",
      "Sightings at dusk entering roof space",
      "Damage to garden plants and fruit trees"
    ],
    process: [
      "Inspection to confirm possum presence",
      "Species identification (affects approach)",
      "Location of entry points",
      "Installation of one-way exit system",
      "Monitoring period for possum to exit",
      "Sealing of all entry points",
      "Installation of possum box alternative",
      "Clean-up recommendations"
    ],
    faqs: [
      {
        question: "Is it legal to trap or relocate possums?",
        answer: "Possums are protected in NSW and cannot be trapped or relocated more than 150m from where they were caught. It's illegal to harm them. Licensed pest controllers use humane exclusion methods - encouraging possums to leave, then sealing entry points. Alternative housing (possum boxes) must be provided."
      },
      {
        question: "Will the possum come back after removal?",
        answer: "Once all entry points are properly sealed, possums cannot physically return to your roof space. Our exclusion service includes a warranty on the sealing work. However, possums may still visit your garden and trees - they're part of Sydney's ecosystem."
      },
      {
        question: "How long does the removal process take?",
        answer: "The initial visit installs one-way exits and takes 2-4 hours. The possum typically vacates within 2-3 nights. A follow-up visit then seals all entry points permanently. The entire process usually takes 1-2 weeks to complete properly."
      },
      {
        question: "Can possums cause damage to my house?",
        answer: "Yes, possums can damage insulation, chew on electrical wires (fire risk), stain ceilings with urine, and compromise roof materials. Their droppings and urine also create unpleasant odours. Prompt, professional removal prevents escalating damage."
      }
    ],
    seoTitle: "Possum Removal Sydney - Humane & Licensed | From $250",
    seoDescription: "Licensed possum removal in Sydney. Humane exclusion methods for roof possums. 12 month warranty on exclusion work. Protect your home - book an inspection.",
    relatedServices: ["bird-control", "rodent-control", "roof-cleaning"],
    keywords: ["possum removal sydney", "possum in roof", "possum control", "possum catcher", "get rid of possums", "possum exclusion"]
  },
  {
    id: "bird-control",
    name: "Bird Control",
    slug: "bird-control",
    shortDescription: "Professional bird deterrent and removal solutions",
    longDescription: "Pest birds like pigeons, Indian Mynas, and starlings cause significant problems for Sydney properties - from noise and droppings to health hazards and building damage. Bird droppings are acidic and can damage paint, metal, and stonework. Professional bird control includes deterrent installation (spikes, netting, wire systems), roosting site modifications, and removal of nesting materials.",
    priceRange: { min: 200, max: 800, average: 450, display: "$200 - $800" },
    searchVolume: "low-medium",
    urgency: "medium",
    commonIn: ["commercial", "warehouses", "houses", "apartment-balconies"],
    seasonality: "year-round",
    peakSeason: "spring",
    timeToComplete: "2-8 hours depending on solution",
    warrantyTypical: "2-5 years on deterrent systems",
    signs: [
      "Birds roosting on ledges, signs, or beams",
      "Accumulation of bird droppings",
      "Nests in unwanted locations",
      "Bird noise causing disturbance",
      "Birds entering buildings",
      "Damage to goods or produce",
      "Health concerns from droppings"
    ],
    process: [
      "Site inspection and bird identification",
      "Assessment of roosting and nesting sites",
      "Recommendation of appropriate deterrent systems",
      "Installation of spikes, netting, or wire systems",
      "Nest removal and clean-up",
      "Sanitisation of affected areas",
      "Ongoing maintenance advice"
    ],
    faqs: [
      {
        question: "What deterrent methods are available?",
        answer: "Options include bird spikes (physical barrier), netting (exclusion), wire systems (prevents landing), visual deterrents, and sonic devices. The best solution depends on the bird species, location, and your specific situation. We'll recommend the most effective and cost-efficient option for your property."
      },
      {
        question: "Are bird deterrents humane?",
        answer: "Yes, modern bird deterrents are designed to discourage birds without harming them. Spikes and wire systems simply prevent landing and are not sharp enough to injure birds. Netting excludes birds from areas. The goal is to make your property less attractive than alternative roosting sites."
      },
      {
        question: "Can bird droppings be dangerous?",
        answer: "Yes, bird droppings can carry over 60 diseases transmissible to humans, including Histoplasmosis and Cryptococcosis. Dried droppings become airborne and can be inhaled. Additionally, droppings are highly acidic and cause damage to building materials, paint, and vehicles."
      },
      {
        question: "Will the birds just move somewhere else on my building?",
        answer: "Good bird control anticipates this. We assess your entire property and recommend protection for all potential roosting sites. Simply treating one area often moves the problem elsewhere. A comprehensive solution addresses all vulnerable areas."
      }
    ],
    seoTitle: "Bird Control Sydney - Pigeons, Mynas & More | From $200",
    seoDescription: "Professional bird control in Sydney. Spikes, netting & deterrent systems for pigeons and pest birds. Protect your property from bird damage. Free quotes.",
    relatedServices: ["possum-removal", "commercial-pest-control", "cleaning-services"],
    keywords: ["bird control sydney", "pigeon control", "bird spikes", "bird netting", "bird deterrent", "indian myna control"]
  },
  {
    id: "wasp-bee-removal",
    name: "Wasp & Bee Removal",
    slug: "wasp-bee-removal",
    shortDescription: "Safe removal of wasp nests and bee hives",
    longDescription: "Wasps and bees near high-traffic areas of your property pose a real sting risk, particularly for those with allergies. Paper wasps, European wasps, and native bees are common in Sydney. Professional removal ensures safety and, where possible for bees, humane relocation. European wasp nests in particular can contain thousands of aggressive wasps and require expert treatment.",
    priceRange: { min: 150, max: 400, average: 250, display: "$150 - $400" },
    searchVolume: "medium",
    urgency: "high",
    commonIn: ["houses", "gardens", "commercial", "schools"],
    seasonality: "spring-autumn",
    peakSeason: "summer",
    timeToComplete: "30 minutes - 2 hours",
    warrantyTypical: "Nest removal warranty",
    signs: [
      "Visible wasp nest (paper-like structure)",
      "High wasp activity around a specific area",
      "European wasps entering a wall cavity or ground hole",
      "Bee swarm on property",
      "Established bee hive in structure",
      "Aggressive wasp behaviour near entry points"
    ],
    process: [
      "Safe approach and identification of species",
      "Assessment of nest size and location",
      "Selection of appropriate removal method",
      "Treatment and/or removal of nest",
      "For bees: assessment of relocation options",
      "Removal of physical nest structure",
      "Advice on deterring future nesting"
    ],
    faqs: [
      {
        question: "What's the difference between wasps and bees?",
        answer: "Wasps are generally slimmer with bright yellow and black markings and can sting multiple times. Bees are furrier, less aggressive, and die after stinging. Paper wasps build exposed umbrella-shaped nests while European wasps nest in cavities. Honey bees form larger hives in cavities."
      },
      {
        question: "Should I try to remove a wasp nest myself?",
        answer: "We strongly advise against DIY wasp nest removal, especially for European wasp nests which can be extremely aggressive. Disturbing a nest can trigger mass stinging. Professional pest controllers have protective equipment and effective treatments for safe removal."
      },
      {
        question: "Can bees be relocated instead of killed?",
        answer: "Where possible, we prefer to relocate bee colonies to beekeepers. However, this depends on location, species, and accessibility. Sometimes safe removal isn't possible and treatment is necessary. We'll discuss options and prioritise bee preservation where viable."
      },
      {
        question: "What's the risk of European wasps?",
        answer: "European wasps are highly aggressive when disturbed, can sting multiple times, and nests can contain thousands of wasps. They're attracted to food and drinks, making outdoor eating areas dangerous. Their ground nests are often disturbed accidentally. Professional removal is essential."
      }
    ],
    seoTitle: "Wasp & Bee Removal Sydney - Fast & Safe | From $150",
    seoDescription: "Professional wasp nest removal and bee relocation in Sydney. Fast response for paper wasps & European wasps. Safe for families. Call for urgent service.",
    relatedServices: ["spider-control", "general-pest-control"],
    keywords: ["wasp removal sydney", "wasp nest removal", "bee removal", "european wasp", "paper wasp", "bee swarm"]
  },
  {
    id: "commercial-pest-control",
    name: "Commercial Pest Control",
    slug: "commercial-pest-control",
    shortDescription: "Integrated pest management for Sydney businesses",
    longDescription: "Commercial properties have specific pest control requirements often driven by health regulations, industry standards, and customer expectations. Our commercial pest management includes regular scheduled services, detailed documentation for compliance, rapid response for urgent issues, and tailored solutions for restaurants, offices, warehouses, healthcare facilities, and retail spaces.",
    priceRange: { min: 300, max: 2000, average: 500, display: "$300 - $2,000+/month" },
    searchVolume: "medium",
    urgency: "varies",
    commonIn: ["restaurants", "offices", "warehouses", "healthcare", "retail", "hotels"],
    seasonality: "year-round",
    peakSeason: "year-round",
    timeToComplete: "varies by property",
    warrantyTypical: "Ongoing service agreement",
    signs: [
      "Any pest sighting in commercial premises",
      "Health inspection requirements",
      "Customer complaints",
      "Audit or compliance requirements",
      "Moving to new premises",
      "New food business licence"
    ],
    process: [
      "Comprehensive site inspection",
      "Risk assessment and pest pressure analysis",
      "Customised pest management plan",
      "Regular scheduled treatments",
      "Documentation and compliance reports",
      "24/7 emergency response availability",
      "Staff awareness training",
      "Regular review and adjustment"
    ],
    faqs: [
      {
        question: "How often do commercial premises need pest control?",
        answer: "Frequency depends on your industry and pest pressure. Food businesses typically require monthly service as a minimum. Offices might need quarterly treatments. We'll assess your specific situation and recommend an appropriate schedule that meets both regulatory requirements and practical needs."
      },
      {
        question: "Can you provide documentation for health inspections?",
        answer: "Yes, we provide comprehensive service reports including dates, treatments performed, products used, and pest activity findings. These reports are designed to meet NSW Food Authority and council inspection requirements. Digital reports can be provided for easy record-keeping."
      },
      {
        question: "Do you offer emergency call-outs for businesses?",
        answer: "Yes, we understand that pest issues in commercial settings can't wait. We offer rapid response for urgent situations like rodent sightings in food premises or wasp nests near customer areas. Many service agreements include priority emergency response."
      },
      {
        question: "Can treatment be done outside business hours?",
        answer: "Yes, we regularly service businesses after hours to minimise disruption to operations. For restaurants, healthcare facilities, and retail, after-hours service is often preferred. We'll work with your schedule to find the least disruptive timing."
      }
    ],
    seoTitle: "Commercial Pest Control Sydney - Business Solutions | Free Quote",
    seoDescription: "Professional commercial pest control in Sydney. Tailored programs for restaurants, offices & warehouses. Compliance documentation included. Contact us today.",
    relatedServices: ["rodent-control", "cockroach-control", "bird-control"],
    keywords: ["commercial pest control sydney", "business pest control", "restaurant pest control", "office pest control", "industrial pest control", "pest management plan"]
  },
  {
    id: "pre-purchase-inspection",
    name: "Pre-Purchase Pest Inspection",
    slug: "pre-purchase-inspection",
    shortDescription: "Comprehensive pest inspections for property buyers",
    longDescription: "A pre-purchase pest inspection is essential due diligence when buying property in Sydney. Our inspections identify existing pest activity, previous pest damage, and conditions conducive to future problems. The detailed report helps you make informed purchase decisions and can be used for negotiation. We inspect for termites, borers, and other wood-destroying pests as per Australian Standard AS 4349.3.",
    priceRange: { min: 300, max: 600, average: 400, display: "$300 - $600" },
    searchVolume: "high",
    urgency: "high",
    commonIn: ["houses", "townhouses", "apartments", "commercial"],
    seasonality: "year-round",
    peakSeason: "spring-autumn",
    timeToComplete: "1-3 hours",
    warrantyTypical: "Report valid for settlement period",
    signs: [
      "Buying a property in Sydney",
      "Concerned about termite history",
      "Purchasing older property",
      "Property near bushland",
      "Previous reports mention pest issues",
      "Building inspection found timber damage"
    ],
    process: [
      "Visual inspection of all accessible areas",
      "Thermal imaging for hidden activity",
      "Moisture meter readings",
      "Roof void and subfloor inspection",
      "External grounds and landscaping check",
      "Assessment of termite risk factors",
      "Detailed written report with photos",
      "Phone consultation to explain findings"
    ],
    faqs: [
      {
        question: "When should I book a pre-purchase inspection?",
        answer: "Book as soon as your offer is accepted, during the cooling-off period. This gives you time to receive the report, understand the findings, and make decisions before the purchase becomes unconditional. We offer rapid turnaround times to meet tight settlement deadlines."
      },
      {
        question: "What's the difference between building and pest inspections?",
        answer: "Building inspections assess structural elements, compliance, and general condition. Pest inspections specifically look for evidence of termites and other wood-destroying pests, past damage, and risk factors. Both are recommended for a complete picture. We can often coordinate with building inspectors."
      },
      {
        question: "Can past termite damage be a deal-breaker?",
        answer: "Not necessarily. Well-treated past damage may be acceptable if structural repairs were done properly and ongoing protection is in place. Our report identifies the extent of damage and whether treatment appears adequate. This information helps you make an informed decision or negotiate."
      },
      {
        question: "What areas can't be inspected?",
        answer: "We can only inspect accessible areas. Furniture, stored items, fixed linings, and concealed spaces can't be visually assessed without moving or removing them. Our reports clearly note areas that couldn't be inspected and any associated risks. Sellers should provide access where possible."
      }
    ],
    seoTitle: "Pre-Purchase Pest Inspection Sydney - From $300 | Fast Reports",
    seoDescription: "Pre-purchase timber pest inspections in Sydney. Thorough termite inspection before you buy. Same-day reports available. Essential buyer protection.",
    relatedServices: ["termite-inspection", "termite-treatment", "building-inspection"],
    keywords: ["pre purchase pest inspection", "timber pest inspection", "pest inspection before buying", "property pest inspection", "pre settlement pest check", "pest report sydney"]
  },
  {
    id: "mosquito-control",
    name: "Mosquito Control",
    slug: "mosquito-control",
    shortDescription: "Reduce mosquito populations around your property",
    longDescription: "Sydney's warm climate and waterways create ideal breeding conditions for mosquitoes. Beyond the irritation of bites, mosquitoes can carry diseases including Ross River virus. Professional mosquito control targets adult mosquitoes, treats breeding sites, and provides advice on reducing mosquito-friendly conditions around your property. Perfect for outdoor living areas, pools, and properties near water.",
    priceRange: { min: 200, max: 400, average: 280, display: "$200 - $400" },
    searchVolume: "medium",
    urgency: "medium",
    commonIn: ["houses", "pools", "near-water", "outdoor-venues"],
    seasonality: "spring-autumn",
    peakSeason: "summer",
    timeToComplete: "1-2 hours",
    warrantyTypical: "Treatment effective 4-6 weeks",
    signs: [
      "Regular mosquito bites when outdoors",
      "Mosquitoes entering inside through doors",
      "Standing water around property",
      "Near creek, pond, or other water source",
      "Outdoor entertaining areas unusable",
      "Property with extensive gardens or bushland"
    ],
    process: [
      "Property inspection for breeding sites",
      "Identification of mosquito harbourage areas",
      "Treatment of adult resting sites",
      "Larvicide application to water features",
      "Barrier treatment around outdoor areas",
      "Advice on reducing breeding sites",
      "Recommendations for ongoing management"
    ],
    faqs: [
      {
        question: "How long does mosquito treatment last?",
        answer: "A professional mosquito treatment provides relief for approximately 4-6 weeks. Effectiveness depends on rainfall, nearby breeding sites beyond your property, and mosquito pressure in your area. Regular treatments during mosquito season provide the best ongoing control."
      },
      {
        question: "Can you treat near fish ponds?",
        answer: "Yes, we use products and methods safe for use near ornamental fish ponds. We can apply fish-safe larvicides to prevent mosquito breeding in ponds while protecting your fish. Please let us know about any water features during booking."
      },
      {
        question: "What can I do to reduce mosquitoes myself?",
        answer: "Eliminate standing water - empty saucers, old tyres, blocked gutters, and any containers. Change pet water frequently. Keep pools properly maintained. Ensure rainwater tanks have mosquito-proof screens. These steps significantly reduce breeding sites on your property."
      },
      {
        question: "Is mosquito treatment safe for outdoor dining areas?",
        answer: "Yes, once dry (typically 1-2 hours), treated areas are safe for normal use including outdoor dining. We'll advise on timing for any specific precautions. The products used are designed for residential environments with families and pets."
      }
    ],
    seoTitle: "Mosquito Control Sydney - Outdoor Relief | From $200",
    seoDescription: "Professional mosquito control in Sydney. Reduce biting insects around your home. Perfect for pools & outdoor areas. Enjoy your backyard again. Book now.",
    relatedServices: ["general-pest-control", "spider-control", "outdoor-treatments"],
    keywords: ["mosquito control sydney", "mosquito treatment", "mosquito spray", "reduce mosquitoes", "backyard mosquito control", "mosquito prevention"]
  }
];

function generateServiceFiles() {
  const outputDir = path.join(__dirname, '..', 'public', 'services');

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate individual service files
  for (const service of services) {
    const filePath = path.join(outputDir, `${service.slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(service, null, 2));
    console.log(`Created: ${service.slug}.json`);
  }

  // Generate index file
  const indexData = {
    total: services.length,
    lastUpdated: new Date().toISOString(),
    categories: {
      "termite-services": services.filter(s => s.id.includes('termite')).map(s => s.id),
      "common-pests": ["general-pest-control", "cockroach-control", "ant-control", "spider-control", "rodent-control"],
      "specialty-services": ["bed-bug-treatment", "flea-treatment", "possum-removal", "bird-control", "wasp-bee-removal", "mosquito-control"],
      "commercial": ["commercial-pest-control"],
      "inspections": ["pre-purchase-inspection", "termite-inspection"]
    },
    services: services.map(s => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      shortDescription: s.shortDescription,
      priceRange: s.priceRange.display,
      searchVolume: s.searchVolume,
      urgency: s.urgency
    }))
  };

  const indexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));

  console.log(`\n✅ Generated ${services.length} service files`);
  console.log(`📁 Index file created at: ${indexPath}`);
}

generateServiceFiles();
