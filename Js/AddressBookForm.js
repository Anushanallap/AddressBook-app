let isUpdate = false;
let contactObj = [];
let items= {};
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            setTextValue('.name-error',"");
            return;
        }
        try {
            (new Contact()).name = name.value;
            setTextValue('.name-error',"");
        } catch (e) {
            setTextValue('.name-error',e);
        }
    });

  
    const address = document.querySelector("#address");
    address.addEventListener("input", function() {
        if (address.value.length == 0) {
            setTextValue(".address-error", "");
            return;
        }
        try {
            new Contact().address = address.value;
            setTextValue(".address-error", "");
        } catch (error) {
            setTextValue(".address-error", error);
        }
    });
    const phoneNumber = document.querySelector("#phoneNumber");
    phoneNumber.addEventListener("input", function() {
        if (phoneNumber.value.length == 0) {
            setTextValue(".tel-error", "");
            return;
        }
        try {
            new Contact().phoneNumber = phoneNumber.value;
            setTextValue(".tel-error", "");
        } catch (error) {
            setTextValue(".tel-error", error);
        }
    });
    const zip = document.querySelector("#zip");
    zip.addEventListener("input", function() {
        if (zip.value.length == 0) {
            setTextValue(".zip-error", "");
            return;
        }
        try {
            new Contact().zip = zip.value;
            setTextValue(".zip-error", "");
        } catch (error) {
            setTextValue(".zip-error", error);
        }
    });
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setContactObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace("../Pages/HomePage.html");
    } catch (error) {
        alert(error);
        return
    }
}

const setContactObject = () => {
    contactObj._name = getInputValueById('#name');
    contactObj._address = getInputValueById('#address');
    contactObj._city = getInputValueById('#city');
    contactObj._state = getInputValueById('#state');
    contactObj._zip = getInputValueById('#zip');
    contactObj._phoneNumber = getInputValueById('#phoneNumber');
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
const sortByName = () =>{
    
    contactObj = JSON.parse(localStorage.getItem("ContactList"));
    sortByKey(contactObj, '_name');
    console.log(contactObj);
    localStorage.setItem("ContactList",JSON.stringify(contactObj));
    window.location.reload();
}

const sortByCity = () =>{
    
    contactObj = JSON.parse(localStorage.getItem("ContactList"));
    sortByKey(contactObj, '_city');
    console.log(contactObj);
    localStorage.setItem("ContactList",JSON.stringify(contactObj));
    window.location.reload();
}

const createAndUpdateStorage = () => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
        if(contactList){
            let contactData = contactList.
                            find(contact => contact._id == contactObj._id);
        if(!contactData)
            contactList.push(createContactData());
        else{
            const index = contactList.map(cnt => cnt._id)
                            .indexOf(contactData._id);
            contactList.splice(index,1,createContactData(contactData._id));
            }
        }
        else{
            contactList = [createContactData()];
        }
        localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const createContactData = (id) => {
    let contactData = new Contact();
    if(!id)
        contactData.id = createNewContactId();
    else
        contactData.id = id;
    setContactData(contactData);
    return contactData;
}

const createNewContactId = () => {
    let cntID = localStorage.getItem("ContactID");
    cntID = !cntID ? 1 : (parseInt(cntID)+1).toString();
    localStorage.setItem("ContactID",cntID);
    return cntID;
}

const setContactData = (contactData) => {
    let contact = new Contact();
    try{
        contactData.name = contactObj._name;
      }catch(e){
          setTextValue('.name-error',e);
      }

    try {
        contactData.phoneNumber = contactObj._phoneNumber;
    } catch (error) {
        setTextValue(".tel-error", error);
    }

    try {
        contactData.address = contactObj._address;
    } catch (error) {
        setTextValue(".address-error", error);
    }

    contactData.city = contactObj._city;
    contactData.state = contactObj._state;

    try {
        contactData.zip = contactObj._zip;
    } catch (error) {
        setTextValue(".zip-error", error);
    }

    alert(contactData.toString());
    return contact;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const getInputValueById = (property) => {
    let value = document.querySelector(property).value;
    return value;
}

const resetForm = () => {
    setValue("#name", "");
    setValue("#phoneNumber", "");
    setValue("#address", "");
    setSelectedIndex('#city', 0);
    setSelectedIndex('#state', 0);
    setValue("#zip", "");
    setTextValue(".name-error", "");
    setTextValue(".tel-error", "");
    setTextValue(".address-error", "");
    setTextValue(".zip-error", "");
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const contactJson = localStorage.getItem('editContact');
    isUpdate = contactJson ? true : false;
    if(!isUpdate) return;
    contactObj = JSON.parse(contactJson);
    setForm();
  }
  
  const setForm = () => {
    setValue('#name', contactObj._name);
    setValue('#address',contactObj._address);
    setValue('#city',contactObj._city);
    setValue('#state',contactObj._state);
    setValue('#zip',contactObj._zip);
    setValue('#phoneNumber',contactObj._phoneNumber);
  }