const trickToImg = {
  "allegra": "./images/generic.jpeg",
  "superman": "./images/generic.jpeg",
  "apprentice": "./images/generic.jpeg",
  "superman": "./images/generic.jpeg",
  "gemini": "./images/generic.jpeg",
  "scorpio": "./images/generic.jpeg",
  "flatline": "./images/generic.jpeg",
  "shoulder_mount": "./images/generic.jpeg",
  "dragonfly": "./images/generic.jpeg",
  "cupid": "./images/generic.jpeg",
  "jade": "./images/generic.jpeg",
  "pike": "./images/generic.jpeg",
}

const nextTricks = {
  "allegra": ["superman"],
  "superman": ["shoulder_mount","allegra"],
  "apprentice": ["superman"],
  "superman": ["gemini","pike","shoulder_mount"],
  "gemini": ["superman","scorpio","dragonfly","cupid","pike"],
  "scorpio": ["gemini","flatline","allegra","pike"],
  "flatline": ["scorpio","allegra"],
  "shoulder_mount": ["dragonfly","gemini","scorpio"],
  "dragonfly": ["gemini"],
  "cupid": ["scorpio","gemini","superman"],
  "jade": ["scorpio","flatline","allegra"],
  "pike": ["jade","gemini"],
}

const allTricks = Object.keys(nextTricks)

const initNumTricks = 3

function appendTrick(trick) {
  let $newdiv = $("<div class='trick'></div>" )
  $newdiv.append("<img src='"+trickToImg[trick]+"'/>")
  $newdiv.append("<div class='trick-overlay'></div>")
  $newdiv.append("<h2 class='trick-text'>"+trick.replace("_"," ").toUpperCase()+"</h2>")
  $('.window').append($newdiv)
}

function appendArrow(){
  $('.window').append("<img class='trick-arrow' src='./images/arrow.png'/>")
}

function renderTricks(trickLists) {
  $('.window').empty()
  appendTrick(trickLists[0])
  for (let i = 1; i < trickLists.length; i++) {
    appendArrow()
    appendTrick(trickLists[i])
  }
  if ($('.show-text .onhover').hasClass('selected')) {
    $('.trick').addClass('trick-onhover')
  }
}

function generateCombo(numTricks) {
  let trickLists = []
  let first = Math.floor(Math.random() * allTricks.length)
  let currTrick = allTricks[first]
  trickLists.push(currTrick)

  while (trickLists.length < numTricks) {
    let next = Math.floor(Math.random() * nextTricks[currTrick].length)
    let nextTrick = nextTricks[currTrick][next]
    trickLists.push(nextTrick)
    currTrick = nextTrick
  }
  return trickLists
}

$(document).ready(function(){
  let combo = generateCombo(initNumTricks)
  renderTricks(combo)

  $('.num-tricks .minus').on('click',function(){
    let currNum = parseInt($('.num-tricks .input').text())
    let newNum = Math.max(1, currNum - 1)
    $('.num-tricks .input').text(newNum.toString())
  })
  $('.num-tricks .plus').on('click',function(){
    let currNum = parseInt($('.num-tricks .input').text())
    let newNum = Math.min(4, currNum + 1)
    $('.num-tricks .input').text(newNum.toString())
  })

  $('.show-text .always .check-empty').on('click',function(){
    $('.show-text .always').removeClass('unselected').addClass('selected')
    $('.show-text .onhover').removeClass('selected').addClass('unselected')
    $('.trick').removeClass('trick-onhover')
  })
  $('.show-text .onhover .check-empty').on('click',function(){
    $('.show-text .always').removeClass('selected').addClass('unselected')
    $('.show-text .onhover').removeClass('unselected').addClass('selected')
    $('.trick').addClass('trick-onhover')
  })

  $('.regen').on('click',function(){
    let numTricks = parseInt($('.num-tricks .input').text())
    console.log(numTricks)
    let newCombo = generateCombo(numTricks)
    renderTricks(newCombo)
  })
})
