const COMMISSIONS = [
  {
    id: 'montecito',
    category: 'mediterranean',
    title: 'Villa Calafia Courtyard Estate',
    location: 'Montecito · Santa Barbara County, CA',
    tag: 'Mediterranean Revival',
    scale: '1:100 · 8.4" Plinth',
    image: 'assets/commissions/montecito-villa-calafia.jpg',
    plaque: '405 TORO CANYON • VILLA CALAFIA',
    notes: 'Reconstructed from aerial orthophotos and listing elevations: hand-toned clay barrel tile roofs, arched loggias, tiered limestone courtyard fountain, and manicured Italian cypress and olive grove.'
  },
  {
    id: 'hollywood-hills',
    category: 'midcentury',
    title: 'Laurel Canyon Post-and-Beam Pavilion',
    location: 'Hollywood Hills · Los Angeles, CA',
    tag: 'Mid-Century Modern',
    scale: '1:100 · 8.2" Plinth',
    image: 'assets/commissions/hollywood-hills-midcentury.jpg',
    plaque: '8559 EDWIN DRIVE • LOS ANGELES',
    notes: 'Low-slung gabled roof with exposed ridge beams, stacked canyon stonework, warm glazed interior apertures, cantilevered entry steps, and specimen California olive trees.'
  },
  {
    id: 'laguna-beach',
    category: 'coastal',
    title: 'South Laguna Coastal Turret Residence',
    location: 'Laguna Beach · Orange County, CA',
    tag: 'Coastal French-Tudor',
    scale: '1:100 · 8.0" Plinth',
    image: 'assets/commissions/laguna-sea-castle.jpg',
    plaque: '31971 COAST HWY • SEA CASTLE',
    notes: 'Iconic oceanfront landmark featuring a conical shingled stone turret with copper finial, half-timbered gables, flower-box dormers, and coastal palm landscaping.'
  },
  {
    id: 'san-clemente',
    category: 'coastal',
    title: 'Paseo De Cristobal Bluff Villa',
    location: 'San Clemente · Orange County, CA',
    tag: 'Spanish Colonial',
    scale: '1:100 · 8.5" Plinth',
    image: 'assets/commissions/san-clemente-villa.jpg',
    plaque: '342 W PASEO DE CRISTOBAL',
    notes: 'Two-story coastal Spanish villa with wrought-iron second-floor balcony, brick-pillared rooftop belvedere, courtyard water feature, and miniature woven patio lounge seating.'
  },
  {
    id: 'palos-verdes',
    category: 'mediterranean',
    title: 'Paseo Del Mar Blufftop Estate',
    location: 'Palos Verdes Estates · Los Angeles, CA',
    tag: 'Classical Mediterranean',
    scale: '1:100 · 8.8" Plinth',
    image: 'assets/commissions/palos-verdes-estate.jpg',
    plaque: '612 PASEO DEL MAR • PALOS VERDES',
    notes: 'Grand columned entry portico with curved stone balustrade, travertine pool terrace with miniature resort umbrellas, outdoor dining pavilion, and mature coastal live oak.'
  },
  {
    id: 'la-jolla',
    category: 'coastal',
    title: 'Roseland Courtyard & Pool Pavilion',
    location: 'La Jolla · San Diego, CA',
    tag: 'Coastal Resort Villa',
    scale: '1:100 · 8.3" Plinth',
    image: 'assets/commissions/la-jolla-courtyard.jpg',
    plaque: '7970 ROSELAND DR • LA JOLLA',
    notes: 'Indoor-outdoor courtyard study highlighting translucent UV-cured pool water, submerged Baja tanning shelf loungers, outdoor sectional, and red clay roof tiles.'
  },
  {
    id: 'santa-monica',
    category: 'mediterranean',
    title: 'North of Montana Spanish Residence',
    location: 'Santa Monica · Westside Los Angeles, CA',
    tag: 'Spanish Revival',
    scale: '1:100 · 8.0" Plinth',
    image: 'assets/commissions/santa-monica-spanish.jpg',
    plaque: '423 22ND STREET · SANTA MONICA',
    notes: 'Commissioned as a 20-year seller legacy keepsake: crisp white smooth stucco, terracotta barrel tiles, wrought-iron Juliet balcony, stone entry walk, and flanking shade trees.'
  },
  {
    id: 'manhattan-beach',
    category: 'midcentury',
    title: 'Tree Section Contemporary Residence',
    location: 'Manhattan Beach · South Bay, CA',
    tag: 'Coastal Contemporary',
    scale: '1:100 · 7.9" Plinth',
    image: 'assets/commissions/manhattan-beach-modern.jpg',
    plaque: '657 27TH STREET • EST. NOV 2026',
    notes: 'Clean coastal contemporary massing with charcoal architectural trim, recessed entry lanterns, second-story ironwork balcony, and custom facade house numbering.'
  }
];

const HERO_SLIDES = [
  COMMISSIONS[0],
  COMMISSIONS[1],
  COMMISSIONS[2],
  COMMISSIONS[4]
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Showcase Switcher
  const heroImg = document.getElementById('heroMainImage');
  const heroBadge = document.getElementById('heroBadge');
  const heroTitle = document.getElementById('heroCaptionTitle');
  const heroMeta = document.getElementById('heroCaptionMeta');
  const thumbBtns = document.querySelectorAll('.hero-thumb');

  thumbBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const slide = HERO_SLIDES[idx];
      if (!slide) return;
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      heroImg.style.opacity = '0.35';
      setTimeout(() => {
        heroImg.src = slide.image;
        heroImg.alt = `${slide.title} — 1:100 Bespoke Architectural Scale Model`;
        heroBadge.textContent = `${slide.tag} · ${slide.scale}`;
        heroTitle.textContent = slide.title;
        heroMeta.textContent = slide.location;
        heroImg.style.opacity = '1';
      }, 140);
    });
  });

  // 2. Render Commissions Gallery & Filter
  const galleryGrid = document.getElementById('galleryGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderGallery(filter = 'all') {
    const items = filter === 'all'
      ? COMMISSIONS
      : COMMISSIONS.filter(item => item.category === filter);

    galleryGrid.innerHTML = items.map(item => `
      <article class="commission-card" data-id="${item.id}" tabindex="0" role="button" aria-label="Inspect ${item.title}">
        <div class="commission-img">
          <img src="${item.image}" alt="${item.title} — 1:100 Architectural Scale Model on American Black Walnut" loading="lazy" />
          <span class="commission-tag">${item.tag}</span>
        </div>
        <div class="commission-body">
          <span class="commission-loc">${item.location}</span>
          <div class="commission-title-row">
            <h3>${item.title}</h3>
            <span class="commission-scale">${item.scale}</span>
          </div>
          <p class="commission-notes">${item.notes}</p>
          <div class="commission-plaque-line">
            <span>Engraved Brass Plate: <strong>${item.plaque}</strong></span>
            <span>Inspect →</span>
          </div>
        </div>
      </article>
    `).join('');

    galleryGrid.querySelectorAll('.commission-card').forEach(card => {
      const openCard = () => openLightbox(card.dataset.id);
      card.addEventListener('click', openCard);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCard();
        }
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.filter);
    });
  });

  renderGallery('all');

  // 3. Lightbox Modal
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImage');
  const lbLoc = document.getElementById('lbLocation');
  const lbTitle = document.getElementById('lbTitle');
  const lbNotes = document.getElementById('lbNotes');
  const lbScale = document.getElementById('lbScale');
  const lbPlaque = document.getElementById('lbPlaque');
  const lbClose = document.getElementById('lbClose');
  const lbRequestBtn = document.getElementById('lbRequestBtn');

  function openLightbox(id) {
    const item = COMMISSIONS.find(c => c.id === id);
    if (!item) return;
    lbImg.src = item.image;
    lbImg.alt = item.title;
    lbLoc.textContent = item.location;
    lbTitle.textContent = item.title;
    lbNotes.textContent = item.notes;
    lbScale.textContent = item.scale;
    lbPlaque.textContent = item.plaque;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
  lbRequestBtn.addEventListener('click', () => {
    closeLightbox();
    document.getElementById('commission').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('propAddress')?.focus(), 450);
  });

  // 4. Interactive Dual Brass Plaque Previewer
  const frontInput = document.getElementById('plaqueFrontInput');
  const underInput = document.getElementById('plaqueUnderInput');
  const frontPreview = document.getElementById('plaqueFrontPreview');
  const underPreview = document.getElementById('plaqueUnderPreview');

  frontInput?.addEventListener('input', () => {
    const val = frontInput.value.trim();
    frontPreview.textContent = val || '1517 FALLING STAR AVE • EST. NOV 2026';
  });

  underInput?.addEventListener('input', () => {
    const val = underInput.value.trim();
    underPreview.textContent = val || 'Compliments of Your Name · Luxury Real Estate';
  });

  // 5. FAQ Accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  // 6. Concierge 360° Digital Proof Request Builder
  const form = document.getElementById('proofRequestForm');
  const copyBtn = document.getElementById('copyBriefBtn');
  const copyToast = document.getElementById('copyToast');

  function buildProofEmailParts() {
    const address = document.getElementById('propAddress').value.trim() || '[Property Street Address, City, CA]';
    const agentName = document.getElementById('agentName').value.trim() || '[Your Name & Brokerage]';
    const occasion = document.getElementById('giftOccasion').value;
    const inscription = document.getElementById('plaqueInscription').value.trim() || 'Standard Street Address + Closing Month/Year';
    const notes = document.getElementById('specialNotes').value.trim();

    const subject = `360° Proof Request — ${address}`;
    const lines = [
      `Hi Evan,`,
      ``,
      `Please prepare a complimentary 360° digital proof for the following property:`,
      ``,
      `• Property Address: ${address}`,
      `• Agent / Brokerage: ${agentName}`,
      `• Gift Occasion: ${occasion}`,
      `• Front Brass Plaque Inscription: ${inscription}`,
      `• Underside Attribution Plate: Compliments of ${agentName}`
    ];
    if (notes) {
      lines.push(`• Architectural / Delivery Notes: ${notes}`);
    }
    lines.push(
      ``,
      `Please send over the interactive 360° proof once ready.`,
      ``,
      `Best regards,`,
      agentName
    );
    return { subject, body: lines.join('\n') };
  }

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const { subject, body } = buildProofEmailParts();
    const mailto = `mailto:evan@hearthscalestudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });

  copyBtn?.addEventListener('click', async () => {
    const { subject, body } = buildProofEmailParts();
    const payload = `To: evan@hearthscalestudio.com\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(payload);
      copyToast.textContent = 'Copied studio email (evan@hearthscalestudio.com) & formatted commission brief to clipboard.';
      copyToast.classList.add('visible');
      setTimeout(() => copyToast.classList.remove('visible'), 5000);
    } catch {
      copyToast.textContent = 'Direct studio email: evan@hearthscalestudio.com';
      copyToast.classList.add('visible');
    }
  });
});
