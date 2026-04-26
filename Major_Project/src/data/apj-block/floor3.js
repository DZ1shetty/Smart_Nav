export const floor3 = {
    buildingName: "APJ-BLOCK",
    label: "3rd Floor",
    viewWidth: 1100,
    viewHeight: 1450,
    mainWidth: 850,
    bulgeWidth: 250,
    bulgeHeight: 450,
    rooms: [
      // ROW 1: TOP SECTION
      { id: "lh-311", name: "LH-311", x: 70, y: 40, w: 220, h: 90, type: "classroom", description: "Classroom LH-311", capacity: 60, image: "/apj-block-images/3th-floor/LH-311.jpeg", directions: "Located at the top left corner of the 3rd floor.", tags: ["class", "lecture", "cr", "lh", "311"] },
      { id: "staff-room-top", name: "STAFF ROOM", x: 320, y: 40, w: 220, h: 90, type: "staffroom", description: "Main Staff Room", department: "General", capacity: 15, image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.29 PM (1).jpeg", directions: "Located at the top center of the 3rd floor.", tags: ["office", "staff"] },
      { id: "lh-312", name: "LH-312", x: 570, y: 40, w: 220, h: 90, type: "classroom", description: "Classroom LH-312", capacity: 60, image: "/apj-block-images/3th-floor/LH-312.jpeg", directions: "Located at the top right corner of the 3rd floor.", tags: ["class", "lecture", "cr", "lh", "312"] },

      // ROW 2: UPPER PAIR (Below Row 1)
      { id: "staff-room-mid-1", name: "STAFF ROOM", x: 310, y: 170, w: 110, h: 140, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.29 PM (2).jpeg", directions: "TBD", tags: ["office"] },
      { id: "staff-room-mid-2", name: "STAFF ROOM", x: 440, y: 170, w: 110, h: 140, type: "staffroom", description: "Staff workspace", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.29 PM (1).jpeg", directions: "TBD", tags: ["office"] },

      // ROW 3: STAGGERED LHs
      { id: "lh-309", name: "LH-309", x: 70, y: 340, w: 220, h: 90, type: "classroom", description: "Classroom LH-309", capacity: 60, image: "/apj-block-images/3th-floor/LH-309.jpeg", directions: "TBD", tags: ["class", "lecture", "cr", "lh", "309"] },
      { id: "lh-310", name: "LH-310", x: 570, y: 400, w: 220, h: 90, type: "classroom", description: "Classroom LH-310", capacity: 60, image: "/apj-block-images/3th-floor/LH-310.jpeg", directions: "TBD", tags: ["class", "lecture", "cr", "lh", "310"] },

      // ROW 4: WASHROOM & STAIRS-1
      { id: "washroom-3", name: "WASHROOM", x: 70, y: 480, w: 220, h: 100, type: "utility", description: "Restroom", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.31 PM (1).jpeg", directions: "TBD", tags: ["toilet", "restroom"] },
      { id: "stairs-top-3", name: "STAIRS-1", x: 320, y: 550, w: 220, h: 70, type: "utility", description: "Main building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "TBD", tags: ["stairs", "steps"] },

      // ROW 5: LADIES ROOM, LIFT, LH-308
      { id: "ladies-common-room", name: "LADIES ROOM", x: 70, y: 640, w: 220, h: 100, type: "utility", description: "Common room for ladies", image: "/apj-block-images/3th-floor/LADIES_ROOM.jpeg", directions: "TBD", tags: ["rest", "girls"] },
      { id: "lift-3", name: "LIFT", x: 320, y: 680, w: 220, h: 70, type: "utility", description: "Building elevator", image: "https://placehold.co/400x220?text=Lift", directions: "TBD", tags: ["lift", "elevator"] },
      { id: "lh-308", name: "LH-308", x: 570, y: 720, w: 220, h: 90, type: "classroom", description: "Classroom LH-308", capacity: 60, image: "/apj-block-images/3th-floor/LH-308.jpeg", directions: "TBD", tags: ["class", "lecture", "cr", "lh", "308"] },

      // ROW 6 & 7: E&C SECTION & LOWER PAIR
      { id: "ec-staff-room-1", name: "E&C STAFF ROOM", x: 320, y: 40, w: 240, h: 120, type: "staffroom", description: "Main ECE Staff Office", department: "ECE", capacity: 15, image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.44.13 PM.jpeg", directions: "Located at the top center of the 3rd floor, directly across from the main stairs.", tags: ["office", "staff", "ece"] },
      { id: "ec-staff-room-2", name: "E&C STAFF ROOM", x: 70, y: 960, w: 240, h: 120, type: "staffroom", description: "E&C Department Staff Room", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.28 PM.jpeg", directions: "Located at the bottom section, left side.", tags: ["office", "ec"] },
      
      { id: "staff-room-bot-1", name: "STAFF ROOM", x: 330, y: 920, w: 100, h: 150, type: "staffroom", description: "Department staff room", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.29 PM (1).jpeg", directions: "Located in the lower section, near the center.", tags: ["office"] },
      { id: "staff-room-bot-2", name: "STAFF ROOM", x: 450, y: 920, w: 100, h: 150, type: "staffroom", description: "Department staff room", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.29 PM (2).jpeg", directions: "Located in the lower section, near the center.", tags: ["office"] },

      { id: "lh-306", name: "LH-306", x: 570, y: 1040, w: 220, h: 90, type: "classroom", description: "Classroom LH-306", capacity: 60, image: "/apj-block-images/3th-floor/LH-306.jpeg", directions: "TBD", tags: ["class", "lecture", "cr", "lh", "306"] },

      // ROW 8: BOTTOM SECTION
      { id: "texas-instruments", name: "TEXAS INSTRUMENTS", x: 70, y: 1180, w: 240, h: 90, type: "lab", description: "Texas Instruments Innovation Lab", department: "E&C", image: "/apj-block-images/3th-floor/TEXAS.jpeg", directions: "TBD", tags: ["lab", "ec", "innovation", "embedded", "ti", "texas", "electronics"] },
      { id: "staff-room-bottom-left", name: "STAFF ROOM", x: 85, y: 1300, w: 220, h: 70, type: "staffroom", description: "Auxiliary staff room", image: "/apj-block-images/3th-floor/WhatsApp Image 2026-04-23 at 3.43.32 PM (1).jpeg", directions: "TBD", tags: ["office"] },
      { id: "stairs-bottom-3", name: "STAIRS-2", x: 330, y: 1300, w: 220, h: 70, type: "utility", description: "Secondary building staircase", image: "https://placehold.co/400x220?text=Stairs", directions: "TBD", tags: ["stairs", "steps"] },

      // RIGHT OPEN CORRIDOR (Inside the bulge area)
      { id: "corridor-3", name: "", x: 850, y: 500, w: 250, h: 450, type: "corridor", clickable: false, description: "Open corridor zone.", image: "", directions: "TBD", tags: [] }
    ],
    faculty: [
      { name: "DR. KARUNA PANDIT", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.54 PM (1).jpeg", roomId: "ec-staff-room-1", department: "ISE" },
      { name: "DR. ASHWINI K.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.54 PM (2).jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. BALASUBRAMANI R.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.54 PM.jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. ANUSHA R. SHARATH", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.55 PM (1).jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. SHUBHA B.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.55 PM.jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. ANISHA P. RODRIGUES", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.58 PM.jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. SHRIVIDYA G.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.59 PM (1).jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. RAJU K.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.14.59 PM.jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. PADMAVATHI K.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.00 PM (1).jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. MAMATHA GIRISH", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.00 PM (2).jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. SUDEEPA K. B.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.00 PM.jpeg", roomId: "ec-staff-room-1", department: "ECE" },
      { name: "DR. CHAITRA K.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.01 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "MRS. SOWMYA P.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.01 PM (2).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "MS. SHANKARI N.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.01 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. CHAITRA S. N.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.02 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "MR. VASUDEVA PAI", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.02 PM (2).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. DEVIDAS", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.02 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. ULLAL HARSHINI DEVI", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.03 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. SANTHOSH POOJARY", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.03 PM (2).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. KAVITHA S.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.03 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "MS. BHAVYA K.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.04 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. SNEHA NAYAK", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.04 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. VIJAYA MURARI T.", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.05 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "MS. RAMYA SHETTY", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.05 PM (2).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. RAJALAXMI HEGDE", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.05 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. CHARISHMA", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.06 PM (1).jpeg", roomId: "ec-staff-room-2", department: "ECE" },
      { name: "DR. NIJU RAJAN", image: "/apj-block-images/3th-floor/3rd-floor staff room/WhatsApp Image 2026-04-23 at 10.15.06 PM.jpeg", roomId: "ec-staff-room-2", department: "ECE" }
    ]
};
