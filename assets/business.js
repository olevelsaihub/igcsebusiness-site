// Business 4BS1 question bank filters. Pure client-side filtering of rows already in the page.
(() => {
  'use strict';
  const table = document.querySelector('[data-bank-table]');
  if (!table) return;
  const rows = [...table.querySelectorAll('tbody tr')];
  const controls = [...document.querySelectorAll('[data-bank-filter]')];
  const text = document.querySelector('[data-bank-text]');
  const status = document.querySelector('[data-bank-status]');
  function apply() {
    const wanted = Object.fromEntries(controls.map(c => [c.dataset.bankFilter, c.value]));
    const terms = (text ? text.value : '').toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const row of rows) {
      const ok = Object.entries(wanted).every(([key, value]) => !value || row.dataset[key] === value)
        && terms.every(t => row.dataset.search.includes(t));
      row.hidden = !ok;
      if (ok) shown++;
    }
    if (status) status.textContent = `${shown} of ${rows.length} question parts shown`;
  }
  for (const c of controls) c.addEventListener('change', apply);
  if (text) text.addEventListener('input', apply);
  apply();
})();

/* Answer checking (V2, owner 19 Oct 2026: students get the mark schemes and answers). The page carries each checked
   part's rule in <script id="olv-rules">; the shared adapter (assets/olv-marking-adapter.js) marks in the browser, written
   answers by key points, and the correct answer is always shown after a check. A part without a rule is still sent to
   the server's /check. */
(function () {
  var base = (document.querySelector('link[rel="stylesheet"][href*="/assets/"]') || {}).href || '';
  var root = base ? base.slice(0, base.indexOf('/assets/') + 1) : '/';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function list(items) { return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function render(r, mode) {
    if (r.error) return '<p class="check-bad">' + esc(r.error) + '</p>';
    mode = r.mode || mode;
    var model = function (label, text) { return text ? '<details open><summary>' + label + '</summary><p>' + esc(text) + '</p></details>' : ''; };
    if (mode === 'keywords') {
      var good = r.marks >= r.max;
      return '<p class="' + (good ? 'check-good' : 'check-bad') + '">Key points found: ' + r.marks + '/' + r.max + '</p>'
        + list((r.items || []).map(function (it) { return (it.found ? '✓ ' : '○ ') + esc(it.label) + (it.marks ? ' <span class="muted">(' + it.marks + ')</span>' : ''); }))
        + model('Model answer (written by olevels.com, not official)', r.ideal)
        + (r.levels ? '<p><strong>Level guide</strong></p>' + list(r.levels.map(function (l) { return '<strong>Level ' + esc(l.level) + ' (' + esc(l.marks) + ' marks):</strong> ' + esc(l.text); })) : '')
        + (r.tip ? '<p class="muted">' + esc(r.tip) + '</p>' : '');
    }
    if (mode === 'exact' || mode === 'figures') {
      var steps2 = (r.steps || r.items || []).map(function (s) { return (s.found ? '✓ ' : s.found === null ? '◇ ' : '○ ') + esc(s.label); });
      return '<p class="' + (r.correct ? 'check-good' : 'check-bad') + '">' + (r.correct ? 'Correct: ' : 'Not full marks yet: ') + r.marks + '/' + r.max + '</p>'
        + (steps2.length ? list(steps2) : '') + model('Correct answer', r.working || r.ideal) + (r.why ? '<p><strong>Why:</strong> ' + esc(r.why) + '</p>' : '');
    }
    if (mode === 'mcq') {
      if (r.correct === null) return '<p>' + esc(r.feedback) + '</p>';
      return (r.correct ? '<p class="check-good">Correct: ' + r.marks + '/' + r.max + '</p>'
                        : '<p class="check-bad">Not this one. The correct answer is ' + esc(r.key) + '.</p>' + (r.your_option ? '<p>' + esc(r.your_option) + '</p>' : ''))
             + (r.why ? '<p><strong>Why:</strong> ' + esc(r.why) + '</p>' : '');
    }
    if (mode === 'numeric') {
      var head = r.correct ? '<p class="check-good">Correct: ' + r.marks + '/' + r.max + '</p>'
                           : '<p class="check-bad">Your final answer is not right yet: ' + r.marks + '/' + r.max + '</p>';
      var steps = (r.steps || []).map(function (s) { return (s.found ? '✓ ' : '○ ') + esc(s.label); });
      return head + (steps.length ? list(steps) : '') + (r.working ? '<details open><summary>Correct working</summary><p>' + esc(r.working) + '</p></details>' : '')
        + (r.why ? '<p><strong>Why:</strong> ' + esc(r.why) + '</p>' : '');
    }
    var out = '<p><strong>Mark your own answer.</strong> ' + esc(r.tip || '') + '</p>';
    out += '<details open><summary>Ideal answer (written by olevels.com, not official)</summary><p>' + esc(r.ideal) + '</p></details>';
    out += '<p><strong>Mark checklist</strong></p>' + list((r.checklist || []).map(function (c) {
      return '<label><input type="checkbox" class="bs-self-tick" data-marks="' + (c.marks || 0) + '"> ' + esc(c.text) + (c.marks ? ' <span class="muted">(' + c.marks + ')</span>' : '') + '</label>'; }));
    if (r.levels) out += '<p><strong>Level guide</strong></p>' + list(r.levels.map(function (l) { return '<strong>Level ' + esc(l.level) + ' (' + esc(l.marks) + ' marks):</strong> ' + esc(l.text); }));
    return out + '<p class="self-total muted"></p>';
  }
  document.addEventListener('submit', function (ev) {
    var form = ev.target.closest && ev.target.closest('form.checker');
    if (!form) return;
    ev.preventDefault();
    var part = form.getAttribute('data-check-part'), mode = form.getAttribute('data-check-mode');
    var field = form.querySelector('[name="ans-' + part + '"]:checked') || form.querySelector('[name="ans-' + part + '"]:not([type=radio])');
    var answer = field ? field.value : '';
    var out = form.querySelector('.check-result');
    if (!answer.trim()) { out.innerHTML = '<p class="check-bad">Write or choose an answer first.</p>'; return; }
    // The page's own rules, then the rules of a lesson loaded into a plan or type workspace (bank.js keeps them
    // beside the lesson as <script data-olv-rules>).
    var rule = (function () {
      var els = [document.getElementById('olv-rules')].concat([].slice.call(document.querySelectorAll('script[data-olv-rules]')));
      for (var i = 0; i < els.length; i++) { if (!els[i]) continue; try { var r = JSON.parse(els[i].textContent || '{}')[part]; if (r) return r; } catch (e) {} }
      return null; })();
    if (rule && window.OlvMarkingAdapter && window.OlvMarkingAdapter.check) {
      var local = window.OlvMarkingAdapter.check(rule, answer);
      if (local) { out.innerHTML = render(local, mode); return; }
    }
    out.textContent = 'Checking…';
    fetch(root + 'check', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({part: part, answer: answer})})
      .then(function (res) { return res.json(); })
      .then(function (r) { out.innerHTML = render(r, mode); })
      .catch(function () { out.innerHTML = '<p class="check-bad">Answer checking is not available right now.</p>'; });
  });
  document.addEventListener('change', function (ev) {
    if (!ev.target.classList || !ev.target.classList.contains('bs-self-tick')) return;
    var form = ev.target.closest('form.checker');
    var total = 0;
    form.querySelectorAll('.bs-self-tick:checked').forEach(function (b) { total += Number(b.getAttribute('data-marks')) || 0; });
    var max = form.getAttribute('data-check-max');
    form.querySelector('.self-total').textContent = 'Your self-mark: ' + total + ' / ' + max + ' (points-marked parts). For 6, 9 and 12 mark answers use the level guide.';
  });
})();
