CREATE DATABASE `sistem anda`;

USE `sistem anda`;

CREATE TABLE jenama ( 
    id_jenama INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, 
    jenama TEXT NOT NULL 
); 

CREATE TABLE pengguna ( 
    id_user VARCHAR(15) PRIMARY KEY NOT NULL, 
    nama_user TEXT NOT NULL, 
    emel TEXT NOT NULL, 
    no_tel INT(20) NOT NULL, 
    kata_kunci_user TEXT NOT NULL, 
    aras TEXT NOT NULL 
); 

CREATE TABLE produk ( 
    id_produk INT(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, 
    nama_produk VARCHAR(40) NOT NULL, 
    harga_produk FLOAT NOT NULL, 
    kalori_produk FLOAT NOT NULL, 
    id_jenama INT(11) NOT NULL, 
    gambar VARCHAR(99) NOT NULL, 
    daging VARCHAR(50) NOT NULL, 
    id_user VARCHAR(40) NOT NULL,
    FOREIGN KEY (id_jenama) REFERENCES jenama(id_jenama),
    FOREIGN KEY (id_user) REFERENCES pengguna(id_user)
); 

CREATE TABLE pilihan ( 
    id_user VARCHAR(40) NOT NULL, 
    id_produk INT(11) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES pengguna(id_user),
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk)
);

ALTER TABLE produk ADD INDEX(id_jenama); 
ALTER TABLE produk ADD INDEX(id_user);

ALTER TABLE pilihan ADD INDEX(id_produk); 
ALTER TABLE pilihan ADD INDEX(id_user);

INSERT INTO jenama (jenama) VALUES ('Azuma');
INSERT INTO jenama (jenama) VALUES ('Sushi Mentai');
INSERT INTO jenama (jenama) VALUES ('Sushi King');
INSERT INTO jenama (jenama) VALUES ('Nippion Sushi');
INSERT INTO jenama (jenama) VALUES ('Matsu');
INSERT INTO jenama (jenama) VALUES ('Kanzo');
INSERT INTO jenama (jenama) VALUES ('Tekenoko');
INSERT INTO pengguna (id_user, nama_user, emel, no_tel, kata_kunci_user, aras) VALUES ('Admin', 'Admin', 'admin@azurisushi.com', '0618276', 'adm@1234', 'ADMIN');
INSERT INTO produk (nama_produk, harga_produk, kalori_produk, id_jenama, gambar, daging, id_user) VALUES ('test', '10', '50', '1', 'blank.png', 'tiada', 'Admin');
