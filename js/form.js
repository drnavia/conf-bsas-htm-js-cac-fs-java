/*========== FORMULARIO - DOM ==========*/
const formulario = document.getElementById('formulario')
const inputs = formulario.getElementsByTagName('input')
const tickets = document.getElementById('tickets');
const select = document.getElementById('category')
const toPay = document.getElementById('total')
const resetBtn = document.getElementById('reset')
const submitBtn = document.getElementById('submit')

/*========== FORMULARIO - UTILIDADES ==========*/
const price = 200
const categories = {
  cat1: { percent: 80, value: '0' },
  cat2: { percent: 50, value: '1' },
  cat3: { percent: 15, value: '2' }
}
let ticket = null
let category = null
let total = null

function totalPrice () {
  if (!ticket || !category) return;

  total = (price * ticket / 100) * categories[category].percent
  toPay.innerText = total
}


/*========== FORMULARIO - EVENTS ==========*/
function resetCategorySelected () {
  total = null
  selected = null
  toPay.innerText = ''
  select.value = 'none'
}

function setCategory (event) { // Se ejecuta al realizar la selección
  const option = event.target.value

  if (option === 'none') {
    resetCategorySelected()
    cleanCardSelected();
    return
  }

  category = option
  const index = categories[category].value
  selected = index

  matchCardSelected(selected)
  eventCardAddAll()
  totalPrice()
}

function setTicket (event) {
  const { value } = event.target

  if (value < 0 || isNaN(value)) {
    event.target.value = 0
    total = null
    return
  }

  ticket = value
  totalPrice()
}

function resetForm (event) {
  event.preventDefault()

  for (let input of inputs)
    input.value = ''

  select.value = 'none'

  resetCategorySelected()
}

function submitForm (event) {
  event.preventDefault()

  const { firstname, lastname, email, tickets, category } = formulario

  const verified = {
    firstname: firstname.value !== '',
    lastname: lastname.value !== '',
    email: email.value.includes('@'),
    tickets: tickets.value > 0,
    category: category.value !== 'none'
  }
  const values = Object.values(verified)
  const submitOk = values.every(value => value)

  submitOk
    ?
    location.href = './success.html' :
    Swal.fire({
      title: 'Oops...',
      text: 'Debes completar todos los campos correctamente',
    })
}

function onlyNumber(event) {
  const inputNumber = event.target;

  if (inputNumber.value < 0) {
    inputNumber.value = Math.abs(inputNumber.value);
  }
  inputNumber.value = inputNumber.value.replace(/[^0-9]/g, '');
}


/*========== ASIGNACION DE EVENTOS ==========*/
tickets.addEventListener('input', onlyNumber);
formulario.tickets.addEventListener('keyup', setTicket)
formulario.tickets.addEventListener('change', setTicket)
formulario.category.addEventListener('change', setCategory)
formulario.addEventListener('submit', submitForm)
resetBtn.addEventListener('click', resetForm)
