# Framer Components Quick Reference

## Most Relevant Components for BEAM Education

### 🎯 Hero & Branding
- `hero-smallslogan` - Main hero text with top/bottom parts
- `hero-items` - Hero section with multiple items
- `message` - Standalone message component
- `stage` - Section headers with numbers

### 📊 Statistics & Numbers
- `our-num-round` - Animated circular stats
- `our-num-square` - Animated square stats
- `other` - Simple number display

### 👥 People & Team
- `persona-main` - Featured team member
- `persona-regular` - Regular team member
- `faces` - Team photos grid
- `teamshot` - Team group photo

### 📚 Content & Information
- `all-questions` - FAQ/accordion component
- `question-item` - Individual FAQ item
- `moment-regular` - Content moment
- `moment-long` - Extended content moment

### 🖼️ Gallery & Projects
- `projectlist` - Project showcase grid
- `project` - Individual project card
- `bannergallery` - Banner image gallery
- `gallery` - Image gallery

### 🎨 Interactive Elements
- `ticker` - Scrolling text ticker
- `button` - Main button component
- `button-for-form` - Form submit button
- `allproj-button` - Project button

### 📞 Contact & Forms
- `contacts` - Contact form
- `contacts-for-terms-privacy` - Legal contact info

### 🧭 Navigation
- `all-main-menu` - Main navigation menu
- `hamburger-icon` - Mobile menu icon
- `menu-item-top` - Top menu items

### 🦶 Footer
- `footer` - Main footer
- `menitem-footer` - Footer menu items

## Quick Usage Examples

### Hero Section
```tsx
<HeroSmallsloganFramerComponent.Responsive
  partTop="BEAM Education"
  partBottom="Empowering Communities"
/>
```

### Stats Display
```tsx
<OurNumRoundFramerComponent.Responsive
  end={2024}
  start={2020}
  header="Years of Excellence"
  speedMs={120}
  description="Building educational futures"
/>
```

### Team Member
```tsx
<PersonaMainFramerComponent.Responsive
  name1="Dr. Sarah Johnson"
  message="Leading innovation in education"
  occupation="Director of Programs"
/>
```

### FAQ Section
```tsx
<AllQuestionsFramerComponent.Responsive
  question="What programs do you offer?"
  answer="We offer comprehensive academic and social work programs..."
  question2Nd="How do I enroll?"
  answer2Nd="Enrollment is simple through our online portal..."
/>
```

### Call-to-Action
```tsx
<ButtonFramerComponent.Responsive
  link="/enroll"
  title="Enroll Now"
  variant="Dark"
  newTab={false}
/>
```

## Design Tokens for Education Theme

```css
/* Primary Colors */
--unframer-details-red: rgb(245, 51, 119);    /* Accent color */
--unframer-details-yellow: rgb(255, 217, 0);  /* Highlight color */
--unframer-white: rgb(255, 255, 255);         /* Background */
--unframer-black: rgb(0, 0, 0);              /* Text */

/* Supporting Colors */
--unframer-grey: rgb(130, 132, 135);         /* Secondary text */
--unframer-bg: rgb(241, 241, 241);           /* Light background */
--unframer-biege: rgb(241, 223, 194);        /* Warm accent */
```

## Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 959px  
- **Desktop**: 960px - 1199px
- **Large Desktop**: 1200px+

## Tips for Education Site
1. Use `hero-smallslogan` for clear value propositions
2. Leverage `our-num-round` for student success metrics
3. Implement `all-questions` for program FAQs
4. Use `persona-main` to highlight key faculty
5. Add `ticker` for dynamic announcements
6. Include `projectlist` to showcase student work
