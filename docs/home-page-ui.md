````md
# Homepage UI Plan

This document defines the complete structure, components, tokens, states, and responsive rules for building the homepage based on the provided Figma design.

---

## 1. Page Sections (Top-to-Bottom)

1. **Navbar**
2. **Hero Section**
   - Heading + description text
   - Search Form (location, dates, button)
   - Phone mockup illustration
3. **Brand Logos Strip**
4. **Top Places to Visit** (cards grid)
5. **App Promo Section**
6. **Recommended Travel Guides** (cards grid)
7. **Bottom Banner CTA**
8. **Footer**

---

## 2. Components (with subcomponents)

### ### Layout Components
- **`<Navbar />`**
  - Logo
  - Nav links
  - Right-side icons (if any)

- **`<Footer />`**
  - Logo
  - Navigation links
  - Social icons
  - Copyright text

---

### ### Hero & Search Components
- **`<Hero />`**
  - Section heading
  - Subtext
  - `<SearchForm />`
  - Right-side phone mockup illustration

- **`<SearchForm />`**
  - `<LocationInput />`
  - `<DateInput />` (pickup/drop-off)
  - `<SearchButton />`

- **`<LocationDropdown />`**
  - Search suggestions list
  - Row hover styles
  - Click → fills input & closes dropdown

- **`<Calendar />`**
  - Day grid
  - Month navigation
  - Hover & selected states
  - Range selection if needed

---

### ### Card Components
- **`<PlacesGrid />`**
  - Title: “Top places to visit”
  - 3-column card layout

- **`<PlaceCard />`**
  - City image
  - Title
  - Country name

---

### ### Promo & Guides Components
- **`<AppPromo />`**
  - Phone image(s)
  - Text + CTA button

- **`<TravelGuides />`**
  - Title
  - Grid of guide cards

- **`<GuideCard />`**
  - Thumbnail image
  - Category tag
  - Title
  - Short description
  - Read more link

---

### ### Bottom Banner
- **`<BottomBanner />`**
  - Large background
  - Center text
  - Button CTA

---

## 3. Design Tokens

Design values extracted visually from the Figma frame.  
(Replace hex codes with exact values from Inspect panel.)

---

### 🎨 Colors

```md
primary: #0A8A61
primaryHover: #06704F
textMain: #042521
textMuted: #647583
bgPage: #F5F7F6
bgCard: #FFFFFF
borderInput: #D8E3DF
borderLight: #E4ECEA
````

---

### 🔤 Typography

```md
fontFamily: "Inter", sans-serif

HeadingXL: 48px / 56px / 700
HeadingL: 32px / 40px / 700
HeadingM: 24px / 32px / 600

Body: 14px / 22px / 400
BodyMuted: 14px / 22px / 300

ButtonText: 14px / 18px / 600
Small: 12px / 16px / 400
```

---

### 🟦 Border Radius

```md
radiusCard: 24px
radiusInput: 12px
radiusButton: 16px
radiusFull: 9999px
```

---

### 🌫 Shadows

```md
shadowCard: 0 12px 40px rgba(0, 0, 0, 0.08)
shadowInputFocus: 0 0 0 3px rgba(10, 138, 97, 0.25)
```

---

## 4. Component Interaction States

### 🎛 Search Input (Location)

* **Default**

  * Border: `borderInput`
  * Text color: muted
* **Hover**

  * Border slightly darker
* **Focus**

  * Border: `primary`
  * Shadow: `shadowInputFocus`
  * Dropdown appears

---

### 📍 Location Dropdown

* White background
* Thin border
* List of suggestions
* **Row Hover:** light green background
* **Click:** sets text field → dropdown closes

---

### 📅 Date Picker (Calendar)

* Hovered day: light green tint
* Selected day: filled green circle with white text
* Disabled days (if any): greyed out
* Next/Prev month arrow icons

---

### 🔘 Primary Button

* Default: green background + white text
* Hover: darker green
* Active: green with inset shadow
* Disabled: opacity 50%, cursor not-allowed

---

## 5. Responsive Behaviour

### 📱 Mobile (< 768px)

* Hero stacks vertically:

  * Heading
  * Search form
  * Phone illustration
* Grids become **1-column**
* App promo stacks
* Footer stacks center-aligned
* Cards become full width

---

### 📟 Tablet (768px–1023px)

* Hero two-column but narrower
* Places grid becomes **2 columns**
* Guides grid becomes **2 columns**

---

### 🖥 Desktop (≥ 1024px)

* Full 2-column hero layout
* 3-column grids for Places & Guides
* Footer in three columns

---

## 6. Dummy Data

### 📍 Location Suggestions

```js
[
  "Las Vegas, USA",
  "New York, USA",
  "Los Angeles, USA",
  "Dubai, UAE",
  "London, UK",
  "Paris, France"
]
```

---

### 🗺 Top Places Cards

```js
[
  { title: "Las Vegas", country: "USA", image: "/images/las-vegas.jpg" },
  { title: "Dubai", country: "UAE", image: "/images/dubai.jpg" },
  { title: "Paris", country: "France", image: "/images/paris.jpg" },
  { title: "Istanbul", country: "Turkey", image: "/images/istanbul.jpg" },
  { title: "Singapore", country: "Singapore", image: "/images/singapore.jpg" },
  { title: "Bali", country: "Indonesia", image: "/images/bali.jpg" }
]
```

---

### 📚 Travel Guides Cards

```js
[
  {
    title: "Driving Around Nevada",
    category: "Guides",
    readTime: "5 min",
    image: "/images/guide1.jpg"
  },
  {
    title: "Exploring Dubai's Hidden Spots",
    category: "Travel Tips",
    readTime: "4 min",
    image: "/images/guide2.jpg"
  },
  {
    title: "Must-See Places in Singapore",
    category: "Guides",
    readTime: "6 min",
    image: "/images/guide3.jpg"
  }
]
```

