from abc import ABC, abstractmethod

class LibraryItem(ABC):
    ## Abstract class sebagai dasar untuk semua item perpustakaan
    def __init__(self, item_id, title, year_published):
        self._item_id = item_id  # protected attribute
        self._title = title  # protected attribute
        self._year_published = year_published  # protected attribute
        self._is_available = True  # protected attribute
    
    @property
    def item_id(self):
        ## Property untuk mendapatkan ID item
        return self._item_id
    
    @property
    def title(self):
        ## Property untuk mendapatkan judul item
        return self._title
    
    @property
    def is_available(self):
        ## Property untuk memeriksa ketersediaan item
        return self._is_available
    
    @abstractmethod
    def display_info(self):
        ## Abstract method yang wajib diimplementasikan oleh subclass
        pass
    
    def checkout(self):
        ## Method untuk meminjam item dari perpustakaan
        if self._is_available:
            self._is_available = False
            return True
        return False
    
    def return_item(self):
        ## Method untuk mengembalikan item ke perpustakaan
        if not self._is_available:
            self._is_available = True
            return True
        return False
    
    def __str__(self):
        ## Method untuk representasi string dari objek
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"{self._title} (ID: {self._item_id}) - {status}"


class Book(LibraryItem):
    ## Subclass dari LibraryItem untuk buku
    def __init__(self, item_id, title, author, year_published, genre):
        super().__init__(item_id, title, year_published)
        self.__author = author  # private attribute
        self.__genre = genre  # private attribute
    
    @property
    def author(self):
        ## Property untuk mendapatkan penulis buku
        return self.__author
    
    @property
    def genre(self):
        ## Property untuk mendapatkan genre buku
        return self.__genre
    
    def display_info(self):
        ## Implementasi method abstract untuk menampilkan informasi buku
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"BUKU: {self._title} oleh {self.__author} | ID: {self._item_id} | " \
               f"Tahun: {self._year_published} | Genre: {self.__genre} | Status: {status}"


class Magazine(LibraryItem):
    ## Subclass dari LibraryItem untuk majalah
    def __init__(self, item_id, title, year_published, issue_number, publisher):
        super().__init__(item_id, title, year_published)
        self.__issue_number = issue_number  # private attribute
        self.__publisher = publisher  # private attribute
    
    @property
    def issue_number(self):
        ## Property untuk mendapatkan nomor edisi majalah
        return self.__issue_number
    
    @property
    def publisher(self):
        ## Property untuk mendapatkan penerbit majalah
        return self.__publisher
    
    def display_info(self):
        ## Implementasi method abstract untuk menampilkan informasi majalah
        status = "Tersedia" if self._is_available else "Dipinjam"
        return f"MAJALAH: {self._title} - Edisi {self.__issue_number} | ID: {self._item_id} | " \
               f"Tahun: {self._year_published} | Penerbit: {self.__publisher} | Status: {status}"


class Library:
    ## Class untuk mengelola koleksi item perpustakaan
    def __init__(self, name):
        self.__name = name  # private attribute
        self.__items = {}  # private attribute - dictionary untuk menyimpan item berdasarkan ID
    
    @property
    def name(self):
        ## Property untuk mendapatkan nama perpustakaan
        return self.__name
    
    def add_item(self, item):
        ## Method untuk menambahkan item ke perpustakaan
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus merupakan turunan dari LibraryItem")
        
        self.__items[item.item_id] = item
        return True
    
    def find_by_id(self, item_id):
        ## Method untuk mencari item berdasarkan ID
        return self.__items.get(item_id)
    
    def find_by_title(self, title):
        ## Method untuk mencari item berdasarkan judul
        results = []
        for item in self.__items.values():
            if title.lower() in item.title.lower():
                results.append(item)
        return results
    
    def get_all_items(self):
        ## Method untuk mendapatkan semua item di perpustakaan
        return list(self.__items.values())
    
    def get_available_items(self):
        ## Method untuk mendapatkan daftar item yang tersedia
        return [item for item in self.__items.values() if item.is_available]
    
    def checkout_item(self, item_id):
        ## Method untuk meminjam item dari perpustakaan
        item = self.find_by_id(item_id)
        if item and item.is_available:
            return item.checkout()
        return False
    
    def return_item(self, item_id):
        ## Method untuk mengembalikan item ke perpustakaan
        item = self.find_by_id(item_id)
        if item and not item.is_available:
            return item.return_item()
        return False


# Penggunaan sistem
if __name__ == "__main__":
    # Inisialisasi perpustakaan
    perpus = Library("Perpustakaan Kota")
    
    # Menu
    while True:
        print("\n===== SISTEM MANAJEMEN PERPUSTAKAAN =====")
        print(f"Perpustakaan: {perpus.name}")
        print("1. Tambah Item")
        print("2. Tampilkan Semua Item")
        print("3. Tampilkan Item Tersedia")
        print("4. Cari Item berdasarkan ID")
        print("5. Cari Item berdasarkan Judul")
        print("6. Pinjam Item")
        print("7. Kembalikan Item")
        print("0. Keluar")
        
        pilihan = input("\nPilih menu (0-7): ")
        
        if pilihan == "1":
            print("\n-- TAMBAH ITEM --")
            jenis = input("Jenis item (1: Buku, 2: Majalah): ")
            item_id = input("ID: ")
            title = input("Judul: ")
            year = int(input("Tahun terbit: "))
            
            if jenis == "1":
                author = input("Penulis: ")
                genre = input("Genre: ")
                item = Book(item_id, title, author, year, genre)
                perpus.add_item(item)
                print(f"Buku '{title}' berhasil ditambahkan")
            elif jenis == "2":
                issue = input("Edisi: ")
                publisher = input("Penerbit: ")
                item = Magazine(item_id, title, year, issue, publisher)
                perpus.add_item(item)
                print(f"Majalah '{title}' berhasil ditambahkan")
            else:
                print("Jenis item tidak valid")
        
        elif pilihan == "2":
            print("\n-- SEMUA ITEM --")
            items = perpus.get_all_items()
            if items:
                for item in items:
                    print(item.display_info())
            else:
                print("Tidak ada item di perpustakaan")
        
        elif pilihan == "3":
            print("\n-- ITEM TERSEDIA --")
            items = perpus.get_available_items()
            if items:
                for item in items:
                    print(item.display_info())
            else:
                print("Tidak ada item yang tersedia")
        
        elif pilihan == "4":
            print("\n-- CARI BERDASARKAN ID --")
            item_id = input("Masukkan ID item: ")
            item = perpus.find_by_id(item_id)
            if item:
                print(item.display_info())
            else:
                print(f"Item dengan ID '{item_id}' tidak ditemukan")
        
        elif pilihan == "5":
            print("\n-- CARI BERDASARKAN JUDUL --")
            judul = input("Masukkan judul atau kata kunci: ")
            items = perpus.find_by_title(judul)
            if items:
                for item in items:
                    print(item.display_info())
            else:
                print(f"Tidak ada item dengan judul yang mengandung '{judul}'")
        
        elif pilihan == "6":
            print("\n-- PINJAM ITEM --")
            item_id = input("Masukkan ID item yang ingin dipinjam: ")
            if perpus.checkout_item(item_id):
                print("Item berhasil dipinjam")
            else:
                print("Item tidak dapat dipinjam (tidak tersedia atau ID tidak valid)")
        
        elif pilihan == "7":
            print("\n-- KEMBALIKAN ITEM --")
            item_id = input("Masukkan ID item yang ingin dikembalikan: ")
            if perpus.return_item(item_id):
                print("Item berhasil dikembalikan")
            else:
                print("Item tidak dapat dikembalikan (sudah tersedia atau ID tidak valid)")
        
        elif pilihan == "0":
            print("Terima kasih telah menggunakan Sistem Manajemen Perpustakaan")
            break
        
        else:
            print("Pilihan tidak valid, silakan coba lagi")