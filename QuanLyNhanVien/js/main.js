// Định nghĩa lớp đối tượng staff

function Staff(tk, name, email, password, date, luongCb, chucVu, gioLam) {
  this.tk = tk;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.luongCb = luongCb;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}
Staff.prototype.calcScore = function (chucVu) {
  switch (this.chucVu) {
    case "Sếp":
      return this.luongCb * 3;
    case "Trưởng phòng":
      return this.luongCb * 2;
    case "Nhân viên":
      return this.luongCb * 1;
    default:
      return "không có lương";
  }
};

Staff.prototype.calcLoai = function (chucVu, gioLam) {
  switch (this.chucVu) {
    case "Sếp":
      return "Không phải nhân viên";
    case "Trưởng phòng":
      return "Không phải nhân viên";
    case "Nhân viên":
      if (this.gioLam >= 192) {
        return " nhân viên xuất sắc";
      } else if (this.gioLam >= 176) {
        return " nhân viên giỏi";
      } else if (this.gioLam >= 160) {
        return "nhân viên khá";
      } else {
        return "nhân viên trung bình";
      }
    default:
      return "Không có chức vụ";
  }
  // if (this.nhanVien && this.gioLam >= 192) {
  //   return "Nhân viên xuất sắc";
  // } else if (this.nhanVien && this.gioLam >= 176) {
  //   return "Nhân viên giỏi";
  // } else if (this.nhanVien && this.gioLam >= 160) {
  //   return "Nhân viên Khá";

  //   //   } else {
  //   //     return "Nhân viên trung bình";
  // } else if (!this.sep) {
  //   return "không phải nhân viên";
  // } else if (!this.truongPhong) {
  //   return "Không phải nhân viên";
  // }
  //   switch (nhanVien) {
  //     case this.gioLam >= 192:
  //       return "nhân viên xuất sắc";

  //     default:
  //       break;
  //   }
};
// Tạo mảng danh sách staff
var staffs = [];
init();
function init() {
  // B1: Lấy data từ localStorage lên
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];

  // Bởi  vì JSON.stringify tự động loại bỏ các phương thức bên trong object => các object staff bên trong mảng bị mất hàm calcScore
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    console.log(staff);
    staffs[i] = new Staff(
      staff.tk,
      staff.name,
      staff.email,
      staff.password,
      staff.date,
      staff.luongCb,
      staff.chucVu,
      staff.gioLam
    );
  }
  // B2: Gọi hàm display để hiển thị ra giao diện
  display(staffs);
}

function addStaff() {
  // B2: DOM lấy các value
  document.getElementById("tbTKNV").style.display = "block";
  document.getElementById("tbTen").style.display = "block";
  document.getElementById("tbEmail").style.display = "block";
  document.getElementById("tbMatKhau").style.display = "block";
  document.getElementById("tbNgay").style.display = "block";
  document.getElementById("tbLuongCB").style.display = "block";
  document.getElementById("tbChucVu").style.display = "block";
  document.getElementById("tbGiolam").style.display = "block";

  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var luongCb = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  // Kiểm tra hợp lệ (validation)
  // var isValid = true;
  // isValid = isValid && isRequired(tk);
  // isValid = isValid && isRequired(name);
  // isValid = isValid && isRequired(email);
  // isValid = isValid && isRequired(password);
  // isValid = isValid && isRequired(date);
  // isValid = isValid && isRequired(luongCb);
  // isValid = isValid && isRequired(chucVu);
  // isValid = isValid && isRequired(gioLam);

  var isValid = validation();
  if (!isValid) {
    alert("Vui Lòng nhập vào các giá trị");
    return;
  }

  // B2: Khởi tạo đối tượng staff từ lớp đối tượng Staff
  var staff = new Staff(
    tk,
    name,
    email,
    password,
    date,
    luongCb,
    chucVu,
    gioLam
  );
  // B3: Hiển thị staff vừa thêm lên trên giao diện (table)
  // Thêm staff vừa tạo vào mảng staffs
  staffs.push(staff);
  // B4: Lưu biến staffs xuống local storage

  localStorage.setItem("staffs", JSON.stringify(staffs));
  // Gọi hàm display và truyền vào mảng staffs để hiện thị lên trên table
  display(staffs);
  // Gọi hàm resetForm để xét các giá trị input về rỗng
  resetForm();
}

function display(staffs) {
  var tbodyEl = document.getElementById("tableDanhSach");
  // Chứa nội dung html sẽ được thêm vào bên trong tbody
  var html = "";

  // Duyệt mảng staffs
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    // Với mỗi student tạo ra 1 thẻ tr và từng thẻ td chứa thông tin chính student đó
    html += `
        <tr>
            <td>${staff.tk}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.date}</td>
            <td>${staff.chucVu}</td>
            <td>${staff.calcScore()}</td>
            <td>${staff.calcLoai()}</td>
            <td>
            <button  data-target="#myModal" data-toggle ="modal" onclick="selectStaff('${
              staff.tk
            }')" class="btn btn-success">Cập nhật</button>
            <button onclick="deleteStaff('${
              staff.tk
            }')" class="btn btn-danger">Xóa</button>
            </td>          
        </tr>
        `;
  }
  // Đưa nội dung html được tạo tự động từ các đối tượng staff bào bên trong tbody
  tbodyEl.innerHTML = html;
}
function deleteStaff(staffTk) {
  console.log(typeof staffTk);
  //   alert(staffTk);
  var index = findStaff(staffTk);
  if (index !== 1) {
    // xóa 1 phần tử ở 1 vị trí bất kì trong mảng
    staffs.splice(index, 1);
    localStorage.setItem("staffs", JSON.stringify(staffs));
    display(staffs);
  }
}
function searchNhanVien() {
  // B1: DOM lấy value
  var searchValue = document.getElementById("searchName").value;
  // B2: Lọc ra 1 mảng mới thỏa mãn điều kiến giá trị searchValue phải bằng với tên nhân viên
  var newStaffs = [];
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    if (staff.calcLoai().indexOf(searchValue) !== -1) {
      newStaffs.push(staff);
    }
  }
  // B3:Hiển thị ra giao diện danh sách sinh viên đẫ lọc
  display(newStaffs);
}
function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

function selectStaff(staffTk) {
  // Dùng staffTk để tìm staff muốn cập nhật
  console.log(staffTk);
  var index = findStaff(staffTk);
  // Lấy ra staff muốn cập nhật từ mảng staffs
  var staff = staffs[index];
  // Đưa thông tin của staff này lên giao diện
  document.getElementById("tknv").value = staff.tk;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.date;
  document.getElementById("luongCB").value = staff.luongCb;
  document.getElementById("chucvu").value = staff.chucVu;
  document.getElementById("gioLam").value = staff.gioLam;
  // disable input MaSV và button Thêm người dùng
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}
// Nhận vào staffId và trả ra vị trí (index) của staff bên trong mảng
function findStaff(staffTk) {
  var index = -1;
  for (var i = 0; i < staffs.length; i++) {
    // Kiếm phần tử staff trong mảng nào có id khớp vs staffId
    if (staffs[i].tk === staffTk) {
      index = i;
      break;
    }
  }
  return index;
}
// Hàm này sẽ được gọi khi click vào nút Cập nhật ở dưới form
function updateStaff() {
  document.getElementById("tbTKNV").style.display = "block";
  document.getElementById("tbTen").style.display = "block";
  document.getElementById("tbEmail").style.display = "block";
  document.getElementById("tbMatKhau").style.display = "block";
  document.getElementById("tbNgay").style.display = "block";
  document.getElementById("tbLuongCB").style.display = "block";
  document.getElementById("tbChucVu").style.display = "block";
  document.getElementById("tbGiolam").style.display = "block";
  // B1: DOM lấy value từ input
  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var luongCb = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var isValid = validation();
  if (!isValid) {
    alert("Vui Lòng nhập vào các giá trị");
    return;
  }
  
  // B2: Khởi tạo đối tượng staff từ các giá trị input
  var staff = new Staff(
    tk,
    name,
    email,
    password,
    date,
    luongCb,
    chucVu,
    gioLam
  );
  // B3 : Cập nhật
  // Tìm index của sinh viên muốn cập nhật
  var index = findStaff(staff.tk);
  // Cập nhật
  staffs[index] = staff;
  localStorage.setItem("staffs", JSON.stringify(staffs));
  // B4 : Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(staffs);
  resetForm();
}
// Các hàm kiểm tra xem input có hợp lệ hay không

function validation() {
  var tk = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var date = document.getElementById("datepicker").value;
  var luongCb = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var isValid = true;
  if (!isRequired(tk)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản không được để trống";
  } else if (!minLength(tk, 8)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản phải có ít nhất 8 kí tự";
  } else {
    document.getElementById("tbTKNV").innerHTML = "";
  }
  var letters = new RegExp("[A-Za-z]+$");
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên không được để trống";
  } else if (!letters.test(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Tên NV có kí tự không hợp lệ";
  } else {
    document.getElementById("tbTen").innerHTML = "";
  }
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "email không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "email không đúng định dạng";
  } else {
    document.getElementById("tbEmail").innerHTML = "";
  }
  var passwordPattern = new RegExp("[A-Z]+[a-z]+[0-9]+[@$!%*?&]+$");
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "password không được để trống";
  } else if (!passwordPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "password không đúng định dạng";
  } else {
    document.getElementById("tbMatKhau").innerHTML = "";
  }
  if (!isRequired(date)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Ngày không được để trống";
  } else {
    document.getElementById("tbNgay").innerHTML = "";
  }
  if (!isRequired(luongCb)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Lương  không được để trống";
  } else if (luongCb < 1000000 || luongCb > 20000000) {
    document.getElementById("tbLuongCB").innerHTML = "Lương không phù hợp";
  } else {
    document.getElementById("tbLuongCB").innerHTML = "";
  }
  if (!isRequired(chucVu)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML =
      "chức vụ không được để trống";
  } else {
    document.getElementById("tbChucVu").innerHTML = "";
  }
  if (!isRequired(gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "giờ làm không được để trống";
  } else if (gioLam < 80 || gioLam > 200) {
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm phải đúng quy định";
  } else {
    document.getElementById("tbGiolam").innerHTML = "";
  }
  return isValid;
}
// Hàm kiểm tra xem input có hợp lệ hay không
function isRequired(value) {
  if (!value) {
    return false;
  }
  return true;
}
// Hàm để xác định các input phải đúng định dạng
function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }
  return true;
}
