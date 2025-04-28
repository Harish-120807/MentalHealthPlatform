document.addEventListener('DOMContentLoaded', function() {
    // Sample data for groups
    const groups = [
        {
            title: "Senior Meditation Circle",
            category: "meditation",
            age: "seniors",
            timezone: "est",
            members: 12,
            description: "A gentle meditation group for seniors, focusing on breath awareness and relaxation."
        },
        {
            title: "Art Therapy for Wellness",
            category: "art-therapy",
            age: "adults",
            timezone: "pst",
            members: 8,
            description: "Express yourself through art in a supportive environment."
        },
        {
            title: "Gratitude Journaling",
            category: "journaling",
            age: "all",
            timezone: "gmt",
            members: 15,
            description: "Share and reflect on daily moments of gratitude."
        }
    ];

    // Sample data for events
    const events = [
        {
            title: "Morning Meditation",
            date: "2024-03-20",
            time: "09:00",
            timezone: "EST",
            type: "meditation"
        },
        {
            title: "Art Therapy Workshop",
            date: "2024-03-21",
            time: "14:00",
            timezone: "PST",
            type: "art-therapy"
        },
        {
            title: "Gratitude Circle",
            date: "2024-03-22",
            time: "19:00",
            timezone: "GMT",
            type: "journaling"
        }
    ];

    // Function to create group cards
    function createGroupCard(group) {
        return `
            <div class="card">
                <h3>${group.title}</h3>
                <p>${group.description}</p>
                <div class="group-meta">
                    <span><i class="fas fa-users"></i> ${group.members} members</span>
                    <span><i class="fas fa-clock"></i> ${group.timezone.toUpperCase()}</span>
                </div>
                <button class="join-button">Join Group</button>
            </div>
        `;
    }

    // Function to create event cards
    function createEventCard(event) {
        const date = new Date(event.date);
        return `
            <div class="event-card">
                <div class="event-date">
                    <span class="day">${date.getDate()}</span>
                    <span class="month">${date.toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p><i class="fas fa-clock"></i> ${event.time} ${event.timezone}</p>
                    <button class="rsvp-button">RSVP</button>
                </div>
            </div>
        `;
    }

    // Filter functionality
    const categoryFilter = document.getElementById('category-filter');
    const ageFilter = document.getElementById('age-filter');
    const timezoneFilter = document.getElementById('timezone-filter');
    const groupGrid = document.querySelector('.group-grid');

    function filterGroups() {
        const category = categoryFilter.value;
        const age = ageFilter.value;
        const timezone = timezoneFilter.value;

        const filteredGroups = groups.filter(group => {
            return (!category || group.category === category) &&
                   (!age || group.age === age) &&
                   (!timezone || group.timezone === timezone);
        });

        groupGrid.innerHTML = filteredGroups.map(createGroupCard).join('');
    }

    categoryFilter.addEventListener('change', filterGroups);
    ageFilter.addEventListener('change', filterGroups);
    timezoneFilter.addEventListener('change', filterGroups);

    // Initialize groups
    filterGroups();

    // Event calendar functionality
    const eventList = document.querySelector('.event-list');
    eventList.innerHTML = events.map(createEventCard).join('');

    // Chat room functionality
    const roomButtons = document.querySelectorAll('.room-categories button');
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.querySelector('.chat-messages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');
    const closeChat = document.querySelector('.close-chat');

    // Function to toggle chat visibility
    function toggleChat(show) {
        if (show === false) {
            chatContainer.style.display = 'none';
        } else {
            chatContainer.style.display = 'flex';
        }
    }

    // Initialize chat as hidden
    toggleChat(false);

    roomButtons.forEach(button => {
        button.addEventListener('click', () => {
            roomButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Show chat when a room is selected
            toggleChat(true);
            // In a real application, this would load messages for the selected room
            chatMessages.innerHTML = '<p class="system-message">Welcome to the ' + button.textContent + ' room!</p>';
        });
    });

    // Close chat when close button is clicked
    closeChat.addEventListener('click', () => {
        toggleChat(false);
    });

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <span class="user">You:</span>
                <span class="content">${message}</span>
            `;
            chatMessages.appendChild(messageElement);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Profile functionality
    const addInterestButton = document.querySelector('.add-interest');
    const interestTags = document.querySelector('.interest-tags');

    addInterestButton.addEventListener('click', () => {
        const newInterest = prompt('Enter a new interest:');
        if (newInterest) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = newInterest;
            interestTags.insertBefore(tag, addInterestButton);
        }
    });

    // Activity cards functionality
    const activityButtons = document.querySelectorAll('.activity-card button');
    activityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const activity = button.parentElement.querySelector('h3').textContent;
            alert(`Starting ${activity}... In a real application, this would open the activity interface.`);
        });
    });

    // Responsive navigation
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    function toggleNav() {
        navLinks.classList.toggle('active');
    }

    // Add mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    nav.insertBefore(menuButton, navLinks);

    menuButton.addEventListener('click', toggleNav);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Create group cards
    function createGroupCards() {
        const groupGrid = document.querySelector('.group-grid');
        if (!groupGrid) return;

        // Sample group data
        const groups = [
            {
                title: '🧘‍♂️ Senior Meditation Circle',
                description: 'A gentle meditation group for seniors, focusing on breath awareness and relaxation.',
                members: 12,
                timezone: 'EST',
                category: 'meditation',
                ageGroup: 'seniors'
            },
            {
                title: '🎨 Art Therapy Express',
                description: 'Express yourself through creative art projects in a supportive environment.',
                members: 8,
                timezone: 'PST',
                category: 'art-therapy',
                ageGroup: 'adults'
            },
            {
                title: '📚 Mindful Book Club',
                description: 'Discuss books focused on mental wellness, mindfulness, and personal growth.',
                members: 15,
                timezone: 'GMT',
                category: 'book-club',
                ageGroup: 'adults'
            },
            {
                title: '✍️ Journaling for Healing',
                description: 'Guided journaling sessions to process emotions and promote healing.',
                members: 10,
                timezone: 'EST',
                category: 'journaling',
                ageGroup: 'youth'
            },
            {
                title: '💬 Anxiety Support Group',
                description: 'A safe space to share experiences and learn coping strategies for anxiety.',
                members: 18,
                timezone: 'PST',
                category: 'support',
                ageGroup: 'adults'
            },
            {
                title: '🧠 Cognitive Wellness',
                description: 'Activities and discussions to maintain and improve cognitive function.',
                members: 9,
                timezone: 'EST',
                category: 'mental-wellness',
                ageGroup: 'seniors'
            }
        ];

        // Clear existing content
        groupGrid.innerHTML = '';

        // Create and append group cards
        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.style.cssText = 'background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 500px; margin: 1rem auto; display: flex; flex-direction: column;';
            
            groupCard.innerHTML = `
                <div style="flex: 1;">
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${group.title}</h3>
                    <p style="margin-bottom: 1rem; color: #555;">${group.description}</p>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold;">👥 ${group.members} members</span>
                        <span style="background: #eef; padding: 0.25rem 0.75rem; border-radius: 999px;">⏰ ${group.timezone}</span>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #eee;">
                    <button class="join-group-btn" style="background: #f8f9fa; color: #6c63ff; border: 1px solid #6c63ff; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem; cursor: pointer; transition: all 0.3s ease;">
                        ➕ Join Group
                    </button>
                </div>
            `;
            
            // Add data attributes for filtering
            groupCard.setAttribute('data-category', group.category);
            groupCard.setAttribute('data-age', group.ageGroup);
            groupCard.setAttribute('data-timezone', group.timezone.toLowerCase());
            
            // Add event listener to join button
            const joinBtn = groupCard.querySelector('.join-group-btn');
            joinBtn.addEventListener('click', function() {
                alert(`You've joined the ${group.title}!`);
            });
            
            groupGrid.appendChild(groupCard);
        });
    }

    // Filter groups based on selected filters
    function filterGroups() {
        const categoryFilter = document.getElementById('category-filter');
        const ageFilter = document.getElementById('age-filter');
        const timezoneFilter = document.getElementById('timezone-filter');
        
        if (!categoryFilter || !ageFilter || !timezoneFilter) return;
        
        const selectedCategory = categoryFilter.value;
        const selectedAge = ageFilter.value;
        const selectedTimezone = timezoneFilter.value;
        
        const groupCards = document.querySelectorAll('.group-card');
        
        groupCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const age = card.getAttribute('data-age');
            const timezone = card.getAttribute('data-timezone');
            
            const categoryMatch = !selectedCategory || category === selectedCategory;
            const ageMatch = !selectedAge || age === selectedAge;
            const timezoneMatch = !selectedTimezone || timezone === selectedTimezone;
            
            if (categoryMatch && ageMatch && timezoneMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Create upcoming events
    function createUpcomingEvents() {
        const eventsSection = document.querySelector('#events');
        if (!eventsSection) return;
        
        // Clear existing content
        const eventCalendar = eventsSection.querySelector('.event-calendar');
        if (eventCalendar) {
            eventCalendar.innerHTML = '';
        }
        
        // Create events container
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'events-container';
        eventsContainer.style.cssText = 'padding: 2rem; background: #f9f9ff; border-radius: 12px;';
        
        // Add header
        const header = document.createElement('div');
        header.innerHTML = `
            <h2 style="font-size: 2rem; margin-bottom: 1rem;">📅 Upcoming Events</h2>
            <h4 style="color: #6c63ff; margin-bottom: 1.5rem;">March 2024</h4>
        `;
        eventsContainer.appendChild(header);
        
        // Sample events data
        const events = [
            {
                date: '20 Mar',
                title: 'Morning Meditation',
                time: '09:00 EST'
            },
            {
                date: '21 Mar',
                title: 'Art Therapy Workshop',
                time: '14:00 PST'
            },
            {
                date: '22 Mar',
                title: 'Gratitude Circle',
                time: '19:00 GMT'
            },
            {
                date: '25 Mar',
                title: 'Mindful Journaling',
                time: '15:30 EST'
            },
            {
                date: '28 Mar',
                title: 'Anxiety Support Group',
                time: '18:00 PST'
            }
        ];
        
        // Create event cards
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.style.cssText = 'display: flex; align-items: center; justify-content: space-between; background: #fff; padding: 1rem 1.5rem; border-radius: 12px; margin-bottom: 1rem; box-shadow: 0 2px 6px rgba(0,0,0,0.05);';
            
            eventCard.innerHTML = `
                <div>
                    <strong>${event.date}</strong><br>
                    <span>${event.title}</span><br>
                    <small>⏰ ${event.time}</small>
                </div>
                <button class="rsvp-btn" style="background: #6c63ff; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">RSVP</button>
            `;
            
            // Add event listener to RSVP button
            const rsvpBtn = eventCard.querySelector('.rsvp-btn');
            rsvpBtn.addEventListener('click', function() {
                alert(`You've RSVP'd to ${event.title} on ${event.date} at ${event.time}!`);
            });
            
            eventsContainer.appendChild(eventCard);
        });
        
        // Add to the events section
        if (eventCalendar) {
            eventCalendar.appendChild(eventsContainer);
        } else {
            eventsSection.appendChild(eventsContainer);
        }
    }

    // Initialize the page
    createGroupCards();
    
    // Create upcoming events
    createUpcomingEvents();
    
    // Add filter event listeners
    const filters = document.querySelectorAll('.filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterGroups);
    });
    
    // Add click handler for "Find Your Group" button
    const findGroupButton = document.querySelector('.cta-button');
    if (findGroupButton) {
        findGroupButton.addEventListener('click', function() {
            // Scroll to the discover groups section
            const discoverSection = document.getElementById('discover');
            if (discoverSection) {
                discoverSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}); 