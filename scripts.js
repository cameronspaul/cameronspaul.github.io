document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  mobileMenu.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });
});



function toggleMobileNav() {
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileNav.classList.contains('show')) {
      // If menu is visible, collapse it
      mobileNav.classList.remove('show');
      // Delay setting display to 'none' to allow transition to finish

  } else {
      // If menu is not visible, show it
      mobileNav.style.display = 'flex';
      // Use requestAnimationFrame to ensure layout is updated
      requestAnimationFrame(() => {
          mobileNav.classList.add('show');
      });
  }
}

const mobileNav = document.querySelector('.mobile-nav');
const hamburger = document.querySelector('.hamburger-menu');

hamburger.addEventListener('click', () => {
    if (mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        mobileNav.classList.add('close');
    } else {
        mobileNav.classList.remove('close');
        mobileNav.classList.add('open');
    }
});

document.addEventListener("DOMContentLoaded", function() {
  // Check if the user is on a mobile device
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  
  // Define offsets for mobile and desktop
  const mobileOffset = 170; // Adjust this value for mobile
  const desktopOffset = 40; // Adjust this value for desktop
  
  // Select the navigation links
  const navLinks = document.querySelectorAll('nav ul li a, .cta-button, .plan-button, .mobile-nav a');

  // Attach event listeners to links
  navLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href').startsWith('http')) {
              // Skip smooth scrolling for external links
              return;
          }

          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
              // Determine which offset to use
              const headerOffset = document.querySelector('header').offsetHeight;
              const additionalOffset = isMobile ? mobileOffset : desktopOffset;
              const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
              const offsetPosition = elementPosition - headerOffset - additionalOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const featureToggles = document.querySelectorAll('.feature-toggle');
  
  featureToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const listItem = this.closest('li');
      const description = listItem.querySelector('.feature-description');

      if (listItem.classList.contains('feature-active')) {
        description.style.maxHeight = `${description.scrollHeight}px`;
        setTimeout(() => {
          listItem.classList.remove('feature-active');
          description.style.maxHeight = '0';
        }, 10);
      } else {
        listItem.classList.add('feature-active');
        description.style.maxHeight = `${description.scrollHeight}px`;
        description.addEventListener('transitionend', function() {
          if (listItem.classList.contains('feature-active')) {
            description.style.maxHeight = 'none';
          }
        }, { once: true });
      }
    });
  });
});


function fetchSolanaPrice() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const solPrice = data.solana.usd;
      updateSolPrices(solPrice);
    })
    .catch(error => console.error('Error fetching Solana price:', error));
}

function updateSolPrices(solPrice) {
  const plans = [
    { id: 'basic', usdPrice: 15, oldUsdPrice: 26 },
    { id: 'standard', usdPrice: 20, oldUsdPrice: 35 },
    { id: 'premium', usdPrice: 29, oldUsdPrice: 50 }
  ];

  plans.forEach(plan => {
    const planElement = document.querySelector(`#plan-${plan.id}`);
    const newSolPrice = (plan.usdPrice / solPrice).toFixed(3);
    const oldSolPrice = (plan.oldUsdPrice / solPrice).toFixed(3);

    planElement.querySelector('.new-sol-price').textContent = `${newSolPrice}`;
    planElement.querySelector('.old-sol-price').textContent = `${oldSolPrice}`;
  });
}

function togglePrice() {
  const priceDisplays = document.querySelectorAll('.price-display');
  
  priceDisplays.forEach(display => {
    const usdPrice = display.querySelector('.usd-price');
    const solPrice = display.querySelector('.sol-price');
    
    usdPrice.classList.toggle('hidden');
    solPrice.classList.toggle('hidden');
    
    if (usdPrice.classList.contains('hidden')) {
      usdPrice.style.visibility = 'hidden';
      solPrice.style.visibility = 'visible';
    } else {
      usdPrice.style.visibility = 'visible';
      solPrice.style.visibility = 'hidden';
    }
  });
}

// Fetch Solana price and update prices on page load
fetchSolanaPrice();

// Toggle price every 4 seconds
setInterval(togglePrice, 8000);

// Refresh Solana price every 5 minutes
setInterval(fetchSolanaPrice, 300000);

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

            if ((elementBottomPosition >= windowTopPosition + windowHeight * 0) &&
                (elementTopPosition <= windowBottomPosition - windowHeight * 0)) {
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
                animateProgressBar(2000, 31); // 2000ms duration, 25% target width
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
    "title": "📊 Wallet PNL Analyzer",
    "content": `PulseTracker's Wallet PNL Analyzer revolutionizes copy trading by providing deep insights into wallet performance:

    <ul>
        <li><strong>Win Rate & ROI:</strong> Identify consistently profitable wallets</li>
        <li><strong>Transaction Analysis:</strong> Uncover successful trading patterns and frequencies</li>
        <li><strong>Portfolio Diversity:</strong> Assess risk management through token distribution</li>
        <li><strong>Trade Duration Metrics:</strong> Understand timing strategies for maximum gains</li>
        <li><strong>Profit Breakdown:</strong> Analyze performance across various profit ranges</li>
    </ul>

    Leverage these metrics to pinpoint wallets that combine strong performance with replicable strategies, maximizing your copy trading success.`,
    "videoUrl": "how_to_analyze_solana_wallet.mp4"
  },
  {
    "title": "🕵️‍♂️ Insider Scan",
    "content": `Our Insider Scan tool empowers you to detect potential insider trading activities:

    <ul>
        <li><strong>Token Lifecycle Analysis:</strong> Examine older tokens for suspicious price movements</li>
        <li><strong>Pattern Recognition:</strong> Identify unusual pumps and dumps indicative of insider knowledge</li>
        <li><strong>Wallet Behavior Tracking:</strong> Spot wallets profiting from unexpected market movements</li>
        <li><strong>Fund Tracing:</strong> Follow the money trail to uncover potential insider networks</li>
    </ul>

    Stay ahead of the market by identifying and potentially profiting from insider activities, while exercising caution and thorough research.`,
    "videoUrl": "how_to_find_insider_solana_wallets.mp4"
  },
  {
    "title": "❤️‍🔥 DEX Top Traders",
    "content": `Unlock the strategies of the most successful traders for any token:

    <ul>
        <li><strong>Easy Token Lookup:</strong> Quickly find mint addresses on DEX Screener</li>
        <li><strong>Top 10 Analysis:</strong> Use "/top MINT_ADDRESS" to reveal the best performers</li>
        <li><strong>In-depth Insights:</strong> Get comprehensive breakdowns of each top trader's strategy</li>
        <li><strong>Strategy Replication:</strong> Learn and adapt winning approaches to your own trading</li>
    </ul>

    Elevate your trading game by following and learning from the market's top performers, tailoring proven strategies to your portfolio.`,
    "videoUrl": "how_to_find_winning_wallets_dexscreener.mp4"
  },
  {
    "title": "📜 Multi-Wallet",
    "content": `Our Multi-Wallet Analysis tool revolutionizes your research process:

    <ul>
        <li><strong>Simultaneous Comparison:</strong> Analyze up to 10 wallets at once with "/list WALLET,WALLET,WALLET"</li>
        <li><strong>Comprehensive Metrics:</strong> Compare key performance indicators across multiple traders</li>
        <li><strong>Pattern Recognition:</strong> Identify common strategies among top performers</li>
        <li><strong>Time-Efficient Research:</strong> Conduct extensive analysis in minutes, not hours</li>
    </ul>

    Make data-driven decisions by efficiently comparing and contrasting multiple trading strategies, helping you construct a winning portfolio.`,
    "videoUrl": "how_to_analyze_mulitple_solana_wallets.mp4"
  },
  {
    "title": "💎 Token Quality Analysis",
    "content": `Discover high-potential tokens and evaluate wallet performance with our Token Quality Analysis:

    <ul>
        <li><strong>Success Metrics:</strong> Analyze token appreciation rates and ROI</li>
        <li><strong>Market Cap Insights:</strong> Understand growth patterns from purchase to ATH</li>
        <li><strong>Risk Assessment:</strong> Evaluate volatility and potential downsides</li>
        <li><strong>Top Performers:</strong> Identify the most profitable tokens in each wallet</li>
    </ul>

    Use "/quality WALLET" to gain crucial insights, enabling you to spot promising tokens early and make informed investment decisions.`,
    "videoUrl": "how_to_find_if_a_wallet_chooses_good_solana_tokens.mp4"
  },
  {
    "title": "📝 Excel Sheet Data",
    "content": `Our Excel Sheet Data provides unparalleled insights into trading strategies:

    <ul>
        <li><strong>Comprehensive Trade History:</strong> Access detailed records of every transaction</li>
        <li><strong>Profit Analysis:</strong> Examine exact profit margins and entry/exit points</li>
        <li><strong>Strategy Identification:</strong> Uncover patterns in successful trades</li>
        <li><strong>Performance Tracking:</strong> Monitor long-term wallet performance and consistency</li>
    </ul>

    Leverage this data to reverse-engineer successful strategies, optimize your own approach, and make data-driven decisions in the dynamic crypto market.`,
    "videoUrl": "get_an_excel_download_full_of_solana_trade_data.mp4"
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
  const isMobile = window.innerWidth <= 768;

  // Remove active class from all buttons and contents
  toolButtons.forEach(button => button.classList.remove('active'));
  toolContents.forEach(content => content.classList.remove('active'));

  // Add active class to clicked button and its content
  toolButtons[toolIndex].classList.add('active');
  toolContents[toolIndex].classList.add('active');

  // Update video for both desktop and mobile
  updateVideo(toolPanels[toolIndex].videoUrl, isMobile, toolContents[toolIndex]);
}

function updateVideo(videoUrl, isMobile, contentElement) {
  if (isMobile) {
    // Remove existing mobile video containers
    document.querySelectorAll('.mobile-video-container').forEach(container => {
      container.remove();
    });

    // Create new mobile video container
    const mobileVideoContainer = document.createElement('div');
    mobileVideoContainer.className = 'mobile-video-container';
    mobileVideoContainer.innerHTML = `
      <video width="100%" autoplay loop muted>
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;

    // Insert the video at the top of the content section
    contentElement.insertBefore(mobileVideoContainer, contentElement.firstChild);
  } else {
    // Desktop version
    const toolVideoContainer = document.getElementById('tool-video-container');
    toolVideoContainer.innerHTML = `
      <video width="100%" autoplay loop muted>
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }
}

// Create tool panels when the page loads
createToolPanels();

// Show the first tool panel and video by default
toggleToolPanel(0);

// Add resize event listener to handle transitions between mobile and desktop views
window.addEventListener('resize', () => {
  const activeIndex = Array.from(document.querySelectorAll('.tool-button')).findIndex(button => button.classList.contains('active'));
  if (activeIndex !== -1) {
    toggleToolPanel(activeIndex);
  }
});



// Set the date we're counting down to (e.g., November 5, 2024 23:59:59)
var countDownDate = new Date("Nov 8, 2024 23:59:59").getTime();
function padNumber(num) {
    return num.toString().padStart(2, '0');
}
function updateCountdown() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    } else {
        document.getElementById("countdown").innerHTML = `Ends in: <span>${padNumber(days)}</span>d <span>${padNumber(hours)}</span>h <span>${padNumber(minutes)}</span>m <span>${padNumber(seconds)}</span>s`;
    }
}
// Update the countdown every 1 second
var x = setInterval(updateCountdown, 1000);
// Initialize the countdown immediately
updateCountdown();