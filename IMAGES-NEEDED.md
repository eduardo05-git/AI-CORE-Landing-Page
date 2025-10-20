# Missing Images - Action Required

## ⚠️ Images You Need to Add Before Going Live

The following image files are referenced in the HTML but are NOT included in this template package. You must create and add these files before deploying:

### 1. **Favicon** (Required)
- **Path**: `assets/images/favicon.ico`
- **Format**: .ico file (16x16, 32x32, 48x48 px)
- **Tool**: Use [favicon.io](https://favicon.io/) or [realfavicongenerator.net](https://realfavicongenerator.net/)
- **Used in**: All 7 HTML pages

### 2. **Apple Touch Icon** (Recommended)
- **Path**: `assets/images/apple-touch-icon.png`
- **Format**: PNG, 180x180 px
- **Purpose**: iOS home screen icon when users save your site
- **Used in**: `index.html`

### 3. **Open Graph Preview Image** (Fixed ✅)
- **Path**: `assets/images/previews/ai-core-og-1200x630.png`
- **Status**: Already generated and linked correctly
- **Purpose**: Social media sharing preview (Facebook, Twitter, LinkedIn)

---

## 📝 Why These Are Missing

These files are brand-specific and unique to YOUR business, so they cannot be pre-generated. You should create them using your own branding (logo, colors, company name).

---

## 🚀 Quick Fix Guide

### Option 1: Use a Placeholder (Testing Only)
For testing purposes, you can use a simple placeholder favicon:

1. Visit: https://favicon.io/favicon-generator/
2. Generate a simple icon with your initials or logo
3. Download and extract to `assets/images/`

### Option 2: Professional Design (Production)
1. Design a proper favicon that matches your brand
2. Use tools like Figma, Photoshop, or online generators
3. Export in multiple sizes:
   - favicon.ico (multi-size)
   - apple-touch-icon.png (180x180)

---

## ✅ Verification Checklist

After adding images, verify:
- [ ] `assets/images/favicon.ico` exists
- [ ] `assets/images/apple-touch-icon.png` exists
- [ ] Browser tab shows your favicon
- [ ] No 404 errors in browser console (F12 → Network tab)
- [ ] Social media preview looks correct (use https://metatags.io/)

---

## 🔧 Remove Favicon References (Alternative)

If you don't want to add these files, you can remove the references:

**In all HTML files**, remove these lines:
```html
<link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="assets/images/apple-touch-icon.png">
```

**Note**: Without a favicon, browsers will show a default icon, which looks unprofessional.
