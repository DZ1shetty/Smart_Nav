export const first = {
    buildingName: "APJ-BLOCK",
    label: "First Floor",
    viewWidth: 1280,
    viewHeight: 1540,
    mainWidth: 960,
    bulgeWidth: 320,
    bulgeHeight: 500,
    rooms: [
      // TOP AREA
      { id: "ug-project-lab", name: "BTL05", x: 30, y: 50, w: 220, h: 220, type: "lab", description: "Undergraduate Project Laboratory", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.24 PM.jpeg", directions: "Top left corner.", tags: ["lab", "project", "ug", "BTL05"] },
      { id: "bio-info-lab", name: "BTL06", x: 350, y: 150, w: 320, h: 180, type: "lab", description: "Bioinformatics Laboratory", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.24 PM (1).jpeg", directions: "Top center area.", tags: ["lab", "bio", "BTL06"] },
      { id: "seminar-hall-1", name: "SEMINAR HALL", x: 740, y: 50, w: 180, h: 120, type: "hall", description: "Department Seminar Hall", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.25 PM.jpeg", directions: "Top right area.", tags: ["seminar", "hall"] },

      // LEFT COLUMN
      { id: "btl04", name: "BTL04", x: 30, y: 320, w: 200, h: 180, type: "lab", description: "Biotechnology Lab 04", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.15 PM.jpeg", directions: "Left side, upper middle.", tags: ["lab", "bt", "04"] },
      { id: "btl03", name: "BTL03", x: 30, y: 540, w: 200, h: 180, type: "lab", description: "Biotechnology Lab 03", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.14 PM (1).jpeg", directions: "Left side middle.", tags: ["lab", "bt", "03"] },
      { id: "washroom-1", name: "WASHROOM", x: 30, y: 760, w: 220, h: 60, type: "utility", description: "Restroom facilities", image: "https://placehold.co/600x400?text=Washroom", directions: "Left side middle.", tags: ["toilet"] },
      { id: "btl02", name: "BTL02", x: 30, y: 860, w: 220, h: 280, type: "lab", description: "Biotechnology Lab 02", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.23 PM (1).jpeg", directions: "Left side, lower middle.", tags: ["lab", "bt", "02"] },
      { id: "btl12", name: "BTL12", x: 30, y: 1180, w: 220, h: 320, type: "lab", description: "Biotechnology Lab 12", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.22 PM.jpeg", directions: "Bottom left corner.", tags: ["lab", "bt", "12"] },

      // CENTER
      { id: "stairs-1", name: "STAIRS-1", x: 420, y: 800, w: 160, h: 60, type: "utility", description: "Upper central stairs", image: "https://placehold.co/600x400?text=Stairs+1", directions: "Center area.", tags: ["stairs"] },
      { id: "lift-1", name: "LIFT", x: 420, y: 920, w: 160, h: 60, type: "utility", description: "Elevator", image: "https://placehold.co/600x400?text=Lift", directions: "Center area.", tags: ["lift"] },
      { id: "purchase-section", name: "PURCHASE SECTION", x: 250, y: 1100, w: 180, h: 60, fontSize: 20, type: "staffroom", description: "Purchase and Procurement Section", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.23 PM.jpeg", directions: "Lower center left.", tags: ["office", "purchase"] },
      { id: "rajesh-shetty", name: "DR.RAJESH SHETTY", x: 550, y: 1150, w: 180, h: 80, fontSize: 22, type: "hod", description: "Dr. Rajesh Shetty Office", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.20 PM (1).jpeg", directions: "Lower center right.", tags: ["office"] },

      // RIGHT / BULGE
      { id: "seminar-hall-2", name: "SEMINAR HALL", x: 740, y: 440, w: 160, h: 100, type: "hall", description: "Secondary Seminar Hall", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.25 PM.jpeg", directions: "Middle right area.", tags: ["seminar", "hall"] },
      { id: "shambavi-hall", name: "SHAMBAVI SEMINAR HALL", x: 1000, y: 620, w: 240, h: 110, type: "hall", description: "Shambavi Seminar Hall", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.20 PM.jpeg", directions: "Bulge section on the right.", tags: ["seminar", "hall"] },
      { id: "lh-110", name: "LH-110", x: 740, y: 1080, w: 160, h: 60, type: "classroom", description: "Lecture Hall 110", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.14 PM.jpeg", directions: "Lower right area.", tags: ["class", "lh", "110"] },
      { id: "lh-112", name: "LH-112", x: 740, y: 1350, w: 160, h: 60, type: "classroom", description: "Lecture Hall 112", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.20 PM (2).jpeg", directions: "Bottom right area.", tags: ["class", "lh", "112"] },

      // BOTTOM CENTER
      { id: "btl01", name: "BTL01", x: 220, y: 1470, w: 160, h: 70, type: "lab", description: "Biotechnology Lab 01", image: "/apj-block-images/1st-floor/WhatsApp Image 2026-04-27 at 3.04.21 PM.jpeg", directions: "Bottom center left.", tags: ["lab", "bt", "01"] },
      { id: "stairs-2", name: "STAIRS-2", x: 450, y: 1470, w: 160, h: 70, type: "utility", description: "Lower central stairs", image: "https://placehold.co/600x400?text=Stairs+2", directions: "Bottom center right.", tags: ["stairs"] }
    ],
    faculty: [
      { name: "DR. K RAJESH SHETTY", image: "/apj-block-images/1st-floor/1st-floor staff room/WhatsApp Image 2026-04-24 at 9.59.08 PM.jpeg", roomId: "rajesh-shetty", department: "Admissions" }
    ]
};
