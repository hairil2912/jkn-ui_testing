import { PCareBaseApi } from './base.js';

export class Pendaftaran extends PCareBaseApi {
	/**
	 * Get Pendaftaran by Nomor Urut
	 * GET /pendaftaran/noUrut/{noUrut}/tglDaftar/{tglDaftar}
	 * Parameter 1: Nomor Urut Pendaftaran
	 * Parameter 2: Tanggal Pendaftaran
	 */
	async noUrut(params: {
		/** Nomor Urut Pendaftaran */
		noUrut: string;
		/** Tanggal Pendaftaran */
		tglDaftar: string;
	}) {
		return this.send<{
			noUrut: string;
			tgldaftar: string;
			providerPelayanan: {
				kdProvider: string;
				nmProvider: string;
			} | null;
			peserta: {
				noKartu: string;
				nama: string;
				hubunganKeluarga: string | null;
				sex: string;
				tglLahir: string;
				tglMulaiAktif: string | null;
				tglAkhirBerlaku: string | null;
				kdProviderPst: {
					kdProvider: string;
					nmProvider: string;
				} | null;
				kdProviderGigi: {
					kdProvider: string;
					nmProvider: string;
				} | null;
				jnsKelas: {
					kode: string;
					nama: string;
				} | null;
				jnsPeserta: {
					kode: string;
					nama: string;
				} | null;
				golDarah: string | null;
				noHP: string | null;
				noKTP: string | null;
				aktif: boolean;
				ketAktif: string | null;
				asuransi: {
					kdAsuransi: string;
					nmAsuransi: string;
					noAsuransi: string;
				} | null;
			};
			poli: {
				kdPoli: string;
				nmPoli: string;
				poliSakit?: boolean;
			};
			keluhan: string;
			kunjSakit?: boolean;
			status: string;
			sistole: number;
			diastole: number;
			beratBadan: number;
			tinggiBadan: number;
			respRate: number;
			heartRate: number;
			tkp: {
				kdTkp: string;
				nmTkp: string;
			};
		}>({
			name: this.name + 'NoUrut',
			path: ['/pendaftaran/noUrut/:noUrut/tglDaftar/:tglDaftar', params],
			method: 'GET'
		});
	}

	/**
	 * Get Pendaftaran Provider
	 * GET /pendaftaran/tglDaftar/{tglDaftar}/{start}/{limit}
	 * Parameter 1: Tanggal Pendaftaran
	 * Parameter 2: Row data awal yang akan ditampilkan
	 * Parameter 3: Limit jumlah data yang akan ditampilkan
	 */
	async tglDaftar(params: {
		/** Tanggal Pendaftaran */
		tglDaftar: string;
		/** Row data awal yang akan ditampilkan */
		start: number;
		/** Limit jumlah data yang akan ditampilkan */
		limit: number;
	}) {
		return this.send<{
			count: number;
			list: {
				noUrut: string;
				tgldaftar: string;
				providerPelayanan: {
					kdProvider: string;
					nmProvider: string;
				} | null;
				peserta: {
					noKartu: string;
					nama: string;
					hubunganKeluarga: string | null;
					sex: string;
					tglLahir: string;
					tglMulaiAktif: string | null;
					tglAkhirBerlaku: string | null;
					kdProviderPst: {
						kdProvider: string;
						nmProvider: string;
					} | null;
					kdProviderGigi: {
						kdProvider: string;
						nmProvider: string;
					} | null;
					jnsKelas: {
						kode: string;
						nama: string;
					} | null;
					jnsPeserta: {
						kode: string;
						nama: string;
					} | null;
					golDarah: string | null;
					noHP: string | null;
					noKTP: string | null;
					aktif: boolean;
					ketAktif: string | null;
					asuransi: {
						kdAsuransi: string;
						nmAsuransi: string;
						noAsuransi: string;
					} | null;
				};
				poli: {
					kdPoli: string;
					nmPoli: string;
					poliSakit: boolean;
				};
				keluhan: string;
				kunjSakit: boolean;
				status: string;
				sistole: number;
				diastole: number;
				beratBadan: number;
				tinggiBadan: number;
				respRate: number;
				heartRate: number;
				tkp: {
					kdTkp: string;
					nmTkp: string;
				};
			}[];
		}>({
			name: this.name + 'TglDaftar',
			path: ['/pendaftaran/tglDaftar/:tglDaftar/:start/:limit', params],
			method: 'GET'
		});
	}

	/**
	 * Add Data Pendaftaran
	 * POST /pendaftaran
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
			path: '/pendaftaran',
			method: 'POST',
			data
		});
	}

	/**
	 * Delete Data Pendaftaran
	 * DELETE /pendaftaran/peserta/{noKartu}/tglDaftar/{tglDaftar}/noUrut/{noUrut}/kdPoli/{kdPoli}
	 * Parameter 1: Nomor Kartu Peserta
	 * Parameter 2: Tanggal Pendaftaran
	 * Parameter 3: Nomor Urut Pendaftaran
	 * Parameter 4: Kode Poli
	 */
	async delete(params: {
		/** Nomor Kartu Peserta */
		noKartu: string;
		/** Tanggal Pendaftaran */
		tglDaftar: string;
		/** Nomor Urut Pendaftaran */
		noUrut: string;
		/** Kode Poli */
		kdPoli: string;
	}) {
		return this.send<string>({
			name: this.name + 'Delete',
			path: ['/pendaftaran/peserta/:noKartu/tglDaftar/:tglDaftar/noUrut/:noUrut/kdPoli/:kdPoli', params],
			method: 'DELETE'
		});
	}
}
