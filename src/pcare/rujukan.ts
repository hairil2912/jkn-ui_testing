import { PCareBaseApi } from './base.js';

export class Rujukan extends PCareBaseApi {
	/**
	 * Daftar rujukan berdasarkan tanggal
	 */
	async tanggal(params: {
		/** tanggal rujukan dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<{
			list: {
				noRujukan: string;
				tglRujukan: string;
				noKartu: string;
				nama: string;
				poliRujukan: string;
				faskesRujukan: string;
			}[];
		}>({
			name: this.name + 'Tanggal',
			path: ['/rujukan/tanggal/:tanggal', params],
			method: 'GET'
		});
	}

	/**
	 * Daftar rujukan berdasarkan nomor kartu peserta
	 */
	async nomorKartu(params: {
		/** nomor kartu JKN atau BPJS */
		nomor: string;
	}) {
		return this.send<{
			list: {
				noRujukan: string;
				tglRujukan: string;
				noKartu: string;
				nama: string;
				poliRujukan: string;
				faskesRujukan: string;
			}[];
		}>({
			name: this.name + 'No. Kartu',
			path: ['/rujukan/peserta/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Data rujukan berdasarkan nomor rujukan
	 */
	async nomorRujukan(params: {
		/** nomor rujukan */
		nomor: string;
	}) {
		return this.send<{
			noRujukan: string;
			tglRujukan: string;
			noKartu: string;
			nama: string;
			poliRujukan: string;
			faskesRujukan: string;
		}>({
			name: this.name + 'No. Rujukan',
			path: ['/rujukan/:nomor', params],
			method: 'GET'
		});
	}
}
