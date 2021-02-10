const char = document.querySelector('.field__character');
const field = document.querySelector('.field');
const fieldRect = field.getBoundingClientRect();
const charHeight = fieldRect.width / 20;

// 캐릭터 추가
function addChar() {
  newChar('char-red', charHeight, 0, 'amongUs_img/빨강.png');
  newChar('char-pink', charHeight + 10, 0, 'amongUs_img/분홍.png');
  newChar('char-yellow', charHeight + 20, 0, 'amongUs_img/노랑.png');
  newChar('char-green', charHeight + 10, 0, 'amongUs_img/초록.png');
  newChar('char-blue', charHeight, 0, 'amongUs_img/파랑.png');
}
addChar();

// 어몽어스 캐릭터 생성
function newChar(className, top, left, imgPath) {
  const img = document.createElement('img');
  img.setAttribute('class', className);
  img.setAttribute('src', imgPath);
  img.style.position = 'relative';
  img.style.top = `${top}px`;
  img.style.left = `${left}px`;
  char.appendChild(img);
}

const red = document.querySelector('.char-red');
const pink = document.querySelector('.char-pink');
const yellow = document.querySelector('.char-yellow');
const green = document.querySelector('.char-green');
const blue = document.querySelector('.char-blue');

//레드 클릭
const metorGame = document.querySelector('.metorGame');

red.addEventListener('click', game1Start);
function game1Start() {
  initGame();
  metorGame.classList.remove('metorGame-none');
  metorGame.addEventListener('click', onFieldClick);
  playSound(game1Sound);
}

let score = 0;
function onFieldClick(event) {
  const target = event.target;
  if(target.matches('.metor')){
    target.remove();
    score++;
    // playSound(sound);
    if(score === metor_count){
      // playSound(sound);
      metorGame.classList.add('metorGame-none');
    }
  } else if(target.matches('.trash')){
    // playSound(sound);
    score;
  }
}

//랜덤배치
const metor_count = 7;
const trash_count = 3;
const trash_size = 150;
const gameField = document.querySelector('.gameField');

function initGame(){
  score = 0;
  gameField.innerHTML = '';
  addItem('metor', metor_count, 'amongUs_img/metorite.png');
  addItem('trash', trash_count, 'amongUs_img/trash.png');
} 
function addItem(className, count, imgPath){
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - trash_size;
  const y2 = fieldRect.height;
  for(let i= 0; i< count; i++){
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}
function randomNumber(min, max){
  return Math.random() * (max-min) + min;
}

const game1Exit = document.querySelector('.game1Exit');
game1Exit.addEventListener('click', ()=> {
  metorGame.classList.add('metorGame-none');
})



// 핑크 클릭
pink.addEventListener('click', game2Start);
function game2Start() {
  medicalRoomPopUp();
  dragCharacterInMedicalroom();
  playSound(game2Sound);
}

const roomPopUp = document.querySelector('.room-popUp');
const roomExit = roomPopUp.querySelector('.roomBtn');
const roomFoothold = document.querySelector('.room-foothold')
const roomCharacter = document.querySelector('.room-character');
roomExit.addEventListener('click', ()=> {
  roomPopUp.classList.add('room-popUp-none');
  medicalRoom.classList.add('medical-room-none');
  roomInit();
})

const medicalRoom = document.querySelector('.medical-room');
function medicalRoomPopUp() {
  medicalRoom.classList.remove('medical-room-none');
}

let dragged;
function dragCharacterInMedicalroom() {
  document.addEventListener("drag", function(event) {}, false);
  document.addEventListener("dragstart", function(event) {
    dragged = event.target;
    dragged.style.opacity = .5;
  }, false);
  document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
  }, false);
  document.addEventListener("dragover", function(event) {
    event.preventDefault(); //드롭허용
  }, false);
  document.addEventListener("dragenter", function(event) {
    if (event.target.className == "room-foothold") {
      event.target.style.background = 'rgba(0,0,0,0.2)';
    }
  }, false);
  document.addEventListener("dragleave", function(event) {
    if (event.target.className == "room-foothold") {
      event.target.style.background = "";
    }
  }, false);
  document.addEventListener("drop", function(event) {
    event.preventDefault(); //기본액션 막음
    if (event.target.className == "room-foothold") {
      event.target.style.background = "";
      dragged.parentNode.removeChild( dragged );
      event.target.appendChild( dragged );
      roomPopUp.classList.remove('room-popUp-none');
      playSound(missionClearSound);
    }
  }, false);
}
function roomInit() {
  roomFoothold.removeChild( roomCharacter );
  roomFoothold.parentNode.appendChild( roomCharacter );
}


// 노랑 클릭
yellow.addEventListener('click', chatting);
function chatting() {
  chatLobbyVisible();
  chatScreenVisible();
  chatSreenUnvisible();
  keyInput();
  startTimer();
  playSound(chatSound);
}

const chatBtn = document.querySelector('.chatBtn');
const chatScreen = document.querySelector('.chattingScreen');
const chatLobby = document.querySelector('.chattingLobby');
const items = document.querySelector('.screen__items');
const screenText = document.querySelector('.screen_text');
const screenExit = document.querySelector('.screen__exit');
const remainTime = document.querySelector('.remainTime');
screenText.value = '';
screenText.focus();

//ul에 list추가
function onAdd(){
  const text = screenText.value;
  if(text === ''){
    screenText.focus();
    return;
  }
  const item = itemUpdate(text);
  items.appendChild(item);
  item.scrollIntoView({block:'center', behavior:'smooth'});
  screenText.value = '';
  screenText.focus();
}

//list 생성
let id = 0;
function itemUpdate(text){
  const newItem = document.createElement('li');
  newItem.setAttribute('class', 'item');
  newItem.setAttribute('data-id', id);
  newItem.innerHTML = `
  <div class="item__wrap">
    <div class="chat__img">
      <img src="./amongUs_img/하양머리.png" alt="#">
    </div>
    <div class="conversation">
      <span>${text}</span>
    </div>
  </div>
  `
  id++;
  return newItem;
}

function keyInput(){
  screenText.addEventListener('keypress', (event)=> {
    if(event.key === 'Enter'){
      onAdd();
    }
  })
}

function chatLobbyVisible() {
  chatLobby.classList.remove('chattingLobby-none');
}

function chatLobbyUnvisible() {
  chatLobby.classList.add('chattingLobby-none');
}

function chatScreenVisible() {
  chatBtn.addEventListener('click', ()=> {
  chatScreen.classList.remove('chattingScreen-none');
  playSound(chatScreenSound);
  })
}

function chatSreenUnvisible(){
  screenExit.addEventListener('click', ()=> {
    chatScreen.classList.add('chattingScreen-none');
    items.innerHTML = '';
  })
}

// 타이머작동
let timer = undefined;
let duration_timer = 30;
function startTimer(){
  let remainingTimeSec = duration_timer;
  updateTimerText(remainingTimeSec);
  timer = setInterval(()=> {
    if(remainingTimeSec<= 0){
      clearInterval(timer);
      chatLobbyUnvisible();
      chatScreen.classList.add('chattingScreen-none');
      items.innerHTML = '';
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopTimer(){
  clearInterval(timer);
}

function updateTimerText(time){
  const seconds = time % 60;
  remainTime.innerText = `${seconds}s`;
};


// 용어 설명
const termWrap = document.querySelector('.terminology-wrap');
const termExit = document.querySelector('.termExit');
green.addEventListener('click', terminology);
function terminology() {
  termWrap.classList.remove('terminology-wrap-none');
  termExitBtn();
  playSound(terminologySound);
}
function termExitBtn() {
  termExit.addEventListener('click', ()=> {
    termWrap.classList.add('terminology-wrap-none');
    stopSound(terminologySound);
  })
}

// 만든 이유
const introduce = document.querySelector('.introduce');
const introExit = document.querySelector('.introExit');
blue.addEventListener('click', thanks);
function thanks() {
  introduce.classList.remove('introduce-none');
  playSound(introduceSound);
  introExit.addEventListener('click', ()=> {
    introduce.classList.add('introduce-none');
    stopSound(introduceSound);
  })
}

// 음향효과
const game1Sound = new Audio('amongUs_bgm/어몽어스 로비 입장.mp3');
const game2Sound = new Audio('amongUs_bgm/어몽어스 문닫힘.mp3');
const chatSound = new Audio('amongUs_bgm/어몽어스 투표.mp3');
const chatScreenSound = new Audio('amongUs_bgm/어몽어스 채팅.mp3');
const terminologySound = new Audio('amongUs_bgm/어몽어스 게임 시작.mp3');
const introduceSound = new Audio('amongUs_bgm/어몽어스 크루원승.mp3');
const missionClearSound = new Audio('amongUs_bgm/어몽어스 이머전스 효과음.mp3');

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}
