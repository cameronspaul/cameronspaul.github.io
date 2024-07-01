document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  mobileMenu.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });
});

// Attach event listeners to links
document.addEventListener("DOMContentLoaded", function() {
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    const navLinks = document.querySelectorAll('nav ul li a,.cta-button,.plan-button');

    // Check if it's a mobile device
    if (!isMobile) {
        // Attach event listeners to links
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const headerOffset = document.querySelector('header').offsetHeight;
                const additionalOffset = 120; // Add additional offset as needed
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
});



document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      question.addEventListener('click', () => {
          // Toggle active class on faq-item
          item.classList.toggle('active');
          
          // Animate the answer
          if (item.classList.contains('active')) {
              answer.style.maxHeight = answer.scrollHeight + "px";
              question.textContent = question.textContent.replace('expand', 'collapse');
          } else {
              answer.style.maxHeight = 0;
              question.textContent = question.textContent.replace('collapse', 'expand');
          }
      });
  });
});


  document.addEventListener('DOMContentLoaded', function() {
    var animateElements = document.querySelectorAll('.animate-on-scroll');

    function checkIfInView() {
        var windowHeight = window.innerHeight;
        var windowTopPosition = window.scrollY;
        var windowBottomPosition = (windowTopPosition + windowHeight);

        animateElements.forEach(function(element) {
            var elementHeight = element.offsetHeight;
            var elementTopPosition = element.offsetTop;
            var elementBottomPosition = (elementTopPosition + elementHeight);

            if ((elementBottomPosition >= windowTopPosition + windowHeight * 0.1) &&
                (elementTopPosition <= windowBottomPosition - windowHeight * 0.1)) {
                element.classList.add('is-visible');
            }
        });
    }

    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);

    // Trigger once to check initial state
    checkIfInView();
});


document.addEventListener('DOMContentLoaded', function() {
    const roadmapContainer = document.querySelector('.roadmap-container');
    const progressBar = document.querySelector('.progress');
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const buffer = 0.1 * window.innerHeight; // Adjust this value to control how early the animation starts

        return (
            rect.top < window.innerHeight - buffer &&
            rect.bottom > buffer
        );
    }
    
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function animateProgressBar(duration, targetWidth) {
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            const easedPercentage = easeOutCubic(percentage);
            
            progressBar.style.width = (easedPercentage * targetWidth) + '%';
            
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function animateRoadmap() {
        if (isElementInViewport(roadmapContainer) && !roadmapContainer.classList.contains('visible')) {
            roadmapContainer.classList.add('visible');
            setTimeout(() => {
                animateProgressBar(2000, 21); // 2000ms duration, 25% target width
            }, 500);
        }
    }
    
    // Initial check
    animateRoadmap();
    
    // Check on scroll
    window.addEventListener('scroll', animateRoadmap);
});


const toolPanels = [
    {
        title: "Wallet Analysis",
        content: `With Pulse Tracker's wallet analysis, you can gain valuable data on a particular wallet, helping you discover successful wallets to copytrade and generate profits. Some of our features include:
        <ul>
            <li><strong>Win Rate:</strong> Measure the proportion of successful trades.</li>
            <li><strong>ROI (Return on Investment):</strong> Assess profitability over time.</li>
            <li><strong>Snipes:</strong> Identify precise and timely trades.</li>
            <li><strong>Trade Duration:</strong> Analyze how long trades are held.</li>
        </ul>`,
        videoUrl: "walletanalysis.mp4"
    },
    {
        title: "Multi-Wallet Analysis",
        content: `Streamline your analysis with Multi-Wallet Analysis. Compare up to 10 wallets simultaneously to gain a holistic view of trading patterns and performance. This feature simplifies bulk analysis, allowing you to:
        <ul>
            <li><strong>Efficiently Compare Key Statistics:</strong> View and compare essential data across multiple wallets.</li>
            <li><strong>Save Time:</strong> Conduct extensive analysis in a fraction of the time.</li>
            <li><strong>Identify Trends:</strong> Spot common strategies and trends among different wallets.</li>
        </ul>`,
        videoUrl: "multiwallet.mp4"
    },
    {
        title: "Top Trending Traders",
        content: `Discover the most successful traders with our Top Trending Traders tool. By inputting a mint address, you can uncover the top 10 traders associated with it. Benefit from:
        <ul>
            <li><strong>Comprehensive Insights:</strong> Receive analysis similar to Multi-Wallet Analysis.</li>
            <li><strong>Successful Trader Identification:</strong> Quickly identify and follow top performers.</li>
            <li><strong>Enhanced Decision-Making:</strong> Make informed decisions by observing leading traders’ strategies.</li>
        </ul>`,
        videoUrl: "toptrending.mp4"
    },
    {
        title: "Token Quality Analysis",
        content: `Evaluate wallet performance to find tokens with high potential for appreciation. Token Quality Analysis helps you:
        <ul>
            <li><strong>Assess Token Selection:</strong> Identify wallets that excel in choosing tokens likely to increase in value.</li>
            <li><strong>Follow Top Performers:</strong> Discover and emulate the strategies of high-performing wallets.</li>
            <li><strong>Predict Future Value:</strong> Improve your investment strategy by analyzing successful token selections.</li>
        </ul>`,
        videoUrl: "tokenquality.mp4"
    }
];

function createToolPanels() {
  const toolLeftPanel = document.getElementById('tool-left-panel');
  toolPanels.forEach((toolPanel, index) => {
    const toolButton = document.createElement('button');
    toolButton.className = 'tool-button';
    toolButton.textContent = toolPanel.title;
    toolButton.onclick = () => toggleToolPanel(index);
    toolButton.style.fontFamily = 'inherit';

    const toolContent = document.createElement('div');
    toolContent.className = 'tool-content';
    toolContent.id = `tool-${index}`;
    toolContent.innerHTML = toolPanel.content;
    toolContent.style.fontFamily = 'inherit';

    toolLeftPanel.appendChild(toolButton);
    toolLeftPanel.appendChild(toolContent);
  });
}

function toggleToolPanel(toolIndex) {
  const toolButtons = document.querySelectorAll('.tool-button');
  const toolContents = document.querySelectorAll('.tool-content');
  const toolVideoContainer = document.getElementById('tool-video-container');

  // Check if the clicked button is already active
  if (toolButtons[toolIndex].classList.contains('active')) {
    return; // Exit the function if the button is already active
  }

  // Fade out all tool panels and remove active class
  toolPanels.forEach((_, i) => {
    toolButtons[i].classList.remove('active');
    toolContents[i].classList.remove('active');
  });

  // Fade out current video
  fadeOut(toolVideoContainer);

  // After a short delay, update content and fade in
  setTimeout(() => {
    // Update active states
    toolButtons[toolIndex].classList.add('active');
    toolContents[toolIndex].classList.add('active');

    // Update and fade in the new video
    updateVideo(toolPanels[toolIndex].videoUrl);
    fadeIn(toolVideoContainer);
  }, 300); // This delay should match the fade-out duration in CSS
}

function fadeOut(element) {
  element.style.opacity = '0';
}

function fadeIn(element) {
  element.style.opacity = '1';
}

function updateVideo(videoUrl) {
  const toolVideoContainer = document.getElementById('tool-video-container');
  const existingVideo = toolVideoContainer.querySelector('video');

  if (existingVideo) {
    const source = existingVideo.querySelector('source');
    source.src = videoUrl;
    existingVideo.load();
    existingVideo.play();
  } else {
    toolVideoContainer.innerHTML = `
      <video width="100%" autoplay loop muted> <!-- Added muted attribute -->
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    const video = toolVideoContainer.querySelector('video');
    video.addEventListener('loadeddata', () => {
      video.play();
    });
  }
}

// Create tool panels when the page loads
createToolPanels();

// Show the first tool panel and video by default
toggleToolPanel(0);