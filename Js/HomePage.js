let contactList;
window.addEventListener('DOMContentLoaded', (event) => {
    contactList = getAddressBookDataFromStorage();
    console.log(contactList);
    document.querySelector(".contact-count").textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editContact');
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('ContactList') ? 
            JSON.parse(localStorage.getItem('ContactList')) : [];
}

//Template literal ES6 feature
const createInnerHtml = () => {
    const headerHtml = "<tr><th>Fullname</th><th>Address</th><th>City</th>"+
                        "<th>State</th><th>Zip</th><th>Phone Number</th><th>Actions</th></tr>";
    if(contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const contactData of contactList) {
        innerHtml = `${innerHtml}
        <tr>
            <td>${contactData._name}</td>
            <td>${contactData._address}</td>
            <td>${contactData._city}</td>
            <td>${contactData._state}</td>
            <td>${contactData._zip}</td>
            <td>${contactData._phoneNumber}</td>
            <td>
                <img id="${contactData._id}" onclick="remove(this)" alt="delete" src="../Assets/delete-black-18dp.svg">
                <img id="${contactData._id}" onclick="update(this)" alt="edit" src="../assets/create-black-18dp.svg">
            </td>
        </tr> `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const remove = (node) => {
    let contact = contactList.find(cnt => cnt._id == node.id);
    if(!contact) return;
    const index = contactList.map(cnt => cnt._id).indexOf(contact._id);
    contactList.splice(index,1);
    document.querySelector(".contact-count").textContent = contactList.length;
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    createInnerHtml();
}

const update = (node) => {
  let contact = contactList.find(cnt => cnt._id == node.id);
  if(!contact) return;
  localStorage.setItem("editContact",JSON.stringify(contact));
  window.location.replace(site_Properties.add_address_book_page);
}