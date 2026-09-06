/* Shared leaderboard widget for the WNBA games.
 *
 * Talks to the Google Apps Script Web App (see leaderboard.gs / LEADERBOARD-SETUP.md).
 * One deployment serves every game; the `game` value keeps each board separate.
 *
 * Usage on a page:
 *   <div id="lb-mount"></div>
 *   <script src="leaderboard.js"></script>
 *   ...
 *   const lb = createLeaderboard({
 *     url: LEADERBOARD_URL,          // '' = save on this device only
 *     game: 'legends',              // must match a name allowed in leaderboard.gs
 *     mount: document.getElementById('lb-mount'),
 *     title: 'Top 10',
 *     sub: 'Optional line under the title',
 *     crownTag: 'The GOAT',         // optional label pinned to the #1 row
 *     getScore: () => ({ score: 12, total: 21 })
 *   });
 *   lb.show(true);   // populate the board read-only (quiet = no loading/err flash)
 *   lb.finish();     // reveal the name box + refresh (call when the run is over)
 */
(function () {
  var NAME_KEY = 'gtl-player-name';
  var CSS = `
    .lb-wrap { margin-top: 24px; padding: 20px; border: 1px solid var(--ink); background: var(--white); text-align: left; }
    .lb-title { margin: 0 0 4px; font: 15px/1.3 'Archivo Black', sans-serif; text-transform: uppercase; text-align: center; letter-spacing: -.01em; }
    .lb-sub { margin: 0 0 16px; font: 11px 'DM Mono', monospace; text-align: center; color: var(--muted); }
    .lb-list { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
    .lb-item { display: grid; grid-template-columns: 30px 1fr auto; align-items: center; gap: 10px; padding: 9px 12px; border: 1px solid var(--ink); background: var(--white); font: 13px 'DM Mono', monospace; }
    .lb-item.is-new { background: var(--mint); border-color: #5c9c7e; }
    .lb-item.is-goat { background: #fff3e6; border-color: var(--coral); }
    .lb-rank { font: 800 14px Manrope, sans-serif; color: var(--coral-dark); text-align: center; }
    .lb-item.is-goat .lb-rank { font-size: 13px; }
    .lb-name { display: flex; align-items: center; gap: 8px; min-width: 0; }
    .lb-name-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lb-goat-tag { flex: none; padding: 2px 6px; background: var(--coral); color: #fff; font: 700 9px 'DM Mono', monospace; letter-spacing: .1em; text-transform: uppercase; }
    .lb-score { font-weight: 700; }
    .lb-form { margin-top: 18px; padding-top: 16px; border-top: 1px solid #e7e0d2; }
    .lb-label { display: block; margin-bottom: 8px; font: 11px 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .1em; color: var(--muted); }
    .lb-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
    .lb-row input { flex: 1 1 180px; max-width: 240px; padding: 10px 12px; border: 1px solid var(--ink); background: var(--white); color: var(--ink); font: 14px Manrope, sans-serif; }
    .lb-row input:focus-visible { outline: 3px solid var(--coral); outline-offset: 2px; }
    .lb-save { padding: 11px 18px; border: 1px solid var(--ink); background: var(--coral); color: #fff; font: 800 12px Manrope, sans-serif; text-transform: uppercase; cursor: pointer; }
    .lb-save:hover { background: var(--coral-dark); border-color: var(--coral-dark); }
    .lb-save:disabled { opacity: .5; cursor: default; }
  `;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  function loadName() { try { return localStorage.getItem(NAME_KEY) || ''; } catch (e) { return ''; } }
  function saveName(value) { try { localStorage.setItem(NAME_KEY, value); } catch (e) {} }

  window.createLeaderboard = function (opts) {
    var url = (opts.url || '').trim();
    var game = opts.game || 'game';
    var shared = url.length > 0;
    var localKey = 'gtl-lb-' + game;
    var getScore = opts.getScore || function () { return { score: 0, total: 0 }; };
    var gameOver = false;

    if (!document.getElementById('lb-style')) {
      var style = el('style');
      style.id = 'lb-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    var wrap = el('section', 'lb-wrap hidden');
    wrap.setAttribute('aria-label', 'Leaderboard');
    wrap.appendChild(el('h3', 'lb-title', opts.title || 'Top 10'));
    if (opts.sub) wrap.appendChild(el('p', 'lb-sub', opts.sub));
    var list = el('ol', 'lb-list');
    wrap.appendChild(list);

    var form = el('form', 'lb-form hidden');
    var label = el('label', 'lb-label', 'Add your score to the leaderboard');
    label.setAttribute('for', 'lbName-' + game);
    var row = el('div', 'lb-row');
    var input = el('input');
    input.id = 'lbName-' + game;
    input.type = 'text';
    input.maxLength = 20;
    input.autocomplete = 'off';
    input.placeholder = 'Your name';
    input.setAttribute('data-1p-ignore', 'true');
    input.setAttribute('data-lpignore', 'true');
    var submit = el('button', 'lb-save', 'Save');
    submit.type = 'submit';
    row.append(input, submit);
    form.append(label, row);
    wrap.appendChild(form);

    opts.mount.replaceWith(wrap);
    input.value = loadName();

    function sortRows(rows) {
      return rows.slice().sort(function (a, b) { return (b.score - a.score) || (a.t - b.t); });
    }
    function localRows() { try { return JSON.parse(localStorage.getItem(localKey)) || []; } catch (e) { return []; } }
    function saveLocal(rows) { try { localStorage.setItem(localKey, JSON.stringify(rows)); } catch (e) {} }

    function message(text) {
      var li = el('li', 'lb-item');
      var span = el('span', null, text);
      span.style.gridColumn = '1 / -1';
      li.appendChild(span);
      list.replaceChildren(li);
      wrap.classList.remove('hidden');
    }

    function renderRows(rows, highlightKey) {
      var top = rows.slice(0, 10);
      list.replaceChildren.apply(list, top.map(function (entry, i) {
        var isTop = i === 0;
        var li = el('li', 'lb-item'
          + (isTop ? ' is-goat' : '')
          + (highlightKey && entry.key === highlightKey ? ' is-new' : ''));
        li.appendChild(el('span', 'lb-rank', isTop ? '👑' : String(i + 1)));
        var name = el('span', 'lb-name');
        name.appendChild(el('span', 'lb-name-text', entry.name));
        if (isTop && opts.crownTag) name.appendChild(el('span', 'lb-goat-tag', opts.crownTag));
        li.appendChild(name);
        li.appendChild(el('span', 'lb-score', entry.score + '/' + entry.total));
        return li;
      }));
      wrap.classList.toggle('hidden', top.length === 0 && !gameOver);
    }

    function show(quiet) {
      if (!shared) { renderRows(sortRows(localRows()), null); return Promise.resolve(); }
      if (!quiet) message('Loading…');
      return fetch(url + '?game=' + encodeURIComponent(game))
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.ok) throw new Error('bad response');
          renderRows(data.top || [], null);
        })
        .catch(function () { if (!quiet) message('Leaderboard unavailable right now.'); });
    }

    function replaceForm(text) { form.replaceChildren(el('p', 'lb-label', text)); }
    function note(text) {
      var n = form.querySelector('.lb-note');
      if (!n) {
        n = el('p', 'lb-label lb-note');
        n.style.margin = '10px 0 0';
        form.appendChild(n);
      }
      n.textContent = text;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = input.value.trim().replace(/\s+/g, ' ').slice(0, 20);
      if (!name) { input.focus(); return; }
      saveName(name);
      var current = getScore() || {};
      var score = Math.round(Number(current.score)) || 0;
      var total = Math.round(Number(current.total)) || 0;
      var key = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
      submit.disabled = true;
      input.disabled = true;

      if (!shared) {
        var rows = localRows();
        rows.push({ key: key, name: name, score: score, total: total, t: Date.now() });
        saveLocal(rows);
        replaceForm('Saved to this device’s leaderboard.');
        renderRows(sortRows(rows), key);
        return;
      }

      note('Saving…');
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ game: game, name: name, score: score, total: total })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data || !data.ok) throw new Error((data && data.error) || 'save failed');
          replaceForm('Added to the leaderboard.');
          renderRows(data.top || [], null);
        })
        .catch(function () {
          submit.disabled = false;
          input.disabled = false;
          note('Could not save — check your connection and try again.');
        });
    });

    function finish() {
      gameOver = true;
      wrap.classList.remove('hidden');
      form.classList.remove('hidden');
      show(false);
    }

    return { show: show, finish: finish, element: wrap };
  };
})();
