const polyfill = (target: unknown) => {
  if (typeof target === 'object' && target !== null) {
    if (!('addEventListener' in target)) {
      if ('attachEvent' in target && typeof target.attachEvent === 'function') {
        const attachEvent = target.attachEvent;
        return {
          addEventListener: (type: string, listener: Function) => {
            attachEvent(`on${type}`, listener);
          },
        };
      }
    }
  }
};

const optional = (value: unknown, handler: Function) => typeof value !== 'undefined' && handler(value);

window.addEventListener('load', () => {
  const elements = {
    '#section-left-menu': document.querySelector<HTMLElement>('#section-left-menu'),
    '#button-left-menu': document.querySelector('#button-left-menu'),
    '#svg-open-menu': document.querySelector<SVGSVGElement>('#svg-open-menu'),
    '#svg-close-menu': document.querySelector<SVGSVGElement>('#svg-close-menu'),
    '#section-left-menu-list': document.querySelector<HTMLElement>('#section-left-menu-list'),
    '#section-center': document.querySelector<HTMLElement>('#section-center'),
  };
  elements['#section-left-menu']?.addEventListener('click', () => {
    if (!elements['#section-left-menu']) {
      return;
    }
    if (!elements['#svg-open-menu']) {
      return;
    }
    if (!elements['#svg-close-menu']) {
      return;
    }
    if (!elements['#section-left-menu-list']) {
      return;
    }
    if (!elements['#section-center']) {
      return;
    }
    if (elements['#section-left-menu'].dataset['expanded'] === 'true') {
      delete elements['#section-left-menu'].dataset['expanded'];
      elements['#section-left-menu'].style.width = '48px';
      elements['#svg-open-menu'].classList.remove('rt-r-display-none');
      elements['#svg-close-menu'].classList.add('rt-r-display-none');
      elements['#section-left-menu-list'].classList.add('rt-r-display-none');
      elements['#section-center'].style.width = `${
        (elements['#section-center'].parentElement?.clientWidth ?? window.innerWidth) - 48 - 5
      }px`;
    } else {
      elements['#section-left-menu'].dataset['expanded'] = 'true';
      elements['#section-left-menu'].style.width = '96px';
      elements['#svg-open-menu'].classList.add('rt-r-display-none');
      elements['#svg-close-menu'].classList.remove('rt-r-display-none');
      elements['#section-left-menu-list'].classList.remove('rt-r-display-none');
      elements['#section-center'].style.width = `${
        (elements['#section-center'].parentElement?.clientWidth ?? window.innerWidth) - 96 - 5
      }px`;
    }
  });

  if (elements['#section-center']) {
    console.log(elements['#section-center'].parentElement?.clientWidth, window.innerWidth);
    elements['#section-center'].style.width = `${
      (elements['#section-center'].parentElement?.clientWidth ?? window.innerWidth) - 48 - 5
    }px`;
  }
});
