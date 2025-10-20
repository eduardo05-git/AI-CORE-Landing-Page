# Installation Guide

This guide will help you install and set up the AI-CORE Landing Page Template.

## 📦 Download & Setup

### Option 1: Direct Download
1. Download the template files from ThemeForest
2. Extract the ZIP file to your desired location
3. Open `index.html` in your browser to preview

### Option 2: Git Clone
Clone your fork or local repo and open the folder in your editor of choice.

## 🚀 Quick Start

### Local Development
1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. Optional: install dev dependency for a simple local server
   - Run: npm install

3. Start local server
   - Run: npm start
   - This will start a local server at http://localhost:3000

### Manual Setup
1. Open `index.html` directly in your browser
2. Make changes to the files as needed
3. Refresh the browser to see updates

## 🔧 Customization

### 1. Basic Customization

#### Change Colors
Edit `assets/style.css` (then minify for production):
```css
:root {
    --color-primary-accent: #your-color;    /* Main accent color */
    --color-dark-bg: #your-bg-color;      /* Background color */
}
```

After editing, minify:
```bash
npx clean-css-cli assets/style.css -o assets/style.min.css
```

#### Update Content
- **Hero Text**: Edit `assets/main.js` (line ~400, look for startTypingEffect fullText)
- **Features**: Modify feature cards in `index.html`
- **Pricing**: Update prices and plans
- **Company Info**: Change logo and contact details
- **Integration Logos**: Replace SVG files in `assets/images/`

After editing JavaScript, minify:
```bash
npx terser assets/main.js -o assets/main.min.js --compress --mangle
```

#### Replace/Add Images
**Required (see IMAGES-NEEDED.md for details)**:
- `assets/images/favicon.ico` - Browser icon (16x16, 32x32, 48x48px) ⚠️
- `assets/images/apple-touch-icon.png` - iOS icon (180x180px) ⚠️

**Already included**:
- `assets/images/previews/` - 5 auto-generated preview images ✅
- `assets/images/*.svg` - 6 integration partner logos ✅

### 2. Advanced Customization

#### Add New Sections
1. Create HTML structure in `index.html` (or other pages)
2. Add corresponding CSS in `assets/style.css`
3. Add JavaScript functionality in `assets/main.js`
4. Minify both files before deployment

#### Modify Animations
Edit animation properties in `assets/style.css`:
```css
.hidden-element {
    transition: opacity 3s cubic-bezier(0.2, 1, 0.3, 1);
}
```

Then minify the CSS for production.

#### Customize Typography
Update Google Fonts import in `index.html` (and all other HTML pages):
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

#### Generate Preview Images
Regenerate preview images if you make design changes:
```bash
# Install dependencies first
npm install

# Generate screenshots (requires Node.js and Puppeteer)
node tools/generate-previews.mjs

# Create main collage (Windows PowerShell)
.\tools\create-main-preview.ps1
```

## 🌐 Deployment

### Pre-Deployment Checklist
Before deploying, ensure:
- ✅ All HTML pages use minified assets (`.min.css` and `.min.js`)
- ✅ Favicon and apple-touch-icon added (see `IMAGES-NEEDED.md`)
- ✅ Privacy policy and terms updated with your actual content
- ✅ Contact emails changed from placeholders
- ✅ No console errors when testing locally
- ✅ All forms tested and working
- ✅ Mobile responsiveness verified

### Static Hosting (Recommended)

#### Netlify
1. Drag and drop your folder to [netlify.com](https://netlify.com)
2. Your site will be live instantly
3. Custom domain available

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

#### GitHub Pages
1. Create a GitHub repository
2. Upload your files
3. Enable Pages in repository settings
4. Your site will be at `username.github.io/repository-name`

### Traditional Hosting
1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Test all functionality

## 🔍 Testing

### Browser Testing
Test your site in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Device Testing
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

### Performance Testing
- Use Google PageSpeed Insights
- Test with GTmetrix
- Check Core Web Vitals

## 🐛 Troubleshooting

### Common Issues

#### Fonts Not Loading
- Check internet connection
- Verify Google Fonts URL
- Clear browser cache

#### Animations Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify CSS transitions are supported

#### Form Not Submitting
- Update form action URL
- Check form validation
- Test with different email addresses

#### Images Not Displaying
- Check file paths
- Ensure images exist
- Verify file permissions

### Debug Mode
Add this to your HTML for debugging:
```html
<script>
console.log('AI-CORE Template loaded successfully');
</script>
```

## 📞 Support

### Documentation
- [README.md](README.md) - Overview and features
- [STYLE-GUIDE.md](STYLE-GUIDE.md) - Design system
- [CHANGELOG.md](CHANGELOG.md) - Version history

### Getting Help
- Check the documentation first
- Search for similar issues
- Contact support with specific details

### Reporting Bugs
When reporting bugs, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🔄 Updates

### Checking for Updates
- Visit the ThemeForest item page
- Check the changelog
- Download new versions

### Updating Your Site
1. Backup your current files
2. Download the new version
3. Compare changes
4. Apply your customizations
5. Test thoroughly

## 📋 Checklist

Before going live, ensure:
- [ ] All images are optimized
- [ ] Forms are working correctly
- [ ] Site is responsive on all devices
- [ ] SEO meta tags are updated
- [ ] Contact information is correct
- [ ] Legal pages are added (Privacy Policy, Terms)
- [ ] Analytics tracking is implemented
- [ ] Site speed is optimized
- [ ] Cross-browser compatibility is tested

## 🎯 Next Steps

After installation:
1. Customize the design
2. Add your content
3. Set up analytics
4. Configure forms
5. Test thoroughly
6. Deploy to production
7. Monitor performance

---

**Need help?** Check our [documentation](README.md) or contact support.



