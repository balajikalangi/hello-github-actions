document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-opportunity-form');
    const opportunitiesList = document.getElementById('opportunities-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('opportunity-title').value;
        const description = document.getElementById('opportunity-description').value;

        addOpportunity(title, description);
        form.reset();
    });

    function addOpportunity(title, description) {
        const opportunityDiv = document.createElement('div');
        opportunityDiv.classList.add('opportunity');

        const opportunityTitle = document.createElement('h3');
        opportunityTitle.textContent = title;

        const opportunityDescription = document.createElement('p');
        opportunityDescription.textContent = description;

        const participateButton = document.createElement('button');
        participateButton.textContent = 'Participate';
        participateButton.classList.add('participate-btn');
        participateButton.addEventListener('click', () => {
            alert(`Thank you for participating in "${title}"!`);
            participateButton.disabled = true;
            participateButton.textContent = 'Participated';
        });

        opportunityDiv.appendChild(opportunityTitle);
        opportunityDiv.appendChild(opportunityDescription);
        opportunityDiv.appendChild(participateButton);

        opportunitiesList.appendChild(opportunityDiv);
    }
});
