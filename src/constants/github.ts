// Isometric tile dimensions (2:1 ratio)
const TILE_HALF_WIDTH = 8;
const TILE_QUARTER_HEIGHT = 4;

// Number of non-zero contribution levels (1-10); level 0 is "no contributions"
const LEVEL_COUNT = 10;

// Cube wall heights per contribution level (0-10), same overall max height as the old 0-4 scale
const WALL_HEIGHTS = [0, 1.6, 3.2, 4.8, 6.4, 8, 9.6, 11.2, 12.8, 14.4, 16] as const;

// [top face, right wall, left wall] per level (0-10)
const DARK_PALETTE: [string, string, string][] = [
	["#1e1e1e", "#181818", "#111111"],
	["#3a3a3a", "#2e2e2e", "#222222"],
	["#494949", "#3a3a3a", "#2a2a2a"],
	["#585858", "#454545", "#333333"],
	["#676767", "#515151", "#3b3b3b"],
	["#767676", "#5c5c5c", "#444444"],
	["#848484", "#686868", "#4c4c4c"],
	["#939393", "#737373", "#555555"],
	["#a2a2a2", "#7f7f7f", "#5d5d5d"],
	["#b1b1b1", "#8a8a8a", "#666666"],
	["#c0c0c0", "#969696", "#6e6e6e"],
];

const LIGHT_PALETTE: [string, string, string][] = [
	["#e8e8e8", "#d2d2d2", "#bcbcbc"],
	["#c0c0c0", "#a8a8a8", "#929292"],
	["#afafaf", "#999999", "#858585"],
	["#9f9f9f", "#8a8a8a", "#787878"],
	["#8e8e8e", "#7c7c7c", "#6b6b6b"],
	["#7d7d7d", "#6d6d6d", "#5e5e5e"],
	["#6d6d6d", "#5e5e5e", "#505050"],
	["#5c5c5c", "#4f4f4f", "#434343"],
	["#4b4b4b", "#414141", "#363636"],
	["#3b3b3b", "#323232", "#292929"],
	["#2a2a2a", "#232323", "#1c1c1c"],
];

const DARK_STROKE = "rgba(255,255,255,0.08)";
const LIGHT_STROKE = "rgba(0,0,0,0.07)";
const STROKE_WIDTH = "0.2";

// Grid layout
const GRID_PADDING = 20;
const GRID_ROWS = 7;

// Shared label font
const LABEL_FONT_FAMILY = "var(--font-geist-mono), monospace";

// Total count label
const TOTAL_LABEL_Y = 70;
const TOTAL_LABEL_FONT_SIZE = 48;
const TOTAL_LABEL_FONT_WEIGHT = "800";
const TOTAL_LABEL_FILL = "var(--color-foreground)";
const TOTAL_LABEL_OPACITY = 0.88;

// Sub-label ("CONTRIBUTIONS · year")
const SUBLABEL_Y = 86;
const SUBLABEL_FONT_SIZE = 8;
const SUBLABEL_FONT_WEIGHT = "500";
const SUBLABEL_OPACITY = 0.45;
const SUBLABEL_LETTER_SPACING = 3;

// Tooltip positioning
const TOOLTIP_OFFSET_X = 12;
const TOOLTIP_OFFSET_Y = 52;

export {
	DARK_PALETTE,
	DARK_STROKE,
	GRID_PADDING,
	GRID_ROWS,
	LABEL_FONT_FAMILY,
	LEVEL_COUNT,
	LIGHT_PALETTE,
	LIGHT_STROKE,
	STROKE_WIDTH,
	SUBLABEL_FONT_SIZE,
	SUBLABEL_FONT_WEIGHT,
	SUBLABEL_LETTER_SPACING,
	SUBLABEL_OPACITY,
	SUBLABEL_Y,
	TILE_HALF_WIDTH,
	TILE_QUARTER_HEIGHT,
	TOOLTIP_OFFSET_X,
	TOOLTIP_OFFSET_Y,
	TOTAL_LABEL_FILL,
	TOTAL_LABEL_FONT_SIZE,
	TOTAL_LABEL_FONT_WEIGHT,
	TOTAL_LABEL_OPACITY,
	TOTAL_LABEL_Y,
	WALL_HEIGHTS,
};
