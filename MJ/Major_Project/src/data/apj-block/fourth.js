import { IMG_BASE_URL } from '../../config';

export const fourth = {
  buildingName: "APJ-BLOCK",
  label: "Fourth Floor",
  viewWidth: 1280,
  viewHeight: 1540,
  mainWidth: 960,
  bulgeWidth: 320,
  bulgeHeight: 500,
  rooms: [
    { id: "staff-room-top-left", name: "STAFF ROOM (CSE)", x: 70, y: 70, w: 180, h: 100, type: "staffroom", description: "CSE Staff workspace", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/sr1.jpeg`, directions: "Top left corner area.", tags: ["staff", "office", "cse"] },
    { id: "csl-06", name: "CSL 06", x: 70, y: 220, w: 180, h: 90, type: "lab", description: "Computer Science Lab 06", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl06.jpeg`, directions: "Left side, upper middle.", tags: ["lab", "cse", "csl06"] },
    { id: "csl-05", name: "CSL 05", x: 70, y: 360, w: 180, h: 90, type: "lab", description: "Computer Science Lab 05", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl05.jpeg`, directions: "Left side middle.", tags: ["lab", "cse", "csl05"] },
    { id: "washroom-4", name: "WASHROOM", x: 70, y: 500, w: 220, h: 180, type: "utility", description: "Restroom facilities", image: "https://placehold.co/600x400?text=Washroom", directions: "Left side middle.", tags: ["toilet"] },
    { id: "cse-hod-cabin", name: "CSE HOD CABIN", x: 70, y: 730, w: 200, h: 180, type: "office", description: "Head of Department - CSE", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/hod-cse.jpeg`, directions: "Left side middle.", tags: ["hod", "office", "cse"] },
    { id: "csl-03", name: "CSL 03", x: 70, y: 1040, w: 180, h: 90, type: "lab", description: "Computer Science Lab 03", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl03.jpeg`, directions: "Left side, lower middle.", tags: ["lab", "cse", "csl03"] },
    { id: "csl-04", name: "CSL 04", x: 70, y: 1200, w: 180, h: 90, type: "lab", description: "Computer Science Lab 04", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl04.jpeg`, directions: "Bottom left corner area.", tags: ["lab", "cse", "csl04"] },
    { id: "isl-04", name: "ISL 04", x: 70, y: 1390, w: 180, h: 90, type: "lab", description: "Information Science Lab 04", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/isl04.jpeg`, directions: "Bottom left corner.", tags: ["lab", "ise", "isl04"] },
    { id: "csl-07", name: "CSL 07", x: 720, y: 70, w: 180, h: 90, type: "lab", description: "Computer Science Lab 07", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl07.jpeg`, directions: "Top right corner.", tags: ["lab", "cse", "csl07"] },
    { id: "isl-03", name: "ISL 03", x: 720, y: 220, w: 180, h: 90, type: "lab", description: "Information Science Lab 03", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/isl03.jpeg`, directions: "Right side, upper middle.", tags: ["lab", "ise", "isl03"] },
    { id: "isl-02", name: "ISL 02", x: 720, y: 360, w: 180, h: 90, type: "lab", description: "Information Science Lab 02", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/isl02.jpeg`, directions: "Right side middle.", tags: ["lab", "ise", "isl02"] },
    { id: "isl-01", name: "ISL 01", x: 720, y: 1040, w: 180, h: 90, type: "lab", description: "Information Science Lab 01", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/isl01.jpeg`, directions: "Right side, lower middle.", tags: ["lab", "ise", "isl01"] },
    { id: "csl-02", name: "CSL 02", x: 720, y: 1200, w: 180, h: 90, type: "lab", description: "Computer Science Lab 02", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl02.jpeg`, directions: "Bottom right area.", tags: ["lab", "cse", "csl02"] },
    { id: "csl-01", name: "CSL 01", x: 720, y: 1390, w: 180, h: 90, type: "lab", description: "Computer Science Lab 01", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/csl01.jpeg`, directions: "Bottom right area.", tags: ["lab", "cse", "csl01"] },
    { id: "staff-room-top-center", name: "STAFF ROOM (CSE)", x: 350, y: 70, w: 320, h: 90, type: "staffroom", description: "Main CSE Staff Room", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/sr2.jpeg`, directions: "Top center area.", tags: ["staff", "office", "cse"] },
    { id: "staff-room-mid-left", name: "STAFF ROOM", x: 300, y: 220, w: 180, h: 90, type: "staffroom", description: "Staff workspace left", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/sr1.jpeg`, directions: "Upper center section.", tags: ["office"] },
    { id: "staff-room-mid-right", name: "STAFF ROOM", x: 500, y: 220, w: 180, h: 90, type: "staffroom", description: "Staff workspace right", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/sr2.jpeg`, directions: "Upper center section.", tags: ["office"] },
    { id: "stairs-top-4", name: "STAIRS-1", x: 420, y: 580, w: 180, h: 90, type: "utility", description: "Upper central stairs", image: "https://placehold.co/600x400?text=Stairs+1", directions: "Center area.", tags: ["stairs"] },
    { id: "lift-4", name: "LIFT", x: 420, y: 720, w: 180, h: 90, type: "utility", description: "Elevator", image: "https://placehold.co/600x400?text=Lift", directions: "Center area.", tags: ["lift"] },
    { id: "ups-room", name: "UPS ROOM", x: 300, y: 1040, w: 180, h: 90, type: "utility", description: "Power backup room", image: "https://placehold.co/600x400?text=UPS", directions: "Lower center area.", tags: ["power"] },
    { id: "server-room", name: "SERVER ROOM", x: 500, y: 1200, w: 180, h: 90, type: "utility", description: "Main server infrastructure", image: "https://placehold.co/600x400?text=Server", directions: "Lower center area.", tags: ["it"] },
    { id: "stairs-bottom-4", name: "STAIRS-2", x: 420, y: 1390, w: 180, h: 90, type: "utility", description: "Lower central stairs", image: "https://placehold.co/600x400?text=Stairs+2", directions: "Bottom center area.", tags: ["stairs"] }
  ],
  faculty: [
    { name: "DR. VENKATRAMANA BHAT P", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.32-pm.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. JYOTHI SHETTY", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.33-pm.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. SHABARI SHEDTHI B", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.33-pm-1.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. PALLAVI K N", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.33-pm-2.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. PRADEEP KANCHAN", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.34-pm.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. DESAI KARANAM SREEKANTHA", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.34-pm-1.jpeg`, roomId: "staff-room-top-center", department: "CSE" },
    { name: "DR. SANNIDHAN M S", image: `${IMG_BASE_URL}/apj-block-images/4th-floor/4th-floor-staff-room/whatsapp-image-2026-04-24-at-10.12.34-pm-2.jpeg`, roomId: "staff-room-top-center", department: "CSE" }
  ]
};

