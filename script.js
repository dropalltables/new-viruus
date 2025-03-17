window.addEventListener('load', function () {
    document.body.classList.add('loaded');
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
      img.style.borderRadius = '15px';
      
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