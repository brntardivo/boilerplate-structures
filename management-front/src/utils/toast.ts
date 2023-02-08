const generateUniqueID = () => {
  return `toast-${Date.now()}`;
};

const removeToast = (uniqueId, container) => {
  const toast = document.getElementById(uniqueId);

  if (toast && container) {
    toast.classList.remove('show');
    toast.classList.add('hide');

    container.removeChild(toast);
  }
};

const makeContainer = (options) => {
  const configurator = {
    enableTitle: false,
    timer: null,
    color: 'light',
    position: 'top-right',
    enableClose: true,
    ...options,
  };

  const containerId = 'toast-container';

  let container = document.getElementById(containerId);

  if (!container) {
    const e = document.createElement('div');
    e.id = containerId;

    e.classList.add(`toast-position-${configurator.position}`);

    document.body.prepend(e);

    container = document.getElementById(containerId);
  }

  const fire = (payload) => {
    if (typeof payload === 'string') {
      payload = {
        text: payload,
      };
    }

    const uniqueId = generateUniqueID();

    const toast = document.createElement('div');

    toast.id = uniqueId;
    toast.setAttribute('role', 'alert');
    toast.classList.add('toast');
    toast.classList.add('fade');
    toast.classList.add('show');

    toast.classList.add(`bg-${payload.color ?? configurator.color}`);

    switch (payload.color ?? configurator.color) {
      case 'primary':
      case 'dark':
      case 'info':
      case 'danger':
      case 'success':
      case 'secondary':
        toast.classList.add('text-white');
        break;
      case 'light':
      case 'warning':
        toast.classList.add('text-dark');
        break;
    }

    if (configurator.enableTitle) {
      const title = document.createElement('div');
      title.classList.add('toast-header');

      const span = document.createElement('span');
      span.innerHTML = payload.title ?? '';

      title.append(span);

      if (configurator.enableClose) {
        const btn = document.createElement('button');
        btn.classList.add('btn-close');
        btn.setAttribute('aria-label', 'Close');
        btn.dataset.id = uniqueId;

        btn.addEventListener('click', (e) => {
          toast.classList.remove('show');
          toast.classList.add('hide');

          container.removeChild(toast);
        });

        title.append(btn);
      }

      toast.append(title);
    }

    const text = document.createElement('div');
    text.classList.add('toast-body');
    text.innerHTML = payload.text ?? '';

    toast.append(text);

    if (!configurator.enableTitle && configurator.enableClose) {
      const btn = document.createElement('button');
      btn.classList.add('btn-close');
      btn.classList.add('me-2');
      btn.classList.add('m-auto');
      btn.setAttribute('aria-label', 'Close');
      btn.dataset.id = uniqueId;

      btn.addEventListener('click', (e) => {
        toast.classList.remove('show');
        toast.classList.add('hide');

        container.removeChild(toast);
      });

      switch (payload.color ?? configurator.color) {
        case 'primary':
        case 'dark':
        case 'info':
        case 'danger':
        case 'success':
        case 'secondary':
          btn.classList.add('btn-close-white');
          break;
        case 'light':
        case 'warning':
          btn.classList.add('btn-close-dark');
          break;
      }

      toast.append(btn);
    }

    container.prepend(toast);

    if (payload.position) {
      const position = payload.position.toString().toLowerCase();

      const allowedPositions = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ];

      if (allowedPositions.indexOf(position) > -1) {
        container.classList.remove(`toast-position-${configurator.position}`);
        container.classList.add(`toast-position-${position}`);
      } else {
        console.error('[toast][error] invalid position');
      }
    }

    if (payload.timer || configurator.timer) {
      setTimeout(() => {
        removeToast(uniqueId, container);
      }, payload.timer ?? configurator.timer);
    }
  };

  const success = (text, timer, position = null) => {
    return fire({
      text,
      color: 'success',
      timer,
      position,
    });
  };

  const error = (text, timer, position = null) => {
    return fire({
      text,
      color: 'danger',
      timer,
      position,
    });
  };

  return { fire, success, error };
};

export default {
  install: (app, options) => {
    const { fire, success, error } = makeContainer(options);

    app.config.globalProperties.$toast = {
      fire,
      success,
      error,
    };
  },
};

const { fire, success, error } = makeContainer({});

export const standalone = {
  fire,
  success,
  error,
};
