# AI-CORE Style Guide

This document outlines the design system, color palette, typography, and component guidelines for the AI-CORE Landing Page Template.

---

## 📦 New Features (Latest Version)

### Dark/Light Mode Toggle
- Smooth animated transition with overlay effect
- Theme preference saved in localStorage
- Theme toggle button in navbar with icon change

### Plan Comparison Table
- Interactive checkmarks with hover effects
- Glassmorphism styling
- Responsive horizontal scroll on mobile
- Animated state changes

### Integrations Section
- 6 partner logos (Zapier, Slack, Google Sheets, Salesforce, HubSpot, Microsoft Teams)
- SVG format for crisp display
- Hover animations with scale and rotation
- Flexible grid layout

### Particles.js Background
- Animated particle effects on hero section
- Performance-optimized
- Responsive and adapts to theme

---

## 🎨 Color Palette

### Primary Colors
```css
--color-primary-accent: #00bcd4;    /* Main accent color - Cyan */
--color-cta-button: #00bcd4;        /* CTA button color */
```

### Background Colors
```css
--color-dark-bg: #11141A;           /* Main background */
--color-medium-dark-bg: #1A1F29;    /* Section/card backgrounds */
```

### Text Colors
```css
--color-light-text: #F4F4F9;       /* Primary text */
--color-secondary-text: #B0B0B0;    /* Secondary text */
```

### Border Colors
```css
--color-border-dark: rgba(255, 255, 255, 0.1);     /* Subtle borders */
--color-glass-border: rgba(255, 255, 255, 0.18);  /* Glass effect borders */
```

## 🔤 Typography

### Font Families
- **Headings**: Poppins (600, 700)
- **Body Text**: Roboto (400, 500, 700)

### Font Sizes
```css
/* Headings */
h1: 1.8rem (28.8px)
h2: 3.5rem (56px) - Hero title
h3: 2.5rem (40px) - Section titles
h4: 1.5rem (24px) - Card titles

/* Body Text */
p: 1.1rem (17.6px) - Hero subtitle
p: 1rem (16px) - Regular text
small: 0.9rem (14.4px) - Footer text
```

### Line Heights
- **Headings**: 1.12
- **Body Text**: 1.6

## 🧩 Components

### Buttons

#### Primary Button
```css
.btn-primary {
    background: #00bcd4;
    color: #11141A;
    padding: 12px 25px;
    border-radius: 4px;
    font-weight: 700;
}
```

#### Secondary Button
```css
.btn-secondary {
    background: #11141A;
    color: #F4F4F9;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 25px;
    border-radius: 4px;
}
```

#### CTA Button (Header)
```css
.btn-cta {
    background: #1A1F29;
    color: #F4F4F9;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 25px;
    border-radius: 4px;
}
```

### Cards

#### Feature Cards
```css
.feature-card {
    background: #11141A;
    padding: 35px 25px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
```

#### Pricing Cards
```css
.card {
    background: #1A1F29;
    padding: 30px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

#### Most Popular Card
```css
.card.most-popular {
    border-color: #00bcd4;
    box-shadow: 0 0 25px rgba(0, 188, 212, 0.3);
}
```

### Form Elements

#### Input Fields
```css
input {
    background: #1A1F29;
    color: #F4F4F9;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 15px 14px;
    border-radius: 4px;
}
```

#### Error States
```css
input:invalid {
    border-color: #ff4444;
    box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.3);
}
```

## 🎭 Animations

### Transitions
- **Duration**: 0.3s (standard), 3s (progressive loading)
- **Easing**: cubic-bezier(0.2, 1, 0.3, 1)
- **Hover Effects**: translateY(-8px) + box-shadow increase

### Progressive Loading
```css
.hidden-element {
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 3s cubic-bezier(0.2, 1, 0.3, 1);
}
```

### Typing Effect
- **Speed**: 50ms per character
- **Highlight**: Cyan color for "Actionable Intelligence"

## 📐 Layout

### Grid Systems
- **Features**: CSS Grid with auto-fit columns
- **Pricing**: CSS Grid with minmax(300px, 1fr)
- **Responsive**: Mobile-first approach

### Spacing
- **Section Padding**: 80px vertical
- **Card Padding**: 30-35px
- **Element Margins**: 15-25px
- **Gap Between Elements**: 20-40px

### Container
- **Max Width**: 1200px
- **Padding**: 20px horizontal
- **Centered**: margin: 0 auto

## 📱 Responsive Breakpoints

### Mobile (320px - 767px)
- Single column layout
- Stacked navigation
- Full-width cards
- Reduced font sizes

### Tablet (768px - 1199px)
- Two-column features
- Horizontal navigation
- Medium-sized cards

### Desktop (1200px+)
- Multi-column layouts
- Full navigation
- Large cards with hover effects

## 🌟 Special Effects

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(25px);
border: 1px solid rgba(10, 207, 233, 0.4);
```

### Neon Glow
```css
box-shadow: 
    0 0 20px rgba(0, 188, 212, 0.3),
    0 0 50px rgba(21, 214, 240, 0.2);
```

### Rotating Border
- **Animation**: 16s linear infinite
- **Effect**: Rotating cyan border around hero section

## 🎯 Usage Guidelines

### Do's
- Use the defined color palette consistently
- Maintain proper contrast ratios
- Follow the spacing system
- Use semantic HTML elements
- Test on multiple devices

### Don'ts
- Don't use colors outside the palette
- Don't break the responsive grid
- Don't override accessibility features
- Don't remove ARIA labels
- Don't use inline styles

## 🔧 Customization

### File Locations
- **CSS**: `assets/style.css` (development), `assets/style.min.css` (production)
- **JavaScript**: `assets/main.js` (development), `assets/main.min.js` (production)
- **Images**: `assets/images/` (logos, icons, previews)

### Easy Customizations
1. **Colors**: Change CSS custom properties in `assets/style.css`
2. **Fonts**: Update Google Fonts imports in HTML files
3. **Content**: Edit HTML text content in each page
4. **Images**: Replace SVG logos and add favicon

### Advanced Customizations
1. **Layout**: Modify CSS Grid properties
2. **Animations**: Adjust transition timings and effects
3. **Effects**: Customize glassmorphism and particles.js
4. **JavaScript**: Add new interactive features in `assets/main.js`

### After Customization
Always minify files before deployment:
```bash
# Minify CSS
npx clean-css-cli assets/style.css -o assets/style.min.css

# Minify JavaScript
npx terser assets/main.js -o assets/main.min.js --compress --mangle
```

## 📊 Performance Considerations

### Current Optimizations
- ✅ Minified CSS and JavaScript (used in all 7 HTML pages)
- ✅ Optimized preview images
- ✅ Lazy loading for progressive enhancement
- ✅ Efficient CSS selectors
- ✅ Particles.js performance mode

### Optimization Tips
- Use CSS custom properties for theming
- Minimize external font weights
- Optimize images (WebP format recommended)
- Use efficient CSS selectors
- Minimize JavaScript operations

### Loading Strategy
- Progressive enhancement
- Critical CSS inlined where needed
- Non-critical assets loaded asynchronously
- Images lazy-loaded where appropriate
- Preload hints for fonts and critical resources

---

## 📝 Documentation Reference

For more information, see:
- **README.md** - Overview and quick start
- **INSTALLATION.md** - Detailed setup and deployment
- **IMAGES-NEEDED.md** - Required image assets
- **QA-REPORT.md** - Quality assurance and testing
- **CHANGELOG.md** - Version history

---

This style guide ensures consistency and helps maintain the high quality of the AI-CORE template across all customizations.



