# Vector — Image-Driven Testimonial Slider System

## Overview

Vector is a dynamic split-panel testimonial component that pairs high-impact portrait imagery with animated text content. Designed for agency portfolios, corporate sites, and high-end service showcases, it features smooth crossfade transitions, keyboard navigation, and a minimalist dark-mode aesthetic.

<img width="1920" height="965" alt="vector" src="https://github.com/user-attachments/assets/a7f463ff-9d92-4e88-85d1-e51f88fa957d" />

## Live Preview

[View Demo](https://lefajmofokeng.github.io/Vector)  

---

## Technical Architecture

### Core Technologies
- **Vanilla JavaScript** for state management and transitions
- **CSS Grid/Flexbox** for responsive split-panel layout
- **CSS Custom Properties** for theming and maintainability
- **Semantic HTML5** with ARIA attributes for accessibility
- **Font loading optimization** with preconnect and display swap

### Component Structure
```
vector/
├── index.html          # Semantic markup with ARIA labels
├── style.css           # CSS with variables, animations, responsive rules
├── script.js           # State management, transitions, event handling
└── README.md
```

### Data Flow Architecture
1. **Initialization**: JavaScript data array pre-renders images for performance
2. **State Management**: Current index determines active content
3. **Transition Sequence**: Text fades out → content updates → text fades in
4. **Animation Sync**: Image transitions coordinated with text animations

---

## Integration Guide

### Basic HTML Implementation
```html
<link rel="stylesheet" href="vector/style.css">
<script src="vector/script.js" defer></script>
```

### Framework Integration Patterns

#### React/Next.js
```jsx
import { useState, useEffect } from 'react';
import './vector.css';

export default function VectorComponent({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  return (
    <article className="showcase-module">
      {/* Custom React implementation matching Vector's DOM structure */}
    </article>
  );
}
```

#### Vue 3 Composition API
```vue
<template>
  <article class="showcase-module">
    <figure class="showcase-module__visual">
      <img 
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        :src="testimonial.image"
        :class="['showcase-module__image', { 'is-active': index === currentIndex }]"
        :alt="`Portrait of ${testimonial.name}`"
      />
    </figure>
    <!-- Content structure -->
  </article>
</template>

<script setup>
import { ref, watch } from 'vue';
import './vector.css';

const currentIndex = ref(0);
const testimonials = ref([/* Your data */]);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
};
</script>
```

#### WordPress Integration
1. Enqueue scripts in functions.php:
```php
function enqueue_vector_component() {
    wp_enqueue_style('vector-css', get_template_directory_uri() . '/components/vector/style.css');
    wp_enqueue_script('vector-js', get_template_directory_uri() . '/components/vector/script.js', array(), '1.0.0', true);
    wp_localize_script('vector-js', 'vectorData', array(
        'testimonials' => get_field('testimonials') // ACF field
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_vector_component');
```

2. Create template part:
```php
<div class="showcase-module">
    <!-- Dynamic PHP rendering -->
    <?php while(have_rows('testimonials')): the_row(); ?>
        <img src="<?php the_sub_field('image'); ?>" class="showcase-module__image" />
    <?php endwhile; ?>
</div>
```

---

## Advanced Customization

### Theming System Extension
Add to style.css:
```css
:root.vector-light {
    --color-bg-dark: #ffffff;
    --color-text-white: #0a0a0a;
    --color-text-gray: #666666;
    --color-accent: #2b26c7;
}

:root.vector-warm {
    --color-bg-dark: #1a1a1a;
    --color-text-white: #f5f5f5;
    --color-text-gray: #aaaaaa;
    --color-accent: #ff6b6b;
}
```

### Animation Configuration
Modify transition properties:
```css
:root {
    --transition-speed: 0.7s; /* Slower transitions */
    --easing: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Bounce effect */
}
```

### Adding Auto-advance Feature
Extend script.js:
```js
let autoAdvanceInterval;

function startAutoAdvance(interval = 5000) {
    autoAdvanceInterval = setInterval(() => {
        nextSlide();
    }, interval);
}

function stopAutoAdvance() {
    clearInterval(autoAdvanceInterval);
}

// Initialize with autoplay
document.addEventListener('DOMContentLoaded', () => {
    init();
    startAutoAdvance();
    
    // Pause on hover
    document.getElementById('testimonialSlider').addEventListener('mouseenter', stopAutoAdvance);
    document.getElementById('testimonialSlider').addEventListener('mouseleave', () => startAutoAdvance(5000));
});
```

### Implementing Touch Gestures
Add to script.js:
```js
let touchStartX = 0;
let touchEndX = 0;

const slider = document.getElementById('testimonialSlider');

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
}
```

### Lazy Loading Enhancement
Modify image rendering in init():
```js
function init() {
    testimonials.forEach((t, index) => {
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = index === 0 ? t.image : ''; // Only load first immediately
        img.dataset.src = t.image; // Store others
        img.alt = `Portrait of ${t.name}`;
        img.className = `showcase-module__image ${index === 0 ? 'is-active' : ''}`;
        img.dataset.index = index;
        els.imageContainer.appendChild(img);
        
        // Lazy load when becoming active
        if (index !== 0) {
            img.addEventListener('transitionend', () => {
                if (img.classList.contains('is-active') && !img.src) {
                    img.src = img.dataset.src;
                }
            });
        }
    });
}
```

---

## Performance Optimization

### Critical CSS Extraction
Inline critical styles for above-the-fold content:
```html
<style>
.showcase-module {
    display: flex;
    opacity: 1;
    /* Other essential styles */
}
</style>
```

### Font Loading Strategy
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
</noscript>
```

### Image Optimization
```js
// WebP detection and serving
function supportsWebP() {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    });
}

// Convert image URLs to WebP if supported
async function optimizeImageUrls() {
    const supports = await supportsWebP();
    testimonials.forEach(t => {
        if (supports && t.image.includes('.jpg')) {
            t.image = t.image.replace('.jpg', '.webp');
        }
    });
}
```

---

## Troubleshooting Guide

### Issue: Images Not Loading
**Symptoms**: White space or broken image icons in visual panel.

**Solutions**:
1. Check CORS: Ensure Unsplash or image host allows cross-origin loading
2. Verify URLs: Test image URLs directly in browser
3. Network inspection: Check DevTools Network tab for 404 errors
4. Fallback implementation:
```js
const img = new Image();
img.onerror = function() {
    this.src = 'fallback-image.jpg';
};
img.src = testimonial.image;
```

### Issue: Animation Jank or Stutter
**Symptoms**: Transitions appear choppy on lower-end devices.

**Solutions**:
1. Enable hardware acceleration:
```css
.showcase-module__image {
    transform: translateZ(0);
    backface-visibility: hidden;
}
```
2. Reduce animation complexity: Set `--transition-speed: 0.3s`
3. Implement `will-change` cautiously:
```css
.showcase-module__image {
    will-change: opacity;
}
```

### Issue: Content Flickering During Transition
**Symptoms**: Brief flash of unstyled content between slides.

**Solutions**:
1. Add transition synchronization:
```js
function updateContent(index) {
    // Hide container during update
    els.quoteText.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        els.quoteText.textContent = data.quote;
        
        // Force reflow
        void els.quoteText.offsetWidth;
        
        // Restore opacity with transition
        els.quoteText.style.opacity = '1';
    }, 250);
}
```

### Issue: Mobile Responsive Layout Problems
**Symptoms**: Content overflowing or misaligned on mobile devices.

**Solutions**:
1. Add viewport meta tag verification:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```
2. Implement additional breakpoints:
```css
@media (max-width: 480px) {
    .showcase-module__content {
        padding: 1.5rem;
    }
    
    .quote-block__text {
        font-size: 1.1rem;
    }
}
```

### Issue: JavaScript Errors Breaking Component
**Symptoms**: Component fails to initialize, console shows errors.

**Debugging Steps**:
1. Check element existence: Add null checks in init():
```js
if (!els.imageContainer) {
    console.error('Image container not found');
    return;
}
```
2. Verify data structure: Log testimonials array
3. Test in isolation: Create minimal test page with only Vector component

### Issue: Accessibility Violations
**Symptoms**: Screen reader issues or keyboard navigation failures.

**Solutions**:
1. Enhance ARIA attributes:
```html
<div role="region" aria-live="polite" aria-label="Testimonial slider">
```
2. Improve focus management:
```js
function nextSlide() {
    // ... existing code
    document.getElementById('currentCounter').focus();
}
```

---

## Browser Compatibility Matrix

| Browser | Version | Support | Notes |
|---------|---------|---------|-------|
| Chrome  | 60+     | Full    | Optimal performance |
| Firefox | 55+     | Full    | Minor animation smoothing differences |
| Safari  | 12+     | Full    | Requires `-webkit-` prefix for some animations |
| Edge    | 79+     | Full    | Chromium-based version |
| IE      | 11      | Partial | Requires polyfills for CSS variables |

### Polyfill Requirements for IE11
```html
<!-- CSS Custom Properties polyfill -->
<script src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2"></script>
<script>
    cssVars({
        watch: true
    });
</script>
```

---

## Version Control & Deployment

### Git Integration
```bash
# Add as submodule
git submodule add https://github.com/thisislefa/vector components/vector

# Update submodule
git submodule update --remote components/vector
```

### Build Process Integration
For Webpack:
```js
module.exports = {
    module: {
        rules: [
            {
                test: /vector\/.*\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
```

---

## Analytics Integration

### Event Tracking Implementation
```js
function trackSlideChange(index, direction) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'slide_change', {
            'event_category': 'engagement',
            'event_label': 'testimonial_slider',
            'value': index,
            'direction': direction
        });
    }
    
    // Matomo/Google Analytics universal
    if (typeof _paq !== 'undefined') {
        _paq.push(['trackEvent', 'Testimonial', 'Slide Change', `Slide ${index + 1}`]);
    }
}
```

---

## Security Considerations

1. **Image Source Validation**: Sanitize image URLs to prevent XSS
2. **Content Security Policy**: Ensure CSP allows external images and fonts
3. **Input Sanitization**: If loading testimonials from user input, escape HTML

---

## Maintenance Checklist

- [ ] Update image URLs quarterly (Unsplash links may expire)
- [ ] Test keyboard navigation annually
- [ ] Verify mobile responsiveness on new devices
- [ ] Update dependencies (Font Awesome, etc.)
- [ ] Performance audit with Lighthouse
- [ ] Accessibility audit with axe-core

---

## License

MIT License — Commercial and personal use permitted with attribution.

---

## Support

For issues, feature requests, or contributions:
1. Open an issue on GitHub
2. Provide browser/device details
3. Include console errors if applicable
4. Share reproduction steps

Built by Lefa Mofokeng as part of a professional component library.




