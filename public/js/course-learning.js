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


// document.addEventListener('DOMContentLoaded', () => {
//     function updatePageContent(data) {
//         const videoId = document.querySelector('#lectureData #videoId');
//         const nameLecture = document.querySelector('#lectureData #nameLecture');
//         const contentLecture = document.querySelector('#lectureData #contentLecture');
//         const noteLecture = document.querySelector('#lectureData #noteLecture');
//         const lectureId = document.querySelector('#lectureData #_id');

//         console.log(videoId);
//         console.log(nameLecture);
//         console.log(contentLecture);
//         console.log(noteLecture);
//         console.log(lectureId);
//         videoId.src = `//www.youtube.com/embed/${data.VideoId}`;
//         nameLecture.innerHTML = data.nameLecture;
//         contentLecture.innerHTML = data.contentLecture;
//         noteLecture.innerHTML = data.noteLecture;
//         lectureId.innerHTML = data._id;

//         // Update URL without reloading the page
//         const url = new URL(window.location.href);
//         url.searchParams.set('id', data.lecture._id);
//         window.history.pushState({}, '', url.toString());
//     }

//     const navBaiHoc = document.getElementsByClassName('nav-baihoc');
//     for (let i = 0; i < navBaiHoc.length; i++) {
//         navBaiHoc[i].addEventListener('click', function (event) {
//             event.preventDefault();

//             const lectureId = navBaiHoc[i].getAttribute('data-lecture-id');
//             const courseSlug = window.courseSlug;
//             const xhr = new XMLHttpRequest();
//             xhr.onreadystatechange = function() {
//                 if (this.readyState === 4 && this.status === 200) {
//                     const responseData = this.response;
//                     updatePageContent(responseData);
//                 } else if (this.readyState === 4) {
//                     console.error('Error fetching lecture data:', this.statusText);
//                 }
//             };
//             xhr.open('GET', `/course-learning/${courseSlug}?id=${lectureId}`);
//             xhr.send();
//         });
//     }
// });



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

    // Sử dụng sự kiện popstate để theo dõi khi URL thay đổi
    window.addEventListener('popstate', function () {
        lectureData.data('lecture-id', getParameterByName('id'));
        updateLectureData();
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("commentForm").addEventListener("submit", function (event) {
//         event.preventDefault(); // Ngăn chặn hành động mặc định của form submit

//         const lectureId = document.getElementById("lectureId").value;
//         const userId = document.getElementById("userId").value;
//         const commentText = document.getElementById("commentText").value;

//         fetch(`/course-learning/${lectureId}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ userId, commentText })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     // Xử lý thành công
//                     console.log("Comment created successfully");
//                     // Cập nhật giao diện nếu cần
//                 } else {
//                     // Xử lý lỗi
//                     console.error("Comment creation failed");
//                 }
//             })
//             .catch(error => {
//                 // Xử lý lỗi mạng
//                 console.error("Network error:", error);
//             });
//     });

// });

