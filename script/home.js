document.addEventListener('DOMContentLoaded', () => {
  const countdownTimer = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    targetDate: new Date('2025-05-27T00:00:00Z'), 

    updateCountdown() {
      const now = new Date();
      const difference = this.targetDate - now;

      // If the birthday has passed, reset the countdown to next year
      if (difference < 0) {
        this.targetDate.setFullYear(this.targetDate.getFullYear() + 1);
        return this.updateCountdown();
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      this.days.textContent = d.toString().padStart(2, '0');
      this.hours.textContent = h.toString().padStart(2, '0');
      this.minutes.textContent = m.toString().padStart(2, '0');
      this.seconds.textContent = s.toString().padStart(2, '0');
    },

    start() {
      this.updateCountdown();
      setInterval(() => this.updateCountdown(), 1000);
    }
  };

  const carousel = {
    container: document.getElementById('carousel'),
    videos: [
      '../video/1.mp4',
      '../video/2.mp4',
      '../video/3.mp4',
      '../video/4.mp4',
      '../video/5.mp4',
      '../video/6.mp4',
      '../video/7.mp4'
    ],

    init() {
      // Create a wrapper for scrolling
      const scrollWrapper = document.createElement('div');
      scrollWrapper.classList.add('carousel-scroll-wrapper');
      this.container.appendChild(scrollWrapper);

      // Create navigation buttons
      const prevButton = document.createElement('button');
      prevButton.innerHTML = '&#10094;';
      prevButton.classList.add('carousel-nav', 'prev');

      const nextButton = document.createElement('button');
      nextButton.innerHTML = '&#10095;';
      nextButton.classList.add('carousel-nav', 'next');

      this.container.appendChild(prevButton);
      this.container.appendChild(nextButton);

      // Populate videos
      this.videos.forEach(videoPath => {
        const video = document.createElement('video');
        video.classList.add('carousel-video');
        video.controls = true;
        video.muted = true; 
        video.loop = true; 
        const source = document.createElement('source');
        source.src = videoPath;
        source.type = 'video/mp4'; 
        video.appendChild(source);
        scrollWrapper.appendChild(video);
      });

      // Add event listeners for navigation
      prevButton.addEventListener('click', () => this.scroll(-1));
      nextButton.addEventListener('click', () => this.scroll(1));

      // Optional: Add touch/drag scrolling
      this.addTouchSupport(scrollWrapper);
    },

    scroll(direction) {
      const scrollWrapper = this.container.querySelector('.carousel-scroll-wrapper');
      const videoWidth = scrollWrapper.querySelector('.carousel-video').offsetWidth;
      scrollWrapper.scrollBy({
        left: direction * videoWidth,
        behavior: 'smooth'
      });
    },

    addTouchSupport(scrollWrapper) {
      let startX = 0;
      let scrollLeft = 0;
      let isDragging = false;

      scrollWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
      });

      scrollWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
      });

      scrollWrapper.addEventListener('mouseup', () => {
        isDragging = false;
      });

      scrollWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        scrollWrapper.scrollLeft = scrollLeft - walk;
      });
    }
  };

  countdownTimer.start();
  carousel.init();
});