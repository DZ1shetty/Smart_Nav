export const second = {
    buildingName: "APJ-BLOCK",
    label: "Second Floor",
    viewWidth: 1280,
    viewHeight: 1540,
    mainWidth: 960,
    bulgeWidth: 320,
    bulgeHeight: 500,
    rooms: [
      // TOP ROW
      { id: "lh-211", name: "LH211", x: 30, y: 50, w: 210, h: 80, type: "classroom", description: "Classroom LH211", capacity: 60, image: "/apj-block-images/2nd-floor/LH-211.jpeg", directions: "Located at the top left corner.", tags: ["class", "lh", "211"] },
      { id: "staff-room-top", name: "STAFF ROOM", x: 310, y: 70, w: 360, h: 80, type: "staffroom", description: "Main Staff Room", department: "General", capacity: 15, image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.12 PM.jpeg", directions: "Top center staff area.", tags: ["office", "staff"] },
      { id: "lh-212", name: "LH212", x: 730, y: 30, w: 200, h: 80, type: "classroom", description: "Classroom LH212", capacity: 60, image: "/apj-block-images/2nd-floor/LH-212.jpeg", directions: "Located at the top right corner.", tags: ["class", "lh", "212"] },

      // UPPER CENTER PAIR
      { id: "staff-room-pair-1", name: "STAFF ROOM", x: 320, y: 210, w: 140, h: 190, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.17 PM.jpeg", directions: "Center-left staff area.", tags: ["office"] },
      { id: "staff-room-pair-2", name: "STAFF ROOM", x: 500, y: 210, w: 140, h: 190, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.26 PM.jpeg", directions: "Center-right staff area.", tags: ["office"] },

      // LEFT COLUMN
      { id: "btl09", name: "BTL09", x: 10, y: 260, w: 210, h: 210, type: "lab", description: "Bioprocess Engineering Lab (BTL09)", department: "Biotechnology", capacity: 40, image: "/apj-block-images/2nd-floor/bioprocess(BTL09).jpeg", directions: "Main biotech lab on the left.", tags: ["lab", "bt", "9"] },
      { id: "washroom-2", name: "WASHROOM", x: 10, y: 520, w: 210, h: 80, type: "utility", description: "Restroom facilities", image: "https://placehold.co/400x600?text=Washroom", directions: "Left side washroom.", tags: ["toilet"] },
      { id: "hod-cabin-bt", name: "BT HOD", x: 10, y: 640, w: 260, h: 130, type: "hod", description: "Head of Department - Biotechnology", department: "BT", image: "/apj-block-images/2nd-floor/HOD(BT).jpeg", directions: "Left column, HOD area.", tags: ["office", "hod", "BT HOD"] },
      { id: "staff-room-mid-2f", name: "STAFF ROOM", x: 10, y: 800, w: 230, h: 80, type: "staffroom", description: "Department staff room", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.27 PM.jpeg", directions: "Mid-left staff room.", tags: ["office"] },
      { id: "btl08", name: "BTL08", x: 10, y: 910, w: 220, h: 80, type: "lab", description: "Biotechnology Lab BTL08", department: "BT", capacity: 30, image: "/apj-block-images/2nd-floor/BTL08.jpeg", directions: "Biotech lab BTL08.", tags: ["lab", "bt", "8"] },
      { id: "btl07", name: "BTL07", x: 10, y: 1020, w: 220, h: 90, type: "lab", description: "Immunology Lab (BTL07)", department: "BT", capacity: 30, image: "/apj-block-images/2nd-floor/immunology lab(BTL07).jpeg", directions: "Biotech lab BTL07.", tags: ["lab", "bt", "7"] },
      { id: "btl10", name: "BTL10", x: 160, y: 1220, w: 160, h: 80, type: "utility", description: "Department Library (BTL10)", department: "BT", capacity: 10, image: "/apj-block-images/2nd-floor/research_lab(BTL10).jpeg", directions: "Bottom left corner library.", tags: ["library", "bt"] },

      // CENTER COLUMN
      { id: "stairs-1-2", name: "STAIRS", x: 400, y: 560, w: 220, h: 80, type: "utility", description: "Main building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "Upper center stairs.", tags: ["stairs"] },
      { id: "lift-2", name: "LIFT", x: 390, y: 740, w: 230, h: 80, type: "utility", description: "Building elevator", image: "https://placehold.co/400x220?text=Lift", directions: "Center lift area.", tags: ["lift"] },
      { id: "staff-room-vert-2f", name: "STAFF ROOM", x: 520, y: 970, w: 140, h: 200, type: "staffroom", description: "Vertical staff workspace", image: "/apj-block-images/2nd-floor/WhatsApp Image 2026-04-23 at 3.43.30 PM (1).jpeg", directions: "Lower center staff area.", tags: ["office"] },
      { id: "stairs-2-2f", name: "STAIRS", x: 460, y: 1280, w: 210, h: 80, type: "utility", description: "Secondary building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "Bottom center stairs.", tags: ["stairs"] },

      // RIGHT COLUMN
      { id: "lh-210", name: "LH210", x: 790, y: 430, w: 220, h: 80, type: "classroom", description: "Classroom LH210", capacity: 60, image: "/apj-block-images/2nd-floor/LH-210.jpeg", directions: "Right column classroom.", tags: ["class", "lh", "210"] },
      { id: "btl11", name: "BTL11", x: 760, y: 940, w: 220, h: 160, type: "lab", description: "Research Lab (BTL11)", department: "BT", capacity: 25, image: "/apj-block-images/2nd-floor/research_lab(BTL 11).jpeg", directions: "Right side research lab.", tags: ["lab", "bt", "research"] },
      { id: "metrology-lab", name: "METROLOGY LAB", x: 760, y: 1180, w: 220, h: 320, type: "lab", description: "Metrology and Measurement Lab", department: "Mechanical/BT", capacity: 50, image: "/apj-block-images/2nd-floor/Metrology_lab.jpeg", directions: "Bottom right large lab.", tags: ["lab", "metrology"] },

      // RIGHT OPEN CORRIDOR
      { id: "corridor-2", name: "", x: 960, y: 700, w: 320, h: 500, type: "corridor", clickable: false, description: "Open corridor zone.", image: "", directions: "TBD", tags: [] }
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
