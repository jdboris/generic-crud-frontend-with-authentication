export function E(html) {
  let template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

// Return a new input element bound (both ways) to the appropriate key of the given object
// options: an array of objects with 'id' and 'name' properties
export function newInput(html, object, options = []) {
  let element = E(html);

  if (element.tagName.toLowerCase() == "select") {
    for (let option of options) {
      // option: { id: 1, name: "USA" }
      let optionElement = E(`<option></option>`);
      optionElement.value = option.id;
      optionElement.innerText = option.name;

      element.append(optionElement);
    }

    object[element.name] = options[0].id;
  }

  if (object[element.name] != null) {
    if (element.type == "checkbox") {
      element.checked = object[element.name];
    } else {
      element.value = object[element.name];
    }
  }

  element.oninput = () => {
    object[element.name] =
      element.type == "checkbox" ? element.checked : element.value;
  };
  return element;
}

// export function insertHere(element) {
//   document.currentScript.parentNode.insertBefore(
//     element,
//     document.currentScript
//   );
// }
