const navBaiHoc = document.querySelector('.nav-baihoc');
const tongHopBaiHoc = document.querySelector('.tonghop-baihoc');
const expandIcon = document.querySelector('.expand-icon');

navBaiHoc.addEventListener('click', function() {
tongHopBaiHoc.classList.toggle('active');
if (tongHopBaiHoc.classList.contains('active')) {
    expandIcon.innerHTML = '-';
} else {
        expandIcon.innerHTML = '+';
    }
});