const navBaiHocs = document.querySelectorAll('.nav-baihoc-2');
const tongHopBaiHocs = document.querySelectorAll('.tonghop-baihoc-1');
const expandIcons = document.querySelectorAll('.expand-icon');
const morongTatCaButton = document.querySelector('.morongvathunho-1 a');

morongTatCaButton.addEventListener('click', function () {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.add('active');
        expandIcons[i].innerHTML = '-';
    }
    morongTatCaButton.innerHTML = 'Thu nhỏ tất cả';
});

for (let i = 0; i < navBaiHocs.length; i++) {
    navBaiHocs[i].addEventListener('click', function () {
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

thuNhoTatCaButton.addEventListener('click', function () {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.remove('active');
        expandIcons[i].innerHTML = '+';
    }
    morongTatCaButton.innerHTML = 'Mở rộng tất cả';
    morongTatCaButton.style.display = 'block';
    thuNhoTatCaButton.style.display = 'none';
});

morongTatCaButton.addEventListener('click', function () {
    for (let i = 0; i < tongHopBaiHocs.length; i++) {
        tongHopBaiHocs[i].classList.add('active');
        expandIcons[i].innerHTML = '-';
    }
    morongTatCaButton.innerHTML = 'Thu nhỏ tất cả';
    thuNhoTatCaButton.style.display = 'block';
    morongTatCaButton.style.display = 'none';
});

document.querySelector('.morongvathunho-1').appendChild(thuNhoTatCaButton);


const lectureLinks = document.querySelectorAll('.lecture-link');


// Hàm lấy query parameter từ url
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function () {
    var lectureData = $('#lectureData');

    // Hàm để lấy đường dẫn URL mới
    function getNewUrl() {
        return window.location.pathname + '?id=' + lectureData.data('lecture-id');
    }

    // Hàm để cập nhật nội dung trong #lectureData
    function updateLectureData() {
        $.ajax({
            url: getNewUrl(),
            method: 'GET',
            success: function (response) {
                lectureData.html($(response).find('#lectureData').html());
            }
        });
    }

    // Lấy ID bài học từ query parameter trong URL và cập nhật nội dung trong #lectureData
    var lectureId = getParameterByName('id');
    if (lectureId) {
        lectureData.data('lecture-id', lectureId);
        updateLectureData();
    }

    // Sử dụng sự kiện click để chuyển đổi bài học
    $('.lecture-link').on('click', function (event) {
        event.preventDefault();

        // Lấy ID bài học mới từ thẻ a được bấm
        var newLectureId = $(this).data('lecture-id');
        lectureData.data('lecture-id', newLectureId);

        // Cập nhật đường dẫn URL của trang
        history.pushState(null, null, getNewUrl());

        // Thực hiện request AJAX và cập nhật nội dung trong #lectureData
        updateLectureData();
    });
});

$(document).on('submit', '#commentForm', function (event) {
    event.preventDefault();
    var form = $(this);

    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function (response) {
            console.log('Data received from server:', response);
            console.log('Comment created successfully');
            form[0].reset(); // Reset form
        },
        error: function (error) {
            console.log('Error:', error);
        }
    });
});

