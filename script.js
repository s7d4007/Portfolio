document.addEventListener('DOMContentLoaded', () => {

            // --- REDUCED MOTION CHECK ---
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // --- SET CURRENT YEAR ---
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // --- THEME SWITCHER LOGIC ---
            const themeSwitcher = document.getElementById('theme-switcher');
            const htmlEl = document.documentElement;
            const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            function applyTheme(theme) {
                if (theme === 'system') {
                    theme = systemThemeQuery.matches ? 'dark' : 'light';
                }
                htmlEl.classList.toggle('dark', theme === 'dark');
            }

            function getThemePreference() {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                    theme = 'system';
                    localStorage.setItem('theme', theme);
                }
                return theme;
            }

            const currentTheme = getThemePreference();
            themeSwitcher.value = currentTheme;
            applyTheme(currentTheme);

            themeSwitcher.addEventListener('change', (e) => {
                const newTheme = e.target.value;
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });

            systemThemeQuery.addEventListener('change', (e) => {
                if (getThemePreference() === 'system') {
                    applyTheme('system');
                }
            });

            // --- MOBILE MENU TOGGLE ---
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIconOpen = document.getElementById('menu-icon-open');
            const menuIconClose = document.getElementById('menu-icon-close');
            
            mobileMenuBtn.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('hidden');
                menuIconOpen.classList.toggle('hidden', !isOpen);
                menuIconClose.classList.toggle('hidden', isOpen);
            });
            // Close menu on link click
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    menuIconOpen.classList.remove('hidden');
                    menuIconClose.classList.add('hidden');
                });
            });


            // --- SCROLL-REVEAL ANIMATIONS (INTERSECTION OBSERVER) ---
            if (!prefersReducedMotion) {
                const revealElements = document.querySelectorAll('.reveal');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('reveal-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.1,
                });

                revealElements.forEach(el => {
                    observer.observe(el);
                });
            }

            // --- HERO VANTA.JS & TYPED.JS ---
            const vantaBg = document.getElementById('vanta-bg');
            const vantaFallback = document.getElementById('vanta-fallback');
            let vantaEffect = null;

            function initVanta() {
                if (!prefersReducedMotion && !vantaEffect && VANTA) {
                    const theme = getThemePreference();
                    const isDark = (theme === 'system') ? systemThemeQuery.matches : (theme === 'dark');
                    
                    vantaEffect = VANTA.NET({
                        el: "#vanta-bg",
                        THREE: THREE,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: isDark ? 0x2563eb : 0x3b82f6, // dark:blue-600, light:blue-500
                        backgroundColor: isDark ? 0x111827 : 0xf9fafb, // dark:gray-900, light:gray-50
                        points: 12.00,
                        maxDistance: 25.00,
                        spacing: 18.00
                    });
                } else {
                    vantaBg.classList.add('hidden');
                    vantaFallback.classList.remove('hidden');
                }
            }
            
            // Re-init vanta on theme change
            themeSwitcher.addEventListener('change', () => {
                if (vantaEffect) {
                    vantaEffect.destroy();
                    vantaEffect = null;
                }
                initVanta();
            });
            systemThemeQuery.addEventListener('change', () => {
                if (getThemePreference() === 'system') {
                    if (vantaEffect) {
                        vantaEffect.destroy();
                        vantaEffect = null;
                    }
                    initVanta();
                }
            });

            // Lazy-load Vanta on hero intersection
            const heroObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    initVanta();
                    heroObserver.unobserve(entries[0].target);
                }
            }, { threshold: 0.1 });
            heroObserver.observe(document.getElementById('hero'));

            // Init Typed.js
            new Typed('#typed-text', {
                strings: ['Software Developer', 'Full-Stack Engineer', 'React Specialist', 'Problem Solver'],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 1500,
                loop: true,
                smartBackspace: true,
            });


            // --- PROJECT DATA & MODAL LOGIC ---

            const projectData = [
                {
                    id: 1,
                    title: "Ask Llama",
                    image: "ask_llama.png",
                    description: "Ask Llama is an interactive question-answering application powered by Llama-based language models. It enables users to ask questions and receive intelligent, context-aware responses.",
                    tags: ["HTML5", "CSS3", "JavaScript", "Python"],
                    liveUrl: "https://github.com/s7d4007/Ask-Llama",
                    repoUrl: "https://github.com/s7d4007/Ask-Llama",
                    details: `
                        <p style="color: white;">Ask Llama is an interactive question-answering application powered by Llama-based language models. It enables users to ask questions and receive intelligent, context-aware responses.</p>
                        <h4 class="font-semibold mt-4 mb-2" style="color: white;">Key Features:</h4>
                        <ul class="list-disc list-inside">
                            <li style="color: white;">Interactive Q&A app powered by Llama-based language models.</li>
                            <li style="color: white;">Enables users to ask questions and get intelligent, context-aware answers.</li>
                            <li style="color: white;">Delivers accurate, conversational responses for an engaging experience.</li>
                        </ul>
                    `
                },
                {
                    id: 2,
                    title: "Youtube Videos Summarizer",
                    image: "YouTube_Video_Summarizer.png",
                    description: "This is an AI-powered YouTube video summarizer that 1. Downloads a YouTube video 2. Transcribes it using OpenAI's Whisper, Summarizes the content using a Hugging Face transformer model , Displays the final summary in a simple web interface using Gradio",
                    tags: ["Python", "Gradio", "OpenAI Whisper", "Hugging Face"],
                    liveUrl: "https://github.com/s7d4007/Youtube_Summarizer",
                    repoUrl: "https://github.com/s7d4007/Youtube_Summarizer",
                    details: `
                        <p style="color: white;">Have you ever come across a situation where you need to revise a concept but the video is long? That's where this project comes handy. It summarizes the youtube video you want. The only thing you need to do is to paste the url of the youtube video you desire to summarize.</p>
                        <h4 class="font-semibold mt-4 mb-2" style="color: white;">Challenges:</h4>
                        <p style="color: white;">One of the main challenges was optimizing... summarizing the youtube video took longer than expected, although I am still struggling to solve the problem, it will be done sooner than none.</p>
                    `
                },
                {
                    id: 3,
                    title: "Number Nexus",
                    image: "NumberNexus.png",
                    description: "A simple Calculator based on Javascript. You can also use your keyboard to calculate.",
                    tags: ["HTML", "CSS", "Javascript"],
                    liveUrl: "https://s7d4007.github.io/Calculator/",
                    repoUrl: "https://github.com/s7d4007/Calculator",
                    details: `
                        <p style="color: white;">A simple Calculator based on Javascript. You can also use your keyboard to calculate.</p>
                    `
                },
            ];
            // END CUSTOMIZE

            const projectsGrid = document.getElementById('projects-grid');
            const modal = document.getElementById('project-modal');
            const modalBackdrop = document.getElementById('modal-backdrop');
            const modalCloseBtn = document.getElementById('modal-close-btn');

            // Populate project cards
            projectData.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-950 shadow-xl ring-1 ring-gray-200 dark:ring-gray-800 transition-all duration-300 ease-out hover:shadow-2xl reveal';
                card.style.transitionDelay = `${index * 150}ms`;
                card.dataset.projectId = project.id;

                card.innerHTML = `
                    <div class="relative h-48 w-full overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div class="flex flex-grow flex-col p-6">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${project.title}</h3>
                        <p class="mt-2 flex-grow text-sm text-gray-600 dark:text-gray-400">${project.description}</p>
                        <div class="mt-4 flex flex-wrap gap-2">
                            ${project.tags.map(tag => `<span class="rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-4">
                        <button data-project-id="${project.id}" class="open-modal-btn flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 transition-all group-hover:text-blue-800 dark:group-hover:text-blue-300 focus-ring rounded-md">
                            Details <i class="fa-solid fa-arrow-right ml-1 transition-transform duration-300 group-hover:translate-x-1"></i>
                        </button>
                    </div>
                `;
                projectsGrid.appendChild(card);
            });

            // Modal open/close functions
            function openModal(projectId) {
                const project = projectData.find(p => p.id == projectId);
                if (!project) return;

                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-image').src = project.image;
                document.getElementById('modal-image').alt = project.title;
                document.getElementById('modal-details').innerHTML = project.details;
                
                const tagsContainer = document.getElementById('modal-tags');
                tagsContainer.innerHTML = project.tags.map(tag => `<span class="rounded-full bg-blue-100 dark:bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">${tag}</span>`).join('');
                
                const linksContainer = document.getElementById('modal-links');
                linksContainer.innerHTML = '';
                if (project.liveUrl) {
                    linksContainer.innerHTML += `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus-ring"><i class="fa-solid fa-arrow-up-right-from-square mr-2"></i>View Live Site</a>`;
                }
                if (project.repoUrl) {
                    linksContainer.innerHTML += `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus-ring"><i class="fa-brands fa-github mr-2"></i>View Code</a>`;
                }

                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }

            function closeModal() {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
            }

            // Add event listeners for modal
            projectsGrid.addEventListener('click', (e) => {
                const button = e.target.closest('.open-modal-btn');
                if (button) {
                    openModal(button.dataset.projectId);
                }
            });
            modalCloseBtn.addEventListener('click', closeModal);
            modalBackdrop.addEventListener('click', closeModal);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });

            
            // --- CONTACT FORM & TOAST ---
            const copyEmailBtn = document.getElementById('copy-email-btn');
            const toast = document.getElementById('toast');
            
            copyEmailBtn.addEventListener('click', () => {
                const email = copyEmailBtn.querySelector('p').textContent;
                navigator.clipboard.writeText(email).then(() => {
                    // Show toast
                    toast.classList.remove('translate-x-full', 'opacity-0');
                    toast.classList.add('translate-x-0', 'opacity-100');
                    
                    // Hide toast after 3 seconds
                    setTimeout(() => {
                        toast.classList.remove('translate-x-0', 'opacity-100');
                        toast.classList.add('translate-x-full', 'opacity-0');
                    }, 3000);
                });
            });

            // Contact Formspree handling
            const contactForm = document.getElementById('contact-form');
            const formStatus = document.getElementById('form-status');
            const submitBtn = document.getElementById('form-submit-btn');

            async function handleFormSubmit(event) {
                event.preventDefault();
                const form = event.target;
                const data = new FormData(form);
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                formStatus.textContent = '';
                
                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                        formStatus.className = "text-center text-sm text-green-600 dark:text-green-400";
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    formStatus.textContent = "Oops! There was a problem submitting your form. Please try again.";
                    formStatus.className = "text-center text-sm text-red-600 dark:text-red-400";
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            }
            contactForm.addEventListener("submit", handleFormSubmit);

        });