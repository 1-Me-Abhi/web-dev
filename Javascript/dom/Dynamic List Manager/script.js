let add = document.querySelector('.add');
let input = document.querySelector('.input');
let remove = document.querySelector('.remove');
let clear = document.querySelector('.clearAll');
let items = document.querySelector('.items')
function addNew() {
    let newItem = input.value.trim();
    if (newItem) {
        let listitem = document.createElement('li');
        listitem.textContent = newItem;
        items.appendChild(listitem);
        input.value = ''
    }
}
function clearAll() {
    items.innerHTML = '';
}
function removeitem() {
    if (items.children.length > 0) {
        items.removeChild(items.lastElementChild);
    }
}
add.addEventListener('click', addNew);
clear.addEventListener('click', clearAll)
remove.addEventListener('click', removeitem)
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addNew();
    }
});
