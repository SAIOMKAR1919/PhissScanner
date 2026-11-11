function scanURL() {
  const input = document.getElementById('urlInput').value.trim();
  const resultBox = document.getElementById('resultBox');
  const resultSection = document.getElementById('result');
  let issues = [];

  if (!input) {
    resultBox.innerHTML = "<p>Please enter a URL.</p>";
    resultSection.classList.remove('hidden');
    return;
  }

  // Check for HTTP/HTTPS
  if (!input.startsWith("https://")) {
    issues.push("❌ URL is not using HTTPS.");
  }

  // Check for IP address in URL
  const ipPattern = /\b\d{1,3}(\.\d{1,3}){3}\b/;
  if (ipPattern.test(input)) {
    issues.push("⚠️ Contains an IP address. May be suspicious.");
  }

  const flags = ["login", "verify", "update", "secure", "bank"];
  flags.forEach(word => {
    if (input.includes(word)) {
      issues.push(`⚠️ Contains suspicious word: "${word}"`);
    }
  });

  if ((input.match(/\./g) || []).length > 3) {
    issues.push("⚠️ Too many subdomains – could be misleading.");
  }

  if (issues.length === 0) {
    resultBox.innerHTML = `<p style="color: #22c55e;">✅ This URL looks safe.</p>`;
  } else {
    resultBox.innerHTML = issues.map(item => `<p>${item}</p>`).join('');
  }

  resultSection.classList.remove('hidden');
}



