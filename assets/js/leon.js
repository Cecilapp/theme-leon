/*! Léon theme for Cecil | https://github.com/Cecilapp/theme-leon */
(function () {
  'use strict';

  var config = window.leon || {};
  var i18n = config.i18n || {};
  var root = document.documentElement;
  var content = document.getElementById('content');

  var ICONS = {
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  };

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // fallback for insecure contexts (e.g. local preview over HTTP on a LAN address)
    return new Promise(function (resolve, reject) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy'));
      } catch (e) {
        reject(e);
      }
      textarea.remove();
    });
  }

  function flashCopied(element) {
    element.setAttribute('data-copied', '');
    clearTimeout(element._leonTimer);
    element._leonTimer = setTimeout(function () {
      element.removeAttribute('data-copied');
    }, 2000);
  }

  function storage(key, value) {
    try {
      if (value === undefined) {
        return localStorage.getItem(key);
      }
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      return null;
    }
  }

  /* Mobile navigation drawer */
  function initDrawer() {
    var sidebar = document.getElementById('sidebar');
    var backdrop = document.querySelector('.leon-drawer-backdrop');
    var openers = document.querySelectorAll('[data-leon-drawer-open]');
    if (!sidebar || !openers.length) return;
    var large = window.matchMedia('(min-width: 64rem)');
    var lastFocus = null;

    function setOpen(open) {
      if (open) {
        lastFocus = document.activeElement;
        sidebar.setAttribute('data-open', '');
        if (backdrop) backdrop.hidden = false;
        document.body.style.overflow = 'hidden';
        var close = sidebar.querySelector('[data-leon-drawer-close]');
        if (close) close.focus();
      } else {
        sidebar.removeAttribute('data-open');
        if (backdrop) backdrop.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus && sidebar.contains(document.activeElement)) lastFocus.focus();
      }
      openers.forEach(function (button) {
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    openers.forEach(function (button) {
      button.addEventListener('click', function () {
        setOpen(true);
      });
    });
    document.querySelectorAll('[data-leon-drawer-close]').forEach(function (element) {
      element.addEventListener('click', function () {
        setOpen(false);
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && sidebar.hasAttribute('data-open')) setOpen(false);
    });
    large.addEventListener('change', function () {
      if (large.matches) setOpen(false);
    });
    // keeps the current page visible in the sidebar
    var current = sidebar.querySelector('[aria-current="page"]');
    if (current && large.matches) {
      var offset = current.getBoundingClientRect().top - sidebar.getBoundingClientRect().top;
      if (offset > sidebar.clientHeight - 80) sidebar.scrollTop = offset - sidebar.clientHeight / 3;
    }
  }

  /* Language selector, and suggestion of the translation matching the browser language (until a language is chosen) */
  function initLanguage() {
    var menus = document.querySelectorAll('[data-leon-language]');
    menus.forEach(function (menu) {
      menu.querySelectorAll('a[hreflang]').forEach(function (link) {
        link.addEventListener('click', function () {
          storage('leon-language', link.hreflang || '1');
        });
      });
    });
    // the `<details>` menus work without JS: close them on an outside click or Escape
    if (menus.length) {
      document.addEventListener('click', function (event) {
        menus.forEach(function (menu) {
          if (menu.open && !menu.contains(event.target)) menu.open = false;
        });
      });
      document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        menus.forEach(function (menu) {
          if (!menu.open) return;
          menu.open = false;
          menu.querySelector('summary').focus();
        });
      });
    }

    var banners = document.querySelectorAll('[data-leon-language-banner]');
    if (!banners.length || storage('leon-language')) return;
    var current = (root.lang || '').toLowerCase();
    var preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    var banner = null;
    // the first browser language matching the page or one of its translations (exact code, then primary subtag)
    preferred.some(function (language) {
      language = language.toLowerCase();
      var primary = language.split('-')[0];
      var candidates = [language, primary];
      for (var i = 0; i < candidates.length; i++) {
        if (current === candidates[i]) return true;
        for (var j = 0; j < banners.length; j++) {
          if (banners[j].getAttribute('data-leon-language-banner').toLowerCase() === candidates[i]) {
            banner = banners[j];
            return true;
          }
        }
      }
      return false;
    });
    if (!banner) return;
    // displayed until the visitor follows it or closes it
    banner.hidden = false;
    banner.querySelector('[data-leon-language-switch]').addEventListener('click', function () {
      storage('leon-language', banner.lang);
    });
    banner.querySelector('[data-leon-language-close]').addEventListener('click', function () {
      storage('leon-language', current || '1');
      banner.hidden = true;
    });
  }

  /* Tabs and code groups: tab list and panels rendered by `partials/notes/tabs.html.twig` */
  function initTabs(block) {
    var buttons = Array.prototype.slice.call(block.querySelectorAll(':scope > .leon-tablist > [role="tab"]'));
    var panels = buttons.map(function (button) {
      return document.getElementById(button.getAttribute('aria-controls'));
    });
    if (!buttons.length) return;

    function select(index, focus) {
      buttons.forEach(function (button, i) {
        var selected = i === index;
        button.setAttribute('aria-selected', selected ? 'true' : 'false');
        button.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
      });
      if (focus) buttons[index].focus();
    }
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        select(index);
        // synchronizes the tabs with the same label (e.g. the user's OS)
        storage('leon-tab', button.textContent);
        document.dispatchEvent(new CustomEvent('leon:tab', { detail: { label: button.textContent, source: block } }));
      });
      button.addEventListener('keydown', function (event) {
        var next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: buttons.length - 1 }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        select((next + buttons.length) % buttons.length, true);
      });
    });
    document.addEventListener('leon:tab', function (event) {
      if (event.detail.source === block) return;
      var index = buttons.findIndex(function (button) {
        return button.textContent === event.detail.label;
      });
      if (index > -1) select(index);
    });
    var preferred = storage('leon-tab');
    var initial = buttons.findIndex(function (button) {
      return button.textContent === preferred;
    });
    select(initial > -1 ? initial : 0);
    block.classList.add('is-ready');
  }

  function initBlocks() {
    if (!content) return;
    content.querySelectorAll('[data-leon-tabs]').forEach(initTabs);
    // opens the accordion targeted by the URL hash
    function openTarget() {
      if (!location.hash) return;
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      var details = target && target.closest('details');
      if (details) details.open = true;
    }
    window.addEventListener('hashchange', openTarget);
    openTarget();
  }

  /* Code blocks: copy button */
  function initCodeBlocks() {
    if (!content) return;
    content.querySelectorAll('pre > code').forEach(function (code) {
      // Mermaid source, replaced by its diagram (https://github.com/Cecilapp/theme-pele)
      if (window.cecilPele && code.classList.contains('language-mermaid')) return;
      var pre = code.parentElement;
      var wrapper = document.createElement('div');
      wrapper.className = 'leon-code';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'leon-copy-code';
      button.setAttribute('aria-label', i18n.copyCode || 'Copy code');
      button.title = i18n.copyCode || 'Copy code';
      button.innerHTML = ICONS.copy + ICONS.check;
      button.addEventListener('click', function () {
        copyText(code.innerText.replace(/\n$/, '')).then(function () {
          flashCopied(button);
        });
      });
      wrapper.appendChild(button);
    });
  }

  /* Headings permalinks and tables wrappers */
  function initContent() {
    if (!content) return;
    content.querySelectorAll('h2[id], h3[id]').forEach(function (heading) {
      if (heading.closest('.note')) return;
      var anchor = document.createElement('a');
      anchor.className = 'leon-anchor';
      anchor.href = '#' + heading.id;
      anchor.setAttribute('aria-label', i18n.permalink || 'Permalink to this section');
      anchor.innerHTML = ICONS.link;
      heading.appendChild(anchor);
    });
    content.querySelectorAll('table').forEach(function (table) {
      if (table.parentElement.classList.contains('leon-table')) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'leon-table';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  /* "Copy page" button and menu */
  function initCopyPage() {
    var container = document.querySelector('[data-leon-copypage]');
    if (!container) return;
    var toggle = container.querySelector('[data-leon-copypage-toggle]');
    var menu = container.querySelector('[role="menu"]');
    var label = container.querySelector('[data-leon-copypage-label]');
    var markdownUrl = container.getAttribute('data-markdown-url');
    var markdown = null;

    function getMarkdown() {
      if (markdown !== null) return Promise.resolve(markdown);
      if (!markdownUrl || !window.fetch) return Promise.resolve(content ? content.innerText : '');
      return fetch(markdownUrl)
        .then(function (response) {
          if (!response.ok) throw new Error(response.statusText);
          return response.text();
        })
        .then(function (text) {
          markdown = text;
          return text;
        })
        .catch(function () {
          return content ? content.innerText : '';
        });
    }

    function setMenu(open) {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        var first = menu.querySelector('[role="menuitem"]');
        if (first) first.focus();
      }
    }

    container.querySelectorAll('[data-leon-copypage-copy]').forEach(function (button) {
      button.addEventListener('click', function () {
        getMarkdown()
          .then(copyText)
          .then(function () {
            var main = container.querySelector('.leon-copypage-main');
            flashCopied(main);
            if (label) {
              var text = label.getAttribute('data-label') || label.textContent;
              label.setAttribute('data-label', text);
              label.textContent = label.getAttribute('data-label-copied') || i18n.copied || 'Copied';
              setTimeout(function () {
                label.textContent = text;
              }, 2000);
            }
          });
        setMenu(false);
      });
    });
    toggle.addEventListener('click', function () {
      setMenu(menu.hidden);
    });
    document.addEventListener('click', function (event) {
      if (!menu.hidden && !container.contains(event.target)) setMenu(false);
    });
    container.addEventListener('keydown', function (event) {
      if (menu.hidden) return;
      var items = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
      var index = items.indexOf(document.activeElement);
      if (event.key === 'Escape') {
        setMenu(false);
        toggle.focus();
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        var next = index + (event.key === 'ArrowDown' ? 1 : -1);
        items[(next + items.length) % items.length].focus();
      }
    });
    // prefetches the Markdown on intent, so the copy stays in the user gesture
    container.addEventListener('pointerenter', getMarkdown, { once: true });
    container.addEventListener('focusin', getMarkdown, { once: true });
  }

  /* "On this page": scroll spy and collapse toggle */
  function initToc() {
    var toggle = document.querySelector('[data-leon-toc-toggle]');
    if (toggle) {
      var apply = function (collapsed) {
        root.classList.toggle('leon-toc-collapsed', collapsed);
        toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        toggle.setAttribute('aria-label', toggle.getAttribute(collapsed ? 'data-label-show' : 'data-label-hide'));
      };
      apply(storage('leon-toc') === 'collapsed');
      toggle.addEventListener('click', function () {
        var collapsed = !root.classList.contains('leon-toc-collapsed');
        storage('leon-toc', collapsed ? 'collapsed' : null);
        apply(collapsed);
      });
    }
    // small screens: closes the sticky block after following a link, on outside click or Escape
    var mobile = document.querySelector('.leon-toc-mobile');
    if (mobile) {
      mobile.addEventListener('click', function (event) {
        if (event.target.closest('a')) mobile.open = false;
      });
      document.addEventListener('click', function (event) {
        if (mobile.open && !mobile.contains(event.target)) mobile.open = false;
      });
      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobile.open) {
          mobile.open = false;
          mobile.querySelector('summary').focus();
        }
      });
    }
    var links = Array.prototype.slice.call(document.querySelectorAll('.leon-toc a[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;
    var headings = [];
    links.forEach(function (link) {
      var heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (heading && headings.indexOf(heading) === -1) headings.push(heading);
    });
    var visible = new Set();
    function update() {
      var active = headings.find(function (heading) {
        return visible.has(heading);
      });
      if (!active) {
        // between two headings: the last one above the viewport
        active = headings.filter(function (heading) {
          return heading.getBoundingClientRect().top < 140;
        }).pop() || headings[0];
      }
      links.forEach(function (link) {
        if (decodeURIComponent(link.hash.slice(1)) === active.id) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visible.add(entry.target);
        } else {
          visible.delete(entry.target);
        }
      });
      update();
    }, { rootMargin: '-112px 0px -55% 0px' });
    headings.forEach(function (heading) {
      observer.observe(heading);
    });
  }

  onReady(function () {
    initDrawer();
    initLanguage();
    initBlocks();
    initContent();
    initCodeBlocks();
    initCopyPage();
    initToc();
  });
})();
