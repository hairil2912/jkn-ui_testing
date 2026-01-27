import { PCareBaseApi } from './base.js';

export class Skrinning extends PCareBaseApi {
	/**
	 * Get Skrining Riwayat Kesehatan by Penyakit New
	 * GET /skrinning/rekap
	 * Fungsi: Mengambil data rekapitulasi hasil Skrining Riwayat Kesehatan per penyakit
	 */
	async rekap() {
		return this.send<{
			list: {
				nama_penyakit: string;
				beresiko: number;
				tidak_beresiko: number;
			}[];
		}>({
			name: this.name + 'Rekap',
			path: '/skrinning/rekap',
			method: 'GET'
		});
	}

	/**
	 * Get Detail Peserta Skrining Riwayat Kesehatan New
	 * GET /skrinning/peserta/{nomorNama}/{start}/{limit}
	 * Parameter 1: Nomor atau Nama Peserta
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async peserta(params: {
		/** Nomor atau Nama Peserta */
		nomorNama: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				nomor_peserta: string;
				nama: string;
				usia: number;
				no_hp: string;
				email: string;
				status_penyakit: {
					anemia: string;
					hepatitis_b: string;
					hepatitis_c: string;
					hipertensi_stroke_ischemic_heart_disease: string;
					kanker_paru: string;
					kanker_payudara: string;
					kanker_serviks: string;
					kolorektal: string;
					paru_obstruktif_kronis: string;
					penyakit_diabetes_mellitus: string;
					thalasemia: string;
					tuberkulosis: string;
				};
			}[];
		}>({
			name: this.name + 'Peserta',
			path: ['/skrinning/peserta/:nomorNama/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Get Data Prolanis Diabetes Mellitus New
	 * GET /skrinning/prolanis/dm/{nomorNama}/{start}/{limit}
	 * Parameter 1: Nomor atau Nama Peserta
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async prolanisDm(params: {
		/** Nomor atau Nama Peserta */
		nomorNama: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				nomor_peserta: string;
				nama: string;
				usia: number;
				jenis_kelamin: string;
				diagnosa_terakhir: string;
				status_prolanis: string;
			}[];
		}>({
			name: this.name + 'ProlanisDm',
			path: ['/skrinning/prolanis/dm/:nomorNama/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Get Data Prolanis Hipertensi New
	 * GET /skrinning/prolanis/ht/{nomorNama}/{start}/{limit}
	 * Parameter 1: Nomor atau Nama Peserta
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async prolanisHt(params: {
		/** Nomor atau Nama Peserta */
		nomorNama: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				nomor_peserta: string;
				nama: string;
				usia: number;
				jenis_kelamin: string;
				diagnosa_terakhir: string;
				status_prolanis: string;
			}[];
		}>({
			name: this.name + 'ProlanisHt',
			path: ['/skrinning/prolanis/ht/:nomorNama/:start/:limit', params],
			method: 'GET'
		});
	}
}
