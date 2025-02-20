document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const letter = document.querySelector('.letter');
    const flap = document.querySelector('.envelope-flap');
    
    envelope.addEventListener('click', () => {
      envelope.classList.add('open', 'hidden');
      flap.classList.add('open');
      letter.classList.add('open');
      
      // Prevent multiple clicks
      envelope.style.pointerEvents = 'none';
    });
  });