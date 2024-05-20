import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IArticuloInsumo,
	IArticuloManufacturado,
	ICategoria,
	IEmpresa,
	ISucursal,
	IUnidadMedida,
	IUsuario,
} from "../../types/empresa";

interface IInitialState {
	usuarios: IUsuario[] | null;
	unidadMedidas: IUnidadMedida[] | null;
	empresas: IEmpresa[] | null;
	sucursales: ISucursal[] | null;
	categorias: ICategoria[] | null;
	articulosInsumos: IArticuloInsumo[] | null;
	articulosManufacturados: IArticuloManufacturado[] | null;
}

const initialState: IInitialState = {
	usuarios: null,
	unidadMedidas: null,
	empresas: null,
	sucursales: null,
	categorias: null,
	articulosInsumos: null,
	articulosManufacturados: null,
};

//acá definimos el estado global
const BusinessSlice = createSlice({
	name: "BusinessSlice",
	initialState,
	reducers: {
		setUsuarios: (state, action: PayloadAction<IUsuario[] | null>) => {
			state.usuarios = action.payload;
		},
		setUnidadMedidas: (
			state,
			action: PayloadAction<IUnidadMedida[] | null>
		) => {
			state.unidadMedidas = action.payload;
		},
		addUnidadMedida: (state, action: PayloadAction<IUnidadMedida>) => {
			if (state.unidadMedidas) {
				state.unidadMedidas!.push(action.payload);
			} else {
				state.unidadMedidas = [action.payload];
			}
		},
		editUnidadMedida: (state, action: PayloadAction<IUnidadMedida>) => {
			const unidadEditada = action.payload;
			if (state.unidadMedidas) {
				state.unidadMedidas = state.unidadMedidas.map((unidad) =>
					unidad.id === unidadEditada.id ? unidadEditada : unidad
				);
			}
		},
		setEmpresas: (state, action: PayloadAction<IEmpresa[] | null>) => {
			state.empresas = action.payload;
		},
		setSucursales: (state, action: PayloadAction<ISucursal[] | null>) => {
			state.sucursales = action.payload;
		},
		addSucursal: (state, action: PayloadAction<ISucursal>) => {
			if (state.sucursales) {
				state.sucursales!.push(action.payload);
			} else {
				state.sucursales = [action.payload];
			}
		},
		editSucursal: (state, action: PayloadAction<ISucursal>) => {
			const sucursalEditada = action.payload;
			if (state.sucursales) {
				state.sucursales = state.sucursales.map((sucursal) =>
					sucursal.id === sucursalEditada.id ? sucursalEditada : sucursal
				);
			}
		},
		setCategorias: (state, action: PayloadAction<ICategoria[] | null>) => {
			state.categorias = action.payload;
		},
		addCategoria: (state, action: PayloadAction<ICategoria>) => {
			if (state.categorias) {
				state.categorias!.push(action.payload);
			} else {
				state.categorias = [action.payload];
			}
		},
		editCategoria: (state, action: PayloadAction<ICategoria>) => {
			const categoriaEditada = action.payload;
			if (state.categorias) {
				state.categorias = state.categorias.map((unidad) =>
					unidad.id === categoriaEditada.id ? categoriaEditada : unidad
				);
			}
		},
		setArticulosInsumos: (
			state,
			action: PayloadAction<IArticuloInsumo[] | null>
		) => {
			state.articulosInsumos = action.payload;
		},
		editArticuloInsumo: (state, action: PayloadAction<IArticuloInsumo>) => {
			const insumoEditado = action.payload;
			if (state.articulosInsumos) {
				state.articulosInsumos = state.articulosInsumos.map((insumo) =>
					insumo.id === insumoEditado.id ? insumoEditado : insumo
				);
			}
		},
		addArticuloInsumo: (state, action: PayloadAction<IArticuloInsumo>) => {
			if (state.articulosInsumos) {
				state.articulosInsumos!.push(action.payload);
			} else {
				state.articulosInsumos = [action.payload];
			}
		},

		setArticulosManufacturados: (
			state,
			action: PayloadAction<IArticuloManufacturado[] | null>
		) => {
			state.articulosManufacturados = action.payload;
		},

		editArticuloManufacturado: (
			state,
			action: PayloadAction<IArticuloManufacturado>
		) => {
			const insumoEditado = action.payload;
			if (state.articulosManufacturados) {
				state.articulosManufacturados = state.articulosManufacturados.map(
					(producto) =>
						producto.id === insumoEditado.id ? insumoEditado : producto
				);
			}
		},
		addArticuloManufacturado: (
			state,
			action: PayloadAction<IArticuloManufacturado>
		) => {
			if (state.articulosManufacturados) {
				state.articulosManufacturados!.push(action.payload);
			} else {
				state.articulosManufacturados = [action.payload];
			}
		},
	},
});

export const {
	setUsuarios,
	setUnidadMedidas,
	addUnidadMedida,
	editUnidadMedida,
	setEmpresas,
	setSucursales,
	addSucursal,
	editSucursal,
	setCategorias,
	addCategoria,
	editCategoria,
	setArticulosInsumos,
	editArticuloInsumo,
	addArticuloInsumo,
	setArticulosManufacturados,
	editArticuloManufacturado,
	addArticuloManufacturado,
} = BusinessSlice.actions;
export default BusinessSlice.reducer;
