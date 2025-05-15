from .default import my_view
from .notfound import notfound_view

# Tambahkan baris berikut:
from .matakuliah import (
    get_all_matakuliah,
    get_matakuliah,
    add_matakuliah,
    update_matakuliah,
    delete_matakuliah
)