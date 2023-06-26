var ban_words = ["\\", "[", "}", "]", "}", "&", "#", "+"]
    var bak = ""
    var bak2 = ""
    var mode = ""
    var del = "unknow"
    var fontSize = 1;
    function zoomOut() {
        fontSize -= 0.3;
        document.body.style.fontSize = fontSize + "em";
    }
    function zoomIn() {
        fontSize += 0.1;
        document.body.style.fontSize = fontSize + "em";
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }
    var login_btn = document.getElementById("login_btn")
    //signout
    function signout() {
        localStorage.removeItem("Aras")
        localStorage.removeItem("Login")
        localStorage.removeItem("Nama pengguna")
        localStorage.removeItem("UserId")
        document.getElementById("main").innerHTML = "<p>Signing out...</p>"
        setTimeout(() => {
            window.location.reload()
        }, 300);
    }

    var log = localStorage.getItem("Login")
    var aras = localStorage.getItem("Aras").slice(0, -1)
    if (log == "True") {
        get_pilihan()
        login_btn.innerText = "Sign out"
        login_btn.setAttribute('onclick', 'signout()')
        document.getElementById("login_message").innerText = "Selemat datang " + localStorage.getItem("Nama pengguna") + "!"
        //adakah pengguna ialah admin ?
        if (aras == "ADMIN") {
            var btn = document.createElement("button")
            document.getElementById("produk_dipilih").innerText = "Senarai produk"
            btn.classList.add("search")
            btn.classList.add("side_bButon")
            btn.innerText = "Admin"
            btn.setAttribute('onclick', 'admin()')
            document.getElementById("side_bar").appendChild(btn)
        }
    }
    //membuat senarai produk
    function produk_display(nama, harga, kalori, daging, jenama, gambar, jenama_list, pilih, id_produk) {
        var div = document.createElement('div')
        var img = document.createElement('img')
        var p1 = document.createElement('p')
        var p2 = document.createElement('p')
        var p3 = document.createElement('p')
        var p4 = document.createElement('p')
        var p5 = document.createElement("p")

        div.classList.add('produk_display')

        if (pilih == "1") {
            div.setAttribute("onclick", "pilih_produk('" + id_produk + "')")
        }

        img.src = '/img/' + gambar
        div.appendChild(img)

        p1.innerText = "Nama: " + nama;
        div.appendChild(p1)

        p2.innerText = 'Harga: ' + harga
        div.appendChild(p2)

        p3.innerText = 'Kalori: ' + kalori
        div.appendChild(p3)

        p4.innerText = 'Daging: ' + daging
        div.appendChild(p4)

        for (var a = 0; a < jenama_list.length - 1; a++) {
            var info = jenama_list[a].split(";")
            if (info[0] == jenama) {
                p5.innerText = 'Jenama: ' + info[1]
                div.appendChild(p5)
            }
        }


        div.id = nama + "," + kalori + "," + harga + "," + daging + "," + jenama
        return div
    }
    //pilih produk
    function pilih_produk(id) {
        var usr_id = localStorage.getItem("UserId")
        var add = httpGet("/php/add_pilih.php?usr=" + usr_id + "&id=" + id)
        if (add == "New record created successfully") {
            document.getElementById("produk_dipilih").innerText = "Produk telah dipilih!"
            document.getElementById("produk").innerHTML = ""
            get_pilihan()
        } else {
            console.log(add)
            document.getElementById("produk_dipilih").innerText = "Ada sesuatu yang tak kena"
            setTimeout(() => {
                document.getElementById("produk_dipilih").innerText = "Sila pilih produk"

            }, 2000);
        }

    }
    // dapat pilihan daripad pengguna
    function get_pilihan() {
        var telah = httpGet("/php/get_pilihan.php?id=" + localStorage.getItem("UserId"))
        document.getElementById("produk_dipilih").classList.remove("hidea")
        console.log(telah)
        if (telah == "none ") {
            list_product()
            document.getElementById("produk_dipilih").innerText = "Sila pilih produk"
        } else {
            document.getElementById("produk_dipilih").innerText = "Produk yang dipilih"
            var pro = telah.split(";")
            var jenama = httpGet("/php/get_jenama.php").split("\n")
            for (var a = 0; a < pro.length - 1; a++) {
                var info = httpGet("/php/get_produk_id.php?id=" + pro[a]).split(";")
                document.getElementById("produk").appendChild(produk_display(info[1], info[2], info[3], info[4], info[5], info[6], jenama, "0", info[0]))
            }
        }
    }
    //message untnk pengguna
    function show_info(parent, child, text, clo = "var(--color_1)", clo_t = "#fff") {
        var parents = document.getElementById(parent)
        var childs = document.getElementById(child)
        var comp, wi
        childs.innerText = text
        parents.style.backgroundColor = clo
        parents.style.color = clo_t
        parents.classList.add("expand")
        parents.classList.remove("hiding")
        setTimeout(() => {
            parents.classList.remove("expand")
            parents.classList.add("hiding")
        }, 2500);
    }
    //cari
    function search(id, filter_id) {
        var input = document.getElementById(id)
        var value = input.value.toUpperCase()
        var parent = document.getElementById(filter_id)
        var list = parent.getElementsByTagName("div")
        var txtValue
        for (i = 0; i < list.length; i++) {
            txtValue = list[i].id;
            if (txtValue.toUpperCase().indexOf(value) > -1) {
                list[i].classList.remove("hidea")
            } else {
                list[i].classList.add("hidea")
            }
        }

    }

    function redirect(url) {
        window.location.href = url
    }
    //mendapat senarai produk
    function list_product() {
        var produk = httpGet("/php/get_produk.php").split("\n")
        var jenama = httpGet("/php/get_jenama.php").split("\n")
        for (var a = 0; a < produk.length - 1; a++) {
            var info = produk[a].split(";")
            document.getElementById("produk").appendChild(produk_display(info[1], info[2], info[3], info[4], info[5], info[6], jenama, "1", info[0]))
        }
    }
    // paparkan semu produk
    function show_all() {
        var proparent = document.getElementById("produk")
        var produk = proparent.getElementsByClassName("hidea")
        document.getElementById("produk").innerHTML = ""
        list_product()
        document.getElementById("search").value = ""
        document.getElementById("produk_dipilih").innerText = "Sila pilih produk"
    }

    function filter_produk() {
        var harga = document.querySelector('input[name="harga"]:checked').value
        var kalori = document.querySelector('input[name="kalori"]:checked').value
        var daging = document.querySelector('input[name="daging"]:checked').value
        const produk = document.getElementById("produk").getElementsByClassName("produk_display")

        for (var a = 0; a < produk.length; a++) {
            var hmmm = produk[a]
            hmmm.classList.remove("hidea")
            var val = hmmm.id.split(",")

            //harga check
            if (harga == "1") {
                if (val[2] < 10) {
                    hmmm.classList.add("hidea")
                }
            } else if (harga == "2") {
                if (val[2] > 10) {
                    hmmm.classList.add("hidea")
                }
            }

            //kalori check
            if (kalori == "1") {
                if (val[1] < 100) {
                    hmmm.classList.add("hidea")
                }
            } else if (kalori == "2") {
                if (val[1] > 100) {
                    hmmm.classList.add("hidea")
                }
            }

            //daging check
            if (val[3].toUpperCase() != daging.toUpperCase()) {
                hmmm.classList.add("hidea")
            }
        }

    }
    //menu admin
    function admin() {
        document.getElementById("produk").innerHTML = ""
        var side_bar = document.getElementById("side_bar")
        bak = side_bar.innerHTML
        side_bar.innerHTML = ""
        mode = ""

        var txt = document.createElement("p")
        txt.innerText = "Admin"
        side_bar.appendChild(txt)

        var search = document.createElement("input")
        search.placeholder = "Cart"
        search.classList.add("search")
        search.id = "search"
        search.setAttribute("onkeyup", "search('search','produk')")
        side_bar.appendChild(search)

        var tambah_btn = document.createElement("button")
        tambah_btn.classList.add("search")
        tambah_btn.classList.add("side_bButon")
        tambah_btn.setAttribute("onclick", "add_menu()")
        tambah_btn.innerText = "Tambah Produk"
        side_bar.appendChild(tambah_btn)

        var padam_btn = document.createElement("button")
        padam_btn.classList.add("search")
        padam_btn.classList.add("side_bButon")
        padam_btn.setAttribute("onclick", "delete_menu()")
        padam_btn.innerText = "Padam Produk"
        side_bar.appendChild(padam_btn)

        var edit_btn = document.createElement("button")
        edit_btn.classList.add("search")
        edit_btn.classList.add("side_bButon")
        edit_btn.setAttribute("onclick", "edit_menu_select()")
        edit_btn.innerText = "Edit Produk"
        side_bar.appendChild(edit_btn)

        var jenama_btn = document.createElement("button")
        jenama_btn.classList.add("search")
        jenama_btn.classList.add("side_bButon")
        jenama_btn.setAttribute("onclick", "list_jenama()")
        jenama_btn.innerText = "Senarai Jenama"
        side_bar.appendChild(jenama_btn)

        var keluar_btn = document.createElement("button")
        keluar_btn.classList.add("search")
        keluar_btn.classList.add("side_bButon")
        keluar_btn.setAttribute("onclick", "exit_admin()")
        keluar_btn.innerText = "Keluar menu admin"
        side_bar.appendChild(keluar_btn)

        document.getElementById("login_message").innerText = ""
        document.getElementById("produk_dipilih").classList.add("hidea")
    }

    function input_text_box(inputId, short_id, text, placeholder) {
        // Create the main div element
        var infoDiv = document.createElement("div");
        var input = document.createElement("input");
        var textInfoDiv = document.createElement("div");
        var paragraph = document.createElement("p");

        infoDiv.className = "info_div";

        input.className = "search";
        input.placeholder = placeholder;
        input.id = inputId;
        input.maxLength = 40;
        input.value = text
        if (placeholder == "Gambar") {
            input.setAttribute("onKeyUp", "image_preview()")
        }

        // Create the nested div element
        textInfoDiv.className = "text_info hiding";
        textInfoDiv.id = short_id;

        // Create the paragraph element
        paragraph.id = short_id + "_t";

        textInfoDiv.appendChild(paragraph);
        infoDiv.appendChild(input);
        infoDiv.appendChild(textInfoDiv);

        // Return the created div element
        return infoDiv;
    }
    //menu admin edit
    function edit_produk_box(image, nama, kalori, harga, jenama, daging, user, sav_txt, func) {
        // Create the main div element
        var produkEditDiv = document.createElement("div");
        var imgDiv = document.createElement("div");
        var img = document.createElement("img");
        var uploadButton = document.createElement("button");
        var txtDiv = document.createElement("div");
        var creatorParagraph = document.createElement("p");
        var addButton = document.createElement("button");
        var jenama_sel = document.createElement("select")

        jenama_sel.classList.add("search")
        jenama_sel.id = "proedit_jenama"
        jenama_sel.value = jenama
        var opt = document.createElement("option")
        opt.value = "-1"
        opt.innerText = "Pilih jenama"
        opt.setAttribute("hidden", "hidden")
        jenama_sel.appendChild(opt)


        var jenama_list = httpGet("/php/get_jenama.php").split("\n")
        for (var a = 0; a < jenama_list.length - 1; a++) {
            var info = jenama_list[a].split(";")
            var opt = document.createElement("option")
            opt.value = info[0]
            opt.innerText = info[1]
            if (jenama == info[0]) {
                opt.setAttribute("selected", "selected")
            }
            jenama_sel.appendChild(opt)
        }

        produkEditDiv.className = "produk_edit";

        // Create the div for image and upload button
        imgDiv.className = "produk_edit_img";

        // Create the image element
        img.id = "proedit_img";
        img.src = "img/" + image;

        // Create the upload button
        uploadButton.className = "search";
        uploadButton.textContent = "Upload gambar";
        uploadButton.id = "proedit_upload"
        uploadButton.setAttribute("onclick", "upload_image()")

        // Append the image and upload button to the image div
        imgDiv.appendChild(img);
        imgDiv.appendChild(uploadButton);

        // Create the div for text and add button
        txtDiv.className = "produk_edit_txt";

        // Create the paragraph element for creator information
        creatorParagraph.id = "proedit_creator";
        creatorParagraph.textContent = "Dibuat oleh " + user;

        // Create the add button
        addButton.className = "search";
        addButton.textContent = sav_txt;
        addButton.setAttribute("onclick", func)
        addButton.id = "proedit_save"

        // Append the creator paragraph and add button to the text div
        txtDiv.appendChild(input_text_box("proedit_nama", "pen", nama, "Nama"))
        txtDiv.appendChild(input_text_box("proedit_harga", "peh", harga, "Harga"))
        txtDiv.appendChild(input_text_box("proedit_kalori", "pek", kalori, "Kalori"))
        txtDiv.appendChild(input_text_box("proedit_daging", "ped", daging, "Daging"))
        txtDiv.appendChild(jenama_sel)
        txtDiv.appendChild(input_text_box("proedit_image", "pei", image, "Gambar"))
        txtDiv.appendChild(creatorParagraph);
        txtDiv.appendChild(addButton);


        // Append the image div and text div to the main div
        produkEditDiv.appendChild(imgDiv);
        produkEditDiv.appendChild(txtDiv);

        // Return the created div element
        return produkEditDiv;
    }
    //keluar admin
    function exit_admin() {
        var side_bar = document.getElementById("side_bar")
        side_bar.innerHTML = bak
        document.getElementById("produk").innerHTML = ""
        list_product()
        document.getElementById("login_message").innerText = "Selemat datang " + localStorage.getItem("Nama pengguna") + "!"
        document.getElementById("produk_dipilih").classList.remove("hidea")
        mode = ""
    }
    //senarai produk di menu admin
    function produk_display_admin(nama, harga, kalori, daging, jenama, gambar, onclick) {
        var div = document.createElement('div')
        var img = document.createElement('img')
        var p1 = document.createElement('p')
        var p2 = document.createElement('p')
        var p3 = document.createElement('p')
        var p4 = document.createElement('p')
        var p5 = document.createElement("p")

        var jenama_list = httpGet("/php/get_jenama.php").split("\n")


        div.classList.add('produk_display')

        img.src = '/img/' + gambar
        div.appendChild(img)

        p1.innerText = "Nama: " + nama;
        div.appendChild(p1)

        p2.innerText = 'Harga: ' + harga
        div.appendChild(p2)

        p3.innerText = 'Kalori: ' + kalori
        div.appendChild(p3)

        p4.innerText = 'Daging: ' + daging
        div.appendChild(p4)
        for (var a = 0; a < jenama_list.length - 1; a++) {
            var info = jenama_list[a].split(";")
            if (info[0] == jenama) {
                p5.innerText = 'Jenama: ' + info[1]
                div.appendChild(p5)
            }
        }


        div.id = nama + "," + kalori + "," + harga + "," + daging + "," + jenama
        div.setAttribute("onclick", onclick)
        return div
    }
    //delete
    function delete_menu() {
        var produk = httpGet("/php/get_produk.php").split("\n")
        if (mode != "delete") {
            document.getElementById("produk").innerHTML = ""
            document.getElementById("login_message").innerText = "Sila pilih produk yang anda mahu padamkan"
            for (var a = 0; a < produk.length - 1; a++) {
                var info = produk[a].split(";")
                document.getElementById("produk").appendChild(produk_display_admin(info[1], info[2], info[3], info[4], info[5], info[6], "delete_confirm('" + info[0] + "')"))
            }
            mode = "delete"
        }

    }
    function delete_confirm(id) {
        if (del != "yes") {
            var side_bar = document.getElementById("side_bar")
            bak2 = side_bar.innerHTML
            side_bar.innerHTML = ""

            var txt = document.createElement("p")
            txt.innerText = "Padamkan produk?"
            side_bar.appendChild(txt)

            var ya_btn = document.createElement("button")
            ya_btn.classList.add("search")
            ya_btn.classList.add("side_bButon")
            ya_btn.setAttribute("onclick", "delete_ya('" + id + "')")
            ya_btn.innerText = "Ya"
            side_bar.appendChild(ya_btn)

            var tidak_btn = document.createElement("button")
            tidak_btn.classList.add("search")
            tidak_btn.classList.add("side_bButon")
            tidak_btn.setAttribute("onclick", "delete_tidak('" + id + "')")
            tidak_btn.innerText = "Tidak"
            side_bar.appendChild(tidak_btn)
            del = "yes"
        }
    }
    function delete_tidak(id) {
        var side_bar = document.getElementById("side_bar")
        side_bar.innerHTML = bak2
        del = "no"
    }
    function delete_ya(id) {
        console.log(httpGet("/php/delete_produk.php?id=" + id))
        document.getElementById("side_bar").innerHTML = bak2
        document.getElementById("produk").innerHTML = ""
        mode = ""
        del = "no"
        delete_menu()
    }
    //add
    function add_menu() {
        if (mode != "add") {
            document.getElementById("login_message").innerText = "Sila masukkan maklumat tentang produk"
            document.getElementById("produk").innerHTML = ""
            document.getElementById("produk").appendChild(edit_produk_box("blank.png", "", "", "", "-1", "", localStorage.getItem("UserId"), "Tambah produk", "add_produk()"))
            mode = "add"
            add_enter_box()
        }
    }
    function check_produk_param() {
        var nama = document.getElementById("proedit_nama")
        var harga = document.getElementById("proedit_harga")
        var kalori = document.getElementById("proedit_kalori")
        var daging = document.getElementById("proedit_daging")
        var jenama = document.getElementById("proedit_jenama")
        var image = document.getElementById("proedit_image")
        var check = 0
        if (nama.value == "") {
            show_info("pen", "pen_t", "Nama produk tidak boleh kosong", "#FF4C29")
        } else if (ban_words.some(v => nama.value.includes(v))) {
            show_info("pen", "pen_t", "Nama produk tidak boleh mengandungi \\ [] {} & # +", "#FF4C29")
        } else {
            check += 1
        }

        if (harga.value == "") {
            show_info("peh", "peh_t", "Harga produk tidak boleh kosong", "#FF4C29")
        } else if (/^\d+$/.test(harga.value) == false) {
            show_info("peh", "peh_t", "Sila masukkan harga yang sah", "#FF4C29")
        } else {
            check += 1
        }

        if (kalori.value == "") {
            show_info("pek", "pek_t", "Kalori produk tidak boleh kosong", "#FF4C29")
        } else if (/^\d+$/.test(kalori.value) == false) {
            show_info("pek", "pek_t", "Sila masukkan Kalori yang sah", "#FF4C29")
        } else {
            check += 1
        }

        if (daging.value == "") {
            show_info("ped", "ped_t", "Daging produk tidak boleh kosong", "#FF4C29")
        } else if (ban_words.some(v => daging.value.includes(v))) {
            show_info("ped", "ped_t", "Daging produk tidak boleh mengandungi \\ [] {} & # +", "#FF4C29")
        } else {
            check += 1
        }

        if (jenama.value == "-1") {
            show_info("pen", "pen_t", "Sila pilih jenama", "#FF4C29")
        } else {
            check += 1
        }

        if (image.value == "") {
            show_info("pei", "pei_t", "Gambar produk tidak boleh kosong", "#FF4C29")
        } else if (ban_words.some(v => image.value.includes(v))) {
            show_info("pei", "pei_t", "Gambar produk tidak boleh mengandungi \\ [] {} & # +", "#FF4C29")
        } else {
            check += 1
        }

        if (check == 6) {
            return true
        }
    }
    function add_produk() {
        var check_list = check_produk_param()
        var nama = document.getElementById("proedit_nama")
        var harga = document.getElementById("proedit_harga")
        var kalori = document.getElementById("proedit_kalori")
        var daging = document.getElementById("proedit_daging")
        var jenama = document.getElementById("proedit_jenama")
        var image = document.getElementById("proedit_image")
        if (check_list == true) {
            var createproduk = httpGet("/php/add_produk.php?nama=" + nama.value + "&harga=" + harga.value + "&kalori=" + kalori.value + "&daging=" + daging.value + "&jenama=" + jenama.value + "&usr_id=" + localStorage.getItem("UserId") + "&gambar=" + image.value).toString()
            if (createproduk == "New record created successfully") {
                show_info("pen", "pen_t", "Produk telah ditambah", "#32965D")
                setTimeout(() => {
                    clear_main()
                    add_menu()
                }, 2000);
            } else {
                console.log(createproduk)
                show_info("pen", "pen_t", "Ada sesuatu yang tidak kena", "#FF4C29")
            }

        }

    }
    function image_preview() {
        var image = document.getElementById("proedit_image")
        var img = document.getElementById("proedit_img")
        img.src = "img/" + image.value
    }
    function upload_image() {
        var file = document.getElementById("fileToUpload")
        file.value = ""
        file.click()
        var checker = setInterval(() => {
            var file = document.getElementById("fileToUpload")
            if (file.value != "") {
                var submit = document.getElementById("upload_file")
                var frame = document.getElementById("file_names")
                var image = document.getElementById("proedit_image")
                var upload = document.getElementById("proedit_upload")
                upload.innerText = "Uploading..."
                submit.click()
                setTimeout(() => {
                    image.value = frame.contentWindow.document.body.innerHTML
                    image_preview()
                    frame.src = ""
                }, 200);
                upload.innerText = "Selesai!"

                setTimeout(() => {
                    upload.innerText = "Upload gambar"
                }, 1500);
                clearInterval(checker)
            }
        }, 500);
    }
    //edit
    function edit_menu_select() {
        var produk = httpGet("/php/get_produk.php").split("\n")
        if (mode != "edit") {
            document.getElementById("produk").innerHTML = ""
            document.getElementById("login_message").innerText = "Sila pilih produk yang anda mahu edit"
            for (var a = 0; a < produk.length - 1; a++) {
                var info = produk[a].split(";")
                document.getElementById("produk").appendChild(produk_display_admin(info[1], info[2], info[3], info[4], info[5], info[6], "edit_produk('" + info[0] + "')"))
            }
            mode = "edit"
        }
    }
    function edit_produk(id) {
        var produk = httpGet("/php/get_produk.php").split("\n")
        for (var a = 0; a < produk.length; a++) {
            var info = produk[a].split(";")
            if (info[0] == id) {
                document.getElementById("produk").innerHTML = ""
                document.getElementById("produk").appendChild(edit_produk_box(info[6], info[1], info[2], info[3], info[5], info[4], info[7], "Simpan produk", "save_produk('" + info[0] + "')"))
            }
        }
    }
    function save_produk(id) {
        var check_list = check_produk_param()
        var nama = document.getElementById("proedit_nama")
        var harga = document.getElementById("proedit_harga")
        var kalori = document.getElementById("proedit_kalori")
        var daging = document.getElementById("proedit_daging")
        var jenama = document.getElementById("proedit_jenama")
        var image = document.getElementById("proedit_image")
        if (check_list == true) {
            var createproduk = httpGet("/php/edit_produk.php?nama=" + nama.value + "&harga=" + harga.value + "&kalori=" + kalori.value + "&daging=" + daging.value + "&jenama=" + jenama.value + "&id_produk=" + id + "&gambar=" + image.value).toString()
            if (createproduk == "New record created successfully") {
                show_info("pen", "pen_t", "Produk telah disimpankan", "#32965D")
                setTimeout(() => {
                    clear_main()
                    edit_menu_select()
                }, 1500);
            } else {
                console.log(createproduk)
                show_info("pen", "pen_t", "Ada sesuatu yang tidak kena", "#FF4C29")
            }

        }

    }

    function clear_main() {
        document.getElementById("produk").innerHTML = ""
        mode = ""
    }

    function add_enter_box() {
        var pen = document.getElementById("proedit_nama")
        var peh = document.getElementById("proedit_harga")
        var pek = document.getElementById("proedit_kalori")
        var ped = document.getElementById("proedit_daging")
        var pei = document.getElementById("proedit_image")
        var peb = document.getElementById("proedit_save")

        pen.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "Enter" || event.key == "ArrowDown") {
                peh.focus()
            }
        })

        peh.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "Enter" || event.key == "ArrowDown") {
                pek.focus()
            } else if (event.key == "ArrowUp") {
                pen.focus()
            }
        })

        pek.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "Enter" || event.key == "ArrowDown") {
                ped.focus()
            } else if (event.key == "ArrowUp") {
                peh.focus()
            }
        })

        ped.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "Enter" || event.key == "ArrowDown") {
                pei.focus()
            } else if (event.key == "ArrowUp") {
                pek.focus()
            }
        })


        pei.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "Enter") {
                peb.click()
                peb.focus()
            } else if (event.key == "ArrowDown") {
                peb.focus()
            } else if (event.key == "ArrowUp") {
                ped.focus()
            }
        })

        peb.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.key == "ArrowUp") {
                pei.focus()
            }
        })

    }

    function print_page() {
        var side = document.getElementById("side_bar")
        var main = document.getElementById("main")
        var header = document.getElementById("header")
        var ori = main.style.marginLeft
        side.classList.add("hidea")
        header.classList.add("hidea")
        main.style.marginLeft = "0%"
        window.print()
        side.classList.remove("hidea")
        header.classList.remove("hidea")
        main.style.marginLeft = ori
    }


    function jenama_detail(id, nama) {
        var div = document.createElement("div");
        var p1 = document.createElement("p");
        var p2 = document.createElement("input");
        var button1 = document.createElement("button");
        var button2 = document.createElement("button");
        if (id == " ") {
            nama = "new_jenama"

            p1.placeholder = "Tambah jenama";
            button1.innerText = "Tambah";

            button1.className = "search";
            button2.innerText = "Cetak";
            button2.setAttribute("onClick", "print_page()")
            button1.setAttribute("onClick", "save_jenama('" + nama + "','" + id + "')")
        } else {
            p2.value = nama;
            button1.className = "search";
            button1.innerText = "Hapus";
            button1.setAttribute("onClick", "delete_jenama('" + id + "','" + nama + "')")
            button2.innerText = "Simpankan";
            button2.setAttribute("onClick", "save_jenama('" + nama + "','" + id + "')")
        }
        div.id = nama
        div.className = "jenama"
        p1.innerText = id;
        p2.className = "name";

        p2.type = "text"
        p2.classList.add("search")

        button2.className = "search";



        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(button1);

        div.appendChild(button2);

        return div;
    }

    function save_jenama(name, id) {
        var parent = document.getElementById(name)
        var new_name = parent.getElementsByTagName("input")[0].value

        if (id = " ") {
            httpGet('/php/add_jenama.php?nama=' + new_name)
        } else {
            httpGet('/php/edit_jenama.php?nama=' + new_name + "&id=" + id)
        }

        document.getElementById("produk").innerHTML = ""
        document.getElementById("login_message").innerText = "Jenama baharu sedang di simpankan..."
        setTimeout(() => {
            mode = ""
            list_jenama()
        }, 200);

    }

    function delete_jenama(id, pare) {
        var parent = document.getElementById(pare)

        var p1 = document.createElement("p");
        var button1 = document.createElement("button");
        var button2 = document.createElement("button");

        p1.innerText = "Hapuskan ?";
        p1.classList.add("dtext")

        button1.className = "search";
        button1.innerText = "Ya";
        button1.setAttribute("onClick", "d_produk_y('" + id + "')")

        button2.className = "search";
        button2.innerText = "Tidak";
        button2.setAttribute("onClick", "d_produk_t()")

        parent.getElementsByTagName('button')[0].remove()
        parent.getElementsByTagName('button')[0].remove()
        parent.appendChild(p1)
        parent.appendChild(button1)
        parent.appendChild(button2)
    }

    function d_produk_t() {
        mode = ""
        list_jenama()
    }

    function d_produk_y(id) {
        httpGet("/php/delete_jenama.php?id=" + id)
        mode = ""
        list_jenama()
    }

    function list_jenama() {
        if (mode != "list_jenama") {
            document.getElementById("login_message").innerText = "Senarai Jenama"
            document.getElementById("produk").innerHTML = ""
            var jenama = httpGet("/php/get_jenama.php").split("\n")
            for (var a = 0; a < jenama.length - 1; a++) {
                var info = jenama[a].split(";")
                document.getElementById("produk").appendChild(jenama_detail(info[0], info[1]))
            }
            document.getElementById("produk").appendChild(jenama_detail(" ", ""))
            mode = "list_jenama"
        }
    }
