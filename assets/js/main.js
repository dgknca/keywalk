document.addEventListener('DOMContentLoaded', () => {
  const jsEditor = document.querySelector('#js-editor')

  function manipulateCode() {
    jsEditor.innerHTML = Prism.highlight(
      `const keywalk = new Keywalk({
  trigger: '#input',
  container: '.list',
  onChange: (element, index) => {
    // open the console in your devtools
    console.log(
      'selected item: ', element,
      ' index: ', index
    )
  }
})

reset.addEventListener('click', () => {
  keywalk.reset()
})`,
      Prism.languages.js,
      'js'
    )
  }

  manipulateCode()
})
