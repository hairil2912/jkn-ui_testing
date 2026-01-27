import { PCareBaseApi } from './base.js';

export class Referensi extends PCareBaseApi {
	/**
	 * Daftar referensi diagnosa
	 */
	async diagnosa(params: {
		/** kode atau nama diagnosa */
		keyword: string;
		/** row data awal yang akan ditampilkan (start/pagination) */
		start: number;
		/** limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdDiag: string;
				nmDiag: string;
				nonSpesialis: boolean;
			}[];
		}>({
			name: this.name + 'Diagnosa',
			path: ['/referensi/diagnosa/:keyword/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Daftar referensi poli
	 */
	async poli(params: {
		/** kode atau nama poli */
		keyword: string;
	}) {
		return this.send<{
			list: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Poli',
			path: ['/referensi/poli/:keyword', params],
			method: 'GET'
		});
	}

	/**
	 * Daftar referensi dokter
	 */
	async dokter(params: {
		/** kode atau nama dokter */
		keyword: string;
	}) {
		return this.send<{
			list: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Dokter',
			path: ['/referensi/dokter/:keyword', params],
			method: 'GET'
		});
	}

	/**
	 * Daftar referensi obat
	 */
	async obat(params: {
		/** kode atau nama obat */
		keyword: string;
	}) {
		return this.send<{
			list: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Obat',
			path: ['/referensi/obat/:keyword', params],
			method: 'GET'
		});
	}

	/**
	 * Daftar referensi tindakan
	 */
	async tindakan(params: {
		/** kode atau nama tindakan */
		keyword: string;
	}) {
		return this.send<{
			list: {
				kode: string;
				nama: string;
			}[];
		}>({
			name: this.name + 'Tindakan',
			path: ['/referensi/tindakan/:keyword', params],
			method: 'GET'
		});
	}
}
