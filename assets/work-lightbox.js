(function () {
    const imageLinks = Array.from(document.querySelectorAll('.image-zoom-link'));
    if (!imageLinks.length) {
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = [
        '<div class="lightbox-backdrop" data-lightbox-close></div>',
        '<section class="lightbox-shell" role="dialog" aria-modal="true" aria-labelledby="lightbox-caption">',
        '  <div class="lightbox-toolbar">',
        '    <div class="lightbox-caption-block">',
        '      <span class="lightbox-eyebrow">Image viewer</span>',
        '      <p class="lightbox-caption" id="lightbox-caption"></p>',
        '      <span class="lightbox-hint">Wheel to zoom. Drag when zoomed. Esc closes.</span>',
        '    </div>',
        '    <div class="lightbox-actions">',
        '      <span class="lightbox-status" aria-live="polite">100%</span>',
        '      <button class="lightbox-button" type="button" data-lightbox-zoom-out aria-label="Zoom out">-</button>',
        '      <button class="lightbox-button" type="button" data-lightbox-zoom-in aria-label="Zoom in">+</button>',
        '      <button class="lightbox-button" type="button" data-lightbox-reset aria-label="Reset zoom">Reset</button>',
        '      <button class="lightbox-button" type="button" data-lightbox-close aria-label="Close image viewer">Close</button>',
        '    </div>',
        '  </div>',
        '  <div class="lightbox-stage">',
        '    <div class="lightbox-viewport" tabindex="0">',
        '      <div class="lightbox-canvas">',
        '        <img class="lightbox-image" alt="">',
        '      </div>',
        '    </div>',
        '  </div>',
        '</section>'
    ].join('');
    document.body.appendChild(overlay);

    const viewport = overlay.querySelector('.lightbox-viewport');
    const canvas = overlay.querySelector('.lightbox-canvas');
    const image = overlay.querySelector('.lightbox-image');
    const caption = overlay.querySelector('.lightbox-caption');
    const status = overlay.querySelector('.lightbox-status');
    const zoomInButton = overlay.querySelector('[data-lightbox-zoom-in]');
    const zoomOutButton = overlay.querySelector('[data-lightbox-zoom-out]');
    const resetButton = overlay.querySelector('[data-lightbox-reset]');
    const closeButtons = overlay.querySelectorAll('[data-lightbox-close]');

    const minScale = 1;
    const maxScale = 4;
    const zoomStep = 0.25;
    const arrowPanStep = 54;

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let baseWidth = 0;
    let baseHeight = 0;
    let dragPointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let activeLink = null;
    let lastFocusedElement = null;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const isOpen = () => overlay.classList.contains('is-open');

    const updateControls = () => {
        status.textContent = `${Math.round(scale * 100)}%`;
        zoomOutButton.disabled = scale <= minScale + 0.01;
        zoomInButton.disabled = scale >= maxScale - 0.01;
        resetButton.disabled = scale <= minScale + 0.01 && Math.abs(translateX) < 1 && Math.abs(translateY) < 1;
        viewport.classList.toggle('is-zoomed', scale > minScale + 0.01);
    };

    const applyTransform = () => {
        const maxX = Math.max(0, (baseWidth * scale - viewport.clientWidth) / 2);
        const maxY = Math.max(0, (baseHeight * scale - viewport.clientHeight) / 2);
        translateX = clamp(translateX, -maxX, maxX);
        translateY = clamp(translateY, -maxY, maxY);
        canvas.style.setProperty('--tx', `${translateX}px`);
        canvas.style.setProperty('--ty', `${translateY}px`);
        image.style.setProperty('--scale', String(scale));
        updateControls();
    };

    const syncBaseSize = () => {
        const currentScale = scale;
        image.style.setProperty('--scale', '1');
        const rect = image.getBoundingClientRect();
        baseWidth = rect.width;
        baseHeight = rect.height;
        image.style.setProperty('--scale', String(currentScale));
    };

    const resetView = () => {
        scale = minScale;
        translateX = 0;
        translateY = 0;
        applyTransform();
    };

    const setScale = (nextScale) => {
        const previousScale = scale;
        scale = clamp(nextScale, minScale, maxScale);
        if (Math.abs(scale - previousScale) < 0.001) {
            return;
        }
        if (scale <= minScale + 0.01) {
            translateX = 0;
            translateY = 0;
        } else {
            const factor = scale / previousScale;
            translateX *= factor;
            translateY *= factor;
        }
        applyTransform();
    };

    const endDrag = () => {
        dragPointerId = null;
        viewport.classList.remove('is-dragging');
    };

    const closeLightbox = () => {
        if (!isOpen()) {
            return;
        }
        endDrag();
        overlay.classList.remove('is-open', 'is-loading');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-active');
        image.removeAttribute('src');
        image.removeAttribute('alt');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus({ preventScroll: true });
        }
        activeLink = null;
    };

    const openLightbox = (link) => {
        const source = link.getAttribute('href');
        if (!source) {
            return;
        }

        activeLink = link;
        lastFocusedElement = document.activeElement;

        const thumbnail = link.querySelector('img');
        const altText = thumbnail ? thumbnail.getAttribute('alt') : 'Artwork image';

        caption.textContent = altText || 'Artwork image';
        image.alt = altText || '';
        overlay.classList.add('is-open', 'is-loading');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-active');

        resetView();
        image.src = source;
        viewport.focus({ preventScroll: true });

        if (image.complete && image.naturalWidth > 0) {
            overlay.classList.remove('is-loading');
            requestAnimationFrame(() => {
                syncBaseSize();
                resetView();
            });
        }
    };

    image.addEventListener('load', () => {
        overlay.classList.remove('is-loading');
        requestAnimationFrame(() => {
            syncBaseSize();
            resetView();
        });
    });

    image.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeLightbox);
    });

    zoomInButton.addEventListener('click', () => setScale(scale + zoomStep));
    zoomOutButton.addEventListener('click', () => setScale(scale - zoomStep));
    resetButton.addEventListener('click', resetView);

    imageLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            openLightbox(link);
        });
    });

    viewport.addEventListener('wheel', (event) => {
        if (!isOpen()) {
            return;
        }
        event.preventDefault();
        setScale(scale + (event.deltaY < 0 ? 0.18 : -0.18));
    }, { passive: false });

    viewport.addEventListener('dblclick', (event) => {
        if (!isOpen()) {
            return;
        }
        event.preventDefault();
        setScale(scale > 1.5 ? minScale : 2);
    });

    viewport.addEventListener('pointerdown', (event) => {
        if (!isOpen() || scale <= minScale + 0.01 || event.button !== 0) {
            return;
        }
        dragPointerId = event.pointerId;
        dragStartX = event.clientX - translateX;
        dragStartY = event.clientY - translateY;
        viewport.classList.add('is-dragging');
        viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener('pointermove', (event) => {
        if (dragPointerId !== event.pointerId) {
            return;
        }
        translateX = event.clientX - dragStartX;
        translateY = event.clientY - dragStartY;
        applyTransform();
    });

    const releasePointer = (event) => {
        if (dragPointerId !== event.pointerId) {
            return;
        }
        if (viewport.hasPointerCapture(event.pointerId)) {
            viewport.releasePointerCapture(event.pointerId);
        }
        endDrag();
    };

    viewport.addEventListener('pointerup', releasePointer);
    viewport.addEventListener('pointercancel', releasePointer);

    document.addEventListener('keydown', (event) => {
        if (!isOpen()) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            closeLightbox();
            return;
        }

        if (event.key === '+' || event.key === '=') {
            event.preventDefault();
            setScale(scale + zoomStep);
            return;
        }

        if (event.key === '-' || event.key === '_') {
            event.preventDefault();
            setScale(scale - zoomStep);
            return;
        }

        if (event.key === '0') {
            event.preventDefault();
            resetView();
            return;
        }

        if (scale <= minScale + 0.01) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            translateX -= arrowPanStep;
        } else if (event.key === 'ArrowRight') {
            translateX += arrowPanStep;
        } else if (event.key === 'ArrowUp') {
            translateY -= arrowPanStep;
        } else if (event.key === 'ArrowDown') {
            translateY += arrowPanStep;
        } else {
            return;
        }

        event.preventDefault();
        applyTransform();
    });

    window.addEventListener('resize', () => {
        if (!isOpen() || !image.getAttribute('src')) {
            return;
        }
        requestAnimationFrame(() => {
            syncBaseSize();
            applyTransform();
        });
    });

    updateControls();
}());