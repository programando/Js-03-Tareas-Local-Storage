// VARIABLES
ListaTwits = document.getElementById('lista-tweets');
Form       = document.getElementById('formulario');
// EVENT LISTENERS 
EventListeners() ;

// FUNCIONES
function EventListeners() {
    // Enviar texto para almacenarse en local storage
    Form.addEventListener('submit', EnviarTwuit);
    // Borrar un nodo del DOM
    ListaTwits.addEventListener('click',BorrarTwuit);
    // Cargar datos almacenados en local storage
    document.addEventListener('DOMContentLoaded', LocalStorageListar);
}

function EnviarTwuit (e){
    e.preventDefault();
    /// Leer el valor desde el Text Area
    Twet = document.getElementById('tweet').value ;
    Twet = Twet.toUpperCase();
    if ( !Twet ) return ;
        // pinta el elemento en el DOM
        CrearTweetEnDOM (Twet );
        document.getElementById('tweet').value = '';
        //  Agregar texto a LOCALSTORAGE
        LocalStorageAgregarTwit (Twet );
}

function CrearTweetEnDOM ( Tweet ) {
    // Crear elemento el DOM y añadir contenido a la lista
    const li = document.createElement('li');
    const btnBorrar = document.createElement('a');
// agregar clase y texto al boton borrar
    btnBorrar.classList = 'borrar-tweet';
    btnBorrar.innerText = 'X';
// Agregar el texto registrado al LI creado
    li.innerText = Tweet ;
//  Agregar elemento li al DOM
    ListaTwits.appendChild(li);
//  Agregar boton Eliminar al LI ( DOM )
    li.appendChild(btnBorrar);
// limpiar el valor del text Area
}

function BorrarTwuit (e) {
    e.preventDefault();
    // controlar que solo se ejecute click en la X de borrar
        if ( e.target.className === 'borrar-tweet') {
            // Remover el elemento completo (LI) del DOM
            e.target.parentElement.remove();
            LocalStorageBorrarTweet( e.target.parentElement );
        }
}
function LocalStorageBorrarTweet ( NodoHtml ) {
    let Tweet, ListaTwits ;
    Tweet = NodoHtml.innerText;
    Tweet = Tweet.substring(0, Tweet.length-1);
    ListaTwits = LocalStorageBuscarTwits();
 
    ListaTwits.forEach ( (LocalStorageTweet,index) => {
        // si lo que voy a borrar está dentro del arreglo....
         if ( LocalStorageTweet === Tweet ){
            ///.... lo borro usando la posición  borra un solo elemento
            ListaTwits.splice( index,1);
        }
    });
 
    LocalStorageAlmacenar ( ListaTwits );
}

function LocalStorageAgregarTwit (Twet ){
    let ListaTwits ;
    // Busca el localstorage todos los registros almacenados
    ListaTwits = LocalStorageBuscarTwits (); // Devuelve un array
    // agrego texto al final del array
    ListaTwits.push(Twet );
    LocalStorageAlmacenar ( ListaTwits );
}

function LocalStorageAlmacenar( ListaTweets  ) {
    //  stringify   Convierte un objeto o valor en una cadena de texto JSON
    //  Necesrio porque LocalStorage sólo almacena cadenas 
    ListaTweets = JSON.stringify ( ListaTweets );
    //  Una vez convertido, lo agrego a local storage
    localStorage.setItem( 'tweets', ListaTweets );
}

function LocalStorageBuscarTwits () {
    let ListaTwits ; 
    // Obtengo el valor almacena en local storage en la llave
    ListaTwits = localStorage.getItem('tweets');
    // si no existe nada, entonces es null... y devuelvo
    if ( ListaTwits === null ){
        // .... un array vacío
        ListaTwits = [];
    }else {
        // en caso contrario convierto la cadena almacenada en formato JSON ( array )
        ListaTwits = JSON.parse ( ListaTwits );
    }   
    return ListaTwits;
}

function LocalStorageListar () {
    let Tweets;
    Tweets = LocalStorageBuscarTwits();
    
    Tweets.forEach(
        element => { 
            CrearTweetEnDOM ( element);
    });
}