window.addEventListener('load',() =>{
    console.log('JS vinculado correctamente...')

    function ordenarAsc(p_array_json, p_key) {
        p_array_json.sort(function (a, b) {
           return a[p_key] > b[p_key];
        });
     }

     function ordenarById(array){
        array.sort(function (prev, next) { 
            return prev.id - next.id
          })
     }

     let selectCiudad = function(){

        inputProvincia.value = provinciaSelect.options[provinciaSelect.selectedIndex].text;

        ciudadSelect.innerHTML = ""

        fetch('https://apis.datos.gob.ar/georef/api/localidades?max=1000&provincia=' + inputProvincia.value)

        .then(response => response.json())

        .then( result => {
            
            ordenarAsc(result.localidades,'nombre');

            result.localidades.forEach(localidad => {
                ciudadSelect.innerHTML += `<option value=${localidad.id}>${localidad.nombre}</option>`
            })

            ciudadSelect.style.display = "block";
            inputCiudad.style.display = "none";
        })
     }


    let provinciaSelect = document.getElementById('provinciaSelect');
    let ciudadSelect = document.getElementById('ciudadSelect');
    let inputProvincia = document.getElementById('inputProvincia');
    let inputCiudad = document.getElementById('inputCiudad');

    fetch('https://apis.datos.gob.ar/georef/api/provincias')
  
    .then(response => response.json())

    .then(result => {

        ordenarAsc(result.provincias,'nombre')
        
        result.provincias.forEach(provincia => {
            provinciaSelect.innerHTML += `<option value=${provincia.id}>${provincia.nombre}</option>`
        })
    })

    inputProvincia.addEventListener('focus',()=>{
        inputProvincia.style.display = "none";
        provinciaSelect.style.display = "block"
    })

    provinciaSelect.addEventListener('change',()=>{
        provinciaSelect.style.display = "none";
        inputProvincia.style.display = "block";

        

        selectCiudad();
    })

    ciudadSelect.addEventListener('change',() =>{
        ciudadSelect.style.display = "none";
        inputCiudad.style.display = "block";

        inputCiudad.value = ciudadSelect.options[ciudadSelect.selectedIndex].text;

    })

    inputCiudad.addEventListener('focus',()=>{
        inputCiudad.style.display = "none";
        ciudadSelect.style.display = "block";
        selectCiudad()
    })
})