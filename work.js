
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
          otherBox.style.transform = 'scale(1.08)';
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




let currentBanner = null;

function infoBannerAppear(content = "Default message") {
  if (currentBanner) {
    hideBanner();
    showNewBanner(content)
  } else {
    showNewBanner(content);
  }
}

function showNewBanner(content) {
  const banner = document.createElement('div');
  banner.className = 'info-banner';
  banner.innerHTML = `
                <div class="left-stick"></div>
                <div class="white-board">
                    ${content}
                </div>
                <div class="right-stick"></div>
            `;
  document.body.appendChild(banner);
  currentBanner = banner;

  setTimeout(() => {
    banner.classList.add('bounce-in');
  }, 10);
}

function hideBanner() {
  if (currentBanner) {
    currentBanner.classList.remove('bounce-in');
    currentBanner.classList.add('bounce-out');
  }
}

window.addEventListener('load', () => {
  setTimeout(() => {
    infoBannerAppear('Hii There! Welcome!');
    setTimeout(() => {
      hideBanner();
    },5000);
  }, 1000);
});


const videoDescriptions = {
  "expense-tracker.mp4": "Track your expenses and visualize spending trends. Made with Reactjs.",
  "mighty-solutions.mp4": "Business website I built for a client.",
  "bothigh.mp4": "Automated Bots for your business, Integrated with Telegram, Whatsapp and Instagram available.",
  "literature-assistant.mp4": "Tool to assist in literary research and summarization. Uses RAG and LLMs.",
  "crossword.mp4": "Solve Crosswords with your friends online! Random Match making or custom rooms.",
  "linkedin-posting.mp4": "Automated LinkedIn post generator and scheduler.",
  "image-gallery.mp4": "Minimal image gallery with smooth transitions.",
  "switchhigh.mp4": "Business site builder for brands and startups.",
  "pastel-palette.mp4": "Color palette visualizer with pastel aesthetics.",
};

document.querySelectorAll("#work-section .video-box video").forEach((video) => {
  const src = video.getAttribute("src");
  const filename = src.split("/").pop(); // Get just the file name (e.g. 'bothigh.mp4')
  const description = videoDescriptions[filename] || "Project showcase.";

  video.addEventListener("mouseenter", () => {
    infoBannerAppear(description);
  });

  video.addEventListener("mouseleave", () => {
    hideBanner(); // Optional: you can choose to keep it visible if preferred
  });
});

document.getElementById("work-button").addEventListener("click", () => {
  document.getElementById("home-section").classList.add("hide");
  about_content.classList.add("hide");
  about_header.classList.add("hide");
  about_section.classList.add("hide");
  animation();

  setTimeout(() => {
    document.getElementById("work-section").classList.remove("hide");
  }, 1000);
});

document.getElementById("about-button").addEventListener("click", () => {
  document.getElementById("home-section").classList.add("hide");
  document.getElementById("work-section").classList.add("hide");

  animation();

  setTimeout(() => {
      about_content.classList.remove("hide");
  about_header.classList.remove("hide");
  about_section.classList.remove("hide");
  }, 1000);
});
