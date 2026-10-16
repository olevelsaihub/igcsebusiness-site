/* Grade guide: grade reached on official Pearson boundaries for a complete, separately marked 160-mark paper pair. */
(function () {
  'use strict';
  var root = document.querySelector('[data-grade-guide]');
  if (!root) return;
  var data = JSON.parse(root.getAttribute('data-grade-guide'));
  var form = root.querySelector('form'), out = root.querySelector('[data-grade-result]');
  function grade(total, b) {
    for (var g = 9; g >= 1; g--) if (total >= b[g]) return g;
    return 0;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var opt = data.options[form.option.value], b = opt.boundaries;
    var p1 = parseInt(form.p1.value, 10), p2 = parseInt(form.p2.value, 10);
    if (!(p1 >= 0 && p1 <= 80 && p2 >= 0 && p2 <= 80)) {
      out.hidden = false;
      out.innerHTML = '<p>Enter both paper marks, each between 0 and 80.</p>';
      return;
    }
    var total = p1 + p2, g = grade(total, b), safe = grade(total - data.teacher_buffer_marks, b);
    var next = g < 9 ? (b[g + 1] - total) : 0;
    out.hidden = false;
    out.innerHTML = '<p class="gg-total">' + total + ' / ' + data.max_mark + '</p>' +
      '<h3>' + (g ? 'Grade ' + g : 'Below grade 1') + ' on the June 2026 ' + opt.papers + ' boundaries</h3>' +
      '<ul><li>' + (g < 9 ? next + ' more mark' + (next === 1 ? '' : 's') + ' would reach grade ' + (g + 1) + '.' : 'This is at or above the grade 9 boundary.') + '</li>' +
      '<li>With a ' + data.teacher_buffer_marks + '-mark teacher buffer, the secure grade is ' + (safe ? safe : 'below grade 1') + '.</li></ul>' +
      '<p class="muted">A guide only: one pair, marked against the official scheme, on one series’ boundaries. It does not predict or guarantee a future exam grade.</p>';
  });
})();
