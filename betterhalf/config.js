// Configuration file for the proposal website
// Edit this file to customize quotes, pictures, and content

const CONFIG = {
  // Personal details
  herName: "Kaju",  // Her name
  petName: "Jaan",  // What you call her
  yourName: "My Name",

  // Quotes with photos section - each quote can have an associated image
  // NOTE: Replace Unsplash URLs with your own photos in the photos/ folder
  // Example: image: "photos/photo1.jpg"
  quotesWithPhotos: [
      {
          id: 0,
          text: "Dastaan shuru hui iss tasweer se, khoobsoorat muskan, killer pose and the confidence in Ghagra uff...",
          image: "pics/bio.JPG",
          caption: "",  // Add caption if you want
          buttonText: "Show me more ✨",  // Button text for this quote
          order: 0
      },
    {
      id: 2,
      text: "Chahe hazaar baithe ho saamne, nazrein sirf tmhe hi dhundhti hai",
      image: "pics/search.JPG",
      caption: "",  // Add caption if you want
      buttonText: "Show me more ✨",  // Button text for this quote
      order: 2
    },
      {
          id: 1,
          text: "Koi kehta tareef km karte hain, dhyaan se suno to har gaze, har saans me ek sifaat sunai degi",
          image: "pics/bday.JPG",
          caption: "",  // Add caption if you want
          buttonText: "Awww...  ✨",  // Button text for this quote
          order: 1
      },
    {
      id: 3,
      text: "The only buzz I don't want to mute my phone. My favourite notification...",
      image: "pics/wa.PNG",
      caption: "",  // Add caption if you want
      buttonText: "Show me more ✨",  // Button text for this quote
      order: 3
    },
      {
          id: 4,
          text: "Its like a dream come true... Happily Ever After ❤️",
          image: "pics/togetha.JPG",
          caption: "",  // Add caption if you want
          buttonText: "Take me ahead 💖",  // Button text for last quote
          order: 4
      }
  ],

  // Your poetry section - add more verses or keep empty
  // These will show AFTER the quotes with photos section
  // Lines will appear one at a time on tap
  poetry: {
    preface: "It's said people start taking less risk when they have or about to have a family but in poetry we say,",
    lines: [
      "Ab raaston par bike thodi dheere chalane laga hoon,",
      "Khai, kinaro se doori rakhne laga hoon, zara darne laga hoon",
      "Jo jokhim bejijhak liya karta tha!",
      "Zindagi se thodi zyada mohabbat karne laga hoon,",
      "Ki koi hai jiske paas vapas jaana hai,",
      "Kuchh tasvirein dikhani, kahaniyan bayan karni hain",
      "Uski muskurahat banna hai, aasuon ka paigam nahi,",
      "Ki koi hai jiske paas vapas jaana hai…"
    ]
  },

  // Final message before in-person proposal
  finalMessage: "You are my today and all of my tomorrows",
  recitalPrompt: "Now look up",

  // Theme colors
  colors: {
    primary: "#DC143C",      // Crimson red
    secondary: "#8B0000",    // Dark red
    accent: "#FFB6C1",       // Light pink
    dark: "#5C0000",         // Deep dark red
    light: "#FFF5F5"         // Light rose white
  },


  // Music (optional - leave empty if not using)
  // Recommended romantic songs: "Perfect" by Ed Sheeran, "All of Me" by John Legend
  // "Thinking Out Loud" by Ed Sheeran, "A Thousand Years" by Christina Perri
  backgroundMusic: {
    enabled: false,
    src: ""  // Add path to your chosen romantic song MP3
  }
};
