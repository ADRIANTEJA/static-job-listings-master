const jobListingList = document.querySelector('[job-listing-list]');

let jobListingsArray = []; 

fetch('https://localhost:7058/joblistings')
    .then(response => response.json())
    .then(data => {
        jobListingsArray = data;
        renderJobListings(jobListingsArray);
    });

function renderJobListings(jobListings) {

    while (jobListingList.firstChild) jobListingList.removeChild(jobListingList.firstChild);

    jobListings.forEach(jobListingData => {

        const listElement = document.createElement('li');
        listElement.classList.add('job-listing-li');
        const dataContainer = document.createElement('div');

        if (jobListingData.isFeatured === true) {

            const featuredDiv = document.createElement('div');
            featuredDiv.classList.add('featured-colored-border');

            listElement.classList.add('featured');
            listElement.appendChild(featuredDiv);
        }

        listElement.appendChild(dataContainer);

        const listingImage = document.createElement('img');
        listingImage.classList.add('logo');
        listingImage.src = jobListingData.logo;
        dataContainer.appendChild(listingImage);

        const jobListingHeader = document.createElement('div');
        jobListingHeader.classList.add('job-listing-header');
        dataContainer.appendChild(jobListingHeader);

        const companyTag = document.createElement('h3');
        companyTag.classList.add('company-tag');
        companyTag.textContent = jobListingData.company;
        jobListingHeader.appendChild(companyTag);

        const isNewTag = document.createElement('h5');
        isNewTag.classList.add('is-new-tag');
        isNewTag.textContent = 'NEW!';
        if (!jobListingData.isNew == true) isNewTag.style.visibility = 'hidden';
        jobListingHeader.appendChild(isNewTag);

        const isFeaturedTag = document.createElement('h5');
        isFeaturedTag.classList.add('is-featured-tag');
        isFeaturedTag.textContent = 'FEATURED';
        if (!jobListingData.isFeatured) isFeaturedTag.style.visibility = 'hidden';
        jobListingHeader.appendChild(isFeaturedTag);

        const positionTag = document.createElement('h3');
        positionTag.classList.add('position-tag');
        positionTag.textContent = jobListingData.position;
        dataContainer.appendChild(positionTag);

        const timeLocationTagsRow = document.createElement('div');
        timeLocationTagsRow.classList.add('time-location-tags-row');
        dataContainer.appendChild(timeLocationTagsRow);

        const timeTag = document.createElement('h3');
        timeTag.classList.add('created-at-tag');
        timeTag.textContent = jobListingData.postedAt;
        timeLocationTagsRow.appendChild(timeTag);

        const contractTag = document.createElement('h3');
        contractTag.classList.add('location-contract-tag');
        contractTag.textContent = jobListingData.contractType;
        timeLocationTagsRow.appendChild(contractTag);

        const locationTag = document.createElement('h3');
        locationTag.classList.add('location-contract-tag');
        locationTag.textContent = jobListingData.location;
        timeLocationTagsRow.appendChild(locationTag);

        const dataDivider = document.createElement('div');
        dataDivider.classList.add('divider');
        dataContainer.appendChild(dataDivider);

        const languageToolRoleLevelGrid = document.createElement('div');
        languageToolRoleLevelGrid.classList.add('language-tool-role-level-tags-grid');
        dataContainer.appendChild(languageToolRoleLevelGrid);

        const roleTag = document.createElement('Button');
        roleTag.classList.add('language-tool-role-level-tag');
        roleTag.textContent = jobListingData.role;
        roleTag.addEventListener('click', e => { addFilter(roleTag.textContent) });
        languageToolRoleLevelGrid.appendChild(roleTag);

        const levelTag = document.createElement('Button');
        levelTag.classList.add('language-tool-role-level-tag');
        levelTag.textContent = jobListingData.level;
        levelTag.addEventListener('click', e => { addFilter(levelTag.textContent) });
        languageToolRoleLevelGrid.appendChild(levelTag);

        jobListingData.languages.forEach(language => {
            const languageTag = document.createElement('Button');
            languageTag.classList.add('language-tool-role-level-tag');
            languageTag.textContent = language.name;
            languageTag.addEventListener('click', e=> { addFilter(languageTag.textContent) });
            languageToolRoleLevelGrid.appendChild(languageTag);
        });

        jobListingData.tools.forEach(tool => {
            const ToolTag = document.createElement('Button');
            ToolTag.classList.add('language-tool-role-level-tag');
            ToolTag.textContent = tool.name;
            ToolTag.addEventListener('click', e => { addFilter(ToolTag.textContent) });
            languageToolRoleLevelGrid.appendChild(ToolTag);
        });
        
        dataContainer.classList.add('job-listing-box');
        jobListingList.appendChild(listElement);
    });
 }

 function filterJobListings(jobListings) {

    let filterJobListings = Array.from(jobListings);

    for (let i = 0; i < filtersBox.children.length; i++) { 

        filterJobListings = filterJobListings.filter(jobListing => {

            if (jobListing.role === filtersBox.children[i].textContent
                || jobListing.level === filtersBox.children[i].textContent
                || jobListing.tools.some(tool => tool.name === filtersBox.children[i].textContent) 
                || jobListing.languages.some(language => language.name === filtersBox.children[i].textContent)) return true;
                
            else return false;
        })
    }

    return filterJobListings;
 }