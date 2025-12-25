
export const RARITY_CONFIG = {
  LEGENDARY: { rate: 0.01, color: "text-[#FFD700]", bg: "bg-[#FFD700]", border: "border-[#FFD700]", shadow: "shadow-[#FFD700]", sound: "legendary_drop" },
  EPIC: { rate: 0.06, color: "text-[#9400D3]", bg: "bg-[#9400D3]", border: "border-[#9400D3]", shadow: "shadow-[#9400D3]", sound: "epic_drop" },
  RARE: { rate: 0.13, color: "text-[#1E90FF]", bg: "bg-[#1E90FF]", border: "border-[#1E90FF]", shadow: "shadow-[#1E90FF]", sound: "rare_drop" },
  UNCOMMON: { rate: 0.25, color: "text-[#32CD32]", bg: "bg-[#32CD32]", border: "border-[#32CD32]", shadow: "shadow-[#32CD32]", sound: "common_drop" },
  COMMON: { rate: 0.55, color: "text-[#A9A9A9]", bg: "bg-[#A9A9A9]", border: "border-[#A9A9A9]", shadow: "shadow-[#A9A9A9]", sound: "common_drop" }
};

const createItem = (id, name, rarity, description, customImage) => {
  const imageUrl = customImage || `https://placehold.co/400x400/1e293b/FFF?text=${name.replace(/ /g, '+')}&font=roboto`;
  return {
    id,
    name,
    rarity,
    description,
    image: imageUrl,
    ...RARITY_CONFIG[rarity]
  };
};

const STANDARD_ITEMS_RAW = [
  createItem(1, "Quantum Core", "LEGENDARY", "The heart of a dying star, contained."),
  createItem(2, "Plasma Rifle", "EPIC", "High-energy military grade weapon."),
  createItem(3, "Cybernetic Arm", "EPIC", "Enhanced strength and dexterity."),
  createItem(4, "Neural Chip", "EPIC", "Boosts cognitive processing speed."),
  createItem(5, "Titanium Plating", "RARE", "Lightweight armor material."),
  createItem(6, "Laser Sight", "RARE", "Precision aiming module."),
  createItem(7, "Energy Cell", "RARE", "Compact power source."),
  createItem(8, "Hologram Projector", "RARE", "Creates lifelike decoys."),
  createItem(9, "Stealth Module", "RARE", "Bends light to hide the user."),
  createItem(10, "Steel Bolt", "UNCOMMON", "Heavy duty fastener."),
  createItem(11, "Wiring Kit", "UNCOMMON", "Assorted electrical wires."),
  createItem(12, "Battery Pack", "UNCOMMON", "Standard rechargeable battery."),
  createItem(13, "Iron Gear", "UNCOMMON", "Cog for machinery."),
  createItem(14, "Circuit Board", "UNCOMMON", "Basic logic board."),
  createItem(15, "Lens", "UNCOMMON", "Optical glass component."),
  createItem(16, "Rubber Grip", "UNCOMMON", "Non-slip handle material."),
  createItem(17, "Metal Sheet", "UNCOMMON", "Raw material for crafting."),
  createItem(18, "Copper Wire", "UNCOMMON", "Conductive material."),
  createItem(19, "Glass Panel", "UNCOMMON", "Reinforced display glass."),
  createItem(20, "Scrap Metal", "COMMON", "Useless junk."),
  createItem(21, "Rusty Screw", "COMMON", "Might strip if used."),
  createItem(22, "Broken Chip", "COMMON", "Fried electronics."),
  createItem(23, "Plastic Casing", "COMMON", "Cracked shell."),
  createItem(24, "Old Cable", "COMMON", "Frayed and dangerous."),
  createItem(25, "Dusty Fan", "COMMON", "Barely spins."),
  createItem(26, "Cracked Screen", "COMMON", "Glitchy display."),
  createItem(27, "Loose Nut", "COMMON", "Found on the floor."),
  createItem(28, "Empty Can", "COMMON", "Recyclable."),
  createItem(29, "Burnt Fuse", "COMMON", "Needs replacing."),
  createItem(30, "Paper Scraps", "COMMON", "Old blueprints."),
  createItem(31, "Oil Leak", "COMMON", "Slippery mess."),
  createItem(32, "Tiny Spring", "COMMON", "Bounces away easily."),
  createItem(33, "Washer", "COMMON", "Spacer ring."),
  createItem(34, "Broken Key", "COMMON", "Opens nothing."),
  createItem(35, "Sticker", "COMMON", "Cyber brand logo."),
  createItem(36, "Tape", "COMMON", "Sticky fix."),
  createItem(37, "Glue", "COMMON", "Industrial adhesive."),
  createItem(38, "Nail", "COMMON", "Sharp point."),
  createItem(39, "Dirt", "COMMON", "Just dirt."),
  createItem(40, "Rock", "COMMON", "A small stone.")
];

export const STANDARD_ITEMS = STANDARD_ITEMS_RAW.map(item => ({ ...item, source: 'standard' }));

const DRAGON_ITEMS_RAW = [
  createItem(101, "Heart of Bahamut", "LEGENDARY", "Pulsating with ancient magic."),
  createItem(102, "Dragon Slayer", "EPIC", "Sword bathed in dragon blood."),
  createItem(103, "Wyvern Egg", "EPIC", "Warm to the touch."),
  createItem(104, "Ancient Scroll", "EPIC", "Contains forbidden spells."),
  createItem(105, "Fire Scale", "RARE", "Hot to hold."),
  createItem(106, "Dragon Claw", "RARE", "Razor sharp material."),
  createItem(107, "Mystic Gem", "RARE", "Glowing with mana."),
  createItem(108, "Obsidian Shield", "RARE", "Volcanic glass protection."),
  createItem(109, "Phoenix Feather", "RARE", "Revives hope."),
  createItem(110, "Iron Sword", "UNCOMMON", "Standard soldier issue."),
  createItem(111, "Leather Armor", "UNCOMMON", "Flexible protection."),
  createItem(112, "Health Potion", "UNCOMMON", "Red liquid."),
  createItem(113, "Mana Potion", "UNCOMMON", "Blue liquid."),
  createItem(114, "Wooden Bow", "UNCOMMON", "Simple ranged weapon."),
  createItem(115, "Arrow Quiver", "UNCOMMON", "Holds 20 arrows."),
  createItem(116, "Steel Helmet", "UNCOMMON", "Protects the head."),
  createItem(117, "Boots of Speed", "UNCOMMON", "Walk slightly faster."),
  createItem(118, "Magic Ring", "UNCOMMON", "Faintly glowing."),
  createItem(119, "Amulet", "UNCOMMON", "Wards off bad luck."),
  createItem(120, "Goblin Tooth", "COMMON", "Yellow and gross."),
  createItem(121, "Slime Gel", "COMMON", "Sticky residue."),
  createItem(122, "Broken Shield", "COMMON", "Splintered wood."),
  createItem(123, "Rusty Dagger", "COMMON", "Needs sharpening."),
  createItem(124, "Bone", "COMMON", "Unknown origin."),
  createItem(125, "Stone", "COMMON", "Heavy rock."),
  createItem(126, "Stick", "COMMON", "It's a stick."),
  createItem(127, "Leaf", "COMMON", "Green foliage."),
  createItem(128, "Dirt Clod", "COMMON", "Earthy."),
  createItem(129, "Pebble", "COMMON", "Smooth stone."),
  createItem(130, "Weed", "COMMON", "Useless plant."),
  createItem(131, "Mud", "COMMON", "Wet dirt."),
  createItem(132, "Ash", "COMMON", "Remains of a fire."),
  createItem(133, "Coal", "COMMON", "Fuel source."),
  createItem(134, "String", "COMMON", "Piece of twine."),
  createItem(135, "Cloth Rag", "COMMON", "Torn fabric."),
  createItem(136, "Empty Bottle", "COMMON", "Glass container."),
  createItem(137, "Rotten Meat", "COMMON", "Don't eat this."),
  createItem(138, "Old Shoe", "COMMON", "Missing the other one."),
  createItem(139, "Fish Bone", "COMMON", "Leftovers."),
  createItem(140, "Sand", "COMMON", "Grains of earth.")
];

export const DRAGON_ITEMS = DRAGON_ITEMS_RAW.map(item => ({ ...item, source: 'dragon' }));
