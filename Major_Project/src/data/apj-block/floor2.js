export const floor2 = {
    buildingName: "APJ-BLOCK",
    label: "2nd Floor",
    viewWidth: 1100,
    viewHeight: 1600,
    mainWidth: 850,
    bulgeWidth: 250,
    bulgeHeight: 450,
    rooms: [
      // ROW 1: TOP SECTION
      { id: "lh-211", name: "LH-211", x: 60, y: 30, w: 240, h: 110, type: "classroom", description: "Classroom LH-211", capacity: 60, image: "/apj-block-images/2nd-floor/LH-211.jpeg", directions: "Located at the top left corner of the 2nd floor.", tags: ["class", "lecture", "cr", "lh", "211"] },
      { id: "staff-room-top", name: "STAFF ROOM", x: 310, y: 30, w: 240, h: 110, type: "staffroom", description: "Main Staff Room", department: "General", capacity: 15, image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.12 PM.jpeg", directions: "Located at the top center of the 2nd floor.", tags: ["office", "staff"] },
      { id: "lh-212", name: "LH-212", x: 560, y: 30, w: 240, h: 110, type: "classroom", description: "Classroom LH-212", capacity: 60, image: "/apj-block-images/2nd-floor/LH-212.jpeg", directions: "Located at the top right corner of the 2nd floor.", tags: ["class", "lecture", "cr", "lh", "212"] },

      // ROW 2: UPPER PAIR
      { id: "staff-room-pair-1", name: "STAFF ROOM", x: 305, y: 160, w: 120, h: 160, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.17 PM.jpeg", directions: "TBD", tags: ["office"] },
      { id: "staff-room-pair-2", name: "STAFF ROOM", x: 435, y: 160, w: 120, h: 160, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.26 PM.jpeg", directions: "TBD", tags: ["office"] },

      // ROW 3: BTL09 & LH-210
      { id: "btl09", name: "BTL09", x: 45, y: 210, w: 200, h: 240, type: "lab", description: "Bioprocess Engineering Lab (BTL09)", department: "Biotechnology", capacity: 40, image: "/apj-block-images/2nd-floor/bioprocess(BTL09).jpeg", directions: "TBD", tags: ["lab", "bt", "biotech", "biological", "bioprocess", "9"] },
      { id: "lh-210", name: "LH-210", x: 560, y: 390, w: 240, h: 110, type: "classroom", description: "Classroom LH-210", capacity: 60, image: "/apj-block-images/2nd-floor/LH-210.jpeg", directions: "TBD", tags: ["class", "lecture", "cr", "lh", "210"] },

      // ROW 4: WASHROOM & STAIRS-1
      { id: "washroom-2", name: "WASHROOM", x: 60, y: 520, w: 240, h: 120, type: "utility", description: "Restroom facilities", image: "https://placehold.co/400x600?text=Washroom", directions: "TBD", tags: ["toilet", "restroom"] },
      { id: "stairs-1-2", name: "STAIRS-1", x: 310, y: 590, w: 240, h: 90, type: "utility", description: "Main building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "TBD", tags: ["stairs", "steps"] },

      // ROW 5: HOD & LIFT
      { id: "hod-cabin-bt", name: "BT HOD", x: 60, y: 690, w: 260, h: 120, type: "hod", description: "Head of Department - Biotechnology", department: "BT", image: "/apj-block-images/2nd-floor/HOD(BT).jpeg", directions: "TBD", tags: ["office", "hod"] },
      { id: "lift-2", name: "LIFT", x: 310, y: 720, w: 240, h: 90, type: "utility", description: "Building elevator", image: "https://placehold.co/400x220?text=Lift", directions: "TBD", tags: ["lift", "elevator"] },

      // ROW 6: STAFF ROOM & BTL08
      { id: "staff-room-mid-2f", name: "STAFF ROOM", x: 70, y: 850, w: 220, h: 70, type: "staffroom", description: "Department staff room", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.27 PM.jpeg", directions: "TBD", tags: ["office"] },
      { id: "btl08", name: "BTL08", x: 60, y: 940, w: 240, h: 70, type: "lab", description: "Biotechnology Lab BTL08", department: "BT", capacity: 30, image: "/apj-block-images/2nd-floor/BTL08.jpeg", directions: "TBD", tags: ["lab", "bt", "biotech", "8"] },

      // ROW 7: BTL07, STAFF ROOM(V), BTL11
      { id: "btl07", name: "BTL07", x: 60, y: 1040, w: 240, h: 90, type: "lab", description: "Immunology Lab (BTL07)", department: "BT", capacity: 30, image: "/apj-block-images/2nd-floor/immunology lab(BTL07).jpeg", directions: "TBD", tags: ["lab", "bt", "biotech", "immunology", "7"] },
      { id: "staff-room-vert-2f", name: "STAFF ROOM", x: 430, y: 990, w: 140, h: 200, type: "staffroom", description: "Vertical staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.30 PM (1).jpeg", directions: "TBD", tags: ["office"] },
      { id: "btl11", name: "BTL11", x: 560, y: 870, w: 200, h: 140, type: "lab", description: "Research Lab (BTL11)", department: "BT", capacity: 25, image: "/apj-block-images/2nd-floor/research_lab(BTL 11).jpeg", directions: "TBD", tags: ["lab", "bt", "biotech", "research", "11"] },

      // ROW 8: METROLOGY LAB
      { id: "metrology-lab", name: "METROLOGY LAB", x: 540, y: 1140, w: 240, h: 240, type: "lab", description: "Metrology and Measurement Lab", department: "Mechanical/BT", capacity: 50, image: "/apj-block-images/2nd-floor/Metrology_lab.jpeg", directions: "TBD", tags: ["lab", "metrology", "measurement", "mechanical", "mech"] },
      
      // BOTTOM ROW: BTL10 & STAIRS-2
      { id: "btl10", name: "BTL10", x: 90, y: 1410, w: 220, h: 90, type: "utility", description: "Department Library (BTL10)", department: "BT", capacity: 10, image: "/apj-block-images/2nd-floor/research_lab(BTL10).jpeg", directions: "TBD", tags: ["library", "bt"] },
      { id: "stairs-2-2f", name: "STAIRS-2", x: 320, y: 1470, w: 240, h: 90, type: "utility", description: "Secondary building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "TBD", tags: ["stairs", "steps"] },

      // RIGHT OPEN CORRIDOR (Inside the bulge area)
      { id: "corridor-2", name: "", x: 850, y: 500, w: 250, h: 450, type: "corridor", clickable: false, description: "Open corridor zone.", image: "", directions: "TBD", tags: [] }
    ],
    faculty: [
      { name: "Dr. UJWAL P", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.31 PM (1).jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. SHYAMA PRASAD SAJANKILA", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.31 PM.jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. VINAYAKA B SHET", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.32 PM (1).jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. ANIL KUMAR H S", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.32 PM (2).jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. VENKATESH KAMATH H", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.32 PM.jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. VIDYA S M", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.33 PM (1).jpeg", roomId: "staff-room-top", department: "General" },
      { name: "Dr. CHETAN D M", image: "/apj-block-images/2nd-floor/2nd-floor staff room/WhatsApp Image 2026-04-24 at 10.17.33 PM.jpeg", roomId: "staff-room-top", department: "General" }
    ]
};
