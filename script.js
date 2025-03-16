window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    
    // Konami Code Implementation
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodePosition = 0;
    
    // Create rainbow flash CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbow-flash {
            0% { background-color: red; }
            14% { background-color: orange; }
            28% { background-color: yellow; }
            42% { background-color: green; }
            56% { background-color: blue; }
            70% { background-color: indigo; }
            84% { background-color: violet; }
            100% { background-color: red; }
        }
        
        .rainbow-mode {
            animation: rainbow-flash 0.5s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Listen for keydown events
    document.addEventListener('keydown', function(e) {
        // Get the key pressed
        const key = e.key.toLowerCase();
        
        // Check if it's the expected key in the sequence
        const expectedKey = konamiCode[konamiCodePosition].toLowerCase();
        
        if (key === expectedKey) {
            // Move to the next position in the sequence
            konamiCodePosition++;
            
            // If the full sequence is entered
            if (konamiCodePosition === konamiCode.length) {
                // Activate rainbow mode
                document.body.classList.add('rainbow-mode');
                konamiCodePosition = 0; // Reset the position
                
                // Optional: Add a way to turn it off with the Escape key
                const rainbowModeHandler = function(e) {
                    if (e.key === 'Escape') {
                        document.body.classList.remove('rainbow-mode');
                        document.removeEventListener('keydown', rainbowModeHandler);
                    }
                };
                document.addEventListener('keydown', rainbowModeHandler);
            }
        } else {
            // Reset position if wrong key is pressed
            konamiCodePosition = 0;
        }
    });
});