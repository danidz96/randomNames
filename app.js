async function getRegions() {
    const url = 'https://raw.githubusercontent.com/thm/uinames/master/names.json';
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

getRegions()
    .then(data => {
        let html = '<option value=""> --- Select ---</option>';
        data.forEach(region => {
            html += `<option value="${region.region}">${region.region}</option>`;
        });
        document.querySelector('#region').innerHTML = html;
    })
    .catch(err => console.log(err))

document.querySelector('.submit').addEventListener('click', () => {
    const gender = document.querySelector('#gender').value;
    const region = document.querySelector('#region').value;
    const amount = document.querySelector('#amount').value;

    let url = 'https://uinames.com/api/?';

    if (gender !== '') {
        url += `gender=${gender}&`
    }
    if (region !== '') {
        url += `region=${region}&`
    }
    if (amount !== '') {
        url += `amount=${amount}&`
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        let output = '';

        if (amount > 1) {
            data.forEach(person => {
                output += `<li>${person.name} ${person.surname}</li>`
            });
        } else {
            output += `<li>${data.name} ${data.surname}</li>`
        }

        document.querySelector('.name-list').innerHTML = output;
    })
    .catch(err => console.log(err))
});