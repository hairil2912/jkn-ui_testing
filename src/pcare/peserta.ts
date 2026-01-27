import { PCareBaseApi } from './base.js';

export class Peserta extends PCareBaseApi {
	/**
	 * Pencarian data peserta berdasarkan nomor kartu
	 */
	async nomorKartu(params: {
		/** nomor kartu JKN atau BPJS */
		nomor: string;
	}) {
		return this.send<{
			peserta: {
				noKartu: string;
				nik: string;
				nama: string;
				sex: string;
				tglLahir: string;
				umur: string;
				statusPeserta: {
					kode: string;
					keterangan: string;
				};
				jenisPeserta: {
					kode: string;
					keterangan: string;
				};
				hakKelas: {
					kode: string;
					keterangan: string;
				};
				provUmum: {
					kdProvider: string;
					nmProvider: string;
				};
			};
		}>({
			name: this.name + 'No. Kartu BPJS',
			path: ['/peserta/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Pencarian data peserta berdasarkan NIK
	 */
	async nomorKependudukan(params: {
		/** nomor induk kependudukan atau NIK */
		nomor: string;
	}) {
		return this.send<{
			peserta: {
				noKartu: string;
				nik: string;
				nama: string;
				sex: string;
				tglLahir: string;
				umur: string;
				statusPeserta: {
					kode: string;
					keterangan: string;
				};
				jenisPeserta: {
					kode: string;
					keterangan: string;
				};
				hakKelas: {
					kode: string;
					keterangan: string;
				};
				provUmum: {
					kdProvider: string;
					nmProvider: string;
				};
			};
		}>({
			name: this.name + 'NIK',
			path: ['/peserta/nik/:nomor', params],
			method: 'GET'
		});
	}
}
