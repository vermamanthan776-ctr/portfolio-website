
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  function applyTheme(t) {
    if (t === 'light') html.classList.add('light');
    else html.classList.remove('light');
  }
  try {
    const saved = localStorage.getItem('manthan-theme');
    if (saved) applyTheme(saved);
  } catch (e) { /* ignore */ }

  function updateButton(isLight) {
    if (!toggle) return;
    toggle.textContent = isLight ? '☀️' : '🌙';
  }

  if (toggle) {
    updateButton(document.documentElement.classList.contains('light'));
    toggle.addEventListener('click', function() {
      const isLight = html.classList.toggle('light');
      try {
        localStorage.setItem('manthan-theme', isLight ? 'light' : 'dark');
      } catch (e) {}
      updateButton(isLight);
    });
  }

  document.addEventListener('keydown', function(e){ if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); if (toggle) toggle.click(); }});
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    function toggleMenu() {
      const isActive = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isActive);
      try { hamburger.setAttribute('aria-expanded', isActive); } catch (e) {}
    }

    hamburger.addEventListener('click', toggleMenu);


    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleMenu();
      }
    });

  
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        try { hamburger.setAttribute('aria-expanded', 'false'); } catch (e) {}
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const fileName = href.split('/').pop();
    const currentFile = currentPath.split('/').pop() || 'index_manthan.html';
    
    if (currentFile === fileName || (currentFile === '' && fileName === 'index_manthan.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      
      if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
      }

    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }

    
      if (name.length < 3) {
        showMessage('Name must be at least 3 characters long', 'error');
        return;
      }

      
      if (message.length < 10) {
        showMessage('Message must be at least 10 characters long', 'error');
        return;
      }

      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      
      setTimeout(function() {
        showMessage('Thanks for your message! I\'ll get back to you as soon as possible.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });

    function showMessage(msg, type) {
      if (formMessage) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        
        
        setTimeout(function() {
          formMessage.className = 'form-message';
        }, 5000);
      }
    }
  }
});


function setupScrollAnimations() {
  const elements = document.querySelectorAll(
    '.skill-category, .project-card, .stat-item'
  );
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

document.addEventListener('DOMContentLoaded', setupScrollAnimations);


function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.style.width;
        entry.target.style.width = '0';
        
        setTimeout(() => {
          entry.target.style.transition = 'width 1.5s ease';
          entry.target.style.width = targetWidth;
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
}

document.addEventListener('DOMContentLoaded', animateProgressBars);


let lastScrollY = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  lastScrollY = window.scrollY;
  
  if (lastScrollY > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});


if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}


document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }
});


window.addEventListener('load', function() {
  document.body.style.opacity = '1';
});

function updateViewportSize() {
  const width = window.innerWidth;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  window.deviceType = {
    isMobile,
    isTablet,
    isDesktop,
    width,
    height: window.innerHeight
  };
  
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (isDesktop && hamburger && navMenu) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

window.addEventListener('resize', updateViewportSize);
updateViewportSize();


document.addEventListener('touchstart', function() {
  
  document.body.classList.add('touch-device');
}, { passive: true });


function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    

    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', optimizeImages);


function optimizeForms() {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
       if (window.deviceType.isMobile) {
      input.style.minHeight = '44px';
      input.style.padding = '12px';
      input.style.fontSize = '16px'; 
    }
    
    
    input.addEventListener('focus', function() {
      this.parentElement.style.borderColor = 'var(--primary, #00d4ff)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.borderColor = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', optimizeForms);

function optimizeButtons() {
  const buttons = document.querySelectorAll('button, a.btn');
  
  buttons.forEach(btn => {
  
    const computedStyle = window.getComputedStyle(btn);
    const height = parseFloat(computedStyle.height);
    const width = parseFloat(computedStyle.width);
    
    if (height < 44) {
      btn.style.minHeight = '44px';
      btn.style.padding = btn.style.padding || '12px 20px';
    }
  });
}

document.addEventListener('DOMContentLoaded', optimizeButtons);

function setupMenuAnimation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {

    navMenu.style.transition = 'all 0.3s ease-out';
    
    hamburger.addEventListener('click', function() {
      const isActive = navMenu.classList.contains('active');
      
      if (isActive) {
        navMenu.style.opacity = '0';
        navMenu.style.pointerEvents = 'none';
      } else {
        navMenu.style.opacity = '1';
        navMenu.style.pointerEvents = 'auto';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', setupMenuAnimation);

function setupResponsiveGrids() {
  const grids = document.querySelectorAll('.projects-grid, .skill-cards, .about-grid, .about-stats');
  
  function updateGrid() {
    grids.forEach(grid => {
      if (window.deviceType.isMobile) {
        grid.style.gridTemplateColumns = '1fr';
      } else if (window.deviceType.isTablet) {
    
        if (grid.classList.contains('about-stats')) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (grid.classList.contains('skill-cards')) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
          grid.style.gridTemplateColumns = '1fr';
        }
      } else if (window.deviceType.isDesktop) {
  
        if (grid.classList.contains('skill-cards')) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        } else if (grid.classList.contains('projects-grid')) {
          grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (grid.classList.contains('about-stats')) {
          grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
      }
    });
  }
  
  window.addEventListener('resize', updateGrid);
  updateGrid();
}

document.addEventListener('DOMContentLoaded', setupResponsiveGrids);

// ===== RESPONSIVE VIEWPORT DEBUGGING (Optional) =====
// Uncomment to see current viewport info in console
// window.addEventListener('resize', function() {
//   console.log('Viewport:', window.deviceType);
// });

console.log('Manthan Verma Portfolio loaded successfully!');
console.log('✓ Responsive design features active');
