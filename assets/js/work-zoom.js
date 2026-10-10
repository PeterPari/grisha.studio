(function () {
    const links = Array.from(document.querySelectorAll('.image-zoom-link'));
    if (!links.length) {
        return;
    }

    const maxScale = 3;
    const minZoom = 1.6;
    const ease = 0.16;
    const arrowStep = 80;
    const dragSlop = 8;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    // Current (rendered) and target view state for the one active frame.
    let active = null;
    const view = { s: 1, x: 0, y: 0 };
    const goal = { s: 1, x: 0, y: 0 };
    let raf = 0;

    const frames = links.map((link) => {
        const img = link.querySelector('img');
        link.setAttribute('role', 'button');
        link.setAttribute('aria-pressed', 'false');
        link.setAttribute('data-zoom', 'in');
        return { link, img, w: 0, h: 0, scale: 1 };
    });

    const paint = (frame) => {
        const { link, img } = frame;
        link.style.setProperty('--zs', view.s.toFixed(4));
        link.style.setProperty('--zx', view.x.toFixed(2) + 'px');
        link.style.setProperty('--zy', view.y.toFixed(2) + 'px');
        img.style.willChange = view.s > 1.001 || goal.s > 1.001 ? 'transform' : '';
    };

    const tick = () => {
        raf = 0;
        if (!active) {
            return;
        }
        const k = reduceMotion ? 1 : ease;
        view.s += (goal.s - view.s) * k;
        view.x += (goal.x - view.x) * k;
        view.y += (goal.y - view.y) * k;
        const settled =
            Math.abs(goal.s - view.s) < 0.002 &&
            Math.abs(goal.x - view.x) < 0.2 &&
            Math.abs(goal.y - view.y) < 0.2;
        if (settled) {
            view.s = goal.s;
            view.x = goal.x;
            view.y = goal.y;
        }
        paint(active);
        if (settled) {
            if (goal.s <= 1.001) {
                const done = active;
                active = null;
                done.link.style.removeProperty('--zs');
                done.link.style.removeProperty('--zx');
                done.link.style.removeProperty('--zy');
                done.img.style.willChange = '';
            }
            return;
        }
        raf = requestAnimationFrame(tick);
    };

    const run = () => {
        if (!raf) {
            raf = requestAnimationFrame(tick);
        }
    };

    const isZoomed = (frame) => frame === active && goal.s > 1.001;

    const setPressed = (frame, on) => {
        frame.link.setAttribute('aria-pressed', on ? 'true' : 'false');
        frame.link.classList.toggle('is-zoomed', on);
        frame.link.setAttribute('data-zoom', on ? 'out' : 'in');
    };

    // Pan target so the point under the cursor stays put at zoom time, then follows the cursor.
    const aim = (frame, fx, fy) => {
        goal.x = -(goal.s - 1) * frame.w * clamp(fx, 0, 1);
        goal.y = -(goal.s - 1) * frame.h * clamp(fy, 0, 1);
    };

    const reset = () => {
        if (!active) {
            return;
        }
        setPressed(active, false);
        goal.s = 1;
        goal.x = 0;
        goal.y = 0;
        run();
    };

    const zoomIn = (frame, fx, fy) => {
        if (active && active !== frame) {
            // Snap the previous frame back immediately.
            const prev = active;
            setPressed(prev, false);
            prev.link.style.removeProperty('--zs');
            prev.link.style.removeProperty('--zx');
            prev.link.style.removeProperty('--zy');
            prev.img.style.willChange = '';
            active = null;
        }
        frame.w = frame.img.offsetWidth;
        frame.h = frame.img.offsetHeight;
        const natural = frame.img.naturalWidth || frame.w;
        frame.scale = clamp(natural / Math.max(frame.w, 1), minZoom, maxScale);
        if (active !== frame) {
            view.s = 1;
            view.x = 0;
            view.y = 0;
        }
        active = frame;
        goal.s = frame.scale;
        aim(frame, fx, fy);
        setPressed(frame, true);
        run();
    };

    const pointFraction = (frame, clientX, clientY) => {
        const rect = frame.link.getBoundingClientRect();
        return [
            rect.width ? (clientX - rect.left) / rect.width : 0.5,
            rect.height ? (clientY - rect.top) / rect.height : 0.5
        ];
    };

    frames.forEach((frame) => {
        const { link, img } = frame;
        let dragId = null;
        let startX = 0;
        let startY = 0;
        let originX = 0;
        let originY = 0;
        let dragged = false;

        img.setAttribute('draggable', 'false');

        link.addEventListener('click', (event) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            event.preventDefault();
            if (dragged) {
                dragged = false;
                return;
            }
            if (isZoomed(frame)) {
                reset();
                return;
            }
            // Keyboard activation reports 0,0 and detail 0: zoom to centre.
            const [fx, fy] = event.detail === 0 ? [0.5, 0.5] : pointFraction(frame, event.clientX, event.clientY);
            zoomIn(frame, fx, fy);
        });

        link.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                event.preventDefault();
                link.click();
                return;
            }
            if (!isZoomed(frame)) {
                return;
            }
            const maxX = (goal.s - 1) * frame.w;
            const maxY = (goal.s - 1) * frame.h;
            if (event.key === 'ArrowLeft') {
                goal.x = clamp(goal.x + arrowStep, -maxX, 0);
            } else if (event.key === 'ArrowRight') {
                goal.x = clamp(goal.x - arrowStep, -maxX, 0);
            } else if (event.key === 'ArrowUp') {
                goal.y = clamp(goal.y + arrowStep, -maxY, 0);
            } else if (event.key === 'ArrowDown') {
                goal.y = clamp(goal.y - arrowStep, -maxY, 0);
            } else {
                return;
            }
            event.preventDefault();
            run();
        });

        link.addEventListener('pointermove', (event) => {
            if (!isZoomed(frame)) {
                return;
            }
            if (event.pointerType === 'mouse') {
                const [fx, fy] = pointFraction(frame, event.clientX, event.clientY);
                aim(frame, fx, fy);
                run();
            } else if (dragId === event.pointerId) {
                const dx = event.clientX - startX;
                const dy = event.clientY - startY;
                if (Math.abs(dx) > dragSlop || Math.abs(dy) > dragSlop) {
                    dragged = true;
                }
                const maxX = (goal.s - 1) * frame.w;
                const maxY = (goal.s - 1) * frame.h;
                goal.x = clamp(originX + dx, -maxX, 0);
                goal.y = clamp(originY + dy, -maxY, 0);
                run();
            }
        });

        link.addEventListener('pointerdown', (event) => {
            if (event.pointerType === 'mouse' || !isZoomed(frame)) {
                return;
            }
            dragId = event.pointerId;
            dragged = false;
            startX = event.clientX;
            startY = event.clientY;
            originX = goal.x;
            originY = goal.y;
            link.setPointerCapture(event.pointerId);
        });

        const endDrag = (event) => {
            if (dragId === event.pointerId) {
                dragId = null;
                if (link.hasPointerCapture(event.pointerId)) {
                    link.releasePointerCapture(event.pointerId);
                }
            }
        };
        link.addEventListener('pointerup', endDrag);
        link.addEventListener('pointercancel', endDrag);

        link.addEventListener('pointerleave', (event) => {
            if (event.pointerType === 'mouse' && isZoomed(frame)) {
                reset();
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            reset();
        }
    });

    window.addEventListener('resize', () => {
        if (active) {
            reset();
        }
    });
}());
