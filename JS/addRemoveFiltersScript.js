const filtersControl = document.querySelector('[filters-control]');
const filtersBox = document.querySelector('[filters-box]');
const clearFiltersButton = document.querySelector('[clear-filters-button]');

clearFiltersButton.addEventListener('click', clearFilters);

function addFilter(filterName) {

    for (let i = 0; i < filtersBox.children.length; i++) {
        
         if (filtersBox.children[i].textContent === filterName) return;
    } 

    const filterTag = document.createElement('div');
    filterTag.classList.add('filter-tag');

    const filterText = document.createElement('h3');
    filterText.classList.add('filter-text');
    filterText.textContent = filterName;
    filterTag.appendChild(filterText);

    const removeFilterButton = document.createElement('button');
    removeFilterButton.classList.add('remove-filter-button');
    removeFilterButton.addEventListener('click', removeFilter);
    const removeIcon = document.createElement('img');
    removeIcon.src = '../images/icon-remove.svg'
    removeFilterButton.appendChild(removeIcon);
    filterTag.appendChild(removeFilterButton);

    filtersBox.appendChild(filterTag);

    if (filtersBox.childElementCount > 0) filtersControl.style.visibility = 'visible';

    renderJobListings(filterJobListings(jobListingsArray));
}

function removeFilter(e) {

    e.stopPropagation();
    
    let filterTag = null;

    if (e.target.tagName === 'BUTTON') filterTag = e.target.parentElement;
    else if (e.target.tagName === 'IMG') filterTag = e.target.parentElement.parentElement;

    filtersBox.removeChild(filterTag);

    if (filtersBox.childElementCount === 0) filtersControl.style.visibility = 'hidden';

    renderJobListings(filterJobListings(jobListingsArray));
}

function clearFilters(e) {
    
    e.stopPropagation();

    while (filtersBox.firstChild) filtersBox.removeChild(filtersBox.firstChild);

    filtersControl.style.visibility = 'hidden';

    renderJobListings(jobListingsArray);
}
