        // Project data
        const projects = [
            {
                title: "Multiplayer Crosswords",
                description: "A real-time collaborative crossword puzzle game where multiple players can solve puzzles together. Features live synchronization, chat functionality, and competitive scoring.",
                skills: ["React", "Node.js", "Socket.io", "MongoDB"],
                staticImage: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop",
                gif: "https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif"
            },
            {
                title: "AI Portfolio Analyzer",
                description: "An intelligent system that analyzes investment portfolios using machine learning algorithms. Provides risk assessment, diversification recommendations, and market trend predictions.",
                skills: ["Python", "TensorFlow", "Flask", "PostgreSQL"],
                staticImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
                gif: "https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
            },
            {
                title: "Smart Home Controller",
                description: "IoT-based home automation system with voice control, energy monitoring, and predictive maintenance. Integrates with popular smart devices and provides detailed analytics.",
                skills: ["Arduino", "React Native", "Firebase", "Python"],
                staticImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
                gif: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
            },
            {
                title: "Virtual Reality Museum",
                description: "Immersive VR experience showcasing historical artifacts and artworks. Features interactive exhibits, guided tours, and educational content for remote learning.",
                skills: ["Unity", "C#", "Blender", "WebXR"],
                staticImage: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&h=300&fit=crop",
                gif: "https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif"
            },
            {
                title: "Blockchain Voting System",
                description: "Secure and transparent voting platform built on blockchain technology. Ensures vote integrity, provides real-time results, and maintains voter anonymity.",
                skills: ["Solidity", "Web3.js", "React", "Ethereum"],
                staticImage: "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=400&h=300&fit=crop",
                gif: "https://media.giphy.com/media/l46CyJmS9KUbokzsI/giphy.gif"
            }
        ];

        let currentIndex = 0;
        const cardContainer = document.getElementById('cardContainer');
        const indicators = document.getElementById('indicators');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Create cards
        function createCards() {
            projects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-media">
                        <img src="${project.staticImage}" alt="${project.title}" class="card-image">
                        <img src="${project.gif}" alt="${project.title}" class="card-gif">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${project.title}</h3>
                        <p class="card-description">${project.description}</p>
                        <div class="card-skills">
                            ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);

                // Create indicator
                const indicator = document.createElement('div');
                indicator.className = 'indicator';
                indicator.addEventListener('click', () => goToSlide(index));
                indicators.appendChild(indicator);
            });
        }

        // Update card positions
        function updateCards() {
            const cards = document.querySelectorAll('.card');
            const indicatorElements = document.querySelectorAll('.indicator');
            
            cards.forEach((card, index) => {
                card.className = 'card';
                
                if (index === currentIndex) {
                    card.classList.add('active');
                } else if (index === (currentIndex + 1) % projects.length) {
                    card.classList.add('move-back');
                } else if (index === (currentIndex + 2) % projects.length) {
                    card.classList.add('move-back-2');
                } else if (index === (currentIndex - 1 + projects.length) % projects.length) {
                    card.classList.add('move-front');
                } else if (index === (currentIndex - 2 + projects.length) % projects.length) {
                    card.classList.add('move-front-2');
                }
            });

            // Update indicators
            indicatorElements.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Navigation functions
        function nextSlide() {
            currentIndex = (currentIndex + 1) % projects.length;
            updateCards();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
            updateCards();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCards();
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') prevSlide();
            if (e.key === 'ArrowDown') nextSlide();
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;

        cardContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        cardContainer.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Mouse wheel support
        cardContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        });

        // Initialize
        createCards();
        updateCards();

        // Auto-play (optional)
        setInterval(nextSlide, 5000);