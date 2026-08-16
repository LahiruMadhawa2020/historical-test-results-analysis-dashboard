const pages = [
  'https://lahirumadhawawork.github.io/historical-test-execution-analysis-dashboard/',
  'https://lahirumadhawawork.github.io/historical-test-execution-analysis-dashboard/wk-dashboard.html',
  'https://lahirumadhawawork.github.io/historical-test-execution-analysis-dashboard/dell-dashboard.html',
  'https://lahirumadhawawork.github.io/historical-test-execution-analysis-dashboard/sr-link-dashboard.html',
  'https://lahirumadhawawork.github.io/historical-test-execution-analysis-dashboard/management-dashboard.html'
];

for (const url of pages) {
  const res = await fetch(url);
  const html = await res.text();
  let runs = 'n/a';
  const jsonStart = html.indexOf('id="dashboard-data"');
  if (jsonStart >= 0) {
    const start = html.indexOf('>', jsonStart) + 1;
    const end = html.indexOf('</script>', start);
    try {
      runs = JSON.parse(html.slice(start, end)).history?.length ?? 0;
    } catch {
      runs = 'parse-error';
    }
  }
  console.log(res.status, runs, url);
}
