// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

// const sections = document.querySelectorAll('.section');

// const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('in-view');
//         } else {
//             entry.target.classList.remove('in-view');
//         }
//     });
// }, {
//     threshold: 0.1
// });

// sections.forEach(section => {
//     observer.observe(section);
// });
