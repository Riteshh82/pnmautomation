/**
 * Custom Playwright Reporter to print structured summary and failure tables
 */
class TableReporter {
  constructor() {
    this.services = ['pnm_master', 'pnm_dashboard', 'pnm_asset', 'pnm_procurement', 'pnm_service_dpr', 'pnm_report'];
    this.tests = [];
  }

  onTestEnd(test, result) {
    const title = test.title;
    // Extract method and endpoint from title: TC-XXX-001: [METHOD] /path - Name
    const match = title.match(/\[(GET|POST|PUT|DELETE)\]\s+([^\s]+)\s+-/i);
    const method = match ? match[1].toUpperCase() : 'UNKNOWN';
    const endpoint = match ? match[2] : title;

    let service = 'other';
    for (const s of this.services) {
      if (endpoint.includes(`/${s}/`)) {
        service = s;
        break;
      }
    }

    const passed = result.status === 'passed';
    let errorMessage = '';
    let statusCode = '200';
    let expectedStatus = '200';
    let failureReason = 'Passed';

    if (!passed) {
      const rawError = result.errors && result.errors.length > 0 ? result.errors[0].message : (result.error ? result.error.message : '');
      errorMessage = rawError;

      // Detect status code from error message (e.g., got 400 or got 500)
      const gotMatch = rawError.match(/got\s+(\d{3})/i);
      if (gotMatch) {
        statusCode = gotMatch[1];
      } else {
        const httpMatch = rawError.match(/HTTP\s+(\d{3})/i);
        if (httpMatch) statusCode = httpMatch[1];
      }

      if (rawError.includes('body.status mismatch')) {
        failureReason = `Response-validation failure (body.status ${statusCode})`;
        if (statusCode === '400') errorMessage = 'BAD_REQUEST';
        else if (statusCode === '404') errorMessage = 'Not_Found';
        else if (statusCode === '500') errorMessage = 'Internal Server Error';
      } else if (rawError.includes('timeout') || result.status === 'timedOut') {
        failureReason = 'Timeout Failure';
        statusCode = 'TIMEOUT';
      } else if (statusCode === '401' || statusCode === '403') {
        failureReason = 'Authentication / Authorization Failure';
      } else if (statusCode.startsWith('5')) {
        failureReason = 'Server Error (HTTP 5xx)';
      } else {
        failureReason = 'Assertion / HTTP Failure';
      }

      // Redact sensitive patterns from error message
      errorMessage = errorMessage.replace(/Bearer\s+[A-Za-z0-9-_=.]+/gi, 'Bearer [REDACTED]');
      errorMessage = errorMessage.replace(/"(token|accessToken|password|secret)":\s*"[^"]+"/gi, '"$1": "[REDACTED]"');
      if (errorMessage.length > 60) errorMessage = errorMessage.slice(0, 57) + '...';
    }

    this.tests.push({
      service,
      method,
      endpoint,
      passed,
      statusCode,
      expectedStatus,
      errorMessage: errorMessage || 'N/A',
      failureReason,
    });
  }

  onEnd() {
    console.log('                   PNM API TEST EXECUTION REPORT');

    // 1. Service-Wise Summary Table
    const summary = {};
    for (const s of this.services) {
      summary[s] = { total: 0, passed: 0, failed: 0 };
    }

    for (const t of this.tests) {
      if (!summary[t.service]) summary[t.service] = { total: 0, passed: 0, failed: 0 };
      summary[t.service].total++;
      if (t.passed) summary[t.service].passed++;
      else summary[t.service].failed++;
    }

    console.log('\n1. Service-Wise Execution Summary\n');
    console.log('| Service             | Total APIs | Passed | Failed |');
    console.log('| :------------------ | :--------: | :----: | :----: |');

    let totalApis = 0;
    let totalPassed = 0;
    let totalFailed = 0;

    for (const s of this.services) {
      const data = summary[s] || { total: 0, passed: 0, failed: 0 };
      totalApis += data.total;
      totalPassed += data.passed;
      totalFailed += data.failed;
      console.log(`| ${s.padEnd(19)} | ${String(data.total).padStart(10)} | ${String(data.passed).padStart(6)} | ${String(data.failed).padStart(6)} |`);
    }

    console.log('| ' + '-'.repeat(19) + ' | ' + '-'.repeat(10) + ' | ' + '-'.repeat(6) + ' | ' + '-'.repeat(6) + ' |');
    console.log(`| ${'Total'.padEnd(19)} | ${String(totalApis).padStart(10)} | ${String(totalPassed).padStart(6)} | ${String(totalFailed).padStart(6)} |`);

    // 2. Detailed API Failure Report
    const failedTests = this.tests.filter((t) => !t.passed);
    console.log('\n--- 2. Detailed API Failure Report ---\n');

    if (failedTests.length === 0) {
      console.log('All API tests passed successfully! No failures recorded.\n');
    } else {
      console.log('| Service        | Method | API Endpoint                                             | Status | Expected | Error Message | Failure Reason                                     |');
      console.log('| :------------- | :----: | :------------------------------------------------------- | :----: | :------: | :------------ | :------------------------------------------------- |');
      for (const f of failedTests) {
        const ep = f.endpoint.length > 56 ? f.endpoint.slice(0, 53) + '...' : f.endpoint;
        console.log(`| ${f.service.padEnd(14)} | ${f.method.padEnd(6)} | ${ep.padEnd(56)} | ${f.statusCode.padEnd(6)} | ${f.expectedStatus.padEnd(8)} | ${f.errorMessage.padEnd(13)} | ${f.failureReason.padEnd(50)} |`);
      }
      console.log('\n');
    }
    console.log('='.repeat(80) + '\n');
  }
}

module.exports = TableReporter;
