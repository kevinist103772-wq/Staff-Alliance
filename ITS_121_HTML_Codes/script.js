document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });


  const heading = document.getElementById('jobs-heading');
  if (heading) {
    const texts = ['Jobs for Filipinos', 'Jobs for everyone', 'Jobs for YOU'];
    let idx = 0;
    setInterval(() => {
      heading.classList.add('fade-out');
      setTimeout(() => {
        idx = (idx + 1) % texts.length;
        heading.textContent = texts[idx];
        heading.classList.remove('fade-out');
        heading.classList.add('fade-in');
        setTimeout(() => {
          heading.classList.remove('fade-in');
        }, 500);
      }, 250);
    }, 3000);
  }

  const searchInput = document.querySelector('.job-search input');
  const locationSelect = document.querySelector('.job-search select');
  const jobBoxes = document.querySelectorAll('.job-box');

  function filterJobs() {
    const term = searchInput ? searchInput.value.toLowerCase() : '';
    const loc = locationSelect ? locationSelect.value.toLowerCase() : '';
    jobBoxes.forEach(box => {
      const title = box.querySelector('.job-title').textContent.toLowerCase();
      const locations = box.dataset.locations || '';
      const matchesTerm = term === '' || title.includes(term);
      const matchesLoc = loc === '' || locations.includes(loc);
      box.style.display = matchesTerm && matchesLoc ? 'block' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterJobs);
  }
  if (locationSelect) {
    locationSelect.addEventListener('change', filterJobs);
  }
  if (jobBoxes.length && (searchInput || locationSelect)) {
    filterJobs();
  }

  jobBoxes.forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('expanded');
    });
  });
});