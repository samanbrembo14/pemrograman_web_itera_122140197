# Program Penghitung BMI (fix satuan cm ke meter)

# Input berat badan (kg) dan tinggi badan (cm)
berat = float(input("Masukkan berat badan (kg): "))
tinggi_cm = float(input("Masukkan tinggi badan (cm): "))

# Konversi tinggi dari cm ke meter
tinggi = tinggi_cm / 100

# Hitung BMI
bmi = berat / (tinggi ** 2)

# Tentukan kategori BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif 18.5 <= bmi < 25:
    kategori = "Berat badan normal"
elif 25 <= bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Output hasil
print(f"\nBMI Anda: {bmi:.2f}")
print(f"Kategori: {kategori}")
