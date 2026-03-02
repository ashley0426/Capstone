
export interface GetSocialData {
  id: number;
  name: string;
  link: string;
  img: any;
  intro: string;
  info: string;
  infoArray?: string[];
}

export interface JokesData {
  id: number;
  joke: string;
  answer: string;
}


export const SocialRegions = [
  {
    id:0,
    name: "Sunshine Coast Hinterland",
    link: 'https://visitsunshinecoasthinterland.com.au/',
    image: require('@/assets/images/social/get-socials-60PP/SUNSHINE COAST HINTERLAND.jpg'),
    intro: "Discover why this region is known as one of the most welcoming in the world.",
    info: `
        Escape to the crisp air, stunning views, and charming villages of the Sunshine Coast Hinterland. Embark on a soul-enriching journey through the golden wedding triangle of Flaxton, Maleny, and Kenilworth, explore the storybook town of Montville, and marvel at the towering peaks of the Glasshouse Mountains. Discover why this region is known as one of the most welcoming in the world.
        Stay amidst the beauty of rolling green hills that lead to quirky, eclectic villages brimming with award-winning cafés, restaurants, and bars.
        From fine dining at some of Queensland's best restaurants, to casual dining or coffee at any of the boutique cafés or coffee shops.
        The Hinterland has something to suit everybody.
      `,
    infoArray: [
      `Escape to the crisp air, stunning views, and charming villages of the Sunshine Coast Hinterland. Embark on a soul-enriching journey through the golden wedding triangle of Flaxton, Maleny, and Kenilworth, explore the storybook town of Montville, and marvel at the towering peaks of the Glasshouse Mountains. Discover why this region is known as one of the most welcoming in the world.`,
      `Stay amidst the beauty of rolling green hills that lead to quirky, eclectic villages brimming with award-winning cafés, restaurants, and bars.`,
      `From fine dining at some of Queensland’s best restaurants, to casual dining or coffee at any of the boutique cafés or coffee shops.`,
      `The Hinterland has something to suit everybody.`,
    ]
  },
  {
    id:1,
    name: "Brisbane",
    link: 'https://visit.brisbane.qld.au/things-to-do',
    image: require('@/assets/images/social/get-socials-60PP/BRISBANE.jpg'),
    intro: "Discover Brisbane's exciting line-up of major sporting and cultural events",
    info: `
        Discover Brisbane's exciting line-up of major sporting and cultural events. Whether it's an international rugby match, a cricket test at The Gabba, a theatre performance at QPAC, or a live music show in Fortitude Valley, there's something for everyone. Enjoy comedy shows, weekend markets, and eclectic festivals. Stay informed and plan your visit to make the most of Brisbane's vibrant event scene.
        For more details, visit the What's On in Brisbane page.
      `,
    infoArray: [
      `Discover Brisbane's exciting line-up of major sporting and cultural events. Whether it's an international rugby match, a cricket test at The Gabba, a theatre performance at QPAC, or a live music show in Fortitude Valley, there's something for everyone. Enjoy comedy shows, weekend markets, and eclectic festivals.`, 
      `Stay informed and plan your visit to make the most of Brisbane's vibrant event scene.`,
      `For more details, visit the What's On in Brisbane page.`
    ]
  },
  {
    id:2,
    name: "Gold Coast Hinterland",
    link: 'https://www.queensland.com/au/en/places-to-see/destinations/gold-coast/gold-coast-hinterland',
    image: require('@/assets/images/social/get-socials-60PP/GOLD COAST.jpg'),
    intro: "This inland district is a treasure trove of producers and forests, trading sandy shores for abundant greenery.",
    info: `
        Step away from the famous beaches of the Gold Coast and into the rolling hills of the hinterland. Just a short drive from the bright lights of Surfers Paradise, this lush landscape feels like a world apart. This inland district is a treasure trove of producers and forests, trading sandy shores for abundant greenery.
        National parks are the highlight here. Explore the Gondwana Rainforests of Springbrook National Park, one of the wettest places in Southeast Queensland. Hike the picturesque trails of Lamington National Park, a haven for birdwatchers. O'Reilly's Rainforest Retreat serves as a gateway to multiple tracks, including a treetop walk that span nine suspension bridges over the canopy.
        Mount Tamborine, the Gold Coast's most famous former volcano, is a paradise for craft lovers and antiques enthusiasts. This charming region is home to quaint villages filled with antique stores, artisan galleries, and cafés perfect for a post-shopping coffee break. Outdoor adventures abound, from the floral displays at the Mount Tamborine Botanic Gardens to the rugged beauty of Curtis and Cedar Creek Falls.
      `,
    infoArray: [
      `Step away from the famous beaches of the Gold Coast and into the rolling hills of the hinterland. Just a short drive from the bright lights of Surfers Paradise, this lush landscape feels like a world apart. This inland district is a treasure trove of producers and forests, trading sandy shores for abundant greenery.`,
      `National parks are the highlight here. Explore the Gondwana Rainforests of Springbrook National Park, one of the wettest places in Southeast Queensland. Hike the picturesque trails of Lamington National Park, a haven for birdwatchers. O'Reilly's Rainforest Retreat serves as a gateway to multiple tracks, including a treetop walk that span nine suspension bridges over the canopy.`,
      `Mount Tamborine, the Gold Coast’s most famous former volcano, is a paradise for craft lovers and antiques enthusiasts. This charming region is home to quaint villages filled with antique stores, artisan galleries, and cafés perfect for a post-shopping coffee break. Outdoor adventures abound, from the floral displays at the Mount Tamborine Botanic Gardens to the rugged beauty of Curtis and Cedar Creek Falls.`,
    ]

  },
  {
    id:3,
    name: "North Queensland",
    link: 'https://tropicalnorthqueensland.org.au/',
    image: require('@/assets/images/social/get-socials-60PP/NORTH QUEENSLAND.jpg'),
    intro: "Experience the best of Tropical North Queensland, from wandering to waterfalls to diving into the Great Barrier Reef.",
    info: `
        Connect with nature in a place unlike any other. Here, you'll encounter astounding diversity and forge a connection to something greater. It's not just about relaxing on the beach (although we excel at that too), but about connecting with our unique part of the world.
        Experience the best of Tropical North Queensland, from wandering to waterfalls to diving into the Great Barrier Reef. With eleven distinct destinations, hundreds of sites to explore, and endless experiences to enjoy, your tropical journey of discovery awaits.
        Discover Tropical North Queensland!
      `,
    infoArray: [
      `Connect with nature in a place unlike any other. Here, you'll encounter astounding diversity and forge a connection to something greater. It's not just about relaxing on the beach (although we excel at that too), but about connecting with our unique part of the world.`,
      `Experience the best of Tropical North Queensland, from wandering to waterfalls to diving into the Great Barrier Reef. With eleven distinct destinations, hundreds of sites to explore, and endless experiences to enjoy, your tropical journey of discovery awaits.`,
    ]
  },
  {
    id:4,
    name: "Sydney",
    link: 'https://www.sydney.com/things-to-do',
    image: require('@/assets/images/social/get-socials-60PP/SYDNEY.jpeg'),
    intro: "Indulge in one of the globe's best food and drink scenes, explore rich cultural heritage",
    info: `
        Discover new experiences around every corner in Sydney. As the official tourism, destinations, and events website, we're here to guide you through this remarkable city.
        Begin with iconic landmarks like the Sydney Opera House and Harbour Bridge, or relax on world-famous beaches. Indulge in one of the globe's best food and drink scenes, explore rich cultural heritage, including the world's oldest continuous living culture, and enjoy wildlife experiences and stunning national parks. Sydney has it all—and more.
        If you want to explore further discover what's on offer in New South Wales!
      `,
    infoArray: [
      `Discover new experiences around every corner in Sydney. As the official tourism, destinations, and events website, we're here to guide you through this remarkable city.`,
      `Begin with iconic landmarks like the Sydney Opera House and Harbour Bridge, or relax on world-famous beaches. Indulge in one of the globe's best food and drink scenes, explore rich cultural heritage, including the world's oldest continuous living culture, and enjoy wildlife experiences and stunning national parks. Sydney has it all—and more.`,
      `If you want to explore further discover what’s on offer in New South Wales!`,
    ]
  },
  {
    id:5,
    name: "Melbourne",
    link: 'https://www.visitvictoria.com/',
    image: require('@/assets/images/social/get-socials-60PP/MELBOURNE_1.jpg'),
    intro: "Discover all the things that make Melbourne so unique and remarkable",
    info: `
        This is the bit where we try to distil down the intangible essence of Melbourne-ness and work out what makes it so damn different and interesting.
  
        Melbourne's a lot of things, almost too many to list. And that's the secret. You never come here for just one thing. You come here for as many different things as you can jam into your time. That's because what we really are is a city of individuals, creating unique and enriching individual experiences for all the individuals who visit.
  
        That's what makes Melbourne. Every bit different.
      `,
    infoArray: [
      `This is the bit where we try to distil down the intangible essence of Melbourne-ness and work out what makes it so damn different and interesting.`,
      `Melbourne's a lot of things, almost too many to list. And that’s the secret. You never come here for just one thing. You come here for as many different things as you can jam into your time. That's because what we really are is a city of individuals, creating unique and enriching individual experiences for all the individuals who visit.`,
    ]
  },
  {
    id:6,
    name: "Adelaide",
    link: 'https://www.cityofadelaide.com.au/',
    image: require('@/assets/images/social/get-socials-60PP/ADELAIDE_1.jpg'),
    intro: "Adelaide brims with culture, flavors, events and entertainment",
    info: `
        Looking for things to do in Adelaide? The city is brimming with culture, flavors, events, and entertainment. Bask in the sun at pristine metropolitan beaches, explore chic inner-city boutiques, savor world-renowned cuisine, or enjoy the vibrant small bar scene. Don't miss the chance to taste your way through some of Australia's finest wine regions. Whether you're unwinding at a beach bar, embarking on a scenic coastal road trip, or diving into the city's festival scene, our travel blog offers plenty of inspiration for exploring South Australia.
      `,
    infoArray: [
      `Looking for things to do in Adelaide? The city is brimming with culture, flavors, events, and entertainment. Bask in the sun at pristine metropolitan beaches, explore chic inner-city boutiques, savor world-renowned cuisine, or enjoy the vibrant small bar scene.`,
      `Don’t miss the chance to taste your way through some of Australia’s finest wine regions. Whether you're unwinding at a beach bar, embarking on a scenic coastal road trip, or diving into the city's festival scene, our travel blog offers plenty of inspiration for exploring South Australia. `
    ]
  },
  {
    id:7,
    name: "Perth",
    link: 'https://www.westernaustralia.com/au/places-to-visit/perth-and-surrounds/perth',
    image: require('@/assets/images/social/get-socials-60PP/PERTH_1.jpg'),
    intro: "Known for its sunshine, Perth offers summer arts festivals, beach days, park walks, nearby wineries, and Rottnest Island's quokkas.",
    info: `
        Perth, edged by the Indian Ocean with 19 sandy beaches, boasts the expansive Kings Park and the winding Swan River. This dynamic city blends natural beauty with a vibrant nightlife.
        Fremantle (Walyalup) captivates with its historic streets, bustling port, unique shops, unconventional breweries, and quirky buskers. Just 25 minutes by train or a half-hour drive from central Perth, this charming town invites you to stay and explore.
        Known for its sunshine, Perth offers summer arts festivals, beach days, park walks, nearby wineries, and Rottnest Island's quokkas.
        Explore Perth's unique neighbourhoods, such as Northbridge, Leederville, Mt Lawley, and Subiaco, each offering a mix of local eateries, shops, and bars.
        Things to do in Perth!
      `,
    infoArray: [
      `Perth, edged by the Indian Ocean with 19 sandy beaches, boasts the expansive Kings Park and the winding Swan River. This dynamic city blends natural beauty with a vibrant nightlife.`,
      `Fremantle (Walyalup) captivates with its historic streets, bustling port, unique shops, unconventional breweries, and quirky buskers. Just 25 minutes by train or a half-hour drive from central Perth, this charming town invites you to stay and explore.`,
      `Visitors can also reach it via the scenic Nullarbor Plain journey.`,
      `Known for its sunshine, Perth offers summer arts festivals, beach days, park walks, nearby wineries, and Rottnest Island's quokkas.`,
      `Explore Perth's unique neighbourhoods, such as Northbridge, Leederville, Mt Lawley, and Subiaco, each offering a mix of local eateries, shops, and bars.`,
    ]
  },
  {
    id:8,
    name: "Darwin",
    link: 'https://northernterritory.com/darwin-and-surrounds/destinations/darwin',
    image: require('@/assets/images/social/get-socials-60PP/DARWIN_1.jpg'),
    intro: "Darwin is an adventurer's paradise",
    info: `
        Treat your taste buds and indulge your sense of fun and adventure in the Northern Territory's tropical capital city.
        From the sparkling harbour and WWII history to the city's Asian-influenced food and tropical outdoor lifestyle, Darwin is an adventurer's paradise.
        Food, glorious food
        Our close proximity to Asia and ocean of fresh catches combine to make Darwin a modern dining delight.
        Savour the flavours at our most superb places to dine out in Darwin. Here, food takes inspiration from our land with local produce such as mud crab, barramundi, Kakadu plum, lemon myrtle and even green ants.
        There are plenty of options when dining around Darwin.
      `,
    infoArray: [
      `Treat your taste buds and indulge your sense of fun and adventure in the Northern Territory’s tropical capital city.`,
      `From the sparkling harbour and WWII history to the city’s Asian-influenced food and tropical outdoor lifestyle, Darwin is an adventurer’s paradise.`,
      `Food, glorious food`,
      `Our close proximity to Asia and ocean of fresh catches combine to make Darwin a modern dining delight.`,
      `Savour the flavours at our most superb places to dine out in Darwin. Here, food takes inspiration from our land with local produce such as mud crab, barramundi, Kakadu plum, lemon myrtle and even green ants.`,
      `There are plenty of options when dining around Darwin.`,
    ]
  }
];


export const Jokes = [
  {
    id: 0,
    joke: "What do Alexander the Great and Winnie the Pooh have in common?",
    answer: "They have the same middle name."
  },
  {
    id: 1,
    joke: "How many retirees does it take to change a light bulb?",
    answer: "One, but it'll take all day."
    },
  {
    id: 2,
    joke: "What did the dirt say to the rain?",
    answer: "You'd better cut it out, or my name will be mud!"
  },
  {
    id: 3,
    joke: "How does the moon cut his hair?",
    answer: "Eclipse it."
  },
  {
    id: 4,
    joke: "Why do seagulls fly over the sea?",
    answer: "If they flew over the bay, they would be bagels."
  },
  {
    id: 5,
    joke: "If my body were a car, I would trade it for a newer model.",
    answer: "Every time I cough, sputter, or sneeze, my radiant leaks and my exhaust backfires."
  },
  {
    id: 6,
    joke: "There are four stages of old age:",
    answer: "You forget names. Then you forget faces. Next, you forget to zip up. And finally, you forget to zip down."
  },
  {
    id: 7,
    joke: "Three old guys are out walking. The first one says, “Windy, isn’t it?”",
    answer: "The second one says, “No, it’s Thursday!” The third one says, “So am I. Let’s go get a beer.”"
  },
  {
    id: 8,
    joke: "What do you call someone with no body and no nose?",
    answer: "Nobody knows."
  },
  {
    id: 9,
    joke: "How can you increase the heart rate of your 70-year-old husband?",
    answer: "Tell him you're pregnant."
  },
  {
    id: 10,
    joke: "Why did the man get fired from the orange juice factory?",
    answer: "Lack of concentration."
  },
  {
    id: 11,
    joke: "The good thing about having a bad memory?",
    answer: "is that jokes can be funny more than once."
  },
  {
    id: 12,
    joke: "Why don't they play poker in the jungle?",
    answer: "Too many cheetahs."
  },
  {
    id: 13,
    joke: "One of the shortest wills ever written?",
    answer: "\u201CBeing of sound mind, I spent all the money.\u201D"
  },
  {
    id: 14,
    joke: "I'm not hard of hearing\u2026",
    answer: "I've just heard enough."
  },
  {
    id: 15,
    joke: "What was the radioactive older adult's superpower?",
    answer: "Gramma rays."
  },
  {
    id: 16,
    joke: "Speaking to her 93-year-old grandfather, a young woman asked, \u201CGrandpa, what were your good old days?\u201D",
    answer: "\u201CGrandpa's reply? \u201CWhen I wasn't good, and I wasn't old.\u201D"
  },
  {
    id: 17,
    joke: "Boy: \u201CWow, so many scars. You must have had an adventurous life!\u201D",
    answer: "\u201COld man: \u201CN0, I just have a cat.\u201D"
  },
  {
    id: 18,
    joke: "Prayer for Good Health for Seniors?",
    answer: "God grant me the Senility to forget the people I never liked anyway, the good fortune to run into the ones I do, and the eyesight to tell the difference."
  },
  {
    id: 19,
    joke: "You know you're getting old?",
    answer: "when you can't walk past a bathroom without thinking, \u201CI may as well pee while I'm here\u2026\u201D"
  },
  {
    id: 20,
    joke: "Where can single men over the age of 70 find younger women who are interested in them?",
    answer: "Try a bookstore under fiction."
  },
  {
    id: 21,
    joke: "How is the moon like dentures?",
    answer: "Both come out at night."
  },
  {
    id: 22,
    joke: "These are not gray hairs!",
    answer: "They are wisdom highlights."
  },
  {
    id: 23,
    joke: "Age is an issue of mind over matter.",
    answer: "If you don't mind getting older, then it really doesn't matter."
  },
  {
    id: 24,
    joke: "I called the incontinence hotline recently.",
    answer: "They asked if I could hold."
  },
  {
    id: 25,
    joke: "It's allergy season again?!",
    answer: "You've got to be pollen my leg."
  },
  {
    id: 26,
    joke: "Why are waterbeds so bouncy?",
    answer: "They're filled with spring water."
  },
  {
    id: 27,
    joke: "Does February march?",
    answer: "No, but April may."
  },
  {
    id: 28,
    joke: "A retired man now volunteers to entertain patients in assisted living homes and hospitals. He visited one hospital in Brooklyn and brought along his portable keyboard.",
    answer: "After telling jokes and singing songs at patients\u2019 bedsides, he said farewell and, \u201CI hope you get better.\u201D One elderly gentleman replied, \u201CI hope you get better, too.\u201D"
  },
  {
    id: 29,
    joke: "A woman told her friend, \u201CI feel like my body has gotten totally out of shape, so I got my doctor\u2019s permission to join a fitness club and start exercising.\u201D",
    answer: "She said, \u201CI decided to take an aerobics class for seniors. I bent, twisted, gyrated, jumped up and down, and perspired for an hour. But by the time I got my leotards on, the class was already over.\u201D"
  }
]