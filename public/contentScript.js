function removePromotedJobs() {
  const PROMO_FOOTER_SEL =
    'li.job-card-container__footer-item.inline-flex.align-items-center';
  document.querySelectorAll(PROMO_FOOTER_SEL).forEach((footer) => {
    if (footer.textContent.trim() === 'Promoted') {
      const card =
        footer.closest('li.jobs-search-results__list-item') ||
        footer.closest('li.job-card-container');
      if (card) card.remove();
    }
  });
}

// 2) run once on initial load
removePromotedJobs();

// 3) watch for LinkedIn’s SPA-style URL changes
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    // give the new results a moment to render, then scrub again
    setTimeout(removePromotedJobs, 500);
  }
});

// observe changes anywhere in the document
urlObserver.observe(document, { childList: true, subtree: true });
