// Configuration Storage (only current selected config ID stored in localStorage, actual configs in DB)
const CURRENT_CONFIG_KEY = 'jkn_testing_current_config_id';
const FORM_STATE_KEY = 'jkn_testing_form_state';

// Endpoint definitions
const endpoints = {
    antrean: {
        refPoli: { name: 'Referensi Poli', params: [] },
        refDokter: { name: 'Referensi Dokter', params: [] },
        refJadwalDokter: { 
            name: 'Referensi Jadwal Dokter', 
            params: [
                { key: 'poli', label: 'Kode Poli', type: 'text', required: true, placeholder: 'Contoh: MAT' },
                { key: 'tanggal', label: 'Tanggal (YYYY-MM-DD)', type: 'date', required: true }
            ]
        },
        refPoliFp: { name: 'Referensi Poli Fingerprint', params: [] },
        refPasienFp: { 
            name: 'Referensi Pasien Fingerprint', 
            params: [
                { key: 'jenis', label: 'Jenis', type: 'select', required: true, options: ['nik', 'noka'] },
                { key: 'nomor', label: 'Nomor Identitas', type: 'text', required: true }
            ]
        },
        updateJadwalDokter: { 
            name: 'Update Jadwal Dokter', 
            params: [
                { key: 'kodepoli', label: 'Kode Poli', type: 'text', required: true },
                { key: 'kodesubspesialis', label: 'Kode Sub-Spesialis', type: 'text', required: true },
                { key: 'kodedokter', label: 'Kode Dokter', type: 'number', required: true },
                { key: 'jadwal', label: 'Jadwal (JSON Array)', type: 'textarea', required: true, placeholder: '[{"hari":"1","buka":"08:00","tutup":"12:00"}]' }
            ]
        },
        tambah: { 
            name: 'Tambah Antrean', 
            params: [
                { key: 'kodebooking', label: 'Kode Booking', type: 'text', required: true },
                { key: 'jenispasien', label: 'Jenis Pasien', type: 'select', required: true, options: ['JKN', 'NON JKN'] },
                { key: 'nomorkartu', label: 'Nomor Kartu', type: 'text', required: false },
                { key: 'nik', label: 'NIK', type: 'text', required: true },
                { key: 'nohp', label: 'No HP', type: 'text', required: true },
                { key: 'kodepoli', label: 'Kode Poli', type: 'text', required: true },
                { key: 'namapoli', label: 'Nama Poli', type: 'text', required: true },
                { key: 'pasienbaru', label: 'Pasien Baru', type: 'select', required: true, options: ['0', '1'] },
                { key: 'norm', label: 'No RM', type: 'text', required: true },
                { key: 'tanggalperiksa', label: 'Tanggal Periksa (YYYY-MM-DD)', type: 'date', required: true },
                { key: 'kodedokter', label: 'Kode Dokter', type: 'text', required: true },
                { key: 'namadokter', label: 'Nama Dokter', type: 'text', required: true },
                { key: 'jampraktek', label: 'Jam Praktik', type: 'text', required: true, placeholder: '08:00-16:00' },
                { key: 'jeniskunjungan', label: 'Jenis Kunjungan', type: 'select', required: true, options: ['1', '2', '3', '4'] },
                { key: 'nomorreferensi', label: 'Nomor Referensi', type: 'text', required: false },
                { key: 'nomorantrean', label: 'Nomor Antrean', type: 'text', required: true, placeholder: 'A003' },
                { key: 'angkaantrean', label: 'Angka Antrean', type: 'number', required: true },
                { key: 'estimasidilayani', label: 'Estimasi Dilayani (ms)', type: 'number', required: true },
                { key: 'sisakuotajkn', label: 'Sisa Kuota JKN', type: 'number', required: true },
                { key: 'kuotajkn', label: 'Kuota JKN', type: 'number', required: true },
                { key: 'sisakuotanonjkn', label: 'Sisa Kuota Non JKN', type: 'number', required: true },
                { key: 'kuotanonjkn', label: 'Kuota Non JKN', type: 'number', required: true },
                { key: 'keterangan', label: 'Keterangan', type: 'text', required: true }
            ]
        },
        tambahFarmasi: { 
            name: 'Tambah Antrean Farmasi', 
            params: [
                { key: 'kodebooking', label: 'Kode Booking', type: 'text', required: true },
                { key: 'jenisresep', label: 'Jenis Resep', type: 'select', required: true, options: ['racikan', 'non racikan'] },
                { key: 'nomorantrean', label: 'Nomor Antrean', type: 'number', required: true },
                { key: 'keterangan', label: 'Keterangan', type: 'text', required: true }
            ]
        },
        updateWaktu: { 
            name: 'Update Waktu Antrean', 
            params: [
                { key: 'kodebooking', label: 'Kode Booking', type: 'text', required: true },
                { key: 'taskid', label: 'Task ID', type: 'number', required: true, placeholder: '1-7 atau 99' },
                { key: 'waktu', label: 'Waktu (timestamp ms)', type: 'number', required: true },
                { key: 'jenisresep', label: 'Jenis Resep (opsional)', type: 'select', required: false, options: ['Tidak ada', 'Racikan', 'Non racikan'] }
            ]
        },
        batal: { 
            name: 'Batal Antrean', 
            params: [
                { key: 'kodebooking', label: 'Kode Booking', type: 'text', required: true },
                { key: 'keterangan', label: 'Keterangan', type: 'text', required: true }
            ]
        },
        listTaskId: { 
            name: 'List Waktu TaskId', 
            params: [
                { key: 'kodeBooking', label: 'Kode Booking', type: 'text', required: true }
            ]
        },
        dashboardPerTanggal: { 
            name: 'Dashboard Per-Tanggal', 
            params: [
                { key: 'tanggal', label: 'Tanggal (YYYY-MM-DD)', type: 'date', required: true },
                { key: 'waktu', label: 'Jenis Waktu', type: 'select', required: true, options: ['rs', 'server'] }
            ]
        },
        dashboardPerBulan: { 
            name: 'Dashboard Per-Bulan', 
            params: [
                { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                { key: 'waktu', label: 'Jenis Waktu', type: 'select', required: true, options: ['rs', 'server'] }
            ]
        },
        perTanggal: { 
            name: 'Antrean Per-Tanggal', 
            params: [
                { key: 'tanggal', label: 'Tanggal (YYYY-MM-DD)', type: 'date', required: true }
            ]
        },
        perKodeBooking: { 
            name: 'Antrean Per-KodeBooking', 
            params: [
                { key: 'kodeBooking', label: 'Kode Booking', type: 'text', required: true }
            ]
        },
        belumDilayani: { name: 'Antrean Belum Dilayani', params: [] },
        belumDilayaniPredikat: { 
            name: 'Antrean Belum Dilayani Per-(Poli, Dokter, Hari, Jam)', 
            params: [
                { key: 'poli', label: 'Kode Poli', type: 'text', required: true },
                { key: 'dokter', label: 'Kode Dokter', type: 'text', required: true },
                { key: 'hari', label: 'Hari (1-7)', type: 'number', required: true, min: 1, max: 7 },
                { key: 'jam', label: 'Jam Praktik', type: 'text', required: true, placeholder: '08:00-16:00' }
            ]
        }
    },
    aplicares: {
        refKamar: { name: 'Referensi Kamar', params: [] },
        update: { 
            name: 'Update Ketersediaan Tempat Tidur', 
            params: [
                { key: 'kodekelas', label: 'Kode Kelas', type: 'text', required: true },
                { key: 'koderuang', label: 'Kode Ruang', type: 'text', required: true },
                { key: 'namaruang', label: 'Nama Ruang', type: 'text', required: true },
                { key: 'kapasitas', label: 'Kapasitas', type: 'number', required: true },
                { key: 'tersedia', label: 'Tersedia', type: 'number', required: true },
                { key: 'kodePpk', label: 'Kode PPK (opsional)', type: 'text', required: false }
            ]
        },
        create: { 
            name: 'Buat Ruangan Baru', 
            params: [
                { key: 'kodekelas', label: 'Kode Kelas', type: 'text', required: true },
                { key: 'koderuang', label: 'Kode Ruang', type: 'text', required: true },
                { key: 'namaruang', label: 'Nama Ruang', type: 'text', required: true },
                { key: 'kapasitas', label: 'Kapasitas', type: 'number', required: true },
                { key: 'tersedia', label: 'Tersedia', type: 'number', required: true },
                { key: 'kodePpk', label: 'Kode PPK (opsional)', type: 'text', required: false }
            ]
        },
        read: { 
            name: 'Ketersediaan Kamar Faskes', 
            params: [
                { key: 'start', label: 'Start (paging)', type: 'number', required: true, min: 1 },
                { key: 'limit', label: 'Limit (paging)', type: 'number', required: true, min: 1 },
                { key: 'kodePpk', label: 'Kode PPK (opsional)', type: 'text', required: false }
            ]
        },
        delete: { 
            name: 'Hapus Ruangan', 
            params: [
                { key: 'kodekelas', label: 'Kode Kelas', type: 'text', required: true },
                { key: 'koderuang', label: 'Kode Ruang', type: 'text', required: true },
                { key: 'kodePpk', label: 'Kode PPK (opsional)', type: 'text', required: false }
            ]
        }
    },
    vclaim: {
        peserta: {
            nomorKartu: { 
                name: 'Peserta - Nomor Kartu', 
                params: [
                    { key: 'nomor', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal SEP (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            nomorKependudukan: { 
                name: 'Peserta - NIK', 
                params: [
                    { key: 'nomor', label: 'NIK', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal SEP (YYYY-MM-DD)', type: 'date', required: true }
                ]
            }
        },
        referensi: {
            diagnosa: { 
                name: 'Referensi - Diagnosa', 
                params: [
                    { key: 'keyword', label: 'Keyword Diagnosa', type: 'text', required: true, placeholder: 'Minimal 3 karakter (contoh: A00, Diare, Demam)', minLength: 3 }
                ]
            },
            poli: { 
                name: 'Referensi - Poli', 
                params: [
                    { key: 'keyword', label: 'Keyword Poli', type: 'text', required: true }
                ]
            },
            faskes: { 
                name: 'Referensi - Faskes', 
                params: [
                    { key: 'keyword', label: 'Keyword Faskes', type: 'text', required: true },
                    { key: 'jenis', label: 'Jenis (1=FKTP, 2=FKRTL)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            dpjp: { 
                name: 'Referensi - DPJP', 
                params: [
                    { key: 'jenis', label: 'Jenis Pelayanan', type: 'select', required: true, options: [
                        { value: 1, label: '1. Rawat Inap' },
                        { value: 2, label: '2. Rawat Jalan' }
                    ]},
                    { key: 'tanggal', label: 'Tgl.Pelayanan/SEP (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'kode', label: 'Kode Spesialis/Subspesialis', type: 'text', required: true }
                ]
            },
            provinsi: { name: 'Referensi - Provinsi', params: [] },
            kabupaten: { 
                name: 'Referensi - Kabupaten', 
                params: [
                    { key: 'provinsi', label: 'Kode Provinsi', type: 'text', required: true }
                ]
            },
            kecamatan: { 
                name: 'Referensi - Kecamatan', 
                params: [
                    { key: 'kabupaten', label: 'Kode Kabupaten', type: 'text', required: true }
                ]
            },
            diagnosaPrb: {
                name: 'Referensi - Diagnosa PRB',
                params: []
            },
            obatPrb: {
                name: 'Referensi - Obat PRB',
                params: [
                    { key: 'nama', label: 'Nama Obat', type: 'text', required: true }
                ]
            },
            klaimProsedur: {
                name: 'Referensi - Prosedur (Klaim)',
                params: [
                    { key: 'keyword', label: 'Keyword Prosedur', type: 'text', required: true }
                ]
            },
            klaimKelasRawat: {
                name: 'Referensi - Kelas Rawat (Klaim)',
                params: []
            },
            klaimDokter: {
                name: 'Referensi - Dokter (Klaim)',
                params: [
                    { key: 'nama', label: 'Nama Dokter', type: 'text', required: true }
                ]
            },
            klaimSpesialistik: {
                name: 'Referensi - Spesialistik (Klaim)',
                params: []
            },
            klaimRuangRawat: {
                name: 'Referensi - Ruang Rawat (Klaim)',
                params: []
            },
            klaimCaraKeluar: {
                name: 'Referensi - Cara Keluar (Klaim)',
                params: []
            },
            klaimPaskaPulang: {
                name: 'Referensi - Paska Pulang (Klaim)',
                params: []
            }
        },
        sep: {
            insert: { 
                name: 'SEP - Insert v1.1', 
                params: [
                    { key: 'data', label: 'Data SEP v1.1 (JSON t_sep)', type: 'textarea', required: true, placeholder: 'Masukkan JSON t_sep sesuai dokumentasi v1.1' }
                ]
            },
            insertV2: {
                name: 'SEP - Insert v2.0',
                params: [
                    { key: 'data', label: 'Data SEP v2.0 (JSON t_sep)', type: 'textarea', required: true, placeholder: 'Masukkan JSON t_sep sesuai dokumentasi v2.0' }
                ]
            },
            update: {
                name: 'SEP - Update v1.1',
                params: [
                    { key: 'data', label: 'Data Update SEP v1.1 (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            updateV2: {
                name: 'SEP - Update v2.0',
                params: [
                    { key: 'data', label: 'Data Update SEP v2.0 (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            delete: {
                name: 'SEP - Delete v1.1',
                params: [
                    { key: 'data', label: 'Data Delete SEP v1.1 (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            deleteV2: {
                name: 'SEP - Delete v2.0',
                params: [
                    { key: 'data', label: 'Data Delete SEP v2.0 (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            cari: { 
                name: 'SEP - Detail by Nomor', 
                params: [
                    { key: 'nomor', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            cariByRujukan: { 
                name: 'SEP - Detail Terakhir by Rujukan', 
                params: [
                    { key: 'nomorRujukan', label: 'Nomor Rujukan', type: 'text', required: true }
                ]
            },
            suplesiJasaRaharja: {
                name: 'SEP - Suplesi Jasa Raharja',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'tanggalPelayanan', label: 'Tanggal Pelayanan (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            dataIndukKecelakaan: {
                name: 'SEP - Data Induk Kecelakaan',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true }
                ]
            },
            pengajuan: {
                name: 'SEP - Pengajuan',
                params: [
                    { key: 'data', label: 'Data Pengajuan SEP (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            approvalPengajuan: {
                name: 'SEP - Approval Pengajuan',
                params: [
                    { key: 'data', label: 'Data Approval SEP (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            listPersetujuan: {
                name: 'SEP - List Persetujuan',
                params: [
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true }
                ]
            },
            updateTanggalPulangV2: {
                name: 'SEP - Update Tanggal Pulang v2.0',
                params: [
                    { key: 'data', label: 'Data Update Tanggal Pulang (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            listTanggalPulang: {
                name: 'SEP - List Update Tanggal Pulang',
                params: [
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                    { key: 'filter', label: 'Filter (opsional)', type: 'text', required: false }
                ]
            },
            inacbg: {
                name: 'SEP - INACBG',
                params: [
                    { key: 'nomor', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            listInternal: {
                name: 'SEP - List Internal',
                params: [
                    { key: 'nomor', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            deleteInternal: {
                name: 'SEP - Delete Internal',
                params: [
                    { key: 'data', label: 'Data Delete SEP Internal (JSON t_sep)', type: 'textarea', required: true }
                ]
            },
            fingerPrint: {
                name: 'SEP - Status Fingerprint',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal Pelayanan (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            listFingerPrint: {
                name: 'SEP - List Fingerprint',
                params: [
                    { key: 'tanggal', label: 'Tanggal Pelayanan (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            listRandomQuestions: {
                name: 'SEP - List Random Question',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal SEP (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            sendRandomQuestionAnswers: {
                name: 'SEP - Kirim Jawaban Random Question',
                params: [
                    { key: 'data', label: 'Data Jawaban Random Question (JSON t_sep)', type: 'textarea', required: true }
                ]
            }
        },
        rujukan: {
            cariByNomor: {
                name: 'Rujukan - Cari by Nomor',
                params: [
                    { key: 'nomor', label: 'Nomor Rujukan', type: 'text', required: true },
                    { key: 'sumber', label: 'Sumber (1=FKTP,2=FKRTL)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            cariByNoka: {
                name: 'Rujukan - Cari by Nomor Kartu',
                params: [
                    { key: 'nomor', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'sumber', label: 'Sumber (1=FKTP,2=FKRTL)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            cariByNokaMulti: {
                name: 'Rujukan - Cari Multi by Nomor Kartu',
                params: [
                    { key: 'nomor', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'sumber', label: 'Sumber (1=FKTP,2=FKRTL)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            insert: {
                name: 'Rujukan - Insert',
                params: [
                    { key: 'data', label: 'Data Rujukan (JSON t_rujukan)', type: 'textarea', required: true }
                ]
            },
            update: {
                name: 'Rujukan - Update',
                params: [
                    { key: 'data', label: 'Data Update Rujukan (JSON t_rujukan)', type: 'textarea', required: true }
                ]
            },
            delete: {
                name: 'Rujukan - Delete',
                params: [
                    { key: 'data', label: 'Data Delete Rujukan (JSON t_rujukan)', type: 'textarea', required: true }
                ]
            },
            insertKhusus: {
                name: 'Rujukan Khusus - Insert',
                params: [
                    { key: 'data', label: 'Data Rujukan Khusus (JSON)', type: 'textarea', required: true }
                ]
            },
            deleteKhusus: {
                name: 'Rujukan Khusus - Delete',
                params: [
                    { key: 'data', label: 'Data Delete Rujukan Khusus (JSON)', type: 'textarea', required: true }
                ]
            },
            listKhusus: {
                name: 'Rujukan Khusus - List',
                params: [
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true }
                ]
            },
            insertV2: {
                name: 'Rujukan - Insert v2.0',
                params: [
                    { key: 'data', label: 'Data Rujukan v2.0 (JSON t_rujukan)', type: 'textarea', required: true }
                ]
            },
            updateV2: {
                name: 'Rujukan - Update v2.0',
                params: [
                    { key: 'data', label: 'Data Update Rujukan v2.0 (JSON t_rujukan)', type: 'textarea', required: true }
                ]
            },
            listSpesialistik: {
                name: 'Rujukan - List Spesialistik',
                params: [
                    { key: 'kodePpk', label: 'Kode PPK Rujukan', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal Rujukan (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            listSarana: {
                name: 'Rujukan - List Sarana',
                params: [
                    { key: 'kodePpk', label: 'Kode PPK Rujukan', type: 'text', required: true }
                ]
            },
            listKeluar: {
                name: 'Rujukan - List Keluar Faskes',
                params: [
                    { key: 'awal', label: 'Tgl Awal (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'akhir', label: 'Tgl Akhir (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            keluarByNomor: {
                name: 'Rujukan - Detail Keluar by Nomor',
                params: [
                    { key: 'nomor', label: 'Nomor Rujukan', type: 'text', required: true }
                ]
            },
            jumlahSep: {
                name: 'Rujukan - Jumlah SEP by Nomor Rujukan',
                params: [
                    { key: 'jenis', label: 'Jenis (1=FKTP,2=FKRTL)', type: 'number', required: true, min: 1, max: 2 },
                    { key: 'nomor', label: 'Nomor Rujukan', type: 'text', required: true }
                ]
            }
        },
        rencanaKontrol: {
            insert: {
                name: 'Rencana Kontrol - Insert',
                params: [
                    { key: 'data', label: 'Data Rencana Kontrol (JSON request)', type: 'textarea', required: true }
                ]
            },
            insertV2: {
                name: 'Rencana Kontrol - Insert v2',
                params: [
                    { key: 'data', label: 'Data Rencana Kontrol v2 (JSON request)', type: 'textarea', required: true }
                ]
            },
            update: {
                name: 'Rencana Kontrol - Update',
                params: [
                    { key: 'data', label: 'Data Update Rencana Kontrol (JSON request)', type: 'textarea', required: true }
                ]
            },
            updateV2: {
                name: 'Rencana Kontrol - Update v2',
                params: [
                    { key: 'data', label: 'Data Update Rencana Kontrol v2 (JSON request)', type: 'textarea', required: true }
                ]
            },
            delete: {
                name: 'Rencana Kontrol - Delete',
                params: [
                    { key: 'data', label: 'Data Delete Rencana Kontrol (JSON t_suratkontrol)', type: 'textarea', required: true }
                ]
            },
            insertSPRI: {
                name: 'Rencana Kontrol - Insert SPRI',
                params: [
                    { key: 'data', label: 'Data SPRI (JSON request)', type: 'textarea', required: true }
                ]
            },
            updateSPRI: {
                name: 'Rencana Kontrol - Update SPRI',
                params: [
                    { key: 'data', label: 'Data Update SPRI (JSON request)', type: 'textarea', required: true }
                ]
            },
            sep: {
                name: 'Rencana Kontrol - Data SEP',
                params: [
                    { key: 'nomor', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            cari: {
                name: 'Rencana Kontrol - Detail Surat Kontrol',
                params: [
                    { key: 'nomor', label: 'Nomor Surat Kontrol', type: 'text', required: true }
                ]
            },
            dataByNoka: {
                name: 'Rencana Kontrol - List by Nomor Kartu',
                params: [
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'filter', label: 'Filter (1=Tgl Entri,2=Tgl Rencana)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            dataByTanggal: {
                name: 'Rencana Kontrol - List by Tanggal',
                params: [
                    { key: 'awal', label: 'Tgl Awal (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'akhir', label: 'Tgl Akhir (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'filter', label: 'Filter (1=Tgl Entri,2=Tgl Rencana)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            poli: {
                name: 'Rencana Kontrol - Data Poli',
                params: [
                    { key: 'jenis', label: 'Jenis Kontrol (1=SPRI,2=Rencana Kontrol)', type: 'number', required: true, min: 1, max: 2 },
                    { key: 'nomor', label: 'Nomor Kartu / SEP', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal Rencana Kontrol (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            dokter: {
                name: 'Rencana Kontrol - Data Dokter',
                params: [
                    { key: 'jenis', label: 'Jenis Kontrol (1=SPRI,2=Rencana Kontrol)', type: 'number', required: true, min: 1, max: 2 },
                    { key: 'kodePoli', label: 'Kode Poli JKN', type: 'text', required: true },
                    { key: 'tanggal', label: 'Tanggal Rencana Kontrol (YYYY-MM-DD)', type: 'date', required: true }
                ]
            }
        },
        prb: {
            insert: {
                name: 'PRB - Insert',
                params: [
                    { key: 'data', label: 'Data PRB Insert (JSON t_prb)', type: 'textarea', required: true }
                ]
            },
            update: {
                name: 'PRB - Update',
                params: [
                    { key: 'data', label: 'Data PRB Update (JSON t_prb)', type: 'textarea', required: true }
                ]
            },
            delete: {
                name: 'PRB - Delete',
                params: [
                    { key: 'data', label: 'Data PRB Delete (JSON t_prb)', type: 'textarea', required: true }
                ]
            },
            cariByNomor: {
                name: 'PRB - Cari by Nomor SRB',
                params: [
                    { key: 'nomorSrb', label: 'Nomor SRB', type: 'text', required: true },
                    { key: 'nomorSep', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            cariByTanggal: {
                name: 'PRB - Cari by Tanggal SRB',
                params: [
                    { key: 'awal', label: 'Tgl Awal (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'akhir', label: 'Tgl Akhir (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            rekapPotensi: {
                name: 'PRB - Rekap Potensi',
                params: [
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 }
                ]
            }
        },
        monitoring: {
            kunjungan: {
                name: 'Monitoring - Data Kunjungan',
                params: [
                    { key: 'tanggal', label: 'Tanggal SEP (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'jenis', label: 'Jenis Pelayanan (1=RI,2=RJ)', type: 'number', required: true, min: 1, max: 2 }
                ]
            },
            klaim: {
                name: 'Monitoring - Data Klaim',
                params: [
                    { key: 'tanggal', label: 'Tanggal Pulang (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'jenis', label: 'Jenis Pelayanan (1=RI,2=RJ)', type: 'number', required: true, min: 1, max: 2 },
                    { key: 'status', label: 'Status (1=Proses,2=Pending,3=Klaim)', type: 'number', required: true, min: 1, max: 3 }
                ]
            },
            riwayatPelayanan: {
                name: 'Monitoring - Riwayat Pelayanan',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu', type: 'text', required: true },
                    { key: 'awal', label: 'Tgl Awal (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'akhir', label: 'Tgl Akhir (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            klaimJasaRaharja: {
                name: 'Monitoring - Klaim Jasa Raharja',
                params: [
                    { key: 'jenis', label: 'Jenis Pelayanan (1=RI,2=RJ)', type: 'number', required: true, min: 1, max: 2 },
                    { key: 'awal', label: 'Tgl Awal (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'akhir', label: 'Tgl Akhir (YYYY-MM-DD)', type: 'date', required: true }
                ]
            }
        },
        lpk: {
            insert: {
                name: 'LPK - Insert',
                params: [
                    { key: 'data', label: 'Data LPK Insert (JSON t_lpk)', type: 'textarea', required: true }
                ]
            },
            update: {
                name: 'LPK - Update',
                params: [
                    { key: 'data', label: 'Data LPK Update (JSON t_lpk)', type: 'textarea', required: true }
                ]
            },
            delete: {
                name: 'LPK - Delete',
                params: [
                    { key: 'nomorSep', label: 'Nomor SEP', type: 'text', required: true }
                ]
            },
            data: {
                name: 'LPK - Data Pengajuan Klaim',
                params: [
                    { key: 'tanggal', label: 'Tanggal Masuk (YYYY-MM-DD)', type: 'date', required: true },
                    { key: 'jenis', label: 'Jenis Pelayanan (1=RI,2=RJ)', type: 'number', required: true, min: 1, max: 2 }
                ]
            }
        }
    },
    apotek: {
        referensi: {
            dpho: {
                name: 'Referensi - DPHO',
                params: [] // GET /referensi/dpho
            },
            poli: {
                name: 'Referensi - Poli',
                params: [
                    {
                        key: 'keyword',
                        label: 'Kode / Nama Poli',
                        type: 'text',
                        required: true,
                        placeholder: 'Masukkan kode atau nama poli'
                    }
                ]
            },
            faskes: {
                name: 'Referensi - Faskes (PPK)',
                params: [
                    {
                        key: 'jenis',
                        label: 'Jenis Faskes',
                        type: 'select',
                        required: true,
                        options: [
                            { value: 1, label: '1. Faskes 1 (FKTP)' },
                            { value: 2, label: '2. Faskes 2 / RS (FKRTL)' }
                        ]
                    },
                    {
                        key: 'nama',
                        label: 'Nama Faskes',
                        type: 'text',
                        required: true,
                        placeholder: 'Masukkan nama faskes'
                    }
                ]
            },
            settingApotek: {
                name: 'Referensi - Setting Apotek',
                params: [
                    {
                        key: 'kodeApotek',
                        label: 'Kode Apotek',
                        type: 'text',
                        required: true,
                        placeholder: 'Masukkan kode apotek'
                    }
                ]
            },
            spesialistik: {
                name: 'Referensi - Spesialistik',
                params: [] // GET /referensi/spesialistik
            },
            obat: {
                name: 'Referensi - Obat',
                params: [
                    {
                        key: 'jenis',
                        label: 'Kode Jenis Obat',
                        type: 'text',
                        required: true
                    },
                    {
                        key: 'tanggal',
                        label: 'Tanggal Resep (YYYY-MM-DD)',
                        type: 'date',
                        required: true
                    },
                    {
                        key: 'filter',
                        label: 'Filter Pencarian (Nama Obat)',
                        type: 'text',
                        required: false,
                        placeholder: 'Opsional, penggalan nama obat'
                    }
                ]
            }
        },
        obat: {
            saveNonRacikan: { 
                name: 'Obat - Simpan Non Racikan', 
                params: [
                    { key: 'data', label: 'Data Obat (JSON)', type: 'textarea', required: true }
                ]
            },
            saveRacikan: { 
                name: 'Obat - Simpan Racikan', 
                params: [
                    { key: 'data', label: 'Data Racikan (JSON)', type: 'textarea', required: true }
                ]
            },
            updateStok: {
                name: 'Obat - Update Stok',
                params: [
                    {
                        key: 'KDOBAT',
                        label: 'KDOBAT',
                        type: 'text',
                        required: true,
                        placeholder: 'Contoh: 11250805294'
                    },
                    {
                        key: 'STOK',
                        label: 'STOK',
                        type: 'number',
                        required: true,
                        placeholder: 'Contoh: 100'
                    }
                ]
            }
        },
        pelayananObat: {
            daftar: {
                name: 'Pelayanan Obat - Daftar Pelayanan',
                params: [
                    {
                        key: 'nomorSep',
                        label: 'Nomor SEP Resep',
                        type: 'text',
                        required: true
                    }
                ]
            },
            riwayat: {
                name: 'Pelayanan Obat - Riwayat',
                params: [
                    {
                        key: 'awal',
                        label: 'Tgl Awal (YYYY-MM-DD)',
                        type: 'date',
                        required: true
                    },
                    {
                        key: 'akhir',
                        label: 'Tgl Akhir (YYYY-MM-DD)',
                        type: 'date',
                        required: true
                    },
                    {
                        key: 'nomorKartu',
                        label: 'Nomor Kartu Peserta',
                        type: 'text',
                        required: true
                    }
                ]
            },
            hapus: {
                name: 'Pelayanan Obat - Hapus',
                params: [
                    { key: 'nosepapotek', label: 'No SEP Apotek', type: 'text', required: true },
                    { key: 'noresep', label: 'No Resep', type: 'text', required: true },
                    { key: 'kodeobat', label: 'Kode Obat', type: 'text', required: true },
                    { key: 'tipeobat', label: 'Tipe Obat', type: 'text', required: true }
                ]
            }
        },
        resep: {
            simpan: {
                name: 'Resep - Simpan',
                params: [
                    {
                        key: 'data',
                        label: 'Data Resep (JSON)',
                        type: 'textarea',
                        required: true,
                        placeholder: 'Isi sesuai struktur body simpan resep Apotek'
                    }
                ]
            },
            hapus: {
                name: 'Resep - Hapus',
                params: [
                    { key: 'nosjp', label: 'No SEP Resep (nosjp)', type: 'text', required: true },
                    { key: 'refasalsjp', label: 'No SEP Kunjungan (refasalsjp)', type: 'text', required: true },
                    { key: 'noresep', label: 'No Resep', type: 'text', required: true }
                ]
            },
            daftar: {
                name: 'Resep - Daftar',
                params: [
                    { key: 'kdppk', label: 'Kode PPK', type: 'text', required: true },
                    { key: 'KdJnsObat', label: 'Kode Jenis Obat', type: 'text', required: true },
                    {
                        key: 'JnsTgl',
                        label: 'Jenis Tanggal (TGLPELSJP/TGLRSP)',
                        type: 'text',
                        required: true
                    },
                    {
                        key: 'TglMulai',
                        label: 'Tgl Mulai (YYYY-MM-DD HH:mm:ss)',
                        type: 'text',
                        required: true
                    },
                    {
                        key: 'TglAkhir',
                        label: 'Tgl Akhir (YYYY-MM-DD HH:mm:ss)',
                        type: 'text',
                        required: true
                    }
                ]
            }
        },
        sep: {
            kunjungan: {
                name: 'SEP - Data Kunjungan',
                params: [
                    { key: 'nomorSep', label: 'Nomor SEP', type: 'text', required: true }
                ]
            }
        },
        monitoring: {
            dataKlaim: {
                name: 'Monitoring - Data Klaim Resep',
                params: [
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                    {
                        key: 'jenisObat',
                        label: 'Jenis Obat (0=Semua,1=PRB,2=Kronis,3=Kemo)',
                        type: 'number',
                        required: true
                    },
                    {
                        key: 'status',
                        label: 'Status Klaim (0=Belum Verif,1=Sudah Verif)',
                        type: 'number',
                        required: true
                    }
                ]
            }
        },
        prb: {
            rekapPeserta: {
                name: 'PRB - Rekap Peserta',
                params: [
                    { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                    { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 }
                ]
            }
        }
    },
    pcare: {
        peserta: {
            nomorKartu: {
                name: 'PCare - Peserta by Nomor Kartu',
                params: [
                    { key: 'nomor', label: 'Nomor Kartu BPJS', type: 'text', required: true, placeholder: 'Contoh: 0002052561161' }
                ]
            },
            nomorKependudukan: {
                name: 'PCare - Peserta by NIK',
                params: [
                    { key: 'nomor', label: 'Nomor Induk Kependudukan (NIK)', type: 'text', required: true, placeholder: 'Contoh: 3201010101010001' }
                ]
            }
        },
        diagnosa: {
            index: {
                name: 'PCare - Get Diagnosa',
                params: [
                    { key: 'keyword', label: 'Kode atau Nama Diagnosa', type: 'text', required: true, placeholder: 'Contoh: A00 atau Diare' },
                    { key: 'start', label: 'Start (Row data awal)', type: 'number', required: true, min: 0, placeholder: '0' },
                    { key: 'limit', label: 'Limit (Jumlah data)', type: 'number', required: true, min: 1, placeholder: '10' }
                ]
            }
        },
        kunjungan: {
            rujukan: {
                name: 'PCare - Get Rujukan',
                params: [
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: 'Contoh: 0114U1630316Y000003' }
                ]
            },
            peserta: {
                name: 'PCare - Get Riwayat Kunjungan',
                params: [
                    { key: 'nomorKartu', label: 'Nomor Kartu Peserta', type: 'text', required: true, placeholder: 'Contoh: 0000029247423' }
                ]
            },
            add: {
                name: 'PCare - Add Kunjungan',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"noKartu":"...","tglDaftar":"...","kdPoli":"...","keluhan":"...","kdSadar":"01",...}' }
                ]
            },
            edit: {
                name: 'PCare - Edit Kunjungan',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"noKunjungan":"...","noKartu":"...","keluhan":"...",...}' }
                ]
            },
            delete: {
                name: 'PCare - Delete Kunjungan',
                params: [
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: 'Contoh: 011200210322Y000012' }
                ]
            }
        },
        rujukan: {
            tanggal: {
                name: 'PCare - Rujukan by Tanggal',
                params: [
                    { key: 'tanggal', label: 'Tanggal Rujukan (YYYY-MM-DD)', type: 'date', required: true }
                ]
            },
            nomorKartu: {
                name: 'PCare - Rujukan by Nomor Kartu',
                params: [
                    { key: 'nomor', label: 'Nomor Kartu BPJS', type: 'text', required: true, placeholder: 'Contoh: 0002052561161' }
                ]
            },
            nomorRujukan: {
                name: 'PCare - Rujukan by Nomor Rujukan',
                params: [
                    { key: 'nomor', label: 'Nomor Rujukan', type: 'text', required: true, placeholder: 'Contoh: R123456' }
                ]
            }
        },
        obat: {
            dpho: {
                name: 'PCare - Get DPHO',
                params: [
                    { key: 'kodeNama', label: 'Kode atau Nama DPHO', type: 'text', required: true, placeholder: 'Contoh: 130199999 atau Kapsul' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            dphoByKdppk: {
                name: 'PCare - Get DPHO by KDPPK',
                params: [
                    { key: 'kdPPK', label: 'Kode PPK Apotek Tujuan', type: 'text', required: true, placeholder: '0114U163' },
                    { key: 'namaObat', label: 'Nama Obat', type: 'text', required: true, placeholder: 'Akarbose' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            kunjungan: {
                name: 'PCare - Get Obat by Kunjungan',
                params: [
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: '1301U0070815Y000004' }
                ]
            },
            add: {
                name: 'PCare - Add Obat',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdObatSK":0,"noKunjungan":"...","racikan":true,...}' }
                ]
            },
            delete: {
                name: 'PCare - Delete Obat',
                params: [
                    { key: 'kodeObatSK', label: 'Kode Obat SK', type: 'number', required: true, placeholder: '38' },
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: '1301U0070815Y000004' }
                ]
            }
        },
        tindakan: {
            kunjungan: {
                name: 'PCare - Get Tindakan by Kunjungan',
                params: [
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: '1301U0070815Y000005' }
                ]
            },
            kdTkp: {
                name: 'PCare - Get Referensi Tindakan',
                params: [
                    { key: 'kdTkp', label: 'Kode TKP (10:RJTP, 20:RITP, 50:Promotif)', type: 'select', required: true, options: ['10', '20', '50'] },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            add: {
                name: 'PCare - Add Tindakan',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdTindakanSK":0,"noKunjungan":"...","kdTindakan":"...",...}' }
                ]
            },
            edit: {
                name: 'PCare - Edit Tindakan',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdTindakanSK":218,"noKunjungan":"...","kdTindakan":"...",...}' }
                ]
            },
            delete: {
                name: 'PCare - Delete Tindakan',
                params: [
                    { key: 'kdTindakanSK', label: 'Kode Tindakan SK', type: 'number', required: true, placeholder: '199' },
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: '1301U0070815Y000005' }
                ]
            }
        },
        dokter: {
            index: {
                name: 'PCare - Get Dokter',
                params: [
                    { key: 'start', label: 'Row data awal (Parameter 1)', type: 'number', required: true, placeholder: '0', min: 0 },
                    { key: 'limit', label: 'Limit jumlah data (Parameter 2)', type: 'number', required: true, placeholder: '10', min: 1 }
                ]
            }
        },
        kelompok: {
            club: {
                name: 'PCare - Get Club Prolanis',
                params: [
                    { key: 'kodeJenisKelompok', label: 'Kode Jenis Kelompok (01: DM, 02: Hipertensi)', type: 'text', required: true, placeholder: '01 atau 02' }
                ]
            },
            kegiatan: {
                name: 'PCare - Get Kegiatan Kelompok',
                params: [
                    { key: 'bulan', label: 'Bulan (dd-mm-yyyy)', type: 'text', required: true, placeholder: 'Contoh: 30-01-2016' }
                ]
            },
            peserta: {
                name: 'PCare - Get Peserta Kegiatan Kelompok',
                params: [
                    { key: 'eduId', label: 'Edu ID', type: 'text', required: true, placeholder: 'Contoh: 16010000003' }
                ]
            },
            addKegiatan: {
                name: 'PCare - Add Kegiatan Kelompok',
                params: [
                    { key: 'eduId', label: 'Edu ID (opsional)', type: 'text', required: false },
                    { key: 'clubId', label: 'Club ID', type: 'number', required: true },
                    { key: 'tglPelayanan', label: 'Tgl Pelayanan (dd-mm-yyyy)', type: 'text', required: true, placeholder: '27-03-2016' },
                    { key: 'kdKegiatan', label: 'Kode Kegiatan', type: 'text', required: true, placeholder: '01' },
                    { key: 'kdKelompok', label: 'Kode Kelompok', type: 'text', required: true, placeholder: '03' },
                    { key: 'materi', label: 'Materi', type: 'text', required: true },
                    { key: 'pembicara', label: 'Pembicara', type: 'text', required: true },
                    { key: 'lokasi', label: 'Lokasi', type: 'text', required: true },
                    { key: 'keterangan', label: 'Keterangan', type: 'text', required: true },
                    { key: 'biaya', label: 'Biaya', type: 'number', required: true }
                ]
            },
            addPeserta: {
                name: 'PCare - Add Peserta Kegiatan Kelompok',
                params: [
                    { key: 'eduId', label: 'Edu ID', type: 'text', required: true, placeholder: '16030000009' },
                    { key: 'noKartu', label: 'Nomor Kartu', type: 'text', required: true, placeholder: '0001101615759' }
                ]
            },
            deleteKegiatan: {
                name: 'PCare - Delete Kegiatan Kelompok',
                params: [
                    { key: 'eduId', label: 'Edu ID', type: 'text', required: true, placeholder: '16010000003' }
                ]
            },
            deletePeserta: {
                name: 'PCare - Delete Peserta Kegiatan Kelompok',
                params: [
                    { key: 'eduId', label: 'Edu ID', type: 'text', required: true },
                    { key: 'noKartu', label: 'Nomor Kartu Peserta', type: 'text', required: true }
                ]
            }
        },
        kesadaran: {
            index: {
                name: 'PCare - Get Kesadaran',
                params: []
            }
        },
        mcu: {
            kunjungan: {
                name: 'PCare - Get MCU',
                params: [
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: 'Contoh: 0114U1630316Y000003' }
                ]
            },
            add: {
                name: 'PCare - Add MCU',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdMCU":0,"noKunjungan":"...","kdProvider":"...","tglPelayanan":"...",...}' }
                ]
            },
            edit: {
                name: 'PCare - Edit MCU',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdMCU":44,"noKunjungan":"...","kdProvider":"...",...}' }
                ]
            },
            delete: {
                name: 'PCare - Delete MCU',
                params: [
                    { key: 'kdMCU', label: 'Kode MCU', type: 'number', required: true, placeholder: '43' },
                    { key: 'nomorKunjungan', label: 'Nomor Kunjungan', type: 'text', required: true, placeholder: '0114U1630316Y000003' }
                ]
            }
        },
        pendaftaran: {
            noUrut: {
                name: 'PCare - Get Pendaftaran by Nomor Urut',
                params: [
                    { key: 'noUrut', label: 'Nomor Urut Pendaftaran', type: 'text', required: true, placeholder: 'A1' },
                    { key: 'tglDaftar', label: 'Tanggal Pendaftaran', type: 'text', required: true, placeholder: '13-08-2015' }
                ]
            },
            tglDaftar: {
                name: 'PCare - Get Pendaftaran Provider',
                params: [
                    { key: 'tglDaftar', label: 'Tanggal Pendaftaran', type: 'text', required: true, placeholder: '15-05-2018' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            add: {
                name: 'PCare - Add Pendaftaran',
                params: [
                    { key: 'request', label: 'Request Body (JSON)', type: 'textarea', required: true, placeholder: '{"kdProviderPeserta":"...","tglDaftar":"...","noKartu":"...",...}' }
                ]
            },
            delete: {
                name: 'PCare - Delete Pendaftaran',
                params: [
                    { key: 'noKartu', label: 'Nomor Kartu Peserta', type: 'text', required: true, placeholder: '0001113569638' },
                    { key: 'tglDaftar', label: 'Tanggal Pendaftaran', type: 'text', required: true, placeholder: '12-08-2015' },
                    { key: 'noUrut', label: 'Nomor Urut Pendaftaran', type: 'text', required: true, placeholder: 'A1' },
                    { key: 'kdPoli', label: 'Kode Poli', type: 'text', required: true, placeholder: '001' }
                ]
            }
        },
        poli: {
            fktp: {
                name: 'PCare - Get Poli FKTP',
                params: [
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            }
        },
        provider: {
            index: {
                name: 'PCare - Get Provider Rayonisasi',
                params: [
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            }
        },
        spesialis: {
            index: {
                name: 'PCare - Get Referensi Spesialis',
                params: []
            },
            subSpesialis: {
                name: 'PCare - Get Referensi Sub Spesialis',
                params: [
                    { key: 'kdSpesialis', label: 'Kode Spesialis', type: 'text', required: true, placeholder: 'ANA' }
                ]
            },
            sarana: {
                name: 'PCare - Get Referensi Sarana',
                params: []
            },
            khusus: {
                name: 'PCare - Get Referensi Khusus',
                params: []
            },
            rujukSubSpesialis: {
                name: 'PCare - Get Faskes Rujukan Sub Spesialis',
                params: [
                    { key: 'kdSubSpesialis', label: 'Kode Sub Spesialis', type: 'text', required: true, placeholder: '26' },
                    { key: 'kdSarana', label: 'Kode Sarana', type: 'text', required: true, placeholder: '1' },
                    { key: 'tglEstRujuk', label: 'Tanggal Estimasi Rujuk (dd-mm-yyyy)', type: 'text', required: true, placeholder: '27-01-2026' }
                ]
            },
            rujukKhusus: {
                name: 'PCare - Get Faskes Rujukan Khusus (IGD,HDL,JIW,KLT,PAR,KEM,RAT,HIV)',
                params: [
                    { key: 'kdKhusus', label: 'Kode Khusus', type: 'text', required: true, placeholder: 'HDL (IGD,HDL,JIW,KLT,PAR,KEM,RAT,HIV)' },
                    { key: 'noKartu', label: 'Nomor Kartu Peserta', type: 'text', required: true, placeholder: '0001113569638' },
                    { key: 'tglEstRujuk', label: 'Tanggal Estimasi Rujuk (dd-mm-yyyy)', type: 'text', required: true, placeholder: '27-01-2026' }
                ]
            },
            rujukKhususThaHem: {
                name: 'PCare - Get Faskes Rujukan Khusus (THA,HEM)',
                params: [
                    { key: 'kdKhusus', label: 'Kode Khusus', type: 'text', required: true, placeholder: 'THA (THA atau HEM)' },
                    { key: 'kdSubSpesialis', label: 'Kode Sub Spesialis', type: 'text', required: true, placeholder: '3' },
                    { key: 'noKartu', label: 'Nomor Kartu Peserta', type: 'text', required: true, placeholder: '0001113569638' },
                    { key: 'tglEstRujuk', label: 'Tanggal Estimasi Rujuk (dd-mm-yyyy)', type: 'text', required: true, placeholder: '27-01-2026' }
                ]
            }
        },
        statusPulang: {
            rawatInap: {
                name: 'PCare - Get Status Pulang',
                params: [
                    { key: 'rawatInap', label: 'Rawat Inap (true/false)', type: 'select', required: true, options: ['true', 'false'] }
                ]
            }
        },
        alergi: {
            jenis: {
                name: 'PCare - Get Data Alergi',
                params: [
                    { key: 'jenis', label: 'Jenis Alergi (01:Makanan, 02:Udara, 03:Obat)', type: 'select', required: true, options: ['01', '02', '03'] }
                ]
            }
        },
        prognosa: {
            index: {
                name: 'PCare - Get Prognosa',
                params: []
            }
        },
        skrinning: {
            rekap: {
                name: 'PCare - Get Skrining Riwayat Kesehatan by Penyakit',
                params: []
            },
            peserta: {
                name: 'PCare - Get Detail Peserta Skrining Riwayat Kesehatan',
                params: [
                    { key: 'nomorNama', label: 'Nomor atau Nama Peserta', type: 'text', required: true, placeholder: '0000127207697 atau A SITI' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            prolanisDm: {
                name: 'PCare - Get Data Prolanis Diabetes Mellitus',
                params: [
                    { key: 'nomorNama', label: 'Nomor atau Nama Peserta', type: 'text', required: true, placeholder: '0001222114487 atau ABDUL' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            },
            prolanisHt: {
                name: 'PCare - Get Data Prolanis Hipertensi',
                params: [
                    { key: 'nomorNama', label: 'Nomor atau Nama Peserta', type: 'text', required: true, placeholder: '0001222114487 atau ABDUL' },
                    { key: 'start', label: 'Row data awal', type: 'number', required: true, placeholder: '0' },
                    { key: 'limit', label: 'Limit jumlah data', type: 'number', required: true, placeholder: '10' }
                ]
            }
        }
    },
    icare: {
        fkrtl: { 
            name: 'ICare - FKRTL', 
            params: [
                { key: 'param', label: 'Nomor Kartu Peserta', type: 'text', required: true },
                { key: 'kodedokter', label: 'Kode Dokter', type: 'number', required: true }
            ]
        },
        fktp: { 
            name: 'ICare - FKTP', 
            params: [
                { key: 'param', label: 'Nomor Kartu Peserta', type: 'text', required: true }
            ]
        }
    },
    rekamMedis: {
        insert: { 
            name: 'Insert Rekam Medis', 
            params: [
                { key: 'nomorSEP', label: 'Nomor SEP', type: 'text', required: true },
                { key: 'jenisPelayanan', label: 'Jenis Pelayanan', type: 'select', required: true, options: ['1', '2'] },
                { key: 'bulan', label: 'Bulan (1-12)', type: 'number', required: true, min: 1, max: 12 },
                { key: 'tahun', label: 'Tahun', type: 'number', required: true },
                { key: 'dataRekamMedis', label: 'Data Rekam Medis (JSON Bundle)', type: 'textarea', required: true, placeholder: 'Masukkan JSON Bundle FHIR' }
            ]
        }
    }
};

// Initialize - for index.html (testing page)
// Check authentication status
async function checkAuth() {
    try {
        const response = await fetch('/api/auth/status', {
            credentials: 'include'
        });
        const result = await response.json();
        if (!result.success || !result.authenticated) {
            window.location.href = '/login.html';
            return false;
        }
        return true;
    } catch (error) {
        window.location.href = '/login.html';
        return false;
    }
}

// Logout function
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            window.location.href = '/login.html';
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/login.html';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication first
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        return; // Will redirect to login
    }
    
    // Only initialize if we're on the testing page (index.html)
    if (document.getElementById('testingContent')) {
        try {
            setupEventListeners();
            
            // Force show main content
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.style.display = 'flex';
                mainContent.style.visibility = 'visible';
                mainContent.style.opacity = '1';
            }
            
            // Force show sections
            const testingPanel = document.querySelector('.testing-panel');
            const responsePanel = document.getElementById('responsePanel');
            if (testingPanel) {
                testingPanel.style.display = 'flex';
                testingPanel.style.visibility = 'visible';
                testingPanel.style.opacity = '1';
            }
            if (responsePanel) {
                responsePanel.style.display = 'flex';
                responsePanel.style.visibility = 'visible';
                responsePanel.style.opacity = '1';
            }
            
            // Load configs after a small delay to ensure all elements are ready
            setTimeout(() => {
                loadConfigList();
                loadCurrentConfig();
                // Restore form state (module, submodule, endpoint selection)
                restoreFormState();
            }, 100);
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }
});

function setupEventListeners() {
    const configForm = document.getElementById('configForm');
    if (configForm) {
        configForm.addEventListener('submit', saveConfig);
    }
}

function switchTab(tab) {
    try {
        // Get all tab contents
        const testingContent = document.getElementById('tabContentTesting');
        const configContent = document.getElementById('tabContentConfig');
        const testingTab = document.getElementById('tabTesting');
        const configTab = document.getElementById('tabConfig');
        
        // Remove active class from all tabs
        if (testingTab) testingTab.classList.remove('active');
        if (configTab) configTab.classList.remove('active');
        
        // Hide all tab contents first
        if (testingContent) {
            testingContent.style.display = 'none';
            testingContent.style.visibility = '';
            testingContent.style.opacity = '';
        }
        if (configContent) {
            configContent.style.display = 'none';
            configContent.style.visibility = '';
            configContent.style.opacity = '';
        }
        
        // Show selected tab content
        if (tab === 'testing') {
            if (testingContent) {
                testingContent.style.display = 'block';
                testingContent.style.visibility = 'visible';
                testingContent.style.opacity = '1';
                // Ensure main-content inside is visible
                const mainContent = testingContent.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.display = 'flex';
                    mainContent.style.visibility = 'visible';
                    mainContent.style.opacity = '1';
                }
                // Ensure panels are visible
                const testingPanel = testingContent.querySelector('.testing-panel');
                const responsePanel = testingContent.querySelector('.response-panel');
                if (testingPanel) {
                    testingPanel.style.display = 'flex';
                    testingPanel.style.visibility = 'visible';
                    testingPanel.style.opacity = '1';
                }
                if (responsePanel) {
                    responsePanel.style.display = 'flex';
                    responsePanel.style.visibility = 'visible';
                    responsePanel.style.opacity = '1';
                }
            }
            if (testingTab) testingTab.classList.add('active');
        } else if (tab === 'config') {
            if (configContent) {
                configContent.style.display = 'block';
                configContent.style.visibility = 'visible';
                configContent.style.opacity = '1';
            }
            if (configTab) configTab.classList.add('active');
        }
    } catch (error) {
        console.error('Error switching tab:', error);
    }
}

function toggleRawJson() {
    const isRaw = document.getElementById('rawJsonToggle').checked;
    const formattedView = document.getElementById('responseFormatted');
    const rawView = document.getElementById('responseRaw');
    
    if (isRaw) {
        formattedView.style.display = 'none';
        rawView.style.display = 'block';
        // Update raw content if needed
        updateRawJson();
    } else {
        formattedView.style.display = 'block';
        rawView.style.display = 'none';
    }
}

function updateRawJson() {
    const rawContent = document.getElementById('responseRawContent');
    
    // Use stored data if available
    if (window.lastResponseData) {
        rawContent.textContent = JSON.stringify(window.lastResponseData, null, 2);
    } else {
        // Try to extract from formatted view
        const formattedContent = document.getElementById('responseContent');
        if (formattedContent.innerHTML) {
            const text = formattedContent.textContent || formattedContent.innerText;
            rawContent.textContent = text;
        } else {
            rawContent.textContent = '';
        }
    }
}

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// API functions for config management
async function getAllConfigs() {
    try {
        const response = await fetch('/api/configs');
        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        return [];
    } catch (error) {
        console.error('Error loading configs:', error);
        return [];
    }
}

async function getConfigById(id) {
    try {
        const response = await fetch(`/api/configs/${id}`);
        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        return null;
    } catch (error) {
        console.error('Error loading config:', error);
        return null;
    }
}

async function saveConfigToDB(config) {
    try {
        const url = config.id ? `/api/configs/${config.id}` : '/api/configs';
        const method = config.id ? 'PUT' : 'POST';
        
        // Remove id from payload for POST
        const payload = { ...config };
        if (method === 'POST') {
            delete payload.id;
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        if (result.success) {
            return result.data;
        }
        throw new Error(result.error || 'Failed to save config');
    } catch (error) {
        console.error('Error saving config:', error);
        throw error;
    }
}

async function deleteConfigFromDB(id) {
    try {
        const response = await fetch(`/api/configs/${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error deleting config:', error);
        return false;
    }
}

function getCurrentConfigId() {
    const saved = localStorage.getItem(CURRENT_CONFIG_KEY);
    return saved ? parseInt(saved) : null;
}

function setCurrentConfigId(id) {
    if (id) {
        localStorage.setItem(CURRENT_CONFIG_KEY, id.toString());
    } else {
        localStorage.removeItem(CURRENT_CONFIG_KEY);
    }
}

async function saveConfig(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const config = {};
    for (const [key, value] of formData.entries()) {
        config[key] = value;
    }
    
    const configId = document.getElementById('configId').value;
    if (configId) {
        config.id = parseInt(configId);
    }
    
    try {
        const savedConfig = await saveConfigToDB(config);
        await loadConfigList();
        resetConfigForm();
        alert('Konfigurasi berhasil disimpan!');
    } catch (error) {
        alert(`Error menyimpan konfigurasi: ${error.message}`);
    }
}

async function loadConfigList() {
    const configs = await getAllConfigs();
    const listContainer = document.getElementById('configList');
    if (!listContainer) return; // Element belum ada, skip
    
    listContainer.innerHTML = '';
    
    if (configs.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">Belum ada konfigurasi</p>';
        await updateConfigSelect(); // Update select even if no configs
        return;
    }
    
    configs.forEach(config => {
        const div = document.createElement('div');
        div.className = 'config-item';
        div.style.cssText = 'padding: 12px; margin-bottom: 10px; background: var(--bg-color); border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;';
        div.onmouseover = () => div.style.borderColor = 'var(--primary-color)';
        div.onmouseout = () => div.style.borderColor = 'transparent';
        div.onclick = () => editConfig(config.id);
        
        const currentId = getCurrentConfigId();
        if (currentId === config.id) {
            div.style.borderColor = 'var(--primary-color)';
            div.style.background = '#eff6ff';
        }
        
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <strong style="display: block; margin-bottom: 4px;">${config.namaRS || 'Unnamed'}</strong>
                    <small style="color: var(--text-muted);">
                        ${config.mode === 'production' ? '🔴 Production' : '🟢 Development'}
                    </small>
                </div>
                <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.75rem;" onclick="event.stopPropagation(); deleteConfigById(${config.id})">🗑️</button>
            </div>
        `;
        listContainer.appendChild(div);
    });
    
    // Update select dropdown
    await updateConfigSelect();
}

async function updateConfigSelect() {
    const configs = await getAllConfigs();
    const select = document.getElementById('configSelect');
    if (!select) return; // Element belum ada, skip
    
    const currentId = getCurrentConfigId();
    
    select.innerHTML = '<option value="">-- Pilih RS --</option>';
    configs.forEach(config => {
        const option = document.createElement('option');
        option.value = config.id;
        option.textContent = `${config.namaRS || 'Unnamed'} (${config.mode === 'production' ? 'Production' : 'Development'})`;
        if (config.id === currentId) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

async function editConfig(id) {
    const config = await getConfigById(id);
    if (!config) return;
    
    // Populate form
    for (const [key, value] of Object.entries(config)) {
        const input = document.getElementById(key);
        if (input) input.value = value || '';
    }
    
    // Set configId untuk edit mode (penting untuk membedakan create vs update)
    document.getElementById('configId').value = config.id || '';
    
    document.getElementById('deleteConfigBtn').style.display = 'block';
}

function showAddConfigForm() {
    resetConfigForm();
}

function resetConfigForm() {
    document.getElementById('configForm').reset();
    document.getElementById('configId').value = '';
    document.getElementById('deleteConfigBtn').style.display = 'none';
}

function deleteConfig() {
    const configId = document.getElementById('configId').value;
    if (!configId) return;
    deleteConfigById(configId);
}

async function deleteConfigById(id) {
    if (!confirm('Yakin ingin menghapus konfigurasi ini?')) return;
    
    const success = await deleteConfigFromDB(id);
    if (!success) {
        alert('Gagal menghapus konfigurasi!');
        return;
    }
    
    if (getCurrentConfigId() === id) {
        setCurrentConfigId(null);
        await updateConfigSelect();
    }
    
    await loadConfigList();
    resetConfigForm();
    alert('Konfigurasi telah dihapus!');
}

async function onConfigSelect() {
    const select = document.getElementById('configSelect');
    const configId = select.value ? parseInt(select.value) : null;
    setCurrentConfigId(configId);
    await loadConfigList(); // Refresh to show current selection
}

async function loadCurrentConfig() {
    const currentId = getCurrentConfigId();
    const select = document.getElementById('configSelect');
    if (!select) {
        // Element belum ada, coba lagi setelah sedikit delay
        setTimeout(loadCurrentConfig, 100);
        return;
    }
    
    if (currentId) {
        const config = await getConfigById(currentId);
        if (config) {
            select.value = currentId;
        }
    }
    await updateConfigSelect();
}

function saveFormState() {
    const state = {
        module: document.getElementById('moduleSelect')?.value || '',
        submodule: document.getElementById('submoduleSelect')?.value || '',
        endpoint: document.getElementById('endpointSelect')?.value || ''
    };
    localStorage.setItem(FORM_STATE_KEY, JSON.stringify(state));
}

function getFormState() {
    const saved = localStorage.getItem(FORM_STATE_KEY);
    return saved ? JSON.parse(saved) : null;
}

function restoreFormState() {
    const state = getFormState();
    if (!state || !state.module) return;
    
    // Restore module selection
    const moduleSelect = document.getElementById('moduleSelect');
    if (!moduleSelect || !state.module) return;
    
    moduleSelect.value = state.module;
    
    // Manually populate dropdowns without calling onModuleChange (which saves state)
    setTimeout(() => {
        const module = state.module;
        const submoduleGroup = document.getElementById('submoduleGroup');
        const endpointGroup = document.getElementById('endpointGroup');
        const paramsContainer = document.getElementById('paramsContainer');
        const testActions = document.getElementById('testActions');
        
        // Reset
        document.getElementById('submoduleSelect').innerHTML = '<option value="">-- Pilih Submodul --</option>';
        document.getElementById('endpointSelect').innerHTML = '<option value="">-- Pilih Endpoint --</option>';
        paramsContainer.style.display = 'none';
        testActions.style.display = 'none';
        
        const moduleEndpoints = endpoints[module];
        if (!moduleEndpoints) return;
        
        // Deteksi otomatis apakah modul punya submodul
        const hasSubmodules = hasModuleSubmodules(moduleEndpoints);
        
        if (hasSubmodules) {
            submoduleGroup.style.display = 'block';
            const submodules = Object.keys(moduleEndpoints);
            const select = document.getElementById('submoduleSelect');
            submodules.forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
                select.appendChild(option);
            });
            
            // Restore submodule selection if exists
            if (state.submodule && select.querySelector(`option[value="${state.submodule}"]`)) {
                setTimeout(() => {
                    select.value = state.submodule;
                    endpointGroup.style.display = 'block';
                    // Pass endpoint value to populateEndpoints to restore it
                    populateEndpoints(module, state.submodule, state.endpoint);
                }, 100);
            }
        } else {
            submoduleGroup.style.display = 'none';
            endpointGroup.style.display = 'block';
            // Pass endpoint value to populateEndpoints to restore it
            populateEndpoints(module, null, state.endpoint);
        }
    }, 100);
}

async function exportConfigs() {
    const configs = await getAllConfigs();
    if (configs.length === 0) {
        alert('Tidak ada konfigurasi untuk di-export!');
        return;
    }
    
    const dataStr = JSON.stringify(configs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jkn-configs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('Konfigurasi berhasil di-export!');
}

function importConfigs() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('Format file tidak valid. Harus berupa array.');
                }
                
                // Validate structure
                const valid = imported.every(config => 
                    config.namaRS && config.mode && config.consId && config.consSecret
                );
                
                if (!valid) {
                    throw new Error('Format konfigurasi tidak valid. Pastikan semua field required ada.');
                }
                
                if (confirm(`Yakin ingin mengimport ${imported.length} konfigurasi? Konfigurasi yang sudah ada akan digabungkan.`)) {
                    const existing = await getAllConfigs();
                    
                    // Import each config
                    let importedCount = 0;
                    for (const imp of imported) {
                        // Check if exists (by namaRS and mode)
                        const existingConfig = existing.find(c => c.namaRS === imp.namaRS && c.mode === imp.mode);
                        if (existingConfig) {
                            // Update existing
                            await saveConfigToDB({ ...imp, id: existingConfig.id });
                        } else {
                            // Add new
                            await saveConfigToDB(imp);
                        }
                        importedCount++;
                    }
                    
                    await loadConfigList();
                    alert(`Berhasil mengimport ${importedCount} konfigurasi!`);
                }
            } catch (error) {
                alert(`Error mengimport: ${error.message}`);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function onModuleChange() {
    const module = document.getElementById('moduleSelect').value;
    const submoduleGroup = document.getElementById('submoduleGroup');
    const endpointGroup = document.getElementById('endpointGroup');
    const paramsContainer = document.getElementById('paramsContainer');
    const testActions = document.getElementById('testActions');
    
    // Save form state
    saveFormState();
    
    // Reset
    document.getElementById('submoduleSelect').innerHTML = '<option value="">-- Pilih Submodul --</option>';
    document.getElementById('endpointSelect').innerHTML = '<option value="">-- Pilih Endpoint --</option>';
    paramsContainer.style.display = 'none';
    testActions.style.display = 'none';
    
    if (!module) return;
    
    const moduleEndpoints = endpoints[module];
    if (!moduleEndpoints) return;
    
    // Get saved state for restoration
    const savedState = getFormState();
    
    // Deteksi otomatis apakah modul punya submodul
    const hasSubmodules = hasModuleSubmodules(moduleEndpoints);
    
    if (hasSubmodules) {
        submoduleGroup.style.display = 'block';
        const submodules = Object.keys(moduleEndpoints);
        const select = document.getElementById('submoduleSelect');
        submodules.forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub.charAt(0).toUpperCase() + sub.slice(1);
            select.appendChild(option);
        });
        
        // Restore submodule selection if exists and matches current module
        if (savedState && savedState.submodule && savedState.module === module) {
            select.value = savedState.submodule;
            // Trigger submodule change to populate endpoints
            setTimeout(() => {
                onSubmoduleChange();
            }, 50);
        }
    } else {
        submoduleGroup.style.display = 'none';
        endpointGroup.style.display = 'block';
        // Pass endpoint value to populateEndpoints to restore it
        const endpointToRestore = (savedState && savedState.endpoint && savedState.module === module) ? savedState.endpoint : null;
        populateEndpoints(module, null, endpointToRestore);
    }
}

function onSubmoduleChange() {
    const module = document.getElementById('moduleSelect').value;
    const submodule = document.getElementById('submoduleSelect').value;
    const endpointGroup = document.getElementById('endpointGroup');
    
    // Save form state
    saveFormState();
    
    if (!submodule) {
        endpointGroup.style.display = 'none';
        return;
    }
    
    endpointGroup.style.display = 'block';
    // Get saved state to restore endpoint
    const savedState = getFormState();
    const endpointToRestore = (savedState && savedState.endpoint && savedState.module === module && savedState.submodule === submodule) ? savedState.endpoint : null;
    populateEndpoints(module, submodule, endpointToRestore);
}

function populateEndpoints(module, submodule, restoreEndpointValue = null) {
    const select = document.getElementById('endpointSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Pilih Endpoint --</option>';
    
    const moduleEndpoints = endpoints[module];
    if (!moduleEndpoints) return;
    
    const endpointList = submodule ? moduleEndpoints[submodule] : moduleEndpoints;
    if (!endpointList) return;
    
    Object.keys(endpointList).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = endpointList[key].name;
        select.appendChild(option);
    });
    
    // Restore endpoint value if provided
    if (restoreEndpointValue) {
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => {
            const option = select.querySelector(`option[value="${restoreEndpointValue}"]`);
            if (option) {
                select.value = restoreEndpointValue;
                // Trigger change to generate form
                onEndpointChange();
            }
        }, 100);
    }
}

function onEndpointChange() {
    const module = document.getElementById('moduleSelect').value;
    const submodule = document.getElementById('submoduleSelect').value;
    const endpoint = document.getElementById('endpointSelect').value;
    const paramsContainer = document.getElementById('paramsContainer');
    const testActions = document.getElementById('testActions');
    const bulkParamToggle = document.getElementById('bulkParamToggle');
    
    // Reset bulk parameter toggle
    bulkParamToggle.checked = false;
    toggleBulkParameter();
    
    if (!endpoint) {
        paramsContainer.style.display = 'none';
        testActions.style.display = 'none';
        return;
    }
    
    const moduleEndpoints = endpoints[module];
    const endpointList = submodule ? moduleEndpoints[submodule] : moduleEndpoints;
    const endpointDef = endpointList[endpoint];
    
    if (!endpointDef) return;
    
    // Build params form
    const paramsForm = document.getElementById('paramsForm');
    paramsForm.innerHTML = '';
    
    if (endpointDef.params && endpointDef.params.length > 0) {
        endpointDef.params.forEach(param => {
            const div = document.createElement('div');
            div.className = 'param-item';
            
            const label = document.createElement('label');
            label.textContent = param.label + (param.required ? ' *' : '');
            div.appendChild(label);
            
            let input;
            if (param.type === 'select') {
                input = document.createElement('select');
                if (param.options) {
                    param.options.forEach(opt => {
                        const option = document.createElement('option');
                        // Support both string/number array and object array with value/label
                        if (typeof opt === 'string' || typeof opt === 'number') {
                            option.value = opt;
                            option.textContent = opt;
                        } else if (typeof opt === 'object' && opt.value !== undefined) {
                            option.value = opt.value;
                            option.textContent = opt.label || opt.value;
                        }
                        input.appendChild(option);
                    });
                }
            } else if (param.type === 'textarea') {
                input = document.createElement('textarea');
                if (param.placeholder) input.placeholder = param.placeholder;
            } else {
                input = document.createElement('input');
                input.type = param.type;
                if (param.placeholder) input.placeholder = param.placeholder;
                if (param.min !== undefined) input.min = param.min;
                if (param.max !== undefined) input.max = param.max;
            }
            
            input.id = `param_${param.key}`;
            input.name = param.key;
            if (param.required) input.required = true;
            div.appendChild(input);
            
            if (param.placeholder && param.type !== 'textarea') {
                const small = document.createElement('small');
                small.textContent = param.placeholder;
                div.appendChild(small);
            }
            
            paramsForm.appendChild(div);
        });
    } else {
        paramsForm.innerHTML = '<p>Tidak ada parameter yang diperlukan.</p>';
    }
    
    paramsContainer.style.display = 'block';
    testActions.style.display = 'block';
}

async function testEndpoint() {
    // Validate config
    const config = await getConfig();
    if (!config) {
        alert('Silakan pilih konfigurasi RS terlebih dahulu di dropdown "Pilih Konfigurasi RS"!');
        return;
    }
    
    const module = document.getElementById('moduleSelect').value;
    const submodule = document.getElementById('submoduleSelect').value;
    const endpoint = document.getElementById('endpointSelect').value;
    const isBulkParam = document.getElementById('bulkParamToggle').checked;
    
    if (!module || !endpoint) {
        alert('Silakan pilih modul dan endpoint!');
        return;
    }
    
    // Check if bulk parameter mode
    if (isBulkParam) {
        const bulkText = document.getElementById('bulkParams').value.trim();
        if (!bulkText) {
            alert('Silakan isi bulk parameters!');
            return;
        }
        
        let bulkParams;
        try {
            bulkParams = JSON.parse(bulkText);
            if (!Array.isArray(bulkParams)) {
                throw new Error('Bulk parameters harus berupa array');
            }
        } catch (error) {
            alert(`Error parsing JSON: ${error.message}`);
            return;
        }
        
        // Show loading
        const responsePanel = document.getElementById('responsePanel');
        responsePanel.style.display = 'block';
        const responseInfo = document.getElementById('responseInfo');
        const responseContent = document.getElementById('responseContent');
        const responseRawContent = document.getElementById('responseRawContent');
        responseInfo.innerHTML = `<div class="loading"></div> Mengirim ${bulkParams.length} request...`;
        responseContent.textContent = '';
        responseRawContent.textContent = '';
        
        try {
            const response = await fetch('/api/test-bulk-params', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config, module, submodule, endpoint, params: bulkParams })
            });
            
            const result = await response.json();
            
            if (result.success) {
                const successCount = result.results.filter(r => {
                    if (!r.success) return false;
                    const data = r.result;
                    const responseCode = data?.metadata?.code || data?.metaData?.code;
                    const errorMessage = data?.metadata?.message || data?.metaData?.message;
                    
                    // Check if it's actually an error
                    // For Aplicares, code 1 means success, code 0 or other means error
                    // For other APIs, code 200 or undefined means success, code 500 means error
                    if (errorMessage?.includes('Authentication failed')) {
                        return false;
                    }
                    
                    // Aplicares: code 1 = success, code 0 or other = error
                    // Other APIs: code 200 or undefined = success, code 500 = error
                    if (responseCode === 1 || responseCode === '1') {
                        return true; // Aplicares success
                    }
                    if (responseCode === 0 || responseCode === '0' || responseCode === 500 || responseCode === '500') {
                        return false; // Error
                    }
                    if (responseCode === 200 || responseCode === '200' || responseCode === undefined || responseCode === null) {
                        return true; // Success
                    }
                    
                    // Default: if code exists and not 1 or 200, might be error
                    return responseCode === undefined || responseCode === null;
                }).length;
                const authFailedCount = result.results.filter(r => {
                    if (!r.success) return false;
                    const data = r.result;
                    const errorMessage = data?.metadata?.message || data?.metaData?.message;
                    return errorMessage?.includes('Authentication failed');
                }).length;
                const errorCount = result.results.filter(r => !r.success).length;
                
                if (authFailedCount > 0) {
                    responseInfo.className = 'response-info error';
                    responseInfo.innerHTML = `❌ Authentication Failed pada ${authFailedCount} request - Total: ${result.totalDuration}ms<br><small>Periksa kredensial Anda di tab Konfigurasi</small>`;
                } else if (errorCount > 0) {
                    responseInfo.className = 'response-info error';
                    responseInfo.innerHTML = `⚠️ Completed: ${successCount} success, ${errorCount} errors - Total: ${result.totalDuration}ms`;
                } else {
                    responseInfo.className = 'response-info success';
                    responseInfo.innerHTML = `✅ Completed: ${successCount} success - Total: ${result.totalDuration}ms`;
                }
                
            // Format bulk results
            let html = '<div class="bulk-results">';
            const rawResults = [];
            result.results.forEach((item, index) => {
                rawResults.push({
                    request: index + 1,
                    success: item.success,
                    duration: item.duration,
                    result: item.result || item.error
                });
                html += `
                    <div class="bulk-result-item ${item.success ? 'success' : 'error'}">
                        <div class="bulk-result-header">
                            <span>Request #${index + 1}</span>
                            <span class="bulk-result-meta">${item.duration}ms</span>
                        </div>
                        <div class="bulk-result-content">${JSON.stringify(item.result || item.error, null, 2)}</div>
                    </div>
                `;
            });
            html += '</div>';
            responseContent.innerHTML = html;
            responseRawContent.textContent = JSON.stringify({
                success: true,
                totalDuration: result.totalDuration,
                results: rawResults
            }, null, 2);
            window.lastResponseData = result;
            } else {
                responseInfo.className = 'response-info error';
                responseInfo.innerHTML = `❌ Error: ${result.error}`;
                responseContent.textContent = result.error;
                responseRawContent.textContent = result.error;
                window.lastResponseData = null;
            }
        } catch (error) {
            responseInfo.className = 'response-info error';
            responseInfo.innerHTML = `❌ Error: ${error.message}`;
            responseContent.textContent = error.message;
            responseRawContent.textContent = error.message;
            window.lastResponseData = null;
        }
        return;
    }
    
    // Single parameter mode
    // Get params
    const params = {};
    const moduleEndpoints = endpoints[module];
    const endpointList = submodule ? moduleEndpoints[submodule] : moduleEndpoints;
    const endpointDef = endpointList[endpoint];
    
    if (endpointDef.params) {
        endpointDef.params.forEach(param => {
            const input = document.getElementById(`param_${param.key}`);
            if (input) {
                let value = input.value;
                if (param.type === 'number') {
                    value = value ? Number(value) : undefined;
                } else if (param.type === 'select' && param.key === 'jenis' && module === 'vclaim' && endpoint === 'dpjp') {
                    // Convert jenis to number ONLY for DPJP endpoint (vclaim.dpjp)
                    // For alergi endpoint (pcare.alergi), jenis must remain as string "01", "02", or "03"
                    value = value ? Number(value) : undefined;
                }
                if (param.type === 'textarea' && value) {
                    try {
                        value = JSON.parse(value);
                    } catch (e) {
                        // Keep as string if not valid JSON
                    }
                }
                if (value !== undefined && value !== '') {
                    params[param.key] = value;
                }
            }
        });
    }
    
    // Show loading
    const responsePanel = document.getElementById('responsePanel');
    responsePanel.style.display = 'block';
    const responseInfo = document.getElementById('responseInfo');
    const responseContent = document.getElementById('responseContent');
    const responseRawContent = document.getElementById('responseRawContent');
    responseInfo.innerHTML = '<div class="loading"></div> Mengirim request...';
    responseContent.textContent = '';
    responseRawContent.textContent = '';
    
    try {
        const response = await fetch('/api/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ config, module, submodule, endpoint, params })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Check if response contains error (from BPJS)
            const data = result.data;
            const responseCode = data?.metadata?.code || data?.metaData?.code;
            const errorMessage = data?.metadata?.message || data?.metaData?.message;
            
            // Check if it's actually an error
            // For Aplicares, code 1 means success, code 0 or other means error
            // For other APIs, code 200 or undefined means success, code 500 means error
            if (errorMessage?.includes('Authentication failed')) {
                responseInfo.className = 'response-info error';
                responseInfo.innerHTML = `❌ Authentication Failed - ${result.duration}ms<br><small>Periksa kredensial Anda di halaman Konfigurasi</small>`;
            } else if (responseCode === 0 || responseCode === '0' || responseCode === 500 || responseCode === '500') {
                responseInfo.className = 'response-info error';
                responseInfo.innerHTML = `⚠️ Error - ${result.duration}ms<br><small>Code: ${responseCode}</small>`;
            } else if (responseCode === 1 || responseCode === '1' || responseCode === 200 || responseCode === '200' || responseCode === undefined || responseCode === null) {
                // Success: code 1 (Aplicares), code 200 (other APIs), or no code
                responseInfo.className = 'response-info success';
                responseInfo.innerHTML = `✅ Success - ${result.duration}ms${responseCode ? `<br><small>Code: ${responseCode}</small>` : ''}`;
            } else {
                // Unknown code, treat as success if message is OK
                if (errorMessage === 'OK' || errorMessage === 'Success') {
                    responseInfo.className = 'response-info success';
                    responseInfo.innerHTML = `✅ Success - ${result.duration}ms<br><small>Code: ${responseCode}</small>`;
                } else {
                    responseInfo.className = 'response-info error';
                    responseInfo.innerHTML = `⚠️ Error - ${result.duration}ms<br><small>Code: ${responseCode}</small>`;
                }
            }
            
            const jsonString = JSON.stringify(data, null, 2);
            responseContent.textContent = jsonString;
            responseRawContent.textContent = jsonString;
            // Store data for raw view
            window.lastResponseData = data;
        } else {
            responseInfo.className = 'response-info error';
            responseInfo.innerHTML = `❌ Error: ${result.error}`;
            responseContent.textContent = result.error;
            responseRawContent.textContent = result.error;
            window.lastResponseData = null;
        }
    } catch (error) {
        responseInfo.className = 'response-info error';
        responseInfo.innerHTML = `❌ Error: ${error.message}`;
        responseContent.textContent = error.message;
        responseRawContent.textContent = error.message;
        window.lastResponseData = null;
    }
}

async function getConfig() {
    const currentId = getCurrentConfigId();
    if (!currentId) return null;
    
    const config = await getConfigById(currentId);
    if (!config) return null;
    
    // Validate required fields
    if (!config.ppkCode || !config.consId || !config.consSecret || !config.vclaimUserKey || !config.antreanUserKey || !config.pcareUserKey) {
        return null;
    }
    
    // Remove id and namaRS from config before sending to server
    const { id, namaRS, createdAt, updatedAt, ...configData } = config;
    return configData;
}

function clearResponse() {
    document.getElementById('responseContent').textContent = '';
    document.getElementById('responseRawContent').textContent = '';
    document.getElementById('responseInfo').innerHTML = '';
    document.getElementById('responseContent').innerHTML = '';
    window.lastResponseData = null;
}

function copyResponse() {
    const isRaw = document.getElementById('rawJsonToggle').checked;
    const content = isRaw 
        ? document.getElementById('responseRawContent').textContent
        : document.getElementById('responseContent').textContent || document.getElementById('responseContent').innerText;
    navigator.clipboard.writeText(content).then(() => {
        alert('Response berhasil di-copy!');
    });
}

function downloadResponse() {
    const isRaw = document.getElementById('rawJsonToggle').checked;
    let content;
    
    if (isRaw) {
        content = document.getElementById('responseRawContent').textContent;
    } else {
        // Try to get structured data if available
        if (window.lastResponseData) {
            content = JSON.stringify(window.lastResponseData, null, 2);
        } else {
            content = document.getElementById('responseContent').textContent || document.getElementById('responseContent').innerText;
        }
    }
    
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jkn-response-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Helper: deteksi apakah struktur endpoints suatu modul menggunakan submodul
// Asumsi: jika value pertama punya field name & params -> langsung endpoint (tanpa submodul)
// Jika tidak, berarti value pertama adalah grup submodul yang berisi endpoint-endpoint
function hasModuleSubmodules(moduleEndpoints) {
    const keys = Object.keys(moduleEndpoints || {});
    if (keys.length === 0) return false;

    const first = moduleEndpoints[keys[0]];
    if (!first || typeof first !== 'object') return false;

    // Kalau sudah ada properti name & params, berarti ini langsung endpoint, bukan grup submodul
    if (Object.prototype.hasOwnProperty.call(first, 'name') &&
        Object.prototype.hasOwnProperty.call(first, 'params')) {
        return false;
    }

    // Selain itu anggap sebagai grup submodul
    return true;
}

function toggleBulkParameter() {
    const isBulk = document.getElementById('bulkParamToggle').checked;
    const singleMode = document.getElementById('singleParamMode');
    const bulkMode = document.getElementById('bulkParamMode');
    
    if (isBulk) {
        singleMode.style.display = 'none';
        bulkMode.style.display = 'block';
    } else {
        singleMode.style.display = 'block';
        bulkMode.style.display = 'none';
    }
}

function loadBulkParamTemplate() {
    const module = document.getElementById('moduleSelect').value;
    const submodule = document.getElementById('submoduleSelect').value;
    const endpoint = document.getElementById('endpointSelect').value;
    
    // Template untuk SEP insert sebagai contoh
    if (module === 'vclaim' && submodule === 'sep' && endpoint === 'insert') {
        const template = `[
  {
    "request": {
      "t_sep": {
        "noKartu": "0001112230666",
        "tglSep": "2017-10-18",
        "ppkPelayanan": "0301R001",
        "jnsPelayanan": "2",
        "klsRawat": "3",
        "noMR": "123456",
        "rujukan": {
          "asalRujukan": "1",
          "tglRujukan": "2017-10-17",
          "noRujukan": "1234567",
          "ppkRujukan": "00010001"
        },
        "catatan": "test",
        "diagAwal": "A00.1",
        "poli": {
          "tujuan": "INT",
          "eksekutif": "0"
        },
        "cob": {
          "cob": "0"
        },
        "katarak": {
          "katarak": "0"
        },
        "jaminan": {
          "lakaLantas": "0",
          "penjamin": {
            "penjamin": "1",
            "tglKejadian": "2018-08-06",
            "keterangan": "kll",
            "suplesi": {
              "suplesi": "0",
              "noSepSuplesi": "0301R0010718V000001",
              "lokasiLaka": {
                "kdPropinsi": "03",
                "kdKabupaten": "0050",
                "kdKecamatan": "0574"
              }
            }
          }
        },
        "skdp": {
          "noSurat": "000002",
          "kodeDPJP": "31661"
        },
        "noTelp": "081919999",
        "user": "Coba Ws"
      }
    }
  },
  {
    "request": {
      "t_sep": {
        "noKartu": "0001112230667",
        "tglSep": "2017-10-19",
        "ppkPelayanan": "0301R001",
        "jnsPelayanan": "2",
        "klsRawat": "3",
        "noMR": "123457",
        "rujukan": {
          "asalRujukan": "1",
          "tglRujukan": "2017-10-18",
          "noRujukan": "1234568",
          "ppkRujukan": "00010001"
        },
        "catatan": "test 2",
        "diagAwal": "A00.2",
        "poli": {
          "tujuan": "INT",
          "eksekutif": "0"
        },
        "cob": {
          "cob": "0"
        },
        "katarak": {
          "katarak": "0"
        },
        "jaminan": {
          "lakaLantas": "0"
        },
        "noTelp": "081919999",
        "user": "Coba Ws"
      }
    }
  }
]`;
        document.getElementById('bulkParams').value = template;
    } else {
        // Template generic - kosongkan karena setiap endpoint punya parameter berbeda
        document.getElementById('bulkParams').value = '[]';
    }
}

