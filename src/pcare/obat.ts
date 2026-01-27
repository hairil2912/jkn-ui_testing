import { PCareBaseApi } from './base.js';

export class Obat extends PCareBaseApi {
	/**
	 * Get Data DPHO
	 * GET /obat/dpho/{kodeNama}/{start}/{limit}
	 * Parameter 1: Kode atau nama DPHO
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async dpho(params: {
		/** Kode atau nama DPHO */
		kodeNama: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdObat: string;
				nmObat: string;
				sedia: number;
			}[];
		}>({
			name: this.name + 'DPHO',
			path: ['/obat/dpho/:kodeNama/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Get DPHO by KDPPK New
	 * GET /dpho/kdppk/{kdPPK}/{namaObat}/{start}/{limit}
	 * Parameter 1: Kode PPK Apotek Tujuan
	 * Parameter 2: Nama Obat
	 * Parameter 3: Row data awal yang akan ditampilkan
	 * Parameter 4: Limit jumlah data yang akan ditampilkan
	 */
	async dphoByKdppk(params: {
		/** Kode PPK Apotek Tujuan */
		kdPPK: string;
		/** Nama Obat */
		namaObat: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				kdObat: string;
				nmObat: string;
				sediaan: string;
				stok: number;
			}[];
		}>({
			name: this.name + 'DPHOByKdppk',
			path: ['/dpho/kdppk/:kdPPK/:namaObat/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Get Obat by Kunjungan
	 * GET /obat/kunjungan/{nomorKunjungan}
	 * Parameter 1: Nomor Kunjungan
	 */
	async kunjungan(params: {
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<{
			count: number;
			list: {
				kdObatSK: number;
				kdRacikan: string;
				obat: {
					kdObat: string;
					nmObat: string;
					sedia: number;
				};
				signa1: number;
				signa2: number;
				jmlObat: number;
				jmlHari: number;
				kekuatan: number;
				jmlPermintaan: number;
				jmlObatRacikan: number;
			}[];
		}>({
			name: this.name + 'Kunjungan',
			path: ['/obat/kunjungan/:nomorKunjungan', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data Obat
	 * POST /obat/kunjungan
	 * Content-Type: text/plain
	 */
	async add(params: { request?: string } | Record<string, unknown>) {
		let data: Record<string, unknown>;
		if (typeof (params as { request?: string }).request === 'string') {
			try {
				data = JSON.parse((params as { request: string }).request) as Record<string, unknown>;
			} catch {
				throw new Error('Request Body (JSON) harus berupa JSON valid');
			}
		} else {
			data = params as Record<string, unknown>;
		}
		return this.send<unknown>({
			name: this.name + 'Add',
			path: '/obat/kunjungan',
			method: 'POST',
			data
		});
	}

	/**
	 * Delete Data Obat
	 * DELETE /obat/{kodeObatSK}/kunjungan/{nomorKunjungan}
	 * Parameter 1: kodeObatSK
	 * Parameter 2: Nomor Kunjungan
	 */
	async delete(params: {
		/** kodeObatSK */
		kodeObatSK: number | string;
		/** Nomor Kunjungan */
		nomorKunjungan: string;
	}) {
		return this.send<null>({
			name: this.name + 'Delete',
			path: ['/obat/:kodeObatSK/kunjungan/:nomorKunjungan', { kodeObatSK: Number(params.kodeObatSK), nomorKunjungan: params.nomorKunjungan }],
			method: 'DELETE'
		});
	}
}
