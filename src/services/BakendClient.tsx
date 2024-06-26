import { IGenericFetch } from "./IGenericFetch";

export abstract class BackendClient<T> implements IGenericFetch<T> {
	protected baseUrl: string = import.meta.env.VITE_API_URL || "";

	constructor(baseUrl: string) {
		this.baseUrl += baseUrl;
	}

	async getAllIncludeDeleted(): Promise<T[]> {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}/includeDeleted`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	async getAllPagedIncludeDeleted(
		page: number,
		size: number
	): Promise<{ data: T[]; total: number }> {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(
				`${this.baseUrl}/paged/includeDeleted?page=${page}&size=${size}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!response.ok) {
				throw Error(response.statusText);
			}
			const result = await response.json();
			return {
				data: result.content,
				total: result.totalElements,
			};
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para obtener datos mediante una solicitud GET
	async getAll(): Promise<T[]> {
		try {
			let response;
			const token = localStorage.getItem("token");
			if (token) {
				response = await fetch(`${this.baseUrl}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} else {
				response = await fetch(`${this.baseUrl}`);
			}

			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	async getAllPaged(
		page: number,
		size: number
	): Promise<{ data: T[]; total: number }> {
		try {
			let response;
			const token = localStorage.getItem("token");
			if (token) {
				response = await fetch(
					`${this.baseUrl}/paged?page=${page}&size=${size}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			} else {
				response = await fetch(
					`${this.baseUrl}/paged?page=${page}&size=${size}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}

			if (!response.ok) {
				throw Error(response.statusText);
			}
			const result = await response.json();
			return {
				data: result.content,
				total: result.totalElements,
			};
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	async getById(id: number): Promise<T | null> {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Error desconocido");
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para enviar datos mediante una solicitud POST
	async create(data: T): Promise<T> {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
			});
			if (!response.ok) {
				return response.text().then((error) => {
					throw new Error(error);
				});
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para actualizar datos mediante una solicitud PUT
	async update(id: number, data: T): Promise<T> {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}/${id}`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data), // Convierte los datos a JSON y los envía en el cuerpo de la solicitud
			});

			if (!response.ok) {
				if (response.statusText) {
					throw Error(response.statusText);
				}
			}
			return response.json(); // Retorna los datos en formato JSON
		} catch (error) {
			return Promise.reject(error); // Rechaza la promesa con el error
		}
	}

	// Función generica para eliminar datos mediante una solicitud DELETE
	async delete(id: number) {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				return response.text().then((error) => {
					throw new Error(error);
				});
			}
		} catch (error) {
			return Promise.reject(error);
		}
	}

	async alta(id: number) {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${this.baseUrl}/alta/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}
		} catch (error) {
			console.error(error); // Imprime el error en la consola
		}
	}
}
