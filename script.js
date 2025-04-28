// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            successMessage.style.cssText = `
                background-color: #4CAF50;
                color: white;
                padding: 1rem;
                margin-top: 1rem;
                border-radius: 4px;
                text-align: center;
                font-size: 18px;
            `;

            contactForm.appendChild(successMessage);
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Add text size controls
    const textSizeControls = document.createElement('div');
    textSizeControls.className = 'text-size-controls';
    textSizeControls.innerHTML = `
        <button id="increase-text" aria-label="Increase text size">A+</button>
        <button id="decrease-text" aria-label="Decrease text size">A-</button>
    `;
    textSizeControls.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        gap: 10px;
    `;

    document.body.appendChild(textSizeControls);

    // Text size adjustment functionality
    let currentFontSize = 16;
    const fontSizeStep = 2;

    document.getElementById('increase-text').addEventListener('click', () => {
        currentFontSize = Math.min(currentFontSize + fontSizeStep, 24);
        document.body.style.fontSize = `${currentFontSize}px`;
    });

    document.getElementById('decrease-text').addEventListener('click', () => {
        currentFontSize = Math.max(currentFontSize - fontSizeStep, 14);
        document.body.style.fontSize = `${currentFontSize}px`;
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add loading state to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('cta-button')) {
                this.textContent = 'Loading...';
                setTimeout(() => {
                    this.textContent = 'Get Started';
                }, 1000);
            }
        });
    });

    // Add scroll to top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '↑';
    scrollTopButton.className = 'scroll-top-button';
    scrollTopButton.setAttribute('aria-label', 'Scroll to top');
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
    `;

    document.body.appendChild(scrollTopButton);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add focus styles for better keyboard navigation
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });

    // Chat Widget Functionality
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');

    // Function to toggle chat visibility
    function toggleChat() {
        chatContainer.classList.toggle('active');
        const isOpen = chatContainer.classList.contains('active');
        
        // Update ARIA attributes
        chatToggle.setAttribute('aria-expanded', isOpen);
        chatToggle.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');
        
        // Update button text
        const buttonText = chatToggle.querySelector('span');
        buttonText.textContent = isOpen ? 'Close Chat' : 'Chat with Companion';
        
        // Focus management
        if (isOpen) {
            closeChat.focus();
        } else {
            chatToggle.focus();
        }
    }

    // Event listeners for chat toggle
    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Close chat with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatContainer.classList.contains('active')) {
            toggleChat();
        }
    });

    // Handle iframe loading
    const chatIframe = document.querySelector('.chat-container iframe');
    chatIframe.addEventListener('load', function() {
        // Add loading indicator if needed
        console.log('Chat iframe loaded');
    });

    // Mental Exercises
    const exercises = [
        {
            title: "Deep Breathing (Box Breathing)",
            duration: 300, // 5 minutes in seconds
            content: `
                <h3>How to Practice Box Breathing:</h3>
                <ul>
                    <li>Inhale for 4 seconds</li>
                    <li>Hold for 4 seconds</li>
                    <li>Exhale for 4 seconds</li>
                    <li>Hold again for 4 seconds</li>
                    <li>Repeat</li>
                </ul>
                <p>Focus on your breath and try to maintain a steady rhythm.</p>
            `
        },
        {
            title: "Gratitude Journaling",
            duration: 600, // 10 minutes in seconds
            content: `
                <h3>Gratitude Practice:</h3>
                <ul>
                    <li>List 3 things you're grateful for today</li>
                    <li>Reflect on 1 positive moment from the last 24 hours</li>
                </ul>
                <p>Take your time to really feel the gratitude for each item.</p>
            `
        },
        {
            title: "Mindfulness Scan",
            duration: 180, // 3 minutes in seconds
            content: `
                <h3>Body Scan Instructions:</h3>
                <ul>
                    <li>Sit comfortably</li>
                    <li>Focus on your toes... then legs... move up to your head</li>
                    <li>Observe sensations without judging</li>
                    <li>Return to breath if distracted</li>
                </ul>
            `
        },
        {
            title: "Mood Doodle",
            duration: 600, // 10 minutes in seconds
            content: `
                <h3>Creative Expression:</h3>
                <ul>
                    <li>Take a blank canvas (physical or digital)</li>
                    <li>Draw whatever comes to mind based on your mood</li>
                    <li>Optional: Add a reflection note like "Why did I draw this?"</li>
                </ul>
            `
        },
        {
            title: "Positive Self-Talk Script",
            duration: 300, // 5 minutes in seconds
            content: `
                <h3>Complete these statements:</h3>
                <ul>
                    <li>"I am proud of myself for ______."</li>
                    <li>"Today I will be kind to myself by ______."</li>
                    <li>"I am capable of ______."</li>
                </ul>
                <p>Take time to reflect on each statement and fill in the blanks.</p>
            `
        },
        {
            title: "5-4-3-2-1 Grounding Exercise",
            duration: 300, // 5 minutes in seconds
            content: `
                <h3>Notice and name:</h3>
                <ul>
                    <li>5 things you see</li>
                    <li>4 things you can touch</li>
                    <li>3 things you hear</li>
                    <li>2 things you smell</li>
                    <li>1 thing you taste</li>
                </ul>
                <p>Take your time with each sense, really experiencing what you notice.</p>
            `
        }
    ];

    // Daily Tips for Mental Wellness
    const dailyTips = [
        {
            emoji: "🌞",
            title: "Start Your Day with Gratitude",
            content: "Write down 3 things you're grateful for each morning."
        },
        {
            emoji: "🧘‍♀️",
            title: "Breathe & Be Present",
            content: "Take 5 minutes for deep breathing or mindfulness meditation."
        },
        {
            emoji: "📵",
            title: "Digital Detox Moments",
            content: "Take short breaks from screens every 1-2 hours."
        },
        {
            emoji: "🚶‍♂️",
            title: "Move Your Body",
            content: "Even a 10-minute walk can boost your mood and energy."
        },
        {
            emoji: "🫶",
            title: "Stay Connected",
            content: "Reach out to a friend or loved one, even just to say hi."
        },
        {
            emoji: "💧",
            title: "Hydrate & Nourish",
            content: "Drink water and choose foods that fuel your body and mind."
        },
        {
            emoji: "📓",
            title: "Journal Your Thoughts",
            content: "Writing helps process emotions and clear mental clutter."
        },
        {
            emoji: "🎯",
            title: "Set Small Intentions",
            content: "Focus on one simple goal for the day to feel accomplished."
        },
        {
            emoji: "🌙",
            title: "Wind Down Gently",
            content: "Limit screens before bed; try reading or calming music instead."
        },
        {
            emoji: "💬",
            title: "Be Kind to Yourself",
            content: "Notice your self-talk. Speak to yourself like you would to a friend."
        }
    ];

    // Meditation Guides
    const meditationGuides = [
        {
            emoji: "🌬️",
            title: "2-Minute Deep Breathing",
            how: "Sit comfortably. Inhale deeply through your nose for 4 seconds, hold for 4, and exhale through your mouth for 6.",
            why: "Instantly calms your nervous system and helps reset focus."
        },
        {
            emoji: "🔘",
            title: "Body Scan (5 mins)",
            how: "Lie or sit down. Slowly bring your attention from your toes to your head, noticing any sensations without judgment.",
            why: "Relieves physical tension and increases body awareness."
        },
        {
            emoji: "💭",
            title: "Thought Observation (5 mins)",
            how: "Close your eyes and let thoughts flow. Don't engage—just observe them like clouds passing in the sky.",
            why: "Helps you detach from overthinking and be more mindful."
        },
        {
            emoji: "🧡",
            title: "Loving-Kindness (5 mins)",
            how: "Silently repeat: \"May I be happy. May I be healthy. May I be safe.\" Then extend it to others in your life.",
            why: "Builds empathy and emotional resilience."
        },
        {
            emoji: "🎧",
            title: "Guided Meditation (10 mins)",
            how: "Use apps like Insight Timer, Calm, or YouTube for soothing guided sessions.",
            why: "Great for beginners who like structure and voice support."
        },
        {
            emoji: "🔥",
            title: "Candle Gazing (Trataka - 3 mins)",
            how: "Light a candle and focus your eyes on the flame without blinking. Close eyes and visualize the flame.",
            why: "Enhances concentration and inner stillness."
        }
    ];

    // Function to get a random daily tip
    function getRandomTip() {
        const randomIndex = Math.floor(Math.random() * dailyTips.length);
        return dailyTips[randomIndex];
    }

    // Function to show a random daily tip
    function showRandomTip() {
        const tip = getRandomTip();
        
        // Create tip modal if it doesn't exist
        let tipModal = document.getElementById('tip-modal');
        if (!tipModal) {
            tipModal = document.createElement('div');
            tipModal.id = 'tip-modal';
            tipModal.className = 'modal';
            tipModal.style.cssText = `
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            tipModal.innerHTML = `
                <div class="modal-content" style="max-width: 500px; background-color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                    <div class="modal-header" style="padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.5rem;">Daily Tip for Mental Wellness</h2>
                        <button class="close-modal" aria-label="Close tip" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                    </div>
                    <div class="modal-body" id="tip-content" style="padding: 20px;">
                    </div>
                </div>
            `;
            document.body.appendChild(tipModal);
            
            // Add event listener to close button
            const closeButton = tipModal.querySelector('.close-modal');
            closeButton.addEventListener('click', () => {
                tipModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === tipModal) {
                    tipModal.style.display = 'none';
                }
            });
        }
        
        // Update tip content
        const tipContent = document.getElementById('tip-content');
        tipContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size: 3rem;">${tip.emoji}</span>
            </div>
            <h3 style="text-align: center; margin-bottom: 15px;">${tip.title}</h3>
            <p style="text-align: center; font-size: 1.1rem;">${tip.content}</p>
            <div style="text-align: center; margin-top: 20px;">
                <button id="new-tip-btn" class="exercise-button" style="margin: 0 auto;">Get Another Tip</button>
            </div>
        `;
        
        // Show the modal
        tipModal.style.display = 'flex';
        
        // Add event listener to "Get Another Tip" button
        const newTipBtn = document.getElementById('new-tip-btn');
        newTipBtn.addEventListener('click', () => {
            const newTip = getRandomTip();
            const tipTitle = tipContent.querySelector('h3');
            const tipText = tipContent.querySelector('p');
            const tipEmoji = tipContent.querySelector('span');
            
            tipTitle.textContent = newTip.title;
            tipText.textContent = newTip.content;
            tipEmoji.textContent = newTip.emoji;
        });
    }

    // Function to get a random meditation guide
    function getRandomMeditation() {
        const randomIndex = Math.floor(Math.random() * meditationGuides.length);
        return meditationGuides[randomIndex];
    }

    // Function to show a random meditation guide
    function showRandomMeditation() {
        const meditation = getRandomMeditation();
        
        // Create meditation modal if it doesn't exist
        let meditationModal = document.getElementById('meditation-modal');
        if (!meditationModal) {
            meditationModal = document.createElement('div');
            meditationModal.id = 'meditation-modal';
            meditationModal.className = 'modal';
            meditationModal.style.cssText = `
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            meditationModal.innerHTML = `
                <div class="modal-content" style="max-width: 500px; background-color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                    <div class="modal-header" style="padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.5rem;">Meditation Guide</h2>
                        <button class="close-modal" aria-label="Close meditation" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                    </div>
                    <div class="modal-body" id="meditation-content" style="padding: 20px;">
                    </div>
                </div>
            `;
            document.body.appendChild(meditationModal);
            
            // Add event listener to close button
            const closeButton = meditationModal.querySelector('.close-modal');
            closeButton.addEventListener('click', () => {
                meditationModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === meditationModal) {
                    meditationModal.style.display = 'none';
                }
            });
        }
        
        // Update meditation content
        const meditationContent = document.getElementById('meditation-content');
        meditationContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size: 3rem;">${meditation.emoji}</span>
            </div>
            <h3 style="text-align: center; margin-bottom: 15px;">${meditation.title}</h3>
            <div style="background-color: #f9f9ff; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin-top: 0; color: #6c63ff;">How:</h4>
                <p style="margin-bottom: 0;">${meditation.how}</p>
            </div>
            <div style="background-color: #f9f9ff; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-top: 0; color: #6c63ff;">Why:</h4>
                <p style="margin-bottom: 0;">${meditation.why}</p>
            </div>
            <div style="text-align: center;">
                <button id="new-meditation-btn" class="exercise-button" style="margin: 0 auto;">Try Another Meditation</button>
            </div>
        `;
        
        // Show the modal
        meditationModal.style.display = 'flex';
        
        // Add event listener to "Try Another Meditation" button
        const newMeditationBtn = document.getElementById('new-meditation-btn');
        newMeditationBtn.addEventListener('click', () => {
            const newMeditation = getRandomMeditation();
            const meditationTitle = meditationContent.querySelector('h3');
            const meditationEmoji = meditationContent.querySelector('span');
            const howContent = meditationContent.querySelector('div:nth-child(3) p');
            const whyContent = meditationContent.querySelector('div:nth-child(4) p');
            
            meditationTitle.textContent = newMeditation.title;
            meditationEmoji.textContent = newMeditation.emoji;
            howContent.textContent = newMeditation.how;
            whyContent.textContent = newMeditation.why;
        });
    }

    // Add click event to Daily Tips resource item
    const dailyTipsItem = document.querySelector('.resource-item:first-child');
    if (dailyTipsItem) {
        dailyTipsItem.style.cursor = 'pointer';
        dailyTipsItem.addEventListener('click', showRandomTip);
    }

    // Add click event to Meditation Guide resource item
    const meditationGuideItem = document.querySelector('.resource-item:nth-child(2)');
    if (meditationGuideItem) {
        meditationGuideItem.style.cursor = 'pointer';
        meditationGuideItem.addEventListener('click', showRandomMeditation);
    }

    // Modal and Timer functionality
    const modal = document.getElementById('exercise-modal');
    const exerciseButton = document.querySelector('.exercise-button');
    const closeModal = document.querySelector('.close-modal');
    const exerciseTitle = document.getElementById('exercise-title');
    const exerciseContent = document.getElementById('exercise-content');
    const timerDisplay = document.getElementById('timer');
    const startTimerButton = document.getElementById('start-timer');
    
    let currentExercise = null;
    let timerInterval = null;
    let timeLeft = 0;

    // Function to format time
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Function to get random exercise
    function getRandomExercise() {
        const randomIndex = Math.floor(Math.random() * exercises.length);
        return exercises[randomIndex];
    }

    // Function to start timer
    function startTimer(duration) {
        timeLeft = duration;
        timerDisplay.textContent = formatTime(timeLeft);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                startTimerButton.textContent = 'Start Timer';
                // Play a gentle sound or show a completion message
                alert('Exercise completed! Great job!');
            }
        }, 1000);
    }

    // Function to show exercise
    function showExercise() {
        currentExercise = getRandomExercise();
        exerciseTitle.textContent = currentExercise.title;
        exerciseContent.innerHTML = currentExercise.content;
        modal.classList.add('active');
        
        // Reset timer
        clearInterval(timerInterval);
        timerDisplay.textContent = formatTime(currentExercise.duration);
        startTimerButton.textContent = 'Start Timer';
    }

    // Event Listeners
    exerciseButton.addEventListener('click', showExercise);
    
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        clearInterval(timerInterval);
    });

    startTimerButton.addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            startTimerButton.textContent = 'Start Timer';
        } else {
            startTimer(currentExercise.duration);
            startTimerButton.textContent = 'Pause Timer';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            clearInterval(timerInterval);
        }
    });

    // Add click event to Get Started button
    const getStartedButton = document.querySelector('.cta-button');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Support Group Resources
    const supportGroupResources = {
        onlinePlatforms: [
            { name: "7 Cups", description: "Online therapy and emotional support community" },
            { name: "Reddit Communities", description: "Various mental health subreddits like r/mentalhealth" },
            { name: "Mental Health America", description: "National organization with local support groups" },
            { name: "NAMI Support Groups", description: "National Alliance on Mental Illness support groups" },
            { name: "Discord/Telegram Groups", description: "Peer support groups on messaging platforms" }
        ],
        localResources: [
            { name: "Colleges", description: "University counseling centers and student support groups" },
            { name: "Community Centers", description: "Local mental health support programs" },
            { name: "NGOs", description: "Non-profit organizations offering support groups" },
            { name: "Hospitals", description: "Medical centers with mental health support programs" }
        ],
        apps: [
            { name: "Wysa", description: "AI-powered mental health support app" },
            { name: "MindPeers", description: "Peer support and community app" },
            { name: "TalkLife", description: "Anonymous peer support community" },
            { name: "Calm Harm", description: "Support for managing self-harm urges" }
        ]
    };

    // Function to show support group resources
    function showSupportGroupResources() {
        // Create resources modal if it doesn't exist
        let resourcesModal = document.getElementById('resources-modal');
        if (!resourcesModal) {
            resourcesModal = document.createElement('div');
            resourcesModal.id = 'resources-modal';
            resourcesModal.className = 'modal';
            resourcesModal.style.cssText = `
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            resourcesModal.innerHTML = `
                <div class="modal-content" style="max-width: 800px; background-color: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);">
                    <div class="modal-header" style="padding: 15px 20px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="margin: 0; font-size: 1.5rem;">Where to Find Support Groups</h2>
                        <button class="close-modal" aria-label="Close resources" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
                    </div>
                    <div class="modal-body" id="resources-content" style="padding: 20px;">
                    </div>
                </div>
            `;
            document.body.appendChild(resourcesModal);
            
            // Add event listener to close button
            const closeButton = resourcesModal.querySelector('.close-modal');
            closeButton.addEventListener('click', () => {
                resourcesModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === resourcesModal) {
                    resourcesModal.style.display = 'none';
                }
            });
        }
        
        // Update resources content
        const resourcesContent = document.getElementById('resources-content');
        resourcesContent.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div style="background-color: #f9f9ff; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #6c63ff; margin-top: 0;">Online Platforms</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${supportGroupResources.onlinePlatforms.map(platform => `
                            <li style="margin-bottom: 10px;">
                                <strong>${platform.name}</strong>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">${platform.description}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div style="background-color: #f9f9ff; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #6c63ff; margin-top: 0;">Local Resources</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${supportGroupResources.localResources.map(resource => `
                            <li style="margin-bottom: 10px;">
                                <strong>${resource.name}</strong>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">${resource.description}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div style="background-color: #f9f9ff; padding: 20px; border-radius: 8px;">
                    <h3 style="color: #6c63ff; margin-top: 0;">Support Apps</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${supportGroupResources.apps.map(app => `
                            <li style="margin-bottom: 10px;">
                                <strong>${app.name}</strong>
                                <p style="margin: 5px 0 0 0; font-size: 0.9rem;">${app.description}</p>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Show the modal
        resourcesModal.style.display = 'flex';
    }

    // Add click event to Support Groups resource item
    const supportGroupsItem = document.querySelector('.resource-item:nth-child(3)');
    if (supportGroupsItem) {
        supportGroupsItem.style.cursor = 'pointer';
        supportGroupsItem.addEventListener('click', showSupportGroupResources);
    }
}); 