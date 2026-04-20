(() => {
    // Intercept material-chip tab link clicks for smooth transitions
    document.querySelectorAll('.material-chip:not([aria-current="page"])').forEach(chip => {
        chip.addEventListener('click', e => {
            e.preventDefault();
            const href = chip.href;
            sessionStorage.setItem('gallery-tab-nav', '1');
            document.body.classList.add('gallery-leaving');
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        });
    });
})();
