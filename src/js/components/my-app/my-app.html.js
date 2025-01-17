export const htmlTemplate = document.createElement('template')

htmlTemplate.innerHTML = `
<div id="container">
  <my-nickname></my-nickname>
  
  <div class="hidden" id="quiz">
      <my-quiz-question id="quiz-question"></my-quiz-question>
      <my-countdown></my-countdown>
  </div>
  

  <div>
    <my-highscore class="hidden"></my-highscore>
  </div>
</div>
`
