
  document.addEventListener('DOMContentLoaded', () => {
    const videoBoxes = document.querySelectorAll('.video-box');

    videoBoxes.forEach((box) => {
      box.addEventListener('mouseenter', () => {
        videoBoxes.forEach(otherBox => {
          if (otherBox !== box) {
            otherBox.style.filter = 'brightness(0.4)'
          } else {
            otherBox.style.opacity = '1';   
            otherBox.style.filter = 'brightness(1)'
            otherBox.style.transform = 'scale(1.02)';
            otherBox.style.zIndex = '2';
          }
        });
      });

      box.addEventListener('mouseleave', () => {
        videoBoxes.forEach(otherBox => {
          otherBox.style.opacity = '1';
          otherBox.style.transform = 'scale(1)';
            otherBox.style.filter = 'brightness(1)'
          otherBox.style.zIndex = '1';
        });
      });
    });
  });
