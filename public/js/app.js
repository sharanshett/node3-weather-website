console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()//it stops clearing search form after submitting

  messageOne.textContent = 'Loading.....'

  const location = search.value
//fetch('http://localhost:3000/weather?address='+ location +'').then((response) => {
  fetch('/weather?address='+ location +'').then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        //console.log(data.error)
      } else {
        
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
          //console.log(data.location)
          //console.log(data.forecast)
  }
})
})
  //console.log(location)
})