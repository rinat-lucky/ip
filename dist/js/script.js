const postsWrapper = document.querySelectorAll('.post-wrapper');
const addPostElem = document.querySelector('.add-product');

// Добавление сообщений в чат (и удаление авторских сообщений)

const setPosts = {
	allPosts: [],
	addPost(title, text, handler) {
		this.allPosts.unshift({
			title, 
			text
		});
		if (handler) {
			handler();
		}
	},
};

const showAllPosts = () => {
	const title = addPostElem.elements.title.value;
	const text = addPostElem.elements.text.value;
	let postsHTML = '';	
		postsHTML += `
			<div class="post">	
				<div class="post-body">
					<h2 class="post-title">${title}</h2>
					<p class="post-text">${text}</p>
				</div>
				<div class="post-footer">
					<button class="post-button delete">
						<img src="img/delete.svg" alt="delete" width="19" height="20" class='icon'>
					</button>
				</div>
			</div>
		`;
	document.querySelector('.post-wrapper-active').insertAdjacentHTML("beforeend", postsHTML);

	const deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach((item) => {
		item.addEventListener('click', () => {
			const post = item.closest('.post');
			post.remove();
		});
	});
	return;
};


const init = () => {
	addPostElem.addEventListener('submit', (event) => {
		event.preventDefault();
		const { title, text } = addPostElem.elements;

		if (title.value.length < 2) {
			alert('Слишком короткий заголовок сообщения');
			return;
		}
		if (text.value.length < 3) {
			alert('Слишком короткое сообщение');
			return;
		}

		setPosts.addPost(title.value, text.value, showAllPosts);
		addPostElem.reset();
	});
};

document.addEventListener('DOMContentLoaded', init);