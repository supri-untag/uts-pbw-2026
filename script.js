let todoList = [];

const todoForm = document.getElementById("todoForm");
const namaTodo = document.getElementById("namaTodo");
const tanggalTodo = document.getElementById("tanggalTodo");
const todoTable = document.getElementById("todoTable");
const editIndex = document.getElementById("editIndex");
const btnSimpan = document.getElementById("btnSimpan");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = namaTodo.value.trim();
  const tanggal = tanggalTodo.value;

  if (nama === "" || tanggal === "") {
    alert("Nama kegiatan dan tanggal wajib diisi!");
    return;
  }

  if (editIndex.value === "") {
    todoList.push({
      nama: nama,
      tanggal: tanggal,
      selesai: false,
    });
  } else {
    const index = editIndex.value;

    todoList[index].nama = nama;
    todoList[index].tanggal = tanggal;

    editIndex.value = "";
    btnSimpan.innerText = "Simpan";
  }

  todoForm.reset();
  tampilkanData();
});

function tampilkanData() {
  todoTable.innerHTML = "";

  if (todoList.length === 0) {
    todoTable.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                        Belum ada data to do list.
                    </td>
                </tr>
            `;
    return;
  }

  todoList.forEach(function (todo, index) {
    const row = document.createElement("tr");

    row.innerHTML = `
                <td class="text-center">${index + 1}</td>
                <td class="${todo.selesai ? "completed" : ""}">
                    ${todo.nama}
                </td>
                <td class="text-center">
                    ${formatTanggal(todo.tanggal)}
                </td>
                <td class="text-center">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        ${todo.selesai ? "checked" : ""}
                        onclick="ubahStatus(${index})"
                    >
                </td>
                <td class="text-center">
                    <button class="btn btn-warning btn-sm me-1" onclick="editData(${index})">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="hapusData(${index})">
                        Hapus
                    </button>
                </td>
            `;

    todoTable.appendChild(row);
  });
}

function ubahStatus(index) {
  todoList[index].selesai = !todoList[index].selesai;
  tampilkanData();
}

function editData(index) {
  namaTodo.value = todoList[index].nama;
  tanggalTodo.value = todoList[index].tanggal;
  editIndex.value = index;
  btnSimpan.innerText = "Update";
}

function hapusData(index) {
  const konfirmasi = confirm("Yakin ingin menghapus data ini?");

  if (konfirmasi) {
    todoList.splice(index, 1);
    tampilkanData();
  }
}

function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
