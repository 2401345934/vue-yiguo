
document.documentElement.style.fontSize = document.documentElement.clientWidth / 12.42 + 'px';

window.onresize = () => {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 12.42 + 'px';
}