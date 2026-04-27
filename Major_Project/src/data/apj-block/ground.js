export const ground = {
  buildingName: "APJ-BLOCK",
  label: "Ground Floor",
  viewWidth: 1280,
  viewHeight: 1540,
  mainWidth: 960,
  bulgeWidth: 320,
  bulgeHeight: 500,
  rooms: [
    // TOP ROW
    {
      id: "alumni-lounge",
      name: "NITTE ALUMINI LOUNGE",
      x: 30, y: 50, w: 220, h: 200,
      type: "utility",
      description: "Alumni Lounge Area",
      image: "/apj-block-images/ground-floor/alumni-lounge.jpg",
      directions: "Top left area.",
      tags: ["lounge", "alumni"]
    },
    {
      id: "board-room-final",
      name: "BOARD ROOM",
      x: 310, y: 50, w: 360, h: 80,
      type: "board room",
      clickable: true,
      description: "Main Board Room",
      image: "/apj-block-images/ground-floor/ground-board-room.jpg",
      directions: "Top center area.",
      tags: ["board", "room"]
    },

    {
      id: "vinay-hegde",
      name: "N.VINAY HEGDE CABIN",
      x: 740, y: 50, w: 220, h: 100,
      type: "hod",
      description: "President's Cabin - N. Vinay Hegde",
      faculty: "SHRI. N. VINAYA HEGDE",
      portrait: "/apj-block-images/ground-floor/ground-floor faculty/Shri. N. Vinaya Hegde.png",
      image: "/apj-block-images/ground-floor/vinay-hegde.jpg",
      directions: "Top right area.",
      tags: ["office"]
    },

    // LEFT COLUMN
    {
      id: "vice-principal",
      name: "VICE PRINCIPAL CABIN",
      x: 30, y: 280, w: 220, h: 250,
      type: "hod",
      description: "Vice Principal's Office",
      faculty: "DR. NAGESH PRABHU",
      portrait: "/apj-block-images/ground-floor/ground-floor faculty/Dr.NageshPrabhu.png",
      image: "/apj-block-images/ground-floor/vice-principal.jpg",
      directions: "Left side, upper middle.",
      tags: ["office", "principal"]
    },
    {
      id: "vice-president",
      name: "VICE PRESIDENT CABIN (TE)",
      x: 30, y: 560, w: 220, h: 120,
      type: "hod",
      description: "Vice President Cabin (Technical Education)",
      faculty: "DR. GOPAL MUGERAYA",
      portrait: "/apj-block-images/ground-floor/ground-floor faculty/Dr.GopalMugeraya.png",
      image: "/apj-block-images/ground-floor/vice-president.jpg?v=2",
      directions: "Left side middle.",
      tags: ["office"]
    },
    {
      id: "washroom-g",
      name: "WASHROOM",
      x: 30, y: 710, w: 220, h: 120,
      type: "utility",
      description: "Washroom Facilities",
      image: "https://placehold.co/600x400?text=Washroom",
      directions: "Left side middle.",
      tags: ["toilet"]
    },
    {
      id: "examination-center",
      name: "EXAMINATION CENTER",
      x: 30, y: 920, w: 220, h: 520,
      type: "utility",
      description: "Main Examination Section",
      image: "/apj-block-images/ground-floor/exam-section.jpg?v=2",
      directions: "Large vertical block on the left.",
      tags: ["exam", "center"]
    },

    // CENTER COLUMN
    { id: "stairs-1", name: "STAIRS-1", x: 400, y: 600, w: 160, h: 60, type: "utility", description: "Upper central stairs", image: "https://placehold.co/600x400?text=Stairs+1", directions: "Center area.", tags: ["stairs"] },
    { id: "lift-g", name: "LIFT", x: 400, y: 750, w: 160, h: 70, type: "utility", description: "Elevator", image: "https://placehold.co/600x400?text=Lift", directions: "Center area.", tags: ["lift"] },
    { id: "stairs-2", name: "STAIRS-2", x: 350, y: 1420, w: 160, h: 60, type: "utility", description: "Lower central stairs", image: "https://placehold.co/600x400?text=Stairs+2", directions: "Bottom center area.", tags: ["stairs"] },

    // RIGHT COLUMN / MID-RIGHT
    {
      id: "principal-office",
      name: "PRINCIPAL CABIN",
      x: 740, y: 450, w: 220, h: 100,
      type: "hod",
      description: "Principal's Office",
      faculty: "DR. NIRANJAN N. CHIPLUNKAR",
      portrait: "/apj-block-images/ground-floor/ground-floor faculty/Prof. Niranjan N Chiplunkar.png",
      image: "/apj-block-images/ground-floor/principal.jpg",
      directions: "Middle right area.",
      tags: ["office", "principal"]
    },
    {
      id: "deputy-registrar-final",
      name: "DEPUTY REGISTRAR OFFICE",
      x: 790, y: 900, w: 190, h: 200,
      type: "deputy room",
      clickable: true,
      description: "Office of Deputy Registrar",
      faculty: "DR. REKHA BHANDARKAR",
      portrait: "/apj-block-images/ground-floor/ground-floor faculty/Dr.RekhaBhandarkar .png",
      image: "/apj-block-images/ground-floor/ground-deputy-registrar.jpg",
      directions: "Lower right area.",
      tags: ["office", "registry"]
    },

    {
      id: "nandhini-hall",
      name: "NANDHINI SEMINAR HALL",
      x: 790, y: 1200, w: 220, h: 240,
      type: "hall",
      description: "Nandhini Seminar Hall",
      image: "/apj-block-images/ground-floor/nandhini-hall.jpg?v=2",
      directions: "Bottom right area.",
      tags: ["seminar", "hall"]
    }
  ],
  faculty: [
    { 
      name: "SHRI. N. VINAYA HEGDE", 
      image: "/apj-block-images/ground-floor/ground-floor faculty/Shri. N. Vinaya Hegde.png", 
      roomId: "vinay-hegde", 
      department: "Administration" 
    },
    { 
      name: "DR. NIRANJAN N. CHIPLUNKAR", 
      image: "/apj-block-images/ground-floor/ground-floor faculty/Prof. Niranjan N Chiplunkar.png", 
      roomId: "principal-office", 
      department: "Principal Office" 
    },
    { 
      name: "DR. NAGESH PRABHU", 
      image: "/apj-block-images/ground-floor/ground-floor faculty/Dr.NageshPrabhu.png", 
      roomId: "vice-principal", 
      department: "Vice Principal Office" 
    },
    { 
      name: "DR. GOPAL MUGERAYA", 
      image: "/apj-block-images/ground-floor/ground-floor faculty/Dr.GopalMugeraya.png", 
      roomId: "vice-president", 
      department: "Technical Education" 
    },
    { 
      name: "DR. REKHA BHANDARKAR", 
      image: "/apj-block-images/ground-floor/ground-floor faculty/Dr.RekhaBhandarkar .png", 
      roomId: "deputy-registrar-final", 
      department: "Deputy Registrar Office" 
    }
  ]
};
