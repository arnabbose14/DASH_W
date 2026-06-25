export type VariableValue = string | number | boolean;

export interface GlobalVariables {
  [key: string]: VariableValue;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'image' | 'video';
  value: string; // Color code, gradient string, image path/URL, or video path/URL
  opacity: number; // 0 to 1
  blur: number; // in pixels
  overlayTint: string; // Hex color or rgba tint
  overlayOpacity: number; // 0 to 1
  focalPointX: number; // 0 to 100 (%)
  focalPointY: number; // 0 to 100 (%)
  cropMode: 'cover' | 'contain' | 'fill';
}

export interface LayoutConstraints {
  width: 'fill' | 'fit' | string; // e.g. "100%", "400px", "fill", "fit"
  height: 'fill' | 'fit' | string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  aspectRatio?: string; // e.g. "16/9", "1/1"
  // Flexbox/Grid specific properties for container elements
  direction?: 'row' | 'column';
  gap?: string; // e.g. "1rem" or "24cqmin"
  padding?: string; // e.g. "2rem" or "5cqmin"
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  wrap?: 'nowrap' | 'wrap';
  
  // Absolute positioning properties
  position?: 'absolute' | 'relative' | string;
  left?: string;
  top?: string;
  right?: string;
  bottom?: string;
}

export type ComponentType =
  // Content
  | 'hero'
  | 'headline'
  | 'paragraph'
  | 'quote'
  | 'section-divider'
  // Data
  | 'kpi'
  | 'bar-chart'
  | 'line-chart'
  | 'donut-chart'
  | 'comparison-chart'
  | 'heatmap'
  | 'timeline'
  | 'stat-grid'
  | 'dispersion-chart'
  | 'scatter-plot'
  | 'grouped-bar-chart'
  | 'venn-diagram'
  // Media
  | 'image'
  | 'video'
  | 'logo-strip'
  // Layout
  | 'stack'
  | 'grid'
  | 'columns'
  | 'container'
  | 'spacer';

export interface ComponentDefinition {
  id: string;
  type: ComponentType;
  // Binds keys of the component (like "label", "value", "title", "src") to a variable template
  // E.g. { "value": "{{revenue}}", "label": "Q4 revenue growth" }
  dataBindings: Record<string, string>;
  layout: LayoutConstraints;
  children?: ComponentDefinition[];
  // Static props for visual settings that aren't data-bound
  // e.g. chart axis, colors, chart grid counts, timeline alignment, col count
  localProps?: Record<string, any>;
}

export type MotionPreset = 'premium' | 'executive' | 'minimal' | 'energetic' | 'luxury';

export type SlideType =
  | 'hero'
  | 'kpi'
  | 'comparison'
  | 'chart'
  | 'timeline'
  | 'image-story'
  | 'quote'
  | 'cta'
  | 'custom';

export interface Slide {
  id: string;
  title: string;
  slideType: SlideType;
  motionPreset: MotionPreset;
  background: BackgroundConfig;
  components: ComponentDefinition[];
  speakerNotes?: string;
}

export interface PresentationTheme {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface Presentation {
  title: string;
  variables: GlobalVariables;
  slides: Slide[];
  theme: PresentationTheme;
}

export interface VenueProfile {
  id: '16_9' | '21_9' | '32_9' | 'led_wall' | 'portrait' | 'custom';
  label: string;
  ratio: number; // width / height
  width: number; // nominal width in pixels for scaling calculations
  height: number; // nominal height in pixels
}

export const VENUE_PROFILES: Record<string, VenueProfile> = {
  '16_9': { id: '16_9', label: '16:9 Standard Stage', ratio: 16 / 9, width: 1920, height: 1080 },
  '21_9': { id: '21_9', label: '21:9 Ultrawide Stage', ratio: 21 / 9, width: 2520, height: 1080 },
  '32_9': { id: '32_9', label: '32:9 Super Ultrawide Stage', ratio: 32 / 9, width: 3840, height: 1080 },
  'led_wall': { id: 'led_wall', label: 'Custom LED Wall (4:1)', ratio: 4 / 1, width: 4000, height: 1000 },
  'portrait': { id: 'portrait', label: 'Portrait Display (9:16)', ratio: 9 / 16, width: 1080, height: 1920 },
  'custom': { id: 'custom', label: 'Custom Canvas (3:2)', ratio: 3 / 2, width: 1800, height: 1200 },
};
