// preloader
const preloader = document.querySelector('.preloader');

const preloaderStart = () => {
  preloader.classList.remove('preloader_hidden');
};

const preloaderStop = () => {
  preloader.classList.add('preloader_hidden');
};

export {
  preloaderStart,
  preloaderStop,
};
