document.addEventListener('DOMContentLoaded', function () {
    $("#add_course").submit(function (event) {
        alert("Data Inserted Successfully!")
    })
});


$("#update_course").submit(function (event) {
    event.preventDefault();

    var unindexed_arry = $(this).serializeArray();
    console.log(unindexed_arry);
})
