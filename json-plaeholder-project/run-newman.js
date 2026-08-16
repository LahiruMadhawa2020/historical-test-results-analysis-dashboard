const newman = require('newman');
const path = require('path');

const collectionPath = path.join(__dirname, 'collections', 'jsonplaceholder-crud.postman_collection.json');
const reportDir = path.join(__dirname, 'reports');

// Ensure reports directory exists
const fs = require('fs');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

const options = {
  collection: require(collectionPath),
  reporters: ['cli', 'json', 'htmlextra'],
  reporter: {
    htmlextra: {
      export: path.join(reportDir, 'newman-report.html'),
      browserTitle: 'JSONPlaceholder CRUD Test Report',
      title: 'Newman Test Execution Report',
      titleSize: 4,
      repoBrowserImageUrl: 'https://github.com/publisheswithlahiru91/historical-test-results-analysis-dashboard'
    },
    json: {
      export: path.join(reportDir, 'newman-run.json')
    }
  }
};

console.log('Starting Newman test execution...');
console.log('Collection:', collectionPath);
console.log('Reports will be saved to:', reportDir);

newman.run(options, (err, summary) => {
  if (err) {
    console.error('Error running collection:', err);
    process.exit(1);
  }

  console.log('\n=== Test Execution Summary ===');
  console.log('Total Requests:', summary.run.stats.assertions.total);
  console.log('Passed:', summary.run.stats.assertions.failed === 0 ? summary.run.stats.assertions.total : summary.run.stats.assertions.total - summary.run.stats.assertions.failed);
  console.log('Failed:', summary.run.stats.assertions.failed);
  console.log('Execution Time:', summary.run.timings.completed - summary.run.timings.started, 'ms');
  
  if (summary.run.failures && summary.run.failures.length > 0) {
    console.log('\nFailed Assertions:');
    summary.run.failures.forEach((failure, index) => {
      console.log(`  ${index + 1}. ${failure.error.message}`);
    });
  }

  console.log('\nReports generated:');
  console.log('  - HTML Report:', path.join(reportDir, 'newman-report.html'));
  console.log('  - JSON Report:', path.join(reportDir, 'newman-run.json'));
});
