export function allowNumberOnly(evt) {
  const event = evt || window.event;
  let key = "";

  // handle paste event
  if (event.type === "paste") {
    key = event.clipboardData.getData("text/plain");
  } else {
    key = event.keyCode || event.which;
    key = String.fromCharCode(key);
  }

  const regex = /[0-9]|\./;
  if (!regex.test(key)) {
    evt.preventDefault();
  }
}