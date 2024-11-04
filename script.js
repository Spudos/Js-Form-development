// Load formdata from session storage and update the form to reflect the currently stored values for each input type
window.addEventListener('load', () => {
  const formdata = JSON.parse(sessionStorage.getItem('formdata'));

  if (formdata) {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.type === 'radio') {
        if (input.value === formdata[input.name]) { 
          input.checked = true;
        }
      } else if (input.type === 'text') {
        input.value = formdata[input.name];
      } else if (input.type === 'checkbox') {
        if (formdata[input.name].includes(input.value)) {
          input.checked = true;
        }
      }
    });
  }
});


// add a listener to the form to store the form data in session storage on input
const form = document.querySelector('form');
// add an input event listener to the form
form.addEventListener('input', (e) => {
  e.preventDefault();

  // get the form data
  const data = new FormData(form)
  // convert the form data to an object
  const values = Object.fromEntries(data.entries());

    
  // iterate over key in values
  for (const key in values) {
    // get the input type for the key in values
    let type = document.querySelector(`input[name=${key}]`).type;

    if (type === 'checkbox') {
      values[key] = data.getAll(key);
    }
  }

  // store the form data in session storage from the values object
  sessionStorage.setItem('formdata', JSON.stringify(values));
  console.log(values);
});


// display elements only if the parent element has been selected
document.querySelectorAll('[data-conditional]').forEach(element => {
  const [selector, operator, value] = element.dataset.conditional.split(',');
  const inputs = document.querySelectorAll(selector);
  // loop through the inputs and add a change event listener to each input if there is more than one input
  if (inputs.length > 1) {
    inputs.forEach(input => {
      input.addEventListener('change', () => {
        toggleConditionalDiv(input.value, operator, value, element)
      });
    });
  } else {
    // if there is only one input, add a change event listener to the input and display the element if the input value equals the value
    inputs[0].addEventListener('change', () => {
      if (operator === '!=') {
        element.style.display = inputs[0].value !== value ? 'block' : 'none';
      }
      if (operator === '=') {
        element.style.display = inputs[0].value === value ? 'block' : 'none';
      }
    });
  }
});

function toggleConditionalDiv(value1, operator, value2, element) {
  if (operator === '!=') {
    element.style.display = value1 !== value2 ? 'block' : 'none';
  }
  if (operator === '=') {
    element.style.display = value1 === value2 ? 'block' : 'none';
  }
}