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

const STUDIO_ENDPOINTS = {
  formSubmitAjax: 'https://formsubmit.co/ajax/961998bba7f613d8088c44354cb720e0',
  leadsStream: 'https://ntfy.sh/hs_leads_4d82b9f1c63e70a5',
  telemetryStream: 'https://ntfy.sh/hs_telemetry_7c91e4a2b80f56d3'
};

function initStudioTelemetry() {
  const params = new URLSearchParams(window.location.search);
  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';
  const forceTrack = params.get('testtrack') === '1';
  const noTrack = params.get('notrack') === '1' || (isLocal && !forceTrack);

  let sessionData = {};
  try {
    sessionData = JSON.parse(sessionStorage.getItem('hs_session_v1') || '{}');
  } catch {
    sessionData = {};
  }

  if (!sessionData.sid) {
    sessionData.sid = Math.random().toString(36).slice(2, 10);
    sessionData.startedAt = new Date().toISOString();
  }

  const refSlug =
    params.get('r') ||
    params.get('ref') ||
    params.get('u') ||
    params.get('utm_campaign') ||
    sessionData.refSlug ||
    '';
  const utmSource = params.get('utm_source') || sessionData.utmSource || '';
  const utmMedium = params.get('utm_medium') || sessionData.utmMedium || '';

  sessionData.refSlug = refSlug;
  sessionData.utmSource = utmSource;
  sessionData.utmMedium = utmMedium;
  sessionData.initialReferrer = sessionData.initialReferrer || document.referrer || 'direct';
  sessionData.inspectedModels = Array.isArray(sessionData.inspectedModels)
    ? sessionData.inspectedModels
    : [];

  const saveSession = () => {
    try {
      sessionStorage.setItem('hs_session_v1', JSON.stringify(sessionData));
    } catch {
      // ignore storage quota errors
    }
  };
  saveSession();

  const trackGcEvent = (eventPath, title) => {
    if (noTrack) return;
    const sendGc = () => {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        const suffix = refSlug ? `?ref=${encodeURIComponent(refSlug)}` : '';
        window.goatcounter.count({
          path: `${eventPath}${suffix}`,
          title: title || eventPath,
          event: true
        });
      }
    };
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      sendGc();
    } else {
      setTimeout(sendGc, 1500);
    }
  };

  const emitBeacon = (eventType, detail = {}, title = '') => {
    if (noTrack) return;
    const payload = {
      event: eventType,
      sid: sessionData.sid,
      ts: new Date().toISOString(),
      ref: refSlug || undefined,
      utm_source: utmSource || undefined,
      referrer: sessionData.initialReferrer,
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      device: window.innerWidth <= 768 ? 'mobile' : 'desktop',
      vp: `${window.innerWidth}x${window.innerHeight}`,
      ...detail
    };
    const qs = new URLSearchParams();
    if (title) qs.set('title', title);
    qs.set('tags', eventType === 'plaque_customize' ? 'label' : 'eyes');
    const url = `${STUDIO_ENDPOINTS.telemetryStream}?${qs.toString()}`;
    const body = JSON.stringify(payload);

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
      } else {
        fetch(url, { method: 'POST', body, keepalive: true }).catch(() => {});
      }
    } catch {
      // ignore telemetry network errors
    }
  };

  if (!sessionData.pageViewed) {
    sessionData.pageViewed = true;
    saveSession();
    const visitTitle = refSlug
      ? `Broker Visit [${refSlug}]`
      : `Site Visit (${Intl.DateTimeFormat().resolvedOptions().timeZone || 'web'})`;
    emitBeacon('page_view', { path: window.location.pathname + window.location.hash }, visitTitle);
    if (refSlug) {
      trackGcEvent(`lead-visit/${refSlug}`, `Lead Visit: ${refSlug}`);
    }
  }

  return {
    sessionData,
    saveSession,
    trackGcEvent,
    emitBeacon,
    recordOnce(flagKey, eventType, gcPath, gcTitle, detail = {}, ntfyTitle = '') {
      if (sessionData[flagKey]) return;
      sessionData[flagKey] = true;
      saveSession();
      trackGcEvent(gcPath, gcTitle);
      emitBeacon(eventType, detail, ntfyTitle || gcTitle);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const tracker = initStudioTelemetry();

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

  let lastInspectedStudy = '';

  function openLightbox(id) {
    const item = COMMISSIONS.find(c => c.id === id);
    if (!item) return;
    lastInspectedStudy = `${item.title} (${item.location})`;
    if (!tracker.sessionData.inspectedModels.includes(item.id)) {
      tracker.sessionData.inspectedModels.push(item.id);
      tracker.saveSession();
    }
    tracker.trackGcEvent(`inspect-study/${item.id}`, `Inspect Study: ${item.title}`);
    tracker.emitBeacon(
      'commission_inspect',
      { study: item.id, title: item.title },
      `Inspected Study: ${item.title}`
    );

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
    tracker.trackGcEvent('cta-lightbox-request-proof', 'Lightbox CTA -> Request Proof');
    document.getElementById('commission').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('propAddress')?.focus(), 450);
  });

  // 4. Interactive Dual Brass Plaque Previewer + Smart Form Pre-Fill
  const frontInput = document.getElementById('plaqueFrontInput');
  const underInput = document.getElementById('plaqueUnderInput');
  const frontPreview = document.getElementById('plaqueFrontPreview');
  const underPreview = document.getElementById('plaqueUnderPreview');
  const plaqueToProofLink = document.getElementById('plaqueToProofLink');
  const plaqueFormInput = document.getElementById('plaqueInscription');
  let plaqueManuallyEditedInForm = false;
  let plaqueDebounceTimer = null;

  plaqueFormInput?.addEventListener('input', () => {
    plaqueManuallyEditedInForm = true;
  });

  const schedulePlaqueTelemetry = () => {
    clearTimeout(plaqueDebounceTimer);
    plaqueDebounceTimer = setTimeout(() => {
      const fVal = frontInput?.value.trim() || '';
      const uVal = underInput?.value.trim() || '';
      if (fVal.length >= 4 || uVal.length >= 4) {
        tracker.sessionData.plaqueFrontDraft = fVal;
        tracker.sessionData.plaqueUnderDraft = uVal;
        tracker.saveSession();
        tracker.trackGcEvent('plaque-customizer-typed', 'Typed in Brass Plaque Previewer');
        tracker.emitBeacon(
          'plaque_customize',
          { front: fVal, under: uVal },
          `Plaque Preview Typed: ${fVal || uVal}`
        );
      }
    }, 2200);
  };

  frontInput?.addEventListener('input', () => {
    const val = frontInput.value.trim();
    frontPreview.textContent = val || '1517 FALLING STAR AVE • EST. NOV 2026';
    if (plaqueFormInput && !plaqueManuallyEditedInForm) {
      plaqueFormInput.value = val;
    }
    schedulePlaqueTelemetry();
  });

  underInput?.addEventListener('input', () => {
    const val = underInput.value.trim();
    underPreview.textContent = val || 'Compliments of Your Name · Luxury Real Estate';
    schedulePlaqueTelemetry();
  });

  plaqueToProofLink?.addEventListener('click', e => {
    e.preventDefault();
    const fVal = frontInput?.value.trim() || '';
    const uVal = underInput?.value.trim() || '';
    const addrEl = document.getElementById('propAddress');
    const nameEl = document.getElementById('agentName');

    if (fVal && plaqueFormInput) {
      plaqueFormInput.value = fVal;
    }
    if (fVal && addrEl && !addrEl.value.trim()) {
      addrEl.value = fVal.split('•')[0].split('·')[0].trim();
    }
    if (uVal && nameEl && !nameEl.value.trim()) {
      nameEl.value = uVal.replace(/^compliments\s+of\s+/i, '').trim();
    }

    tracker.trackGcEvent('cta-plaque-to-proof', 'Plaque Studio -> Apply to Proof');
    document.getElementById('commission')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const nextFocus = !addrEl?.value.trim()
        ? addrEl
        : document.getElementById('agentContact');
      nextFocus?.focus();
    }, 450);
  });

  // 5. FAQ Accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  // 6. Scroll Milestone Observer (#commission Pricing & Form)
  const commissionSection = document.getElementById('commission');
  if (commissionSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tracker.recordOnce(
              'viewedPricing',
              'pricing_view',
              'scroll-pricing-section',
              'Viewed $299 Pricing & Proof Form',
              {},
              'Scrolled to $299 Pricing & Form'
            );
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(commissionSection);
  }

  // 7. Instant 360° Digital Proof Submission (Replaces broken mailto:)
  const form = document.getElementById('proofRequestForm');
  const submitBtn = document.getElementById('submitProofBtn');
  const copyToast = document.getElementById('copyToast');
  const formContainer = document.getElementById('proofFormContainer');
  const successBox = document.getElementById('proofSuccessBox');
  const confirmAddressVal = document.getElementById('confirmAddressVal');
  const confirmContactVal = document.getElementById('confirmContactVal');
  const resetProofFormBtn = document.getElementById('resetProofFormBtn');
  const directEmailLink = document.getElementById('directEmailLink');

  form?.addEventListener('focusin', () => {
    tracker.recordOnce(
      'startedForm',
      'form_start',
      'form-started',
      'Started Filling 360 Proof Form',
      {},
      'Broker Started Filling Proof Form'
    );
  });

  directEmailLink?.addEventListener('click', () => {
    tracker.trackGcEvent('click-direct-email', 'Clicked Direct Email evan@');
    tracker.emitBeacon('direct_email_click', {}, 'Clicked Direct Email Link');
  });

  resetProofFormBtn?.addEventListener('click', () => {
    form?.reset();
    if (successBox) successBox.hidden = true;
    if (formContainer) formContainer.hidden = false;
    document.getElementById('propAddress')?.focus();
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    copyToast.classList.remove('visible', 'error');

    const honey = form.querySelector('input[name="_honey"]')?.value;
    if (honey) return;

    const address = document.getElementById('propAddress')?.value.trim() || '';
    const agentContact = document.getElementById('agentContact')?.value.trim() || '';
    const agentName = document.getElementById('agentName')?.value.trim() || '';
    const occasion = document.getElementById('giftOccasion')?.value || 'Buyer Closing Keepsake';
    const inscription =
      document.getElementById('plaqueInscription')?.value.trim() ||
      'Standard Street Address + Closing Month/Year';
    const notes = document.getElementById('specialNotes')?.value.trim() || '';

    if (!address || !agentContact || !agentName) return;

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting Studio Brief…';

    const emailPayload = {
      _subject: `360° Proof Request — ${address} (${agentName})`,
      _template: 'table',
      _captcha: 'false',
      Property_Address: address,
      Agent_Contact: agentContact,
      Agent_Name_Brokerage: agentName,
      Commission_Type: occasion,
      Front_Brass_Plaque: inscription,
      Underside_Attribution: `Compliments of ${agentName}`,
      Architectural_Notes: notes || 'None specified',
      Attribution_Ref: tracker.sessionData.refSlug || 'direct',
      UTM_Source: tracker.sessionData.utmSource || 'none',
      Referrer: tracker.sessionData.initialReferrer || 'direct',
      Inspected_Portfolio_Models:
        tracker.sessionData.inspectedModels.join(', ') || lastInspectedStudy || 'none',
      Plaque_Studio_Draft:
        [tracker.sessionData.plaqueFrontDraft, tracker.sessionData.plaqueUnderDraft]
          .filter(Boolean)
          .join(' | ') || 'none',
      Visitor_Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown'
    };

    if (agentContact.includes('@')) {
      emailPayload._replyto = agentContact;
    }

    const ntfyQuery = new URLSearchParams({
      title: `NEW 360 PROOF REQUEST: ${address}`,
      priority: 'high',
      tags: 'house,tada'
    });

    const [formSubmitRes, ntfyRes] = await Promise.allSettled([
      fetch(STUDIO_ENDPOINTS.formSubmitAjax, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(emailPayload)
      }),
      fetch(`${STUDIO_ENDPOINTS.leadsStream}?${ntfyQuery.toString()}`, {
        method: 'POST',
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          ...emailPayload
        }),
        keepalive: true
      })
    ]);

    const formOk =
      formSubmitRes.status === 'fulfilled' && formSubmitRes.value && formSubmitRes.value.ok;
    const backupOk =
      ntfyRes.status === 'fulfilled' && ntfyRes.value && ntfyRes.value.ok;

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;

    if (formOk || backupOk) {
      tracker.trackGcEvent('proof-request-submitted', `Proof Submitted: ${address}`);
      if (confirmAddressVal) confirmAddressVal.textContent = address;
      if (confirmContactVal) confirmContactVal.textContent = agentContact;
      if (formContainer) formContainer.hidden = true;
      if (successBox) successBox.hidden = false;
      document.getElementById('commission')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const briefText = `To: evan@hearthscalestudio.com\nSubject: 360° Proof Request — ${address}\n\nProperty: ${address}\nContact: ${agentContact}\nAgent: ${agentName}\nOccasion: ${occasion}\nPlaque: ${inscription}\nNotes: ${notes}`;
      try {
        await navigator.clipboard.writeText(briefText);
      } catch {
        // ignore clipboard error
      }
      copyToast.textContent =
        'Connection interrupted — we copied your commission brief to clipboard. Please email it directly to evan@hearthscalestudio.com.';
      copyToast.classList.add('visible', 'error');
    }
  });
});
