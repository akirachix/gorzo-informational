
function myFunction() {
  const explanations = document.getElementsByClassName("explanation");
  if (explanations.length > 0) {
    explanations[0].classList.toggle("show");
  }
}
module.exports = { myFunction };