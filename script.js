// Track button hover state
let isHoveringButton = false;

const surpriseButtons = document.querySelectorAll(".surprise-button");
const eyes = document.querySelectorAll(".eye");
const mouth = document.querySelector(".mouth");
const eyelidLeft = document.querySelector(".eyelid-left");
const eyelidRight = document.querySelector(".eyelid-right");

surpriseButtons.forEach((surpriseButton) =>
  surpriseButton.addEventListener("mouseenter", () => {
    isHoveringButton = true;

    eyelidLeft.style.border = "0px";
    eyelidRight.style.border = "0px ";
    // Transform eyes to hearts and grow
    eyes.forEach((eye) => {
      eye.style.borderRadius = "50% 50% 50% 50% / 60% 60% 40% 40%";
      eye.style.transform = " scale(1.5)";
      eye.style.height = "20px";
      eye.style.width = "20px";
      eye.style.transition = "all 0.1s ease-in-out";
    });

    // Transform mouth to filled black circle and grow
    mouth.style.borderRadius = "50%";
    mouth.style.backgroundColor = "black";
    mouth.style.transform = "scale(2)";
    mouth.style.transition = "all 0.1s ease-in-out";
    mouth.style.height = "15px";
    mouth.style.width = "15px";
  })
);

surpriseButtons.forEach((surpriseButton) =>
  surpriseButton.addEventListener("mouseleave", () => {
    isHoveringButton = false;

    eyelidLeft.style.border = "3px solid black";
    eyelidRight.style.border = "3px solid black";

    // Reset eyes
    eyes.forEach((eye) => {
      eye.style.borderRadius = "";
      eye.style.transform = "";
      eye.style.height = "20px";
      eye.style.width = "20px";
      eye.style.transition = "all 0.1s ease-in-out";
    });

    // Reset mouth
    mouth.style.borderRadius = "";
    mouth.style.backgroundColor = "";
    mouth.style.transform = "";
    mouth.style.transition = "all 0.1s ease-in-out";
    mouth.style.width = "46px";
    mouth.style.height = "";
    mouth.style.bottom = "30px";
  })
);

// Avatar Mouse Tracking Script
(function () {
  const glasses = document.querySelector(".eye-glass");
  const eyes = document.querySelectorAll(".eye");
  const eyelids = document.querySelectorAll(".eyelid-left, .eyelid-right");
  const mouth = document.querySelector(".mouth");
  const face = document.querySelector(".face");
  const hairBlobs = document.querySelectorAll(".blob");
  let last = { x: 0, y: 0, t: Date.now() };

  const eyeMaxOffsets = Array.from(eyes).map((eye, i) => {
    const lid = eyelids[i];
    const lidRect = lid.getBoundingClientRect();
    const eyeRect = eye.getBoundingClientRect();
    return (lidRect.width - eyeRect.width) / 2;
  });

  window.addEventListener("mousemove", (e) => {
    const now = Date.now();
    const dt = now - last.t || 16;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    const speed = Math.hypot(dx, dy) / dt;
    last = { x: e.clientX, y: e.clientY, t: now };

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const rx = (e.clientX - cx) / cx;
    const ry = (e.clientY - cy) / cy;

    // Determine direction multiplier based on button hover state
    const directionMultiplier = isHoveringButton ? 1 : -1;

    const faceX = directionMultiplier * rx * 4;
    const faceY = directionMultiplier * ry * 3;
    face.style.transform = `translate(${faceX}px, ${faceY}px)`;

    glasses.style.transform = `translate(${directionMultiplier * rx * 10}px, ${
      directionMultiplier * ry * 6
    }px)`;

    eyes.forEach((eye, i) => {
      // Only apply eye movement if not in heart mode
      if (!isHoveringButton) {
        eye.style.transform = `translateX(${
          directionMultiplier * rx * eyeMaxOffsets[i]
        }px)`;
      }
    });

    // Apply mouth movement with appropriate direction
    if (!isHoveringButton) {
      mouth.style.transform = `translate(${directionMultiplier * rx * 10}px, ${
        directionMultiplier * ry * 4
      }px)`;
    }
  });
})();

function toggleImage(container) {
  const img = container.querySelector(".project-image");
  const staticSrc = img.getAttribute("data-static");
  const gifSrc = img.getAttribute("data-gif");

  if (img.src.includes(staticSrc.split("/").pop())) {
    img.src = gifSrc;
    setTimeout(() => {
      img.src = staticSrc;
    }, 3000); // Show gif for 3 seconds
  }
}

// Enhanced hover effects
document.querySelectorAll(".image-container").forEach((container) => {
  const img = container.querySelector(".project-image");
  const staticSrc = img.getAttribute("data-static");
  const gifSrc = img.getAttribute("data-gif");

  container.addEventListener("mouseenter", () => {
    img.src = gifSrc;
  });

  container.addEventListener("mouseleave", () => {
    img.src = staticSrc;
  });
});

// Add smooth scrolling and intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Add click effects to tech tags
document.querySelectorAll(".tech-tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.style.transform = "scale(0.95)";
    setTimeout(() => {
      tag.style.transform = "translateY(-2px)";
    }, 150);
  });
});

// Add ripple effect to buttons
document.querySelectorAll(".project-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.height, rect.width);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(0, 0, 0, 0.3)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";
    ripple.style.pointerEvents = "none";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .project-link {
                position: relative;
                overflow: hidden;
            }
        `;
document.head.appendChild(style);

document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');
  });
});

document.getElementById('work').addEventListener('click',() => {
    document.querySelector('.pink').classList.remove('expand');
    document.querySelector('.white').classList.remove('expand');
    document.querySelector('.pink').classList.add('expand');

  setTimeout(() => {
    document.querySelector('.white').classList.add('expand');
  }, 350);

  setTimeout(() => {
        document.querySelector('.pink').classList.remove('expand');
    document.querySelector('.white').classList.remove('expand');
    document.querySelector('.home-section').style.display = 'none';

    const boxes = document.querySelectorAll('.work-section .video-box');
  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.classList.add('visible');
    }, 100 * index); // stagger each one by 150ms
  });
  }, 1200);

})

function goHome() {
  // Hide work-section and reset video boxes
document.querySelector('.work-section').style.display = 'none';
document.querySelectorAll('.work-section .video-box').forEach(box => {
  box.classList.remove('visible');
});
}
