(() => {
  console.log('Script loaded.');

  const pollForContainer = () => {
    const watchlistContainer = document.querySelector('.erc-watchlist .watchlist-body');
    if (watchlistContainer) {
      console.log('Watchlist container detected.');
      waitForItemsToLoad(watchlistContainer);
    } else {
      console.log('Waiting for watchlist container...');
      setTimeout(pollForContainer, 500); // Retry every 500ms
    }
  };

  const waitForItemsToLoad = (watchlistContainer) => {
    const placeholders = document.querySelectorAll('.loading--9nt-6');
    if (placeholders.length > 0) {
      console.log(`Loading items... (${placeholders.length} placeholders remaining)`);
      setTimeout(() => waitForItemsToLoad(watchlistContainer), 500);
    } else {
      console.log('All items loaded.');
      processWatchlist(watchlistContainer);
    }
  };

  const processWatchlist = (watchlistContainer) => {
    const watchlistItems = Array.from(document.querySelectorAll('.erc-my-lists-item'));

    if (watchlistItems.length === 0) {
      console.error('No items found in watchlist.');
      return;
    }

    console.log(`Found ${watchlistItems.length} items. Grouping them...`);
    const groups = groupWatchlistItems(watchlistItems);

    watchlistContainer.innerHTML = ''; // Clear the container
    enhanceWatchlist(watchlistContainer, groups);
  };

  const groupWatchlistItems = (watchlistItems) => {
    const groups = {
      'Up Next': [],
      'Continue': [],
      'Start Watching': [],
      'Watch Again': []
    };

    watchlistItems.forEach(item => {
      const subtitleElement = item.querySelector('h5.watchlist-card-subtitle--IROsU');
      if (subtitleElement) {
        const status = subtitleElement.textContent.trim();

        if (status.includes('Up Next')) {
          groups['Up Next'].push(item);
        } else if (status.includes('Continue')) {
          groups['Continue'].push(item);
        } else if (status.includes('Start Watching')) {
          groups['Start Watching'].push(item);
        } else if (status.includes('Watch Again')) {
          groups['Watch Again'].push(item);
        }
      }
    });

    console.log('Items grouped.');
    return groups;
  };

  const enhanceWatchlist = (watchlistContainer, groups) => {
    const orderedGroups = ['Up Next', 'Continue', 'Start Watching', 'Watch Again'];

    orderedGroups.forEach(groupTitle => {
      const items = groups[groupTitle];
      if (!items || items.length === 0) return;

      const groupContainer = document.createElement('div');
      groupContainer.className = 'group-container';

      const groupTitleElement = document.createElement('h2');
      groupTitleElement.textContent = groupTitle;

      // Add some styles to the group titles
      groupTitleElement.style.fontSize = '24px';
      groupTitleElement.style.fontWeight = 'bold';
      groupTitleElement.style.marginBottom = '16px';
      groupTitleElement.style.marginTop = '32px';
      groupTitleElement.style.color = '#ff8100';
      groupTitleElement.style.borderBottom = '2px solid #ff8100';
      groupTitleElement.style.paddingBottom = '8px';

      const gridContainer = document.createElement('div');
      gridContainer.className = 'erc-my-lists-collection erc-watchlist-virtual-list-row';

      items.forEach(item => {
        const clonedItem = item.cloneNode(true);

        // Fix image loading issues by ensuring proper src
        const images = clonedItem.querySelectorAll('img[data-t="original-image"], img[data-t="preview-image"]');
        images.forEach(img => {
          const realSrc = img.getAttribute('src');
          if (realSrc) {
            img.setAttribute('src', realSrc);
            img.classList.add('progressive-image-base__fade--is-ready--dMxKu');
          }
        });

        gridContainer.appendChild(clonedItem);
      });

      groupContainer.appendChild(groupTitleElement);
      groupContainer.appendChild(gridContainer);
      watchlistContainer.appendChild(groupContainer);
    });

    console.log('Watchlist updated and grouped successfully!');
  };

  pollForContainer();
})();
