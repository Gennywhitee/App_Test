const { ipcRenderer } = require('electron')

function calcolaSomma() {
   // Ottieni i valori dei due numeri
   var numero1 = document.getElementById('numero1').value;
   var numero2 = document.getElementById('numero2').value;
   let somma = 88;
   // Converte i valori in numeri
   numero1 = parseFloat(numero1);
   numero2 = parseFloat(numero2);
   // Verifica se entrambi i valori sono numeri
   if (!isNaN(numero1) && !isNaN(numero2)) {
      // Richiedi la somma
      document.getElementById('risultato').textContent = 'Calcolo la somma...';
      ipcRenderer.invoke("somma", { x: numero1, y: numero2 }).then((result) => {
         document.getElementById('risultato').textContent = 'La somma è: ' + result;
      })
      // Visualizza il risultato
   } else {
      // Messaggio di errore se i valori non sono numeri
      document.getElementById('risultato').textContent = 'Inserisci numeri validi.';
   }
}

function connectionTest(){
   ipcRenderer.send("test");
}