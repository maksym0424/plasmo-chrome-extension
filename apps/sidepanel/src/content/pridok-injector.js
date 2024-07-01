(function () {
  function updateTextAreas (data) {
    const textareas = document.querySelectorAll('.fadeInRightSmall textarea')
    if (textareas.length < 4) {
      console.error('Not enough textarea elements found.')
      return
    }

    const s = textareas[0]
    const o = textareas[1]
    const a = textareas[2]
    const p = textareas[3]

    const sScope = window.angular.element(s).scope()
    const oScope = window.angular.element(o).scope()
    const aScope = window.angular.element(a).scope()
    const pScope = window.angular.element(p).scope()

    if (!sScope || !oScope || !aScope || !pScope) {
      console.error('One or more scopes are not available.')
      return
    }

    function updateScope (scope, newValue) {
      scope.$apply(function () {
        scope.data.field.text = newValue
      })

      if (typeof scope.data.field.textChanged === 'function') {
        scope.data.field.textChanged()
      }
    }

    updateScope(sScope, data.subjective)
    updateScope(oScope, data.objective)
    updateScope(aScope, data.assessment)
    updateScope(pScope, data.plan)
  }

  document.addEventListener('injectData', function (event) {
    console.log('Injecting data.')
    updateTextAreas(event.detail)
  })
})()
