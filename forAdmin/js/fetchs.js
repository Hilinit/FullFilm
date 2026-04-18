let Base_API = `https://69b99a1ce69653ffe6a8318b.mockapi.io/moveData`
let News_API = `https://69b99a1ce69653ffe6a8318b.mockapi.io/news`

let dataCount = document.getElementById('dataCount')

const title = document.getElementById('title')
const imdbRating = document.getElementById('imdbRating')
const description = document.getElementById('description')
const genre = document.getElementById('genre')
const director = document.getElementById('director')
const cast = document.getElementById('cast')
const scenario = document.getElementById('scenario')
const poster = document.getElementById('poster')
const serialInputs = document.querySelectorAll('#serialInfo input')


function collectData() {
  const type = document.querySelector('input[name="filmType"]:checked')?.value
  const filmDuration = document.querySelector('#filmDuration input')
  const serialInputs = document.querySelectorAll('#serialInfo input')

  return {
    title: title.value,
    imdbRating: imdbRating.value,
    description: description.value,
    genre: genre.value,
    type,
    director: director.value,
    cast: cast.value,
    scenario: scenario.value,
    poster: poster.value,
    details: type === "film"
      ? { duration: filmDuration.value }
      : {
          seasons: serialInputs[0].value,
          episodes: serialInputs[1].value
        }
  }
}

function submitData() {
  const data = collectData()

  fetch(Base_API, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" }
  }).then(() => {
    document.querySelector("form").reset()
    allDatas()
  })
}

let allData = []

function allDatas() {
  fetch(Base_API)
    .then(res => res.json())
    .then(res => {
      allData = res
      getData(allData)
    })
}
allDatas()

let table = document.getElementById("table")
function getData() {
  table.innerHTML = ""
  dataCount.innerHTML = allData.length ? `Bazada ${allData.length} məlumat var:` : `Bazada Məlumat yoxdur!`

  allData.map(item => {
    table.innerHTML += `
    <tr class="even:bg-white/10">
      <td class="p-4 text-sm text-white/70 ">
      ${item.id}
      </td>
      <td class="text-sm  text-white/70">
        ${item.title}
      </td>
      <td class=" text-sm text-white/70">
        ${item.genre}
      </td>
      <td class=" text-sm text-white/70">
        ${item.director}
      </td>
      <td class="  text-sm text-white/70">
        ${item.imdbRating}
      </td>
      <td class="p-2 text-sm text-white/70">
      ${item.type}
      </td>
     
      <td class="p-2">
        <button onclick="doubleClick(${item.id})" class="mr-4" title="Edit">
        <i class="fa-regular fa-pen-to-square w-5 text-blue-500 hover:text-blue-700"></i>     
        </button>
        <button onclick="deleteItem(${item.id})" class="mr-4" title="Delete">
        <i class="fa-regular fa-trash-can w-5 text-red-500 hover:text-red-700"></i>      
        </button>
      </td>
    </tr>`
  })
}

//------------------------------------------------------------------
let selectedId = null;
function findItem(id) {
  selectedId = id
  const selected = allData.find(item => item.id == id)

  title.value = selected.title
  imdbRating.value = selected.imdbRating
  description.value = selected.description
  genre.value = selected.genre
  director.value = selected.director
  cast.value = selected.cast
  scenario.value = selected.scenario
  poster.value = selected.poster

  document.querySelector(`input[name="filmType"][value="${selected.type}"]`).checked = true

  const filmDuration = document.querySelector('#filmDuration')
  const serialInfo = document.querySelector('#serialInfo')
  
  if (selected.type === "film") {
    document.querySelector('#filmDuration input').value =
      selected.details.duration 

    filmDuration.classList.remove('hidden')
    serialInfo.classList.add('hidden')

  } else {
    const inputs = serialInfo.querySelectorAll('input')

    inputs[0].value = selected.details.seasons 
    inputs[1].value = selected.details.episodes 

    serialInfo.classList.remove('hidden')
    filmDuration.classList.add('hidden')
  }
  
}

function updateItem() {
  if (!selectedId) return

  const data = collectData()

  fetch(`${Base_API}/${selectedId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json" }
  }).then(() => 
    { allDatas()
      let selectedId = null;
    })
}


function doubleClick(id) {
  findItem(id)
  document.getElementById('modal').style.display = 'block'
}

function addOrUpdate() {
  const btn = document.getElementById('btn')
  if (selectedId) {
    updateItem();
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-spinner"></i>`
    });
    setTimeout(() => {
      btn.innerHTML = `Yeniləndi!`
    }, 500);
    setTimeout(() => {
      document.getElementById('modal').style.display = 'none'
    }, 1000);
  } 

  else {
    submitData();
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-spinner"></i>`
    });
    setTimeout(() => {
      btn.innerHTML = `Əlavə Edildi!`
    }, 500);
    btn.innerHTML = `<i class="fa-solid fa-spinner"></i>`
    setTimeout(() => {
      document.getElementById('modal').style.display = 'none'
    }, 1000);
  }
  btn.innerHTML = `Təstiq et`
}

//---------------------------------------
function deleteItem(id) {
  fetch(`${Base_API}/${id}`, {
    method: "DELETE"
  })

    // silindikden sonra data-ni yenile
    .then(() => {
      allData = allData.filter(item => item.id != id);
      getData();
    });
}

//------------------------------------------------------------------




