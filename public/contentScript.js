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

removePromotedJobs();

let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(removePromotedJobs, 500);
  }
});

urlObserver.observe(document, { childList: true, subtree: true });
