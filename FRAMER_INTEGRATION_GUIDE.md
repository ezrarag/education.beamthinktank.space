# Framer Components Integration Guide

## Overview

The Unframer command has successfully downloaded all React components from your Framer template with full TypeScript support. This guide explains how to use these components in your BEAM Education project.

## What Was Generated

### Components Available
The following components are now available in the `framer/` folder:

- **Navigation & UI**: `button`, `all-main-menu`, `hamburger-icon`, `menu-item-top`
- **Hero Sections**: `hero-smallslogan`, `hero-items`
- **Content**: `message`, `stage`, `moment-regular`, `moment-long`
- **Interactive**: `ticker`, `all-questions`, `question-item`
- **Gallery**: `bannergallery`, `gallery`, `projectlist`, `project`
- **People**: `persona-main`, `persona-regular`, `faces`, `teamshot`
- **Stats**: `our-num-round`, `our-num-square`, `other`
- **Forms**: `button-for-form`, `contacts`
- **Footer**: `footer`, `menitem-footer`
- **And many more...**

### Key Features

1. **Full TypeScript Support**: All components have proper type definitions
2. **Responsive Design**: Each component has a `.Responsive` variant
3. **Framer Variables**: All Framer variables are available as React props
4. **Design Tokens**: CSS variables for consistent styling
5. **Animations**: MotionOne animations included

## How to Use Components

### Basic Usage

```tsx
import ButtonFramerComponent from '../framer/button';
import HeroSmallsloganFramerComponent from '../framer/hero-smallslogan';

// Use the Responsive variant for automatic breakpoint handling
<ButtonFramerComponent.Responsive
  link="/contact"
  title="Get Started"
  newTab={false}
  smoothScroll={true}
  variant="White - Big email"
/>

<HeroSmallsloganFramerComponent.Responsive
  partTop="We Craft Education"
  partBottom="Since 2024"
/>
```

**Note**: The Framer styles are automatically imported globally through `app/globals.css`, so you don't need to import them in individual components.

### Available Props

Each component has specific props based on the Framer variables. For example:

**Button Component Props:**
- `variant`: 'Trans' | 'White - Big email' | 'White - Big simplelink' | 'Trans - Big' | 'Dark' | 'Remix' | 'Real' | 'Astra'
- `title`: string
- `link`: string
- `newTab`: boolean
- `smoothScroll`: boolean
- `click`: Function

**Hero Component Props:**
- `partTop`: string
- `partBottom`: string

### Styling

You can pass custom styles using the `style` or `className` props:

```tsx
<ButtonFramerComponent.Responsive
  className="my-custom-class"
  style={{ marginTop: '20px' }}
  title="Custom Button"
/>
```

## Design Tokens

The generated CSS includes Framer design tokens as CSS variables:

```css
:root {
  --unframer-details-red: rgb(245, 51, 119);
  --unframer-details-yellow: rgb(255, 217, 0);
  --unframer-white: rgb(255, 255, 255);
  --unframer-grey: rgb(130, 132, 135);
  --unframer-black: rgb(0, 0, 0);
  --unframer-bg: rgb(241, 241, 241);
  /* ... and many more */
}
```

You can use these in your Tailwind classes:

```tsx
<div className="bg-[var(--unframer-details-red)] text-[var(--unframer-white)]">
  Custom styled content
</div>
```

## Responsive Breakpoints

The components support these breakpoints:
- **Base**: 0px - 319px
- **Small**: 320px - 767px
- **Medium**: 768px - 959px
- **Large**: 960px - 1199px
- **Extra Large**: 1200px - 1535px
- **2 Extra Large**: 1536px+

## Integration Examples

### 1. Hero Section
```tsx
import HeroSmallsloganFramerComponent from '../framer/hero-smallslogan';
import ButtonFramerComponent from '../framer/button';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <HeroSmallsloganFramerComponent.Responsive
          partTop="BEAM Education"
          partBottom="Empowering Communities"
        />
        <ButtonFramerComponent.Responsive
          link="/programs"
          title="Explore Programs"
          variant="Dark"
        />
      </div>
    </section>
  );
}
```

### 2. Stats Section
```tsx
import OurNumRoundFramerComponent from '../framer/our-num-round';
import OurNumSquareFramerComponent from '../framer/our-num-square';

export function StatsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <OurNumRoundFramerComponent.Responsive
          end={2024}
          start={2020}
          header="Years of Experience"
          speedMs={120}
          description="Building educational excellence"
        />
        <OurNumSquareFramerComponent.Responsive
          end={500}
          start={0}
          header="Students Served"
          speedMs={10}
          description="Transforming lives through education"
        />
      </div>
    </section>
  );
}
```

### 3. Contact Form
```tsx
import ButtonFramerComponent from '../framer/button-for-form';
import ContactsFramerComponent from '../framer/contacts';

export function ContactSection() {
  return (
    <section className="py-20">
      <ContactsFramerComponent.Responsive />
      <ButtonFramerComponent.Responsive
        title="Send Message"
        variant="Dark"
      />
    </section>
  );
}
```

## Updating Components

When you make changes in Framer:

1. **Publish** your changes in Framer
2. **Run the command again**:
   ```bash
   npx unframer@latest 4b106605c55c3c39
   ```
3. **Don't edit the generated files manually** - they will be overwritten

## Best Practices

1. **Always use the `.Responsive` variant** for automatic breakpoint handling
2. **Styles are imported globally** through `app/globals.css` - no need to import in components
3. **Use TypeScript** for better development experience
4. **Test on different screen sizes** to ensure responsive behavior
5. **Keep Framer and your codebase in sync** by running the command after changes

## Troubleshooting

### Common Issues

1. **Styles not loading**: Make sure `framer/styles.css` is imported in your layout
2. **TypeScript errors**: The components have full type support, check your prop types
3. **Responsive issues**: Use the `.Responsive` variant and test on different devices
4. **Animation problems**: Ensure `@motionone/dom` is installed

### Getting Help

- Check the [Unframer GitHub repository](https://github.com/remorses/unframer)
- Review the generated component files for prop definitions
- Test components in isolation before integrating

## Next Steps

1. **Explore the components** in the `framer/` folder
2. **Create a test page** to try different components
3. **Integrate components** into your existing pages
4. **Customize the design** using the available props and CSS variables
5. **Maintain consistency** by using the design tokens

The Framer components are now ready to use and will help you create a beautiful, consistent design that matches your Framer template!
