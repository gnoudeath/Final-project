const navBaiHocs = document.querySelectorAll('.nav-baihoc');
const tongHopBaiHocs = document.querySelectorAll('.tonghop-baihoc');
const expandIcons = document.querySelectorAll('.expand-icon');
const morongTatCaButton = document.querySelector('.morongvathunho a');

morongTatCaButton.addEventListener('click', function() {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.add('active');
        expandIcons[i].innerHTML = '-';
    }
    morongTatCaButton.innerHTML = 'Thu nhỏ tất cả';
});

for (let i = 0; i < navBaiHocs.length; i++) {
    navBaiHocs[i].addEventListener('click', function() {
        tongHopBaiHocs[i].classList.toggle('active');
        if (tongHopBaiHocs[i].classList.contains('active')) {
            expandIcons[i].innerHTML = '-';
        } else {
            expandIcons[i].innerHTML = '+';
        }
    });
}

const thuNhoTatCaButton = document.createElement('div');
const linkThuNhoTatCa = document.createElement('a');
linkThuNhoTatCa.classList.add('btn');
linkThuNhoTatCa.style.color = 'orangered';
linkThuNhoTatCa.innerHTML = 'Thu nhỏ tất cả';
thuNhoTatCaButton.appendChild(linkThuNhoTatCa);
thuNhoTatCaButton.style.display = 'none';

thuNhoTatCaButton.addEventListener('click', function() {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.remove('active');
        expandIcons[i].innerHTML = '+';
    }
    morongTatCaButton.innerHTML = 'Mở rộng tất cả';
    morongTatCaButton.style.display = 'block';
    thuNhoTatCaButton.style.display = 'none';
});

morongTatCaButton.addEventListener('click', function() {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.add('active');
        expandIcons[i].innerHTML = '-';
    }
    morongTatCaButton.innerHTML = 'Thu nhỏ tất cả';
    thuNhoTatCaButton.style.display = 'block';
    morongTatCaButton.style.display = 'none';
});

document.querySelector('.morongvathunho').appendChild(thuNhoTatCaButton);
