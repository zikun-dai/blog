<script>
  (function () {
    function shouldIgnoreClick(event) {
      if (event.defaultPrevented || event.button !== 0) return true;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return true;
      return !!event.target.closest('a, button, input, textarea, select, label, summary');
    }

    function bindPostBlockLinks() {
      var content = document.querySelector('.content');
      if (!content || !content.classList.contains('index')) return;
      document.querySelectorAll('.posts-expand .post-block').forEach(function (block) {
        if (block.dataset.postBlockLinkBound) return;
        block.dataset.postBlockLinkBound = 'true';
        block.addEventListener('click', function (event) {
          if (shouldIgnoreClick(event)) return;
          var link = block.querySelector('a.post-title-link');
          if (!link || !link.href) return;
          if (link.target === '_blank') {
            window.open(link.href, '_blank', 'noopener');
          } else {
            window.location.href = link.href;
          }
        });
      });
    }

    document.addEventListener('DOMContentLoaded', bindPostBlockLinks);
    document.addEventListener('pjax:complete', bindPostBlockLinks);
  })();
</script>
