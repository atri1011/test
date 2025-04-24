document.addEventListener('DOMContentLoaded', () => {
    // --- Particle Effect ---
    const particleButtons = document.querySelectorAll('.particle-button');

    particleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            // Calculate click position relative to the button
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create multiple particles
            for (let i = 0; i < 15; i++) { // Create 15 particles
                createParticle(button, x, y);
            }
        });
    });

    function createParticle(container, x, y) {
        const particle = document.createElement('span');
        particle.classList.add('particle');

        // Set initial position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        // Randomize explosion direction using CSS variables
        const randomAngle = Math.random() * Math.PI * 2; // Random angle in radians
        const randomDistance = Math.random() * 30 + 20; // Random distance
        particle.style.setProperty('--tx', `${Math.cos(randomAngle) * randomDistance}px`);
        particle.style.setProperty('--ty', `${Math.sin(randomAngle) * randomDistance}px`);


        container.appendChild(particle);

        // Remove particle after animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }

    // --- Component Loader ---
    // Function to load HTML components into placeholders
    async function loadComponent(componentUrl, placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`Placeholder element with ID '${placeholderId}' not found.`);
            return;
        }
        try {
            const response = await fetch(componentUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            placeholder.innerHTML = html;
             // Re-apply necessary scripts or styles if needed after load,
             // though for status/tab bar it should be mainly CSS driven by classes.
        } catch (error) {
            console.error(`Could not load component from ${componentUrl}:`, error);
            placeholder.innerHTML = `<p class="text-red-500 text-xs">Error loading ${placeholderId}.</p>`;
        }
    }

    // Load Status Bar and Tab Bar
    // Note: Use relative paths from the HTML file where this script runs
    loadComponent('../components/status-bar.html', 'status-bar-placeholder');
    loadComponent('../components/tab-bar.html', 'tab-bar-placeholder');

});

