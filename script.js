// --- Data Source ---
        const testimonials = [
            {
                id: 1,
                image: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Man with glasses similar to image
                quote: "“Exceptional Service With True Attention To Detail—The Team Delivered A Flawless Result That’s Built To Stand The Test Of Time.”",
                name: "Michael Dawson",
                role: "— Homeowner, Austin"
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Woman portrait
                quote: "“They transformed our vision into reality with surprising ease. The communication was transparent and the final quality exceeded our expectations.”",
                name: "Sarah Jenkins",
                role: "— Architect, Seattle"
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Another man
                quote: "“Professional, timely, and incredibly skilled. It’s rare to find a team that cares about the craftsmanship as much as they do.”",
                name: "David Chen",
                role: "— Developer, San Francisco"
            }
        ];

        // --- State & Elements ---
        let currentIndex = 0;
        
        const els = {
            imageContainer: document.getElementById('imageContainer'),
            quoteText: document.getElementById('quoteText'),
            authorName: document.getElementById('authorName'),
            authorRole: document.getElementById('authorRole'),
            authorInfo: document.getElementById('authorInfo'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            currentCounter: document.getElementById('currentCounter'),
            totalCounter: document.getElementById('totalCounter')
        };

        // --- Initialization ---
        function init() {
            // Pre-render images for smooth transitions
            testimonials.forEach((t, index) => {
                const img = document.createElement('img');
                img.src = t.image;
                img.alt = `Portrait of ${t.name}`;
                img.className = `showcase-module__image ${index === 0 ? 'is-active' : ''}`;
                img.dataset.index = index;
                els.imageContainer.appendChild(img);
            });

            els.totalCounter.textContent = String(testimonials.length).padStart(2, '0');
            updateContent(0);
            
            // Event Listeners
            els.nextBtn.addEventListener('click', nextSlide);
            els.prevBtn.addEventListener('click', prevSlide);
            
            // Keyboard Navigation
            document.addEventListener('keydown', (e) => {
                if(e.key === 'ArrowRight') nextSlide();
                if(e.key === 'ArrowLeft') prevSlide();
            });
        }

        // --- Logic ---
        function updateContent(index) {
            const data = testimonials[index];
            
            // 1. Update Text Content with fade animation
            // We remove the active class to fade out, then update text, then fade in
            els.quoteText.classList.remove('is-active');
            els.authorInfo.classList.remove('is-active');

            setTimeout(() => {
                els.quoteText.textContent = data.quote;
                els.authorName.textContent = data.name.toUpperCase(); // Match design style
                els.authorRole.textContent = data.role;
                
                // Trigger reflow/repaint
                void els.quoteText.offsetWidth; 
                
                els.quoteText.classList.add('is-active');
                els.authorInfo.classList.add('is-active');
            }, 250); // Wait for half the CSS transition time

            // 2. Update Image
            const images = document.querySelectorAll('.showcase-module__image');
            images.forEach(img => {
                img.classList.toggle('is-active', parseInt(img.dataset.index) === index);
            });

            // 3. Update Counter with "Bump" animation
            els.currentCounter.classList.remove('bump');
            void els.currentCounter.offsetWidth; // trigger reflow
            els.currentCounter.textContent = String(index + 1).padStart(2, '0');
            els.currentCounter.classList.add('bump');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateContent(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateContent(currentIndex);
        }

        // Start
        init();
