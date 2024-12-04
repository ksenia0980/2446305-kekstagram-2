const modalElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const body = document.body;
const imageElement = modalElement.querySelector('.big-picture__img img');
const captionElement = modalElement.querySelector('.social__caption');
const likesElement = modalElement.querySelector('.likes-count');
const totalCommentsElement = modalElement.querySelector('.social__comment-total-count');
const commentsContainerElement = modalElement.querySelector('.social__comments');
const commentElement = modalElement.querySelector('.social__comment');
const renderedCommentsCountElement = modalElement.querySelector('.social__comment-shown-count');
const loaderElement = modalElement.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let localComments;
let renderedCommentsCount = 0;

const show = () => {
  modalElement.classList.remove('hidden');
  body.classList.add('modal-open');
}

const hide = () => {
  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const createComment = ({ avatar, name, message }) => {
  const newComment = commentElement.cloneNode(true);
  const avatarElement = newComment.querySelector('.social__picture');
  avatarElement.src = avatar;
  avatarElement.alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
}

const renderStatistic = () => {
  renderedCommentsCountElement.textContent = renderedCommentsCount;
}

const renderLoader = () => {
  if (localComments.length) {
    loaderElement.classList.remove('hidden');
  } else {
    loaderElement.classList.add('hidden');
  }
}

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  localComments.splice(0, COMMENTS_STEP).forEach((comment) => {
    fragment.append(createComment(comment));

    renderedCommentsCount++;
  });
  commentsContainerElement.append(fragment);

  renderStatistic();
  renderLoader();
}

loaderElement.addEventListener('click', () => {
  renderComments();
})

const render = ({ url, description, likes, comments }) => {
  imageElement.src = url;
  captionElement.textContent = description;
  likesElement.textContent = likes;
  totalCommentsElement.textContent = comments.length;
  localComments = [...comments];
  renderedCommentsCount = 0;
  renderComments()

};

export const open = (data) => {
  commentsContainerElement.innerHTML = "";
  render(data);
  show();
}

closeButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  modalElement.classList.add('hidden');
  hide()
})
