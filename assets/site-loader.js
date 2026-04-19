(() => {
    const body = document.body;
    if (!body) {
        return;
    }

    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.className = 'site-loader';
        loader.setAttribute('aria-hidden', 'true');
        loader.innerHTML = '<p class="loader-mark">G · P</p>';
        body.prepend(loader);
    } else {
        loader.classList.add('site-loader');
        if (!loader.querySelector('.loader-mark')) {
            loader.innerHTML = '<p class="loader-mark">G · P</p>';
        }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialDelay = prefersReducedMotion ? 140 : 650;
    const removeDelay = prefersReducedMotion ? 180 : 550;
    let fallbackTimer = 0;

    body.classList.add('site-loader-active');

    const dismissLoader = () => {
        if (loader.dataset.dismissed === 'true') {
            return;
        }
        loader.dataset.dismissed = 'true';
        window.clearTimeout(fallbackTimer);
        loader.classList.add('out');
        window.setTimeout(() => {
            body.classList.remove('site-loader-active');
            loader.remove();
        }, removeDelay);
    };

    const scheduleDismiss = () => {
        window.setTimeout(dismissLoader, initialDelay);
    };

    fallbackTimer = window.setTimeout(dismissLoader, prefersReducedMotion ? 1200 : 4000);

    if (document.readyState === 'complete') {
        scheduleDismiss();
    } else {
        window.addEventListener('load', scheduleDismiss, { once: true });
    }

    window.addEventListener('pageshow', (event) => {
        if (!event.persisted) {
            return;
        }
        body.classList.remove('site-loader-active');
        loader.remove();
    });
})();