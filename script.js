/* ==========================================================================
   ITINERA - Production Core Application Script
   Created by Rahul Mahto
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    theme: localStorage.getItem('itinera_theme') || 'dark',
    currentView: 'dashboard',
    month: 'September',
    savedIds: JSON.parse(localStorage.getItem('itinera_saved')) || [],
    rainEffect: true,
    activeTab: 'popular',
    filteredDestinations: [...DESTINATIONS_DATABASE]
  };

  // DOM Elements Selector
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  /* ------------------------------------------------------------------------
     1. Theme Engine & Switcher
     ------------------------------------------------------------------------ */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('itinera_theme', theme);
  }

  applyTheme(state.theme);

  $('#themeToggleBtn').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${state.theme.toUpperCase()} mode`);
  });

  $('#themeToggleNav').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${state.theme.toUpperCase()} mode`);
  });

  /* ------------------------------------------------------------------------
     2. Navigation & View Routing
     ------------------------------------------------------------------------ */
  const navItems = $$('.sidebar-nav .nav-item[data-view]');
  const viewPanels = $$('.view-panel');

  function switchView(viewName) {
    state.currentView = viewName;
    navItems.forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewName);
    });

    viewPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `view-${viewName}`);
    });

    // Close mobile sidebar if open
    $('#sidebar').classList.remove('mobile-open');
    $('#sidebarOverlay').classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => switchView(item.dataset.view));
  });

  // Mobile Drawer Toggle
  $('#openSidebarBtn').addEventListener('click', () => {
    $('#sidebar').classList.add('mobile-open');
    $('#sidebarOverlay').classList.add('active');
  });

  $('#closeSidebarBtn').addEventListener('click', () => {
    $('#sidebar').classList.remove('mobile-open');
    $('#sidebarOverlay').classList.remove('active');
  });

  $('#sidebarOverlay').addEventListener('click', () => {
    $('#sidebar').classList.remove('mobile-open');
    $('#sidebarOverlay').classList.remove('active');
  });

  /* ------------------------------------------------------------------------
     3. Card Rendering Engine
     ------------------------------------------------------------------------ */
  function createDestinationCard(dest) {
    const isSaved = state.savedIds.includes(dest.id);
    return `
      <div class="card" data-id="${dest.id}">
        <div class="card-img-wrapper">
          <img src="${dest.image}" alt="${dest.name}" loading="lazy">
          <span class="card-badge">${dest.tag}</span>
        </div>
        <div class="card-body">
          <span class="card-state">${dest.state}</span>
          <h3 class="card-title">${dest.name}</h3>
          <div class="card-details">
            <span>⏱ ${dest.duration}</span>
            <span class="card-price">From ₹${dest.budget.toLocaleString('en-IN')}</span>
          </div>
          <div class="card-footer-action">
            <button class="btn btn-accent explore-btn" onclick="openDestinationModal(${dest.id})">Explore</button>
            <button class="btn btn-ghost save-btn" onclick="toggleSaveTrip(event, ${dest.id})">
              ${isSaved ? '❤️' : '♡'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
     4. Dashboard View Rendering
     ------------------------------------------------------------------------ */
  function renderDashboard() {
    // 3 Featured Cards
    const featured = DESTINATIONS_DATABASE.slice(0, 3);
    $('#featuredGrid').innerHTML = featured.map(createDestinationCard).join('');

    // Tab Grid
    renderDashTabGrid();

    // Render Calendar
    renderCalendar();

    // Render Rail Saved List
    renderRailSavedList();
  }

  function renderDashTabGrid() {
    let list = [...DESTINATIONS_DATABASE];
    if (state.activeTab === 'popular') list.sort((a,b) => b.popularScore - a.popularScore);
    if (state.activeTab === 'value') list.sort((a,b) => a.budget - b.budget);
    if (state.activeTab === 'green') list.sort((a,b) => b.greenScore - a.greenScore);

    $('#dashTabGrid').innerHTML = list.slice(0, 4).map(createDestinationCard).join('');
  }

  $$('.tabs-bar .tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      $$('.tabs-bar .tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.activeTab = e.target.dataset.tab;
      renderDashTabGrid();
    });
  });

  // Calendar Engine
  function renderCalendar() {
    const daysContainer = $('#calendarDays');
    daysContainer.innerHTML = '';
    // Generate simple 30 days for September 2026 (Starts on Tuesday = offset 2)
    for(let i = 0; i < 2; i++) {
      daysContainer.innerHTML += `<div class="cal-day empty"></div>`;
    }
    for(let day = 1; day <= 30; day++) {
      const isActive = day === 15 ? 'active' : '';
      daysContainer.innerHTML += `<div class="cal-day ${isActive}">${day}</div>`;
    }
  }

  // Rail Saved List
  function renderRailSavedList() {
    const container = $('#railSavedList');
    const savedDestinations = DESTINATIONS_DATABASE.filter(d => state.savedIds.includes(d.id));

    if (savedDestinations.length === 0) {
      container.innerHTML = `<p class="empty-text">No saved trips yet<br><small>Open a destination and tap Save.</small></p>`;
      return;
    }

    container.innerHTML = savedDestinations.slice(0, 3).map(dest => `
      <div class="mini-saved-item" onclick="openDestinationModal(${dest.id})">
        <img class="mini-saved-img" src="${dest.image}" alt="${dest.name}">
        <div class="mini-saved-info">
          <div class="mini-saved-title">${dest.name}</div>
          <div class="mini-saved-sub">${dest.state} · ₹${dest.budget.toLocaleString('en-IN')}</div>
        </div>
      </div>
    `).join('');
  }

  /* ------------------------------------------------------------------------
     5. Discover View & Filters Engine
     ------------------------------------------------------------------------ */
  // Populate States Dropdown
  const stateSelect = $('#filterState');
  INDIAN_STATES_UT.forEach(st => {
    const opt = document.createElement('option');
    opt.value = st;
    opt.textContent = st;
    stateSelect.appendChild(opt);
  });

  function applyDiscoverFilters() {
    const selectedMonth = $('#filterMonth').value;
    const selectedState = $('#filterState').value;
    const selectedVibe = $('#filterVibe').value;
    const maxBudget = parseInt($('#filterBudget').value);
    const sortBy = $('#sortSelect').value;

    let filtered = DESTINATIONS_DATABASE.filter(dest => {
      if (selectedState !== 'all' && dest.state !== selectedState) return false;
      if (dest.budget > maxBudget) return false;
      if (selectedVibe !== 'all' && !dest.travelStyle.includes(selectedVibe) && dest.tag !== selectedVibe) return false;
      return true;
    });

    // Sorting
    if (sortBy === 'budget-asc') filtered.sort((a,b) => a.budget - b.budget);
    if (sortBy === 'rating-desc') filtered.sort((a,b) => b.rating - a.rating);

    state.filteredDestinations = filtered;
    $('#resultsCount').textContent = `Showing ${filtered.length} places`;

    const grid = $('#discoverGrid');
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 0; color: var(--text-muted);">
          <h3>No places match your filters.</h3>
          <p>Try raising your budget or selecting a different month/vibe.</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(createDestinationCard).join('');
    }
  }

  // Filter Listeners
  $('#filterMonth').addEventListener('change', applyDiscoverFilters);
  $('#filterState').addEventListener('change', applyDiscoverFilters);
  $('#filterVibe').addEventListener('change', applyDiscoverFilters);
  $('#filterBudget').addEventListener('input', (e) => {
    $('#budgetValue').textContent = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
    applyDiscoverFilters();
  });
  $('#sortSelect').addEventListener('change', applyDiscoverFilters);

  $$('.chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $('#filterVibe').value = btn.dataset.vibe;
      applyDiscoverFilters();
    });
  });

  $('#resetFiltersBtn').addEventListener('click', () => {
    $('#filterMonth').value = 'September';
    $('#filterState').value = 'all';
    $('#filterVibe').value = 'all';
    $('#filterBudget').value = 250000;
    $('#budgetValue').textContent = '₹2,50,000';
    $$('.chip-btn').forEach(b => b.classList.remove('active'));
    applyDiscoverFilters();
  });

  /* ------------------------------------------------------------------------
     6. Trip Planner Engine (Day-by-Day Roadmap)
     ------------------------------------------------------------------------ */
  const planDestSelect = $('#planDestination');
  DESTINATIONS_DATABASE.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = `${d.name} (${d.state})`;
    planDestSelect.appendChild(opt);
  });

  $('#plannerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const destId = parseInt($('#planDestination').value);
    const days = parseInt($('#planDays').value);
    const style = $('#planStyle').value;
    const budget = $('#planBudget').value;

    const dest = DESTINATIONS_DATABASE.find(d => d.id === destId);
    generateRoadmap(dest, days, style, budget);
  });

  function generateRoadmap(dest, days, style, budgetTier) {
    const header = $('#roadmapHeader');
    header.innerHTML = `
      <h3>${days}-Day ${style} Roadmap for ${dest.name}</h3>
      <p>Customized for <strong>${budgetTier} Tier</strong> · Estimated Starting Budget: ₹${(dest.budget * (days/3)).toLocaleString('en-IN')}</p>
    `;

    const nodesContainer = $('#roadmapNodes');
    nodesContainer.innerHTML = '';

    const stepTypes = [
      { icon: '⌖', title: 'Arrival & Atmosphere Setup', desc: `Check-in to local ${dest.stayType}. Evening stroll around primary scenic vantage points.` },
      { icon: '◒', title: 'Deep Discovery & Trails', desc: `Full day immersive exploration of core sights, local trails, and cultural landmarks.` },
      { icon: '🍛', title: 'Culinary & Culture Focus', desc: `Savor authentic local food (${dest.foodCue}). Visit artisan markets and local homestays.` },
      { icon: '✦', title: 'Hidden Gems & Scenic Vistas', desc: `Off-beat trip to surrounding secret spots and panoramic viewpoints.` },
      { icon: '☕', title: 'Slow Pace & Relaxation', desc: `Leisurely morning with coffee/tea. Wellness and local community interaction.` },
      { icon: '⌂', title: 'Local Life & Craft Immersion', desc: `Engage with regional artisans, heritage sites, and local markets.` },
      { icon: '→', title: 'Departure & Memories', desc: `Final local breakfast, souvenir shopping, and departure transfer.` }
    ];

    for(let i = 1; i <= days; i++) {
      const step = stepTypes[(i - 1) % stepTypes.length];
      nodesContainer.innerHTML += `
        <div class="node-item">
          <div class="node-icon">${step.icon}</div>
          <div class="node-content">
            <div class="node-title">DAY ${i} — ${step.title}</div>
            <div class="node-desc">${step.desc}</div>
            <div class="node-meta">
              <span>📍 ${dest.name}</span>
              <span>🍲 ${dest.foodCue}</span>
              <span>🚗 Local Transport Included</span>
            </div>
          </div>
        </div>
      `;
    }

    showToast(`Generated ${days}-day roadmap for ${dest.name}!`);
  }

  /* ------------------------------------------------------------------------
     7. Saved Trips Engine
     ------------------------------------------------------------------------ */
  window.toggleSaveTrip = function(e, id) {
    e.stopPropagation();
    const index = state.savedIds.indexOf(id);
    if (index > -1) {
      state.savedIds.splice(index, 1);
      showToast('Removed from Saved Trips');
    } else {
      state.savedIds.push(id);
      showToast('Saved to your shortlist! ❤️');
    }

    localStorage.setItem('itinera_saved', JSON.stringify(state.savedIds));
    $('#savedBadge').textContent = state.savedIds.length;

    // Refresh UI Components
    renderDashboard();
    renderSavedView();
    applyDiscoverFilters();
  };

  function renderSavedView() {
    const container = $('#savedGrid');
    const savedDestinations = DESTINATIONS_DATABASE.filter(d => state.savedIds.includes(d.id));

    if (savedDestinations.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-muted);">
          <h3>No saved trips yet.</h3>
          <p>Explore destinations and tap the heart icon to save them here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = savedDestinations.map(createDestinationCard).join('');
  }

  /* ------------------------------------------------------------------------
     8. India Atlas & Travel Films View Generators
     ------------------------------------------------------------------------ */
  function renderAtlas() {
    const atlasData = GENERATE_ALL_REGIONS();
    $('#atlasGrid').innerHTML = atlasData.map(reg => `
      <div class="state-card">
        <div>
          <div class="state-title">${reg.state}</div>
          <div class="state-dest-list">
            ${reg.destinations.map(d => `• ${d.name || d}`).join('<br>')}
          </div>
        </div>
        <button class="btn btn-outline" onclick="filterByStateFromAtlas('${reg.state}')">Explore State &rarr;</button>
      </div>
    `).join('');
  }

  window.filterByStateFromAtlas = function(stateName) {
    switchView('discover');
    $('#filterState').value = stateName;
    applyDiscoverFilters();
  };

  function renderFilms() {
    $('#filmsGrid').innerHTML = DESTINATIONS_DATABASE.map(d => `
      <div class="film-card">
        <div class="film-thumb">
          <img src="${d.image}" alt="${d.name}">
          <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(d.youtubeQuery)}" target="_blank" class="play-btn">▶</a>
        </div>
        <div class="film-body">
          <div class="card-state">${d.state}</div>
          <h3 class="card-title">${d.name}</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary);">${d.stayType} · ${d.bestTravelWindow}</p>
        </div>
      </div>
    `).join('');
  }

  /* ------------------------------------------------------------------------
     9. Modal Dialogs Engine
     ------------------------------------------------------------------------ */
  window.openDestinationModal = function(id) {
    const dest = DESTINATIONS_DATABASE.find(d => d.id === id);
    if (!dest) return;

    $('#modalImg').src = dest.image;
    $('#modalTag').textContent = dest.tag.toUpperCase();
    $('#modalState').textContent = dest.state;
    $('#modalTitle').textContent = dest.name;
    $('#modalRating').textContent = `★ ${dest.rating}`;
    $('#modalDesc').textContent = `${dest.name} in ${dest.state} offers an exceptional escape characterized by ${dest.travelStyle.join(', ')} experiences. Ideal for travelers seeking a balance of authenticity, comfort, and natural beauty.`;
    $('#modalBudget').textContent = `₹${dest.budget.toLocaleString('en-IN')}`;
    $('#modalWindow').textContent = dest.bestTravelWindow;
    $('#modalStay').textContent = dest.stayType;
    $('#modalFood').textContent = dest.foodCue;

    $('#modalYtBtn').href = `https://www.youtube.com/results?search_query=${encodeURIComponent(dest.youtubeQuery)}`;
    
    $('#modalPlanBtn').onclick = () => {
      closeModal();
      switchView('planner');
      $('#planDestination').value = dest.id;
    };

    const isSaved = state.savedIds.includes(dest.id);
    $('#modalSaveBtn').textContent = isSaved ? '❤️ Saved' : '♡ Save';
    $('#modalSaveBtn').onclick = (e) => {
      toggleSaveTrip(e, dest.id);
      const updatedIsSaved = state.savedIds.includes(dest.id);
      $('#modalSaveBtn').textContent = updatedIsSaved ? '❤️ Saved' : '♡ Save';
    };

    $('#destModal').classList.add('active');
  };

  function closeModal() {
    $('#destModal').classList.remove('active');
    $('#aboutModal').classList.remove('active');
  }

  $('#modalCloseBtn').addEventListener('click', closeModal);
  $('#aboutCloseBtn').addEventListener('click', closeModal);
  $('#destModal').addEventListener('click', (e) => {
    if (e.target === $('#destModal')) closeModal();
  });
  $('#aboutModal').addEventListener('click', (e) => {
    if (e.target === $('#aboutModal')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '/' && document.activeElement !== $('#globalSearchInput')) {
      e.preventDefault();
      $('#globalSearchInput').focus();
    }
  });

  $('#aboutBtn').addEventListener('click', () => {
    $('#aboutModal').classList.add('active');
  });

  /* ------------------------------------------------------------------------
     10. Global Search Input Functionality
     ------------------------------------------------------------------------ */
  const globalSearch = $('#globalSearchInput');
  const searchDropdown = $('#searchResultsDropdown');

  globalSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      searchDropdown.classList.remove('active');
      return;
    }

    const matches = DESTINATIONS_DATABASE.filter(d => 
      d.name.toLowerCase().includes(query) || 
      d.state.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div class="search-item"><span>No matching destinations found</span></div>`;
    } else {
      searchDropdown.innerHTML = matches.map(d => `
        <div class="search-item" onclick="openDestinationModal(${d.id})">
          <div>
            <strong>${d.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${d.state}</div>
          </div>
          <span style="font-size:0.8rem; font-weight:700;">₹${d.budget.toLocaleString('en-IN')}</span>
        </div>
      `).join('');
    }

    searchDropdown.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      searchDropdown.classList.remove('active');
    }
  });

  /* ------------------------------------------------------------------------
     11. Interactive Buttons & Toast Helpers
     ------------------------------------------------------------------------ */
  $('#surpriseMeBtn').addEventListener('click', () => {
    const randomDest = DESTINATIONS_DATABASE[Math.floor(Math.random() * DESTINATIONS_DATABASE.length)];
    openDestinationModal(randomDest.id);
  });

  $('#dashSeeAllLink').addEventListener('click', () => switchView('atlas'));
  $('#railViewSaved').addEventListener('click', () => switchView('saved'));
  $('#promoBuildBtn').addEventListener('click', () => switchView('planner'));
  $('#notificationBtn').addEventListener('click', () => showToast('No new travel alerts at this time.'));

  function showToast(msg) {
    const container = $('#toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /* ------------------------------------------------------------------------
     12. Seasonal Canvas Atmosphere Engine (Rain Effect)
     ------------------------------------------------------------------------ */
  const canvas = $('#atmosphereCanvas');
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const raindrops = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 20 + 10,
    speed: Math.random() * 10 + 5,
    opacity: Math.random() * 0.4 + 0.1
  }));

  function renderRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!state.rainEffect) return;

    ctx.strokeStyle = state.theme === 'dark' ? 'rgba(204, 255, 0, 0.4)' : 'rgba(27, 77, 62, 0.3)';
    ctx.lineWidth = 1.2;

    raindrops.forEach(drop => {
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;
      if (drop.y > canvas.height) {
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    });

    animationFrameId = requestAnimationFrame(renderRain);
  }

  $('#atmosphereToggle').addEventListener('click', () => {
    state.rainEffect = !state.rainEffect;
    $('#atmosphereToggle').textContent = state.rainEffect ? '☔ Rain ON' : '☔ Rain OFF';
    if (state.rainEffect) renderRain();
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  renderRain();

  /* ------------------------------------------------------------------------
     13. Initial Boot Sequence
     ------------------------------------------------------------------------ */
  $('#savedBadge').textContent = state.savedIds.length;
  renderDashboard();
  applyDiscoverFilters();
  renderAtlas();
  renderFilms();
});