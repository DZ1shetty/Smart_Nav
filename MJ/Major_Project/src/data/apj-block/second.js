import { IMG_BASE_URL } from '../../config';

export const second = {
  buildingName: "APJ-BLOCK",
  label: "Second Floor",
  viewWidth: 1280,
  viewHeight: 1540,
  mainWidth: 960,
  bulgeWidth: 320,
  bulgeHeight: 500,
  rooms: [
    { id: "lh-211", name: "LH-211", x: 30, y: 50, w: 220, h: 80, type: "classroom", description: "Lecture Hall 211", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/lh-211.jpeg`, directions: "Top left corner area.", tags: ["classroom", "lh211"] },
    { id: "staff-room-top", name: "STAFF ROOM (BT)", x: 320, y: 50, w: 320, h: 80, type: "staffroom", description: "Biotechnology Staff Room", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/hodbt.jpeg`, directions: "Top center area.", tags: ["staff", "office", "bt"] },
    { id: "lh-212", name: "LH-212", x: 710, y: 50, w: 220, h: 80, type: "classroom", description: "Lecture Hall 212", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/lh-212.jpeg`, directions: "Top right corner area.", tags: ["classroom", "lh212"] },
    { id: "btl09", name: "BTL09", x: 30, y: 250, w: 220, h: 220, type: "lab", description: "Biotechnology Lab 09", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/bioprocessbtl09.jpeg`, directions: "Left side, upper middle.", tags: ["lab", "bt", "btl09"] },
    { id: "washroom-2", name: "WASHROOM", x: 30, y: 540, w: 220, h: 100, type: "utility", description: "Restroom facilities", image: "https://placehold.co/600x400?text=Washroom", directions: "Left side middle.", tags: ["toilet"] },
    { id: "hod-cabin-bt", name: "BT HOD CABIN", x: 30, y: 680, w: 220, h: 140, type: "staffroom", description: "Head of Department - BT", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/hodbt.jpeg`, directions: "Left side middle.", tags: ["hod", "office", "bt"] },
    { id: "btl08", name: "BTL08", x: 30, y: 1100, w: 220, h: 120, type: "lab", description: "Biotechnology Lab 08", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/btl08.jpeg`, directions: "Left side, lower middle.", tags: ["lab", "bt", "btl08"] },
    { id: "btl07", name: "BTL07", x: 30, y: 1250, w: 220, h: 100, type: "lab", description: "Biotechnology Lab 07", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/immunology-labbtl07.jpeg`, directions: "Bottom left area.", tags: ["lab", "bt", "btl07"] },
    { id: "btl10", x: 200, y: 1440, w: 160, h: 80, type: "lab", name: "BTL10", description: "Biotechnology Lab 10", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/research_labbtl10.jpeg`, directions: "Bottom center left area.", tags: ["lab", "bt", "btl10"] },
    { id: "stairs-1", name: "STAIRS-1", x: 420, y: 540, w: 160, h: 80, type: "utility", description: "Upper central stairs", image: "https://placehold.co/600x400?text=Stairs+1", directions: "Center area.", tags: ["stairs"] },
    { id: "lift-2", name: "LIFT", x: 420, y: 710, w: 160, h: 80, type: "utility", description: "Elevator", image: "https://placehold.co/600x400?text=Lift", directions: "Center area.", tags: ["lift"] },
    { id: "stairs-2", name: "STAIRS-2", x: 400, y: 1440, w: 160, h: 80, type: "utility", description: "Lower central stairs", image: "https://placehold.co/600x400?text=Stairs+2", directions: "Bottom center area.", tags: ["stairs"] },
    { id: "lh-210", name: "LH-210", x: 740, y: 390, w: 160, h: 80, type: "classroom", description: "Lecture Hall 210", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/lh-210.jpeg`, directions: "Middle right area.", tags: ["classroom", "lh210"] },
    { id: "btl11", name: "BTL11", x: 710, y: 1000, w: 220, h: 180, type: "lab", description: "Biotechnology Lab 11", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/research_labbtl-11.jpeg`, directions: "Lower right area.", tags: ["lab", "bt", "btl11"] },
    { id: "metrology-lab", name: "METROLOGY LAB", x: 680, y: 1200, w: 260, h: 320, type: "lab", description: "Metrology and Measurements Lab", image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/metrology_lab.jpeg`, directions: "Bottom right area.", tags: ["lab", "mechanical"] }
  ],
  faculty: [
    { 
      name: "DR. C. VAMAN RAO", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.31-pm.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. SMITHA HEGDE", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.31-pm-1.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. PARASHURAM S.", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.31-pm-2.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. VIDYA S. M.", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.32-pm-1.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. RAJALAKSHMI K.", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.32-pm-2.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. PRUTHVIK R.", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.32-pm.jpeg`, 
      roomId: "staff-room-top", 
      department: "Biotechnology" 
    },
    { 
      name: "DR. SHYAMA PRASAD S.", 
      image: `${IMG_BASE_URL}/apj-block-images/2nd-floor/2nd-floor-staff-room/whatsapp-image-2026-04-24-at-10.17.33-pm.jpeg`, 
      roomId: "hod-cabin-bt", 
      department: "Biotechnology" 
    }
  ]
};
