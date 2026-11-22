
/*
 * WORKNELY V7.4
 * Premium Status Messages
 * Non-invasive UI enhancement
 */

(() => {
  'use strict';

  const statusIds = [
    'builderMessage',
    'saveAccountStatus',
    'exportMessage',
    'studioStatus'
  ];

  const successPatterns = [
    /success/i,
    /generated/i,
    /created/i,
    /saved/i,
    /updated/i,
    /prepared/i,
    /ready/i,
    /download started/i,
    /draft copied/i
  ];

  const errorPatterns = [
    /failed/i,
    /error/i,
    /unable/i,
    /please enter/i,
    /please retry/i,
    /not supported/i,
    /could not/i,
    /cannot/i
  ];

  function classify(message) {
    if (errorPatterns.some(pattern =>
      pattern.test(message)
    )) {
      return 'error';
    }

    if (successPatterns.some(pattern =>
      pattern.test(message)
    )) {
      return 'success';
    }

    return 'info';
  }

  function updateStatus(element) {
    const message = element.textContent.trim();

    element.classList.remove(
      'worknely-status-success',
      'worknely-status-error',
      'worknely-status-info'
    );

    if (!message) return;

    const type = classify(message);

    element.classList.add(
      'worknely-status-' + type
    );

    element.setAttribute('role', 'status');
  }

  function initialize() {
    statusIds.forEach(id => {
      const element =
        document.getElementById(id);

      if (!element) return;

      const observer = new MutationObserver(
        () => updateStatus(element)
      );

      observer.observe(element, {
        childList: true,
        characterData: true,
        subtree: true
      });

      updateStatus(element);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener(
      'DOMContentLoaded',
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }
})();
