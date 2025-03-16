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

document.addEventListener('DOMContentLoaded', () => {
  const catContainer = document.getElementById('cat-container');
  
  fetch('https://api.thecatapi.com/v1/images/search', {
    headers: {
      'x-api-key': 'live_7fFrwyhjhlHDSYa75zVEJFytiGtWYBAlT6fsDxC6tsgvsrepm7QTxcESEIt44Pxi'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data && data[0] && data[0].url) {
      const img = document.createElement('img');
      img.src = data[0].url;
      img.alt = 'Random cat image';
      img.style.maxWidth = '100%';
      
      // Clear loading message and add the image
      catContainer.innerHTML = '';
      catContainer.appendChild(img);
    } else {
      catContainer.textContent = 'Failed to load cat image.';
    }
  })
  .catch(error => {
    console.error('Error fetching cat:', error);
    catContainer.textContent = 'Failed to load cat image.';
  });
});