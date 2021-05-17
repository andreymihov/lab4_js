const API = 'https://pokeapi.co/api/v2/pokemon/';

const $list  = document.querySelector('.search-field .drop-menu > ul');
const $field = document.querySelector('.search-field > input');

let list = [];

function listGenerator(list) {
    let template = '';
    for (let i = 0; i < list.length; i++) {
        template += '<li>' + list[i].name + '</li>';
    }
    $list.innerHTML = template;
    if(list.length == 0){
        console.log("not found");
        $list.innerHTML = '<li class="not-found"> NOT FOUND </li>'
    }
}

fetch(API)
    .then(function (responce) {
        return responce.json()
    })
    .then(function (data) {
        list = data.results;
        listGenerator(list);
    });


$field.addEventListener('input', function() {
    let query = this.value.toLowerCase();
    let buffer = list;


    buffer = buffer.filter(function (element) {
        let el = element.name.toLowerCase().indexOf(query) + 1;


        return el;
    });

    listGenerator(buffer);
});

$field.addEventListener('focus', function () {
    this.parentNode.classList.add('active');
});

$field.addEventListener('blur', function () {
    this.parentNode.classList.remove('active');
});

