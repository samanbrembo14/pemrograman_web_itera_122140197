# Import seluruh modul
import math_operations

# Import sebagian fungsi secara langsung
from math_operations import luas_lingkaran, keliling_lingkaran

# Menggunakan fungsi geometri
print("=== Perhitungan Geometri ===")
sisi = 5
print(f"Luas Persegi (sisi={sisi}): {math_operations.luas_persegi(sisi)}")
print(f"Keliling Persegi (sisi={sisi}): {math_operations.keliling_persegi(sisi)}")

panjang = 8
lebar = 4
print(f"Luas Persegi Panjang (p={panjang}, l={lebar}): {math_operations.luas_persegi_panjang(panjang, lebar)}")
print(f"Keliling Persegi Panjang (p={panjang}, l={lebar}): {math_operations.keliling_persegi_panjang(panjang, lebar)}")

radius = 7
print(f"Luas Lingkaran (r={radius}): {luas_lingkaran(radius)}")
print(f"Keliling Lingkaran (r={radius}): {keliling_lingkaran(radius)}")

# Menggunakan fungsi konversi suhu
print("\n=== Konversi Suhu ===")
celsius = 25
print(f"{celsius}°C ke Fahrenheit: {math_operations.celsius_to_fahrenheit(celsius)}°F")
print(f"{celsius}°C ke Kelvin: {math_operations.celsius_to_kelvin(celsius)}K")
