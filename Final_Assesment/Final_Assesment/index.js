
var nav = ["home", "employee_list", "add_employee", "update_employee", "delete_employee"];
var gid=false;

  $('body').on('click', "#home_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#home").css("display", "block");

  });

$('body').on('click', "#employee_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    add();
    $("#employee_list").css("display", "block");


});

$('body').on('click', "#add_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

});

$('body').on('click', "#update_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#update_employee").css("display", "block");
});


$('body').on('click', "#delete_nav", function () {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#delete_employee").css("display", "block");
});

function seticon(v,v1,v2,v3) {
    $('#' + v).css('display', 'none');
    $('#' + v1).css('display', 'inline-block');

    var myTable = "#mytable";
    var myTableBody = myTable + " tbody";
    var myTableRows = myTableBody + " tr";
    var myTableColumn = myTable + " th";

    $(myTableColumn).click(function () {

        sortTable($(myTable),
             v2,v3);

    });
}

function create(data) {
    var list = data;
    var j = 1;
    var text = '';
    for (let i of list) {
        text += '<tr><td>' + j + '</td><td>' + i.emp_code + '</td><td>' + i.name + '</td><td>' + i.email + '</td><td>' + i.designation + '</td><td>' + i.join_date + '</td><td><i class="fa fa-pencil text-primary mr-3" onclick="edit(' + i.id + ')"></i> <i class="fa fa-trash ml-1 text-danger" onclick="del(' + i.id + ')"></i></td></tr>';
        j++;
    }
    
    $('#emplist').html(text);
  
}



// to add data in GUI
function add() {
    fetch('http://localhost:60767/api/employee')
        .then(response => response.json())
        .then(data => {
            $('#spinner1').css('display', 'none');
            $('#spinner').css('display', 'flex');
            console.log(data);
            obj = data;
            create(data);
          

            
        $(function () {
            getpagination(5);
        });
        //Pagination Script will run when the table data is loaded
        var table = '#mytable';
        $('#maxRows').on('change', function () {
            var maxrow = parseInt($(this).val());
            if (parseInt($(this).val()) == 5000) {
                maxrow = 10;
            }
            getpagination(maxrow);
        });
        function activePage() {
            var $el = $('[data-page].active');
            if ($el.length) {
                return $el.data('page');
            }
            return 0; // just needs to not exist so finder fails
        }
        $(function () {
            $('.prev-btn, .next-btn').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // prevent the parent event from firing
                var page = activePage() + ($(event.target).hasClass('prev-btn') ? -1 : 1);
                $('[data-page="' + page + '"]').trigger('click');
            });
        })
        function getpagination(maxows) {
           // $('table tr:eq(0)').prepend('<th>S.No</th>');
           // var id = 0;
           // $('table tr:gt(0)').each(function () {
              //  id++;
              //  $(this).prepend('<td> ' + id + '</td>');
           // })
            $('.pagination').html('')
            var trnum = 0;
            var maxrows = maxows;
            var totalrows = $(table)[0].rows.length;
            $(table + ' tr:gt(0)').each(function () {
                trnum++;
                if (trnum > maxrows) {
                    $(this).hide()
                }
                if (trnum <= maxrows) {
                    $(this).show();
                }
            });
            //if(totalrows > maxrows){​​​​​​​​
            var pagenum = Math.ceil(totalrows / maxrows);
            $('.pagination').append('<li class="page-item"><a class="page-link prev-btn" href="#">Previous</a></li>').show();
            for (var i = 1; i <= pagenum; i++) {
                $('.pagination').append('<li class="page-item" data-page="' + i + '"><a class="page-link" href="#">' + i + '</a></li>').show();
            }
            $('.pagination').append('<li class="page-item"><a class="page-link next-btn" href="#">Next</a></li>').show();
            //}​​​​​​​​
            $('.pagination li:first-child').addClass('active');
            $('.pagination li').on('click', function () {
                var pagenum = $(this).attr('data-page');
                var trIndex = 0;
                $('.pagination li').removeClass('active');
                $(this).addClass('active');
                $('table tr:gt(0)').each(function () {
                    trIndex++;
                    if (trIndex > (maxrows * pagenum) || trIndex <= ((maxrows * pagenum) - maxrows)) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
            });
        };
        });
}

function del(v) {
    console.log(typeof v);
    fetch('http://localhost:60767/api/employee/' + v, { method: 'DELETE' })
        
        .then(data => {
                alert("Deleted item Successfully");
            add();
        });

}

function addemployee(data) {

    fetch('http://localhost:60767/api/employee/', {
        method: 'POST', body: JSON.stringify(data), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(data => {
            swal({
                title: "Successfully Save!!",
                text: "Data Save!!",
                icon: "success",
                button: "Ok",

            });
            console.log(data);

        })
        .catch((error) => {
            // Handle the error
            console.log(error);
        });

}

function addressv(v) {
    if (v.checked) {
        gid = true;
    }
    else {
        gid = false;
    }
}

function saveemployee() {
    $('#padd1').css("border", "1px solid black");
    $('#padd2').css("border", "1px solid black");
    console.log(gid);
    if (gid) {
        if (document.getElementById('padd1').value =='' && document.getElementById('padd2').value =='') {
            $('#padd1').css("border", "1px solid red");
            $('#padd2').css("border", "1px solid red");
            return;
        }
         else if (document.getElementById('padd1').value=='') {
            $('#padd1').css("border", "1px solid red");
            return;
        }
        else if (document.getElementById('padd2').value =='') {
            $('#padd2').css("border", "1px solid red");
            return;
        }
    }
    var empcode = $("#empcode").val();
    var ename = $("#ename").val();
    var email = $("#email").val();
    var designation = $("#designation").val();
    var Join_date = $("#Join_date").val();
    if (empcode == '' || ename == '' || email == '' || designation == '' || Join_date == '') {

        swal({
            title: "Field Empty!!",
            text: "Please check the missing field!!",
            icon: "warning",
            button: "Ok",

        });
        return;
    }
    else {

        swal({
            title: "Successfully Submitted!!",
            text: "Data Updated!!",
            icon: "success",
            button: "Ok",
        });
    }
    var obj = {};

    obj.emp_code = document.getElementById('empcode').value;
    obj.name = document.getElementById('ename').value;
    obj.email = document.getElementById('email').value;
    obj.designation = document.getElementById('designation').value;
    obj.join_date = document.getElementById('Join_date').value;
    obj.padd1 = document.getElementById('padd1').value;
    obj.padd2 = document.getElementById('padd2').value;
    obj.cadd1 = document.getElementById('cadd1').value;
    obj.cadd2 = document.getElementById('cadd2').value;
    // obj.emp_code = "3567";
    console.log(obj);
   addemployee(obj);

}

function update() {
    var obj = {};
    obj.emp_code = document.getElementById('ecode').value;
    obj.name = document.getElementById('ename1').value;
    obj.email = document.getElementById('email1').value;
    obj.designation = document.getElementById('designation1').value;
    obj.join_date = document.getElementById('Join_date1').value;
    obj.padd1 = document.getElementById('padd11').value;
    obj.padd2 = document.getElementById('padd22').value;
    obj.cadd1 = document.getElementById('cadd11').value;
    obj.cadd2 = document.getElementById('cadd22').value;
    console.log(obj);
    fetch('http://localhost:60767/api/employee/' + gid, {
        method: 'PUT', body: JSON.stringify(obj), headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())     // convert data in Json formate to make it readable
        .then(data => {                               // to get actual data in javascript formate it show data in the form of object
            console.log(gid);
            console.log(data);
            gid = null;

        });

}

function edit(id) {

    fetch('http://localhost:60767/api/employee/' + id, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            document.getElementById('permanentadd').checked = false;
            document.getElementById('communicationadd').checked = false;

            console.log(data);
            var list = data;
            console.log(list)
            gid = id;
            document.getElementById('ecode').value = list.emp_code;
            document.getElementById('ename1').value = list.name;
            document.getElementById('email1').value = list.email;
            document.getElementById('designation1').value = list.designation;
            document.getElementById('Join_date1').value = list.join_date;

            if (list.padd1 != '' && list.padd2 != '') {
              document.getElementById('permanentadd').checked = true;
             }
            if (list.cadd1 != '' && list.cadd2 != '') {
             document.getElementById('communicationadd').checked = true;
            }

            document.getElementById('padd11').value = list.padd1;
            document.getElementById('padd22').value = list.padd2;
            document.getElementById('cadd11').value = list.cadd1;
            document.getElementById('cadd22').value = list.cadd2;
            for (let i of nav) {
                $("#" + i).css("display", "none");
            }
            $("#update_employee").css("display", "block");

        });


}

function search(v) {
    console.log(document.getElementById(v).value);

}

function plus() {
    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    $("#add_employee").css("display", "block");

}

function GetList() {

    for (let i of nav) {
        $("#" + i).css("display", "none");
    }
    add();
    $("#employee_list").css("display", "block");

}

$('#myInput').keyup(function () {
    // Search Text
    var search = $(this).val();

    // Hide all table tbody rows
    $('table tbody tr').hide();

    // Count total search result
    var len = $('table tbody tr:not(.notfound) td:contains("' + search + '")').length;

    if (len > 0) {
        // Searching text in columns and show match row
        $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(function () {
            $(this).closest('tr').show();
        });
    } else {
        $('.notfound').show();
        //        page();
    }
    //     initTable();

});

// function to search data

/*function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
*/



function hideemail(v) {
    $('#' +v.id).css('border', '1px solid black');
}
function ValidateEmail(inputText) {
    
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    console.log(inputText.value.match(mailformat));
    if (inputText.value.match(mailformat)) {
        
    }
    else {
        $('#' + inputText.id).css('border', '1px solid red');
    }
}


function sortTable(table, column, order) {
    var asc = order === 'asc';       // equal value and equal type
    var tbody = table.find('tbody');

    // Sort the table using a custom sorting function by switching
    // the rows order, then append them to the table body
    tbody.find('tr').sort(function (a, b) {
        if (asc) {
            return $('td:eq(' + column + ')', a).text()
                .localeCompare($('td:eq(' + column + ')', b).text());
        } else {
            return $('td:eq(' + column + ')', b).text()
                .localeCompare($('td:eq(' + column + ')', a).text());
        }
    }).appendTo(tbody);

}


