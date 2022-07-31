
 function demo(){
  // MenuToggle
		let toggle = document.querySelector('.toggle1');
		let navigation = document.querySelector('.navigation1');
		let main = document.querySelector('.main1');

		toggle.onclick = function(){
			navigation.classList.toggle('active');
			main.classList.toggle('active');
		}

		// add hovered class in selected list item
		let list = document.querySelectorAll('.navigation1 li');
		function activeLink(){
			list.forEach((item) =>
			item.classList.remove('hovered'));
			this.classList.add('hovered');
		}
		list.forEach((item) =>
		item.addEventListener('mouseover',activeLink));
}

