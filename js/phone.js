const load = async (search, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);

    const data = await res.json();

    const phones = await data.data;
    console.log(data.status);
    console.log(search);
    
    //this checks if the search is valid or not
    if (!data.status)
            noResponse(data.status);    
    else
        noResponse(data.status);

    displayCard(phones, isShowAll);
}

const displayCard = (phones, isShowAll) => {
    const cardContainer = document.getElementById('phone-container');

    cardContainer.textContent = '';

    if (phones.length > 9 && !isShowAll) {
        phones = phones.slice(0, 9);
        toggleShow(true);
    }
    else
        toggleShow(false);

    phones.forEach(phone => {
        // console.log(phone);
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <div id="phone-card" class="card bg-gray-500 shadow-xl p-10">
        <figure><img src="${phone.image}"
                alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-primary" onclick="findPhoneDetail('${phone.slug}')">Show Details</button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(newCard);
        spinner(false);
    })
}

const searchBtn = (isShowALL) => {
    const searchText = document.getElementById('search').value;
    // console.log(searchText);
    load(searchText, isShowALL);
    spinner(true, isShowALL);

}

const spinner = (isSpin) => {
    const spin = document.getElementById('spinner');
    if (isSpin)
        spin.classList.remove('hidden');
    else
        spin.classList.add('hidden');
}

const showAll = () => {
    searchBtn(true);
}

const toggleShow = (toggle) => {
    const showBtn = document.getElementById('show');

    if (toggle)
        showBtn.classList.remove('hidden')
    else
        showBtn.classList.add('hidden');
}


const findPhoneDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = await data.data;
    loadModal(phone);
}

const loadModal = phone => {
    const modal = document.getElementById('modal');

    console.log(phone);
    // const newModal = document.createElement('div'); //eikhane vajal silo
    const newModal = document.getElementById('detail-container');
    newModal.innerHTML = `
    <dialog id="showDetail" class="modal">
                    <div class="modal-box">
                    <div class="flex justify-center"><img src="${phone.image}" alt=""></div>
                        <h3 class="font-bold text-lg">${phone.name}</h3>
                        <p class="py-2"><span class="font-bold">Storage:</span>  ${phone?.
            mainFeatures?.storage || 'no data available'}</p>

                        <p class="py-2"><span class="font-bold">Display Size:</span>  ${phone?.mainFeatures?.displaySize || 'no data available'}</p>

                        <p class="py-2"><span class="font-bold">Chipset:</span>  ${phone?.mainFeatures?.chipSet || 'no data available'}</p>
                <!--     //aray sensors part --> 
                        <p class="py-2"><span class="font-bold">Sensors:</span>  ${phone?.mainFeatures?.sensors.join(", ") || 'no data available'}</p>
                        
                        <p class="py-2"><span class="font-bold">GPS:</span>  ${phone?.others?.GPS || 'no data found'}</p>
                        
                        <p class="py-2"><span class="font-bold">Memory:</span>  ${phone?.mainFeatures?.memory || 'no data available'}</p>

                        <p class="py-2"><span class="font-bold">Release Date:</span>  ${phone?.releaseDate || 'no data found'}</p>

                        <p class="py-2"><span class="font-bold">Brand:</span>  ${phone?.brand || 'no data found'}</p>
                        


                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
    </dialog>
    
    `;
    // modal.appendChild(newModal);
    showDetail.showModal();
}

function noResponse(res) {
    if (!res){
        document.getElementById('no-response').classList.remove('hidden');
        spinner(false);
    }
    else
        document.getElementById('no-response').classList.add('hidden');
}

// load();