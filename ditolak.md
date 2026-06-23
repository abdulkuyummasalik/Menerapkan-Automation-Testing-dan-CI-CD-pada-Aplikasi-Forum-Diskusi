Submission: Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi

Aktivitas Terbaru

Upload

Review selesai

Ditolak

Submission Info

Student Name	Abdul Kuyum Masalik (abdulkuyummasalik)
Course	Menjadi React Web Developer Expert
Submission	Submission: Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi
Submission ID	4911231
Dikirim pada	Selasa, 23 Juni 2026 - 19:06:56
Tipe Enrollment	Token: CC 2026 Cohort - SMK Kelas Bonus
Student's Note

Nicee Jon!!!

Submit ulang
Hasil Review
Checklist

Perlu diperbaiki
Deployment Aplikasi

Mempertahankan Kriteria Submission Sebelumnya

Terpenuhi
Automation Testing

Memanfaatkan Salah Satu Ecosystem React

Catatan dari Reviewer

Hai abdulkuyummasalik! terima kasih telah sabar menunggu. Kami membutuhkan waktu untuk bisa memberikan feedback sekomprehensif mungkin. Setiap submission diperiksa satu per satu oleh tim reviewer yang memiliki sertifikasi global atau telah bekerja di perusahaan ternama.

Setelah dilakukan proses review project website yang kamu kirimkan, project tersebut belum memenuhi kriteria untuk lulus kelas Menjadi React Web Developer Expert. Oleh karena itu kami harus menolak submission project kamu.

Berikut adalah beberapa catatan yang harus terpenuhi untuk menyelesaikan tugas submission sebagai berikut:

Deployment aplikasi
Pastikan kamu melampirkan URL Vercel aplikasi yang sudah di-deploy pada catatan submission. Agar aplikasi dapat di uji pada tahap production
dos-9cf18b6f1af9689a497dd9fe9c6f1e6f20260623202627.PNGKamu bisa mengetahui URL untuk mengakses aplikasi pada dashboard vercel. Silakan dicopy link yang ada pada bagian "Domains", kemudian lampirkan pada catatan submission
Pastikan kamu melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar pada folder aplikasi. Untuk contoh screenshotnya kamu dapat membaca kembali instruksi submission
Catatan:
Jika saat ini repo github proyek kamu masih private, silakan atur menjadi public terlebih dahulu agar screenshot branch protection bisa diambil.
Kamu bisa mengikuti Latihan: Memasang Proteksi pada Branch Master dan lanjutkan dengan langkah-langkah di Latihan: Menguji Deployment dengan CI/CD untuk mendapatkan screenshot yang sesuai kriteria. Ke depannya, untuk mengurangi tingkat plagiarisme, kami sarankan untuk mengubah repository menjadi private setelah proses penilaian submission selesai.
Mempertahankan Kriteria Submission Sebelumnya
Bugs Highlighting
Masih terdapat error saat kode diaudit dengan ESLint.
dos-bcb0aae3c97e50180af1efbd4150e1b020260623204733.png
Untuk mengatasinya kamu bisa melakukan hal berikut ini :
Memperbaiki kode secara manual dengan mengubah kode yang error yang ditunjukkan pada terminal
Menonaktifkan aturan yang tidak ingin kamu terapkan pada property rules di berkas konfigurasi ESLint
Jalankan perintah npx eslint src --fix. Namun biasanya tidak semuanya bisa diperbaiki dengan perintah tersebut
Mengintegrasikan ESLint dengan Prettier untuk memperbaiki kode secara otomatis. Kamu dapat membaca cara penggunaannya disini
Selanjutnya pastikan kode kamu bersih dan sesuai dengan style guide yang digunakan. Hal ini ditandai dengan tidak adanya indikasi error maupun warning saat kode diaudit dengan ESLint. (Misalnya dengan command npx eslint src atau npx eslint src --ext js,jsx)
Ikuti beberapa saran di atas agar submission kamu dapat diterima dengan baik dan lulus dari kelas Menjadi React Web Developer Expert.

Kegagalan bagi developer sukses itu adalah anak tangga yang memang harus dilewati dan mereka fokus pada membuat progress (kemajuan), bukan menghitung jumlah kegagalan. 

Tetap semangat ya! Ikuti beberapa saran di atas. Jika ada pertanyaan atau kendala dalam menerapkan beberapa saran di atas, silakan bertanya di forum diskusi kelas. Dengan senang hati kami akan membantu menjawab di sana. Kemajuan terbaik developer Indonesia adalah passion kami.

Salam

Dicoding Reviewer

Sembunyikan



kriteria:
Submission

Submission: Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi

Pengantar Kriteria Penilaian Lainnya
Tujuan Akhir
Buat pengujian mulai dari Unit, Integration, dan End-to-End pada Aplikasi Forum Diskusi.
Deploy Aplikasi Forum Diskusi dengan teknik CI/CD.
Memanfaatkan salah satu React Ecosystem pada Aplikasi Forum Diskusi.
Kriteria Utama 1: Automation Testing
Buat minimal dua pengujian fungsi Reducer.
Buat minimal dua pengujian Thunk Function.
Buat minimal dua pengujian React Components.
Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
Pengujian dapat dijalankan dengan perintah npm test dan npm run e2e.
Catatan penting.
Anda bisa tentukan sendiri fungsi reducer, thunk, dan React component yang hendak diuji. Untuk mengasah kemampuan, kami sarankan untuk menguji unit yang kompleks. Contonya, fungsi reducer yang memiliki banyak kondisi atau fungsi thunk yang men-dispatch banyak action.


Kriteria Utama 2: Deployment Aplikasi
Deploy aplikasi dengan menggunakan teknik CI/CD.
Continuous Integration diterapkan dengan GitHub Actions.
Continuous Deployment diterapkan dengan Vercel.
Memproteksi branch master.
Melampirkan URL Vercel aplikasi Anda pada catatan submission.
Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
1_ci_check_error: menunjukkan CI check error karena pengujian gagal, contohnya.dos:9ad5ec697da017001967f5a230f0c0f020221111102335.jpeg

2_ci_check_pass: menunjukkan CI check pass karena pengujian lolos, contohnya.
dos:d5d5fc9ae2eb95f6682dbd4266f2ef5d20221111102422.jpeg

3_branch_protection: menunjukkan branch proteksi pada halaman PR, contohnya.
dos:7b70f73cc59019697967ec26f092c8eb20221111102459.jpeg


Catatan penting.

Screenshot dilampirkan di dalam berkas ZIP proyek. Berikut contoh struktur folder proyeknya.dos:41cb311286c38353c5030f2d9dc7fb0120221111102537.jpeg

Branch protection hanya bisa dilakukan di repository public, tetapi untuk meminimalisir tingkat plagiarism ke depannya, kami sarankan untuk mengubah repository menjadi private setelah proses penilaian submission selesai.


Kriteria Utama 3: Memanfaatkan Salah Satu Ecosystem React
Memanfaatkan minimal satu React Ecosystem pada daftar berikut.
Berikut penggunaan Ecosystem React yang tidak kami pertimbangkan untuk memenuhi kriteria.
Create React Apps
Vite
React Router
React Icons
Redux
Redux Thunk
Redux Toolkit
Jest
Vitest
React Testing Library


Kriteria Utama 4: Mempertahankan Kriteria Submission Sebelumnya
Aplikasi harus tetap mempertahankan kriteria utama yang ada di submission sebelumnya.

Fungsionalitas Aplikasi
Bugs Highlighting
Arsitektur Aplikasi

