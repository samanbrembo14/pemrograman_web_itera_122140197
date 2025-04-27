# Data Mahasiswa
mahasiswa = [
    {"nama": "Alwi", "nim": "122140197", "nilai_uts": 78, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Eric", "nim": "122140157", "nilai_uts": 65, "nilai_uas": 70, "nilai_tugas": 75},
    {"nama": "Jhoel", "nim": "122140174", "nilai_uts": 90, "nilai_uas": 88, "nilai_tugas": 92},
    {"nama": "Dewi", "nim": "122140000", "nilai_uts": 50, "nilai_uas": 55, "nilai_tugas": 60},
    {"nama": "Eca", "nim": "122222222", "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50}
]

# Hitung nilai akhir dan grade
for mhs in mahasiswa:
    nilai_akhir = (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])
    mhs["nilai_akhir"] = round(nilai_akhir, 2)
    
    if nilai_akhir >= 80:
        mhs["grade"] = "A"
    elif nilai_akhir >= 70:
        mhs["grade"] = "B"
    elif nilai_akhir >= 60:
        mhs["grade"] = "C"
    elif nilai_akhir >= 50:
        mhs["grade"] = "D"
    else:
        mhs["grade"] = "E"

# Tampilkan data dalam format tabel
print("\nData Mahasiswa:")
print("{:<10} {:<8} {:<10} {:<10} {:<10} {:<12} {:<6}".format(
    "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"
))
print("-" * 70)

for mhs in mahasiswa:
    print("{:<10} {:<8} {:<10} {:<10} {:<10} {:<12} {:<6}".format(
        mhs["nama"], mhs["nim"], mhs["nilai_uts"], mhs["nilai_uas"],
        mhs["nilai_tugas"], mhs["nilai_akhir"], mhs["grade"]
    ))

# Cari mahasiswa dengan nilai tertinggi dan terendah
tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

print("\nMahasiswa dengan Nilai Tertinggi:")
print(f"{tertinggi['nama']} ({tertinggi['nim']}) - Nilai Akhir: {tertinggi['nilai_akhir']} - Grade: {tertinggi['grade']}")

print("\nMahasiswa dengan Nilai Terendah:")
print(f"{terendah['nama']} ({terendah['nim']}) - Nilai Akhir: {terendah['nilai_akhir']} - Grade: {terendah['grade']}")
